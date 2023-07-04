import { Body, Injectable, Req } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { wishlistItems } from 'database/entities'

import { AllowedResource, ApiKeyAction, Permission } from '~shared/types/base'
import { IsEmail } from 'class-validator'

@Injectable()
export class wishlistItems {
    wishlistItemsRepository: any
    constructor(
        @InjectRepository(wishlistItems),
    ) { }

    findAll(): Promise<wishlistItems[]> {
        return this.wishlistItemsRepository.find({
            order: {
                id: 'ASC',
            },
        })
    }

    find(id: number): Promise<wishlistItems | null> {
        return this.wishlistItemsRepository.findOne({
            where: {
                id: wishlistItems,
                publicVisible: true, // Don't allow non public visible APIs to be queried
            },
        })
    }

    async enumeratePermissionsForAllListings(): Promise<Permission[]> {
        const wishlistItems = await this.findAll()
        const permissions = Object.values(AllowedResource).flatMap((resource) =>
            wishlistItems.flatMap(({ id: wishlistItems }) => [
                { wishlistItems, resource, action: ApiKeyAction.READ },
                { wishlistItems, resource, action: ApiKeyAction.WRITE },
            ]),
        )
        return permissions
    }


    async upsertwishlistItems(
        user: Partial<wishlistItems> & Pick<wishlistItems, 'wishlistItemsid'>,
        allowwishlistItemsUpdate = true,
    ): Promise<wishlistItems> {
        return this.Repository.manager.transaction(
            async (manager: EntityManager): Promise<wishlistItems> => {
                const existingUser = await this.getBywishlistItemid({
                    wishlistItemid: ownerId.wishlistItemid ?? '',
                    findOne: (opts) =>
                        manager.findOne(listingid, {
                            ...opts,
                        }),

                }}
  }
