import { useState } from 'react';
import type { ReactNode } from 'react';
import { asset } from '../lib/assets';

interface Props {
  /** Path under public/assets/, e.g. `mother/heart.jpg`. */
  src: string;
  alt: string;
  className?: string;
  /** Rendered instead when the file is not there yet. */
  fallback?: ReactNode;
  /** Above-the-fold images skip lazy loading. */
  eager?: boolean;
  onLoad?: () => void;
  /** Fired once when the file turns out not to exist. */
  onMissing?: () => void;
}

/**
 * A photograph that is never broken.
 *
 * Photographs arrive over time, so every image on the site tolerates its file
 * being absent: on error it swaps to the fallback instead of showing a broken
 * icon. That is what lets the whole site be built and shown before a single
 * photo exists.
 */
export function Photo({
  src,
  alt,
  className,
  fallback = null,
  eager = false,
  onLoad,
  onMissing,
}: Props) {
  const [state, setState] = useState<'loading' | 'ok' | 'missing'>('loading');

  if (state === 'missing') return <>{fallback}</>;

  return (
    <img
      src={asset(src)}
      alt={alt}
      className={className}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onLoad={() => {
        setState('ok');
        onLoad?.();
      }}
      onError={() => {
        setState('missing');
        onMissing?.();
      }}
      style={{
        opacity: state === 'ok' ? 1 : 0,
        transition: 'opacity 900ms cubic-bezier(0.22,1,0.36,1)',
      }}
    />
  );
}
