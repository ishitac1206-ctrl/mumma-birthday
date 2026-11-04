import { useState } from 'react';
import { motion } from 'framer-motion';
import { Photo } from '../Photo';
import { Lightbox } from './Lightbox';
import type { LightboxItem } from './Lightbox';
import { EmptyWhisper } from '../EmptyWhisper';
import { CELESTIAL } from '../../animations/variants';

export interface GalleryItem {
  file: string;
  caption?: string;
  story?: string;
}

interface Props {
  items: GalleryItem[];
  /** Folder under public/assets/, e.g. `memories/childhood`. */
  dir: string;
  mode: 'polaroid' | 'grid' | 'stories';
  accent: string;
}

/**
 * A photo gallery that tolerates missing files.
 *
 * Each photograph removes itself if its file is not there yet, so a gallery
 * listed in CONTENT.md before the photos arrive shows nothing rather than a
 * row of broken frames. Every photograph opens in the lightbox.
 */
export function Gallery({ items, dir, mode, accent }: Props) {
  const [missing, setMissing] = useState<Set<number>>(new Set());
  const [open, setOpen] = useState<number | null>(null);

  const markMissing = (i: number): void =>
    setMissing((prev) => {
      if (prev.has(i)) return prev;
      const next = new Set(prev);
      next.add(i);
      return next;
    });

  const visible = items
    .map((item, i) => ({ item, i }))
    .filter(({ i }) => !missing.has(i));

  const lightboxItems: LightboxItem[] = visible.map(({ item }) => ({
    src: `${dir}/${item.file}`,
    caption: item.caption,
    story: item.story,
  }));

  if (!items.length || visible.length === 0) {
    return <EmptyWhisper>photographs will appear here</EmptyWhisper>;
  }

  const openAt = (position: number): void => setOpen(position);

  if (mode === 'stories') {
    return (
      <>
        <div className="mx-auto max-w-4xl space-y-20">
          {visible.map(({ item, i }, position) => (
            <motion.div
              key={item.file}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, ease: CELESTIAL }}
              className={`flex flex-col items-center gap-8 md:flex-row md:gap-12 ${
                position % 2 ? 'md:flex-row-reverse' : ''
              }`}
            >
              <button
                onClick={() => openAt(position)}
                className="group relative w-full shrink-0 overflow-hidden rounded-xl md:w-1/2"
                style={{ boxShadow: `0 24px 60px -28px ${accent}80` }}
                aria-label={`Open ${item.caption ?? 'photograph'}`}
              >
                <span
                  className="pointer-events-none absolute inset-0 z-10 rounded-xl"
                  style={{ boxShadow: `inset 0 0 0 1px ${accent}4d` }}
                  aria-hidden="true"
                />
                <Photo
                  src={`${dir}/${item.file}`}
                  alt={item.caption ?? 'A photograph'}
                  onMissing={() => markMissing(i)}
                  className="aspect-4/3 w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </button>

              <div className="md:w-1/2">
                {item.caption && (
                  <h3 className="font-display text-2xl leading-snug font-light text-pearl sm:text-[1.75rem]">
                    {item.caption}
                  </h3>
                )}
                {item.story && (
                  <p className="font-body mt-4 text-[0.96rem] leading-[1.95] font-light text-blush/78">
                    {item.story}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <Lightbox
          items={lightboxItems}
          index={open}
          onClose={() => setOpen(null)}
          onNavigate={setOpen}
          accent={accent}
        />
      </>
    );
  }

  if (mode === 'grid') {
    return (
      <>
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3">
          {visible.map(({ item, i }, position) => (
            <motion.button
              key={item.file}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: (position % 6) * 0.06, ease: CELESTIAL }}
              onClick={() => openAt(position)}
              className="group relative aspect-square overflow-hidden rounded-lg border border-lavender/20 transition-colors duration-500 hover:border-champagne/50"
              aria-label={`Open ${item.caption ?? 'photograph'}`}
            >
              <Photo
                src={`${dir}/${item.file}`}
                alt={item.caption ?? 'A family photograph'}
                onMissing={() => markMissing(i)}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
              />
              {item.caption && (
                <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-midnight/90 to-transparent px-3 pt-8 pb-2.5 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <span className="font-hand block text-center text-[1.05rem] text-blush">
                    {item.caption}
                  </span>
                </span>
              )}
            </motion.button>
          ))}
        </div>

        <Lightbox
          items={lightboxItems}
          index={open}
          onClose={() => setOpen(null)}
          onNavigate={setOpen}
          accent={accent}
        />
      </>
    );
  }

  // polaroid — scattered prints pinned to the sky
  return (
    <>
      <div className="mx-auto flex max-w-5xl flex-wrap items-start justify-center gap-6 sm:gap-8">
        {visible.map(({ item, i }, position) => {
          const tilt = [-3.2, 2.4, -1.6, 3.1, -2.4, 1.8, -3.6, 2.8][position % 8] ?? 0;
          return (
            <motion.button
              key={item.file}
              initial={{ opacity: 0, y: 28, rotate: tilt * 2 }}
              whileInView={{ opacity: 1, y: 0, rotate: tilt }}
              viewport={{ once: true, margin: '-50px' }}
              whileHover={{ rotate: 0, y: -8, scale: 1.03 }}
              transition={{ duration: 0.8, delay: (position % 6) * 0.07, ease: CELESTIAL }}
              onClick={() => openAt(position)}
              className="group w-[min(42vw,230px)] rounded-[3px] bg-pearl/95 p-3 pb-2 sm:w-[230px]"
              style={{ boxShadow: `0 22px 50px -22px rgb(16 13 38 / 0.95), 0 0 24px -12px ${accent}66` }}
              aria-label={`Open ${item.caption ?? 'photograph'}`}
            >
              <span className="block aspect-square overflow-hidden bg-violet-deep/30">
                <Photo
                  src={`${dir}/${item.file}`}
                  alt={item.caption ?? 'A photograph'}
                  onMissing={() => markMissing(i)}
                  className="h-full w-full object-cover"
                />
              </span>
              <span className="font-hand mt-2 block min-h-[1.6rem] px-1 text-center text-[1.15rem] leading-tight text-violet-deep/85">
                {item.caption ?? ''}
              </span>
            </motion.button>
          );
        })}
      </div>

      <Lightbox
        items={lightboxItems}
        index={open}
        onClose={() => setOpen(null)}
        onNavigate={setOpen}
        accent={accent}
      />
    </>
  );
}
