import { Module } from '@nestjs/common'
import { AuthModule } from 'auth/auth.module'

import { TradeRequestsController } from './traderequests.controller'
import { TradeRequestsServiceModule } from './traderequests.service.module'

@Module({
    imports: [
        TradeRequestsServiceModule,
        AuthModule,
    ],
    controllers: [TradeRequestsController],
})
export class TradeRequestModule { }
