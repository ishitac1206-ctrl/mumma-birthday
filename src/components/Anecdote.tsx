import { Reveal } from './Reveal';
import { StarGlyph } from './celestial/ornament';

interface Props {
  text: string;
  accent: string;
  label?: string;
}

/** A personal story, set apart in a softly tinted panel. */
export function Anecdote({ text, accent, label = 'a memory' }: Props) {
  return (
    <Reveal className="mx-auto my-14 max-w-[58ch]">
      <div
        className="vellum grain relative overflow-hidden rounded-2xl border px-7 py-8 backdrop-blur-sm sm:px-9"
        style={{
          borderColor: `${accent}3d`,
          background: `linear-gradient(145deg, ${accent}12 0%, rgb(33 20 61 / 0.4) 60%)`,
        }}
      >
        {/* light leaking in from the top corner, as if the memory is lit */}
        <span
          className="pointer-events-none absolute -top-16 -right-10 h-40 w-40 rounded-full"
          style={{ background: `radial-gradient(circle, ${accent}1f 0%, transparent 70%)` }}
          aria-hidden="true"
        />

        <span
          className="font-body absolute -top-2.5 left-7 z-10 flex items-center gap-1.5 rounded-full px-3 py-0.5 text-[0.6rem] tracking-[0.28em] uppercase"
          style={{ background: '#21143D', color: `${accent}d9`, border: `1px solid ${accent}40` }}
        >
          <StarGlyph className="h-1.5 w-1.5" color={accent} opacity={0.9} />
          {label}
        </span>

        <p className="font-body relative text-[0.96rem] leading-[1.95] font-light text-blush/82">
          {text}
        </p>

        {/* a closing mark, bottom right */}
        <StarGlyph
          className="pointer-events-none absolute right-5 bottom-4 h-2 w-2 opacity-40"
          color={accent}
        />
      </div>
    </Reveal>
  );
}
