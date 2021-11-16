import { JwtPayload } from './interfaces/jwt-payload.interface';
import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  Logger,
  Req,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { sign } from 'jsonwebtoken';
import { v4 } from 'uuid';
import { Request } from 'express';
import { CreateUserDto } from 'user/dto/create-user.dto';
import { UserService } from 'user/user.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RefreshAccessTokenDto } from './dto/refresh-access-token.dto';
import { RefreshTokenService } from 'auth/refresh-token/refresh-token.service';
import { User, UserDocument } from 'user/schemas/user.schema';
import { ConfigService } from 'core/config/config.service';
import { RefreshToken } from 'auth/refresh-token/schemas/refresh-token.schema';
@Injectable()
export class AuthService {
  cryptr: any;
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly appConfig: ConfigService,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly refreshTokenService: RefreshTokenService,
  ) {}

  private async createAccessToken(userId: string) {
    const accessToken = sign({ userId }, this.appConfig.jwtSecreKey, {
      expiresIn: process.env.JWT_EXPIRATION,
    });
    return accessToken;
  }

  private async createRefreshToken(@Req() req: Request, userId: string) {
    const input: RefreshToken = {
      userId,
      refreshToken: v4(),
    };
    const refreshToken = await this.refreshTokenService.createRefreshToken(
      input,
    );
    return refreshToken;
  }

  async findRefreshToken(token: string) {
    const userId = await this.refreshTokenService.findRefreshToken(token);
    return userId;
  }

  async validateUser(jwtPayload: JwtPayload): Promise<any> {
    const user = await this.userModel.findOne({
      _id: jwtPayload.userId,
    });
    if (!user) {
      throw new UnauthorizedException('User not found.');
    }
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<void> {
    const user = new this.userModel(createUserDto);
    await this.userService.isEmailUnique(user.email);
    await user.save();
  }

  async login(req: Request, loginUserDto: LoginUserDto) {
    const user = await this.userService.findUserByEmail(loginUserDto.email);
    this.userService.isUserBlocked(user);
    await this.userService.checkPassword(loginUserDto.password, user);
    await this.userService.passwordsAreMatch(user);
    return {
      userId: user.id,
      fullName: user.fullName,
      email: user.email,
      expires: new Date(new Date().getTime() + 1000 * 60 * 60),
      accessToken: await this.createAccessToken(user._id),
      refreshToken: await this.createRefreshToken(req, user._id),
    };
  }

  async logout(userId: string, refreshAccessTokenDto: RefreshAccessTokenDto) {
    await this.refreshTokenService.deleteByToken(
      userId,
      refreshAccessTokenDto.refreshToken,
    );
    return { mess: 'logout successfully' };
  }

  async logoutAll(userId: string) {
    await this.refreshTokenService.deleteByUserId(userId);
    return { mess: 'logout successfully' };
  }

  async refreshAccessToken(refreshAccessTokenDto: RefreshAccessTokenDto) {
    const userId = await this.findRefreshToken(
      refreshAccessTokenDto.refreshToken,
    );
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new BadRequestException('Bad request');
    }
    return {
      accessToken: await this.createAccessToken(user._id),
      expires: new Date(new Date().getTime() + 1000 * 60 * 60),
    };
  }
}
