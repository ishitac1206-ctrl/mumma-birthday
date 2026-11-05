import { motion } from 'framer-motion';
import { StarGlyph } from '../celestial/ornament';
import { CELESTIAL } from '../../animations/variants';

interface Props {
  quote: string;
  context?: string;
  accent: string;
  index?: number;
}

/** A saying, set in a soft frame with celestial quote marks. */
export function QuoteCard({ quote, context, accent, index = 0 }: Props) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.75, delay: index * 0.08, ease: CELESTIAL }}
      className="group vellum grain relative overflow-hidden rounded-2xl border border-lavender/18 bg-violet-deep/30 px-7 py-8 backdrop-blur-sm transition-colors duration-500 hover:border-champagne/35"
    >
      {/* light gathering behind the words */}
      <span
        className="pointer-events-none absolute -top-20 left-1/2 h-40 w-56 -translate-x-1/2 rounded-full opacity-70 transition-opacity duration-700 group-hover:opacity-100"
        style={{ background: `radial-gradient(ellipse, ${accent}1f 0%, transparent 70%)` }}
        aria-hidden="true"
      />

      <span
        className="font-display absolute top-1 left-5 text-5xl leading-none select-none"
        style={{ color: `${accent}66` }}
        aria-hidden="true"
      >
        &ldquo;
      </span>

      <blockquote className="font-display relative text-center text-[1.3rem] leading-snug font-light text-pearl sm:text-[1.45rem]">
        {quote}
      </blockquote>

      {/* a small star between the saying and who said it */}
      <span className="relative mt-4 flex items-center justify-center gap-2" aria-hidden="true">
        <span
          className="h-px w-8"
          style={{ backgroundImage: `linear-gradient(to right, transparent, ${accent}66)` }}
        />
        <StarGlyph className="h-1.5 w-1.5" color={accent} opacity={0.8} />
        <span
          className="h-px w-8"
          style={{ backgroundImage: `linear-gradient(to left, transparent, ${accent}66)` }}
        />
      </span>

      {context && (
        <figcaption className="font-poetic relative mt-3 text-center text-[0.82rem] text-lavender/70 italic">
          {context}
        </figcaption>
      )}

      {/* a closing mark that sits inside the card, since the panel clips */}
      <StarGlyph
        className="absolute right-4 bottom-4 h-2 w-2 opacity-50 transition-transform duration-700 group-hover:rotate-45"
        color={accent}
      />
    </motion.figure>
  );
}
