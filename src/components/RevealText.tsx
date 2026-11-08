import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';
import { ease } from '../utils/easings';

interface RevealTextProps {
  children: string;
  className?: string;
  delay?: number;
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

const rise = (delay: number, duration = 0.85): Variants => ({
  hidden: { y: '115%', rotate: 3 },
  show: { y: 0, rotate: 0, transition: { duration, delay, ease: ease('premium') } },
});

/*
 * The in-view trigger lives on the (visible) mask wrapper, not on the
 * translated child — a child pushed outside an overflow:hidden mask never
 * intersects, so observing it directly would never fire.
 */

/** Word-by-word mask reveal for plain-text headings. */
export default function RevealText({ children, className = '', delay = 0, tag = 'h2' }: RevealTextProps) {
  const Tag = motion[tag];
  const words = children.split(' ');
  return (
    <Tag
      className={`reveal-text ${className}`}
      aria-label={children}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
    >
      {words.map((word, i) => (
        <span key={i} className="mask" aria-hidden>
          <motion.span style={{ display: 'inline-block' }} variants={rise(delay + i * 0.07)}>
            {word}
          </motion.span>
          {i < words.length - 1 && ' '}
        </span>
      ))}
    </Tag>
  );
}

/** Masked line reveal that accepts rich children (mixed fonts, italics…). */
export function MaskLine({
  children,
  delay = 0,
  className = '',
  animateOnMount = false,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  animateOnMount?: boolean;
}) {
  const trigger = animateOnMount
    ? { animate: 'show' }
    : { whileInView: 'show', viewport: { once: true, amount: 0.4 } };
  return (
    <motion.span className={`mask mask--line ${className}`} initial="hidden" {...trigger}>
      <motion.span style={{ display: 'inline-block' }} variants={rise(delay, 1)}>
        {children}
      </motion.span>
    </motion.span>
  );
}

/** Generic fade-up on enter. */
export function FadeUp({
  children,
  delay = 0,
  className = '',
  y = 28,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, delay, ease: ease('out') }}
    >
      {children}
    </motion.div>
  );
}
