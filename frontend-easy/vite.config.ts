import { defineConfig } from 'vite';
import path from 'path';

import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '~shared': path.resolve(__dirname, '../shared/build'),
    },
  },
});
