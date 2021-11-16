import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(@Inject('ORDER_SERVICE') private OrderService: ClientProxy) {}

  getHello(): string {
    return 'payment service test!';
  }

  verifyPayment(orderId: string) {
    const status = ['declined', 'confirmed'];
    const randomItem = status[Math.floor(Math.random() * status.length)];
    setTimeout(() => {
      this.OrderService.emit(
        { service: 'ORDER', action: 'payment-verified' },
        { status: randomItem, orderId },
      );
    }, 2 * 60 * 1000);
  }
}
