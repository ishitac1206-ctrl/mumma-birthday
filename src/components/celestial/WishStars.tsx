import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mulberry32, seedFrom } from '../../lib/random';
import { useFinePointer } from '../../hooks/useFinePointer';
import { StarGlyph } from './ornament';
import { CELESTIAL } from '../../animations/variants';

interface Props {
  wishes: string[];
  accent: string;
}

/**
 * A field of stars, one wish inside each.
 *
 * The wish appears at the star itself rather than in a panel below, so nothing
 * ever has to be scrolled to to be read. A mouse reveals on hover; a tap opens
 * one and keeps it open until another is chosen or the sky is tapped, because
 * touch has no hover and a wish that vanished on lift would be unreadable.
 *
 * The stars she has already visited stay lit and are joined, in the order she
 * found them, by a thread of light — so by the end of the page she has drawn
 * her own constellation, and no two people ever draw the same one.
 */
export function WishStars({ wishes, accent }: Props) {
  const fine = useFinePointer();
  const [found, setFound] = useState<Set<number>>(new Set());
  const [pinned, setPinned] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
  const [fieldWidth, setFieldWidth] = useState(0);

  // What is on screen: a hover wins while the mouse is over a star, otherwise
  // whatever was last tapped stays put.
  const active = hovered ?? pinned;
  const activeWish = active === null ? undefined : wishes[active];

  const positions = useMemo(() => {
    const rand = mulberry32(seedFrom(`wishes-${wishes.length}`));
    const placed: { x: number; y: number; s: number }[] = [];

    // Best-candidate sampling: try several spots and keep the one furthest
    // from its neighbours, so a crowded sky still reads evenly.
    for (let i = 0; i < wishes.length; i++) {
      let best = { x: 50, y: 50, s: 1 };
      let bestGap = -1;
      for (let attempt = 0; attempt < 30; attempt++) {
        const candidate = { x: 7 + rand() * 86, y: 7 + rand() * 85, s: 0.72 + rand() * 0.6 };
        const gap = placed.reduce(
          (min, p) => Math.min(min, Math.hypot(p.x - candidate.x, p.y - candidate.y)),
          Infinity,
        );
        if (gap > bestGap) {
          bestGap = gap;
          best = candidate;
        }
        if (gap > 13) break;
      }
      placed.push(best);
    }
    return placed;
  }, [wishes.length]);

  const reveal = (i: number): void => {
    setPinned((prev) => (prev === i ? null : i));
    setFound((prev) => {
      if (prev.has(i)) return prev;
      const next = new Set(prev);
      next.add(i);
      return next;
    });
  };

  // The card is clamped against the field's real width, so it can never run off
  // the edge of a phone screen.
  useEffect(() => {
    const el = fieldRef.current;
    if (!el) return;
    setFieldWidth(el.getBoundingClientRect().width);
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width;
      if (w) setFieldWidth(w);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Escape closes, and a tap on empty sky dismisses the open wish.
  useEffect(() => {
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') setPinned(null);
    };
    const onPointerDown = (e: PointerEvent): void => {
      if (!fieldRef.current?.contains(e.target as Node)) setPinned(null);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('pointerdown', onPointerDown);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('pointerdown', onPointerDown);
    };
  }, []);

  // A Set keeps its insertion order, so this is the order she found them in.
  const trail = [...found].map((i) => positions[i]).filter((p): p is NonNullable<typeof p> => !!p);

  const spot = active === null ? undefined : positions[active];
  const cardPx = Math.min(fieldWidth * 0.88, 290);
  // Half the card, as a percentage of the field, plus a small margin.
  const halfPct = fieldWidth ? (cardPx / 2 / fieldWidth) * 100 + 1.5 : 25;
  const cardX = spot ? Math.min(Math.max(spot.x, halfPct), 100 - halfPct) : 50;
  // Flip below a star that sits too high for the card to fit above it.
  const below = spot ? spot.y < 26 : false;
  // When the card has been pushed sideways, keep its little star pointing at
  // the real one rather than at the middle of the card.
  const pointerPct =
    spot && cardPx
      ? Math.min(Math.max(50 + (((spot.x - cardX) / 100) * fieldWidth * 100) / cardPx, 12), 88)
      : 50;

  return (
    <div className="mx-auto max-w-4xl">
      <div
        ref={fieldRef}
        className="relative mx-auto aspect-4/5 w-full sm:aspect-16/10"
        onPointerLeave={() => setHovered(null)}
      >
        {/* the field sits in its own pool of light */}
        <span
          className="pointer-events-none absolute inset-[-8%] rounded-full"
          style={{
            background: `radial-gradient(ellipse at 50% 45%, ${accent}14 0%, transparent 68%)`,
            filter: 'blur(28px)',
          }}
          aria-hidden="true"
        />

        {/* the constellation she is drawing: found stars, joined in order */}
        {trail.length > 1 && (
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 h-full w-full"
            aria-hidden="true"
          >
            {trail.slice(0, -1).map((a, k) => {
              const b = trail[k + 1];
              if (!b) return null;
              return (
                <line
                  key={k}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke={accent}
                  strokeWidth="0.18"
                  strokeLinecap="round"
                  opacity="0.5"
                  style={{ transition: 'opacity 900ms' }}
                />
              );
            })}
          </svg>
        )}

        {wishes.map((_wish, i) => {
          const p = positions[i];
          if (!p) return null;
          const isFound = found.has(i);
          const isActive = active === i;

          return (
            <button
              key={i}
              onClick={() => reveal(i)}
              onPointerEnter={() => fine && setHovered(i)}
              onPointerLeave={() => fine && setHovered(null)}
              onFocus={() => setHovered(i)}
              onBlur={() => setHovered(null)}
              aria-label={isFound ? `Wish ${i + 1}, revealed` : `Reveal wish ${i + 1}`}
              aria-expanded={isActive}
              className="absolute grid place-items-center rounded-full transition-transform duration-500 hover:scale-125 focus-visible:scale-125"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: `${34 * p.s}px`,
                height: `${34 * p.s}px`,
                transform: 'translate(-50%, -50%)',
                zIndex: isActive ? 20 : 10,
              }}
            >
              <svg
                viewBox="0 0 20 20"
                className="h-full w-full"
                style={{
                  overflow: 'visible',
                  filter: isActive
                    ? `drop-shadow(0 0 16px ${accent})`
                    : isFound
                      ? `drop-shadow(0 0 8px ${accent}aa)`
                      : 'drop-shadow(0 0 5px rgba(187,165,245,0.5))',
                  transition: 'filter 450ms',
                }}
              >
                {/* a slow ring leaving the stars that have been visited */}
                {isFound && (
                  <circle
                    cx="10"
                    cy="10"
                    r="8"
                    fill="none"
                    stroke={accent}
                    strokeWidth="0.5"
                    style={
                      {
                        '--ring-o': 0.4,
                        transformBox: 'view-box',
                        transformOrigin: 'center',
                        animation: `pulseRing ${5 + (i % 3)}s ease-out infinite`,
                      } as React.CSSProperties
                    }
                  />
                )}
                <path
                  d="M10,1 Q11.3,8.7 19,10 Q11.3,11.3 10,19 Q8.7,11.3 1,10 Q8.7,8.7 10,1 Z"
                  fill={isFound || isActive ? accent : '#FFF8FF'}
                  opacity={isActive ? 1 : isFound ? 0.95 : 0.55}
                  style={
                    {
                      '--tw-min': isFound ? 0.85 : 0.35,
                      '--tw-max': 1,
                      animation: `twinkle ${3 + (i % 5)}s ease-in-out ${i * 0.27}s infinite`,
                    } as React.CSSProperties
                  }
                />
              </svg>
            </button>
          );
        })}

        {/* the wish, floating at its own star */}
        {spot && (
          /* Positioning lives on this plain wrapper, not on the motion element:
             Framer Motion owns `transform` on anything it animates, so a
             centring translate set there is silently overwritten. */
          <div
            className="pointer-events-none absolute z-30"
            style={{
              left: `${cardX}%`,
              top: `${spot.y}%`,
              width: cardPx ? `${cardPx}px` : undefined,
              transform: below
                ? 'translate(-50%, 22px)'
                : 'translate(-50%, calc(-100% - 22px))',
            }}
          >
            <AnimatePresence mode="wait">
              {activeWish && (
                <motion.figure
                  key={active}
                  initial={{ opacity: 0, y: below ? -8 : 8, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.16 } }}
                  transition={{ duration: 0.38, ease: CELESTIAL }}
                  className="relative"
                >
                  <div
                    className="vellum grain relative overflow-hidden rounded-2xl border px-6 py-5 text-center backdrop-blur-md"
                    style={{
                      borderColor: `${accent}59`,
                      background: 'rgb(33 20 61 / 0.93)',
                      boxShadow: `0 20px 50px -20px rgb(16 13 38 / 0.95), 0 0 34px -12px ${accent}99`,
                    }}
                  >
                    <StarGlyph
                      className="absolute top-2.5 left-3 h-1.5 w-1.5"
                      color={accent}
                      opacity={0.6}
                    />
                    <StarGlyph
                      className="absolute right-3 bottom-2.5 h-1.5 w-1.5"
                      color={accent}
                      opacity={0.6}
                    />
                    <blockquote className="font-display relative text-[1.12rem] leading-snug font-light text-pearl sm:text-[1.25rem]">
                      {activeWish}
                    </blockquote>
                  </div>

                  {/* a small star pointing back at the one that was touched */}
                  <svg
                    viewBox="0 0 12 12"
                    className={`absolute h-3 w-3 -translate-x-1/2 ${below ? '-top-1.5' : '-bottom-1.5'}`}
                    style={{ left: `${pointerPct}%` }}
                    aria-hidden="true"
                  >
                    <path d="M6,0 Q6.9,5 12,6 Q6.9,7 6,12 Q5.1,7 0,6 Q5.1,5 6,0 Z" fill={accent} />
                  </svg>
                </motion.figure>
              )}
            </AnimatePresence>
          </div>
        )}

      </div>

      <div className="mt-4 text-center">
        {found.size === 0 ? (
          <p className="font-poetic text-sm text-lavender/70 italic">
            {fine ? 'Hover a star to find a wish.' : 'Touch a star to find a wish.'}
          </p>
        ) : (
          <p className="font-body text-[0.68rem] tracking-[0.3em] text-lavender/55 uppercase">
            {found.size} of {wishes.length} found
          </p>
        )}
      </div>
    </div>
  );
}
