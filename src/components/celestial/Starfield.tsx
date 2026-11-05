import { useMemo } from 'react';
import { mulberry32, seedFrom } from '../../lib/random';
import { spark } from '../../lib/glyph';

interface Star {
  x: number;
  y: number;
  r: number;
  min: number;
  max: number;
  dur: number;
  delay: number;
  tint: string;
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
 * Deliberately not "random white dots". Three things keep it from looking
 * machine-made: sizes follow a cubed curve so most stars are faint dust and
 * only a few read as real stars; a fifth of them are tinted champagne, rose or
 * lavender rather than white, the way a real sky is never monochrome; and a
 * few tiny unnamed constellations are threaded in, so the eye keeps finding
 * shapes in it.
 */
const TINTS = ['#FFF8FF', '#FFF8FF', '#FFF8FF', '#FFF8FF', '#E9D5A1', '#E9B8D4', '#BBA5F5'];

export function Starfield({ seed, count = 130, sparkles = 7, animate, className }: Props) {
  const { stars, points, threads } = useMemo(() => {
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
        tint: TINTS[Math.floor(rand() * TINTS.length)] ?? '#FFF8FF',
      };
    });

    const points = Array.from({ length: sparkles }, (_, i) => ({
      x: 6 + rand() * 88,
      y: 5 + rand() * 90,
      s: 0.8 + rand() * 1.5,
      delay: rand() * 6,
      dur: 5 + rand() * 5,
      tint: i % 3 === 0 ? (TINTS[4 + (i % 3)] ?? '#E9D5A1') : '#FFF8FF',
      // the brightest few get a slow ring of light leaving them
      ring: i < Math.max(2, Math.round(sparkles / 4)),
    }));

    // Small anonymous constellations: a seed star plus a few near neighbours,
    // joined by hairlines. They are what reward looking twice.
    const threads = Array.from({ length: 3 }, () => {
      const ox = 10 + rand() * 76;
      const oy = 8 + rand() * 80;
      // Sorted left to right so the thread is a gentle polyline rather than
      // a scribble that crosses back over itself.
      const nodes = Array.from({ length: 3 + Math.floor(rand() * 2) }, () => ({
        x: ox + (rand() - 0.5) * 7,
        y: oy + (rand() - 0.5) * 6,
        r: 0.25 + rand() * 0.45,
      })).sort((a, b) => a.x - b.x);
      return { nodes, delay: rand() * 7, dur: 6 + rand() * 5 };
    });

    return { stars, points, threads };
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
          fill={s.tint}
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

      {/* faint threaded clusters */}
      {threads.map((t, i) => (
        <g
          key={`t${i}`}
          style={
            animate
              ? ({
                  '--tw-min': 0.12,
                  '--tw-max': 0.34,
                  animation: `twinkle ${t.dur}s ease-in-out ${t.delay}s infinite`,
                } as React.CSSProperties)
              : { opacity: 0.28 }
          }
        >
          {t.nodes.slice(0, -1).map((n, k) => {
            const m = t.nodes[k + 1];
            if (!m) return null;
            return (
              <line
                key={k}
                x1={n.x}
                y1={n.y}
                x2={m.x}
                y2={m.y}
                stroke="#BBA5F5"
                strokeWidth="0.06"
                strokeLinecap="round"
              />
            );
          })}
          {t.nodes.map((n, k) => (
            <circle key={k} cx={n.x} cy={n.y} r={n.r / 5} fill="#FFF8FF" />
          ))}
        </g>
      ))}

      {/* Four-point stars: a diamond plus a soft core, so they read as drawn, not dotted. */}
      {points.map((p, i) => (
        <g key={`p${i}`} transform={`translate(${p.x} ${p.y})`}>
          {/* a ring of light leaving the brightest ones */}
          {p.ring && animate && (
            <circle
              r={p.s * 0.9}
              fill="none"
              stroke={p.tint}
              strokeWidth={p.s * 0.08}
              style={
                {
                  '--ring-o': 0.42,
                  transformBox: 'fill-box',
                  transformOrigin: 'center',
                  animation: `pulseRing ${p.dur * 1.8}s ease-out ${p.delay}s infinite`,
                } as React.CSSProperties
              }
            />
          )}
          <g
            transform={`scale(${p.s / 6})`}
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
            {/* a long, very faint glint, the way a bright star flares in a lens */}
            <path d={spark(0, 0, 7.5)} fill={p.tint} opacity="0.2" />
            <path d={spark(0, 0, 3.2)} fill={p.tint} />
            <circle r="0.5" fill="#FFF8FF" opacity="0.9" />
          </g>
        </g>
      ))}
    </svg>
  );
}
