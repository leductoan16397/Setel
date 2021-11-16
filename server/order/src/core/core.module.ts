import { Module, OnModuleInit } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ConfigService } from './config/config.service';
import {
  AllExceptionsFilter,
  HttpExceptionFilter,
  MongooseValidationFilter,
  NotFoundExceptionFilter,
} from './exception/http-error.filter';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    { provide: APP_FILTER, useClass: NotFoundExceptionFilter },
    { provide: APP_FILTER, useClass: MongooseValidationFilter },
    ConfigService,
  ],
  exports: [ConfigService],
})
export class CoreModule implements OnModuleInit {
  onModuleInit() {
    console.log(`CoreModule has been initialized.`);
  }
}
