import { User } from '../database/entities/trade.requests.entity'

declare module 'express-session' {
  interface SessionData {
    user?: User
  }
}
