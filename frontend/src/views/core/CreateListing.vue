<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { sf } from "simpler-fetch";
import { HomeRoute } from "../../router";
import { categories } from "./categories";
import { Condition, CreateListingReq } from "~shared/types";
// import { axios } from "axios";

const router = useRouter();

const listingTitle = ref("");
const itemDescription = ref("");
const wishlistDescription = ref("");
// const itemPhoto = ref('');
const yourName = ref("");
const yourEmail = ref("");

const selectedCategory = ref<string | undefined>(undefined);

const listofcondition = [
  "Brand New",
  "Like New",
  "Slightly Used",
  "Well Used",
] as const;

const selectedCondition = ref<(typeof listofcondition)[number] | undefined>(
  undefined
);

async function listItem() {
  const { res, err } = await sf
    .useDefault()
    .POST("/listing/new/create")
    .bodyJSON<CreateListingReq>({
      username: yourName.value,
      email: yourEmail.value,
      categoryId: parseInt(selectedCategory.value ?? "1"),
      condition: selectedCondition.value?.replace(" ", "") as Condition,
      title: listingTitle.value,
      description: itemDescription.value,
      wishlistDescription: wishlistDescription.value,
    })
    .run();

  if (err) throw err;
  if (!res.ok) throw new Error("submission failed");

  alert("Success!");

  router.push({ name: HomeRoute.name });
}

async function handleFileUpload() {
  return;
}
// async function handleFileUpload(event) {
//   this.file = event.target.files[0];
//   let formData = new FormData();
//   formData.append("file", this.file);
//   axios
//     .post("/single-file", formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     })
//     .then(function () {
//       console.log("SUCCESS!!");
//     })
//     .catch(function () {
//       console.log("FAILURE!!");
//     });
// }
</script>

<template>
  <div class="w-screen">
    <div class="mb-24 h-80 w-screen bg-cyan-700 text-center">
      <div class="text-left">
        <router-link :to="{ name: HomeRoute.name }" class="ml-4 mt-4 text-4xl">
          &lt;
        </router-link>
      </div>
      <p class="mb-5 pt-12 font-serif text-8xl">TradeMate</p>
      <p class="font-serif text-4xl">A Barter Way of Life</p>
    </div>

    <!-- Form fields -->
    <div class="mx-auto max-w-sm">
      <p class="font-serif text-3xl">What are you listing today?</p>

      <!-- Category dropdown -->
      <select
        v-model="selectedCategory"
        class="my-4 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
      >
        <option
          disabled
          :value="undefined"
          :selected="selectedCategory === undefined"
        >
          Select Category
        </option>
        <option
          v-for="category in categories"
          :key="category.id"
          :value="category.id"
          :selected="selectedCategory === category.id"
        >
          {{ category.name }}
        </option>
      </select>

      <!-- Listing Title -->
      <input
        v-model="listingTitle"
        type="text"
        class="my-4 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
        placeholder="Listing Title"
      />

      <!-- Item Description -->
      <textarea
        v-model="itemDescription"
        id="message"
        rows="4"
        class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
        placeholder="Item Description"
      ></textarea>

      <!-- Item Photo -->
      <label
        class="mb-2 mt-8 block text-sm font-medium text-gray-900"
        for="file_input"
      >
        Upload a photo of your item
      </label>
      <input
        class="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none"
        id="file"
        type="file"
        v-on:change="handleFileUpload"
      />

      <!-- Condition dropdown -->
      <select
        v-model="selectedCondition"
        class="my-4 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
      >
        <option
          disabled
          :value="undefined"
          :selected="selectedCondition === undefined"
        >
          Select Condition
        </option>
        <option
          v-for="condition in listofcondition"
          :key="condition"
          :value="condition"
          :selected="selectedCondition === condition"
        >
          {{ condition }}
        </option>
      </select>

      <!-- Wishlist -->
      <input
        v-model="wishlistDescription"
        type="text"
        class="my-4 mb-8 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
        placeholder="State the item you wish to receive in return"
      />

      <p class="mb-2 block text-sm font-medium text-gray-900">
        Share your details so that trademates can contact you
      </p>

      <input
        v-model="yourName"
        type="text"
        class="my-4 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
        placeholder="Your Name"
      />

      <input
        v-model="yourEmail"
        type="text"
        class="my-4 mb-12 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
        placeholder="Your Email"
      />

      <button
        class="mb-12 w-full rounded bg-cyan-700 p-2.5 text-white"
        @click="listItem"
      >
        List now!
      </button>
    </div>
  </div>
</template>
