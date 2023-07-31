import { Condition } from "../base/listings.base";

export class CreateListingReq {
  username: string;
  email: string;
  categoryId: number;
  title: string;
  description: string;
  imageUrl: string;
  condition: Condition;
  wishlistDescription: string;
}

export interface Listing {
  id: number;
  username: string;
  email: string;
  categoryId: number;
  title: string;
  imageUrl: string;
  listing_description: string;
  wishlist_description: string;
  condition: Condition;
  createdAt: string;
}
