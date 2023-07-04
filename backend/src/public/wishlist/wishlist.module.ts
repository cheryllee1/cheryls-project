import { Module } from '@nestjs/common'
import { AuthModule } from 'auth/auth.module'

import { WishlistController } from './wishlist.controller'
import { WishlistServiceModule } from './wishlist.service.module'

@Module({
    imports: [
        WishlistServiceModule,
        AuthModule,
    ],
    controllers: [WishlistController],
})
export class WishlistModule { }