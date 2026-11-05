import { Link } from 'react-router-dom';
import { Reveal } from '../Reveal';
import { Divider, StarGlyph } from '../celestial/ornament';

export interface NavLinkInfo {
  to: string;
  label: string;
}

interface Props {
  previous?: NavLinkInfo;
  next?: NavLinkInfo;
  /** The chapter this page belongs to. */
  up: NavLinkInfo;
  accent: string;
}

/**
 * The way onward and the way back, at the foot of every inner page.
 *
 * Previous and next within the chapter, then two solid buttons out — to the
 * chapter and to the universe. Buttons rather than text links, so the exit is
 * never something you have to go looking for.
 */
export function PageNav({ previous, next, up, accent }: Props) {
  return (
    <Reveal as="section" className="mx-auto mt-24 w-full max-w-4xl">
      <Divider accent={accent} />

      <nav className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-stretch sm:gap-4">
        <Side side="prev" link={previous} accent={accent} />
        <Side side="next" link={next} accent={accent} />
      </nav>

      <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
        <Return to={up.to} label={up.label} accent={accent} primary />
        <Return to="/universe" label="The universe" accent={accent} />
      </div>
    </Reveal>
  );
}

function Side({
  side,
  link,
  accent,
}: {
  side: 'prev' | 'next';
  link?: NavLinkInfo;
  accent: string;
}) {
  if (!link) return <span className="hidden flex-1 sm:block" aria-hidden="true" />;

  const isNext = side === 'next';

  return (
    <Link
      to={link.to}
      className={`group vellum grain relative flex-1 overflow-hidden rounded-2xl border border-lavender/18 bg-violet-deep/28 px-6 py-5 backdrop-blur-sm transition-all duration-500 hover:border-champagne/40 hover:bg-violet-deep/45 ${
        isNext ? 'text-right' : 'text-left'
      }`}
    >
      <span
        className={`pointer-events-none absolute -top-12 h-32 w-32 rounded-full opacity-0 transition-opacity duration-700 group-hover:opacity-100 ${
          isNext ? '-right-10' : '-left-10'
        }`}
        style={{ background: `radial-gradient(circle, ${accent}22 0%, transparent 70%)` }}
        aria-hidden="true"
      />

      <span
        className={`font-body relative flex items-center gap-1.5 text-[0.65rem] tracking-[0.3em] uppercase ${
          isNext ? 'justify-end' : ''
        }`}
        style={{ color: `${accent}b3` }}
      >
        {!isNext && <StarGlyph className="h-1.5 w-1.5" color={accent} opacity={0.8} />}
        {isNext ? 'Next' : 'Previous'}
        {isNext && <StarGlyph className="h-1.5 w-1.5" color={accent} opacity={0.8} />}
      </span>
      <span className="font-display relative mt-1.5 block text-lg leading-snug font-light text-pearl/90 transition-colors group-hover:text-pearl">
        {link.label}
      </span>
    </Link>
  );
}

/** A solid, obvious way back — not a text link. */
function Return({
  to,
  label,
  accent,
  primary = false,
}: {
  to: string;
  label: string;
  accent: string;
  primary?: boolean;
}) {
  return (
    <Link
      to={to}
      className={`group relative flex w-full items-center justify-center gap-2.5 rounded-full border px-7 py-3.5 backdrop-blur-sm transition-all duration-500 active:scale-[0.98] sm:w-auto ${
        primary
          ? 'border-lavender/40 bg-violet-deep/65 hover:border-champagne/70 hover:bg-violet-deep/85'
          : 'border-lavender/22 bg-violet-deep/35 hover:border-champagne/45 hover:bg-violet-deep/60'
      }`}
    >
      <span
        className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ boxShadow: `0 0 28px -6px ${accent}99` }}
        aria-hidden="true"
      />
      <span
        className="relative shrink-0 transition-transform duration-500 group-hover:-translate-x-1"
        style={{ color: accent }}
        aria-hidden="true"
      >
        <svg viewBox="0 0 24 16" className="h-3.5 w-6">
          <path d="M24,8 H5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.8" />
          <path d="M5,3 Q5.9,7 10,8 Q5.9,9 5,13 Q4.1,9 0,8 Q4.1,7 5,3 Z" fill="currentColor" />
        </svg>
      </span>
      <span
        className={`font-body relative text-[0.76rem] tracking-[0.2em] uppercase ${
          primary ? 'text-blush/92' : 'text-blush/72'
        }`}
      >
        {label}
      </span>
    </Link>
  );
}

