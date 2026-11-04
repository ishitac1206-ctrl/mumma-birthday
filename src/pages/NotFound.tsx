import { Link } from 'react-router-dom';
import { PageShell } from '../layouts/PageShell';
import { Illustration } from '../components/celestial/Illustration';

const MOOD = {
  sky: ['#0d0a22', '#1d1440', '#33235f'] as [string, string, string],
  bloom: ['#BBA5F5', '#E9B8D4'] as [string, string],
  accent: '#BBA5F5',
};

/** A wrong turn, kept in character. */
export function NotFound() {
  return (
    <PageShell mood={MOOD} seed="lost" quiet>
      <div className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center px-6 text-center">
        <Illustration kind="shooting-stars" accent="#BBA5F5" className="w-56" />
        <h1 className="font-display mt-6 text-4xl font-light text-pearl">
          This star isn&rsquo;t on the map
        </h1>
        <p className="font-poetic mt-4 text-lavender/80 italic">
          Let&rsquo;s find your way back.
        </p>
        <Link
          to="/universe"
          className="font-body mt-10 rounded-full border border-lavender/35 bg-violet-deep/45 px-8 py-3.5 text-[0.76rem] tracking-[0.26em] text-blush/85 uppercase backdrop-blur-sm transition-colors duration-500 hover:border-champagne/60"
        >
          Back to your universe
        </Link>
      </div>
    </PageShell>
  );
}
