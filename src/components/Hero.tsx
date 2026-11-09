import { useRef } from 'react';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { MaskLine } from './RevealText';
import MagneticButton from './MagneticButton';
import { Monogram } from './Logo';
import { Arrow, Facebook, Instagram, Mail, Phone, Spark, WhatsAppLogo } from './Icons';
import { FIRM, TEL, waLink } from '../content';
import { useLang } from '../i18n';
import { scrollToId } from '../utils/scroll';
import { ease } from '../utils/easings';
import { INTRO } from './Loader';

function RingBadge({ size = 112, text }: { size?: number; text: string }) {
  return (
    <span className="ring-badge" style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" className="ring-badge__text" aria-hidden>
        <defs>
          <path id={`ring-${size}`} d="M50 50 m-38 0 a38 38 0 1 1 76 0 a38 38 0 1 1 -76 0" />
        </defs>
        <text>
          <textPath href={`#ring-${size}`}>{text}</textPath>
        </text>
      </svg>
      <Monogram size={size * 0.42} light className="ring-badge__mark" />
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* DESKTOP HERO                                                        */
/* ------------------------------------------------------------------ */
function HeroDesktop() {
  const { t, lang } = useLang();
  const h = t.hero;
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const photoY = useTransform(scrollY, [0, 800], [0, -60]);
  const textY = useTransform(scrollY, [0, 800], [0, 90]);
  const textO = useTransform(scrollY, [0, 500], [1, 0.2]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [4, -4]), { stiffness: 120, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-5, 5]), { stiffness: 120, damping: 18 });

  const onMove = (e: React.MouseEvent) => {
    const r = cardRef.current!.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <div className="hero-d">
      <motion.div className="hero-d__text" style={{ y: textY, opacity: textO }}>
        <motion.p className="eyebrow" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: INTRO, duration: 0.8 }}>
          <span className="eyebrow__line" /> {h.eyebrow[0]} <i>·</i> {h.eyebrow[1]} <i>·</i> {h.eyebrow[2]}
        </motion.p>

        {/* key forces the reveal to replay when the language changes */}
        <h1 className="hero-d__title" key={lang}>
          <MaskLine animateOnMount delay={INTRO + 0.05}>{h.title1}</MaskLine>
          <MaskLine animateOnMount delay={INTRO + 0.17} className="serif-line">
            <em>{h.title2a}</em> {h.title2b}<span className="dot">.</span>
          </MaskLine>
        </h1>

        <motion.div className="hero-d__row" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: INTRO + 0.45, duration: 0.9, ease: ease('out') }}>
          <div className="socials">
            <a href={FIRM.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram size={16} /></a>
            <a href={FIRM.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"><Facebook size={15} /></a>
            <a href={`mailto:${FIRM.email}`} aria-label="Email"><Mail size={15} /></a>
          </div>
          <span className="hero-d__rule" />
          <p className="hero-d__lead">
            {h.lead} <em>{h.leadEm}</em>
          </p>
        </motion.div>

        <motion.div className="hero-d__ctas" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: INTRO + 0.6, duration: 0.9, ease: ease('out') }}>
          <MagneticButton onClick={() => scrollToId('contacto')} className="btn btn--ink" cursor={h.cta.split(' ')[0]}>
            {h.cta} <span className="btn__ic"><Arrow size={16} /></span>
          </MagneticButton>
          <MagneticButton href={waLink(t.wa.msg)} external className="btn btn--wa" cursor="Chat">
            <WhatsAppLogo size={24} /> {t.wa.cta}
          </MagneticButton>
          <a className="hero-d__call" href={TEL}>
            <Phone size={14} /> {t.wa.or} {FIRM.phoneLabel}
          </a>
        </motion.div>

        <motion.div className="hero-d__stats" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: INTRO + 0.8, duration: 1 }}>
          <div>
            <strong>{h.stat1.n}</strong>
            <span>{h.stat1.l[0]}<br />{h.stat1.l[1]}</span>
          </div>
          <div>
            <strong className="hero-d__langs">{h.stat2.n}</strong>
            <span>{h.stat2.l[0]}<br />{h.stat2.l[1]}</span>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="hero-d__visual"
        initial={{ clipPath: 'inset(12% 8% 12% 8% round 6px)', opacity: 0 }}
        animate={{ clipPath: 'inset(0% 0% 0% 0% round 0px)', opacity: 1 }}
        transition={{ duration: 1.3, delay: INTRO - 0.15, ease: ease('premium') }}
      >
        <motion.div
          ref={cardRef}
          className="hcard"
          onMouseMove={onMove}
          onMouseLeave={() => { mx.set(0); my.set(0); }}
          style={{ rotateX: rx, rotateY: ry }}
        >
          <div className="hcard__bg">
            <svg className="hcard__arcs" viewBox="0 0 600 700" preserveAspectRatio="none" aria-hidden>
              <motion.circle cx="430" cy="380" r="250" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.4, delay: INTRO + 0.3 }} />
              <motion.circle cx="430" cy="380" r="330" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.8, delay: INTRO + 0.5 }} />
            </svg>
          </div>
          <img className="hcard__watermark" src="/images/cnc-mark.png" alt="" aria-hidden />

          <motion.div className="hcard__photo" style={{ y: photoY }}>
            <motion.img
              src="/images/cynthia.webp"
              alt="Attorney Cynthia Morales Nieves, founder of CNC Law Firm"
              initial={{ y: 120, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.4, delay: INTRO + 0.1, ease: ease('out') }}
              draggable={false}
            />
          </motion.div>

          <motion.div
            className="hcard__plate"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: INTRO + 0.7, duration: 1, ease: ease('out') }}
          >
            <span className="hcard__plate-role">{h.sigRole}</span>
            <strong>Lcda. Cynthia Morales Nieves</strong>
            <span className="hcard__plate-loc">{h.eyebrow.join(' · ')}</span>
          </motion.div>
        </motion.div>

        <motion.a
          href="#contacto"
          onClick={(e) => { e.preventDefault(); scrollToId('contacto'); }}
          className="notch notch--tr"
          data-cursor="Contact"
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: INTRO + 0.5, duration: 1, ease: ease('bounce') }}
          aria-label={h.cta}
        >
          <RingBadge text={h.ring} />
        </motion.a>

      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* MOBILE HERO — magazine cover                                        */
