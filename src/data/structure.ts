/**
 * The map of the universe.
 *
 * Structure only — routes, titles, moods and which illustration each page wears.
 * Every word of personal content lives in CONTENT.md and is looked up by `route`.
 */

export type Illustration =
  | 'open-book'
  | 'crescent-moon'
  | 'cosmic-flower'
  | 'starburst'
  | 'floating-notes'
  | 'enchanted-library'
  | 'constellation-diagram'
  | 'polaroids'
  | 'photo-grid'
  | 'speech-bubbles'
  | 'sparkle-swirl'
  | 'shooting-stars'
  | 'crescent-garden'
  | 'radiant-star';

/** How a page lays its content out. */
export type PageKind =
  | 'prose' // intro + body + quote + anecdote
  | 'cards' // prose plus a grid of titled cards
  | 'notes' // prose plus floating note cards
  | 'quotes' // prose plus quote cards
  | 'timeline' // prose plus a vertical constellation timeline
  | 'gallery' // a photo gallery with a lightbox
  | 'stories' // photographs with longer stories
  | 'starfield'; // the interactive field of clickable wishes

export interface ContentPage {
  slug: string;
  route: string;
  title: string;
  kind: PageKind;
  illustration: Illustration;
  /** Key of the list field in CONTENT.md this page renders, if any. */
  listField?: string;
  /** Folder under public/assets/ holding this page's gallery photos. */
  photoDir?: string;
  /** Optional single supporting photograph. */
  photo?: string;
}

export interface Chapter {
  number: string;
  slug: string;
  route: string;
  title: string;
  /** The portrait of Mum shown at the top of the chapter landing page. */
  portrait: string;
  /** Atmosphere: each chapter is a different region of one universe. */
  mood: {
    /** Background gradient stops, darkest first. */
    sky: [string, string, string];
    /** Nebula bloom colours. */
    bloom: [string, string];
    /** Accent used for borders, glows and small type. */
    accent: string;
  };
  /** Star coordinates (0-100 viewBox space) and the lines joining them. */
  constellation: {
    stars: { x: number; y: number; r: number }[];
    lines: [number, number][];
    /** Where this constellation sits on the universe map, in percent. */
    at: { x: number; y: number };
  };
  pages: ContentPage[];
}

const page = (
  chapterSlug: string,
  slug: string,
  title: string,
  kind: PageKind,
  illustration: Illustration,
  extra: Partial<ContentPage> = {},
): ContentPage => ({
  slug,
  route: `/${chapterSlug}/${slug}`,
  title,
  kind,
  illustration,
  ...extra,
});

