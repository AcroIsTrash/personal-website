// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // TODO: Set this to your real site URL once you've chosen a host.
  // It's used for the sitemap and canonical/OpenGraph URLs.
  //   - GitHub Pages (project site): 'https://<username>.github.io' + set `base: '/personal-website'`
  //   - GitHub Pages (user site):    'https://<username>.github.io'
  //   - Vercel / Netlify:            your assigned or custom domain
  site: 'https://example.com',
  // base: '/personal-website', // uncomment for a GitHub Pages *project* site
  output: 'static',
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
