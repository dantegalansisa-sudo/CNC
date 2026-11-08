import { motion } from 'framer-motion';
import { FadeUp, MaskLine } from './RevealText';
import MagneticButton from './MagneticButton';
import { Arrow, Building, Doc, Globe, Scale, Spark } from './Icons';
import { useLang } from '../i18n';
import { ease } from '../utils/easings';
import { requestArea } from './Services';

const ICONS = [Scale, Doc, Building, Globe];

/** Bridge graphic: U.S. mainland ⇄ Puerto Rico with a travelling dot. */
function Bridge({ labels }: { labels: string[] }) {
  return (
    <div className="bridge" aria-hidden>
      <span className="bridge__node">
        <svg width="26" height="18" viewBox="0 0 26 18">
          <rect width="26" height="18" rx="3" fill="#fff" />
          {[0, 2, 4, 6].map((k) => (
            <rect key={k} y={k * 2.77} width="26" height="1.38" fill="#B22234" />
          ))}
          <rect width="11" height="9.7" fill="#3C3B6E" />
        </svg>
        {labels[0]}
      </span>
      <span className="bridge__line">
        <motion.i
          animate={{ left: ['0%', '100%'] }}
          transition={{ duration: 2.4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        />
      </span>
      <span className="bridge__node">
        <svg width="26" height="18" viewBox="0 0 21 14">
          <rect width="21" height="14" fill="#fff" rx="2" />
          {[0, 5.6, 11.2].map((yy) => (
            <rect key={yy} y={yy} width="21" height="2.8" fill="#ED0000" />
          ))}
          <path d="M0 0L10 7L0 14Z" fill="#0050F0" />
          <circle cx="3.6" cy="7" r="1.5" fill="#fff" />
        </svg>
        {labels[1]}
      </span>
    </div>
  );
}

export default function USClients() {
  const { t } = useLang();
  const u = t.us;
  return (
    <section id="us-clients" className="usc">
      <div className="container">
        <div className="usc__card">
          <div className="usc__glow" />
          <div className="usc__intro">
            <p className="eyebrow eyebrow--light"><Spark size={12} /> {u.eyebrow}</p>
            <h2 className="usc__title">
              <MaskLine>{u.title[0]}</MaskLine>
              <MaskLine delay={0.1}><em>{u.title[1]}</em></MaskLine>
            </h2>
            <FadeUp>
              <p className="usc__lead">{u.lead}</p>
            </FadeUp>
            <FadeUp delay={0.1}>
              <Bridge labels={u.flags} />
            </FadeUp>
            <FadeUp delay={0.15}>
              <div className="usc__note">
                <b>{u.note.t}</b>
                <p>{u.note.d}</p>
              </div>
              <MagneticButton onClick={() => requestArea('')} className="btn btn--gold" cursor="Contact">
                {u.cta} <span className="btn__ic"><Arrow size={16} /></span>
              </MagneticButton>
            </FadeUp>
          </div>

          <motion.ul
            className="usc__grid"
            initial="h"
            whileInView="v"
            viewport={{ once: true, amount: 0.2 }}
            variants={{ v: { transition: { staggerChildren: 0.1 } } }}
          >
            {u.items.map((it, i) => {
              const Icon = ICONS[i];
              return (
                <motion.li
                  key={it.t}
                  variants={{
                    h: { opacity: 0, y: 40 },
                    v: { opacity: 1, y: 0, transition: { duration: 0.7, ease: ease('premium') } },
                  }}
                >
                  <span className="usc__ic"><Icon size={20} /></span>
                  <h3>{it.t}</h3>
                  <p>{it.d}</p>
                </motion.li>
              );
            })}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
