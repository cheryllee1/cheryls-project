import { Module } from '@nestjs/common'

// import { AuthModule } from 'auth/auth.module';
import { ListingsController } from './listings.controller'
import { ListingsServiceModule } from './listings.service.module'

@Module({
  imports: [ListingsServiceModule],
  controllers: [ListingsController],
})
export class ListingsModule {}
