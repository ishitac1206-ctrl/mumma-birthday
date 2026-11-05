import { motion } from 'framer-motion';
import { StarGlyph } from '../celestial/ornament';
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
      className="group vellum grain relative list-none overflow-hidden rounded-xl border border-lavender/20 bg-violet-deep/40 px-6 py-5 backdrop-blur-sm transition-colors duration-500 hover:border-champagne/40"
      style={{ boxShadow: '0 10px 30px -18px rgb(16 13 38 / 0.9)' }}
    >
      {/* the note is pinned by a star, with its own small pool of light */}
      <span
        className="pointer-events-none absolute -top-10 -right-10 h-28 w-28 rounded-full opacity-60 transition-opacity duration-700 group-hover:opacity-100"
        style={{ background: `radial-gradient(circle, ${accent}22 0%, transparent 70%)` }}
        aria-hidden="true"
      />
      <StarGlyph
        className="pointer-events-none absolute top-3 right-3 h-3 w-3 transition-transform duration-700 group-hover:rotate-45"
        color={accent}
        opacity={0.65}
      />

      <p className="font-body relative pr-4 text-[0.95rem] leading-[1.8] font-light text-blush/85">
        {text}
      </p>

      {/* a hairline tail, like thread trailing off the corner of a paper tag */}
      <span
        className="pointer-events-none absolute bottom-0 left-5 h-px w-10 opacity-50"
        style={{ backgroundImage: `linear-gradient(to right, ${accent}80, transparent)` }}
        aria-hidden="true"
      />
    </motion.li>
  );
}
