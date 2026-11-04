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

/**
 * Route transitions: a slow crossfade between skies.
 *
 * Opacity only, deliberately. A `transform` or `filter` on this wrapper would
 * make it the containing block for every `position: fixed` descendant, which
 * silently turns the persistent back button and the fixed starfield into
 * absolutely-positioned elements that scroll away with the page. Each page
 * animates its own contents in, so the drift is still there.
 */
export const pageTransition: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.65, ease: CELESTIAL } },
  exit: { opacity: 0, transition: { duration: 0.35, ease: 'easeIn' } },
};
