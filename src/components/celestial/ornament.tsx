import type { CSSProperties } from 'react';
import { spark } from '../../lib/glyph';

/**
 * The shared vocabulary of small marks: the star glyph as an element, the
 * section divider, and the corner flourish that frames the page.
 */

/** The same glyph as a standalone element, for corners and captions. */
export function StarGlyph({
  className,
  color = 'currentColor',
  opacity = 1,
  style,
}: {
  className?: string;
  color?: string;
  opacity?: number;
  style?: CSSProperties;
}) {
  return (
    <svg viewBox="0 0 10 10" className={className} style={style} aria-hidden="true" focusable="false">
      <path d={spark(5, 5, 5)} fill={color} opacity={opacity} />
    </svg>
  );
}

/**
 * The small label above a title: "Chapter 01", "Chapter 04 · Your Kind of
 * Magic". A star and a fading hairline to either side, so even the quietest
 * line on the page is set rather than simply typed.
 */
export function Eyebrow({
  children,
  accent,
  className = '',
}: {
  children: React.ReactNode;
  accent: string;
  className?: string;
}) {
  return (
    <span className={`flex items-center justify-center gap-3 ${className}`}>
      <span
        className="h-px w-8 shrink-0 sm:w-12"
        style={{ backgroundImage: `linear-gradient(to right, transparent, ${accent}80)` }}
        aria-hidden="true"
      />
      <StarGlyph className="h-1.5 w-1.5 shrink-0" color={accent} opacity={0.85} />
      <span
        className="font-body text-[0.62rem] tracking-[0.22em] uppercase sm:text-[0.66rem] sm:tracking-[0.38em]"
        style={{ color: `${accent}c4` }}
      >
        {children}
      </span>
      <StarGlyph className="h-1.5 w-1.5 shrink-0" color={accent} opacity={0.85} />
      <span
        className="h-px w-8 shrink-0 sm:w-12"
        style={{ backgroundImage: `linear-gradient(to left, transparent, ${accent}80)` }}
        aria-hidden="true"
      />
    </span>
  );
}

/**
 * The section divider.
 *
 * A dotted arc rising over three stars of descending size, with hairlines
 * fading out to either side — the illuminated-manuscript version of a `<hr>`.
 */
export function Divider({
  accent,
  width = 'w-20 sm:w-28',
  arc = true,
}: {
  accent: string;
  /** Tailwind width classes for each hairline. */
  width?: string;
  /** The dotted arc above the stars. */
  arc?: boolean;
}) {
  return (
    <div className="relative flex items-center justify-center gap-3" aria-hidden="true">
      <span
        className={`h-px ${width}`}
        style={{ backgroundImage: `linear-gradient(to right, transparent, ${accent}70)` }}
      />

      <span className="relative flex items-center gap-1.5">
        {arc && (
          <svg
            viewBox="0 0 64 16"
            className="pointer-events-none absolute -top-3 left-1/2 h-4 w-16 -translate-x-1/2"
          >
            <path
              d="M2,15 Q32,-3 62,15"
              fill="none"
              stroke={accent}
              strokeWidth="0.9"
              strokeLinecap="round"
              strokeDasharray="0.6 4"
              opacity="0.55"
            />
          </svg>
        )}
        <StarGlyph className="h-1.5 w-1.5" color={accent} opacity={0.5} />
        <StarGlyph className="h-3 w-3" color={accent} opacity={0.9} />
        <StarGlyph className="h-1.5 w-1.5" color={accent} opacity={0.5} />
      </span>

      <span
        className={`h-px ${width}`}
        style={{ backgroundImage: `linear-gradient(to left, transparent, ${accent}70)` }}
      />
    </div>
  );
}

/**
 * A corner flourish for the edge of the viewport.
 *
 * Four of these frame the whole site like the border of an illuminated page.
 * Kept very faint — it should be noticed second, not first.
 */
export function Filigree({ accent, corner }: { accent: string; corner: 0 | 1 | 2 | 3 }) {
  // top-left, top-right, bottom-right, bottom-left
  const place = [
    'top-0 left-0',
    'top-0 right-0 -scale-x-100',
    'bottom-0 right-0 -scale-100',
    'bottom-0 left-0 -scale-y-100',
  ][corner];

  return (
    <svg
      viewBox="0 0 120 120"
      className={`absolute ${place} h-24 w-24 sm:h-36 sm:w-36`}
      aria-hidden="true"
      focusable="false"
    >
      <g fill="none" stroke={accent} strokeLinecap="round">
        {/* the sweeping vine */}
        <path d="M4,52 C4,22 22,4 52,4" strokeWidth="1.1" opacity="0.6" />
        <path d="M4,76 C4,34 34,4 76,4" strokeWidth="0.7" opacity="0.32" strokeDasharray="1 5" />
        {/* two small leaves budding off it */}
        <path d="M14,26 C20,20 28,18 33,21" strokeWidth="0.7" opacity="0.45" />
        <path d="M26,14 C32,19 34,27 31,32" strokeWidth="0.7" opacity="0.45" />
      </g>
      <path d={spark(52, 4, 3.4)} fill={accent} opacity="0.8" />
      <path d={spark(4, 52, 2.6)} fill={accent} opacity="0.65" />
      <path d={spark(22, 22, 4.2)} fill="#FFF8FF" opacity="0.7" />
      <path d={spark(40, 14, 1.8)} fill={accent} opacity="0.35" />
      <path d={spark(14, 40, 1.6)} fill={accent} opacity="0.3" />
    </svg>
  );
}
