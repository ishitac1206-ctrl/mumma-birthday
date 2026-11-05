import { useId } from 'react';

export interface ConstellationShape {
  stars: { x: number; y: number; r: number }[];
  lines: [number, number][];
}

interface Props {
  shape: ConstellationShape;
  accent: string;
  /** Brightened state, for hover and focus. */
  lit?: boolean;
  animate?: boolean;
  className?: string;
}

/**
 * One chapter's constellation.
 *
 * Drawn from coordinates in structure.ts so every chapter has a genuinely
 * distinct arrangement rather than a rotated copy of the same shape.
 */
export function Constellation({ shape, accent, lit = false, animate = true, className }: Props) {
  const uid = useId().replace(/:/g, '');
  const glow = `glow-${uid}`;

  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id={glow}>
          <stop offset="0%" stopColor={accent} stopOpacity={lit ? 0.5 : 0.22} />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="50" cy="50" r="46" fill={`url(#${glow})`} />

      {/* two dashed orbits, turning against each other very slowly */}
      <g
        style={{
          transformBox: 'view-box',
          transformOrigin: 'center',
          ...(animate ? { animation: 'haloSpin 110s linear infinite' } : {}),
        }}
      >
        <circle
          cx="50"
          cy="50"
          r="44"
          fill="none"
          stroke={accent}
          strokeWidth="0.3"
          strokeDasharray="0.7 4.5"
          opacity={lit ? 0.5 : 0.22}
          style={{ transition: 'opacity 600ms' }}
        />
      </g>
      <g
        style={{
          transformBox: 'view-box',
          transformOrigin: 'center',
          ...(animate ? { animation: 'haloSpin 70s linear infinite reverse' } : {}),
        }}
      >
        <circle
          cx="50"
          cy="50"
          r="33"
          fill="none"
          stroke={accent}
          strokeWidth="0.25"
          strokeDasharray="0.5 7"
          opacity={lit ? 0.35 : 0.14}
          style={{ transition: 'opacity 600ms' }}
        />
      </g>

      {shape.lines.map(([a, b], i) => {
        const p = shape.stars[a];
        const q = shape.stars[b];
        if (!p || !q) return null;
        return (
          <line
            key={i}
            x1={p.x}
            y1={p.y}
            x2={q.x}
            y2={q.y}
            stroke={accent}
            strokeWidth={lit ? 0.7 : 0.45}
            opacity={lit ? 0.85 : 0.4}
            strokeLinecap="round"
            style={{ transition: 'all 600ms cubic-bezier(0.22,1,0.36,1)' }}
          />
        );
      })}

      {shape.stars.map((s, i) => (
        <g key={i} style={{ transition: 'opacity 600ms' }}>
          <circle cx={s.x} cy={s.y} r={s.r * (lit ? 2.6 : 2)} fill={accent} opacity={lit ? 0.3 : 0.14} />
          <path
            d={`M${s.x},${s.y - s.r * 1.9} Q${s.x + s.r * 0.3},${s.y - s.r * 0.3} ${s.x + s.r * 1.9},${s.y} Q${s.x + s.r * 0.3},${s.y + s.r * 0.3} ${s.x},${s.y + s.r * 1.9} Q${s.x - s.r * 0.3},${s.y + s.r * 0.3} ${s.x - s.r * 1.9},${s.y} Q${s.x - s.r * 0.3},${s.y - s.r * 0.3} ${s.x},${s.y - s.r * 1.9} Z`}
            fill={lit ? '#FFF8FF' : accent}
            style={
              animate
                ? ({
                    '--tw-min': lit ? 0.9 : 0.55,
                    '--tw-max': 1,
                    animation: `twinkle ${3.5 + (i % 4)}s ease-in-out ${i * 0.4}s infinite`,
                    transition: 'fill 600ms',
                  } as React.CSSProperties)
                : { opacity: lit ? 1 : 0.8 }
            }
          />
        </g>
      ))}
    </svg>
  );
}
