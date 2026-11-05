import { motion } from 'framer-motion';
import { CELESTIAL } from '../animations/variants';

interface Props {
  paragraphs: string[];
  /** The opening paragraph is set a little larger. */
  lead?: boolean;
  className?: string;
  align?: 'left' | 'center';
}

/**
 * Body copy: generous leading, comfortable measure, revealed as it is reached.
 *
 * A left-aligned opening paragraph gets an illuminated initial — a champagne
 * drop cap in the display serif, the way the first letter of a chapter is set
 * in an old book. Centred text never does, because a drop cap needs a straight
 * left edge to sit against.
 */
export function Prose({ paragraphs, lead = false, className = '', align = 'left' }: Props) {
  if (!paragraphs.length) return null;

  return (
    <div className={`mx-auto max-w-[62ch] ${align === 'center' ? 'text-center' : ''} ${className}`}>
      {paragraphs.map((p, i) => (
        <motion.p
          key={i}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85, delay: i * 0.08, ease: CELESTIAL }}
          className={
            lead && i === 0
              ? `font-body mb-6 text-[1.08rem] leading-[1.95] font-light text-blush/90 sm:text-[1.15rem] ${
                  align === 'left' ? 'dropcap' : ''
                }`
              : 'font-body mb-6 text-[0.97rem] leading-[1.95] font-light text-blush/75 last:mb-0 sm:text-[1.02rem]'
          }
        >
          {p}
        </motion.p>
      ))}
    </div>
  );
}
