import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(@Inject('PAYMENT_SERVICE') private PaymentService: ClientProxy) {}

  getHello() {
    return this.PaymentService.send({ service: 'PAYMENT', action: 'test' }, {});
  }

  getHello2() {
    return this.PaymentService.send(
      { service: 'PAYMENT', action: 'test-order' },
      {},
    );
  }
}
