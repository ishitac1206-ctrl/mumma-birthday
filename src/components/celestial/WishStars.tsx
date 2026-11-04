import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mulberry32, seedFrom } from '../../lib/random';
import { CELESTIAL } from '../../animations/variants';

interface Props {
  wishes: string[];
  accent: string;
}

/**
 * A field of stars, one wish inside each.
 *
 * Tap or click a star and its wish appears below. Found stars stay lit, so she
 * can see how many are left. Keyboard reachable, and no hover is required to
 * discover anything — important, since she will most likely open this on a phone.
 */
export function WishStars({ wishes, accent }: Props) {
  const [found, setFound] = useState<Set<number>>(new Set());
  const [active, setActive] = useState<number | null>(null);

  const positions = useMemo(() => {
    const rand = mulberry32(seedFrom(`wishes-${wishes.length}`));
    const placed: { x: number; y: number; s: number }[] = [];

    // Reject positions that sit on top of one another, so the field reads evenly.
    for (let i = 0; i < wishes.length; i++) {
      let best = { x: 50, y: 50, s: 1 };
      let bestGap = -1;
      for (let attempt = 0; attempt < 24; attempt++) {
        const candidate = { x: 7 + rand() * 86, y: 8 + rand() * 84, s: 0.75 + rand() * 0.6 };
        const gap = placed.reduce((min, p) => {
          const d = Math.hypot(p.x - candidate.x, p.y - candidate.y);
          return Math.min(min, d);
        }, Infinity);
        if (gap > bestGap) {
          bestGap = gap;
          best = candidate;
        }
        if (gap > 16) break;
      }
      placed.push(best);
    }
    return placed;
  }, [wishes.length]);

  const reveal = (i: number): void => {
    setActive(i);
    setFound((prev) => {
      const next = new Set(prev);
      next.add(i);
      return next;
    });
  };

  const activeWish = active === null ? undefined : wishes[active];

  return (
    <div className="mx-auto max-w-4xl">
      <div className="relative mx-auto aspect-4/3 w-full sm:aspect-16/10">
        {wishes.map((_wish, i) => {
          const p = positions[i];
          if (!p) return null;
          const isFound = found.has(i);
          const isActive = active === i;

          return (
            <button
              key={i}
              onClick={() => reveal(i)}
              aria-label={isFound ? `Wish ${i + 1}, revealed` : `Reveal wish ${i + 1}`}
              aria-pressed={isFound}
              className="absolute grid place-items-center rounded-full transition-transform duration-500 hover:scale-125 focus-visible:scale-125"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: `${34 * p.s}px`,
                height: `${34 * p.s}px`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <svg
                viewBox="0 0 20 20"
                className="h-full w-full"
                style={{
                  filter: isActive
                    ? `drop-shadow(0 0 14px ${accent})`
                    : isFound
                      ? `drop-shadow(0 0 8px ${accent}aa)`
                      : 'drop-shadow(0 0 5px rgba(187,165,245,0.5))',
                  transition: 'filter 500ms',
                }}
              >
                <path
                  d="M10,1 Q11.3,8.7 19,10 Q11.3,11.3 10,19 Q8.7,11.3 1,10 Q8.7,8.7 10,1 Z"
                  fill={isFound ? accent : '#FFF8FF'}
                  opacity={isFound ? 1 : 0.55}
                  style={
                    {
                      '--tw-min': isFound ? 0.85 : 0.35,
                      '--tw-max': 1,
                      animation: `twinkle ${3 + (i % 5)}s ease-in-out ${i * 0.3}s infinite`,
                    } as React.CSSProperties
                  }
                />
              </svg>
            </button>
          );
        })}
      </div>

      {/* the revealed wish */}
      <div className="mt-6 min-h-[8rem]">
        <AnimatePresence mode="wait">
          {activeWish ? (
            <motion.figure
              key={active}
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.55, ease: CELESTIAL }}
              className="mx-auto max-w-xl rounded-2xl border border-lavender/22 bg-violet-deep/45 px-8 py-7 text-center backdrop-blur-sm"
            >
              <blockquote className="font-display text-xl leading-snug font-light text-pearl sm:text-2xl">
                {activeWish}
              </blockquote>
            </motion.figure>
          ) : (
            <motion.p
              key="prompt"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="font-poetic text-center text-sm text-lavender/70 italic"
            >
              Touch a star to find a wish.
            </motion.p>
          )}
        </AnimatePresence>

        {found.size > 0 && (
          <p className="font-body mt-5 text-center text-[0.7rem] tracking-[0.3em] text-lavender/55 uppercase">
            {found.size} of {wishes.length} found
          </p>
        )}
      </div>
    </div>
  );
}
