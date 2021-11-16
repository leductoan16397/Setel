import { Document, SchemaTypes } from 'mongoose';
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { User } from 'user/schemas/user.schema';

@Schema({
  timestamps: true,
  collection: 'refreshtokens',
})
export class RefreshToken {
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
  })
  userId: User | string;

  @Prop({
    required: true,
  })
  refreshToken: string;
}

export type RefresTokenDocument = RefreshToken & Document;
export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);
