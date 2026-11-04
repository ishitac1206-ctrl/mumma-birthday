/**
 * Editorial defaults.
 *
 * Titles, poetic subtitles, award citations and the scripted lines from the
 * brief live here rather than in CONTENT.md, so that file holds only what the
 * author actually has to write. Anything here can still be overridden: give the
 * same field in CONTENT.md and it wins.
 */

export interface Copy {
  title?: string;
  subtitle?: string;
  [key: string]: string | undefined;
}

export const DEFAULTS: Record<string, Copy> = {
  '/': {
    eyebrow: 'A LITTLE UNIVERSE, MADE FOR YOU',
    revealOne: 'Some people make the world brighter just by being in it.',
    revealTwo: 'And tonight, the universe celebrates you.',
    title: 'A Universe of You',
    subtitle: 'Happy Birthday, Mum ♡',
    button: 'ENTER YOUR UNIVERSE ✨',
  },
  '/universe': {
    title: 'A Universe of You',
    intro: 'Every star holds a story. Every constellation holds a little piece of you.',
    hint: 'Touch a constellation to open it.',
  },

  /* ---- chapter landings ---- */
  '/guiding-star': {
    title: 'The Guiding Star',
    subtitle: 'Some lights never fade. They guide us home, no matter how far we go.',
  },
  '/heart': {
    title: 'A Heart Like Yours',
    subtitle: 'There is a certain kind of magic in the way you make people feel loved.',
  },
  '/professor': {
    title: 'The Professor',
    subtitle: 'Some people teach subjects. Others leave lessons that last a lifetime.',
  },
  '/magic': {
    title: 'Your Kind of Magic',
    subtitle: 'A little bit of magic, a little bit of madness, and a whole lot of you.',
  },
  '/hall-of-fame': {
    title: 'The Hall of Fame',
    subtitle: 'An entirely unbiased collection of awards for an entirely extraordinary woman.',
  },
  '/wishes': {
    title: 'Wishes Written in the Stars',
    subtitle: 'A little universe of wishes for all the beautiful things still waiting for you.',
  },
  '/letter': {
    title: 'A Letter Beyond the Stars',
    subtitle: 'Some things deserve more than a few words.',
    closingOne:
      'If I could wish upon a thousand stars, I’d wish for every single one of them to shine on you.',
    closingTwo: 'Happy Birthday, Mum. ❤️',
    button: 'Back to your universe',
  },

  /* ---- chapter 01 ---- */
  '/guiding-star/things-you-taught-me': {
    subtitle: 'The little lessons and the enormous ones.',
  },
  '/guiding-star/my-safest-place': {
    subtitle: 'Wherever you are has always been the safest room in the world.',
  },
  '/guiding-star/the-woman-i-hope-to-become': {
    subtitle: 'Everything I am still learning from you.',
  },
  '/guiding-star/things-i-never-say-enough': {
    subtitle: 'All the thank-yous that never quite made it out loud.',
  },

  /* ---- chapter 02 ---- */
  '/heart/the-kindness-you-carry': { subtitle: 'Kindness, given quietly and constantly.' },
  '/heart/the-little-things': { subtitle: 'The small gestures that say everything.' },
  '/heart/a-strength-of-your-own': { subtitle: 'Softness and steel, somehow at the same time.' },
  '/heart/the-way-you-love': { subtitle: 'All the different languages your love speaks.' },

  /* ---- chapter 03 ---- */
  '/professor/the-woman-behind-the-classroom': {
    subtitle: 'The long, luminous road to the front of the room.',
  },
  '/professor/beyond-the-blackboard': {
    subtitle: 'Every student who left your room carrying a little more light.',
  },
  '/professor/lessons-that-last-forever': {
    subtitle: 'The things you taught me that were never on any syllabus.',
  },

  /* ---- chapter 04 ---- */
  '/magic/the-mum-isms': { subtitle: 'Collected sayings of a legend.' },
  '/magic/things-only-you-do': { subtitle: 'Quirks, habits and small unexplainable rituals.' },
  '/magic/your-superpowers': { subtitle: 'Scientifically verified. Peer reviewed. Unmatched.' },
  '/magic/certified-icon-behaviour': { subtitle: 'A dossier of her most iconic moments.' },

  /* ---- chapter 06 ---- */
  '/wishes/a-year-of-little-adventures': {
    subtitle: 'New places, new roads, new photographs to take.',
  },
  '/wishes/more-moments-for-yourself': { subtitle: 'Hours that belong to nobody but you.' },
  '/wishes/all-the-happiness-you-deserve': {
    subtitle: 'Health, peace, and a heart that feels light.',
  },
  '/wishes/a-thousand-little-wishes': { subtitle: 'Touch a star. Find a wish.' },

  /* ---- chapter 05, the awards: citations are the official wording from the brief ---- */
  '/hall-of-fame/lifetime-achievement': {
    category: 'LIFETIME HONOUR',
    citation:
      'For a lifetime of giving, loving, teaching and making everyone’s lives better.',
    badgeText: 'EST. FOREVER',
  },
  '/hall-of-fame/worlds-best-mum': {
    category: 'UNCONTESTED CATEGORY',
    citation:
      'No nominations required. No competition. The winner was decided a long time ago.',
    badgeText: 'UNDISPUTED',
  },
  '/hall-of-fame/professor-of-the-year': {
    category: 'EDUCATION AND BEYOND',
    citation:
      'Awarded every single year. For being an educator both inside and outside the classroom.',
    badgeText: 'EVERY YEAR',
  },
  '/hall-of-fame/unconditional-love': {
    category: 'MATTERS OF THE HEART',
    citation: 'For loving everyone through every version of themselves.',
    badgeText: 'WITH HONOURS',
  },
  '/hall-of-fame/human-gps': {
    category: 'NAVIGATION AND INTUITION',
    citation:
      'For somehow always knowing what everyone needs, where everything is and what everyone should be doing.',
    badgeText: 'ALWAYS KNOWS',
  },
  '/hall-of-fame/multitasking': {
    category: 'IMPOSSIBLE LOGISTICS',
    citation: 'For accomplishing approximately 47 things simultaneously.',
    badgeText: 'ALL AT ONCE',
  },
  '/hall-of-fame/most-influential-human': {
    category: 'LASTING INFLUENCE',
    citation:
      'For leaving little pieces of wisdom, kindness and inspiration wherever you go.',
    badgeText: 'IMMEASURABLE',
  },
};
