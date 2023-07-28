<script setup lang="ts">
import { HomeRoute } from "../router";
</script>

<template>
  <div class="h-screen w-screen">
    <div class="h-1/3 w-screen bg-cyan-700 text-center">
      <div class="text-left">
        <router-link :to="{ name: HomeRoute.name }" class="ml-4 mt-4 text-4xl">
          &lt;
        </router-link>
      </div>
      <p class="mb-5 pt-12 font-serif text-8xl">TradeMate</p>
      <p class="font-serif text-4xl">A Barter Way of Life</p>
    </div>

    <div class="mx-16 pt-24 font-serif text-lg">
      <p class="mb-6 mr-3 text-4xl">The TradeMate Story</p>

      <p class="mb-3">
        TradeMate was developed by Cheryl, a product manager at Open Government
        Products who was tasked to develop a webapp in under 10 weeks.
      </p>
      <p class="mb-3">
        She realised how she owns a bunch of things that she no longer has use
        for and would often wish she could trade them for other items. From
        video games and books still in decent condition, to brand new things
        like bedsheets she regretted purchasing, she decided to build a webapp
        that would facilitate smooth exchanges between users.
      </p>
      <p class="mb-3">
        She hopes that users can connect with like-minded individuals, forge new
        friendships, and uncover treasures that spark joy in their lives. For
        each item listing you create to put an item up for exchange, you may
        indicate an item you hope to receive in return, so that those who have
        it can find you. Go on and start your TradeMate journey!
      </p>
    </div>
  </div>
</template>
