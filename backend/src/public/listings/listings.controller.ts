import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpStatus,
  Param,
  ParseFilePipe,
  ParseFilePipeBuilder,
  ParseIntPipe,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";

// import { CreateListingReq } from '~shared/types/api';
import { ListingsService } from "./listings.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { S3Service } from "S3/S3.service";

@Controller("listing")
export class ListingsController {
  constructor(
    private listingService: ListingsService,
    private s3Service: S3Service
  ) {}

  @Get(":listingId")
  async find(@Param("listingId", ParseIntPipe) listingId: number) {
    const listing = await this.listingService.find(listingId);
    if (!listing) {
      throw new Error("Listing not found");
    }

    return listing;
  }

  @Get()
  findAll(
    @Query("categoryId", ParseIntPipe)
    categoryId: number
  ) {
    return this.listingService.findAll(categoryId);
  }

  // Can you help me enable global validation pipe so that it will actually validate the DTO, i cant figure out where is the validation pipe set
  // looks like logged validation pipe but no idea why it is not running validation and transformation

  @Post("new/create")
  // createListing(@Body() listing: CreateListingReq) {
  createListing(@Body() listing: any) {
    return this.listingService.createListing(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      listing as unknown as CreateListingReq
    );
  }

  @Post("file")
  @UseInterceptors(FileInterceptor("file"))
  uploadFileAndPassValidation(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addMaxSizeValidator({
          maxSize: 100000,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        })
    )
    file: Express.Multer.File
  ) {
    this.s3Service.uploadFile(file);
    return {
      file: file.buffer.toString(),
    };
  }
}

import { PipeTransform, Injectable, ArgumentMetadata } from "@nestjs/common";

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    // "value" is an object containing the file's attributes and metadata
    const oneKb = 10000;
    return value.size < oneKb;
  }
}
