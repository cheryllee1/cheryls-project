import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Listings } from '../../database/entities/listings.entity'

import { ListingsService } from './listing.service'

@Module({
    imports: [TypeOrmModule.forFeature([Listings])],
    providers: [ListingsService],
    exports: [ListingsService],
})
export class ListingsServiceModule { }