import { User } from '../database/entities/user.entity';

declare module 'express' {
  export interface Request {
    user: User;
  }
}
