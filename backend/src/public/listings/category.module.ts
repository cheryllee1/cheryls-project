import { Module } from '@nestjs/common'
import { AuthModule } from 'auth/auth.module'

import { CategoryController } from './category.controller'
import { CategoryServiceModule } from './category.service.module'

@Module({
    imports: [
        CategoryServiceModule,

    ],
    controllers: [CategoryController],
})
export class CategoryModule { }
