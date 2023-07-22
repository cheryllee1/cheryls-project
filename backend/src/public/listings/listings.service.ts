import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import type { CreateListingReq } from '~shared/types/api'

import { Listing } from '../../database/entities'

@Injectable()
export class ListingsService {
  constructor(
    @InjectRepository(Listing)
    private listingsRepository: Repository<Listing>,
  ) {}

  findAll(categoryId?: number): Promise<Listing[]> {
    if (categoryId === 0)
      return this.listingsRepository.find({
        order: { id: 'DESC' },
      })
    else
      return this.listingsRepository.find({
        where: { categoryId },
        order: { id: 'DESC' },
      })
  }

  find(listingId: number): Promise<Listing | null> {
    return this.listingsRepository.findOne({
      where: {
        id: listingId,
      },
    })
  }

  async createListing(listing: CreateListingReq) {
    await this.listingsRepository.save({
      username: listing.username,
      email: listing.email,
      categoryId: listing.categoryId,
      title: listing.title,
      listing_description: listing.description,
      wishlist_description: listing.wishlistDescription,
      condition: listing.condition,
    })
  }

  async deleteListing(listingId: number) {
    await this.listingsRepository.delete({ id: listingId })
  }
}
