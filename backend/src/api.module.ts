import { Module } from "@nestjs/common";
import { RouterModule } from "@nestjs/core";

import { ListingsModule } from "./public/listings/listings.module";

const apiModules = [ListingsModule];

@Module({
  imports: [
    ...apiModules,

    RouterModule.register([
      {
        path: "api",
        children: [
          {
            path: "v1",
            children: apiModules,
          },
        ],
      },
    ]),
  ],
})
export class ApiModule {}