export const chapters: Chapter[] = [
  {
    number: '01',
    slug: 'guiding-star',
    route: '/guiding-star',
    title: 'The Guiding Star',
    portrait: 'mother/guiding-star.jpg',
    mood: {
      sky: ['#100d26', '#241a44', '#3b2a5e'],
      bloom: ['#bba5f5', '#e9d5a1'],
      accent: '#e9d5a1',
    },
    constellation: {
      at: { x: 21, y: 23 },
      stars: [
        { x: 50, y: 8, r: 3.4 },
        { x: 30, y: 34, r: 1.8 },
        { x: 70, y: 34, r: 1.8 },
        { x: 20, y: 62, r: 1.4 },
        { x: 50, y: 52, r: 2.2 },
        { x: 80, y: 62, r: 1.4 },
        { x: 50, y: 88, r: 1.9 },
      ],
      lines: [
        [0, 1],
        [0, 2],
        [1, 4],
        [2, 4],
        [1, 3],
        [2, 5],
        [4, 6],
      ],
    },
    pages: [
      page('guiding-star', 'things-you-taught-me', 'Things You Taught Me', 'cards', 'open-book', {
        listField: 'lessons',
        photo: 'guiding-star/things-you-taught-me.jpg',
      }),
      page('guiding-star', 'my-safest-place', 'My Safest Place', 'prose', 'crescent-moon', {
        photo: 'guiding-star/my-safest-place.jpg',
      }),
      page(
        'guiding-star',
        'the-woman-i-hope-to-become',
        'The Woman I Hope to Become',
        'cards',
        'cosmic-flower',
        { listField: 'qualities', photo: 'guiding-star/the-woman-i-hope-to-become.jpg' },
      ),
      page(
        'guiding-star',
        'things-i-never-say-enough',
        'Things I Never Say Enough',
        'notes',
        'floating-notes',
        { listField: 'notes', photo: 'guiding-star/things-i-never-say-enough.jpg' },
      ),
    ],
  },
  {
    number: '02',
    slug: 'heart',
    route: '/heart',
    title: 'A Heart Like Yours',
    portrait: 'mother/heart.jpg',
    mood: {
      sky: ['#160d24', '#3a1540', '#5c2152'],
      bloom: ['#e9b8d4', '#bba5f5'],
      accent: '#e9b8d4',
    },
    constellation: {
      at: { x: 63, y: 15 },
      stars: [
        { x: 50, y: 82, r: 3 },
        { x: 26, y: 54, r: 1.8 },
        { x: 74, y: 54, r: 1.8 },
        { x: 16, y: 30, r: 1.5 },
        { x: 84, y: 30, r: 1.5 },
        { x: 32, y: 14, r: 2.1 },
        { x: 68, y: 14, r: 2.1 },
        { x: 50, y: 32, r: 1.3 },
      ],
      lines: [
        [0, 1],
        [0, 2],
        [1, 3],
        [2, 4],
        [3, 5],
        [4, 6],
        [5, 7],
        [6, 7],
      ],
    },
    pages: [
      page('heart', 'the-kindness-you-carry', 'The Kindness You Carry', 'prose', 'cosmic-flower', {
        photo: 'heart/the-kindness-you-carry.jpg',
      }),
      page('heart', 'the-little-things', 'The Little Things', 'notes', 'sparkle-swirl', {
        listField: 'things',
        photo: 'heart/the-little-things.jpg',
      }),
      page('heart', 'a-strength-of-your-own', 'A Strength of Your Own', 'prose', 'starburst', {
        photo: 'heart/a-strength-of-your-own.jpg',
      }),
      page('heart', 'the-way-you-love', 'The Way You Love', 'cards', 'crescent-garden', {
        listField: 'languages',
        photo: 'heart/the-way-you-love.jpg',
      }),
    ],
  },
  {
    number: '03',
    slug: 'professor',
    route: '/professor',
    title: 'The Professor',
    portrait: 'mother/professor.jpg',
    mood: {
      sky: ['#0c0f2a', '#1c2050', '#2e2f6b'],
      bloom: ['#bba5f5', '#e9d5a1'],
      accent: '#e9d5a1',
    },
    constellation: {
      at: { x: 13, y: 50 },
      stars: [
        { x: 18, y: 26, r: 2 },
        { x: 50, y: 18, r: 3.2 },
        { x: 82, y: 26, r: 2 },
        { x: 50, y: 48, r: 1.6 },
        { x: 24, y: 72, r: 1.8 },
        { x: 76, y: 72, r: 1.8 },
        { x: 50, y: 86, r: 1.4 },
      ],
      lines: [
        [0, 1],
        [1, 2],
        [1, 3],
        [3, 4],
        [3, 5],
        [4, 6],
        [5, 6],
      ],
    },
    pages: [
      page(
        'professor',
        'the-woman-behind-the-classroom',
        'The Woman Behind the Classroom',
        'timeline',
        'enchanted-library',
        { listField: 'milestones', photo: 'professor/the-woman-behind-the-classroom.jpg' },
      ),
      page('professor', 'beyond-the-blackboard', 'Beyond the Blackboard', 'quotes', 'open-book', {
        listField: 'voices',
        photo: 'professor/beyond-the-blackboard.jpg',
      }),
      page(
        'professor',
        'lessons-that-last-forever',
        'Lessons That Last Forever',
        'prose',
        'constellation-diagram',
        { photo: 'professor/lessons-that-last-forever.jpg' },
      ),
    ],
  },
  {
    number: '04',
    slug: 'memories',
    route: '/memories',
    title: 'Little Pieces of Forever',
    portrait: 'mother/memories.jpg',
    mood: {
      sky: ['#140e28', '#301a47', '#4e2a5e'],
      bloom: ['#e9b8d4', '#f6dceb'],
      accent: '#e9b8d4',
    },
    constellation: {
      at: { x: 41, y: 41 },
      stars: [
        { x: 12, y: 44, r: 1.6 },
        { x: 32, y: 22, r: 2.3 },
        { x: 52, y: 40, r: 1.7 },
        { x: 70, y: 18, r: 2.6 },
        { x: 88, y: 42, r: 1.6 },
        { x: 60, y: 70, r: 1.9 },
        { x: 34, y: 78, r: 1.5 },
      ],
      lines: [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 4],
        [2, 5],
        [5, 6],
      ],
    },
    pages: [
      page('memories', 'once-upon-a-childhood', 'Once Upon a Childhood', 'gallery', 'polaroids', {
        photoDir: 'memories/childhood',
      }),
      page('memories', 'our-little-adventures', 'Our Little Adventures', 'gallery', 'polaroids', {
        photoDir: 'memories/adventures',
      }),
      page(
        'memories',
        'ordinary-days-extraordinary-memories',
        'Ordinary Days, Extraordinary Memories',
        'gallery',
        'sparkle-swirl',
        { photoDir: 'memories/ordinary-days' },
      ),
      page('memories', 'the-family-album', 'The Family Album', 'gallery', 'photo-grid', {
        photoDir: 'memories/family',
      }),
      page(
        'memories',
        'if-these-pictures-could-talk',
        'If These Pictures Could Talk',
        'stories',
        'crescent-moon',
        { photoDir: 'memories/stories' },
      ),
    ],
  },
  {
    number: '05',
    slug: 'magic',
    route: '/magic',
    title: 'Your Kind of Magic',
    portrait: 'mother/magic.jpg',
    mood: {
      sky: ['#19102c', '#3d1b4e', '#6a2f69'],
      bloom: ['#f6dceb', '#bba5f5'],
      accent: '#f6dceb',
    },
    constellation: {
      at: { x: 80, y: 46 },
      stars: [
        { x: 50, y: 10, r: 2.8 },
        { x: 22, y: 30, r: 1.7 },
        { x: 78, y: 30, r: 1.7 },
        { x: 14, y: 62, r: 2 },
        { x: 86, y: 62, r: 2 },
        { x: 50, y: 50, r: 1.4 },
        { x: 36, y: 84, r: 1.6 },
        { x: 64, y: 84, r: 1.6 },
      ],
      lines: [
        [0, 1],
        [0, 2],
        [1, 3],
        [2, 4],
        [0, 5],
        [3, 6],
        [4, 7],
        [6, 7],
      ],
    },
    pages: [
      page('magic', 'the-mum-isms', 'The Mum-isms', 'quotes', 'speech-bubbles', {
        listField: 'sayings',
        photo: 'magic/the-mum-isms.jpg',
      }),
      page('magic', 'things-only-you-do', 'Things Only You Do', 'notes', 'sparkle-swirl', {
        listField: 'quirks',
        photo: 'magic/things-only-you-do.jpg',
      }),
      page(
        'magic',
        'your-superpowers',
        'A Very Serious List of Your Superpowers',
        'cards',
        'starburst',
        { listField: 'superpowers' },
      ),
      page(
        'magic',
        'certified-icon-behaviour',
        'Certified Icon Behaviour',
        'cards',
        'crescent-garden',
        { listField: 'moments', photo: 'magic/certified-icon.jpg' },
      ),
    ],
  },
  {
    number: '07',
    slug: 'wishes',
    route: '/wishes',
    title: 'Wishes Written in the Stars',
    portrait: 'mother/wishes.jpg',
    mood: {
      sky: ['#151135', '#342a63', '#52407f'],
      bloom: ['#bba5f5', '#e9b8d4'],
      accent: '#bba5f5',
    },
    constellation: {
      at: { x: 56, y: 66 },
      stars: [
        { x: 16, y: 20, r: 1.6 },
        { x: 38, y: 36, r: 2.4 },
        { x: 60, y: 22, r: 1.8 },
        { x: 80, y: 40, r: 2.1 },
        { x: 56, y: 58, r: 1.5 },
        { x: 30, y: 72, r: 1.9 },
        { x: 72, y: 80, r: 1.5 },
      ],
      lines: [
        [0, 1],
        [1, 2],
        [2, 3],
        [1, 4],
        [4, 5],
        [4, 6],
      ],
    },
    pages: [
      page(
        'wishes',
        'a-year-of-little-adventures',
        'A Year of Little Adventures',
        'notes',
        'shooting-stars',
        { listField: 'wishes', photo: 'wishes/a-year-of-little-adventures.jpg' },
      ),
      page(
        'wishes',
        'more-moments-for-yourself',
        'More Moments for Yourself',
        'notes',
        'crescent-garden',
        { listField: 'wishes', photo: 'wishes/more-moments-for-yourself.jpg' },
      ),
      page(
        'wishes',
        'all-the-happiness-you-deserve',
        'All the Happiness You Deserve',
        'prose',
        'cosmic-flower',
        { photo: 'wishes/all-the-happiness-you-deserve.jpg' },
      ),
      page(
        'wishes',
        'a-thousand-little-wishes',
        'A Thousand Little Wishes',
        'starfield',
        'shooting-stars',
        { listField: 'stars' },
      ),
    ],
  },
];

