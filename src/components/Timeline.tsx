import { motion } from 'framer-motion';
import type { ListItem } from '../data/content';
import { CELESTIAL } from '../animations/variants';

interface Props {
  items: ListItem[];
  accent: string;
}

/** A vertical constellation: milestones strung along a line of light. */
export function Timeline({ items, accent }: Props) {
  return (
    <ol className="relative mx-auto max-w-2xl pl-10 sm:pl-14">
      {/* the thread, and a dotted shadow of it just behind */}
      <span
        className="absolute top-2 bottom-2 left-[11px] w-px sm:left-[15px]"
        style={{
          backgroundImage: `linear-gradient(to bottom, transparent, ${accent}66 12%, ${accent}66 88%, transparent)`,
        }}
        aria-hidden="true"
      />
      <span
        className="absolute top-2 bottom-2 left-[14px] w-px opacity-50 sm:left-[18px]"
        style={{
          backgroundImage: `repeating-linear-gradient(to bottom, ${accent}55 0 1px, transparent 1px 7px)`,
        }}
        aria-hidden="true"
      />

      {items.map((item, i) => (
        <motion.li
          key={i}
          initial={{ opacity: 0, x: -14 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, delay: i * 0.1, ease: CELESTIAL }}
          className="relative pb-12 last:pb-0"
        >
          <span className="absolute top-1 -left-10 h-6 w-6 sm:-left-14 sm:h-7 sm:w-7" aria-hidden="true">
            <svg viewBox="0 0 20 20" className="h-full w-full" style={{ filter: `drop-shadow(0 0 7px ${accent}aa)` }}>
              {/* a ring of light leaving the milestone, one at a time down the page */}
              <circle
                cx="10"
                cy="10"
                r="7"
                fill="none"
                stroke={accent}
                strokeWidth="0.7"
                style={
                  {
                    '--ring-o': 0.45,
                    transformBox: 'view-box',
                    transformOrigin: 'center',
                    animation: `pulseRing 6s ease-out ${i * 0.8}s infinite`,
                  } as React.CSSProperties
                }
              />
              <circle cx="10" cy="10" r="4.5" fill={accent} opacity="0.16" />
              <path
                d="M10,2 Q11.1,8.9 18,10 Q11.1,11.1 10,18 Q8.9,11.1 2,10 Q8.9,8.9 10,2 Z"
                fill={accent}
              />
            </svg>
          </span>

          {item.title && (
            <h3 className="font-display text-[1.3rem] leading-snug font-light text-pearl sm:text-[1.45rem]">
              {item.title}
            </h3>
          )}
          {item.text && (
            <p className="font-body mt-2 text-[0.94rem] leading-[1.9] font-light text-blush/75">
              {item.text}
            </p>
          )}
        </motion.li>
      ))}
    </ol>
  );
}
