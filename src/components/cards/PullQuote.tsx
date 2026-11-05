import { motion } from 'framer-motion';
import { Divider, StarGlyph } from '../celestial/ornament';
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
      className="relative mx-auto my-16 max-w-[46ch] text-center"
    >
      {/* one large, very faint star behind the line, as a watermark */}
      <StarGlyph
        className="pointer-events-none absolute top-1/2 left-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 opacity-[0.07]"
        color={accent}
      />

      <Divider accent={accent} width="w-14 sm:w-20" />

      <p className="font-display glow-display relative px-4 py-7 text-[1.5rem] leading-[1.45] font-light text-pearl sm:text-[1.85rem]">
        {children}
      </p>

      <div className="rotate-180">
        <Divider accent={accent} width="w-14 sm:w-20" />
      </div>
    </motion.blockquote>
  );
}
