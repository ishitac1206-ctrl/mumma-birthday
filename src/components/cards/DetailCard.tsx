import { motion } from 'framer-motion';
import { CELESTIAL } from '../../animations/variants';

interface Props {
  title: string;
  text?: string;
  accent: string;
  index?: number;
  /** Shows a small numeral, for lessons and superpowers. */
  numbered?: boolean;
}

/** A titled card: a lesson, a quality, a superpower, an iconic moment. */
export function DetailCard({ title, text, accent, index = 0, numbered = false }: Props) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay: index * 0.08, ease: CELESTIAL }}
      className="group relative list-none overflow-hidden rounded-2xl border border-lavender/18 bg-violet-deep/32 p-7 backdrop-blur-sm transition-all duration-500 hover:border-champagne/40 hover:bg-violet-deep/48"
    >
      <span
        className="pointer-events-none absolute -top-14 -left-10 h-36 w-36 rounded-full opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{ background: `radial-gradient(circle, ${accent}24 0%, transparent 70%)` }}
        aria-hidden="true"
      />

      {numbered && (
        <span
          className="font-display relative block text-sm tracking-[0.3em]"
          style={{ color: `${accent}aa` }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
      )}

      <h3 className="font-display relative mt-1 text-[1.3rem] leading-snug font-light text-pearl sm:text-[1.45rem]">
        {title}
      </h3>

      {text && (
        <p className="font-body relative mt-3 text-[0.94rem] leading-[1.85] font-light text-blush/72">
          {text}
        </p>
      )}
    </motion.li>
  );
}
