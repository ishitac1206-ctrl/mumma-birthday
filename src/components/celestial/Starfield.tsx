import { useMemo } from 'react';
import { mulberry32, seedFrom } from '../../lib/random';

interface Star {
  x: number;
  y: number;
  r: number;
  min: number;
  max: number;
  dur: number;
  delay: number;
}

interface Props {
  seed: string;
  /** How many tiny background stars. */
  count?: number;
  /** Larger four-point stars that catch the eye. */
  sparkles?: number;
  animate: boolean;
  className?: string;
}

/**
 * The scattered sky.
 *
 * Deliberately not "random white dots": sizes and opacities follow a weighted
 * curve so most stars are faint dust and only a few read as real stars, and
 * everything twinkles on its own slow clock.
 */
export function Starfield({ seed, count = 130, sparkles = 7, animate, className }: Props) {
  const { stars, points } = useMemo(() => {
    const rand = mulberry32(seedFrom(seed));

    const stars: Star[] = Array.from({ length: count }, () => {
      // Cubing the roll makes big stars rare and dust common.
      const weight = rand() ** 3;
      const min = 0.12 + rand() * 0.2;
      return {
        x: rand() * 100,
        y: rand() * 100,
        r: 0.35 + weight * 1.5,
        min,
        max: min + 0.25 + weight * 0.55,
        dur: 3.5 + rand() * 6,
        delay: rand() * 8,
      };
    });

    const points = Array.from({ length: sparkles }, () => ({
      x: 6 + rand() * 88,
      y: 5 + rand() * 90,
      s: 0.8 + rand() * 1.5,
      delay: rand() * 6,
      dur: 5 + rand() * 5,
    }));

    return { stars, points };
  }, [seed, count, sparkles]);

  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      {stars.map((s, i) => (
        <circle
          key={i}
          cx={s.x}
          cy={s.y}
          r={s.r / 6}
          fill="#FFF8FF"
          style={
            animate
              ? ({
                  '--tw-min': s.min,
                  '--tw-max': s.max,
                  animation: `twinkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
                } as React.CSSProperties)
              : { opacity: s.max }
          }
        />
      ))}

      {/* Four-point stars: a diamond plus a soft core, so they read as drawn, not dotted. */}
      {points.map((p, i) => (
        <g
          key={`p${i}`}
          transform={`translate(${p.x} ${p.y}) scale(${p.s / 6})`}
          style={
            animate
              ? ({
                  '--tw-min': 0.45,
                  '--tw-max': 1,
                  animation: `twinkle ${p.dur}s ease-in-out ${p.delay}s infinite`,
                } as React.CSSProperties)
              : { opacity: 0.9 }
          }
        >
          <path
            d="M0,-3.2 Q0.5,-0.5 3.2,0 Q0.5,0.5 0,3.2 Q-0.5,0.5 -3.2,0 Q-0.5,-0.5 0,-3.2 Z"
            fill="#FFF8FF"
          />
          <circle r="0.5" fill="#FFF8FF" opacity="0.9" />
        </g>
      ))}
    </svg>
  );
}
