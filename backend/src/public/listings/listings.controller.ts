import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { S3Service } from "S3/S3.service";

import { CreateListingReq } from "~shared/types/api";
import { ListingsService } from "./listings.service";

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

  @Post("new/create")
  createListing(@Body() listing: CreateListingReq) {
    return this.listingService.createListing(listing);
  }

  @Post("file")
  @UseInterceptors(FileInterceptor("file"))
  async uploadFileAndPassValidation(
    @UploadedFile()
    file: Express.Multer.File
  ) {
    return this.s3Service.uploadFile(file);
  }
}
