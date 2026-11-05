import { useMemo } from 'react';
import { mulberry32, seedFrom } from '../../lib/random';
import { spark } from '../../lib/glyph';

interface Props {
  seed: string;
  count?: number;
  tint?: string;
  /** How many of the motes are larger, four-pointed and haloed. */
  glow?: number;
}

/**
 * Slow motes of stardust rising through the frame.
 *
 * Two kinds, deliberately: plain round specks that read as dust, and a handful
 * of larger four-point glints that read as fireflies. Each rises on an outer
 * element and sways sideways on an inner one, so no two trace the same path.
 */
export function Dust({ seed, count = 16, tint = '#F6DCEB', glow = 3 }: Props) {
  const motes = useMemo(() => {
    const rand = mulberry32(seedFrom(`${seed}-dust`));
    return Array.from({ length: count }, (_, i) => ({
      x: rand() * 100,
      y: 20 + rand() * 90,
      size: 1 + rand() * 2.6,
      dx: -20 + rand() * 50,
      dur: 16 + rand() * 22,
      delay: rand() * 24,
      opacity: 0.18 + rand() * 0.4,
      sway: 6 + rand() * 16,
      swayDur: 5 + rand() * 6,
      lit: i < glow,
      litSize: 7 + rand() * 7,
    }));
  }, [seed, count, glow]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {motes.map((m, i) => (
        <span
          key={i}
          className="absolute block"
          style={
            {
              left: `${m.x}%`,
              top: `${m.y}%`,
              '--dx': `${m.dx}px`,
              '--dust-o': m.opacity,
              animation: `dust ${m.dur}s linear ${m.delay}s infinite`,
            } as React.CSSProperties
          }
        >
          {/* the sideways drift lives on its own element, so it composes with
              the rise above rather than fighting it for `transform` */}
          <span
            className="block"
            style={
              {
                '--sway': `${m.sway}px`,
                animation: `sway ${m.swayDur}s ease-in-out infinite`,
              } as React.CSSProperties
            }
          >
            {m.lit ? (
              <svg
                viewBox="0 0 10 10"
                style={{
                  width: m.litSize,
                  height: m.litSize,
                  filter: `drop-shadow(0 0 ${m.litSize * 0.8}px ${tint})`,
                }}
              >
                <path d={spark(5, 5, 5)} fill={tint} opacity="0.9" />
              </svg>
            ) : (
              <span
                className="block rounded-full"
                style={{
                  width: `${m.size}px`,
                  height: `${m.size}px`,
                  background: tint,
                  filter: 'blur(0.4px)',
                  boxShadow: `0 0 ${m.size * 3}px ${tint}`,
                }}
              />
            )}
          </span>
        </span>
      ))}
    </div>
  );
}
