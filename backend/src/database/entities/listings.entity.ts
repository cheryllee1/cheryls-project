import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Condition } from '~shared/types/base/listings.base';

@Entity({ name: 'listing' })
export class Listing extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  username: string;

  @Column('varchar')
  email: string;

  @Column('int')
  categoryId: number;

  @Column('varchar')
  title: string;

  @Column('varchar')
  listing_description: string;

  @Column('varchar')
  wishlist_description: string;

  @Column({ type: 'enum', enum: Condition, default: Condition.BrandNew })
  condition: Condition;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}
