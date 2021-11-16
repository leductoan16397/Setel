import { Document, SchemaTypes } from 'mongoose';
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Product } from 'product/schemas/product.schema';
import { User } from 'user/schemas/user.schema';

@Schema({
  _id: false,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class ProductOrder extends Product {
  @Prop({
    type: Number,
    min: 1,
    default: 1,
  })
  count: number;
}

const ProductOrderSchema = SchemaFactory.createForClass(ProductOrder);

@Schema({
  timestamps: true,
  collection: 'orders',
})
export class Order {
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
  })
  user: User | string;

  @Prop({
    type: String,
    required: true,
  })
  address: string;

  @Prop({
    type: [ProductOrderSchema],
    minlength: 1,
    default: [],
  })
  products: ProductOrder[];

  @Prop({
    type: Number,
    min: 0,
    default: 0,
  })
  totalPrice: number;

  @Prop({
    type: String,
    default: 'created',
    enum: ['created', 'canceled', 'confirmed', 'delivered'],
  })
  status: OrderStatus;
}

export type OrderStatus = 'created' | 'canceled' | 'confirmed' | 'delivered';
export type OrderDocument = Order & Document;
export const OrderSchema = SchemaFactory.createForClass(Order);
