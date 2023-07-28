import { Module } from "@nestjs/common";

// import { AuthModule } from 'auth/auth.module';
import { ListingsController } from "./listings.controller";
import { ListingsServiceModule } from "./listings.service.module";
import { S3ServiceModule } from "S3/S3.service.module";

@Module({
  imports: [ListingsServiceModule, S3ServiceModule],
  controllers: [ListingsController],
})
export class ListingsModule {}
