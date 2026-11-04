import { useMemo } from 'react';
import { mulberry32, seedFrom } from '../../lib/random';

interface Props {
  seed: string;
  count?: number;
}

/**
 * Shooting stars that cross every so often.
 *
 * Pure CSS on long cycles with staggered delays — they are visible for about a
 * second of each fourteen, which reads as "occasional" without any JS timers.
 */
export function ShootingStars({ seed, count = 3 }: Props) {
  const streaks = useMemo(() => {
    const rand = mulberry32(seedFrom(`${seed}-shoot`));
    return Array.from({ length: count }, () => {
      const angle = 14 + rand() * 20;
      const distance = 320 + rand() * 300;
      const radians = (angle * Math.PI) / 180;
      return {
        top: 2 + rand() * 45,
        left: -10 + rand() * 60,
        angle,
        dx: Math.cos(radians) * distance,
        dy: Math.sin(radians) * distance,
        dur: 13 + rand() * 9,
        delay: rand() * 16,
        width: 90 + rand() * 90,
      };
    });
  }, [seed, count]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {streaks.map((s, i) => (
        <span
          key={i}
          className="absolute block"
          style={
            {
              top: `${s.top}%`,
              left: `${s.left}%`,
              '--dx': `${s.dx}px`,
              '--dy': `${s.dy}px`,
              animation: `shoot ${s.dur}s linear ${s.delay}s infinite`,
            } as React.CSSProperties
          }
        >
          <span
            className="block rounded-full"
            style={{
              width: `${s.width}px`,
              height: '1.5px',
              transform: `rotate(${s.angle}deg)`,
              transformOrigin: 'left center',
              background:
                'linear-gradient(90deg, rgba(255,248,255,0) 0%, rgba(187,165,245,0.5) 45%, rgba(255,248,255,0.95) 100%)',
              filter: 'drop-shadow(0 0 5px rgba(187,165,245,0.8))',
            }}
          />
        </span>
      ))}
    </div>
  );
}
