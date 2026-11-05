import { Divider } from './celestial/ornament';

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
    <div className="py-10 opacity-45" aria-hidden="true">
      <Divider accent="#BBA5F5" width="w-10 sm:w-14" arc={false} />
      <p className="font-poetic mt-3 text-center text-xs tracking-wide text-lavender/70 italic">
        {children}
      </p>
    </div>
  );
}
