import { motion } from 'framer-motion';
import { Illustration } from '../celestial/Illustration';
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
        className="mx-auto w-[min(62vw,240px)]"
      >
        <Illustration kind={illustration} accent={accent} className="w-full" />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.25, ease: CELESTIAL }}
        className="font-body mt-4 text-[0.62rem] tracking-[0.22em] uppercase sm:text-[0.66rem] sm:tracking-[0.38em]"
        style={{ color: `${accent}c4` }}
      >
        {eyebrow}
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.38, ease: CELESTIAL }}
        className="font-display mt-4 text-[2.3rem] leading-[1.12] font-light text-pearl sm:text-5xl"
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
