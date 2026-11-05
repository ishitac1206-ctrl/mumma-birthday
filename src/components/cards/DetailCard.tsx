import { motion } from 'framer-motion';
import { StarGlyph } from '../celestial/ornament';
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
      className="group vellum grain relative list-none overflow-hidden rounded-2xl border border-lavender/18 bg-violet-deep/32 p-7 backdrop-blur-sm transition-all duration-500 hover:border-champagne/40 hover:bg-violet-deep/48"
    >
      <span
        className="pointer-events-none absolute -top-14 -left-10 h-36 w-36 rounded-full opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{ background: `radial-gradient(circle, ${accent}24 0%, transparent 70%)` }}
        aria-hidden="true"
      />

      <StarGlyph
        className="pointer-events-none absolute right-4 bottom-4 h-2 w-2 opacity-25 transition-all duration-700 group-hover:scale-150 group-hover:opacity-80"
        color={accent}
      />

      {numbered && (
        <span className="relative mb-1 flex items-center gap-2">
          {/* the numeral sits inside a hairline lozenge, like a plate number */}
          <span
            className="font-display grid h-7 w-7 place-items-center rounded-full text-[0.68rem] tracking-[0.08em]"
            style={{
              color: `${accent}e0`,
              border: `1px solid ${accent}3d`,
              background: `${accent}12`,
            }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <span
            className="h-px flex-1"
            style={{ backgroundImage: `linear-gradient(to right, ${accent}40, transparent)` }}
            aria-hidden="true"
          />
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
