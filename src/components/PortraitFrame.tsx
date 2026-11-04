import { motion } from 'framer-motion';
import { Photo } from './Photo';
import { Illustration } from './celestial/Illustration';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { CELESTIAL } from '../animations/variants';

interface Props {
  src: string;
  alt: string;
  caption?: string;
  accent: string;
  /** Smaller frame for inner pages. */
  size?: 'hero' | 'inline';
}

const HALO = [
  { x: 6, y: 16, s: 7, d: 0 },
  { x: 94, y: 24, s: 9, d: 1.4 },
  { x: -2, y: 62, s: 5, d: 2.6 },
  { x: 101, y: 70, s: 6, d: 0.7 },
  { x: 18, y: -3, s: 6, d: 3.4 },
  { x: 78, y: -5, s: 8, d: 2 },
  { x: 50, y: 103, s: 5, d: 1.1 },
];

/**
 * The portrait of Mumma, set into the universe.
 *
 * An arched frame with a gradient rim, an outer lavender bloom and a halo of
 * small stars around it — decoration sits *around* the photograph, never on
 * top of it, so her face is never tinted or overlaid.
 */
export function PortraitFrame({ src, alt, caption, accent, size = 'hero' }: Props) {
  const reduced = useReducedMotion();
  const hero = size === 'hero';

  return (
    <figure className={`relative mx-auto ${hero ? 'w-[min(78vw,340px)]' : 'w-[min(70vw,260px)]'}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.3, ease: CELESTIAL }}
        className="relative"
      >
        {/* outer bloom */}
        <div
          className="pointer-events-none absolute -inset-10 rounded-full"
          style={{
            background: `radial-gradient(circle at 50% 45%, ${accent}2e 0%, #BBA5F51f 42%, transparent 72%)`,
            filter: 'blur(18px)',
          }}
          aria-hidden="true"
        />

        {/* halo of stars */}
        <div className="pointer-events-none absolute -inset-6" aria-hidden="true">
          {HALO.map((h, i) => (
            <svg
              key={i}
              viewBox="0 0 10 10"
              className="absolute"
              style={
                {
                  left: `${h.x}%`,
                  top: `${h.y}%`,
                  width: h.s,
                  height: h.s,
                  '--tw-min': 0.3,
                  '--tw-max': 1,
                  ...(reduced ? {} : { animation: `twinkle ${4 + i}s ease-in-out ${h.d}s infinite` }),
                } as React.CSSProperties
              }
            >
              <path
                d="M5,0 Q5.8,4.2 10,5 Q5.8,5.8 5,10 Q4.2,5.8 0,5 Q4.2,4.2 5,0 Z"
                fill={i % 2 ? accent : '#FFF8FF'}
              />
            </svg>
          ))}
        </div>

        {/* the arch */}
        <div
          className="relative aspect-4/5 overflow-hidden"
          style={{
            borderRadius: '999px 999px 20px 20px',
            padding: '2px',
            background: `linear-gradient(170deg, ${accent}cc 0%, #BBA5F566 38%, #E9B8D44d 70%, ${accent}99 100%)`,
            boxShadow: `0 20px 60px -20px ${accent}55, 0 0 0 1px rgb(255 248 255 / 0.07)`,
          }}
        >
          <div
            className="relative h-full w-full overflow-hidden bg-violet-deep/70"
            style={{ borderRadius: '999px 999px 18px 18px' }}
          >
            <Photo
              src={src}
              alt={alt}
              eager={hero}
              className="h-full w-full object-cover"
              fallback={
                <div className="flex h-full w-full flex-col items-center justify-center gap-2 px-6 text-center">
                  <Illustration kind="cosmic-flower" accent={accent} className="w-28 opacity-70" />
                  <p className="font-poetic text-[0.78rem] leading-relaxed text-lavender/55 italic">
                    a photograph of you
                    <br />
                    belongs here
                  </p>
                </div>
              }
            />
          </div>
        </div>
      </motion.div>

      {caption && (
        <motion.figcaption
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="font-poetic mt-5 text-center text-sm text-blush/65 italic"
        >
          {caption}
        </motion.figcaption>
      )}
    </figure>
  );
}
