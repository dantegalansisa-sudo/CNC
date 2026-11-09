import { useEffect, useRef, useState, type ReactNode } from 'react';
import { animate, motion, useInView, useMotionValue, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion';
import { ease } from '../../utils/easings';

/** True on desktop-class devices (precise pointer, wide screen). */
export function useDesktop() {
  const q = '(min-width: 900px) and (pointer: fine)';
  const [ok, setOk] = useState(() => typeof window !== 'undefined' && window.matchMedia(q).matches);
  useEffect(() => {
    const m = window.matchMedia(q);
    const on = () => setOk(m.matches);
    m.addEventListener('change', on);
    return () => m.removeEventListener('change', on);
  }, []);
  return ok;
}

/** Scroll progress of a container while it crosses the viewport — feeds card floating. */
export function useFloatProgress() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  return { ref, progress: scrollYProgress };
}

type Tag = 'div' | 'li' | 'article';

/**
 * A card that is presented one by one (rises from depth with a focus pull), floats at its own depth
 * while scrolling, tilts toward the cursor and carries a soft spotlight.
 */
export function LiveCard({
  as = 'div',
  className = '',
  children,
  index = 0,
  depth = 0,
  progress,
  tilt = 5,
}: {
  as?: Tag;
  className?: string;
  children: ReactNode;
  index?: number;
  depth?: number;
  progress?: MotionValue<number>;
  tilt?: number;
}) {
  const M = motion[as] as typeof motion.div;
  const ref = useRef<HTMLDivElement>(null);
  const desktop = useDesktop();

  const fallback = useMotionValue(0.5);
  const travel = desktop ? depth * 70 : 0;
  const float = useTransform(progress ?? fallback, [0, 1], [travel, -travel]);

  const spring = { stiffness: 160, damping: 18, mass: 0.6 };
  const rx = useSpring(0, spring);
  const ry = useSpring(0, spring);
  const lift = useSpring(1, spring);

  // Entrance: one 0→1 value drives rise, tilt-up from depth, focus pull and fade.
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const enter = useMotionValue(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(enter, 1, { duration: 1.1, delay: index * 0.14, ease: ease('premium') });
    return () => c.stop();
  }, [inView, index, enter]);

  const y = useTransform([float, enter], ([f, e]: number[]) => f + (1 - e) * 90);
  const rotateX = useTransform([rx, enter], ([r, e]: number[]) => r + (1 - e) * 16);
  const scale = useTransform([lift, enter], ([l, e]: number[]) => l * (0.93 + 0.07 * e));
  const opacity = useTransform(enter, [0, 0.6], [0, 1]);
  const filter = useTransform(enter, (e) => (e >= 1 ? 'none' : `blur(${(1 - e) * 10}px)`));

  const onMove = (e: React.MouseEvent) => {
    if (!desktop || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ref.current.style.setProperty('--mx', `${px * 100}%`);
    ref.current.style.setProperty('--my', `${py * 100}%`);
    rx.set((0.5 - py) * tilt);
    ry.set((px - 0.5) * tilt);
  };

  const onEnter = () => desktop && lift.set(1.025);
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
    lift.set(1);
  };

  return (
    <M
      ref={ref}
      className={`live ${className}`}
      style={{ y, rotateX, rotateY: ry, scale, opacity, filter, transformPerspective: 1100 }}
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <span className="live__shine" aria-hidden />
      {children}
    </M>
  );
}

/** A thin rule that draws itself when it enters the viewport. */
export function DrawLine({ className = '', delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.span
      className={`draw-line ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 1.1, delay, ease: ease('premium') }}
      aria-hidden
    />
  );
}

/** Scroll-linked fill (0 → 1) for timelines. */
export function useTimelineFill(offset: ['start 0.85', 'end 0.55'] | [string, string] = ['start 0.85', 'end 0.55']) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: offset as ['start 0.85', 'end 0.55'] });
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 22 });
  return { ref, fill };
}
