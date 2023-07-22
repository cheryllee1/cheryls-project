import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common'

// import { CreateListingReq } from '~shared/types/api';
import { ListingsService } from './listings.service'

@Controller('listing')
export class ListingsController {
  constructor(private listingService: ListingsService) {}

  @Get(':listingId')
  async find(@Param('listingId', ParseIntPipe) listingId: number) {
    const listing = await this.listingService.find(listingId)
    if (!listing) {
      throw new Error('Listing not found')
    }

    return listing
  }

  @Get()
  findAll(
    @Query('categoryId', new DefaultValuePipe(0), ParseIntPipe)
    categoryId?: number,
  ) {
    return this.listingService.findAll(categoryId)
  }

  // Can you help me enable global validation pipe so that it will actually validate the DTO, i cant figure out where is the validation pipe set
  // looks like logged validation pipe but no idea why it is not running validation and transformation

  @Post('new/create')
  // createListing(@Body() listing: CreateListingReq) {
  createListing(@Body() listing: any) {
    return this.listingService.createListing(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      listing as unknown as CreateListingReq,
    )
  }
}
