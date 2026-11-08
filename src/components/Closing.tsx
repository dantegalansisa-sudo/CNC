import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { FIRM, TEL, waLink, type PracticeKey } from '../content';
import { useLang } from '../i18n';
import { FadeUp, MaskLine } from './RevealText';
import Logo from './Logo';
import { Arrow, Clock, Facebook, Instagram, Mail, Phone, Pin, Plus, Spark, WhatsAppLogo } from './Icons';
import { useParallax } from '../hooks/useParallax';
import { lockScroll, scrollToId } from '../utils/scroll';
import { ease } from '../utils/easings';

export function Faq() {
  const { t } = useLang();
  const f = t.faq;
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="faq">
      <div className="container faq__grid">
        <div className="faq__side">
          <p className="eyebrow"><span className="eyebrow__line" /> {f.eyebrow}</p>
          <h2 className="h2">
            <MaskLine>{f.title[0]}</MaskLine>
            <MaskLine delay={0.1}><em>{f.title[1]}</em></MaskLine>
          </h2>
          <FadeUp>
            <a className="faq__card" href={waLink(t.wa.msg)} target="_blank" rel="noopener noreferrer">
              <span className="faq__card-ic faq__card-ic--wa"><WhatsAppLogo size={48} /></span>
              <span>
                <b>{f.cardT}</b>
                <small>{f.cardD}</small>
              </span>
              <Arrow size={18} />
            </a>
          </FadeUp>
        </div>
        <div className="faq__list">
          {f.items.map((it, i) => (
            <motion.div
              key={it.q}
              className={`faq__item ${open === i ? 'is-open' : ''}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: i * 0.06, duration: 0.6 }}
            >
              <button onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>
                <span>{it.q}</span>
                <motion.span className="faq__plus" animate={{ rotate: open === i ? 45 : 0 }} transition={{ duration: 0.4, ease: ease('premium') }}>
                  <Plus size={18} />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: ease('premium') }}
                    className="faq__a"
                  >
                    <p>{it.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  const { t } = useLang();
  const c = t.contact;
  const { ref, y } = useParallax(40);
  const [form, setForm] = useState({ name: '', email: '', phone: '', area: '' as PracticeKey | 'other' | '', msg: '', ok: false });
  const [sent, setSent] = useState(false);

  // Practice-area buttons elsewhere on the page pre-select the area here.
  useEffect(() => {
    const onArea = (e: Event) => setForm((f) => ({ ...f, area: (e as CustomEvent<PracticeKey | ''>).detail }));
    window.addEventListener('cnc:area', onArea);
    return () => window.removeEventListener('cnc:area', onArea);
  }, []);

  const set = (k: 'name' | 'email' | 'phone' | 'area' | 'msg') =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const areaLabel = (k: string) => {
    const it = t.practice.items.find((x) => x.key === k);
    return it ? `${it.title} ${it.accent}` : c.other;
  };

  // No backend yet: compose the request in the visitor's email app.
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `${c.eyebrow}: ${areaLabel(form.area)} — ${form.name}`;
    const body = `${form.msg}\n\n${c.name}: ${form.name}\n${c.email}: ${form.email}\n${c.phone}: ${form.phone}\n${c.area}: ${areaLabel(form.area)}`;
    window.location.href = `mailto:${FIRM.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <section id="contacto" className="contact">
      <div className="container">
        <div className="contact__card" ref={ref}>
          <div className="contact__glow" />
          <div className="contact__content">
            <p className="eyebrow eyebrow--light"><Spark size={12} /> {c.eyebrow}</p>
            <h2 className="contact__title">
              <MaskLine>{c.title[0]}</MaskLine>
              <MaskLine delay={0.1}><em>{c.title[1]}</em></MaskLine>
            </h2>
            <FadeUp>
              <p className="contact__sub">{c.sub}</p>
            </FadeUp>
            <FadeUp>
              <form className="cform" onSubmit={submit}>
                <div className="cform__row">
                  <label>
                    <span>{c.name}</span>
                    <input required autoComplete="name" value={form.name} onChange={set('name')} />
                  </label>
                  <label>
                    <span>{c.phone}</span>
                    <input type="tel" autoComplete="tel" value={form.phone} onChange={set('phone')} />
                  </label>
                </div>
                <div className="cform__row">
                  <label>
                    <span>{c.email}</span>
                    <input required type="email" autoComplete="email" value={form.email} onChange={set('email')} />
                  </label>
                  <label>
                    <span>{c.area}</span>
                    <select value={form.area} onChange={set('area')}>
                      <option value="">{c.areaPh}</option>
                      {t.practice.items.map((it) => (
                        <option key={it.key} value={it.key}>
                          {it.title} {it.accent}
                        </option>
                      ))}
                      <option value="other">{c.other}</option>
                    </select>
                  </label>
                </div>
                <label>
                  <span>{c.message}</span>
                  <textarea required rows={3} value={form.msg} onChange={set('msg')} placeholder={c.messagePh} />
                </label>
                <label className="cform__consent">
                  <input type="checkbox" required checked={form.ok} onChange={(e) => setForm((f) => ({ ...f, ok: e.target.checked }))} />
                  <span>{c.consent}</span>
                </label>
                <button className="btn btn--gold btn--lg" type="submit" data-cursor="Send">
                  {c.send} <span className="btn__ic"><Arrow size={16} /></span>
                </button>
                <AnimatePresence>
                  {sent && (
                    <motion.p className="cform__note" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} role="status">
                      {c.sentNote}
                    </motion.p>
                  )}
                </AnimatePresence>
              </form>
            </FadeUp>
            <a className="contact__wa" href={waLink(t.wa.msg)} target="_blank" rel="noopener noreferrer">
              <WhatsAppLogo size={44} />
              <span>
                <b>{t.wa.contactT}</b>
                <small>{t.wa.contactD}</small>
              </span>
              <Arrow size={18} />
            </a>
            <ul className="contact__info">
              <li><a href={TEL}><Phone size={17} /> {FIRM.phoneLabel}</a></li>
              <li><a href={`mailto:${FIRM.email}`}><Mail size={18} /> {FIRM.email}</a></li>
              <li><Pin size={18} /> {FIRM.city}</li>
              <li><Clock size={18} /> {c.byAppt}</li>
            </ul>
          </div>
          <div className="contact__visual">
            <motion.img src="/images/cynthia-red.webp" alt="" style={{ y }} loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  );
}

type LegalKey = 'disclaimer' | 'privacy' | 'accessibility';

function LegalModal({ which, onClose }: { which: LegalKey; onClose: () => void }) {
  const { t } = useLang();
  const doc = t.legal[which];
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    lockScroll(true);
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      lockScroll(false);
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <motion.div className="lmodal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div
        className="lmodal__box"
        role="dialog"
        aria-modal="true"
        aria-labelledby="lmodal-title"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.45, ease: ease('premium') }}
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent
      >
        <div className="lmodal__head">
          <h2 id="lmodal-title">{doc.t}</h2>
          <button ref={closeRef} onClick={onClose} aria-label={t.legal.close} className="lmodal__close">
            <Plus size={20} />
          </button>
        </div>
        {doc.p.map((p) => (
          <p key={p}>{p}</p>
        ))}
        <small>{FIRM.legalName}</small>
      </motion.div>
    </motion.div>
  );
}

