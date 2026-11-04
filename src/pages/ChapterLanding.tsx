import { motion } from 'framer-motion';
import type { UniverseNode } from '../data/structure';
import { PageShell } from '../layouts/PageShell';
import { PortraitFrame } from '../components/PortraitFrame';
import { ChapterCard } from '../components/cards/ChapterCard';
import { BackButton } from '../components/layout/BackButton';
import { Prose } from '../components/Prose';
import { copy, pageContent, paragraphs } from '../data/content';
import { CELESTIAL } from '../animations/variants';

interface Props {
  node: UniverseNode;
}

/**
 * A chapter landing page.
 *
 * One pattern, reused by all eight chapters: the photograph of Mum first and
 * largest, then the chapter heading, then the cards for everything inside. The
 * only thing that changes between chapters is the atmosphere.
 */
export function ChapterLanding({ node }: Props) {
  const content = pageContent(node.route);
  const accent = node.mood.accent;
  const title = copy(node.route, 'title') ?? node.title;
  const subtitle = copy(node.route, 'subtitle');
  const caption = copy(node.route, 'photoCaption');

  return (
    <PageShell mood={node.mood} seed={node.slug}>
      <BackButton to="/universe" label="The universe" accent={accent} />

      <div className="mx-auto w-full max-w-5xl px-5 pt-24 pb-24 sm:px-8 sm:pt-28">
        {/* her photograph — the focal point of the page */}
        <PortraitFrame
          src={node.portrait}
          alt={`A photograph of Mum — ${node.title}`}
          caption={caption}
          accent={accent}
        />

        {/* chapter heading */}
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
            {title}
          </motion.h1>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.1, delay: 0.78 }}
              className="font-poetic mx-auto mt-6 max-w-[38ch] text-[1.05rem] leading-relaxed text-lavender/85 italic sm:text-[1.18rem]"
            >
              {subtitle}
            </motion.p>
          )}

          {paragraphs(content, 'intro').length > 0 && (
            <div className="mt-10">
              <Prose paragraphs={paragraphs(content, 'intro')} align="center" />
            </div>
          )}
        </header>

        {/* divider */}
        <div className="my-14 flex items-center justify-center gap-3" aria-hidden="true">
          <span className="h-px w-24" style={{ backgroundImage: `linear-gradient(to right, transparent, ${accent}70)` }} />
          <svg viewBox="0 0 10 10" className="h-3 w-3">
            <path d="M5,0 Q5.8,4.2 10,5 Q5.8,5.8 5,10 Q4.2,5.8 0,5 Q4.2,4.2 5,0 Z" fill={accent} />
          </svg>
          <span className="h-px w-24" style={{ backgroundImage: `linear-gradient(to left, transparent, ${accent}70)` }} />
        </div>

        {/* everything inside this chapter */}
        <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
          {node.pages?.map((p, i) => (
            <ChapterCard
              key={p.route}
              to={p.route}
              title={copy(p.route, 'title') ?? p.title}
              subtitle={copy(p.route, 'subtitle')}
              illustration={p.illustration}
              accent={accent}
              index={i}
            />
          ))}
        </div>
      </div>
    </PageShell>
  );
}
