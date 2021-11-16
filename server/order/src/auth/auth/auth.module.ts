import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, User } from 'user/schemas/user.schema';
import { AuthController } from './auth.controller';
import { UserModule } from 'user/user.module';
import { RefreshTokenModule } from 'auth/refresh-token/refresh-token.module';
import { CoreModule } from 'core/core.module';

@Module({
  imports: [
    CoreModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRATION },
    }),
    UserModule,
    RefreshTokenModule,
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
