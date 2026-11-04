import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PageShell } from '../layouts/PageShell';
import { Constellation } from '../components/celestial/Constellation';
import { Illustration } from '../components/celestial/Illustration';
import { copy } from '../data/content';
import { CELESTIAL } from '../animations/variants';
import { useReducedMotion } from '../hooks/useReducedMotion';

const MOOD = {
  sky: ['#0b0819', '#1a1138', '#2d1d55'] as [string, string, string],
  bloom: ['#BBA5F5', '#E9B8D4'] as [string, string],
  accent: '#E9D5A1',
};

/** The central constellation on the opening screen. */
const OPENING_SHAPE = {
  stars: [
    { x: 50, y: 14, r: 2.6 },
    { x: 28, y: 36, r: 1.6 },
    { x: 72, y: 34, r: 1.8 },
    { x: 18, y: 64, r: 1.3 },
    { x: 50, y: 54, r: 2.2 },
    { x: 84, y: 62, r: 1.4 },
    { x: 36, y: 86, r: 1.5 },
    { x: 66, y: 84, r: 1.6 },
  ],
  lines: [
    [0, 1], [0, 2], [1, 4], [2, 4], [1, 3], [2, 5], [4, 6], [4, 7], [6, 7],
  ] as [number, number][],
};

/**
 * The first thing she sees.
 *
 * The sky arrives before the words do, each line settling before the next
 * appears. Tapping anywhere brings the whole sequence forward, so nobody is
 * ever made to wait through it, and the button then opens a star portal.
 */
export function Opening() {
  const navigate = useNavigate();
  const reduced = useReducedMotion();
  const [stage, setStage] = useState(reduced ? 5 : 0);
  const [warping, setWarping] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const marks = [800, 2400, 4400, 6200, 7400];
    const timers = marks.map((ms, i) => window.setTimeout(() => setStage((s) => Math.max(s, i + 1)), ms));
    return () => timers.forEach(window.clearTimeout);
  }, [reduced]);

  const enter = (): void => {
    if (warping) return;
    setWarping(true);
    window.setTimeout(() => navigate('/universe'), reduced ? 120 : 950);
  };

  const line = (visible: boolean, delay = 0) => ({
    initial: { opacity: 0, y: 14 },
    animate: visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 },
    transition: { duration: 1.2, delay, ease: CELESTIAL },
  });

  return (
    <PageShell mood={MOOD} seed="opening">
      <button
        type="button"
        onClick={() => setStage(5)}
        aria-label="Show everything now"
        tabIndex={stage >= 5 ? -1 : 0}
        className={`absolute inset-0 z-0 cursor-default ${stage >= 5 ? 'pointer-events-none' : ''}`}
      />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 py-20 text-center">
        {/* the central constellation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: stage >= 1 ? 1 : 0, scale: 1 }}
          transition={{ duration: 2.2, ease: CELESTIAL }}
          className="pointer-events-none absolute top-1/2 left-1/2 w-[min(86vw,460px)] -translate-x-1/2 -translate-y-1/2 opacity-45"
          aria-hidden="true"
        >
          <Constellation shape={OPENING_SHAPE} accent="#BBA5F5" className="w-full" />
        </motion.div>

        {/* a crescent moon, quietly off to the side */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: stage >= 1 ? 0.5 : 0 }}
          transition={{ duration: 2.4, delay: 0.6 }}
          className="pointer-events-none absolute top-[12%] right-[6%] w-28 sm:right-[10%] sm:w-36"
          aria-hidden="true"
        >
          <Illustration kind="crescent-moon" accent="#E9D5A1" className="w-full" />
        </motion.div>

        <div className="relative">
          <motion.p
            {...line(stage >= 1)}
            className="font-body text-[0.66rem] tracking-[0.46em] uppercase"
            style={{ color: '#E9D5A1cc' }}
          >
            {copy('/', 'eyebrow')}
          </motion.p>

          <div className="mt-14 min-h-[6.5rem] sm:min-h-[7rem]">
            <motion.p
              {...line(stage >= 2)}
              className="font-poetic text-[1.1rem] leading-relaxed text-blush/90 italic sm:text-[1.3rem]"
            >
              {copy('/', 'revealOne')}
            </motion.p>

            <motion.p
              {...line(stage >= 3, 0.1)}
              className="font-poetic mt-5 text-[1.1rem] leading-relaxed text-lavender/90 italic sm:text-[1.3rem]"
            >
              {copy('/', 'revealTwo')}
            </motion.p>
          </div>

          <motion.h1
            {...line(stage >= 4)}
            className="font-display mt-12 text-[3rem] leading-[1.02] font-light text-pearl sm:text-[4.5rem]"
          >
            {copy('/', 'title')}
          </motion.h1>

          <motion.p
            {...line(stage >= 4, 0.25)}
            className="font-poetic mt-4 text-[1.15rem] text-dusty sm:text-[1.35rem]"
          >
            {copy('/', 'subtitle')}
          </motion.p>

          <motion.div {...line(stage >= 5, 0.15)} className="mt-14">
            <button
              onClick={enter}
              disabled={stage < 5}
              className="group relative overflow-hidden rounded-full border border-champagne/45 bg-violet-deep/45 px-9 py-4 backdrop-blur-sm transition-all duration-500 hover:border-champagne hover:bg-violet-deep/70 disabled:cursor-default"
              style={{ boxShadow: '0 0 40px -14px #E9D5A199' }}
            >
              <span
                className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-champagne/22 to-transparent transition-transform duration-1000 group-hover:translate-x-full"
                aria-hidden="true"
              />
              <span className="font-body relative text-[0.78rem] tracking-[0.3em] text-pearl uppercase">
                {copy('/', 'button')}
              </span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* the star portal */}
      <AnimatePresence>
        {warping && (
          <motion.div
            className="pointer-events-none fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute top-1/2 left-1/2 aspect-square w-[40vmax] -translate-x-1/2 -translate-y-1/2 rounded-full"
              initial={{ scale: 0, opacity: 0.95 }}
              animate={{ scale: 6, opacity: 1 }}
              transition={{ duration: 0.95, ease: [0.65, 0, 0.35, 1] }}
              style={{
                background:
                  'radial-gradient(circle, #FFF8FF 0%, #E9D5A1 18%, #BBA5F5 38%, #6544A0 58%, #100D26 78%)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </PageShell>
  );
}
