import { NotAcceptableException } from '@nestjs/common';
import {
  BadGatewayException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order, OrderDocument, OrderStatus } from './schemas/order.schema';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name)
    private readonly orderModel: Model<OrderDocument>,
    @Inject('PAYMENT_SERVICE') private PaymentService: ClientProxy,
  ) {}

  async create(userId: string, createOrderDto: CreateOrderDto) {
    try {
      const order = new this.orderModel({
        user: userId,
        ...createOrderDto,
        totalPrice: createOrderDto.products.reduce(
          (previousValue, currentValue) =>
            previousValue + currentValue.count * currentValue.price,
          0,
        ),
      });
      await order.save();
      this.PaymentService.emit(
        { service: 'PAYMENT', action: 'verify' },
        { orderId: order.id },
      );
      return { data: 'Create order successfully' };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async updateOrderStatusAfterVeridyPayent(
    orderId: string,
    status: 'declined' | 'confirmed',
  ) {
    const STATUSMAP: {
      declined: Partial<OrderStatus>;
      confirmed: Partial<OrderStatus>;
    } = { declined: 'canceled', confirmed: 'confirmed' };

    await this.updateOderStatus(orderId, STATUSMAP[status]);
    if (status === 'confirmed') {
      setTimeout(() => {
        this.updateOderStatus(orderId, 'delivered');
      }, 2 * 60 * 1000);
    }
  }

  async updateOderStatus(
    orderId: string,
    status: 'created' | 'canceled' | 'confirmed' | 'delivered',
  ) {
    const order = await this.orderModel.findById(orderId);
    if (!order) {
      throw new BadGatewayException('Order does not exist');
    }
    if (order.status === 'created' || order.status === 'confirmed') {
      order.status = status;
      await order.save();
      return { data: 'Cancele order successfully' };
    }
    return;
  }

  async updateOderStatusByUser(
    userId: string,
    orderId: string,
    status: 'created' | 'canceled' | 'confirmed' | 'delivered',
  ) {
    const order = await this.orderModel.findOne({ user: userId, _id: orderId });
    if (!order) {
      throw new BadGatewayException('Order does not exist');
    }
    if (order.status === 'canceled' || order.status === 'delivered') {
      throw new NotAcceptableException("Can't update");
    }
    order.status = status;
    await order.save();
    return { data: 'Cancele order successfully' };
  }

  async findAll(userId: string): Promise<OrderDocument[]> {
    const orders = await this.orderModel.find(
      { user: userId },
      {},
      { sort: { createdAt: -1 } },
    );
    return orders;
  }

  async findOne(id: string, userId: string): Promise<OrderDocument> {
    const order = await this.orderModel.findOne({ id: id, user: userId });
    return order;
  }

  update(id: string, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: string) {
    return `This action removes a #${id} order`;
  }
}
