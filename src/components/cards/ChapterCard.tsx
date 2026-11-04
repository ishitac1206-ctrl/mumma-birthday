import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Illustration } from '../celestial/Illustration';
import type { Illustration as Kind } from '../../data/structure';
import { CELESTIAL } from '../../animations/variants';

interface Props {
  to: string;
  title: string;
  subtitle?: string;
  illustration: Kind;
  accent: string;
  index?: number;
}

/**
 * One topic inside a chapter.
 *
 * Translucent violet glass, a thin accent border, its own small illustration
 * and a celestial arrow. Lifts and warms on hover — and, because touch devices
 * never hover, the same emphasis is applied on focus and press.
 */
export function ChapterCard({ to, title, subtitle, illustration, accent, index = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay: index * 0.09, ease: CELESTIAL }}
    >
      <Link
        to={to}
        className="group relative block h-full overflow-hidden rounded-2xl border border-lavender/18 bg-violet-deep/35 p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-champagne/45 hover:bg-violet-deep/55 focus-visible:-translate-y-1.5 active:translate-y-0 sm:p-7"
        style={{ boxShadow: '0 1px 0 0 rgb(255 248 255 / 0.05) inset' }}
      >
        {/* glow that warms on hover */}
        <span
          className="pointer-events-none absolute -top-16 -right-16 h-44 w-44 rounded-full opacity-0 transition-opacity duration-700 group-hover:opacity-100 group-focus-visible:opacity-100"
          style={{ background: `radial-gradient(circle, ${accent}2b 0%, transparent 70%)` }}
          aria-hidden="true"
        />

        <div className="relative flex items-start gap-5">
          <span className="shrink-0" aria-hidden="true">
            <Illustration
              kind={illustration}
              accent={accent}
              still
              className="h-14 w-18 opacity-80 transition-opacity duration-500 group-hover:opacity-100"
            />
          </span>

          <span className="min-w-0 flex-1">
            <span className="font-display block text-[1.35rem] leading-snug font-light text-pearl sm:text-[1.5rem]">
              {title}
            </span>
            {subtitle && (
              <span className="font-poetic mt-1.5 block text-[0.86rem] leading-relaxed text-lavender/75 italic">
                {subtitle}
              </span>
            )}
          </span>

          {/* celestial arrow */}
          <span
            className="mt-1.5 shrink-0 translate-x-0 text-lg transition-transform duration-500 group-hover:translate-x-1"
            style={{ color: accent }}
            aria-hidden="true"
          >
            <svg viewBox="0 0 24 16" className="h-3.5 w-6">
              <path d="M0,8 H19" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              <path
                d="M19,3 Q19.9,7 24,8 Q19.9,9 19,13 Q18.1,9 14,8 Q18.1,7 19,3 Z"
                fill="currentColor"
              />
            </svg>
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
