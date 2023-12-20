// https://nuxt.com/docs/api/configuration/nuxt-config

import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';

export default defineNuxtConfig({
  typescript: {
    typeCheck: true,
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Saviour Medevices Monitoring',
    },
    buildAssetsDir: '_pms',
  },
  devtools: { enabled: true },
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        config.plugins?.push(vuetify({ autoImport: true }));
      });
    },
    '@pinia/nuxt',
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
    server: {
      proxy: {
        '/api/': {
          target: 'http://localhost:3000/',
          changeOrigin: true,
        },
      },
    },
  },
  devServer: {
    port: 3001,
  },
  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:3001/api/v1/',
    },
  },
  sourcemap: true,
});
