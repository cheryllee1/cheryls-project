<script setup lang="ts">
import { sf } from "simpler-fetch";
import type { Listing } from "~shared/types/api";
import { HomeRoute, ListingRoute } from "../../router";
import { mapCondition } from "./mapCondition";

const props = defineProps<{ categoryId?: string }>();

const { res, err } = await sf
  .useDefault()
  // Default to 0 to ensure backend returns all items regardless of category
  .GET(`/listing?categoryId=${props.categoryId ?? 0}`)
  .runJSON<Array<Listing>>();

if (err) throw err;
if (!res.ok) throw new Error("did not get listings");

const listings = res.data;
</script>

<template>
  <div class="w-screen">
    <div class="mb-12 h-80 w-screen bg-cyan-700 text-center">
      <div class="text-left">
        <router-link :to="{ name: HomeRoute.name }" class="ml-4 mt-4 text-4xl">
          &lt;
        </router-link>
      </div>
      <p class="mb-5 pt-12 font-serif text-8xl">TradeMate</p>
      <p class="font-serif text-4xl">A Barter Way of Life</p>
    </div>

    <p class="mb-3 ml-12 font-serif text-3xl">All listings</p>
    <p class="mb-8 ml-12 font-sans text-base italic">
      Reach out to trademates via email to initiate a trade request. All
      listings will be automatically removed after two weeks.
    </p>

    <div class="m-8 mx-auto grid w-2/3 grid-cols-3 gap-4">
      <router-link
        :to="{ name: ListingRoute.name, params: { listingId: listing.id } }"
        v-for="listing in listings"
        class=""
      >
        <p class="font-arial text-base">{{ listing.username }}</p>
        <p class="font-arial mb-3 text-sm text-gray-500">
          {{ new Date(listing.createdAt).toLocaleDateString() }}
        </p>

        <img
          src="../../assets/books.png"
          class="aspect-square w-72 object-cover"
        />

        {{ listing.title }}

        <p class="font-arial mt-3 text-base font-bold">
          {{ mapCondition[listing.condition] }}
        </p>
      </router-link>
    </div>
  </div>
</template>
