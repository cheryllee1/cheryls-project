// Import to run the side effect of setting base Urls before it is used elsewhere
import "./API";

import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { createApp } from "vue";
import VueGtag from "vue-gtag";

import App from "./App.vue";
import { router } from "./router";

createApp(App)
  .use(router)
  .use(VueGtag, {
    config: { id: "G-Q3G07BKKZ5" },
  })
  .use(createPinia().use(piniaPluginPersistedstate))
  .mount("#app");
