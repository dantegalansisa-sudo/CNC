import { useRef, useState, type ComponentType } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FIRM, waLink } from '../content';
import { useLang } from '../i18n';
import { UI } from '../servicePages';
import { Arrow, Calendar, Check, Clock, Mail, Phone, Pin, Spark, Video, WhatsAppLogo } from './Icons';
import { Monogram } from './Logo';
import { ease } from '../utils/easings';

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

type Icon = ComponentType<{ size?: number }>;
const CONTACT_ICONS: Icon[] = [WhatsAppLogo as Icon, Phone, Mail];
const MODE_ICONS: Icon[] = [Pin, Video, Phone];
const URGENCY_ICONS: Icon[] = [Clock, Calendar, Spark];

/** Floating-label text field. */
function Field({
  label,
  value,
  onChange,
  type = 'text',
  autoComplete,
  required = true,
  textarea = false,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  textarea?: boolean;
  placeholder?: string;
}) {
  return (
    <label className={`fld ${textarea ? 'fld--area' : ''} ${value ? 'is-filled' : ''}`}>
      {textarea ? (
        <textarea required={required} rows={4} value={value} onChange={onChange} placeholder={placeholder ?? ' '} />
      ) : (
        <input required={required} type={type} autoComplete={autoComplete} value={value} onChange={onChange} placeholder=" " />
      )}
      <span className="fld__label">{label}</span>
      <span className="fld__ok" aria-hidden>
        <Check size={11} />
      </span>
    </label>
  );
}

export default function RequestForm({ title, offer }: { title: string; offer: readonly { t: string }[] }) {
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

  const required = [form.name, form.phone, /\S+@\S+\.\S+/.test(form.email) ? 'ok' : '', form.service, form.msg, form.ok ? 'ok' : ''];
  const done = required.filter(Boolean).length;
  const pct = Math.round((done / required.length) * 100);

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

  const Options = ({ k, options, icons }: { k: 'mode' | 'contact' | 'urgency'; options: readonly string[]; icons: Icon[] }) => (
    <div className="opts" role="radiogroup">
      {options.map((o, i) => {
        const Ic = icons[i];
        const on = form[k] === o;
        return (
          <label key={o} className={`opt ${on ? 'is-on' : ''}`}>
            <input type="radio" name={k} value={o} checked={on} onChange={set(k)} />
            <span className="opt__ic"><Ic size={16} /></span>
            <span className="opt__t">{o}</span>
            {on && (
              <motion.span layoutId={`opt-${k}`} className="opt__mark" transition={{ type: 'spring', stiffness: 420, damping: 32 }}>
                <Check size={10} />
              </motion.span>
            )}
          </label>
        );
      })}
    </div>
  );

  return (
    <div className="rq">
      <div className="rq__head">
        <div className="rq__brand">
          <Monogram size={34} light />
          <span>
            <small>{f.eyebrow}</small>
            <b>{title}</b>
          </span>
        </div>
        <div className="rq__meter" aria-label={`${pct}%`}>
          <svg viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="17" className="rq__meter-bg" />
            <motion.circle
              cx="20"
              cy="20"
              r="17"
              className="rq__meter-fg"
              animate={{ pathLength: pct / 100 }}
              transition={{ duration: 0.6, ease: ease('premium') }}
            />
          </svg>
          <b>{pct}%</b>
        </div>
      </div>

      <form className="rq__form" ref={formRef} onSubmit={submit}>
        <fieldset className="rq__step">
          <legend>
            <span className={`rq__num ${form.name && form.phone && form.email ? 'is-done' : ''}`}>01</span> {f.steps[0]}
          </legend>
          <div className="rq__row">
            <Field label={f.name} value={form.name} onChange={set('name')} autoComplete="name" />
            <Field label={f.phone} value={form.phone} onChange={set('phone')} type="tel" autoComplete="tel" />
          </div>
          <Field label={f.email} value={form.email} onChange={set('email')} type="email" autoComplete="email" />
          <div className="rq__group">
            <span className="rq__label">{f.contact}</span>
            <Options k="contact" options={f.contacts} icons={CONTACT_ICONS} />
          </div>
        </fieldset>

        <fieldset className="rq__step">
          <legend>
            <span className={`rq__num ${form.service && form.msg ? 'is-done' : ''}`}>02</span> {f.steps[1]}
          </legend>
          <label className={`fld fld--select ${form.service ? 'is-filled' : ''}`}>
            <select required value={form.service} onChange={set('service')}>
              <option value="" disabled hidden />
              {offer.map((o) => (
                <option key={o.t} value={o.t}>{o.t}</option>
              ))}
              <option value={f.other}>{f.other}</option>
            </select>
            <span className="fld__label">{f.service}</span>
          </label>
          <div className="rq__group">
            <span className="rq__label">{f.mode}</span>
            <Options k="mode" options={f.modes} icons={MODE_ICONS} />
          </div>
          <div className="rq__group">
            <span className="rq__label">{f.urgency}</span>
            <Options k="urgency" options={f.urgencies} icons={URGENCY_ICONS} />
          </div>
          <Field label={f.msg} value={form.msg} onChange={set('msg')} textarea placeholder={f.msgPh} />
        </fieldset>

        <label className={`rq__consent ${form.ok ? 'is-on' : ''}`}>
          <input type="checkbox" required checked={form.ok} onChange={(e) => setForm((s) => ({ ...s, ok: e.target.checked }))} />
          <span className="rq__box"><Check size={11} /></span>
          <span>{f.consent}</span>
        </label>

        <div className="rq__actions">
          <button className="rq__submit" type="submit">
            <span>{f.send}</span>
            <span className="rq__submit-ic"><Arrow size={16} /></span>
          </button>
          <button className="rq__wa" type="button" onClick={sendWa}>
            <WhatsAppLogo size={22} /> {f.sendWa}
          </button>
        </div>

        <AnimatePresence>
          {sent && (
            <motion.p className="rq__note" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} role="status">
              {f.sent}
            </motion.p>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}
