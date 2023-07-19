// Import to run the side effect of setting base Urls before it is used elsewhere
import './API';

import Vue from 'vue';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { router } from './router';
import App from './App.vue';
import VueGtag from 'vue-gtag';

createApp(App)
  .use(router)
  .use(VueGtag, {
    config: { id: 'G-Q3G07BKKZ5' },
  })
  .use(createPinia().use(piniaPluginPersistedstate))
  .mount('#app');
