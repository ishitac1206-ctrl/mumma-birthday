import { Link } from 'react-router-dom';
import { Reveal } from '../Reveal';

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
 * The way back, at the foot of every inner page.
 *
 * Previous and next within the chapter, plus a route up to the chapter and out
 * to the universe — so nobody can reach a dead end.
 */
export function PageNav({ previous, next, up, accent }: Props) {
  return (
    <Reveal as="section" className="mx-auto mt-24 w-full max-w-4xl">
      <Ornament accent={accent} />

      <nav className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-stretch sm:gap-4">
        <Side side="prev" link={previous} accent={accent} />
        <Side side="next" link={next} accent={accent} />
      </nav>

      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-8">
        <Link
          to={up.to}
          className="font-body text-[0.8rem] tracking-[0.2em] text-lavender/75 uppercase transition-colors duration-400 hover:text-champagne"
        >
          ← {up.label}
        </Link>
        <span className="hidden h-3 w-px bg-lavender/25 sm:block" aria-hidden="true" />
        <Link
          to="/universe"
          className="font-body text-[0.8rem] tracking-[0.2em] text-lavender/75 uppercase transition-colors duration-400 hover:text-champagne"
        >
          the universe
        </Link>
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
      className={`group flex-1 rounded-2xl border border-lavender/18 bg-violet-deep/28 px-6 py-5 backdrop-blur-sm transition-all duration-500 hover:border-champagne/40 hover:bg-violet-deep/45 ${
        isNext ? 'text-right' : 'text-left'
      }`}
    >
      <span
        className="font-body block text-[0.65rem] tracking-[0.3em] uppercase"
        style={{ color: `${accent}b3` }}
      >
        {isNext ? 'Next' : 'Previous'}
      </span>
      <span className="font-display mt-1.5 block text-lg leading-snug font-light text-pearl/90 transition-colors group-hover:text-pearl">
        {link.label}
      </span>
    </Link>
  );
}

function Ornament({ accent }: { accent: string }) {
  return (
    <div className="flex items-center justify-center gap-3" aria-hidden="true">
      <span
        className="h-px w-20"
        style={{ backgroundImage: `linear-gradient(to right, transparent, ${accent}66)` }}
      />
      <svg viewBox="0 0 10 10" className="h-2.5 w-2.5">
        <path d="M5,0 Q5.8,4.2 10,5 Q5.8,5.8 5,10 Q4.2,5.8 0,5 Q4.2,4.2 5,0 Z" fill={accent} opacity="0.75" />
      </svg>
      <span
        className="h-px w-20"
        style={{ backgroundImage: `linear-gradient(to left, transparent, ${accent}66)` }}
      />
    </div>
  );
}
