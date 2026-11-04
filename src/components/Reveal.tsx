import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { CELESTIAL } from '../animations/variants';

interface Props {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'section' | 'li';
}

/** Fades upward once, when it comes into view. Used for everything below the fold. */
export function Reveal({ children, delay = 0, className, as = 'div' }: Props) {
  const Tag = motion[as];
  return (
    <Tag
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.9, delay, ease: CELESTIAL }}
      className={className}
    >
      {children}
    </Tag>
  );
}
