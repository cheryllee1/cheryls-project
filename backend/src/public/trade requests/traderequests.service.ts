import { Body, Injectable, Req } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { TradeRequests } from '../../database/entities/trade.requests.entity'

import { AllowedResource, ApiKeyAction, Permission } from '~shared/types/base'
import { IsEmail } from 'class-validator'

@Injectable()
export class TradeRequests {
    TradeRequestsRepository: any
    constructor(
        @InjectRepository(TradeRequests),
    ) { }

    findAll(): Promise<TradeRequests[]> {
        return this.TradeRequestsRepository.find({
            order: {
                id: 'ASC',
            },
        })
    }

    find(TradeRequestId: number): Promise<TradeRequests | null> {
        return this.TradeRequestsRepository.findOne({
            where: {
                id: TradeRequestId,
                publicVisible: true, // Don't allow non public visible APIs to be queried
            },
        })
    }

    async enumeratePermissionsForAllTradeRequests(): Promise<Permission[]> {
        const tradeRequests = await this.findAll()
        const permissions = Object.values(AllowedResource).flatMap((resource) =>
            TradeRequests.flatMap(({ id: TradeRequestId }) => [
                { TradeRequestId, resource, action: ApiKeyAction.READ },
                { TradeRequestId, resource, action: ApiKeyAction.WRITE },
            ]),
        )
        return permissions
    }

    async createTradeRequest(
        @CurrentUser() requesterId: User,
        @Req() req: Request,
        @Body() data: CreateTradeRequest,
    ): Promise<TradeRequests>


}

