<script setup lang="ts">
import { sf } from 'simpler-fetch';
import type { Listing } from '~shared/types/api';
import { AllListingRoute } from '../../router';
import { mapCondition } from './mapCondition';

const props = defineProps<{ listingId: string }>();

const { res, err } = await sf
  .useDefault()
  .GET(`/listing/${props.listingId}`)
  .runJSON<Listing>();

if (err) throw err;
if (!res.ok) throw new Error('did not get listings');

const listing = res.data;
</script>

<template>
  <div class="w-screen">
    <div class="h-72 w-screen bg-cyan-700 text-center">
      <div class="text-left">
        <router-link
          :to="{ name: AllListingRoute.name }"
          class="ml-4 mt-4 text-4xl"
        >
          &lt;
        </router-link>
      </div>
      <p class="mb-5 pt-12 font-serif text-8xl">TradeMate</p>
      <p class="font-serif text-4xl">A Barter Way of Life</p>
    </div>

    <div class="ml-12">
      <p class="mt-8 font-serif text-2xl">Books</p>

      <img
        src="https://bookstr.com/wp-content/uploads/2018/09/booki.jpg"
        class="mt-4 aspect-square w-72 object-cover"
      />

      <p class="mt-8 font-serif text-xl font-bold">{{ listing.title }}</p>

      <p class="mt-2 font-serif text-base">
        {{ mapCondition[listing.condition] }}
      </p>

      <p class="mt-8 font-serif text-lg font-bold">Description</p>

      <p class="font-serif text-base">
        {{ listing.listing_description }}
      </p>

      <p class="mt-8 font-serif text-lg font-bold">Wishlist</p>

      <p class="font-serif text-base">
        {{ listing.wishlist_description }}
      </p>

      <p class="mt-8 font-serif text-lg font-bold">Trade</p>

      <p class="font-serif text-base">Name: {{ listing.username }}</p>

      <p class="mb-32 font-serif text-base">Email: {{ listing.email }}</p>
    </div>
  </div>
</template>
