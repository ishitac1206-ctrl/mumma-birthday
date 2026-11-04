import { useMemo } from 'react';
import { mulberry32, seedFrom } from '../../lib/random';

interface Props {
  seed: string;
  count?: number;
  tint?: string;
}

/** Slow motes of stardust rising through the frame. */
export function Dust({ seed, count = 16, tint = '#F6DCEB' }: Props) {
  const motes = useMemo(() => {
    const rand = mulberry32(seedFrom(`${seed}-dust`));
    return Array.from({ length: count }, () => ({
      x: rand() * 100,
      y: 20 + rand() * 90,
      size: 1 + rand() * 2.6,
      dx: -20 + rand() * 50,
      dur: 16 + rand() * 22,
      delay: rand() * 24,
      opacity: 0.18 + rand() * 0.4,
    }));
  }, [seed, count]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {motes.map((m, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={
            {
              left: `${m.x}%`,
              top: `${m.y}%`,
              width: `${m.size}px`,
              height: `${m.size}px`,
              background: tint,
              filter: 'blur(0.4px)',
              boxShadow: `0 0 ${m.size * 3}px ${tint}`,
              '--dx': `${m.dx}px`,
              '--dust-o': m.opacity,
              animation: `dust ${m.dur}s linear ${m.delay}s infinite`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
