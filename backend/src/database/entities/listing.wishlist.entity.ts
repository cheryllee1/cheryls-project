import {
    BaseEntity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    Index,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn,
} from 'typeorm'

import { IsGovSgEmail } from '~shared/decorators/is-gov-sg-email'
import { User } from './user.entity'
import { Listings } from './listings.entity'
import { WishlistItems } from './wishlist.items.entity'

@Entity({ name: 'listing_wishlist' })
@Unique(['listing', 'wishlist'])
export class listingWishlist extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column('int4')
    listingId: number
    @Index()
    @OneToOne(
        () => Listings,
        (listings: Listings) => listings.wishlistItems,
        {
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
            nullable: false,
        },
    )
    listings?: Listings

    @Column('int4')
    wishlistId: number
    @Index()
    @OneToOne(
        () => WishlistItems,
        (wishlistitems: WishlistItems) => wishlistitems.Listings,
        {
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
            nullable: false,
        },
    )
    wishlistitems?: WishlistItems

}
