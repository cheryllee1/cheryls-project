import { Module } from "@nestjs/common";
import { S3Service } from "./S3.service";

@Module({
  exports: [S3Service],
  providers: [S3Service],
})
export class S3ServiceModule {}
