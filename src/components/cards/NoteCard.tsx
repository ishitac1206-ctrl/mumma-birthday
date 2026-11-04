import { motion } from 'framer-motion';
import { CELESTIAL } from '../../animations/variants';

interface Props {
  text: string;
  accent: string;
  index?: number;
}

/** A small floating note — a thank-you, a wish, a little thing she does. */
export function NoteCard({ text, accent, index = 0 }: Props) {
  // A gentle, deterministic tilt so a wall of notes never looks like a table.
  const tilt = [-1.4, 0.9, -0.5, 1.5, -1.1, 0.6][index % 6] ?? 0;

  return (
    <motion.li
      initial={{ opacity: 0, y: 24, rotate: tilt * 2.5 }}
      whileInView={{ opacity: 1, y: 0, rotate: tilt }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay: index * 0.07, ease: CELESTIAL }}
      className="relative list-none rounded-xl border border-lavender/20 bg-violet-deep/40 px-6 py-5 backdrop-blur-sm transition-colors duration-500 hover:border-champagne/40"
      style={{ boxShadow: '0 10px 30px -18px rgb(16 13 38 / 0.9)' }}
    >
      <span
        className="pointer-events-none absolute top-3 right-3 h-3 w-3"
        style={{ color: accent }}
        aria-hidden="true"
      >
        <svg viewBox="0 0 10 10">
          <path
            d="M5,0 Q5.8,4.2 10,5 Q5.8,5.8 5,10 Q4.2,5.8 0,5 Q4.2,4.2 5,0 Z"
            fill="currentColor"
            opacity="0.65"
          />
        </svg>
      </span>
      <p className="font-body pr-4 text-[0.95rem] leading-[1.8] font-light text-blush/85">{text}</p>
    </motion.li>
  );
}
