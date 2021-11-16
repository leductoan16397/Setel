import { Module, OnModuleInit } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schemas/order.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from 'core/config/config.service';
import { CoreModule } from 'core/core.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
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
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule implements OnModuleInit {
  onModuleInit() {
    console.log(`OrderModule has been initialized.`);
  }
}
