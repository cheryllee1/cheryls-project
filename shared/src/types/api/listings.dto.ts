import { Condition } from '../base/listings.base';

export class CreateListingReq {
  username: string;
  email: string;
  categoryId: number;
  title: string;
  description: string;
  condition: Condition;
  wishlistDescription: string;
}
