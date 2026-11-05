import { motion, useScroll, useTransform } from 'framer-motion';
import { Starfield } from './Starfield';
import { ShootingStars } from './ShootingStars';
import { Dust } from './Dust';
import { Filigree } from './ornament';
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
 * Nine layers at different depths — deep gradient, a galactic band, nebula
 * blooms, aurora ribbons, a starfield, dust, shooting stars, a vignette and a
 * fine grain — with the far layers drifting more slowly than the near ones as
 * the page scrolls. Entirely gradients and SVG, so it costs no image
 * downloads on a phone.
 *
 * The grain and the corner filigree are what stop it reading as a gradient:
 * one gives the sky the tooth of paper, the other frames the page like the
 * border of an illuminated book.
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

  /** Only animate when motion is welcome. */
  const anim = (value: string): React.CSSProperties =>
    reduced ? {} : ({ animation: value } as React.CSSProperties);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {/* 1 — the deep sky */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(130% 95% at 50% -10%, ${sky2} 0%, ${sky1} 42%, ${sky0} 100%)`,
        }}
      />

      {/* 2 — the galactic band: a river of faint light across the whole sky */}
      <div
        className="absolute -inset-x-1/4 top-[-10%] h-[150%] origin-center"
        style={{
          transform: 'rotate(-22deg)',
          background: `linear-gradient(to bottom, transparent 30%, ${bloomA}1c 44%, #FFF8FF14 50%, ${bloomB}1a 56%, transparent 70%)`,
          filter: 'blur(26px)',
        }}
      />

      {/* 3 — nebula clouds, slowly breathing */}
      <motion.div className="absolute inset-0" style={reduced ? undefined : { y: deep }}>
        <div
          className="absolute -top-[18%] -left-[14%] h-[75vh] w-[75vw] rounded-full"
          style={{
            background: `radial-gradient(circle at 42% 42%, ${bloomA}42 0%, ${bloomA}14 46%, transparent 72%)`,
            filter: 'blur(42px)',
            ...({ '--dx': '3%', '--dy': '2%' } as React.CSSProperties),
            ...anim('breathe 34s ease-in-out infinite'),
          }}
        />
        <div
          className="absolute -right-[16%] top-[30%] h-[70vh] w-[70vw] rounded-full"
          style={{
            background: `radial-gradient(circle at 55% 45%, ${bloomB}3a 0%, ${bloomB}12 48%, transparent 74%)`,
            filter: 'blur(48px)',
            ...({ '--dx': '-2.5%', '--dy': '3%' } as React.CSSProperties),
            ...anim('breathe 46s ease-in-out 3s infinite'),
          }}
        />
        <div
          className="absolute bottom-[-20%] left-[22%] h-[60vh] w-[66vw] rounded-full"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${mood.accent}22 0%, transparent 68%)`,
            filter: 'blur(56px)',
            ...({ '--dx': '2%', '--dy': '-3%' } as React.CSSProperties),
            ...anim('breathe 52s ease-in-out 6s infinite'),
          }}
        />
      </motion.div>

      {/* 4 — aurora: three slow ribbons of colour, the whimsy in the sky */}
      <motion.div
        className="absolute inset-0 mix-blend-screen"
        style={reduced ? undefined : { y: deep }}
      >
        {[
          { top: '6%', h: '34vh', rot: '-9deg', tint: bloomA, o: 0.5, dur: 38, delay: 0 },
          { top: '38%', h: '26vh', rot: '7deg', tint: bloomB, o: 0.4, dur: 52, delay: 5 },
          { top: '68%', h: '30vh', rot: '-5deg', tint: mood.accent, o: 0.3, dur: 64, delay: 11 },
        ].map((r, i) => (
          <div
            key={i}
            className="absolute -left-[12%] w-[124%]"
            style={{
              top: r.top,
              height: r.h,
              opacity: r.o,
              background: `linear-gradient(to bottom, transparent, ${r.tint}2e 38%, ${r.tint}18 62%, transparent)`,
              filter: 'blur(34px)',
              ...({ '--rot': r.rot } as React.CSSProperties),
              ...(reduced
                ? { transform: `rotate(${r.rot})` }
                : { animation: `aurora ${r.dur}s ease-in-out ${r.delay}s infinite` }),
            }}
          />
        ))}
      </motion.div>

      {/* 5 — the far starfield */}
      <motion.div className="absolute inset-0" style={reduced ? undefined : { y: mid }}>
        <Starfield
          seed={seed}
          count={quiet ? 90 : 160}
          sparkles={quiet ? 5 : 10}
          animate={!reduced}
          className="h-[130%] w-full"
        />
      </motion.div>

      {/* 6 — near dust and the occasional shooting star */}
      {!reduced && (
        <motion.div className="absolute inset-0" style={{ y: near }}>
          <Dust seed={seed} count={quiet ? 12 : 22} tint={bloomA} glow={quiet ? 2 : 4} />
          {!quiet && <ShootingStars seed={seed} count={3} />}
        </motion.div>
      )}

      {/* 7 — vignette, so the centre of the page holds the eye */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(100% 70% at 50% 45%, transparent 35%, ${sky0}cc 100%)`,
        }}
      />

      {/* 8 — the border of the illuminated page */}
      <div className="absolute inset-0 opacity-75">
        {([0, 1, 2, 3] as const).map((c) => (
          <Filigree key={c} accent={mood.accent} corner={c} />
        ))}
      </div>

      {/* 9 — grain, the tooth of the paper the whole thing is printed on */}
      <div className="grain absolute inset-0" />
    </div>
  );
}
