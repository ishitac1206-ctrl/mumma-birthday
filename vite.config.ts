import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// `base` matters for GitHub Pages: a project site is served from
// https://<user>.github.io/<repo>/ , so assets must be requested from /<repo>/.
// The deploy workflow sets VITE_BASE; local dev stays at '/'.
export default defineConfig({
  base: process.env.VITE_BASE ?? '/',
  plugins: [react(), tailwindcss()],
});
