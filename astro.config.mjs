// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // GitHub Pages *project* site for AcroIsTrash/personal-website.
  // Served at https://acroistrash.github.io/personal-website/
  site: 'https://acroistrash.github.io',
  base: '/personal-website',
  trailingSlash: 'ignore',
  output: 'static',
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
