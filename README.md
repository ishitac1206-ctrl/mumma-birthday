# A Universe of You ✨

An interactive celestial birthday website — a private digital gift.

> *Some people make the world brighter simply by being in it.
> This little universe is dedicated to one of them.*

---

## The two files you'll actually edit

| File | What it holds |
| --- | --- |
| **[`CONTENT.md`](./CONTENT.md)** | Every word on the website. Edit it, save it, done. |
| **[`ASSETS.md`](./ASSETS.md)** | The photo checklist — exact filenames and where each one goes. |

You never need to open a `.tsx` file.

---

## Running it on this Mac

```bash
npm install
npm run dev
```

Then open the URL it prints — normally <http://localhost:5173>.

The dev server watches `CONTENT.md` and the asset folders, so saving a change or dropping
in a photograph updates the page in front of you within a second.

### All commands

| Command | Does |
| --- | --- |
| `npm run dev` | Local development server with live reload |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serves the built `dist/` locally — the honest final check |
| `npm run lint` | Static checks |

---

## How it's put together

```
CONTENT.md              ← all the words
ASSETS.md               ← the photo checklist
public/
  assets/
    mother/             ← the 7 chapter portraits (the important folder)
    guiding-star/ heart/ professor/ magic/ wishes/
    memories/
      childhood/ adventures/ ordinary-days/ family/ stories/
    awards/ backgrounds/
  audio/                ← optional background music
src/
  components/
    celestial/          ← starfields, nebulae, shooting stars, illustrations
    cards/              ← chapter cards, quote cards, note cards
    badges/             ← the seven hand-drawn award badges
    gallery/            ← photo galleries and the lightbox
    layout/             ← navigation, music control, page transitions
  pages/
    chapters/           ← the eight chapter landing pages
    content/            ← the inner content pages
    awards/             ← the Hall of Fame award pages
  layouts/              ← the reusable chapter and content page shells
  animations/           ← shared motion variants
  data/
    structure.ts        ← the map of the universe: routes, moods, constellations
  styles/
    theme.css           ← palette, typography and motion tokens
```

**The principle:** `structure.ts` knows the *shape* of the site, `CONTENT.md` knows the
*words*, and the components know only how to make things beautiful. Nothing personal is
ever hardcoded in a component.

### Design tokens

The palette lives in one place, [`src/styles/theme.css`](./src/styles/theme.css):

| Token | Hex | Used for |
| --- | --- | --- |
| `midnight` | `#100D26` | deepest sky |
| `violet-deep` | `#21143D` | card surfaces, mid sky |
| `cosmic` | `#6544A0` | nebula bloom |
| `lavender` | `#BBA5F5` | borders, glows, poetic type |
| `dusty` | `#E9B8D4` | pink accents |
| `blush` | `#F6DCEB` | body text |
| `pearl` | `#FFF8FF` | headings |
| `champagne` | `#E9D5A1` | gold detail, focus rings |

Typefaces: **Cormorant Garamond** for display headings, **Lora** italic for poetic
subtitles, **DM Sans** for body text.

---

## Accessibility & performance notes

- `prefers-reduced-motion` is respected — animation is gated in CSS *and* in code.
- No hover-only interactions: everything works by touch.
- Photographs lazy-load; the backgrounds are gradients and SVG, not image downloads.
- Music never autoplays, and the control hides itself if no audio file is present.
- Every page works with its photograph missing, so the site is never broken mid-build.

---

## Deploying (Phase 5)

Built for GitHub Pages via GitHub Actions. The workflow sets `VITE_BASE` to `/<repo>/`
so assets and deep links resolve on a project site, and copies `index.html` to `404.html`
so a refresh on an inner page still works with client-side routing.

Updating the live site later is one commit:

```bash
git add -A && git commit -m "Add Chapter 4 photographs" && git push
```

GitHub Actions rebuilds and republishes within a minute or two.

---

## Project status

- [x] **Phase 1** — Setup, structure, `CONTENT.md`, `ASSETS.md`
- [x] **Phase 2** — All 41 routes built
- [~] **Phase 3** — Content and photographs (ongoing; the site reads them live)
- [x] **Phase 4** — Tested: 42 routes, desktop + mobile, no console errors
- [ ] **Phase 5** — Publish to GitHub Pages

---

*Built with React, Vite, TypeScript, Tailwind CSS, Framer Motion and React Router.*
