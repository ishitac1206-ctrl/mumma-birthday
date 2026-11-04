import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CELESTIAL } from '../../animations/variants';

interface Props {
  /** Where the primary button goes — the parent of the current page. */
  to: string;
  /** What that destination is called. */
  label: string;
  /** Adds a second, smaller button straight out to the universe map. */
  showUniverse?: boolean;
  accent: string;
}

/**
 * The way back, always on screen.
 *
 * Fixed to the top-left and mirroring the music control on the right, so there
 * is never a moment — however far down a page she has scrolled — where the way
 * out is not visible. Deliberately a solid, glowing pill rather than a quiet
 * text link, because the quiet version was too easy to miss on a phone.
 */
export function BackButton({ to, label, showUniverse = false, accent }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, delay: 0.3, ease: CELESTIAL }}
      className="fixed top-4 left-4 z-40 flex items-center gap-2 sm:top-6 sm:left-6"
    >
      <Link
        to={to}
        className="group relative flex items-center gap-2 rounded-full border border-lavender/35 bg-violet-deep/75 py-2.5 pr-4 pl-3.5 backdrop-blur-md sm:gap-2.5 sm:pr-5 sm:pl-4 transition-all duration-500 hover:border-champagne/65 hover:bg-violet-deep/92 active:scale-[0.97]"
        style={{ boxShadow: '0 8px 28px -12px rgb(16 13 38 / 0.9)' }}
      >
        <span
          className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ boxShadow: `0 0 26px -5px ${accent}aa` }}
          aria-hidden="true"
        />

        {/* a celestial arrow: a trailing line with a four-point star at its tip */}
        <span
          className="relative shrink-0 transition-transform duration-500 group-hover:-translate-x-1"
          style={{ color: accent }}
          aria-hidden="true"
        >
          <svg viewBox="0 0 24 16" className="h-3.5 w-6">
            <path d="M24,8 H5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.8" />
            <path
              d="M5,3 Q5.9,7 10,8 Q5.9,9 5,13 Q4.1,9 0,8 Q4.1,7 5,3 Z"
              fill="currentColor"
            />
          </svg>
        </span>

        <span className="font-body relative max-w-[54vw] truncate text-[0.64rem] tracking-[0.1em] text-blush/90 uppercase sm:max-w-none sm:text-[0.74rem] sm:tracking-[0.18em]">
          {label}
        </span>
      </Link>

      {/* straight out to the map, from pages that are two levels deep */}
      {showUniverse && (
        <Link
          to="/universe"
          aria-label="Back to the universe map"
          title="The universe map"
          className="group relative grid h-11 w-11 shrink-0 place-items-center rounded-full border border-lavender/35 bg-violet-deep/75 backdrop-blur-md transition-all duration-500 hover:border-champagne/65 hover:bg-violet-deep/92 active:scale-[0.97]"
          style={{ boxShadow: '0 8px 28px -12px rgb(16 13 38 / 0.9)' }}
        >
          <span
            className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ boxShadow: `0 0 26px -5px ${accent}aa` }}
            aria-hidden="true"
          />
          {/* a tiny constellation, standing for the map */}
          <svg viewBox="0 0 24 24" className="h-5 w-5" style={{ color: accent }} aria-hidden="true">
            <g stroke="currentColor" strokeWidth="0.9" opacity="0.65" strokeLinecap="round">
              <line x1="6" y1="8" x2="12" y2="5" />
              <line x1="12" y1="5" x2="18" y2="9" />
              <line x1="12" y1="5" x2="11" y2="13" />
              <line x1="11" y1="13" x2="17" y2="17" />
              <line x1="11" y1="13" x2="6" y2="17" />
            </g>
            {[
              [12, 5, 2.6],
              [6, 8, 1.5],
              [18, 9, 1.6],
              [11, 13, 1.8],
              [17, 17, 1.4],
              [6, 17, 1.4],
            ].map(([x, y, r], i) => (
              <path
                key={i}
                d={`M${x},${(y ?? 0) - (r ?? 0)} Q${(x ?? 0) + (r ?? 0) * 0.2},${(y ?? 0) - (r ?? 0) * 0.2} ${(x ?? 0) + (r ?? 0)},${y} Q${(x ?? 0) + (r ?? 0) * 0.2},${(y ?? 0) + (r ?? 0) * 0.2} ${x},${(y ?? 0) + (r ?? 0)} Q${(x ?? 0) - (r ?? 0) * 0.2},${(y ?? 0) + (r ?? 0) * 0.2} ${(x ?? 0) - (r ?? 0)},${y} Q${(x ?? 0) - (r ?? 0) * 0.2},${(y ?? 0) - (r ?? 0) * 0.2} ${x},${(y ?? 0) - (r ?? 0)} Z`}
                fill="currentColor"
              />
            ))}
          </svg>
        </Link>
      )}
    </motion.div>
  );
}
