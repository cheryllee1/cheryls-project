import { Column, Entity, ManyToMany, OneToMany, PrimaryColumn } from 'typeorm'

import { IsGovSgEmail } from '~shared/decorators/is-gov-sg-email'
import { User } from './user.entity'
import { Listings } from './listings.entity'
import { WishlistItems } from './wishlist.items.entity'
import { listingWishlist } from './listing.wishlist.entity'


@Entity({ name: 'category' })
export class Category extends BaseEntity {
  @PrimaryColumn()
  id: number

  @Column('varchar', { length: 255 })
  name: string

}
