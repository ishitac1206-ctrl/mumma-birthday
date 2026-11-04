import { Reveal } from './Reveal';

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
        className="relative rounded-2xl border px-7 py-8 backdrop-blur-sm sm:px-9"
        style={{
          borderColor: `${accent}3d`,
          background: `linear-gradient(145deg, ${accent}12 0%, rgb(33 20 61 / 0.4) 60%)`,
        }}
      >
        <span
          className="font-body absolute -top-2.5 left-7 rounded-full px-3 py-0.5 text-[0.6rem] tracking-[0.28em] uppercase"
          style={{ background: '#21143D', color: `${accent}d9`, border: `1px solid ${accent}40` }}
        >
          {label}
        </span>
        <p className="font-body text-[0.96rem] leading-[1.95] font-light text-blush/82">{text}</p>
      </div>
    </Reveal>
  );
}
