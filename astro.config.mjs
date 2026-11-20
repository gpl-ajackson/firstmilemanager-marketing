import { readdirSync, readFileSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Draft legal pages are noindex, so keep them out of the sitemap too.
const legalDir = new URL('./src/content/legal/', import.meta.url);
const draftLegalPages = readdirSync(legalDir)
  .filter((file) => file.endsWith('.md') && !/^draft:\s*false\s*$/m.test(readFileSync(new URL(file, legalDir), 'utf8')))
  .map((file) => `/${file.replace(/\.md$/, '')}`);
const unlisted = [...draftLegalPages];

export default defineConfig({
  site: 'https://firstmilemanager.co.uk',
  trailingSlash: 'never',
  // Cloudflare Pages serves early-access.html at /early-access, but early-access/index.html at /early-access/ (with a redirect),
  // so build files rather than directories to keep URLs free of trailing slashes.
  build: { format: 'file' },
  integrations: [sitemap({ filter: (page) => !unlisted.includes(new URL(page).pathname.replace(/\/$/, '')) })],
  vite: { plugins: [tailwindcss()] },
});
