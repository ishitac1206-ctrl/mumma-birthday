import { motion } from 'framer-motion';
import { Illustration } from '../celestial/Illustration';
import { Eyebrow } from '../celestial/ornament';
import type { Illustration as Kind } from '../../data/structure';
import { CELESTIAL } from '../../animations/variants';

interface Props {
  /** Small uppercase label, e.g. "Chapter 01 · The Guiding Star". */
  eyebrow: string;
  title: string;
  subtitle?: string;
  illustration: Kind;
  accent: string;
}

/** The top of every inner page: illustration, chapter label, title, subtitle. */
export function PageHeader({ eyebrow, title, subtitle, illustration, accent }: Props) {
  return (
    <header className="mx-auto max-w-3xl text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: CELESTIAL }}
        className="relative mx-auto w-[min(62vw,240px)]"
      >
        {/* a dashed orbit turning very slowly behind the drawing */}
        <span
          className="pointer-events-none absolute inset-[6%] motion-safe:[animation:haloSpin_80s_linear_infinite]"
          aria-hidden="true"
        >
          <svg viewBox="0 0 100 100" className="h-full w-full">
            <circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke={accent}
              strokeWidth="0.4"
              strokeDasharray="0.8 5"
              opacity="0.4"
            />
          </svg>
        </span>

        <Illustration kind={illustration} accent={accent} className="relative w-full" />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.25, ease: CELESTIAL }}
        className="mt-4"
      >
        <Eyebrow accent={accent}>{eyebrow}</Eyebrow>
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.38, ease: CELESTIAL }}
        className="font-display glow-display mt-4 text-[2.3rem] leading-[1.12] font-light text-pearl sm:text-5xl"
      >
        {title}
      </motion.h1>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.1, delay: 0.6 }}
          className="font-poetic mx-auto mt-5 max-w-[34ch] text-[1.02rem] leading-relaxed text-lavender/85 italic sm:text-[1.12rem]"
        >
          {subtitle}
        </motion.p>
      )}
    </header>
  );
}
