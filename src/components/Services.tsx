import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import type { Content, PracticeKey } from '../content';
import { useLang } from '../i18n';
import { FadeUp, MaskLine } from './RevealText';
import MagneticButton from './MagneticButton';
import ServiceVisual from './visuals/ServiceVisuals';
import { Arrow, Check, Spark } from './Icons';
import { scrollToId } from '../utils/scroll';
import { ease } from '../utils/easings';

type Item = Content['practice']['items'][number];

/** Pre-selects the practice area in the contact form, then scrolls to it. */
export const requestArea = (key: PracticeKey | '') => {
  window.dispatchEvent(new CustomEvent('cnc:area', { detail: key }));
  scrollToId('contacto');
};

function ServiceCard({
  s,
  i,
  total,
  progress,
  range,
  targetScale,
}: {
  s: Item;
  i: number;
  total: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}) {
  const { t } = useLang();
  const last = i === total - 1;
  const scale = useTransform(progress, range, [1, last ? 1 : targetScale]);
  const dim = useTransform(progress, range, [0, last ? 0 : 0.35]);

  return (
    <div className="stack__item" id={`srv-${s.key}`}>
      <motion.article className={`scard scard--${s.theme}`} style={{ scale, top: `calc(${i} * var(--stack-step))` }}>
        <motion.div className="scard__dim" style={{ opacity: dim }} />
        <div className="scard__content">
          <div className="scard__top">
            <span className="scard__n">{s.n}</span>
            <span className="scard__en">
              <Spark size={10} /> {s.en}
            </span>
          </div>
          <h3 className="scard__title">
            {s.title} <em>{s.accent}</em>
          </h3>
          <p className="scard__lead">{s.lead}</p>
          <ul className="scard__list" aria-label={t.practice.includes}>
            {s.includes.map((x) => (
              <li key={x}>
                <span className="scard__check"><Check size={11} /></span>
                {x}
              </li>
            ))}
          </ul>
          <div className="scard__ideal">
            <small>{t.practice.ideal}</small>
            {s.idealFor.map((x) => (
              <span key={x}>{x}</span>
            ))}
          </div>
          <div className="scard__ctas">
            <MagneticButton onClick={() => requestArea(s.key)} className="btn btn--card" cursor="Contact">
              {t.practice.cta} <span className="btn__ic"><Arrow size={15} /></span>
            </MagneticButton>
          </div>
        </div>
        <div className="scard__visual">
          <ServiceVisual k={s.key} />
          <span className="scard__ghost">{s.n}</span>
        </div>
      </motion.article>
    </div>
  );
}

export default function Services() {
  const { t } = useLang();
  const p = t.practice;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const n = p.items.length;

  return (
    <section id="servicios" className="services">
      <div className="container services__head">
        <div>
          <p className="eyebrow"><span className="eyebrow__line" /> {p.eyebrow}</p>
          <h2 className="h2 h2--xl">
            <MaskLine>{p.title[0]}</MaskLine>
            <MaskLine delay={0.1}><em>{p.title[1]}</em></MaskLine>
          </h2>
        </div>
        <FadeUp className="services__intro">
          <p>{p.intro}</p>
          <motion.div
            className="services__index"
            initial="h"
            whileInView="v"
            viewport={{ once: true }}
            variants={{ v: { transition: { staggerChildren: 0.07 } } }}
          >
            {p.items.map((s) => (
              <motion.button
                key={s.key}
                onClick={() => scrollToId(`srv-${s.key}`)}
                variants={{ h: { opacity: 0, y: 14 }, v: { opacity: 1, y: 0, transition: { ease: ease('out'), duration: 0.6 } } }}
              >
                <span>{s.n}</span> {s.title} {s.accent}
              </motion.button>
            ))}
          </motion.div>
        </FadeUp>
      </div>

      <div className="stack container" ref={ref}>
        {p.items.map((s, i) => (
          <ServiceCard
            key={s.key}
            s={s}
            i={i}
            total={n}
            progress={scrollYProgress}
            range={[i / n, 1]}
            targetScale={1 - (n - i) * 0.035}
          />
        ))}
      </div>
    </section>
  );
}
