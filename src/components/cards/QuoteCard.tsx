import { motion } from 'framer-motion';
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
      className="relative rounded-2xl border border-lavender/18 bg-violet-deep/30 px-7 py-8 backdrop-blur-sm"
    >
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

      {context && (
        <figcaption className="font-poetic mt-4 text-center text-[0.82rem] text-lavender/70 italic">
          {context}
        </figcaption>
      )}

      <svg viewBox="0 0 10 10" className="absolute -right-1 -bottom-1 h-4 w-4" aria-hidden="true">
        <path
          d="M5,0 Q5.8,4.2 10,5 Q5.8,5.8 5,10 Q4.2,5.8 0,5 Q4.2,4.2 5,0 Z"
          fill={accent}
          opacity="0.6"
        />
      </svg>
    </motion.figure>
  );
}
