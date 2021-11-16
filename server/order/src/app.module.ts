import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'auth/auth/auth.module';
import { ConfigService } from 'core/config/config.service';
import { CoreModule } from 'core/core.module';
import { UserModule } from 'user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    CoreModule,
    MongooseModule.forRootAsync({
      imports: [CoreModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.mongoUrl,
        useNewUrlParser: true,
        // useFindAndModify: false,
        // useCreateIndex: true,
      }),
      inject: [ConfigService],
    }),
    ClientsModule.registerAsync([
      {
        name: 'PAYMENT_SERVICE',
        imports: [CoreModule],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.REDIS,
          options: {
            url: `redis://${configService.redisDomain}:6379`,
          },
        }),
        inject: [ConfigService],
      },
    ]),
    AuthModule,
    UserModule,
    OrderModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
