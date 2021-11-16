import { Module, OnModuleInit } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ConfigService } from './config/config.service';
import {
  AllExceptionsFilter,
  ExceptionFilter,
} from './exception/rpc-exception.filter';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_FILTER,
      useClass: ExceptionFilter,
    },
    ConfigService,
  ],
  exports: [ConfigService],
})
export class CoreModule implements OnModuleInit {
  onModuleInit() {
    console.log(`CoreModule has been initialized.`);
  }
}
