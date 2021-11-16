import { Exclude, Expose } from 'class-transformer';
import { Types } from 'mongoose';
import { ProductOrder } from 'order/schemas/order.schema';
import { User } from 'user/schemas/user.schema';

export class OrderEntity {
  address: string;
  totalPrice: number;
  status: string;
  products: ProductOrder[];
  createdAt: Date;

  @Exclude()
  _id: Types.ObjectId;

  @Exclude()
  user: string | User;

  @Exclude()
  updatedAt: Date;

  @Expose()
  get id(): string {
    return this._id.toString();
  }

  @Expose()
  get author(): string {
    return this.user.toString();
  }

  constructor(partial: Partial<OrderEntity>) {
    Object.assign(this, partial);
  }
}
