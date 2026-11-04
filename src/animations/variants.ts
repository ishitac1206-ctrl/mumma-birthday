import type { Variants, Transition } from 'framer-motion';

/** The one easing curve the whole site moves on. */
export const CELESTIAL: Transition['ease'] = [0.22, 1, 0.36, 1];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: CELESTIAL } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 1.1, ease: CELESTIAL } },
};

/** Children reveal one after another rather than all at once. */
export const stagger = (delay = 0, each = 0.09): Variants => ({
  hidden: {},
  show: { transition: { delayChildren: delay, staggerChildren: each } },
});

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: CELESTIAL } },
};

/** Route transitions: drifting through space rather than sliding. */
export const pageTransition: Variants = {
  hidden: { opacity: 0, scale: 0.985, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.75, ease: CELESTIAL },
  },
  exit: {
    opacity: 0,
    scale: 1.015,
    filter: 'blur(6px)',
    transition: { duration: 0.4, ease: 'easeIn' },
  },
};
