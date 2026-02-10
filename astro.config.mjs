// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  output: 'static',
  adapter: cloudflare(),
  // Remove base since this will be a user site at root URL
  base: '/',
  site: 'https://supparer2.github.io',
});




