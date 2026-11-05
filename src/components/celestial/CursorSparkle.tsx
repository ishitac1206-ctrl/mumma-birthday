import { useEffect, useRef, useState } from 'react';
import { spark } from '../../lib/glyph';
import { useFinePointer } from '../../hooks/useFinePointer';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface Mote {
  id: number;
  x: number;
  y: number;
  size: number;
  hue: string;
  /** Every few motes is a drawn four-point star rather than a round speck. */
  star: boolean;
}

const TINTS = ['#FFF8FF', '#BBA5F5', '#E9B8D4', '#E9D5A1'];

/**
 * A faint trail of stardust behind the mouse.
 *
 * Desktop only, throttled to roughly one mote per 70ms, capped at 14 on screen,
 * and not rendered at all under reduce-motion. Pointer-events are off, so it can
 * never intercept a click. Roughly every third mote is the same four-point star
 * used everywhere else on the site, so the trail is dust with glints in it
 * rather than a row of identical dots.
 */
export function CursorSparkle() {
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const [motes, setMotes] = useState<Mote[]>([]);
  const last = useRef(0);
  const id = useRef(0);

  useEffect(() => {
    if (!fine || reduced) return;

    const onMove = (e: PointerEvent): void => {
      const now = performance.now();
      if (now - last.current < 70) return;
      last.current = now;

      const mote: Mote = {
        id: id.current++,
        x: e.clientX,
        y: e.clientY,
        size: 3 + Math.random() * 4,
        hue: TINTS[Math.floor(Math.random() * TINTS.length)] ?? '#FFF8FF',
        star: id.current % 3 === 0,
      };

      setMotes((prev) => [...prev.slice(-13), mote]);
      window.setTimeout(() => {
        setMotes((prev) => prev.filter((m) => m.id !== mote.id));
      }, 900);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [fine, reduced]);

  if (!fine || reduced) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50" aria-hidden="true">
      {motes.map((m) => (
        <span
          key={m.id}
          className="absolute grid place-items-center"
          style={{
            left: m.x,
            top: m.y,
            width: m.size * (m.star ? 2.4 : 1),
            height: m.size * (m.star ? 2.4 : 1),
            marginLeft: (-m.size * (m.star ? 2.4 : 1)) / 2,
            marginTop: (-m.size * (m.star ? 2.4 : 1)) / 2,
            ...(m.star
              ? { filter: `drop-shadow(0 0 ${m.size * 1.8}px ${m.hue})` }
              : {
                  background: m.hue,
                  borderRadius: '50%',
                  boxShadow: `0 0 ${m.size * 2.5}px ${m.hue}`,
                }),
            animation: 'sparkleOut 0.9s ease-out forwards',
          }}
        >
          {m.star && (
            <svg viewBox="0 0 10 10" className="h-full w-full">
              <path d={spark(5, 5, 5)} fill={m.hue} />
            </svg>
          )}
        </span>
      ))}
    </div>
  );
}
