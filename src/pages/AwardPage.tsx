import { motion } from 'framer-motion';
import type { Award } from '../data/structure';
import { hallOfFame } from '../data/structure';
import { PageShell } from '../layouts/PageShell';
import { AwardBadge } from '../components/badges/AwardBadge';
import { Prose } from '../components/Prose';
import { PageNav } from '../components/layout/PageNav';
import { EmptyWhisper } from '../components/EmptyWhisper';
import { Reveal } from '../components/Reveal';
import { copy, pageContent, paragraphs, text } from '../data/content';
import { CELESTIAL } from '../animations/variants';

interface Props {
  award: Award;
}

/** One award — presented like a medal being handed over. */
export function AwardPage({ award }: Props) {
  const content = pageContent(award.route);
  const { core } = award.metal;

  const index = hallOfFame.awards.findIndex((a) => a.slug === award.slug);
  const previous = index > 0 ? hallOfFame.awards[index - 1] : undefined;
  const next = index < hallOfFame.awards.length - 1 ? hallOfFame.awards[index + 1] : undefined;

  const personal = paragraphs(content, 'personal');
  const note = text(content, 'note');
  const signature = text(content, 'signature');

  return (
    <PageShell mood={hallOfFame.mood} seed={award.slug} quiet>
      <article className="mx-auto w-full max-w-3xl px-5 pt-12 pb-24 sm:px-8 sm:pt-16">
        {/* the badge is revealed, not simply shown */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.3, ease: CELESTIAL }}
          className="relative mx-auto w-[min(62vw,250px)]"
        >
          <motion.span
            className="pointer-events-none absolute inset-0 rounded-full"
            initial={{ opacity: 0.9, scale: 0.6 }}
            animate={{ opacity: 0, scale: 2.1 }}
            transition={{ duration: 1.6, ease: 'easeOut' }}
            style={{ background: `radial-gradient(circle, ${core}66 0%, transparent 66%)` }}
            aria-hidden="true"
          />
          <AwardBadge
            badge={award.badge}
            metal={award.metal}
            ribbon={copy(award.route, 'badgeText')}
            className="w-full"
          />
        </motion.div>

        <header className="mt-10 text-center">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7, ease: CELESTIAL }}
            className="font-body text-[0.6rem] tracking-[0.24em] uppercase sm:text-[0.64rem] sm:tracking-[0.4em]"
            style={{ color: `${core}cc` }}
          >
            {copy(award.route, 'category')}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.85, ease: CELESTIAL }}
            className="font-display mt-4 text-[2.1rem] leading-[1.12] font-light text-pearl sm:text-[2.8rem]"
          >
            {copy(award.route, 'title') ?? award.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 1.05 }}
            className="font-poetic mx-auto mt-6 max-w-[44ch] text-[1.02rem] leading-relaxed text-lavender/85 italic sm:text-[1.1rem]"
          >
            {copy(award.route, 'citation')}
          </motion.p>
        </header>

        <div className="mt-14">
          {personal.length > 0 ? (
            <Prose paragraphs={personal} lead align="center" />
          ) : (
            <EmptyWhisper>the citation in full is still being written</EmptyWhisper>
          )}
        </div>

        {note && (
          <Reveal className="mx-auto mt-12 max-w-[46ch]">
            <p
              className="font-hand text-center text-[1.3rem] leading-relaxed"
              style={{ color: `${core}dd` }}
            >
              {note}
            </p>
          </Reveal>
        )}

        {/* certificate footer */}
        <Reveal className="mx-auto mt-16 max-w-xl">
          <div
            className="rounded-xl border px-8 py-7 text-center"
            style={{
              borderColor: `${core}40`,
              background: `linear-gradient(160deg, ${core}0f 0%, rgb(33 20 61 / 0.35) 70%)`,
            }}
          >
            <div className="flex items-center justify-center gap-2" aria-hidden="true">
              {[0, 1, 2].map((i) => (
                <svg key={i} viewBox="0 0 10 10" className={i === 1 ? 'h-3 w-3' : 'h-2 w-2'}>
                  <path
                    d="M5,0 Q5.8,4.2 10,5 Q5.8,5.8 5,10 Q4.2,5.8 0,5 Q4.2,4.2 5,0 Z"
                    fill={core}
                    opacity={i === 1 ? 1 : 0.6}
                  />
                </svg>
              ))}
            </div>
            <p className="font-body mt-4 text-[0.62rem] tracking-[0.34em] text-blush/55 uppercase">
              Presented with great ceremony
            </p>
            {signature && (
              <p className="font-hand mt-3 text-[1.45rem]" style={{ color: `${core}e6` }}>
                {signature}
              </p>
            )}
          </div>
        </Reveal>

        <PageNav
          previous={previous ? { to: previous.route, label: previous.title } : undefined}
          next={next ? { to: next.route, label: next.title } : undefined}
          up={{ to: hallOfFame.route, label: hallOfFame.title }}
          accent={hallOfFame.mood.accent}
        />
      </article>
    </PageShell>
  );
}
