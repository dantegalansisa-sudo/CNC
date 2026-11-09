import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import Logo, { Monogram } from './Logo';
import { FIRM, TEL, waLink } from '../content';
import { useLang } from '../i18n';
import { Link, useLocation } from 'react-router-dom';
import { lockScroll } from '../utils/scroll';
import { useGo } from '../utils/useGo';
import { servicePath } from '../servicePages';
import { ease } from '../utils/easings';
import { Arrow, Facebook, Instagram, Mail, Phone, WhatsAppLogo } from './Icons';
import { INTRO } from './Loader';

export function LangToggle({ className = '' }: { className?: string }) {
  const { lang, setLang, t } = useLang();
  return (
    <button
      className={`lang ${className}`}
      onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
      aria-label={t.langLabel}
      title={t.langLabel}
    >
      <span className={lang === 'en' ? 'is-on' : ''}>EN</span>
      <span className={lang === 'es' ? 'is-on' : ''}>ES</span>
    </button>
  );
}

export default function Nav() {
  const { t } = useLang();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('inicio');
  const { pathname } = useLocation();
  const onHome = pathname === '/';
  const goTo = useGo();

  useMotionValueEvent(scrollY, 'change', (v) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(v > 40);
    setHidden(v > prev && v > 600 && !open);
  });

  useEffect(() => {
    if (!onHome) {
      setActive(pathname.startsWith('/services') ? 'servicios' : '');
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    t.nav.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [t, onHome, pathname]);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => lockScroll(open), [open]);

  const go = (id: string) => {
    setOpen(false);
    setTimeout(() => goTo(id), open ? 450 : 0);
  };

  return (
    <>
      <motion.header
        className={`nav ${scrolled || !onHome ? 'nav--scrolled' : ''} ${open ? 'nav--open' : ''}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: hidden ? -110 : 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: hidden || scrolled ? 0 : INTRO, ease: ease('premium') }}
      >
        <div className="nav__inner">
          <a href="/" onClick={(e) => { e.preventDefault(); go('inicio'); }} aria-label="CNC Law Firm">
            <Logo />
          </a>

          <nav className="nav__links" aria-label="Main">
            {t.nav.map((n) => {
              const link = (
                <a
                  key={n.id}
                  href={`/#${n.id}`}
                  className={active === n.id ? 'is-active' : ''}
                  onClick={(e) => { e.preventDefault(); go(n.id); }}
                >
                  {active === n.id && (
                    <motion.span layoutId="nav-pill" className="nav__pill" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
                  )}
                  <span>{n.label}</span>
                </a>
              );
              if (n.id !== 'servicios') return link;
              return (
                <div className="nav__drop" key={n.id}>
                  {link}
                  <div className="nav__panel">
                    {t.practice.items.map((it) => (
                      <Link key={it.key} to={servicePath(it.key)} className={pathname === servicePath(it.key) ? 'is-current' : ''}>
                        <small>{it.n}</small>
                        <span>{it.title} {it.accent}</span>
                        <Arrow size={13} />
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </nav>

          <div className="nav__right">
            <LangToggle className="nav__lang" />
            <a className="nav__wa" href={waLink(t.wa.msg)} target="_blank" rel="noopener noreferrer" aria-label={t.wa.cta} title={t.wa.cta}>
              <WhatsAppLogo size={30} />
            </a>
            <a className="nav__phone" href={TEL} aria-label={`${t.call} ${FIRM.phoneLabel}`}>
              <Phone size={16} />
              <span>{FIRM.phoneLabel}</span>
            </a>
            <a className="nav__cta" href="/#contacto" onClick={(e) => { e.preventDefault(); go('contacto'); }}>
              <span>{t.navCta}</span>
              <Arrow size={15} />
            </a>
            <button className="nav__burger" onClick={() => setOpen((o) => !o)} aria-label="Menu" aria-expanded={open}>
              <span />
              <span />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="menu"
            initial={{ clipPath: 'circle(0% at calc(100% - 44px) 40px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 44px) 40px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 44px) 40px)' }}
            transition={{ duration: 0.75, ease: ease('premium') }}
          >
            <div className="menu__glow" />
            <Monogram size={300} light className="menu__mark" />
            <ul className="menu__list">
              {t.nav.map((n, i) => (
                <li key={n.id}>
                  <span className="mask">
                    <motion.a
                      href={`/#${n.id}`}
                      onClick={(e) => { e.preventDefault(); go(n.id); }}
                      initial={{ y: '110%' }}
                      animate={{ y: 0 }}
                      exit={{ y: '110%' }}
                      transition={{ duration: 0.7, delay: 0.2 + i * 0.06, ease: ease('premium') }}
                    >
                      <small>0{i + 1}</small>
                      {n.label}
                    </motion.a>
                  </span>
                </li>
              ))}
            </ul>
            <motion.div
              className="menu__services"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              {t.practice.items.map((it) => (
                <Link key={it.key} to={servicePath(it.key)}>
                  {it.title} {it.accent}
                </Link>
              ))}
            </motion.div>
            <motion.div
              className="menu__foot"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.55, duration: 0.6 }}
            >
              <a className="btn btn--gold btn--block" href="/#contacto" onClick={(e) => { e.preventDefault(); go('contacto'); }}>
                {t.menuCta} <Arrow size={18} />
              </a>
              <a className="btn btn--wa btn--block" href={waLink(t.wa.msg)} target="_blank" rel="noopener noreferrer">
                <WhatsAppLogo size={24} /> {t.wa.cta}
              </a>
              <a className="btn btn--line btn--block" href={TEL}>
                <Phone size={17} /> {FIRM.phoneLabel}
              </a>
              <div className="menu__meta">
                <LangToggle className="lang--light" />
                <span className="menu__social">
                  <a href={`mailto:${FIRM.email}`} aria-label="Email"><Mail size={17} /></a>
                  <a href={FIRM.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram size={18} /></a>
                  <a href={FIRM.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"><Facebook size={16} /></a>
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
