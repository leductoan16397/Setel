import { Exclude, Expose } from 'class-transformer';
import { Types } from 'mongoose';

export class UserEntity {
  fullName: string;
  email: string;
  roles: string[];

  @Exclude()
  password: string;
  _id: Types.ObjectId;

  @Expose()
  get id(): string {
    return this._id.toString();
  }

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
