import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Photo } from '../Photo';
import { CELESTIAL } from '../../animations/variants';

export interface LightboxItem {
  src: string;
  caption?: string;
  story?: string;
}

interface Props {
  items: LightboxItem[];
  index: number | null;
  onClose: () => void;
  onNavigate: (next: number) => void;
  accent: string;
}

/**
 * Full-screen photograph viewer.
 *
 * Keyboard driven as well as tappable: Escape closes, arrows move between
 * photographs. Body scroll is locked while open and focus moves to the close
 * button, so it behaves like a proper dialog.
 */
export function Lightbox({ items, index, onClose, onNavigate, accent }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const open = index !== null;
  const item = index === null ? undefined : items[index];

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && index !== null) onNavigate((index + 1) % items.length);
      if (e.key === 'ArrowLeft' && index !== null)
        onNavigate((index - 1 + items.length) % items.length);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, index, items.length, onClose, onNavigate]);

  return (
    <AnimatePresence>
      {open && item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={item.caption ?? 'Photograph'}
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-midnight/92 backdrop-blur-md" />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.5, ease: CELESTIAL }}
            className="relative flex max-h-full w-full max-w-5xl flex-col items-center gap-6 lg:flex-row lg:items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="relative max-h-[62vh] overflow-hidden rounded-xl lg:max-h-[80vh] lg:flex-1"
              style={{ boxShadow: `0 30px 90px -30px ${accent}66` }}
            >
              <Photo
                src={item.src}
                alt={item.caption ?? 'A photograph'}
                eager
                className="max-h-[62vh] w-auto object-contain lg:max-h-[80vh]"
              />
            </div>

            {(item.caption || item.story) && (
              <div className="w-full lg:max-w-sm">
                {item.caption && (
                  <p className="font-display text-xl leading-snug font-light text-pearl sm:text-2xl">
                    {item.caption}
                  </p>
                )}
                {item.story && (
                  <p className="font-body mt-4 max-h-[22vh] overflow-y-auto text-[0.94rem] leading-[1.9] font-light text-blush/75 lg:max-h-[50vh]">
                    {item.story}
                  </p>
                )}
              </div>
            )}
          </motion.div>

          {/* controls */}
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 rounded-full border border-lavender/30 bg-violet-deep/60 p-2.5 text-pearl/80 transition-colors hover:border-champagne/60 hover:text-pearl sm:top-6 sm:right-6"
          >
            <svg viewBox="0 0 16 16" className="h-4 w-4">
              <path d="M3,3 L13,13 M13,3 L3,13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </button>

          {items.length > 1 && index !== null && (
            <>
              <Arrow
                side="left"
                onClick={() => onNavigate((index - 1 + items.length) % items.length)}
              />
              <Arrow side="right" onClick={() => onNavigate((index + 1) % items.length)} />
              <p className="font-body absolute bottom-5 left-1/2 -translate-x-1/2 text-xs tracking-[0.25em] text-lavender/60">
                {index + 1} / {items.length}
              </p>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Arrow({ side, onClick }: { side: 'left' | 'right'; onClick: () => void }) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      aria-label={side === 'left' ? 'Previous photograph' : 'Next photograph'}
      className={`absolute top-1/2 -translate-y-1/2 rounded-full border border-lavender/25 bg-violet-deep/50 p-3 text-pearl/75 transition-colors hover:border-champagne/60 hover:text-pearl ${
        side === 'left' ? 'left-2 sm:left-5' : 'right-2 sm:right-5'
      }`}
    >
      <svg viewBox="0 0 16 16" className="h-4 w-4">
        <path
          d={side === 'left' ? 'M10,2 L4,8 L10,14' : 'M6,2 L12,8 L6,14'}
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
