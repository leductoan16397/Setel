import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  ClassSerializerInterceptor,
  HttpCode,
  HttpStatus,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Roles } from 'auth/auth/decorators/roles.decorator';
import { RolesGuard } from 'auth/auth/guards/roles.guard';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrderEntity } from './entities/order.entity';
import { IRequest } from 'common/interface/request.interface';

@Controller('order')
@UseInterceptors(ClassSerializerInterceptor)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles('user')
  create(@Req() req: IRequest, @Body() createOrderDto: CreateOrderDto) {
    const { user } = req;
    return this.orderService.create(user.id, createOrderDto);
  }

  @MessagePattern({ service: 'ORDER', action: 'payment-verified' })
  updateOrderStatusAfterVeridyPayent(
    @Payload() payload: { status: 'declined' | 'confirmed'; orderId: string },
  ) {
    this.orderService.updateOrderStatusAfterVeridyPayent(
      payload.orderId,
      payload.status,
    );
  }

  @Get()
  @UseGuards(RolesGuard)
  @HttpCode(HttpStatus.OK)
  @Roles('user')
  @SerializeOptions({
    excludePrefixes: ['_'],
  })
  async findAll(@Req() req: IRequest) {
    const { user } = req;
    const orders = await this.orderService.findAll(user.id);
    return orders.map((order) => new OrderEntity(order.toObject()));
  }

  @Get(':id')
  @UseGuards(RolesGuard)
  @Roles('user')
  @HttpCode(HttpStatus.OK)
  @SerializeOptions({
    excludePrefixes: ['_'],
  })
  async findOne(@Param('id') id: string, @Req() req: IRequest) {
    const { user } = req;
    const order = await this.orderService.findOne(id, user.id);
    return new OrderEntity(order.toObject());
  }

  @Patch(':id/cancle')
  @UseGuards(RolesGuard)
  @Roles('user')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Req() req: IRequest) {
    const { user } = req;
    return this.orderService.updateOderStatusByUser(user.id, id, 'canceled');
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(id);
  }
}
