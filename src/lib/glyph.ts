/**
 * The four-point celestial star, as an SVG path in any coordinate space.
 *
 * One glyph, used at every size — in the illustrations, along the dividers, on
 * the corner of each card, and scattered across the sky. Reusing a single
 * curve is what makes eight different atmospheres still read as one hand.
 */
export const spark = (x: number, y: number, s: number): string =>
  `M${x},${y - s} Q${x + s * 0.16},${y - s * 0.16} ${x + s},${y} Q${x + s * 0.16},${y + s * 0.16} ${x},${y + s} Q${x - s * 0.16},${y + s * 0.16} ${x - s},${y} Q${x - s * 0.16},${y - s * 0.16} ${x},${y - s} Z`;
