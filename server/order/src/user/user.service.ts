import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { compareSync } from 'bcrypt-nodejs';
import { UserDocument, User } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async findAll(): Promise<UserDocument[]> {
    const users = await this.userModel.find();
    return users;
  }

  async isEmailUnique(email: string) {
    const user = await this.userModel.findOne({ email });
    if (user) {
      throw new BadRequestException('Email already exists!!');
    }
  }

  async findByEmail(email: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new NotFoundException('Email not found.');
    }
    return user;
  }

  async findUserByEmail(email: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new NotFoundException('Wrong email or password.');
    }
    return user;
  }

  async checkPassword(attemptPass: string, user) {
    const match = compareSync(attemptPass, user.password);
    if (!match) {
      throw new NotFoundException('Wrong email or password.');
    }
    return match;
  }

  isUserBlocked(user) {
    if (user.blockExpires > Date.now()) {
      throw new ConflictException('User has been blocked try later.');
    }
  }

  async passwordsAreMatch(user) {
    user.loginAttempts = 0;
    await user.save();
  }
}
