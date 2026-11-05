import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PageShell } from '../layouts/PageShell';
import { Constellation } from '../components/celestial/Constellation';
import { Illustration } from '../components/celestial/Illustration';
import { Divider, StarGlyph } from '../components/celestial/ornament';
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

        {/* two wide halos turning around the whole opening, one each way.
            The centring translate lives on the outer element and the rotation
            on the inner one — a single element cannot hold both, and a wide
            rotating box would grow the page instead of the ring. */}
        {!reduced &&
          [
            { w: 'w-[min(112vw,88vh)]', dur: 150, dash: '0.5 6', o: 0.3, rev: '' },
            { w: 'w-[min(78vw,62vh)]', dur: 95, dash: '0.4 9', o: 0.18, rev: ' reverse' },
          ].map((h, i) => (
            <div
              key={i}
              className={`pointer-events-none absolute top-1/2 left-1/2 aspect-square -translate-x-1/2 -translate-y-1/2 ${h.w}`}
              aria-hidden="true"
            >
              <div
                className="h-full w-full"
                style={{ animation: `haloSpin ${h.dur}s linear infinite${h.rev}` }}
              >
                <svg viewBox="0 0 100 100" className="h-full w-full">
                  <circle
                    cx="50"
                    cy="50"
                    r="49"
                    fill="none"
                    stroke="#BBA5F5"
                    strokeWidth="0.18"
                    strokeDasharray={h.dash}
                    opacity={h.o}
                  />
                  <circle cx="50" cy="1" r="0.7" fill="#FFF8FF" opacity="0.7" />
                </svg>
              </div>
            </div>
          ))}

        {/* a few stars drifting in the foreground, each on its own clock */}
        {[
          { c: 'top-[18%] left-[9%] h-4 w-4', tint: '#FFF8FF', o: 0.75, lift: '-16px', dur: 13 },
          { c: 'top-[34%] right-[11%] h-2.5 w-2.5', tint: '#E9D5A1', o: 0.7, lift: '-11px', dur: 17 },
          { c: 'bottom-[22%] left-[16%] h-3 w-3', tint: '#E9B8D4', o: 0.6, lift: '-13px', dur: 19 },
          { c: 'bottom-[14%] right-[18%] h-2 w-2', tint: '#BBA5F5', o: 0.65, lift: '-9px', dur: 15 },
        ].map((f, i) => (
          <StarGlyph
            key={i}
            className={`pointer-events-none absolute ${f.c}`}
            color={f.tint}
            opacity={f.o}
            style={
              reduced
                ? undefined
                : ({ '--lift': f.lift, animation: `floatY ${f.dur}s ease-in-out ${i * 1.6}s infinite` } as React.CSSProperties)
            }
          />
        ))}

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
            className="font-display gilt glow-display mt-12 text-[3rem] leading-[1.02] font-light sm:text-[4.5rem]"
          >
            {copy('/', 'title')}
          </motion.h1>

          <motion.p
            {...line(stage >= 4, 0.25)}
            className="font-poetic mt-4 text-[1.15rem] text-dusty sm:text-[1.35rem]"
          >
            {copy('/', 'subtitle')}
          </motion.p>

          <motion.div {...line(stage >= 4, 0.45)} className="mt-8">
            <Divider accent="#E9D5A1" width="w-16 sm:w-24" />
          </motion.div>

          <motion.div {...line(stage >= 5, 0.15)} className="mt-10">
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
              <span className="font-body relative flex items-center gap-2.5 text-[0.78rem] tracking-[0.3em] text-pearl uppercase">
                <StarGlyph
                  className="h-2 w-2 shrink-0 transition-transform duration-700 group-hover:rotate-90"
                  color="#E9D5A1"
                />
                {copy('/', 'button')}
                <StarGlyph
                  className="h-2 w-2 shrink-0 transition-transform duration-700 group-hover:-rotate-90"
                  color="#E9D5A1"
                />
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
