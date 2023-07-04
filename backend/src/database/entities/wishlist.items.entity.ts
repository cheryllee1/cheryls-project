import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    Index,
    ManyToOne,
    PrimaryGeneratedColumn,
    OneToOne,
    UpdateDateColumn,
} from 'typeorm'

import { IsGovSgEmail } from '~shared/decorators/is-gov-sg-email'
import { User } from './user.entity'
import { Listings } from './listings.entity'


@Entity({ name: 'wishlistItems' })
export class WishlistItems {
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(
        () => Listings,
        (listings: Listings) => listings.wishlistItems,
        {
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
    )
    listings?: Listings

    @Column('int4')
    userId: number
    @Index()
    @ManyToOne(() => User, (user: User) => user.wishlistItems, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        nullable: false,
    })
    user: User

    @Column('varchar', { length: 255 })
    title: string

    @Column('varchar', { length: 255 })
    description: string

    @Column('jsonb')
    photos: string[]

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date

    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date

    @DeleteDateColumn({ type: 'timestamptz' })
    deletedAt: Date | null
}
