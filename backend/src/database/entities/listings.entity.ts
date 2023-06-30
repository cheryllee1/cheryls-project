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
    (user: User) => User.Listings,
    {
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      nullable: false,
    },
  )
  ownerId: User

  @Column('int4')
  categoryId: number
  @Index()
  @ManyToOne(
    () => Category,
    (category: Category) => category.listings,
    {
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      nullable: false,
    },
  )
  category?: Category

  @OneToMany(
    () => TradeRequests,
    (tradeRequests: TradeRequests) => tradeRequests.listings,
    {
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  )
  tradeRequests?: TradeRequests[]


  @Column('int4')
  ownerID: number

  @Column('varchar')
  title: string

  @Column('varchar')
  description: string

  @Column('varchar')
  photos: string

  @Column('enum')
  condition: Condition

  @Column('varchar')
  photo: string

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
  static category: any
  static Category: any
}

