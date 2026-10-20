// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// GitHub Pages: strona serwowana pod https://emikaproduction.github.io/ig/
export default defineConfig({
  site: 'https://emikaproduction.github.io',
  base: '/ig/',
  vite: { plugins: [tailwindcss()] },
});
