import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { hallOfFame } from '../data/structure';
import { PageShell } from '../layouts/PageShell';
import { PortraitFrame } from '../components/PortraitFrame';
import { AwardBadge } from '../components/badges/AwardBadge';
import { Prose } from '../components/Prose';
import { BackButton } from '../components/layout/BackButton';
import { copy, pageContent, paragraphs } from '../data/content';
import { CELESTIAL } from '../animations/variants';

/** Chapter 06 — the ceremony. Badges replace photographs as the visual subject. */
export function HallOfFame() {
  const node = hallOfFame;
  const content = pageContent(node.route);
  const accent = node.mood.accent;

  return (
    <PageShell mood={node.mood} seed="hall-of-fame">
      <BackButton to="/universe" label="The universe" accent={accent} />

      <div className="mx-auto w-full max-w-6xl px-5 pt-24 pb-24 sm:px-8 sm:pt-28">
        <PortraitFrame
          src={node.portrait}
          alt="A photograph of Mumma — The Hall of Fame"
          caption={copy(node.route, 'photoCaption')}
          accent={accent}
        />

        <header className="mx-auto mt-12 max-w-2xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45, ease: CELESTIAL }}
            className="font-body text-[0.64rem] tracking-[0.28em] uppercase sm:text-[0.68rem] sm:tracking-[0.42em]"
            style={{ color: `${accent}c4` }}
          >
            Chapter {node.number}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.56, ease: CELESTIAL }}
            className="font-display mt-4 text-[2.6rem] leading-[1.08] font-light text-pearl sm:text-6xl"
          >
            {copy(node.route, 'title') ?? node.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.78 }}
            className="font-poetic mx-auto mt-6 max-w-[40ch] text-[1.05rem] leading-relaxed text-lavender/85 italic sm:text-[1.18rem]"
          >
            {copy(node.route, 'subtitle')}
          </motion.p>

          {paragraphs(content, 'intro').length > 0 && (
            <div className="mt-10">
              <Prose paragraphs={paragraphs(content, 'intro')} align="center" />
            </div>
          )}
        </header>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {node.awards.map((award, i) => (
            <motion.div
              key={award.slug}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.85, delay: (i % 3) * 0.1, ease: CELESTIAL }}
            >
              <Link
                to={award.route}
                className="group flex h-full flex-col items-center rounded-2xl border border-lavender/18 bg-violet-deep/32 px-6 py-8 text-center backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-champagne/50 hover:bg-violet-deep/50"
              >
                <AwardBadge
                  badge={award.badge}
                  metal={award.metal}
                  className="w-32 transition-transform duration-700 group-hover:scale-105"
                />
                <span
                  className="font-body mt-4 text-[0.6rem] tracking-[0.3em] uppercase"
                  style={{ color: `${award.metal.core}c0` }}
                >
                  {copy(award.route, 'category')}
                </span>
                <span className="font-display mt-2 text-[1.3rem] leading-snug font-light text-pearl">
                  {copy(award.route, 'title') ?? award.title}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
