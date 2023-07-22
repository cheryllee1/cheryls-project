import { Module } from '@nestjs/common'
import { RouterModule } from '@nestjs/core'
import { TerminusModule } from '@nestjs/terminus'

import { HealthModule } from './health/health.module'
import { ListingsModule } from './public/listings/listings.module'

const apiModules = [TerminusModule, HealthModule, ListingsModule]

@Module({
  imports: [
    ...apiModules,
    RouterModule.register([
      {
        path: 'api',
        children: [
          {
            path: 'v1',
            children: apiModules,
          },
        ],
      },
    ]),
  ],
})
export class ApiModule {}
