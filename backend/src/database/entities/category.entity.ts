import { BaseEntity, Column, Entity, ManyToMany, OneToMany, PrimaryColumn } from 'typeorm'

import { IsGovSgEmail } from '~shared/decorators/is-gov-sg-email'
import { User } from './user.entity'
import { Listings } from './listings.entity'
import { WishlistItems } from './wishlist.items.entity'
import { TradeRequests } from './trade.requests.entity'


@Entity({ name: 'category' })
export class Category extends BaseEntity {
  @PrimaryColumn()
  id: number

  @Column('varchar')
  categoryName: string

  @Column('jsonb')
  photos: string[]

  @OneToMany(
    () => Listings,
    (listing: Listings) => listing.category,
    {
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  )
  listings: Listings[]

}






