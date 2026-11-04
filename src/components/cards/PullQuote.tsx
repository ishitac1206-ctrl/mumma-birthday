import { motion } from 'framer-motion';
import { CELESTIAL } from '../../animations/variants';

interface Props {
  children: string;
  accent: string;
}

/** The highlighted line on a content page, framed by celestial rules. */
export function PullQuote({ children, accent }: Props) {
  return (
    <motion.blockquote
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 1, ease: CELESTIAL }}
      className="relative mx-auto my-14 max-w-[46ch] text-center"
    >
      <Rule accent={accent} />
      <p className="font-display px-4 py-7 text-[1.5rem] leading-[1.45] font-light text-pearl sm:text-[1.85rem]">
        {children}
      </p>
      <Rule accent={accent} flip />
    </motion.blockquote>
  );
}

function Rule({ accent, flip = false }: { accent: string; flip?: boolean }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${flip ? 'rotate-180' : ''}`} aria-hidden="true">
      <span className="h-px w-16 bg-gradient-to-r from-transparent" style={{ backgroundImage: `linear-gradient(to right, transparent, ${accent}80)` }} />
      <svg viewBox="0 0 10 10" className="h-3 w-3">
        <path d="M5,0 Q5.8,4.2 10,5 Q5.8,5.8 5,10 Q4.2,5.8 0,5 Q4.2,4.2 5,0 Z" fill={accent} />
      </svg>
      <span className="h-px w-16" style={{ backgroundImage: `linear-gradient(to left, transparent, ${accent}80)` }} />
    </div>
  );
}
