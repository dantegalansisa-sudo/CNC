import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { FadeUp, MaskLine } from './RevealText';
import AnimatedCounter from './AnimatedCounter';
import { useParallax } from '../hooks/useParallax';
import { ease } from '../utils/easings';
import { Check, Pin, Spark } from './Icons';
import { useLang } from '../i18n';

function Word({ children, progress, range, em }: { children: string; progress: MotionValue<number>; range: [number, number]; em: boolean }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <span className={`mword ${em ? 'mword--em' : ''}`}>
      <motion.span style={{ opacity }}>{children}</motion.span>{' '}
    </span>
  );
}

export function Manifesto() {
  const { t } = useLang();
  const m = t.manifesto;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] });
  const words = m.text.split(' ');
  const clean = (w: string) => w.replace(/[.,:;—]/g, '').toLowerCase();
  return (
    <section className="manifesto" ref={ref}>
      <div className="container">
        <p className="eyebrow eyebrow--center">
          <Spark size={12} /> {m.eyebrow}
        </p>
        <p className="manifesto__text">
          {words.map((w, i) => (
            <Word key={`${w}-${i}`} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} em={m.highlight.includes(clean(w))}>
              {w}
            </Word>
          ))}
        </p>
        <p className="manifesto__cite">{m.cite}</p>
      </div>
    </section>
  );
}

export default function About() {
  const { t } = useLang();
  const a = t.about;
  const { ref, y } = useParallax(40);
  return (
    <section id="sobre-mi" className="about">
      <motion.div
        className="about__seam"
        initial={{ scale: 0.4, rotate: -120, opacity: 0 }}
        whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
        viewport={{ once: true, amount: 1 }}
        transition={{ duration: 1.2, ease: ease('premium') }}
        aria-hidden
      >
        <svg viewBox="0 0 100 100" className="about__seam-ring">
          <defs>
            <path id="about-seam" d="M50 50 m-38 0 a38 38 0 1 1 76 0 a38 38 0 1 1 -76 0" />
          </defs>
          <text>
            <textPath href="#about-seam">CYNTHIA MORALES NIEVES · {t.hero.sigRole} · </textPath>
          </text>
        </svg>
        <img src="/images/cnc-mark-light.png" alt="" draggable={false} />
      </motion.div>
      <div className="container about__grid">
        <motion.div className="about__visual" ref={ref} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
          <motion.div
            className="about__arch about__arch--photo"
            variants={{
              hidden: { clipPath: 'inset(100% 0% 0% 0% round 6px 6px 6px 6px)' },
              show: {
                clipPath: 'inset(0% 0% 0% 0% round 6px 6px 6px 6px)',
                transition: { duration: 1.3, ease: ease('premium') },
              },
            }}
          >
            <motion.img src="/images/cynthia-table.webp" alt="Attorney Cynthia Morales Nieves" style={{ y }} loading="lazy" />
          </motion.div>
          <motion.div
            className="about__quote"
            initial={{ opacity: 0, y: 40, rotate: 4 }}
            whileInView={{ opacity: 1, y: 0, rotate: -3 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4, ease: ease('out') }}
          >
            <span className="about__quote-mark">“</span>
            {a.quote[0]} <em>{a.quote[1]}</em> {a.quote[2]}
          </motion.div>
          <motion.span
            className="about__flag"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.6, ease: ease('bounce') }}
          >
            <svg width="21" height="14" viewBox="0 0 21 14" aria-hidden style={{ borderRadius: 3 }}>
              <rect width="21" height="14" fill="#fff" />
              {[0, 5.6, 11.2].map((yy) => (
                <rect key={yy} y={yy} width="21" height="2.8" fill="#ED0000" />
              ))}
              <path d="M0 0L10 7L0 14Z" fill="#0050F0" />
              <circle cx="3.6" cy="7" r="1.5" fill="#fff" />
            </svg>
            {a.badge}
          </motion.span>
        </motion.div>

        <div className="about__content">
          <p className="eyebrow about__eyebrow"><span className="eyebrow__line" /> {a.eyebrow}</p>
          <h2 className="h2 about__name">
            <MaskLine><small className="about__title">Lcda.</small> {a.h1}</MaskLine>
            <MaskLine delay={0.1}>{a.h2a} <em>{a.h2b}</em></MaskLine>
          </h2>
          <FadeUp>
            <p className="about__role">{a.role}</p>
            <p className="lead">{a.lead}</p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="body">{a.body}</p>
          </FadeUp>

          <FadeUp delay={0.15}>
            <ul className="creds">
              {a.credentials.map((c) => (
                <li key={c}>
                  <span><Check size={12} /></span> {c}
                </li>
              ))}
            </ul>
          </FadeUp>

          <div className="pillars">
            {a.pillars.map((p, i) => (
              <motion.div
                key={p.t}
                className="pillar"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: i * 0.12, duration: 0.7, ease: ease('out') }}
              >
                <span className="pillar__n">0{i + 1}</span>
                <h3>{p.t}</h3>
                <p>{p.d}</p>
              </motion.div>
            ))}
          </div>

          <FadeUp className="about__sign">
            <span className="about__sign-line" />
            <span className="script">Cynthia Morales Nieves</span>
            <small className="about__sign-loc"><Pin size={14} /> San Juan · Guaynabo</small>
          </FadeUp>
        </div>
      </div>

      <div className="container stats">
        {a.stats.map((s, i) => (
          <motion.div
            key={s.l}
            className="stat"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: i * 0.1, duration: 0.7 }}
          >
            <strong>
              {s.n > 1000 ? s.n : <AnimatedCounter target={s.n} suffix={s.s} />}
            </strong>
            <span>{s.l}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
