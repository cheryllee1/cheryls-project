import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'

import { IsGovSgEmail } from '~shared/decorators/is-gov-sg-email'
import { User } from './user.entity'
import { Listings } from './listings.entity'
import { WishlistItems } from './wishlist.items.entity'
import { Category } from './category.entity'

export enum Status {
    ACCEPT = 'Accept',
    REJECT = 'Reject',
}

@Entity({ name: 'tradeRequests' })
export class TradeRequests extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(
        () => Listings,
        (listings: Listings) =>
            Listings.tradeRequests,
        {
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
            nullable: false,
        },
    )
    Listings?: Listings

    @ManyToOne(
        () => User,
        (user: User) =>
            user.tradeRequests,
        {
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
            nullable: false,
        },
    )
    tradeRequests?: TradeRequests


    @Column('int4')
    @Index()
    requesterId: number

    @Column('int4')
    @Index()
    listingId: number

    @Column('jsonb')
    @Index()
    offeringId: string

    @Column('enum')
    @Index()
    status: Status

    @Column('varchar')
    photo: string

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date

    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date
    static Listings: any
    listing: any
    listings: any

}
