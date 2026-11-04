import { useId } from 'react';
import type { Illustration as Kind } from '../../data/structure';

interface Props {
  kind: Kind;
  accent?: string;
  className?: string;
  /** Pauses the gentle idle motion. */
  still?: boolean;
}

/** A four-point celestial star, the motif repeated across every illustration. */
const spark = (x: number, y: number, s: number): string =>
  `M${x},${y - s} Q${x + s * 0.16},${y - s * 0.16} ${x + s},${y} Q${x + s * 0.16},${y + s * 0.16} ${x},${y + s} Q${x - s * 0.16},${y + s * 0.16} ${x - s},${y} Q${x - s * 0.16},${y - s * 0.16} ${x},${y - s} Z`;

/**
 * The illustrated header for every inner page.
 *
 * Hand-built SVG — nothing here is an emoji or a downloaded image. Each piece
 * takes the chapter's accent colour so one drawing style spans eight different
 * atmospheres.
 */
export function Illustration({ kind, accent = '#E9D5A1', className, still = false }: Props) {
  const uid = useId().replace(/:/g, '');
  const g = (name: string): string => `${name}-${uid}`;
  const idle = still ? undefined : ({ animation: 'breathe 9s ease-in-out infinite' } as const);

  return (
    <svg
      viewBox="0 0 200 150"
      className={className}
      role="presentation"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id={g('glow')}>
          <stop offset="0%" stopColor={accent} stopOpacity="0.55" />
          <stop offset="55%" stopColor={accent} stopOpacity="0.12" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={g('sheen')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFF8FF" stopOpacity="0.95" />
          <stop offset="100%" stopColor={accent} stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id={g('page')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFF8FF" stopOpacity="0.92" />
          <stop offset="100%" stopColor="#BBA5F5" stopOpacity="0.45" />
        </linearGradient>
        <filter id={g('soft')} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="3.2" />
        </filter>
      </defs>

      {/* every illustration sits in its own pool of light */}
      <ellipse cx="100" cy="76" rx="86" ry="62" fill={`url(#${g('glow')})`} />

      <g style={idle}>{figure()}</g>
    </svg>
  );

  function figure() {
    const stroke = { stroke: accent, fill: 'none', strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

    switch (kind) {
      case 'open-book':
        return (
          <>
            <path d="M100,52 C86,42 66,40 48,44 L48,104 C66,100 86,102 100,112 Z" fill={`url(#${g('page')})`} opacity="0.9" />
            <path d="M100,52 C114,42 134,40 152,44 L152,104 C134,100 114,102 100,112 Z" fill={`url(#${g('page')})`} opacity="0.75" />
            <path d="M100,52 C86,42 66,40 48,44 L48,104 C66,100 86,102 100,112 C114,102 134,100 152,104 L152,44 C134,40 114,42 100,52 Z" {...stroke} strokeWidth="1.5" />
            <line x1="100" y1="52" x2="100" y2="112" {...stroke} strokeWidth="1.5" />
            {[62, 70, 78].map((y, i) => (
              <g key={y}>
                <line x1={58 + i} y1={y} x2={90} y2={y - 2} stroke="#6544A0" strokeWidth="1" opacity="0.4" strokeLinecap="round" />
                <line x1={110} y1={y - 2} x2={142 - i} y2={y} stroke="#6544A0" strokeWidth="1" opacity="0.4" strokeLinecap="round" />
              </g>
            ))}
            {/* stars lifting off the pages */}
            <path d={spark(100, 30, 7)} fill="#FFF8FF" />
            <path d={spark(76, 24, 4)} fill={accent} opacity="0.9" />
            <path d={spark(126, 22, 4.6)} fill={accent} opacity="0.85" />
            <path d={spark(142, 38, 3)} fill="#FFF8FF" opacity="0.7" />
            <path d={spark(58, 34, 2.6)} fill="#FFF8FF" opacity="0.6" />
          </>
        );

      case 'crescent-moon':
        return (
          <>
            <circle cx="100" cy="74" r="36" fill={accent} opacity="0.1" filter={`url(#${g('soft')})`} />
            <path d="M112,42 A34,34 0 1 0 112,106 A27,27 0 1 1 112,42 Z" fill={`url(#${g('sheen')})`} />
            <path d="M112,42 A34,34 0 1 0 112,106 A27,27 0 1 1 112,42 Z" {...stroke} strokeWidth="1.2" opacity="0.8" />
            <circle cx="82" cy="62" r="3.4" fill={accent} opacity="0.25" />
            <circle cx="90" cy="84" r="2.2" fill={accent} opacity="0.2" />
            <path d={spark(142, 46, 5.5)} fill="#FFF8FF" />
            <path d={spark(152, 82, 3.4)} fill={accent} />
            <path d={spark(50, 56, 4)} fill="#FFF8FF" opacity="0.75" />
            <path d={spark(60, 100, 2.8)} fill={accent} opacity="0.7" />
          </>
        );

      case 'cosmic-flower':
        return (
          <>
            <g>
              {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => (
                <ellipse
                  key={a}
                  cx="100"
                  cy="46"
                  rx={i % 2 ? 9 : 13}
                  ry={i % 2 ? 24 : 30}
                  fill={i % 2 ? '#E9B8D4' : `url(#${g('sheen')})`}
                  opacity={i % 2 ? 0.45 : 0.72}
                  transform={`rotate(${a} 100 76)`}
                />
              ))}
            </g>
            <circle cx="100" cy="76" r="11" fill="#FFF8FF" opacity="0.95" />
            <circle cx="100" cy="76" r="11" {...stroke} strokeWidth="1.2" />
            <path d={spark(100, 76, 7)} fill={accent} />
            <path d={spark(152, 40, 4.4)} fill="#FFF8FF" opacity="0.85" />
            <path d={spark(44, 104, 3.6)} fill={accent} opacity="0.8" />
            <path d={spark(158, 100, 2.8)} fill="#FFF8FF" opacity="0.6" />
          </>
        );

      case 'starburst':
      case 'radiant-star':
        return (
          <>
            <circle cx="100" cy="74" r="40" fill={accent} opacity="0.12" filter={`url(#${g('soft')})`} />
            {Array.from({ length: 16 }, (_, i) => {
              const a = (i * Math.PI * 2) / 16;
              const long = i % 2 === 0;
              const r1 = 20;
              const r2 = long ? 54 : 34;
              return (
                <line
                  key={i}
                  x1={100 + Math.cos(a) * r1}
                  y1={74 + Math.sin(a) * r1}
                  x2={100 + Math.cos(a) * r2}
                  y2={74 + Math.sin(a) * r2}
                  stroke={accent}
                  strokeWidth={long ? 1.6 : 0.9}
                  opacity={long ? 0.75 : 0.4}
                  strokeLinecap="round"
                />
              );
            })}
            <path d={spark(100, 74, 26)} fill={`url(#${g('sheen')})`} />
            <path d={spark(100, 74, 26)} {...stroke} strokeWidth="1" opacity="0.7" />
            <circle cx="100" cy="74" r="5" fill="#FFF8FF" />
            <path d={spark(156, 36, 4)} fill="#FFF8FF" opacity="0.8" />
            <path d={spark(42, 108, 3.2)} fill={accent} opacity="0.75" />
          </>
        );

      case 'floating-notes':
        return (
          <>
            {[
              { x: 36, y: 46, r: -11, w: 54, h: 40, o: 0.6 },
              { x: 112, y: 36, r: 9, w: 58, h: 42, o: 0.72 },
              { x: 74, y: 80, r: -3, w: 62, h: 44, o: 0.9 },
            ].map((n, i) => (
              <g key={i} transform={`rotate(${n.r} ${n.x + n.w / 2} ${n.y + n.h / 2})`}>
                <rect x={n.x} y={n.y} width={n.w} height={n.h} rx="5" fill="#FFF8FF" opacity={n.o * 0.9} />
                <rect x={n.x} y={n.y} width={n.w} height={n.h} rx="5" {...stroke} strokeWidth="1.1" opacity="0.8" />
                {[0, 1, 2].map((k) => (
                  <line
                    key={k}
                    x1={n.x + 9}
                    y1={n.y + 13 + k * 9}
                    x2={n.x + n.w - (k === 2 ? 22 : 9)}
                    y2={n.y + 13 + k * 9}
                    stroke="#6544A0"
                    strokeWidth="1.2"
                    opacity="0.35"
                    strokeLinecap="round"
                  />
                ))}
              </g>
            ))}
            <path d={spark(166, 92, 4.2)} fill={accent} />
            <path d={spark(26, 102, 3.2)} fill="#FFF8FF" opacity="0.8" />
            <path d={spark(100, 18, 3.6)} fill="#FFF8FF" opacity="0.7" />
          </>
        );

      case 'enchanted-library':
        return (
          <>
            {/* shelf of books */}
            {[
              { x: 40, h: 40, c: '#BBA5F5' },
              { x: 52, h: 50, c: '#E9B8D4' },
              { x: 64, h: 44, c: accent },
              { x: 76, h: 54, c: '#BBA5F5' },
              { x: 88, h: 38, c: '#E9B8D4' },
            ].map((b) => (
              <g key={b.x}>
                <rect x={b.x} y={116 - b.h} width="10" height={b.h} rx="2" fill={b.c} opacity="0.55" />
                <rect x={b.x} y={116 - b.h} width="10" height={b.h} rx="2" stroke={b.c} strokeWidth="1" fill="none" opacity="0.9" />
              </g>
            ))}
            <line x1="34" y1="117" x2="166" y2="117" {...stroke} strokeWidth="1.4" opacity="0.6" />
            {[
              { x: 118, h: 46, c: accent },
              { x: 130, h: 52, c: '#BBA5F5' },
              { x: 142, h: 42, c: '#E9B8D4' },
            ].map((b) => (
              <g key={b.x}>
                <rect x={b.x} y={116 - b.h} width="10" height={b.h} rx="2" fill={b.c} opacity="0.5" />
                <rect x={b.x} y={116 - b.h} width="10" height={b.h} rx="2" stroke={b.c} strokeWidth="1" fill="none" opacity="0.85" />
              </g>
            ))}
            {/* the floating open book */}
            <g transform="translate(0,-6)">
              <path d="M100,40 C90,33 76,32 64,35 L64,66 C76,63 90,64 100,71 Z" fill={`url(#${g('page')})`} opacity="0.95" />
              <path d="M100,40 C110,33 124,32 136,35 L136,66 C124,63 110,64 100,71 Z" fill={`url(#${g('page')})`} opacity="0.8" />
              <path d="M100,40 C90,33 76,32 64,35 L64,66 C76,63 90,64 100,71 C110,64 124,63 136,66 L136,35 C124,32 110,33 100,40 Z" {...stroke} strokeWidth="1.4" />
            </g>
            <path d={spark(100, 16, 6)} fill="#FFF8FF" />
            <path d={spark(150, 28, 3.6)} fill={accent} opacity="0.9" />
            <path d={spark(50, 24, 3)} fill="#FFF8FF" opacity="0.7" />
          </>
        );

      case 'constellation-diagram': {
        const nodes = [
          [52, 46], [92, 30], [132, 50], [150, 88], [108, 74], [68, 92], [100, 116],
        ] as const;
        const edges = [[0, 1], [1, 2], [2, 3], [1, 4], [4, 5], [5, 6], [4, 3]] as const;
        return (
          <>
            <circle cx="100" cy="74" r="56" {...stroke} strokeWidth="0.8" opacity="0.2" strokeDasharray="2 6" />
            {edges.map(([a, b], i) => {
              const p = nodes[a];
              const q = nodes[b];
              if (!p || !q) return null;
              return <line key={i} x1={p[0]} y1={p[1]} x2={q[0]} y2={q[1]} stroke={accent} strokeWidth="1" opacity="0.55" />;
            })}
            {nodes.map(([x, y], i) => (
              <g key={i}>
                <circle cx={x} cy={y} r={i === 1 ? 7 : 4} fill={accent} opacity="0.18" />
                <path d={spark(x, y, i === 1 ? 6.5 : 4)} fill={i === 1 ? '#FFF8FF' : accent} />
              </g>
            ))}
          </>
        );
      }

      case 'polaroids':
        return (
          <>
            {[
              { x: 28, y: 40, r: -13, w: 52 },
              { x: 118, y: 36, r: 11, w: 52 },
              { x: 72, y: 54, r: -2, w: 58 },
            ].map((p, i) => (
              <g key={i} transform={`rotate(${p.r} ${p.x + p.w / 2} ${p.y + 32})`}>
                <rect x={p.x} y={p.y} width={p.w} height={p.w * 1.18} rx="2" fill="#FFF8FF" opacity="0.92" />
                <rect x={p.x + 4} y={p.y + 4} width={p.w - 8} height={p.w - 12} rx="1" fill="#6544A0" opacity="0.4" />
                <path d={spark(p.x + p.w / 2, p.y + (p.w - 12) / 2 + 4, 5)} fill={accent} opacity="0.7" />
                <rect x={p.x} y={p.y} width={p.w} height={p.w * 1.18} rx="2" {...stroke} strokeWidth="1" opacity="0.65" />
              </g>
            ))}
            <path d={spark(170, 100, 3.6)} fill={accent} />
            <path d={spark(22, 104, 3)} fill="#FFF8FF" opacity="0.75" />
          </>
        );

      case 'photo-grid':
        return (
          <>
            {[0, 1, 2].map((c) =>
              [0, 1].map((r) => (
                <g key={`${c}-${r}`}>
                  <rect x={44 + c * 40} y={40 + r * 42} width="34" height="36" rx="3" fill="#FFF8FF" opacity="0.14" />
                  <rect x={44 + c * 40} y={40 + r * 42} width="34" height="36" rx="3" {...stroke} strokeWidth="1" opacity="0.6" />
                  <path d={spark(61 + c * 40, 58 + r * 42, 4.2)} fill={accent} opacity={0.4 + ((c + r) % 3) * 0.2} />
                </g>
              )),
            )}
            <path d={spark(168, 32, 3.4)} fill="#FFF8FF" opacity="0.8" />
            <path d={spark(28, 112, 3)} fill={accent} opacity="0.75" />
          </>
        );

      case 'speech-bubbles':
        return (
          <>
            <g>
              <rect x="30" y="38" width="86" height="44" rx="20" fill="#FFF8FF" opacity="0.9" />
              <path d="M52,80 L48,96 L68,81 Z" fill="#FFF8FF" opacity="0.9" />
              <rect x="30" y="38" width="86" height="44" rx="20" {...stroke} strokeWidth="1.2" opacity="0.75" />
              {[0, 1].map((k) => (
                <line key={k} x1="44" y1={54 + k * 12} x2={k ? 90 : 102} y2={54 + k * 12} stroke="#6544A0" strokeWidth="1.6" opacity="0.35" strokeLinecap="round" />
              ))}
            </g>
            <g>
              <rect x="104" y="76" width="68" height="36" rx="17" fill={accent} opacity="0.3" />
              <path d="M152,110 L158,124 L140,111 Z" fill={accent} opacity="0.3" />
              <rect x="104" y="76" width="68" height="36" rx="17" {...stroke} strokeWidth="1.2" opacity="0.8" />
              <line x1="116" y1="94" x2="158" y2="94" stroke={accent} strokeWidth="1.6" opacity="0.6" strokeLinecap="round" />
            </g>
            <path d={spark(160, 36, 5)} fill="#FFF8FF" />
            <path d={spark(24, 94, 3.4)} fill={accent} opacity="0.8" />
          </>
        );

      case 'sparkle-swirl':
        return (
          <>
            <path
              d="M34,104 C44,62 82,36 120,46 C152,54 160,88 138,100 C118,111 96,96 104,78 C110,64 130,64 136,76"
              {...stroke}
              strokeWidth="1.3"
              opacity="0.55"
              strokeDasharray="1 7"
            />
            <path d={spark(120, 44, 9)} fill={`url(#${g('sheen')})`} />
            <path d={spark(120, 44, 9)} {...stroke} strokeWidth="0.9" opacity="0.6" />
            <path d={spark(62, 76, 5.5)} fill="#FFF8FF" opacity="0.9" />
            <path d={spark(150, 92, 4.6)} fill={accent} />
            <path d={spark(92, 110, 4)} fill="#FFF8FF" opacity="0.8" />
            <path d={spark(38, 48, 3.2)} fill={accent} opacity="0.7" />
            <path d={spark(170, 60, 2.8)} fill="#FFF8FF" opacity="0.6" />
          </>
        );

      case 'shooting-stars':
        return (
          <>
            {[
              { x: 30, y: 44, len: 62, a: 22, w: 2 },
              { x: 86, y: 28, len: 46, a: 26, w: 1.5 },
              { x: 104, y: 74, len: 54, a: 18, w: 1.8 },
            ].map((s, i) => {
              const rad = (s.a * Math.PI) / 180;
              const ex = s.x + Math.cos(rad) * s.len;
              const ey = s.y + Math.sin(rad) * s.len;
              return (
                <g key={i}>
                  <defs>
                    <linearGradient id={g(`tail${i}`)} x1={s.x} y1={s.y} x2={ex} y2={ey} gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor={accent} stopOpacity="0" />
                      <stop offset="100%" stopColor="#FFF8FF" stopOpacity="0.95" />
                    </linearGradient>
                  </defs>
                  <line x1={s.x} y1={s.y} x2={ex} y2={ey} stroke={`url(#${g(`tail${i}`)})`} strokeWidth={s.w} strokeLinecap="round" />
                  <path d={spark(ex, ey, 5 - i * 0.6)} fill="#FFF8FF" />
                </g>
              );
            })}
            <path d={spark(166, 110, 4)} fill={accent} opacity="0.85" />
            <path d={spark(40, 112, 3)} fill="#FFF8FF" opacity="0.7" />
            <path d={spark(140, 40, 2.6)} fill={accent} opacity="0.6" />
          </>
        );

      case 'crescent-garden':
        return (
          <>
            <path d="M118,38 A32,32 0 1 0 118,98 A25,25 0 1 1 118,38 Z" fill={`url(#${g('sheen')})`} opacity="0.9" />
            <path d="M118,38 A32,32 0 1 0 118,98 A25,25 0 1 1 118,38 Z" {...stroke} strokeWidth="1.1" opacity="0.7" />
            {/* small celestial flowers growing along the base */}
            {[
              { x: 54, y: 112, s: 1 },
              { x: 86, y: 118, s: 0.78 },
              { x: 126, y: 114, s: 0.92 },
              { x: 154, y: 120, s: 0.66 },
            ].map((f, i) => (
              <g key={i} transform={`translate(${f.x} ${f.y}) scale(${f.s})`}>
                <line x1="0" y1="0" x2="0" y2="18" {...stroke} strokeWidth="1.2" opacity="0.6" />
                {[0, 72, 144, 216, 288].map((a) => (
                  <ellipse key={a} cx="0" cy="-7" rx="3.4" ry="7" fill="#E9B8D4" opacity="0.65" transform={`rotate(${a} 0 0)`} />
                ))}
                <circle r="2.6" fill={accent} />
              </g>
            ))}
            <path d={spark(44, 44, 5)} fill="#FFF8FF" />
            <path d={spark(168, 62, 3.6)} fill={accent} opacity="0.85" />
            <path d={spark(74, 30, 3)} fill="#FFF8FF" opacity="0.7" />
          </>
        );
    }
  }
}
