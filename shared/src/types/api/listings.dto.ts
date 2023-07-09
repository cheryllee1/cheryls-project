import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

import { Condition } from '../base/listings.base';

export class CreateListingReq {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsPositive()
  @IsNumber()
  categoryId: number;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsEnum(Condition)
  condition: Condition;

  @IsString()
  wishlistDescription: string;
}

export interface Listing {
  id: number;
  username: string;
  email: string;
  categoryId: number;
  title: string;
  listing_description: string;
  wishlist_description: string;
  condition: Condition;
  createdAt: string;
}
