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
  server: {
    open: 'http://localhost:3000',
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8080',
        changeOrigin: true,
        secure: false,
        timeout: 10000,
      },
      '/socket.io': {
        target: 'ws://127.0.0.1:8080',
        ws: true,
      },
    },
  },
  preview: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8080',
        changeOrigin: true,
        secure: false,
        timeout: 10000,
      },
    },
  },
});
