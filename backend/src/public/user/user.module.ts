import { Module } from '@nestjs/common'
import { AuthModule } from 'auth/auth.module'

import { UserController } from './user.controller'
import { UserServiceModule } from './user.service.module'

@Module({
    imports: [
        UserServiceModule,
        AuthModule,
    ],
    controllers: [UserController],
})
export class UserModule { }
