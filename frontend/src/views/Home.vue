<script setup lang="ts">
import { AboutUsRoute, CreateListingRoute, AllListingRoute } from "../router";

import { categories } from "./categories";

// Utility function to get the URL of a image after file name mangling using the vite method.
const getImageUrl = (imageID: string) =>
  new URL(`../assets/${imageID}.jpg`, import.meta.url).href;
</script>

<template>
  <div class="w-screen">
    <div class="mb-20 h-64 w-screen bg-cyan-700 text-center">
      <img class="inline-block flex flex-row" src="../assets/Logo.png" alt="" />
      <p class="-mt-32 pt-12 font-serif text-8xl">TradeMate</p>
      <p class="mt-4 font-serif text-4xl">A Barter Way of Life</p>
    </div>

    <div
      class="flex flex-row justify-center space-x-6 font-bold underline decoration-cyan-700 decoration-4"
    >
      <router-link :to="{ name: AboutUsRoute.name }">ABOUT US</router-link>
      <router-link :to="{ name: CreateListingRoute.name }">
        CREATE LISTING
      </router-link>
      <router-link :to="{ name: AllListingRoute.name }">
        ALL LISTINGS
      </router-link>
    </div>

    <!-- Categories icons -->
    <div class="mb-8 mt-8 grid grid-cols-4 gap-4">
      <router-link
        :to="{ name: AllListingRoute.name, query: { categoryId: category.id } }"
        v-for="category in categories"
        :key="category.id"
      >
        <img
          :src="getImageUrl(category.id)"
          class="aspect-square w-72 object-cover"
        />

        <p class="text-base font-bold text-cyan-700">
          {{ category.name }}
        </p>
      </router-link>
    </div>
  </div>
</template>
