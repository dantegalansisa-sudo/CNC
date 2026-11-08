import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FadeUp, MaskLine } from './RevealText';
import { Plus } from './Icons';
import { useLang } from '../i18n';
import { ease } from '../utils/easings';

/** Short legal explainers, based on the firm's own social posts. */
export default function Insights() {
  const { t } = useLang();
  const s = t.insights;
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="insights">
      <div className="container">
        <div className="insights__head">
          <div>
            <p className="eyebrow"><span className="eyebrow__line" /> {s.eyebrow}</p>
            <h2 className="h2">
              <MaskLine>{s.title[0]}</MaskLine>
              <MaskLine delay={0.1}><em>{s.title[1]}</em></MaskLine>
            </h2>
          </div>
          <FadeUp>
            <p className="insights__intro">{s.intro}</p>
          </FadeUp>
        </div>
        <motion.div
          className="insights__grid"
          initial="h"
          whileInView="v"
          viewport={{ once: true, amount: 0.15 }}
          variants={{ v: { transition: { staggerChildren: 0.09 } } }}
        >
          {s.items.map((it, i) => (
            <motion.article
              key={it.t}
              className={`icard ${open === i ? 'is-open' : ''} icard--${i % 4}`}
              variants={{ h: { opacity: 0, y: 50 }, v: { opacity: 1, y: 0, transition: { duration: 0.7, ease: ease('premium') } } }}
            >
              <span className="icard__tag">{it.tag}</span>
              <span className="icard__n">0{i + 1}</span>
              <h3>{it.t}</h3>
              <p>{it.d}</p>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.p
                    className="icard__more"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.45, ease: ease('premium') }}
                  >
                    {it.more}
                  </motion.p>
                )}
              </AnimatePresence>
              <button className="icard__btn" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>
                {open === i ? s.less : s.more}
                <motion.span animate={{ rotate: open === i ? 45 : 0 }} transition={{ duration: 0.35 }}>
                  <Plus size={16} />
                </motion.span>
              </button>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
