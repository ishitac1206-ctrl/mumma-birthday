import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audio } from '../../lib/assets';

const FILE = 'universe.mp3';
const KEY = 'universe-music';

/**
 * The music control.
 *
 * Three rules from the brief, all enforced here: it never autoplays with sound
 * before a deliberate tap; the choice survives navigation (the element lives
 * above the router and the preference is remembered); and if no audio file has
 * been added, the control removes itself rather than offering silence.
 */
export function MusicControl() {
  const ref = useRef<HTMLAudioElement>(null);
  const [available, setAvailable] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [hint, setHint] = useState(false);

  // Restore a previous "music on" choice. Browsers may still refuse until the
  // visitor interacts, which is fine — the button simply stays in its off state.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    let wanted: string | null = null;
    try {
      wanted = window.localStorage.getItem(KEY);
    } catch {
      // Private browsing can throw on storage access; music just starts off.
    }
    if (wanted !== 'on' || !ref.current) return;

    ref.current.volume = 0.32;
    void ref.current
      .play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  }, []);

  const toggle = (): void => {
    const el = ref.current;
    if (!el) return;

    if (playing) {
      el.pause();
      setPlaying(false);
      try {
        window.localStorage.setItem(KEY, 'off');
      } catch {
        /* preference simply is not remembered */
      }
      return;
    }

    el.volume = 0.32;
    void el
      .play()
      .then(() => {
        setPlaying(true);
        try {
          window.localStorage.setItem(KEY, 'on');
        } catch {
          /* preference simply is not remembered */
        }
      })
      .catch(() => setPlaying(false));
  };

  if (!available) return null;

  return (
    <>
      <audio
        ref={ref}
        src={audio(FILE)}
        loop
        preload="none"
        onError={() => setAvailable(false)}
      />

      <div className="fixed right-4 bottom-4 z-40 flex items-center gap-3 sm:right-6 sm:bottom-6">
        <AnimatePresence>
          {hint && (
            <motion.span
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              className="font-body hidden rounded-full border border-lavender/20 bg-violet-deep/80 px-3.5 py-1.5 text-[0.7rem] tracking-wide text-blush/80 backdrop-blur-sm sm:block"
            >
              {playing ? 'Pause the music' : 'Play a little music'}
            </motion.span>
          )}
        </AnimatePresence>

        <button
          onClick={toggle}
          onMouseEnter={() => setHint(true)}
          onMouseLeave={() => setHint(false)}
          onFocus={() => setHint(true)}
          onBlur={() => setHint(false)}
          aria-label={playing ? 'Pause the background music' : 'Play the background music'}
          aria-pressed={playing}
          className="group relative grid h-11 w-11 place-items-center rounded-full border border-lavender/30 bg-violet-deep/70 backdrop-blur-md transition-all duration-500 hover:border-champagne/60 hover:bg-violet-deep/90"
        >
          <span
            className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ boxShadow: '0 0 22px -4px #E9D5A1aa' }}
            aria-hidden="true"
          />

          {playing ? (
            <span className="flex items-end gap-[3px]" aria-hidden="true">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="w-[2.5px] rounded-full bg-champagne"
                  animate={{ height: [5, 13, 7, 15, 5] }}
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    delay: i * 0.22,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </span>
          ) : (
            <svg viewBox="0 0 20 20" className="h-4 w-4 text-lavender/80" aria-hidden="true">
              <path
                d="M7,13 V7 L15,5 V11"
                stroke="currentColor"
                strokeWidth="1.4"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="5.5" cy="13.5" r="2" stroke="currentColor" strokeWidth="1.4" fill="none" />
              <circle cx="13.5" cy="11.5" r="2" stroke="currentColor" strokeWidth="1.4" fill="none" />
            </svg>
          )}
        </button>
      </div>
    </>
  );
}
