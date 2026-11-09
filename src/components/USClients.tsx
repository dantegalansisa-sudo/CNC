import { motion } from 'framer-motion';
import { FadeUp, MaskLine } from './RevealText';
import MagneticButton from './MagneticButton';
import { Arrow, Building, Doc, Globe, Scale, Spark, WhatsAppLogo } from './Icons';
import { useLang } from '../i18n';
import { LiveCard } from './fx/Live';
import { waLink } from '../content';
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
              <a className="btn btn--wa usc__wa" href={waLink(t.wa.msg)} target="_blank" rel="noopener noreferrer">
                <WhatsAppLogo size={24} /> {t.wa.short}
              </a>
            </FadeUp>
          </div>

          <ul className="usc__grid">
            {u.items.map((it, i) => {
              const Icon = ICONS[i];
              return (
                <LiveCard as="li" key={it.t} index={i}>
                  <span className="usc__ic"><Icon size={20} /></span>
                  <h3>{it.t}</h3>
                  <p>{it.d}</p>
                </LiveCard>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
