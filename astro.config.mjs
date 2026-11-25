import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://arkan-ac.eg',
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
});
