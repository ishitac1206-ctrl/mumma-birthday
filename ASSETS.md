# ASSETS.md — Image & Audio Checklist

## Status

| Batch | Items | State |
| --- | --- | --- |
| **1 · Chapter portraits** | 6 photos | ✅ **Done** — all six supplied, optimised and live |
| 2 · Inner page photos | up to 14 | ○ Optional, none supplied |
| 3 · Illustrations & badges | ~20 | ✅ Hand-built in SVG |
| 4 · Audio | 1 file | ○ Optional, none supplied |

**Nothing is outstanding.** Everything below is optional depth you can add
whenever you like, including long after her birthday.

---

## How to add a photograph

1. Find the row below — it gives you the **exact filename** to use.
2. Save your photo under that name into the folder shown.
3. Run `npm run deploy`. That's it.

**Send the largest original you have** — don't crop or resize. Images are
optimised for mobile as part of the build. HEIC (the iPhone default) will not
display in a browser; send it and it gets converted.

---

## BATCH 1 — The chapter portraits ✅ DONE

📁 `public/assets/mother/`

| Filename | Chapter it opens | State |
| --- | --- | --- |
| `guiding-star.jpg` | 01 · The Guiding Star | ✅ |
| `heart.jpg` | 02 · A Heart Like Yours | ✅ |
| `professor.jpg` | 03 · The Professor | ✅ |
| `magic.jpg` | 04 · Your Kind of Magic | ✅ |
| `hall-of-fame.jpg` | 05 · The Hall of Fame | ✅ |
| `wishes.jpg` | 06 · Wishes Written in the Stars | ✅ |

Chapter 07, the final letter, uses a glowing celestial flower rather than a
photograph. To add one anyway, drop in `public/assets/mother/letter.jpg`.

To **replace** any portrait, overwrite the file with the same name and deploy.

---

## BATCH 2 — Supporting photographs ○ ALL OPTIONAL

One photograph per inner page, shown smaller, beneath that page's illustration.
**Every one of these pages has a custom illustration that stands alone** — a
glowing open book, a crescent moon, a cosmic flower — so skip any row freely.

### 📁 `public/assets/guiding-star/`

| Filename | Page | Orientation | Suggested subject |
| --- | --- | --- | --- |
| `things-you-taught-me.jpg` | Things You Taught Me | Landscape | Her teaching or explaining; the two of you together. |
| `my-safest-place.jpg` | My Safest Place | Landscape | Home, a hug, a familiar room, childhood you with her. |
| `the-woman-i-hope-to-become.jpg` | The Woman I Hope to Become | Portrait | You and her together, ideally recent. |
| `things-i-never-say-enough.jpg` | Things I Never Say Enough | Landscape | A quiet, candid photo of her. |

### 📁 `public/assets/heart/`

| Filename | Page | Orientation | Suggested subject |
| --- | --- | --- | --- |
| `the-kindness-you-carry.jpg` | The Kindness You Carry | Landscape | Her with family, guests, anyone she looks after. |
| `the-little-things.jpg` | The Little Things | Landscape | Everyday warmth — cooking, tea, a shared table. |
| `a-strength-of-your-own.jpg` | A Strength of Your Own | Portrait | A composed, striking photo of her. |
| `the-way-you-love.jpg` | The Way You Love | Landscape | Her with the people she loves. |

### 📁 `public/assets/professor/`

| Filename | Page | Orientation | Suggested subject |
| --- | --- | --- | --- |
| `the-woman-behind-the-classroom.jpg` | The Woman Behind the Classroom | Landscape | Early career, graduation, first job. |
| `beyond-the-blackboard.jpg` | Beyond the Blackboard | Landscape | With students, a class photo, a convocation. |
| `lessons-that-last-forever.jpg` | Lessons That Last Forever | Portrait | You and her — the page joins professor and mother. |
| `certificates.jpg` | The Woman Behind the Classroom | Landscape | An award, degree, publication or certificate. |

### 📁 `public/assets/magic/`

| Filename | Page | Orientation | Suggested subject |
| --- | --- | --- | --- |
| `the-mum-isms.jpg` | The Mumma-isms | Landscape | Her mid-sentence, mid-telling-you-off. Comedy encouraged. |
| `things-only-you-do.jpg` | Things Only You Do | Landscape | Caught doing one of her signature things. |
| `certified-icon.jpg` | Certified Icon Behaviour | Portrait | Her most iconic photograph. Sunglasses energy. |

### 📁 `public/assets/wishes/`

| Filename | Page | Orientation | Suggested subject |
| --- | --- | --- | --- |
| `a-year-of-little-adventures.jpg` | A Year of Little Adventures | Landscape | Travel, a trip, somewhere beautiful. |
| `more-moments-for-yourself.jpg` | More Moments for Yourself | Landscape | Relaxed — a hobby, reading, a garden. |
| `all-the-happiness-you-deserve.jpg` | All the Happiness You Deserve | Portrait | Her genuinely, fully happy. |

---

## BATCH 3 — Illustrations and badges ✎ ALREADY BUILT

Nothing needed from you.

| Asset | Used on |
| --- | --- |
| Nebulae and starfields | Every page — gradients and SVG, so no image downloads |
| 14 celestial illustrations | Inner page headers |
| 7 constellations | The universe map |
| 7 award badges | The Hall of Fame |
| Arch, polaroid and certificate frames | Portraits, awards |

---

## BATCH 4 — Audio ○ OPTIONAL

📁 `public/audio/universe.mp3`

Gentle, loopable, 2–5 minutes, under about 4 MB. **It never autoplays** — she
taps the control to start it. With no file present the control hides itself and
nothing breaks. A song that means something to her beats generic ambient music;
please use something you have the right to use.

---

## A note on the photo chapter

An earlier draft had a Chapter 04, *Little Pieces of Forever* — five scrapbook
galleries needing 25–45 photographs. It was removed on request. The gallery,
polaroid, grid and lightbox components are all still in the codebase, so that
chapter can be restored later if you ever want it.
