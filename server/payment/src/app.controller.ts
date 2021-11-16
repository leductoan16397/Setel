import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ service: 'PAYMENT', action: 'test' })
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern({ service: 'PAYMENT', action: 'verify' })
  verifyPayment(@Payload() payload: { orderId: string }) {
    return this.appService.verifyPayment(payload.orderId);
  }
}
