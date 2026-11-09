import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, Navigate, useParams } from 'react-router-dom';
import { FIRM, TEL, waLink } from '../content';
import { useLang } from '../i18n';
import { keyFromSlug, SERVICE_PAGES, servicePath, UI } from '../servicePages';
import { FadeUp, MaskLine } from './RevealText';
import MagneticButton from './MagneticButton';
import ServiceVisual from './visuals/ServiceVisuals';
import { Arrow, Check, Clock, Globe, Mail, Phone, Pin, Plus, Spark, Video, WhatsAppLogo } from './Icons';
import { scrollToId } from '../utils/scroll';
import { ease } from '../utils/easings';
import { INTRO } from './Loader';
import { DrawLine, LiveCard, useFloatProgress, useTimelineFill } from './fx/Live';

const FACT_ICONS = [Clock, Video, Globe];

/** Sets <title> and meta description for the page, restoring the defaults on leave. */
function useSeo(title: string, description: string, fallback: string) {
  useEffect(() => {
    const meta = document.querySelector('meta[name="description"]');
    const prevDesc = meta?.getAttribute('content') ?? '';
    document.title = title;
    meta?.setAttribute('content', description);
    return () => {
      document.title = fallback;
      meta?.setAttribute('content', prevDesc);
    };
  }, [title, description, fallback]);
}