export function Footer() {
  const { t } = useLang();
  const f = t.footer;
  const [modal, setModal] = useState<LegalKey | null>(null);
  return (
    <footer className="footer footer--dark">
      <div className="container">
        <div className="footer__cols">
          <div className="footer__brand">
            <Logo light />
            <p>{f.tagline}</p>
            <div className="footer__social">
              <a href={FIRM.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram size={18} /></a>
              <a href={FIRM.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"><Facebook size={17} /></a>
              <a href={waLink(t.wa.msg)} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><WhatsAppLogo size={22} /></a>
              <a href={`mailto:${FIRM.email}`} aria-label="Email"><Mail size={18} /></a>
              <a href={TEL} aria-label={t.call}><Phone size={17} /></a>
            </div>
          </div>
          <nav aria-label={f.practice}>
            <h3>{f.practice}</h3>
            {t.practice.items.map((it) => (
              <a key={it.key} href={`#srv-${it.key}`} onClick={(e) => { e.preventDefault(); scrollToId(`srv-${it.key}`); }}>
                {it.title} {it.accent}
              </a>
            ))}
          </nav>
          <div>
            <h3>{f.contact}</h3>
            <a href={TEL}>{FIRM.phoneLabel}</a>
            <a href={waLink(t.wa.msg)} target="_blank" rel="noopener noreferrer">WhatsApp · {FIRM.phoneLabel}</a>
            <a href={`mailto:${FIRM.email}`}>{FIRM.email}</a>
            <span>{FIRM.city}</span>
          </div>
          <div>
            <h3>{f.legal}</h3>
            <button onClick={() => setModal('disclaimer')}>{f.disclaimer}</button>
            <button onClick={() => setModal('privacy')}>{f.privacy}</button>
            <button onClick={() => setModal('accessibility')}>{f.accessibility}</button>
          </div>
        </div>

        <motion.div
          className="footer__word"
          initial={{ y: '40%', opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: ease('premium') }}
          aria-hidden
        >
          CNC <em>Law Firm</em>
        </motion.div>

        <p className="footer__disclaimer">{f.advertising}</p>
        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} {FIRM.legalName}. {f.rights}</span>
          <span>{FIRM.city}</span>
        </div>
      </div>

      <AnimatePresence>{modal && <LegalModal which={modal} onClose={() => setModal(null)} />}</AnimatePresence>
    </footer>
  );
}

export function CallFloat() {
  const { t } = useLang();
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, 'change', (v) => setShow(v > 700));
  return (
    <>
      <AnimatePresence>
        {show && (
          <motion.a
            className="wa-float wa-float--green"
            href={waLink(t.wa.msg)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.wa.cta}
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.5, ease: ease('bounce') }}
          >
            <WhatsAppLogo size={60} />
            <span className="wa-float__tip">{t.wa.cta}</span>
          </motion.a>
        )}
      </AnimatePresence>

      {/* Mobile: persistent action bar — the standard pattern on U.S. law-firm sites */}
      <AnimatePresence>
        {show && (
          <motion.nav
            className="actionbar"
            aria-label="Quick contact"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ duration: 0.5, ease: ease('premium') }}
          >
            <a href={TEL}>
              <Phone size={18} /> {t.bar.call}
            </a>
            <a href={waLink(t.wa.msg)} target="_blank" rel="noopener noreferrer" className="actionbar__wa">
              <WhatsAppLogo size={22} /> {t.bar.wa}
            </a>
            <a href="#contacto" onClick={(e) => { e.preventDefault(); scrollToId('contacto'); }} className="actionbar__book">
              {t.bar.book} <Arrow size={15} />
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
