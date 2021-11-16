import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signUp.dto';
import { Request } from 'express';
import { LoginUserDto } from './dto/login-user.dto';
import { RefreshAccessTokenDto } from './dto/refresh-access-token.dto';
import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './guards/roles.guard';
import { IRequest } from 'common/interface/request.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() createUserDto: SignUpDto) {
    return await this.authService.create(createUserDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Req() req: Request, @Body() loginUserDto: LoginUserDto) {
    return await this.authService.login(req, loginUserDto);
  }

  @Post('refresh-token')
  @HttpCode(HttpStatus.CREATED)
  async refreshAccessToken(
    @Body() refreshAccessTokenDto: RefreshAccessTokenDto,
  ) {
    return await this.authService.refreshAccessToken(refreshAccessTokenDto);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @Roles('user')
  async logout(
    @Req() req: IRequest,
    @Body() refreshAccessTokenDto: RefreshAccessTokenDto,
  ) {
    const { user } = req;
    return await this.authService.logout(user.id, refreshAccessTokenDto);
  }

  @Post('logout-all')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @Roles('user')
  async logoutAll(@Req() req: IRequest) {
    const { user } = req;
    return await this.authService.logoutAll(user.id);
  }
}
