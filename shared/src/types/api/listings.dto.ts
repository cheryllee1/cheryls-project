import { Condition } from "../base/listings.base"


export class CreateListingReq {
    emailAddress: string
    categoryId: number
    title: string
    description: string
    condition: Condition
    listingPhoto: string[]
    wishlistId: number
    wishlistDescription: string
    wishlistPhoto: string

}

export class UpdateListingReq {
    emailAddress: string
    listingId: number
    title: string
    description: string
    condition: Condition
    listingPhoto: string[]
    wishlistId: number
    wishlistDescription: string
    wishlistPhoto: string

}

export class DeleteListingReq {
    emailAddress: string
    listingId: number

}