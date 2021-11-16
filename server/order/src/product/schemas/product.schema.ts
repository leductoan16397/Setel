import { Document } from 'mongoose';
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
  collection: 'products',
})
export class Product {
  @Prop({
    type: String,
    minlength: 6,
    maxlength: 255,
    required: [true, 'NAME_IS_BLANK'],
  })
  name: string;

  @Prop({
    type: String,
    minlength: 6,
    maxlength: 255,
    required: [true, 'IMAGE_IS_BLANK'],
  })
  image: string;

  @Prop({
    type: Number,
    min: 1,
    required: [true, 'NAME_IS_BLANK'],
  })
  price: number;
}

export type ProductDocument = Product & Document;
export const ProductSchema = SchemaFactory.createForClass(Product);
