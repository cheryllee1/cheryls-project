import { type RouteLocationNormalized } from "vue-router";

export const HomeRoute = <const>{
  name: "home",
  path: "/",
  component: () => import("../views/Home.vue"),
};

export const AboutUsRoute = <const>{
  name: "about-us",
  path: "/about",
  component: () => import("../views/AboutUs.vue"),
};

export const CreateListingRoute = <const>{
  name: "listing-create",
  path: "/listing/create",
  component: () => import("../views/CreateListing.vue"),
};

export const ListingRoute = <const>{
  name: "listing",
  path: "/listing/view/:listingId",
  props: true,
  component: () => import("../views/Listing.vue"),
};

export const AllListingRoute = <const>{
  name: "listing-all",
  path: "/listing/all",
  props: (route: RouteLocationNormalized) => route.query,
  component: () => import("../views/AllListing.vue"),
};
