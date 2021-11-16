import { Document } from 'mongoose';
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import validator from 'validator';
import { hashSync } from 'bcrypt-nodejs';

@Schema({
  timestamps: true,
  collection: 'users',
})
export class User {
  @Prop({
    type: String,
    minlength: 6,
    maxlength: 255,
    required: [true, 'NAME_IS_BLANK'],
  })
  fullName: string;

  @Prop({
    type: String,
    lowercase: true,
    validate: validator.isEmail,
    maxlength: 255,
    minlength: 6,
    unique: true,
    required: [true, 'EMAIL_IS_BLANK'],
  })
  email: string;

  @Prop({
    type: String,
    minlength: 5,
    maxlength: 1024,
    required: [true, 'PASSWORD_IS_BLANK'],
  })
  password: string;

  @Prop({
    type: [String],
    default: ['user'],
    enum: ['user', 'admin'],
  })
  roles: string[];
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const hashed = hashSync(this['password']);
  this['password'] = hashed;
  return next();
});
