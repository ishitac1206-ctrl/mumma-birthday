import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { letter as node } from '../data/structure';
import { PageShell } from '../layouts/PageShell';
import { Illustration } from '../components/celestial/Illustration';
import { EmptyWhisper } from '../components/EmptyWhisper';
import { Photo } from '../components/Photo';
import { copy, pageContent, paragraphs, text } from '../data/content';
import { CELESTIAL } from '../animations/variants';

/**
 * Chapter 08 — the finale.
 *
 * Deliberately the calmest page on the site: a quieter sky, one radiant star,
 * and the letter revealed a paragraph at a time as she reads down it.
 */
export function Letter() {
  const content = pageContent(node.route);
  const accent = node.mood.accent;
  const body = paragraphs(content, 'body');
  const signature = text(content, 'signature');
  const photoCaption = text(content, 'photoCaption');

  return (
    <PageShell mood={node.mood} seed="letter" quiet>
      <div className="mx-auto w-full max-w-3xl px-5 pt-12 pb-24 sm:px-8 sm:pt-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-10"
        >
          <Link
            to="/universe"
            className="font-body text-[0.72rem] tracking-[0.26em] text-lavender/70 uppercase transition-colors duration-400 hover:text-champagne"
          >
            ← the universe
          </Link>
        </motion.div>

        {/* one exceptionally bright star */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, ease: CELESTIAL }}
          className="mx-auto w-[min(58vw,230px)]"
        >
          <Illustration kind="radiant-star" accent={accent} className="w-full" />
        </motion.div>

        {/* an optional small photograph above the letter */}
        <Photo
          src={node.portrait}
          alt="A photograph of Mum"
          className="mx-auto mt-6 w-[min(44vw,170px)] rounded-2xl object-cover"
        />
        {photoCaption && (
          <p className="font-hand mt-2 text-center text-[1.15rem] text-blush/70">{photoCaption}</p>
        )}

        <header className="mt-8 text-center">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: CELESTIAL }}
            className="font-body text-[0.64rem] tracking-[0.28em] uppercase sm:text-[0.66rem] sm:tracking-[0.42em]"
            style={{ color: `${accent}c4` }}
          >
            Chapter {node.number}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.65, ease: CELESTIAL }}
            className="font-display mt-4 text-[2.4rem] leading-[1.1] font-light text-pearl sm:text-5xl"
          >
            {copy(node.route, 'title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.9 }}
            className="font-poetic mt-5 text-[1.02rem] text-lavender/85 italic sm:text-[1.12rem]"
          >
            {copy(node.route, 'subtitle')}
          </motion.p>
        </header>

        {/* the letter itself */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, delay: 1, ease: CELESTIAL }}
          className="relative mt-14 rounded-3xl border border-lavender/20 bg-violet-deep/35 px-7 py-12 backdrop-blur-sm sm:px-14 sm:py-16"
          style={{ boxShadow: `0 40px 110px -50px ${accent}99` }}
        >
          <Corner className="top-3 left-3" accent={accent} />
          <Corner className="top-3 right-3 rotate-90" accent={accent} />
          <Corner className="bottom-3 left-3 -rotate-90" accent={accent} />
          <Corner className="right-3 bottom-3 rotate-180" accent={accent} />

          {body.length > 0 ? (
            body.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 1, delay: 0.1 + i * 0.12, ease: CELESTIAL }}
                className="font-poetic mb-7 text-[1.02rem] leading-[2.1] text-blush/88 last:mb-0 sm:text-[1.1rem]"
              >
                {p}
              </motion.p>
            ))
          ) : (
            <EmptyWhisper>the letter is still being written</EmptyWhisper>
          )}

          {signature && (
            <p className="font-hand mt-12 text-right text-[1.6rem]" style={{ color: `${accent}ee` }}>
              {signature}
            </p>
          )}
        </motion.div>

        {/* closing lines */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4 }}
          className="mt-16 text-center"
        >
          <p className="font-poetic mx-auto max-w-[44ch] text-[1.08rem] leading-relaxed text-lavender/85 italic sm:text-[1.18rem]">
            {copy(node.route, 'closingOne')}
          </p>
          <p className="font-display mt-8 text-[1.9rem] font-light text-pearl sm:text-[2.3rem]">
            {copy(node.route, 'closingTwo')}
          </p>

          <Link
            to="/universe"
            className="group mt-12 inline-flex items-center gap-3 rounded-full border border-lavender/30 bg-violet-deep/40 px-8 py-3.5 backdrop-blur-sm transition-all duration-500 hover:border-champagne/60 hover:bg-violet-deep/65"
          >
            <span className="font-body text-[0.76rem] tracking-[0.26em] text-blush/85 uppercase">
              {copy(node.route, 'button')}
            </span>
          </Link>
        </motion.div>
      </div>
    </PageShell>
  );
}

function Corner({ className, accent }: { className: string; accent: string }) {
  return (
    <svg viewBox="0 0 28 28" className={`absolute h-6 w-6 ${className}`} aria-hidden="true">
      <path
        d="M2,14 Q2,2 14,2"
        fill="none"
        stroke={accent}
        strokeWidth="1"
        opacity="0.55"
        strokeLinecap="round"
      />
      <path
        d="M8,2 Q8.5,5.5 12,6 Q8.5,6.5 8,10 Q7.5,6.5 4,6 Q7.5,5.5 8,2 Z"
        fill={accent}
        opacity="0.8"
      />
    </svg>
  );
}