/** Chapter 06 — its own shape, because the awards are badges, not content pages. */
export type BadgeId =
  | 'sun'
  | 'crown'
  | 'book'
  | 'heart'
  | 'compass'
  | 'orbit'
  | 'galaxy';

export interface Award {
  slug: string;
  route: string;
  title: string;
  badge: BadgeId;
  /** Badge colour treatment — each award is distinct within one collection style. */
  metal: { core: string; rim: string; glow: string };
}

const award = (
  slug: string,
  title: string,
  badge: BadgeId,
  metal: Award['metal'],
): Award => ({ slug, route: `/hall-of-fame/${slug}`, title, badge, metal });

export const awards: Award[] = [
  award('lifetime-achievement', 'The Lifetime Achievement Award', 'sun', {
    core: '#e9d5a1',
    rim: '#c9a964',
    glow: '#f3e3b8',
  }),
  award('worlds-best-mum', 'The World’s Best Mum Award', 'crown', {
    core: '#e9b8d4',
    rim: '#e9d5a1',
    glow: '#f6dceb',
  }),
  award('professor-of-the-year', 'Professor of the Year', 'book', {
    core: '#bba5f5',
    rim: '#e9d5a1',
    glow: '#d6c6ff',
  }),
  award('unconditional-love', 'Excellence in Unconditional Love', 'heart', {
    core: '#e9b8d4',
    rim: '#c98fb4',
    glow: '#f6dceb',
  }),
  award('human-gps', 'The Human GPS Award', 'compass', {
    core: '#e9d5a1',
    rim: '#6544a0',
    glow: '#f3e3b8',
  }),
  award('multitasking', 'Excellence in Multitasking', 'orbit', {
    core: '#bba5f5',
    rim: '#6544a0',
    glow: '#d6c6ff',
  }),
  award('most-influential-human', 'The Most Influential Human Award', 'galaxy', {
    core: '#6544a0',
    rim: '#e9d5a1',
    glow: '#bba5f5',
  }),
];

