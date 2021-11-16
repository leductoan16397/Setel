import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  RefreshToken,
  RefresTokenDocument,
} from 'auth/refresh-token/schemas/refresh-token.schema';

@Injectable()
export class RefreshTokenService {
  constructor(
    @InjectModel(RefreshToken.name)
    private readonly refreshTokenModel: Model<RefresTokenDocument>,
  ) {}

  async createRefreshToken(input: RefreshToken): Promise<string> {
    const refreshToken = new this.refreshTokenModel(input);
    await refreshToken.save();
    return refreshToken.refreshToken;
  }

  async findRefreshToken(token: string) {
    const refreshToken = await this.refreshTokenModel.findOne({
      refreshToken: token,
    });
    if (!refreshToken) {
      throw new UnauthorizedException('User has been logged out.');
    }
    return refreshToken.userId;
  }

  async deleteByToken(userId: string, refreshToken: string) {
    await this.refreshTokenModel.deleteOne({ userId, refreshToken });
  }

  async deleteByUserId(userId: string) {
    const a = await this.refreshTokenModel.deleteMany({ userId });
    console.log(a);
  }
}
