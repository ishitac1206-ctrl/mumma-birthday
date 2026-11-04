import type { Chapter, ContentPage as PageDef } from '../data/structure';
import { PageShell } from '../layouts/PageShell';
import { PageHeader } from '../components/layout/PageHeader';
import { PageNav } from '../components/layout/PageNav';
import { Prose } from '../components/Prose';
import { Anecdote } from '../components/Anecdote';
import { PullQuote } from '../components/cards/PullQuote';
import { DetailCard } from '../components/cards/DetailCard';
import { NoteCard } from '../components/cards/NoteCard';
import { QuoteCard } from '../components/cards/QuoteCard';
import { Timeline } from '../components/Timeline';
import { Gallery } from '../components/gallery/Gallery';
import { WishStars } from '../components/celestial/WishStars';
import { EmptyWhisper } from '../components/EmptyWhisper';
import { Reveal } from '../components/Reveal';
import { Photo } from '../components/Photo';
import { copy, isUnwritten, list, pageContent, paragraphs, text } from '../data/content';

interface Props {
  chapter: Chapter;
  page: PageDef;
}

/**
 * Every inner content page.
 *
 * One shell — illustration, chapter label, title, subtitle, body, navigation —
 * with the middle swapped according to the page's `kind`, so a page of lessons,
 * a photo gallery and a field of wishes all still feel like the same storybook.
 */
export function ContentPage({ chapter, page }: Props) {
  const content = pageContent(page.route);
  const accent = chapter.mood.accent;

  const index = chapter.pages.findIndex((p) => p.route === page.route);
  const previous = index > 0 ? chapter.pages[index - 1] : undefined;
  const next = index < chapter.pages.length - 1 ? chapter.pages[index + 1] : undefined;

  const quote = text(content, 'quote');
  const anecdote = text(content, 'anecdote');
  const closing = text(content, 'closing');
  const photoCaption = text(content, 'photoCaption');
  const intro = paragraphs(content, 'intro');
  const body = paragraphs(content, 'body');

  const empty = isUnwritten(content);

  return (
    <PageShell mood={chapter.mood} seed={page.slug} quiet={page.kind === 'prose'}>
      <article className="mx-auto w-full max-w-4xl px-5 pt-12 pb-24 sm:px-8 sm:pt-16">
        <PageHeader
          eyebrow={`Chapter ${chapter.number} · ${chapter.title}`}
          title={copy(page.route, 'title') ?? page.title}
          subtitle={copy(page.route, 'subtitle')}
          illustration={page.illustration}
          accent={accent}
        />

        <div className="mt-16">
          {intro.length > 0 && <Prose paragraphs={intro} lead align="center" className="mb-10" />}

          {body.length > 0 && <Prose paragraphs={body} lead={intro.length === 0} />}

          {/* the middle, by page kind */}
          <div className="mt-12">{middle()}</div>

          {quote && <PullQuote accent={accent}>{quote}</PullQuote>}

          {anecdote && <Anecdote text={anecdote} accent={accent} />}

          {/* a supporting photograph, when the page has one */}
          {page.photo && (
            <Reveal className="mx-auto mt-14 max-w-2xl">
              <figure>
                <div
                  className="overflow-hidden rounded-2xl"
                  style={{ boxShadow: `0 28px 70px -32px ${accent}88, inset 0 0 0 1px ${accent}33` }}
                >
                  <Photo
                    src={page.photo}
                    alt={copy(page.route, 'title') ?? page.title}
                    className="w-full object-cover"
                  />
                </div>
                {photoCaption && (
                  <figcaption className="font-hand mt-3 text-center text-[1.2rem] text-blush/75">
                    {photoCaption}
                  </figcaption>
                )}
              </figure>
            </Reveal>
          )}

          {empty && <EmptyWhisper />}

          {closing && (
            <Reveal className="mt-16">
              <p className="font-poetic mx-auto max-w-[40ch] text-center text-[1.1rem] leading-relaxed text-lavender/85 italic">
                {closing}
              </p>
            </Reveal>
          )}
        </div>

        <PageNav
          previous={previous ? { to: previous.route, label: previous.title } : undefined}
          next={next ? { to: next.route, label: next.title } : undefined}
          up={{ to: chapter.route, label: chapter.title }}
          accent={accent}
        />
      </article>
    </PageShell>
  );

  /** The part of the page that differs: cards, notes, quotes, a gallery, stars. */
  function middle() {
    const items = page.listField ? list(content, page.listField) : [];

    switch (page.kind) {
      case 'cards':
        if (!items.length) return null;
        return (
          <ul className="grid gap-5 sm:gap-6 md:grid-cols-2">
            {items.map((item, i) => (
              <DetailCard
                key={i}
                title={item.title ?? item.name ?? item.text ?? ''}
                text={item.text && item.title ? item.text : item.proof}
                accent={accent}
                index={i}
                numbered={page.slug === 'your-superpowers' || page.slug === 'things-you-taught-me'}
              />
            ))}
          </ul>
        );

      case 'notes':
        if (!items.length) return null;
        return (
          <ul className="grid gap-4 sm:grid-cols-2 sm:gap-5">
            {items.map((item, i) => (
              <NoteCard key={i} text={item.text ?? item.title ?? ''} accent={accent} index={i} />
            ))}
          </ul>
        );

      case 'quotes':
        if (!items.length) return null;
        return (
          <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
            {items.map((item, i) => (
              <QuoteCard
                key={i}
                quote={item.quote ?? item.text ?? ''}
                context={item.context}
                accent={accent}
                index={i}
              />
            ))}
          </div>
        );

      case 'timeline':
        if (!items.length) return null;
        return <Timeline items={items} accent={accent} />;

      case 'starfield':
        if (!items.length) return null;
        return (
          <WishStars
            wishes={items.map((item) => item.text ?? '').filter(Boolean)}
            accent={accent}
          />
        );

      case 'gallery':
      case 'stories': {
        const photos = list(content, 'photos')
          .filter((item) => item.file)
          .map((item) => ({ file: item.file ?? '', caption: item.caption, story: item.story }));

        const mode =
          page.kind === 'stories' ? 'stories' : page.slug === 'the-family-album' ? 'grid' : 'polaroid';

        return <Gallery items={photos} dir={page.photoDir ?? ''} mode={mode} accent={accent} />;
      }

      case 'prose':
      default:
        return null;
    }
  }
}
