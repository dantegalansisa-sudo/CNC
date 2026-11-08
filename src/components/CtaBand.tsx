import { motion } from 'framer-motion';
import { MaskLine } from './RevealText';
import MagneticButton from './MagneticButton';
import { Monogram } from './Logo';
import { Arrow, Check, Phone, WhatsAppLogo } from './Icons';
import { FIRM, TEL, waLink } from '../content';
import { useLang } from '../i18n';
import { requestArea } from './Services';
import { ease } from '../utils/easings';

/** Conversion band: the three ways to reach the firm, side by side. */
export default function CtaBand({ variant = 'light' }: { variant?: 'light' | 'dark' }) {
  const { t } = useLang();
  const b = t.band;
  return (
    <section className={`band band--${variant}`}>
      <div className="container">
        <motion.div
          className="band__card"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: ease('out') }}
        >
          <Monogram size={220} light={variant === 'dark'} className="band__mark" />
          <div className="band__text">
            <p className="eyebrow"><span className="eyebrow__line" /> {b.eyebrow}</p>
            <h2 className="band__title">
              <MaskLine>{b.title[0]}</MaskLine>
              <MaskLine delay={0.1}><em>{b.title[1]}</em></MaskLine>
            </h2>
            <p className="band__lead">{b.text}</p>
            <ul className="band__perks">
              {b.perks.map((p) => (
                <li key={p}>
                  <Check size={13} /> {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="band__actions">
            <MagneticButton onClick={() => requestArea('')} className="btn btn--ink btn--lg" cursor="Book">
              {b.book} <span className="btn__ic"><Arrow size={16} /></span>
            </MagneticButton>
            <a className="btn btn--wa btn--lg" href={waLink(t.wa.msg)} target="_blank" rel="noopener noreferrer">
              <WhatsAppLogo size={28} /> {t.wa.cta}
            </a>
            <a className="band__call" href={TEL}>
              <span><Phone size={16} /></span>
              {b.call} · {FIRM.phoneLabel}
            </a>
            <small>{b.note}</small>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