export const hallOfFame = {
  number: '06',
  slug: 'hall-of-fame',
  route: '/hall-of-fame',
  title: 'The Hall of Fame',
  portrait: 'mother/hall-of-fame.jpg',
  mood: {
    sky: ['#14092a', '#331654', '#4b2170'] as [string, string, string],
    bloom: ['#e9d5a1', '#bba5f5'] as [string, string],
    accent: '#e9d5a1',
  },
  constellation: {
    at: { x: 27, y: 72 },
    stars: [
      { x: 50, y: 12, r: 3.4 },
      { x: 24, y: 34, r: 1.8 },
      { x: 76, y: 34, r: 1.8 },
      { x: 36, y: 60, r: 2 },
      { x: 64, y: 60, r: 2 },
      { x: 50, y: 84, r: 2.4 },
    ],
    lines: [
      [0, 1],
      [0, 2],
      [1, 3],
      [2, 4],
      [3, 5],
      [4, 5],
      [3, 4],
    ] as [number, number][],
  },
  awards,
};

/** Chapter 08 — the finale. */
export const letter = {
  number: '08',
  slug: 'letter',
  route: '/letter',
  title: 'A Letter Beyond the Stars',
  portrait: 'mother/letter.jpg',
  mood: {
    sky: ['#0d0a20', '#1d1340', '#2c1c57'] as [string, string, string],
    bloom: ['#bba5f5', '#f6dceb'] as [string, string],
    accent: '#f6dceb',
  },
  constellation: {
    at: { x: 85, y: 72 },
    stars: [
      { x: 50, y: 44, r: 4.6 },
      { x: 26, y: 22, r: 1.2 },
      { x: 74, y: 24, r: 1.2 },
      { x: 20, y: 68, r: 1.2 },
      { x: 78, y: 70, r: 1.2 },
    ],
    lines: [
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
    ] as [number, number][],
  },
};

/**
 * Every destination on the universe map, in chapter order.
 *
 * One shared shape so a single component can render any of them: chapters carry
 * `pages`, the Hall of Fame carries `awards`, and the letter carries neither.
 */
export interface UniverseNode {
  number: string;
  slug: string;
  route: string;
  title: string;
  portrait: string;
  mood: Chapter['mood'];
  constellation: Chapter['constellation'];
  pages?: ContentPage[];
  awards?: Award[];
}

export const universeOrder: UniverseNode[] = [...chapters, hallOfFame, letter].sort((a, b) =>
  a.number.localeCompare(b.number),
);
