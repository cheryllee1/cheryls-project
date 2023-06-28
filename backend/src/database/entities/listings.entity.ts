import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm'

import { IsGovSgEmail } from '~shared/decorators/is-gov-sg-email'
import { User } from './user.entity'
import { WishlistItems } from './wishlist.items.entity'
import { Category } from './category.entity'
import { TradeRequests } from './trade.requests.entity'

export enum Condition {
  BrandNew = 'BrandNew',
  LikeNew = 'LikeNew',
  SlightlyUsed = 'SlightlyUsed',
  WellUsed = 'WellUsed',
}

export enum Status {
  Available = 'Available',
  Reserved = 'Reserved',
  Traded = 'Traded',
}

@Entity({ name: 'listing' })
@Unique(['listing'])
export class Listings extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column('int4')
  Id: number
  @Index()
  @ManyToOne(
    () => Listings,
    (listings: Listings) => Listings.user,
    {
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      nullable: false,
    },
  )
  listings: Listings

  @Column('int4')
  categoryId: number
  @Index()
  @ManyToOne(
    () => Listings,
    (category: Listings) => category.listings
      {
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      nullable: false,
    },
  )
  category?: Listings

  // duration in minutes
  @Column('int4')
  ownerID: number

  // duration in minutes
  @Column('varchar')
  title: string

  // duration in minutes
  @Column('varchar')
  description: string

  @Column('enum')
  condition: Condition

  @Column('enum')
  status: Status

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date

  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt: Date | null
  itemListings: any
  static user: any
  wishlistItems: any
  static tradeRequests: any
}

