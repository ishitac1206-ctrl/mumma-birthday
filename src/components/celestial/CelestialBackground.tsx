import { motion, useScroll, useTransform } from 'framer-motion';
import { Starfield } from './Starfield';
import { ShootingStars } from './ShootingStars';
import { Dust } from './Dust';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export interface Mood {
  sky: [string, string, string];
  bloom: [string, string];
  accent: string;
}

interface Props {
  mood: Mood;
  /** Stable string so each page keeps its own unchanging sky. */
  seed: string;
  /** Fewer stars and no shooting stars, for pages that want calm. */
  quiet?: boolean;
}

/**
 * The sky every page sits on.
 *
 * Five layers at different depths — deep gradient, two nebula blooms, a
 * starfield, dust and shooting stars — with the far layers drifting more slowly
 * than the near ones as the page scrolls. Entirely gradients and SVG, so it
 * costs no image downloads on a phone.
 */
export function CelestialBackground({ mood, seed, quiet = false }: Props) {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();

  // Parallax: the further away, the less it moves.
  const deep = useTransform(scrollY, [0, 2400], [0, 90]);
  const mid = useTransform(scrollY, [0, 2400], [0, 190]);
  const near = useTransform(scrollY, [0, 2400], [0, 320]);

  const [sky0, sky1, sky2] = mood.sky;
  const [bloomA, bloomB] = mood.bloom;

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {/* 1 — the deep sky */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(130% 95% at 50% -10%, ${sky2} 0%, ${sky1} 42%, ${sky0} 100%)`,
        }}
      />

      {/* 2 — nebula clouds, slowly breathing */}
      <motion.div className="absolute inset-0" style={reduced ? undefined : { y: deep }}>
        <div
          className="absolute -top-[18%] -left-[14%] h-[75vh] w-[75vw] rounded-full"
          style={{
            background: `radial-gradient(circle at 42% 42%, ${bloomA}42 0%, ${bloomA}14 46%, transparent 72%)`,
            filter: 'blur(42px)',
            ...(reduced
              ? {}
              : ({
                  '--dx': '3%',
                  '--dy': '2%',
                  animation: 'breathe 34s ease-in-out infinite',
                } as React.CSSProperties)),
          }}
        />
        <div
          className="absolute -right-[16%] top-[30%] h-[70vh] w-[70vw] rounded-full"
          style={{
            background: `radial-gradient(circle at 55% 45%, ${bloomB}3a 0%, ${bloomB}12 48%, transparent 74%)`,
            filter: 'blur(48px)',
            ...(reduced
              ? {}
              : ({
                  '--dx': '-2.5%',
                  '--dy': '3%',
                  animation: 'breathe 46s ease-in-out 3s infinite',
                } as React.CSSProperties)),
          }}
        />
        <div
          className="absolute bottom-[-20%] left-[22%] h-[60vh] w-[66vw] rounded-full"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${mood.accent}22 0%, transparent 68%)`,
            filter: 'blur(56px)',
            ...(reduced
              ? {}
              : ({
                  '--dx': '2%',
                  '--dy': '-3%',
                  animation: 'breathe 52s ease-in-out 6s infinite',
                } as React.CSSProperties)),
          }}
        />
      </motion.div>

      {/* 3 — the far starfield */}
      <motion.div className="absolute inset-0" style={reduced ? undefined : { y: mid }}>
        <Starfield
          seed={seed}
          count={quiet ? 80 : 140}
          sparkles={quiet ? 4 : 8}
          animate={!reduced}
          className="h-[130%] w-full"
        />
      </motion.div>

      {/* 4 — near dust and the occasional shooting star */}
      {!reduced && (
        <motion.div className="absolute inset-0" style={{ y: near }}>
          <Dust seed={seed} count={quiet ? 10 : 18} tint={bloomA} />
          {!quiet && <ShootingStars seed={seed} count={3} />}
        </motion.div>
      )}

      {/* 5 — vignette, so the centre of the page holds the eye */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(100% 70% at 50% 45%, transparent 35%, ${sky0}cc 100%)`,
        }}
      />
    </div>
  );
}
