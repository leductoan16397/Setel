import { Exclude, Expose } from 'class-transformer';
import { Types } from 'mongoose';

export class ProductEntity {
  name: string;
  image: string;
  price: number;

  @Exclude()
  _id: Types.ObjectId;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Expose()
  get id(): string {
    return this._id.toString();
  }

  constructor(partial: Partial<ProductEntity>) {
    Object.assign(this, partial);
  }
}
