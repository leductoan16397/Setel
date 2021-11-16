import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Get('hello')
  getHelloOder() {
    return this.appService.getHello2();
  }

  @MessagePattern({ service: 'ORDER', action: 'test' })
  getHello2(): string {
    return 'order';
  }
}
