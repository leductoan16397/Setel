import { Request } from 'express';

export interface RequestUser {
  id: string;
  fullName: string;
  email: string;
  roles: string[];
}

export interface IRequest extends Request {
  user: RequestUser;
}
