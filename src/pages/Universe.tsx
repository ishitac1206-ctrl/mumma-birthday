import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { universeOrder } from '../data/structure';
import type { UniverseNode } from '../data/structure';
import { PageShell } from '../layouts/PageShell';
import { Constellation } from '../components/celestial/Constellation';
import { Divider } from '../components/celestial/ornament';
import { copy } from '../data/content';
import { CELESTIAL } from '../animations/variants';

const MOOD = {
  sky: ['#0d0a22', '#1d1440', '#33235f'] as [string, string, string],
  bloom: ['#BBA5F5', '#E9B8D4'] as [string, string],
  accent: '#BBA5F5',
};

/**
 * The map of the universe — the central navigation.
 *
 * Desktop gets a true star map with the eight constellations scattered across
 * the sky and faint threads joining them into one connected universe. Phones
 * get a purpose-built vertical sky instead of a shrunken map, because a map
 * squeezed to 375px is unusable.
 */
export function Universe() {
  const [lit, setLit] = useState<string | null>(null);

  return (
    <PageShell mood={MOOD} seed="universe">
      <div className="mx-auto w-full max-w-7xl px-5 pt-14 pb-20 sm:px-8">
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: CELESTIAL }}
          className="text-center"
        >
          <h1 className="font-display glow-display text-[2.4rem] leading-tight font-light text-pearl sm:text-5xl">
            {copy('/universe', 'title')}
          </h1>
          <p className="font-poetic mx-auto mt-5 max-w-[46ch] text-[1rem] leading-relaxed text-lavender/85 italic sm:text-[1.12rem]">
            {copy('/universe', 'intro')}
          </p>
          <div className="mt-8">
            <Divider accent="#BBA5F5" width="w-16 sm:w-24" />
          </div>
        </motion.header>

        {/* ---------- desktop star map ---------- */}
        <div className="relative mt-10 hidden h-[72vh] min-h-[560px] w-full md:block">
          {/* faint threads tying the constellations together */}
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 h-full w-full"
            aria-hidden="true"
          >
            {universeOrder.slice(0, -1).map((node, i) => {
              const next = universeOrder[i + 1];
              if (!next) return null;
              return (
                <line
                  key={node.slug}
                  x1={node.constellation.at.x}
                  y1={node.constellation.at.y}
                  x2={next.constellation.at.x}
                  y2={next.constellation.at.y}
                  stroke="#BBA5F5"
                  strokeWidth="0.12"
                  strokeDasharray="0.6 1.6"
                  opacity="0.3"
                />
              );
            })}
          </svg>

          {universeOrder.map((node, i) => (
            <MapNode
              key={node.slug}
              node={node}
              index={i}
              lit={lit === node.slug}
              onEnter={() => setLit(node.slug)}
              onLeave={() => setLit((s) => (s === node.slug ? null : s))}
            />
          ))}
        </div>

        {/* ---------- mobile sky ---------- */}
        <div className="mt-12 grid gap-4 md:hidden">
          <p className="font-body text-center text-[0.66rem] tracking-[0.3em] text-lavender/60 uppercase">
            {copy('/universe', 'hint')}
          </p>
          {universeOrder.map((node, i) => (
            <motion.div
              key={node.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.1 + i * 0.07, ease: CELESTIAL }}
            >
              <Link
                to={node.route}
                className="vellum grain relative flex items-center gap-5 overflow-hidden rounded-2xl border border-lavender/18 bg-violet-deep/35 p-5 backdrop-blur-sm transition-colors duration-400 active:border-champagne/50 active:bg-violet-deep/55"
              >
                <Constellation
                  shape={node.constellation}
                  accent={node.mood.accent}
                  className="h-16 w-16 shrink-0"
                />
                <span className="min-w-0 flex-1">
                  <span
                    className="font-body block text-[0.6rem] tracking-[0.3em] uppercase"
                    style={{ color: `${node.mood.accent}b8` }}
                  >
                    Chapter {node.number}
                  </span>
                  <span className="font-display mt-1 block text-[1.3rem] leading-snug font-light text-pearl">
                    {copy(node.route, 'title') ?? node.title}
                  </span>
                  <span className="font-poetic mt-1 block text-[0.8rem] leading-snug text-lavender/70 italic">
                    {copy(node.route, 'subtitle')}
                  </span>
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}

function MapNode({
  node,
  index,
  lit,
  onEnter,
  onLeave,
}: {
  node: UniverseNode;
  index: number;
  lit: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.1, delay: 0.3 + index * 0.1, ease: CELESTIAL }}
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${node.constellation.at.x}%`, top: `${node.constellation.at.y}%` }}
    >
      <Link
        to={node.route}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onFocus={onEnter}
        onBlur={onLeave}
        className="group block w-[150px] rounded-2xl p-2 text-center lg:w-[170px]"
      >
        <Constellation
          shape={node.constellation}
          accent={node.mood.accent}
          lit={lit}
          className="mx-auto h-28 w-28 transition-transform duration-700 group-hover:scale-110 lg:h-32 lg:w-32"
        />

        <span
          className="font-display mt-1 block text-[1.08rem] leading-tight font-light transition-colors duration-500"
          style={{ color: lit ? '#FFF8FF' : 'rgb(246 220 235 / 0.72)' }}
        >
          {copy(node.route, 'title') ?? node.title}
        </span>

        {/* the description appears on hover */}
        <span
          className="font-poetic mt-1.5 block text-[0.74rem] leading-snug text-lavender/80 italic transition-all duration-500"
          style={{
            opacity: lit ? 1 : 0,
            transform: lit ? 'translateY(0)' : 'translateY(-4px)',
          }}
        >
          {copy(node.route, 'subtitle')}
        </span>
      </Link>
    </motion.div>
  );
}
