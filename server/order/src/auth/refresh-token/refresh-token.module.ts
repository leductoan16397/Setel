import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  RefreshToken,
  RefreshTokenSchema,
} from 'auth/refresh-token/schemas/refresh-token.schema';
import { RefreshTokenService } from './refresh-token.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RefreshToken.name, schema: RefreshTokenSchema },
    ]),
  ],
  exports: [RefreshTokenService],
  providers: [RefreshTokenService],
})
export class RefreshTokenModule {}
