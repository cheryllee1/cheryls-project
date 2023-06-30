import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { IsGovSgEmail } from '~shared/decorators/is-gov-sg-email'
import { WishlistItems } from './wishlist.items.entity'
import { Listings } from './listings.entity'
import { TradeRequests } from './trade.requests.entity'
import { Category } from './category.entity'

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @OneToMany(
    () => WishlistItems,
    (wishlistItems: WishlistItems) => wishlistItems.user,
    {
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  )
  wishlistItems?: WishlistItems[]

  @OneToMany(
    () => TradeRequests,
    (tradeRequests: TradeRequests) => tradeRequests.requesterId,
    {
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  )
  tradeRequests?: TradeRequests[]

  @OneToMany(
    () => Listings,
    (listings: Listings) => listings.ownerId,
    {
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  )
  listings?: Listings[]

  @Column('varchar', { length: 255 })
  first_last_name: string

  @Column('varchar', { length: 255 })
  @Index('user_email_idx', {
    unique: true,
    where: '"deletedAt" IS NULL',
  })
  email: string

  @Column('varchar', { length: 255, nullable: true })
  @Index()
  phoneNumber: string | null

  @Column('varchar', { length: 255 })
  social_media: string

  @Column('varchar')
  photo: string

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date

  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt: Date | null
  static Listings: any
}