/* ------------------------------------------------------------------ */
function HeroMobile() {
  const { t } = useLang();
  const h = t.hero;
  const { scrollY } = useScroll();
  const photoScale = useTransform(scrollY, [0, 600], [1, 1.08]);
  const wordsY = useTransform(scrollY, [0, 600], [0, 80]);

  return (
    <div className="hero-m">
      <motion.div
        className="mcard"
        initial={{ clipPath: 'inset(8% 6% 30% 6% round 6px)' }}
        animate={{ clipPath: 'inset(0% 0% 0% 0% round 6px)' }}
        transition={{ duration: 1.3, delay: INTRO - 0.2, ease: ease('premium') }}
      >
        <div className="mcard__bg" />
        <svg className="mcard__arcs" viewBox="0 0 400 700" preserveAspectRatio="none" aria-hidden>
          <motion.circle cx="200" cy="420" r="190" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.2, delay: INTRO + 0.2 }} />
          <motion.circle cx="200" cy="420" r="260" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.6, delay: INTRO + 0.4 }} />
        </svg>

        <motion.div className="mcard__words" style={{ y: wordsY }} aria-hidden>
          <MaskLine animateOnMount delay={INTRO + 0.1} className="mcard__w1">{h.m1}</MaskLine>
          <MaskLine animateOnMount delay={INTRO + 0.22} className="mcard__w2">{h.m2}</MaskLine>
        </motion.div>

        <motion.img
          className="mcard__photo"
          src="/images/cynthia-sm.webp"
          alt="Attorney Cynthia Morales Nieves, founder of CNC Law Firm"
          style={{ scale: photoScale }}
          initial={{ y: 140, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.3, delay: INTRO + 0.05, ease: ease('out') }}
          draggable={false}
        />

        <motion.div
          className="mcard__panel"
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: INTRO + 0.45, ease: ease('out') }}
        >
          <p className="mcard__eyebrow">{h.mEyebrow}</p>
          <h1 className="mcard__title">
            {h.mTitle[0]} <em>{h.mTitle[1]}</em>
          </h1>
          <div className="mcard__ctas">
            <button className="btn btn--ink btn--sm" onClick={() => scrollToId('contacto')}>
              {t.navCta}
            </button>
            <a className="mcard__go mcard__go--wa" href={waLink(t.wa.msg)} target="_blank" rel="noopener noreferrer" aria-label={t.wa.cta}>
              <WhatsAppLogo size={30} />
            </a>
          </div>
        </motion.div>
      </motion.div>

      <motion.a
        href="#contacto"
        onClick={(e) => { e.preventDefault(); scrollToId('contacto'); }}
        className="notch notch--m"
        initial={{ scale: 0, rotate: -90 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: INTRO + 0.6, duration: 1, ease: ease('bounce') }}
        aria-label={h.cta}
      >
        <RingBadge size={84} text={h.ring} />
      </motion.a>

      <motion.p className="hero-m__lead" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: INTRO + 0.8, duration: 0.9 }}>
        {h.mLead} <em>{h.mLeadEm}</em>
      </motion.p>
    </div>
  );
}

export default function Hero() {
  const { t } = useLang();
  return (
    <section id="inicio" className="hero">
      <HeroDesktop />
      <HeroMobile />
      <div className="hero__ticker" aria-hidden>
        <div className="ticker">
          {[0, 1].map((k) => (
            <div className="ticker__track" key={k}>
              {t.ticker.map((a) => (
                <span key={a}>
                  {a} <Spark size={14} />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
