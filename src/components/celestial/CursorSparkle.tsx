import { useEffect, useRef, useState } from 'react';
import { useFinePointer } from '../../hooks/useFinePointer';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface Mote {
  id: number;
  x: number;
  y: number;
  size: number;
  hue: string;
}

const TINTS = ['#FFF8FF', '#BBA5F5', '#E9B8D4', '#E9D5A1'];

/**
 * A faint trail of stardust behind the mouse.
 *
 * Desktop only, throttled to roughly one mote per 70ms, capped at 14 on screen,
 * and not rendered at all under reduce-motion. Pointer-events are off, so it can
 * never intercept a click.
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
          className="absolute"
          style={{
            left: m.x,
            top: m.y,
            width: m.size,
            height: m.size,
            marginLeft: -m.size / 2,
            marginTop: -m.size / 2,
            background: m.hue,
            borderRadius: '50%',
            boxShadow: `0 0 ${m.size * 2.5}px ${m.hue}`,
            animation: 'sparkleOut 0.9s ease-out forwards',
          }}
        />
      ))}
    </div>
  );
}
