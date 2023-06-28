import { User } from '../database/entities/trade.requests.entity'

declare module 'express' {
  export interface Request {
    user: User
  }
}
