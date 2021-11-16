import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from 'core/config/config.service';
import { CoreModule } from 'core/core.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

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
        name: 'ORDER_SERVICE',
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