function Accordion({ items }: { items: readonly { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="faq__list">
      {items.map((it, i) => (
        <motion.div
          key={it.q}
          className={`faq__item ${open === i ? 'is-open' : ''}`}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ delay: i * 0.1, duration: 0.8, ease: ease('premium') }}
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
  );
}

type Form = {
  name: string;
  email: string;
  phone: string;
  service: string;
  mode: string;
  contact: string;
  urgency: string;
  msg: string;
  ok: boolean;
};

function RequestForm({ title, offer }: { title: string; offer: readonly { t: string }[] }) {
  const { lang } = useLang();
  const f = UI[lang].form;
  const formRef = useRef<HTMLFormElement>(null);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState<Form>({
    name: '', email: '', phone: '', service: '', mode: f.modes[0], contact: f.contacts[0], urgency: f.urgencies[0], msg: '', ok: false,
  });

  const set = (k: keyof Omit<Form, 'ok'>) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((s) => ({ ...s, [k]: e.target.value }));

  const summary = () =>
    [
      `${f.subject}: ${title}`,
      `${f.service}: ${form.service || f.other}`,
      `${f.name}: ${form.name}`,
      `${f.email}: ${form.email}`,
      `${f.phone}: ${form.phone}`,
      `${f.mode}: ${form.mode}`,
      `${f.contact}: ${form.contact}`,
      `${f.urgency}: ${form.urgency}`,
      '',
      form.msg,
    ].join('\n');

  // No backend yet: compose the request in the visitor's email app.
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `${f.subject}: ${title} — ${form.name}`;
    window.location.href = `mailto:${FIRM.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(summary())}`;
    setSent(true);
  };

  const sendWa = () => {
    if (!formRef.current?.reportValidity()) return;
    window.open(waLink(summary()), '_blank', 'noopener,noreferrer');
  };

  const Chips = ({ k, options }: { k: 'mode' | 'contact' | 'urgency'; options: readonly string[] }) => (
    <div className="rform__chips" role="radiogroup">
      {options.map((o) => (
        <label key={o} className={form[k] === o ? 'is-on' : ''}>
          <input type="radio" name={k} value={o} checked={form[k] === o} onChange={set(k)} />
          {o}
        </label>
      ))}
    </div>
  );

  return (
    <form className="cform rform" ref={formRef} onSubmit={submit}>
      <fieldset>
        <legend><span>01</span> {f.steps[0]}</legend>
        <div className="cform__row">
          <label>
            <span>{f.name}</span>
            <input required autoComplete="name" value={form.name} onChange={set('name')} />
          </label>
          <label>
            <span>{f.phone}</span>
            <input required type="tel" autoComplete="tel" value={form.phone} onChange={set('phone')} />
          </label>
        </div>
        <label>
          <span>{f.email}</span>
          <input required type="email" autoComplete="email" value={form.email} onChange={set('email')} />
        </label>
        <div className="rform__group">
          <span>{f.contact}</span>
          <Chips k="contact" options={f.contacts} />
        </div>
      </fieldset>

      <fieldset>
        <legend><span>02</span> {f.steps[1]}</legend>
        <label>
          <span>{f.service}</span>
          <select value={form.service} onChange={set('service')}>
            <option value="">{f.servicePh}</option>
            {offer.map((o) => (
              <option key={o.t} value={o.t}>{o.t}</option>
            ))}
            <option value={f.other}>{f.other}</option>
          </select>
        </label>
        <div className="rform__group">
          <span>{f.mode}</span>
          <Chips k="mode" options={f.modes} />
        </div>
        <div className="rform__group">
          <span>{f.urgency}</span>
          <Chips k="urgency" options={f.urgencies} />
        </div>
        <label>
          <span>{f.msg}</span>
          <textarea required rows={4} value={form.msg} onChange={set('msg')} placeholder={f.msgPh} />
        </label>
      </fieldset>

      <label className="cform__consent">
        <input type="checkbox" required checked={form.ok} onChange={(e) => setForm((s) => ({ ...s, ok: e.target.checked }))} />
        <span>{f.consent}</span>
      </label>

      <div className="rform__actions">
        <button className="btn btn--ink" type="submit">
          {f.send} <span className="btn__ic"><Mail size={16} /></span>
        </button>
        <button className="btn btn--wa" type="button" onClick={sendWa}>
          <WhatsAppLogo size={24} /> {f.sendWa}
        </button>
      </div>
      <AnimatePresence>
        {sent && (
          <motion.p className="rform__note" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} role="status">
            {f.sent}
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}

export default function ServicePage() {
  const { slug } = useParams();
  const key = keyFromSlug(slug);
  const { t, lang } = useLang();
  const ui = UI[lang];
  const item = t.practice.items.find((x) => x.key === key);
  const page = key ? SERVICE_PAGES[lang][key] : null;

  useSeo(page?.seo.title ?? t.meta.title, page?.seo.description ?? '', t.meta.title);
  const offerFloat = useFloatProgress();
  const othersFloat = useFloatProgress();
  const steps = useTimelineFill();

  if (!key || !item || !page) return <Navigate to="/" replace />;

  const title = `${item.title} ${item.accent}`;
  // On a direct visit the loader is still covering the page.
  const d = performance.now() < INTRO * 1000 + 500 ? INTRO : 0.1;
  const others = t.practice.items.filter((x) => x.key !== key);

  return (
    <div className="sp" key={key}>
      {/* HERO */}
      <section className="sp-hero">
        <div className="container">
          <motion.nav className="crumbs" aria-label="Breadcrumb" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: d, duration: 0.8 }}>
            <Link to="/">{ui.home}</Link>
            <span>/</span>
            <Link to="/#servicios">{ui.areas}</Link>
            <span>/</span>
            <b aria-current="page">{title}</b>
          </motion.nav>

          <div className="sp-hero__grid">
            <div>
              <motion.p className="eyebrow eyebrow--light" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: d, duration: 0.8 }}>
                <span className="eyebrow__line" /> {item.n} <i>·</i> {item.en}
              </motion.p>
              <h1 className="sp-hero__title" key={`${lang}-${key}`}>
                <MaskLine animateOnMount delay={d + 0.05}>{item.title}</MaskLine>
                <MaskLine animateOnMount delay={d + 0.15}><em>{item.accent}</em></MaskLine>
              </h1>
              <motion.p className="sp-hero__lead" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: d + 0.35, duration: 0.9, ease: ease('out') }}>
                {page.intro}
              </motion.p>
              <motion.div className="sp-hero__ctas" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: d + 0.5, duration: 0.9, ease: ease('out') }}>
                <MagneticButton onClick={() => scrollToId('contacto')} className="btn btn--gold">
                  {ui.request} <span className="btn__ic"><Arrow size={16} /></span>
                </MagneticButton>
                <a className="btn btn--line" href={waLink(`${t.wa.practiceMsg}${title}`)} target="_blank" rel="noopener noreferrer">
                  <WhatsAppLogo size={22} /> {t.wa.short}
                </a>
              </motion.div>
            </div>

            <motion.div
              className={`scard scard--${item.theme} sp-visual`}
              initial={{ clipPath: 'inset(10% 10% 10% 10% round 6px)', opacity: 0 }}
              animate={{ clipPath: 'inset(0% 0% 0% 0% round 6px)', opacity: 1 }}
              transition={{ delay: d - 0.1, duration: 1.2, ease: ease('premium') }}
            >
              <div className="scard__visual">
                <ServiceVisual k={key} />
                <span className="scard__ghost">{item.n}</span>
              </div>
            </motion.div>
          </div>

          <ul className="sp-facts">
            {ui.facts.map((fct, i) => {
              const Ic = FACT_ICONS[i];
              return (
                <motion.li
                  key={fct.t}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: d + 0.7 + i * 0.12, duration: 0.8, ease: ease('out') }}
                >
                  <span className="sp-facts__ic"><Ic size={18} /></span>
                  <span>
                    <small>{fct.t}</small>
                    <b>{fct.d}</b>
                  </span>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* WHAT WE HANDLE */}
      <section className="sp-offer">
        <div className="container">
          <div className="sp-head">
            <div>
              <p className="eyebrow"><span className="eyebrow__line" /> {ui.offerEyebrow}</p>
              <h2 className="h2">
                <MaskLine>{ui.offerTitle[0]}</MaskLine>
                <MaskLine delay={0.1}><em>{ui.offerTitle[1]}</em></MaskLine>
              </h2>
            </div>
            <FadeUp className="sp-why">
              <Spark size={14} />
              <p>{page.why}</p>
            </FadeUp>
          </div>
          <div className="sp-offer__grid" ref={offerFloat.ref}>
            {page.offer.map((o, i) => (
              <LiveCard
                as="article"
                key={o.t}
                index={i % 3}
                depth={[0.4, 0.9, 0.6][i % 3]}
                progress={offerFloat.progress}
                className="sp-offer__card"
              >
                <span className="sp-offer__n">{String(i + 1).padStart(2, '0')}</span>
                <DrawLine className="sp-offer__rule" delay={0.3 + (i % 3) * 0.13} />
                <h3>{o.t}</h3>
                <p>{o.d}</p>
              </LiveCard>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="sp-steps">
        <div className="container">
          <p className="eyebrow"><span className="eyebrow__line" /> {ui.stepsEyebrow}</p>
          <h2 className="h2">
            <MaskLine>{ui.stepsTitle[0]}</MaskLine>
            <MaskLine delay={0.1}><em>{ui.stepsTitle[1]}</em></MaskLine>
          </h2>
          <ol className="sp-steps__list" ref={steps.ref}>
            <span className="sp-steps__track" aria-hidden>
              <motion.span style={{ scaleX: steps.fill }} />
            </span>
            {page.steps.map((st, i) => (
              <LiveCard as="li" key={st.t} index={i}>
                <motion.span
                  className="sp-steps__node"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, amount: 1 }}
                  transition={{ delay: 0.4 + i * 0.18, duration: 0.6, ease: ease('bounce') }}
                  aria-hidden
                />
                <motion.span
                  className="sp-steps__bar"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ delay: 0.35 + i * 0.18, duration: 0.9, ease: ease('premium') }}
                  aria-hidden
                />
                <motion.span className="mask sp-steps__nmask" initial="h" whileInView="v" viewport={{ once: true, amount: 0.5 }}>
                  <motion.span
                    className="sp-steps__n"
                    variants={{
                      h: { y: '110%' },
                      v: { y: 0, transition: { delay: 0.45 + i * 0.18, duration: 0.8, ease: ease('premium') } },
                    }}
                  >
                    0{i + 1}
                  </motion.span>
                </motion.span>
                <h3>{st.t}</h3>
                <p>{st.d}</p>
              </LiveCard>
            ))}
          </ol>
        </div>
      </section>

      {/* WHAT TO BRING + FAQ */}
      <section className="sp-bring">
        <div className="container sp-bring__grid">
          <div>
            <p className="eyebrow"><span className="eyebrow__line" /> {ui.bringEyebrow}</p>
            <h2 className="h2">
              <MaskLine>{ui.bringTitle[0]}</MaskLine>
              <MaskLine delay={0.1}><em>{ui.bringTitle[1]}</em></MaskLine>
            </h2>
            <ul className="sp-bring__list">
              {page.bring.map((b, i) => (
                <motion.li
                  key={b}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{ delay: i * 0.09, duration: 0.7, ease: ease('out') }}
                >
                  <motion.span
                    className="v-check"
                    initial={{ scale: 0, rotate: -90 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ delay: 0.15 + i * 0.09, duration: 0.6, ease: ease('bounce') }}
                  >
                    <Check size={11} />
                  </motion.span>
                  {b}
                </motion.li>
              ))}
            </ul>
            <p className="sp-bring__note">{ui.bringNote}</p>
            <div className="scard__ideal sp-ideal">
              <small>{t.practice.ideal}</small>
              {item.idealFor.map((x) => <span key={x}>{x}</span>)}
            </div>
          </div>
          <div>
            <p className="eyebrow"><span className="eyebrow__line" /> {ui.faqEyebrow}</p>
            <Accordion items={page.faqs} />
          </div>
        </div>
      </section>

      {/* REQUEST FORM */}
      <section id="contacto" className="sp-request">
        <div className="container sp-request__grid">
          <div className="sp-request__side">
            <p className="eyebrow eyebrow--light"><Spark size={12} /> {ui.form.eyebrow}</p>
            <h2 className="contact__title">
              <MaskLine>{ui.form.title[0]}</MaskLine>
              <MaskLine delay={0.1}><em>{ui.form.title[1]}</em></MaskLine>
            </h2>
            <p className="sp-request__sub">{ui.form.sub}</p>
            <div className="sp-request__service">
              <small>{item.n} · {item.en}</small>
              <b>{title}</b>
            </div>
            <ul className="contact__info">
              <li><a href={TEL}><Phone size={17} /> {FIRM.phoneLabel}</a></li>
              <li><a href={`mailto:${FIRM.email}`}><Mail size={18} /> {FIRM.email}</a></li>
              <li><Pin size={18} /> {FIRM.city}</li>
              <li><Clock size={18} /> {t.contact.byAppt}</li>
            </ul>
          </div>
          <FadeUp className="sp-request__card">
            <RequestForm title={title} offer={page.offer} />
          </FadeUp>
        </div>
      </section>

      {/* OTHER AREAS */}
      <section className="sp-others">
        <div className="container">
          <p className="eyebrow"><span className="eyebrow__line" /> {ui.others}</p>
          <div className="sp-others__grid" ref={othersFloat.ref}>
            {others.map((o, i) => (
              <LiveCard key={o.key} index={i} depth={[0.4, 0.8, 0.5, 0.9][i % 4]} progress={othersFloat.progress} className="sp-others__wrap">
                <Link to={servicePath(o.key)} className="sp-others__card">
                  <span className="sp-others__n">{o.n}</span>
                  <b>{o.title} <em>{o.accent}</em></b>
                  <span className="sp-others__go">{ui.view} <Arrow size={14} /></span>
                </Link>
              </LiveCard>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
