import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Listings } from '../../database/entities/listings.entity'

@Injectable()
export class ListingsService {
    category: any
    listingRepository: any
    constructor(
        @InjectRepository(Listings)
        private listingsRepository: Repository<Listings>,
    ) { }

    findAll(): Promise<Listings[]> {
        return this.listingsRepository.find({
            order: {
                id: 'ASC',
            },
        })
    }

    find(listingId: number): Promise<Listings | null> {
        return this.listingRepository.findOne({
            where: {
                id: listingId,
            },
        })
    }

    async createListing(listing: CreateListingReq): Promise<number> {
        const newListing: Listings = {
            categoryId: listing.categoryId,
            title: listing.title,
            description: listing.description,
            condition: listing.condition,
            listingPhoto: listing.listingPhoto,
            wishlistItems: {
                description: listing.wishlistDescription,
                photo: listing.wishlistPhoto,
                title: listing.wishlistTitle

            }

        }
        await this.listingsRepository.save(newListing)
    }


}




export class CreateListingReq {
    emailAddress: string
    categoryId: number
    title: string
    description: string
    condition: Condition
    listingPhoto: string[]
    wishlistId: number
    wishlistDescription: string
    wishlistPhoto: string
    wishlistTitle: any

}

