import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Listing } from 'database/entities/listings.entity'

import { ListingsService } from './listings.service'

@Module({
  imports: [TypeOrmModule.forFeature([Listing])],
  providers: [ListingsService],
  exports: [ListingsService],
})
export class ListingsServiceModule {}
