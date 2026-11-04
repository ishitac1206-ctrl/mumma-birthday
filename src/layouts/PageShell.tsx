import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { CelestialBackground } from '../components/celestial/CelestialBackground';
import type { Mood } from '../components/celestial/CelestialBackground';
import { pageTransition } from '../animations/variants';

interface Props {
  mood: Mood;
  seed: string;
  children: ReactNode;
  quiet?: boolean;
  className?: string;
}

/**
 * The frame every page sits in: its own sky, and the drift-through-space
 * transition between routes.
 */
export function PageShell({ mood, seed, children, quiet = false, className = '' }: Props) {
  return (
    <motion.div
      variants={pageTransition}
      initial="hidden"
      animate="show"
      exit="exit"
      className={`relative min-h-screen ${className}`}
    >
      <CelestialBackground mood={mood} seed={seed} quiet={quiet} />
      {children}
    </motion.div>
  );
}
