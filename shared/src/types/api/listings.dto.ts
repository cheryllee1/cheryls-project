import { Condition } from "../base/listings.base";

export class CreateListingReq {
  username: string;
  email: string;
  categoryId: number;
  title: string;
  description: string;
  image_url: string;
  condition: Condition;
  wishlistDescription: string;
}

export interface Listing {
  id: number;
  username: string;
  email: string;
  categoryId: number;
  title: string;
  image_url: string;
  listing_description: string;
  wishlist_description: string;
  condition: Condition;
  createdAt: string;
}
