interface Props {
  children?: string;
}

/**
 * What an unwritten section looks like.
 *
 * CONTENT.md ships full of `[ADD ... HERE]` placeholders. Rather than printing
 * those brackets on the page, anything still unwritten renders as this — so
 * the site looks composed at every stage of being filled in.
 */
export function EmptyWhisper({ children = 'still being written' }: Props) {
  return (
    <div className="flex items-center justify-center gap-4 py-10 opacity-45" aria-hidden="true">
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-lavender/50" />
      <svg viewBox="0 0 10 10" className="h-2.5 w-2.5 shrink-0">
        <path d="M5,0 Q5.8,4.2 10,5 Q5.8,5.8 5,10 Q4.2,5.8 0,5 Q4.2,4.2 5,0 Z" fill="#BBA5F5" />
      </svg>
      <span className="font-poetic text-xs tracking-wide text-lavender/70 italic">{children}</span>
      <svg viewBox="0 0 10 10" className="h-2.5 w-2.5 shrink-0">
        <path d="M5,0 Q5.8,4.2 10,5 Q5.8,5.8 5,10 Q4.2,5.8 0,5 Q4.2,4.2 5,0 Z" fill="#BBA5F5" />
      </svg>
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-lavender/50" />
    </div>
  );
}
