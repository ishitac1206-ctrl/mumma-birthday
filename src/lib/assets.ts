/**
 * Asset URLs.
 *
 * On GitHub Pages the site is served from /<repo>/, so every asset path must be
 * prefixed with Vite's BASE_URL rather than starting with a bare slash.
 */
const base = import.meta.env.BASE_URL;

/** `asset('mother/heart.jpg')` -> `/<base>/assets/mother/heart.jpg` */
export function asset(path: string): string {
  return `${base}assets/${path.replace(/^\/+/, '')}`;
}

/** `audio('universe.mp3')` -> `/<base>/audio/universe.mp3` */
export function audio(file: string): string {
  return `${base}audio/${file.replace(/^\/+/, '')}`;
}
