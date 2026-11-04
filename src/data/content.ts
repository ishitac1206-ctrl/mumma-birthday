/**
 * The content pipeline.
 *
 * CONTENT.md is the single source of truth for every word on the site. It is
 * imported raw and parsed here, so editing the Markdown hot-reloads the page
 * with no build step and no code change.
 *
 * Format (documented for the reader at the top of CONTENT.md):
 *
 *   ## PAGE: /route
 *   @field
 *   value, possibly several paragraphs
 *
 *   @listField
 *   - a plain item
 *   - key: value
 *     other: value
 *
 * Anything still reading `[ADD ... HERE]` counts as unwritten and is dropped,
 * so a half-filled file renders as a finished-looking site.
 */
import raw from '../../CONTENT.md?raw';
import { DEFAULTS } from './defaults';

export type ListItem = Record<string, string>;

export interface PageContent {
  fields: Record<string, string>;
  lists: Record<string, ListItem[]>;
}

const EMPTY: PageContent = { fields: {}, lists: {} };

/** `[ADD A MEMORY HERE]` and friends mean "not written yet". */
const PLACEHOLDER = /^\[(?:ADD|WRITE|OPTIONAL)\b[^\]]*\]$/i;

const isPlaceholder = (value: string): boolean => PLACEHOLDER.test(value.trim());

/** A markdown heading of any level. */
const HEADING = /^#{1,6}\s/;

/** Lines that are scaffolding rather than content. */
const isNoise = (line: string): boolean => {
  const t = line.trim();
  return (
    t.startsWith('<!--') ||
    t.startsWith('-->') ||
    t === '---' ||
    HEADING.test(t) ||
    /^\|.*\|$/.test(t) || // markdown table rows, used in the file's own docs
    isPlaceholder(t)
  );
};

function parseList(lines: string[]): ListItem[] {
  const items: ListItem[] = [];

  for (const line of lines) {
    const bullet = /^-\s+(.*)$/.exec(line.trim());
    if (bullet) {
      const rest = bullet[1] ?? '';
      const kv = /^([A-Za-z][\w]*):\s*(.*)$/.exec(rest);
      if (kv && kv[1]) {
        items.push({ [kv[1]]: (kv[2] ?? '').trim() });
      } else {
        items.push({ text: rest.trim() });
      }
      continue;
    }

    // An indented `key: value` continues the item above it.
    const cont = /^\s+([A-Za-z][\w]*):\s*(.*)$/.exec(line);
    const current = items[items.length - 1];
    if (cont && cont[1] && current) {
      current[cont[1]] = (cont[2] ?? '').trim();
      continue;
    }

    // A bare indented line continues the previous value (wrapped prose).
    if (line.startsWith('  ') && current) {
      const keys = Object.keys(current);
      const last = keys[keys.length - 1];
      if (last && current[last]) current[last] = `${current[last]} ${line.trim()}`;
    }
  }

  // Drop items the user has not filled in; strip placeholder values from the rest.
  return items
    .map((item) => {
      const cleaned: ListItem = {};
      for (const [k, v] of Object.entries(item)) {
        if (v && !isPlaceholder(v)) cleaned[k] = v;
      }
      return cleaned;
    })
    .filter((item) => Object.keys(item).length > 0);
}

function parse(markdown: string): Record<string, PageContent> {
  const pages: Record<string, PageContent> = {};

  let page: PageContent | null = null;
  let field: string | null = null;
  let buffer: string[] = [];

  const flush = (): void => {
    if (!page || !field) {
      buffer = [];
      return;
    }

    const lines = buffer.filter((l) => !isNoise(l));
    const looksLikeList = lines.some((l) => /^-\s+/.test(l.trim()));

    if (looksLikeList) {
      const items = parseList(lines);
      if (items.length) page.lists[field] = items;
    } else {
      // Preserve paragraph breaks, collapse everything else.
      const value = lines
        .join('\n')
        .replace(/\n{3,}/g, '\n\n')
        .trim();
      if (value && !isPlaceholder(value)) page.fields[field] = value;
    }

    buffer = [];
  };

  for (const line of markdown.split(/\r?\n/)) {
    const pageHeading = /^##\s+PAGE:\s*(\S+)\s*$/.exec(line);
    if (pageHeading && pageHeading[1]) {
      flush();
      field = null;
      page = { fields: {}, lists: {} };
      pages[pageHeading[1]] = page;
      continue;
    }

    // Any other heading ends the current page entirely.
    if (HEADING.test(line)) {
      flush();
      field = null;
      page = null;
      continue;
    }

    const fieldHeading = /^@([A-Za-z][\w]*)\s*$/.exec(line);
    if (fieldHeading && fieldHeading[1]) {
      flush();
      field = fieldHeading[1];
      continue;
    }

    if (field) buffer.push(line);
  }

  flush();
  return pages;
}

const PAGES = parse(raw);

/** Everything written for one route. Never throws — an unknown route is simply empty. */
export function pageContent(route: string): PageContent {
  return PAGES[route] ?? EMPTY;
}

/** A single written field, or undefined if it has not been written yet. */
export function text(page: PageContent, field: string): string | undefined {
  return page.fields[field];
}

/** A written field split into paragraphs, for prose that may run long. */
export function paragraphs(page: PageContent, field: string): string[] {
  const value = page.fields[field];
  if (!value) return [];
  return value
    .split(/\n\s*\n/)
    .map((p) => p.replace(/\s*\n\s*/g, ' ').trim())
    .filter(Boolean);
}

/** A written list, or an empty array. */
export function list(page: PageContent, field: string): ListItem[] {
  return page.lists[field] ?? [];
}

/** True when nothing at all has been written for this page yet. */
export function isUnwritten(page: PageContent): boolean {
  return Object.keys(page.fields).length === 0 && Object.keys(page.lists).length === 0;
}

/* ------------------------------------------------------------------
   Resolution against the editorial defaults.
   CONTENT.md always wins; defaults fill the gaps so nothing is blank
   that does not need to be written by hand.
   ------------------------------------------------------------------ */

/** A field for a route, preferring CONTENT.md and falling back to the defaults. */
export function copy(route: string, field: string): string | undefined {
  return pageContent(route).fields[field] ?? DEFAULTS[route]?.[field];
}
