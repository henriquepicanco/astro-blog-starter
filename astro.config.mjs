// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import rehypeClassNames from 'rehype-class-names';

// https://astro.build/config
export default defineConfig({
  site: "http://localhost:4321",
  vite: {
    plugins: [tailwindcss()]
  },
  markdown: {
    rehypePlugins: [
      [rehypeClassNames, {
        "h1": "text-2xl",
        "p": "mb-4"
      }]
    ]
  }
});
