import { useId } from 'react';
import type { BadgeId } from '../../data/structure';

interface Props {
  badge: BadgeId;
  metal: { core: string; rim: string; glow: string };
  /** Short ribbon text, from CONTENT.md. The ribbon is omitted without it. */
  ribbon?: string;
  className?: string;
}

const CX = 100;
const CY = 100;

/** The four-point star that ties the collection together. */
const spark = (x: number, y: number, s: number): string =>
  `M${x},${y - s} Q${x + s * 0.17},${y - s * 0.17} ${x + s},${y} Q${x + s * 0.17},${y + s * 0.17} ${x},${y + s} Q${x - s * 0.17},${y + s * 0.17} ${x - s},${y} Q${x - s * 0.17},${y - s * 0.17} ${x},${y - s} Z`;

/**
 * An award medallion.
 *
 * Every badge shares one chrome — a scalloped rim, a double ring, a field of
 * tiny stars and an optional ribbon — so the seven read as one collection,
 * while the centre and the metal differ for each. All SVG: no photographs and
 * no emoji anywhere in the Hall of Fame.
 */
export function AwardBadge({ badge, metal, ribbon, className }: Props) {
  const uid = useId().replace(/:/g, '');
  const g = (n: string): string => `${n}-${uid}`;
  const { core, rim, glow } = metal;

  return (
    <svg
      viewBox="0 0 200 240"
      className={className}
      role="presentation"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id={g('field')}>
          <stop offset="0%" stopColor={glow} stopOpacity="0.45" />
          <stop offset="60%" stopColor={core} stopOpacity="0.14" />
          <stop offset="100%" stopColor="#21143D" stopOpacity="0.5" />
        </radialGradient>
        <radialGradient id={g('aura')}>
          <stop offset="0%" stopColor={glow} stopOpacity="0.5" />
          <stop offset="100%" stopColor={glow} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={g('metal')} x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0%" stopColor="#FFF8FF" />
          <stop offset="38%" stopColor={core} />
          <stop offset="100%" stopColor={rim} />
        </linearGradient>
        <linearGradient id={g('ribbon')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={rim} />
          <stop offset="50%" stopColor={core} />
          <stop offset="100%" stopColor={rim} />
        </linearGradient>
      </defs>

      {/* halo */}
      <circle cx={CX} cy={CY} r="96" fill={`url(#${g('aura')})`} />

      {/* scalloped rim — 28 beads, the ornamental edge of the medal */}
      {Array.from({ length: 28 }, (_, i) => {
        const a = (i * Math.PI * 2) / 28 - Math.PI / 2;
        return (
          <circle
            key={i}
            cx={CX + Math.cos(a) * 78}
            cy={CY + Math.sin(a) * 78}
            r={i % 7 === 0 ? 4 : 2.4}
            fill={`url(#${g('metal')})`}
            opacity={i % 7 === 0 ? 1 : 0.75}
          />
        );
      })}

      {/* rings */}
      <circle cx={CX} cy={CY} r="72" fill={`url(#${g('field')})`} stroke={`url(#${g('metal')})`} strokeWidth="2.4" />
      <circle cx={CX} cy={CY} r="64" fill="none" stroke={core} strokeWidth="0.9" opacity="0.6" />
      <circle cx={CX} cy={CY} r="60" fill="none" stroke={core} strokeWidth="0.5" opacity="0.35" strokeDasharray="1.5 5" />

      {/* flourishes at the compass points */}
      {[0, 90, 180, 270].map((deg) => (
        <path key={deg} d={spark(CX, CY - 68, 5.2)} fill={`url(#${g('metal')})`} transform={`rotate(${deg} ${CX} ${CY})`} />
      ))}

      {/* the unique centre */}
      <g>{centre()}</g>

      {/* tiny stars scattered inside the field */}
      {[
        [66, 62, 2.6], [136, 68, 2.2], [60, 132, 2.4], [140, 128, 2],
        [100, 46, 1.8], [74, 100, 1.5], [128, 104, 1.5],
      ].map(([x, y, s], i) => (
        <path key={i} d={spark(x ?? 0, y ?? 0, s ?? 2)} fill="#FFF8FF" opacity={0.45 + (i % 3) * 0.18} />
      ))}

      {/* ribbon */}
      {ribbon && (
        <g>
          <path d="M34,186 L166,186 L158,206 L166,226 L100,214 L34,226 L42,206 Z" fill={`url(#${g('ribbon')})`} opacity="0.92" />
          <path d="M34,186 L166,186 L158,206 L166,226 L100,214 L34,226 L42,206 Z" fill="none" stroke="#FFF8FF" strokeWidth="0.8" opacity="0.5" />
          <text
            x="100"
            y="203"
            textAnchor="middle"
            fontSize="12"
            letterSpacing="2.4"
            fill="#21143D"
            fontFamily="'DM Sans', sans-serif"
            fontWeight="500"
          >
            {ribbon.slice(0, 22).toUpperCase()}
          </text>
        </g>
      )}
    </svg>
  );

  function centre() {
    const line = {
      stroke: `url(#${g('metal')})`,
      fill: 'none',
      strokeWidth: 2,
      strokeLinecap: 'round' as const,
      strokeLinejoin: 'round' as const,
    };

    switch (badge) {
      /* 1 — Lifetime Achievement: an ornate celestial sun */
      case 'sun':
        return (
          <>
            {Array.from({ length: 24 }, (_, i) => {
              const a = (i * Math.PI * 2) / 24;
              const long = i % 2 === 0;
              return (
                <line
                  key={i}
                  x1={CX + Math.cos(a) * 26}
                  y1={CY + Math.sin(a) * 26}
                  x2={CX + Math.cos(a) * (long ? 48 : 36)}
                  y2={CY + Math.sin(a) * (long ? 48 : 36)}
                  stroke={core}
                  strokeWidth={long ? 2.4 : 1.2}
                  opacity={long ? 0.95 : 0.5}
                  strokeLinecap="round"
                />
              );
            })}
            <circle cx={CX} cy={CY} r="24" fill={`url(#${g('metal')})`} opacity="0.35" />
            <circle cx={CX} cy={CY} r="24" stroke={`url(#${g('metal')})`} strokeWidth="2" fill="none" />
            <path d={spark(CX, CY, 17)} fill={`url(#${g('metal')})`} />
            <circle cx={CX} cy={CY} r="3.6" fill="#FFF8FF" />
          </>
        );

      /* 2 — World's Best Mumma: a royal crown ringed with stars */
      case 'crown':
        return (
          <>
            <path d="M62,118 L68,74 L84,94 L100,66 L116,94 L132,74 L138,118 Z" fill={`url(#${g('metal')})`} opacity="0.4" />
            <path d="M62,118 L68,74 L84,94 L100,66 L116,94 L132,74 L138,118 Z" {...line} strokeWidth="2.4" />
            <rect x="60" y="118" width="80" height="12" rx="4" fill={`url(#${g('metal')})`} opacity="0.6" />
            <rect x="60" y="118" width="80" height="12" rx="4" {...line} strokeWidth="1.8" />
            <path d={spark(100, 62, 7)} fill="#FFF8FF" />
            <circle cx="68" cy="72" r="3.4" fill={`url(#${g('metal')})`} />
            <circle cx="132" cy="72" r="3.4" fill={`url(#${g('metal')})`} />
            {[78, 100, 122].map((x) => (
              <circle key={x} cx={x} cy="124" r="2.6" fill="#FFF8FF" opacity="0.85" />
            ))}
            <path d={spark(100, 100, 6)} fill={core} opacity="0.5" />
          </>
        );

      /* 3 — Professor of the Year: an enchanted book, stars rising */
      case 'book':
        return (
          <>
            <path d="M100,86 C88,77 72,75 58,78 L58,122 C72,119 88,121 100,129 Z" fill="#FFF8FF" opacity="0.85" />
            <path d="M100,86 C112,77 128,75 142,78 L142,122 C128,119 112,121 100,129 Z" fill="#FFF8FF" opacity="0.65" />
            <path d="M100,86 C88,77 72,75 58,78 L58,122 C72,119 88,121 100,129 C112,121 128,119 142,122 L142,78 C128,75 112,77 100,86 Z" {...line} strokeWidth="2.2" />
            <line x1="100" y1="86" x2="100" y2="129" {...line} strokeWidth="1.6" />
            {[96, 104, 112].map((y, i) => (
              <g key={y}>
                <line x1={66 + i} y1={y} x2="92" y2={y - 1.5} stroke={rim} strokeWidth="1.3" opacity="0.45" strokeLinecap="round" />
                <line x1="108" y1={y - 1.5} x2={134 - i} y2={y} stroke={rim} strokeWidth="1.3" opacity="0.45" strokeLinecap="round" />
              </g>
            ))}
            <path d={spark(100, 62, 7.5)} fill="#FFF8FF" />
            <path d={spark(78, 54, 4)} fill={core} />
            <path d={spark(124, 52, 4.6)} fill={core} />
            <path d={spark(140, 66, 2.8)} fill="#FFF8FF" opacity="0.8" />
          </>
        );

      /* 4 — Unconditional Love: a cosmic heart in celestial flowers */
      case 'heart':
        return (
          <>
            <path
              d="M100,130 C70,110 60,94 60,82 C60,70 69,62 80,62 C88,62 95,67 100,75 C105,67 112,62 120,62 C131,62 140,70 140,82 C140,94 130,110 100,130 Z"
              fill={`url(#${g('metal')})`}
              opacity="0.4"
            />
            <path
              d="M100,130 C70,110 60,94 60,82 C60,70 69,62 80,62 C88,62 95,67 100,75 C105,67 112,62 120,62 C131,62 140,70 140,82 C140,94 130,110 100,130 Z"
              {...line}
              strokeWidth="2.4"
            />
            <path d={spark(100, 92, 11)} fill="#FFF8FF" opacity="0.9" />
            {[
              { x: 58, y: 118 },
              { x: 142, y: 118 },
            ].map((f, i) => (
              <g key={i} transform={`translate(${f.x} ${f.y}) scale(0.82)`}>
                {[0, 72, 144, 216, 288].map((a) => (
                  <ellipse key={a} cx="0" cy="-6" rx="3" ry="6" fill={core} opacity="0.7" transform={`rotate(${a} 0 0)`} />
                ))}
                <circle r="2.2" fill="#FFF8FF" />
              </g>
            ))}
            <path d={spark(100, 54, 4.4)} fill={core} />
          </>
        );

      /* 5 — Human GPS: an ornate compass, star at its heart */
      case 'compass':
        return (
          <>
            <circle cx={CX} cy={CY} r="42" fill={`url(#${g('metal')})`} opacity="0.14" />
            <circle cx={CX} cy={CY} r="42" {...line} strokeWidth="2.2" />
            <circle cx={CX} cy={CY} r="34" fill="none" stroke={core} strokeWidth="0.8" opacity="0.5" strokeDasharray="2 4" />
            {/* the needle */}
            <path d="M100,62 L110,100 L100,138 L90,100 Z" fill={`url(#${g('metal')})`} opacity="0.85" />
            <path d="M100,62 L110,100 L100,138 L90,100 Z" {...line} strokeWidth="1.6" />
            <path d="M62,100 L100,90 L138,100 L100,110 Z" fill={rim} opacity="0.55" />
            <path d="M62,100 L100,90 L138,100 L100,110 Z" {...line} strokeWidth="1.4" />
            <path d={spark(CX, CY, 9)} fill="#FFF8FF" />
            {['N', 'E', 'S', 'W'].map((d, i) => {
              const a = (i * Math.PI) / 2 - Math.PI / 2;
              return (
                <text
                  key={d}
                  x={CX + Math.cos(a) * 52}
                  y={CY + Math.sin(a) * 52 + 4}
                  textAnchor="middle"
                  fontSize="10"
                  fill={core}
                  fontFamily="'DM Sans', sans-serif"
                  opacity="0.8"
                >
                  {d}
                </text>
              );
            })}
          </>
        );

      /* 6 — Multitasking: many stars orbiting at once */
      case 'orbit':
        return (
          <>
            {[
              { rx: 46, ry: 20, rot: 0 },
              { rx: 46, ry: 20, rot: 60 },
              { rx: 46, ry: 20, rot: 120 },
            ].map((o, i) => (
              <ellipse
                key={i}
                cx={CX}
                cy={CY}
                rx={o.rx}
                ry={o.ry}
                fill="none"
                stroke={core}
                strokeWidth="1.4"
                opacity="0.55"
                transform={`rotate(${o.rot} ${CX} ${CY})`}
              />
            ))}
            {[
              { a: 0, r: 46, rot: 0, s: 5 },
              { a: 180, r: 46, rot: 0, s: 3.6 },
              { a: 0, r: 46, rot: 60, s: 4.4 },
              { a: 180, r: 46, rot: 60, s: 3.2 },
              { a: 0, r: 46, rot: 120, s: 4 },
              { a: 180, r: 46, rot: 120, s: 3.4 },
            ].map((p, i) => {
              const rad = (p.a * Math.PI) / 180;
              return (
                <path
                  key={i}
                  d={spark(CX + Math.cos(rad) * p.r, CY, p.s)}
                  fill={i % 2 ? core : '#FFF8FF'}
                  transform={`rotate(${p.rot} ${CX} ${CY})`}
                />
              );
            })}
            <circle cx={CX} cy={CY} r="16" fill={`url(#${g('metal')})`} opacity="0.4" />
            <circle cx={CX} cy={CY} r="16" {...line} strokeWidth="1.8" />
            <path d={spark(CX, CY, 11)} fill="#FFF8FF" />
          </>
        );

      /* 7 — Most Influential: a galaxy with a radiant core */
      case 'galaxy':
        return (
          <>
            {[0, 120, 240].map((rot) => (
              <path
                key={rot}
                d="M100,100 C118,86 142,88 148,106 C152,120 138,132 122,128"
                fill="none"
                stroke={core}
                strokeWidth="2.6"
                strokeLinecap="round"
                opacity="0.5"
                transform={`rotate(${rot} ${CX} ${CY})`}
              />
            ))}
            {[0, 120, 240].map((rot) => (
              <path
                key={`d${rot}`}
                d="M100,100 C116,92 134,94 140,106"
                fill="none"
                stroke="#FFF8FF"
                strokeWidth="1"
                strokeLinecap="round"
                opacity="0.45"
                strokeDasharray="1 5"
                transform={`rotate(${rot + 20} ${CX} ${CY})`}
              />
            ))}
            <circle cx={CX} cy={CY} r="22" fill={`url(#${g('aura')})`} />
            <path d={spark(CX, CY, 19)} fill={`url(#${g('metal')})`} />
            <circle cx={CX} cy={CY} r="4" fill="#FFF8FF" />
            <path d={spark(142, 72, 3.4)} fill="#FFF8FF" opacity="0.8" />
            <path d={spark(60, 126, 3)} fill={core} opacity="0.8" />
          </>
        );
    }
  }
}
