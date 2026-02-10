import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  integrations: [react()],
  site: 'https://supparer2.github.io',
  base: '/theundertakerpart2.github.io',
  build: {
    assets: '_astro'
  },
  vite: {
    ssr: {
      external: ['node:async_hooks'],
    },
  },
});


