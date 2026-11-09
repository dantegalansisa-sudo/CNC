import { useEffect, useLayoutEffect, useRef, useState, type RefObject } from 'react';
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion';
import { Monogram } from '../Logo';

/**
 * Snaps the CNC seal from one step to the next as the visitor scrolls (and back).
 * Measures the centre of every `[data-node]` inside the container along one axis.
 */
export function useStepTraveler<T extends HTMLElement>(
  axis: 'x' | 'y',
  offset: [string, string] = ['start 0.75', 'end 0.55']
) {
  const ref = useRef<T>(null);
  const [stops, setStops] = useState<number[]>([]);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref as RefObject<HTMLElement>, offset: offset as ['start 0.75', 'end 0.55'] });
  const pos = useSpring(0, { stiffness: 120, damping: 20, mass: 0.9 });

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Layout offsets (not getBoundingClientRect) so entrance transforms don't skew the stops.
    const offsetIn = (n: HTMLElement) => {
      let x = 0;
      let y = 0;
      let cur: HTMLElement | null = n;
      while (cur && cur !== el) {
        x += cur.offsetLeft;
        y += cur.offsetTop;
        cur = cur.offsetParent as HTMLElement | null;
      }
      return axis === 'y' ? y + n.offsetHeight / 2 : x + n.offsetWidth / 2;
    };
    const measure = () => {
      const nodes = Array.from(el.querySelectorAll<HTMLElement>('[data-node]'));
      setStops(nodes.map(offsetIn));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener('load', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('load', measure);
    };
  }, [axis]);

  const pick = (p: number) => {
    if (!stops.length) return;
    const i = Math.max(0, Math.min(stops.length - 1, Math.round(p * (stops.length - 1))));
    setActive(i);
    pos.set(stops[i]);
  };

  useMotionValueEvent(scrollYProgress, 'change', pick);
  useEffect(() => {
    if (!stops.length) return;
    pos.jump(stops[active] ?? stops[0]);
    pick(scrollYProgress.get());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stops]);

  const start = stops[0] ?? 0;
  const end = stops[stops.length - 1] ?? 1;
  const fill = useTransform(pos, (v) => (end > start ? (v - start) / (end - start) : 0));

  return { ref, pos, active, fill, start, end };
}

/** The travelling seal itself. */
export function TravelerSeal({ axis, pos }: { axis: 'x' | 'y'; pos: MotionValue<number> }) {
  return (
    <motion.span className={`seal-traveler seal-traveler--${axis}`} style={axis === 'y' ? { y: pos } : { x: pos }} aria-hidden>
      <span className="seal-traveler__ring" />
      <span className="seal-traveler__core">
        <Monogram size={30} light />
      </span>
    </motion.span>
  );
}
