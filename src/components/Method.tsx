import { motion } from 'framer-motion';
import { FadeUp, MaskLine } from './RevealText';
import { Globe, Phone, Video } from './Icons';
import { ease } from '../utils/easings';
import { useLang } from '../i18n';
import { LiveCard, useFloatProgress } from './fx/Live';
import { TravelerSeal, useStepTraveler } from './fx/Traveler';

/** How to schedule a consultation — timeline that fills on scroll. */
export default function Process() {
  const { t } = useLang();
  const p = t.process;
  const trav = useStepTraveler<HTMLDivElement>('y', ['start 0.7', 'end 0.55']);

  return (
    <section id="proceso" className="method">
      <div className="container method__grid">
        <div className="method__side">
          <p className="eyebrow"><span className="eyebrow__line" /> {p.eyebrow}</p>
          <h2 className="h2">
            <MaskLine>{p.title[0]}</MaskLine>
            <MaskLine delay={0.1}><em>{p.title[1]}</em></MaskLine>
          </h2>
          <FadeUp>
            <p className="body">{p.body}</p>
          </FadeUp>
        </div>

        <div className="method__steps" ref={trav.ref}>
          <div className="method__track" style={{ top: trav.start, height: Math.max(0, trav.end - trav.start), bottom: 'auto' }}>
            <motion.span style={{ scaleY: trav.fill }} />
          </div>
          <TravelerSeal axis="y" pos={trav.pos} />
          {p.steps.map((s, i) => (
            <motion.div
              key={s.n}
              className={`step ${trav.active === i ? 'is-active' : ''} ${trav.active > i ? 'is-done' : ''}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.8, delay: i * 0.05, ease: ease('out') }}
            >
              <span className="step__dot" data-node />
              <span className="step__n">{s.n}</span>
              <div>
                <h3>
                  {s.title} <em>{s.em}</em>
                </h3>
                <p>{s.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const VALUE_ICONS = [Globe, Video, Phone];

export function Values() {
  const { t } = useLang();
  const v = t.values;
  const float = useFloatProgress();
  return (
    <section className="audience">
      <div className="container">
        <div className="audience__head">
          <p className="eyebrow"><span className="eyebrow__line" /> {v.eyebrow}</p>
          <h2 className="h2">
            <MaskLine>{v.title[0]}</MaskLine>
            <MaskLine delay={0.1}><em>{v.title[1]}</em></MaskLine>
          </h2>
        </div>
        <ul className="audience__list audience__list--3" ref={float.ref as unknown as React.Ref<HTMLUListElement>}>
          {v.items.map((a, i) => {
            const Icon = VALUE_ICONS[i];
            return (
              <LiveCard as="li" key={a.t} index={i} depth={[0.6, 1.2, 0.8][i % 3]} progress={float.progress}>
                <span className="audience__n">0{i + 1}</span>
                <h3>{a.t}</h3>
                <p>{a.d}</p>
                <span className="audience__arrow"><Icon size={18} /></span>
              </LiveCard>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
