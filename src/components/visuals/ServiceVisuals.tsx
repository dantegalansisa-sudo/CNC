import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import type { PracticeKey } from '../../content';
import { useLang } from '../../i18n';
import { ease } from '../../utils/easings';
import { Check } from '../Icons';

/* ------------------------------------------------------------------ */
/* Shared pieces                                                       */
/* ------------------------------------------------------------------ */

const view = { once: true, amount: 0.35 } as const;

const X = {
  en: {
    agreement: 'Service Agreement',
    firm: 'CNC Law Firm · Puerto Rico',
    clauses: ['Parties', 'Scope & terms', 'Payment', 'Termination'],
    revised: 'Clause 3 — revised',
    reviewed: 'Reviewed by counsel',
    bilingual: 'EN · ES',
    sign: ['Client', 'CNC Law Firm'],
    sworn: 'Sworn and subscribed before me',
    notary: 'Attorney-Notary',
    sealText: 'NOTARY · PUERTO RICO · CNC LAW FIRM · ',
    caseFile: 'Case file',
    stage: 'Stage',
    cert: 'Civil Marriage Certificate',
    certSub: 'Commonwealth of Puerto Rico',
    officiant: 'Officiant',
    notice: 'Notice of resolution',
    agency: 'Administrative agency',
    status: ['Filed', 'Under review', 'Hearing', 'Resolved'],
    deadline: 'Deadline',
    days: 'days',
    approved: 'Resolved',
  },
  es: {
    agreement: 'Contrato de Servicios',
    firm: 'CNC Law Firm · Puerto Rico',
    clauses: ['Partes', 'Alcance y términos', 'Pago', 'Terminación'],
    revised: 'Cláusula 3 — revisada',
    reviewed: 'Revisado por abogada',
    bilingual: 'ES · EN',
    sign: ['Cliente', 'CNC Law Firm'],
    sworn: 'Jurado y suscrito ante mí',
    notary: 'Abogada-Notaria',
    sealText: 'NOTARÍA · PUERTO RICO · CNC LAW FIRM · ',
    caseFile: 'Expediente',
    stage: 'Etapa',
    cert: 'Certificado de Matrimonio',
    certSub: 'Estado Libre Asociado de Puerto Rico',
    officiant: 'Oficiante',
    notice: 'Notificación de resolución',
    agency: 'Agencia administrativa',
    status: ['Radicado', 'En evaluación', 'Vista', 'Resuelto'],
    deadline: 'Término',
    days: 'días',
    approved: 'Resuelto',
  },
};

/** Cycles 0..n-1 while the visual is on screen. */
function useCycle(n: number, ms: number) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const id = window.setInterval(() => setI((v) => (v + 1) % n), ms);
    return () => window.clearInterval(id);
  }, [inView, n, ms]);
  return { ref, i };
}

/** The firm's circular seal with rotating legend. */
function Seal({ text, className = '' }: { text: string; className?: string }) {
  const id = `seal${useId().replace(/:/g, '')}`;
  return (
    <span className={`vx-seal ${className}`}>
      <svg viewBox="0 0 100 100" className="vx-seal__ring" aria-hidden>
        <defs>
          <path id={id} d="M50 50 m-37 0 a37 37 0 1 1 74 0 a37 37 0 1 1 -74 0" />
        </defs>
        <circle cx="50" cy="50" r="47" />
        <circle cx="50" cy="50" r="28" />
        <text>
          <textPath href={`#${id}`}>{text}</textPath>
        </text>
      </svg>
      <img src="/images/cnc-mark-light.png" alt="" className="vx-seal__mark" draggable={false} />
    </span>
  );
}

function Lines({ n, widths = [92, 100, 76, 88, 64] }: { n: number; widths?: number[] }) {
  return (
    <span className="vx-lines">
      {Array.from({ length: n }).map((_, i) => (
        <i key={i} style={{ width: `${widths[i % widths.length]}%` }} />
      ))}
    </span>
  );
}

function Float({ children, className = '', delay = 0, amp = 1.6 }: { children: ReactNode; className?: string; delay?: number; amp?: number }) {
  return (
    <motion.div
      className={`vx-chip ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={view}
      transition={{ delay: 0.6 + delay, duration: 0.7, ease: ease('out') }}
    >
      <motion.span
        className="vx-chip__in"
        animate={{ y: [`-${amp}cqmin`, `${amp}cqmin`, `-${amp}cqmin`] }}
        transition={{ duration: 5 + delay * 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        {children}
      </motion.span>
    </motion.div>
  );
}

/* A hand-drawn signature that writes itself on a loop. */
function Signature({ d, delay = 0 }: { d: string; delay?: number }) {
  return (
    <svg viewBox="0 0 120 34" className="vx-sign" aria-hidden>
      <motion.path
        d={d}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: [0, 1, 1, 0] }}
        transition={{ duration: 7, times: [0, 0.3, 0.9, 1], repeat: Infinity, delay, ease: 'easeInOut' }}
      />
    </svg>
  );
}

const SIG_A = 'M4 24 C 14 6, 20 30, 28 18 S 40 8, 44 22 S 58 28, 64 14 C 70 4, 76 26, 86 20 S 104 12, 116 18';
const SIG_B = 'M6 22 C 18 10, 26 28, 36 16 C 42 8, 50 26, 58 20 S 74 6, 82 18 C 88 26, 100 22, 114 12';

/* ------------------------------------------------------------------ */
/* 01 · Contracts — an agreement being reviewed, signed and sealed     */
/* ------------------------------------------------------------------ */
function ContractsVisual() {
  const { lang } = useLang();
  const x = X[lang];
  const { ref, i } = useCycle(4, 1700);
  return (
    <div className="v vx vx-contract" ref={ref}>
      <motion.div
        className="vx-paper vx-contract__doc"
        initial={{ y: '8cqmin', rotate: -6, opacity: 0 }}
        whileInView={{ y: 0, rotate: -2.5, opacity: 1 }}
        viewport={view}
        transition={{ duration: 1.1, ease: ease('premium') }}
      >
        <div className="vx-doc__head">
          <img src="/images/cnc-mark.png" alt="" draggable={false} />
          <span>
            <b>{x.agreement}</b>
            <small>{x.firm}</small>
          </span>
        </div>
        <div className="vx-clauses">
          {x.clauses.map((c, k) => (
            <div key={c} className={`vx-clause ${i === k ? 'is-on' : ''} ${i > k ? 'is-done' : ''}`}>
              <span className="vx-clause__n">{k + 1}.</span>
              <div>
                <b>{c}</b>
                <Lines n={2} widths={[96, 70 - k * 6]} />
              </div>
              <span className="vx-clause__ok"><Check size={9} /></span>
            </div>
          ))}
          <motion.span className="vx-scan" animate={{ top: `${i * 25}%` }} transition={{ duration: 0.8, ease: ease('premium') }} />
        </div>
        <div className="vx-sigs">
          <div>
            <Signature d={SIG_A} />
            <small>{x.sign[0]}</small>
          </div>
          <div>
            <Signature d={SIG_B} delay={1.2} />
            <small>{x.sign[1]}</small>
          </div>
        </div>
        <motion.div
          className="vx-contract__seal"
          initial={{ scale: 1.8, opacity: 0, rotate: -30 }}
          animate={{ scale: [1.8, 1, 1, 1.8], opacity: [0, 1, 1, 0], rotate: [-30, -12, -12, -30] }}
          transition={{ duration: 7, times: [0.28, 0.36, 0.92, 1], repeat: Infinity, ease: 'easeOut', delay: 0.4 }}
        >
          <Seal text={x.sealText} className="s-contract" />
        </motion.div>
      </motion.div>

      <Float className="vx-contract__c1" delay={0.1}>
        <span className="vx-chip__ic">✎</span> {x.revised}
      </Float>
      <Float className="vx-contract__c2" delay={0.35}>
        <span className="vx-chip__ic vx-chip__ic--ok"><Check size={10} /></span> {x.reviewed}
      </Float>
      <Float className="vx-contract__c3" delay={0.6} amp={1.2}>
        <b>{x.bilingual}</b>
      </Float>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 02 · Notary — each instrument receives public faith in turn         */
/* ------------------------------------------------------------------ */
function NotaryVisual() {
  const { lang, t } = useLang();
  const x = X[lang];
  const items = t.practice.visuals.notary.items;
  const { ref, i } = useCycle(items.length, 2600);
  return (
    <div className="v vx vx-notary" ref={ref}>
      <ul className="vx-notary__list">
        {items.map((it, k) => (
          <motion.li
            key={it}
            className={k === i ? 'is-on' : ''}
            initial={{ opacity: 0, x: '-6cqmin' }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={view}
            transition={{ delay: 0.2 + k * 0.12, duration: 0.7, ease: ease('out') }}
          >
            <span className="vx-notary__dot">{k === i ? <Check size={9} /> : `0${k + 1}`}</span>
            {it}
          </motion.li>
        ))}
      </ul>

      <motion.div
        className="vx-paper vx-notary__doc"
        initial={{ opacity: 0, y: '6cqmin' }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={view}
        transition={{ duration: 1, ease: ease('premium') }}
      >
        <AnimatePresence mode="wait">
          <motion.b
            key={items[i]}
            className="vx-notary__title"
            initial={{ opacity: 0, y: '1.5cqmin' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-1.5cqmin' }}
            transition={{ duration: 0.4 }}
          >
            {items[i]}
          </motion.b>
        </AnimatePresence>
        <small className="vx-notary__no">Nº {String(1024 + i * 37).padStart(5, '0')}</small>
        <Lines n={5} />
        <Lines n={3} widths={[88, 100, 52]} />
        <div className="vx-notary__foot">
          <div>
            <small>{x.sworn}</small>
            <Signature d={SIG_B} />
            <small className="vx-notary__who">{x.notary}</small>
          </div>
          <AnimatePresence mode="popLayout">
            <motion.div
              key={i}
              className="vx-notary__seal"
              initial={{ scale: 1.9, opacity: 0, rotate: -40 }}
              animate={{ scale: 1, opacity: 1, rotate: -10 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5, duration: 0.5, ease: [0.2, 1.4, 0.4, 1] }}
            >
              <Seal text={x.sealText} className="s-notary" />
              <span className="vx-ribbon" />
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 03 · Civil — the scales find balance as the case advances           */
/* ------------------------------------------------------------------ */
function CivilVisual() {
  const { lang, t } = useLang();
  const x = X[lang];
  const pts = t.practice.visuals.civil.pts;
  const { ref, i } = useCycle(pts.length, 2200);
  const tilt = [-9, 6, -3, 0][i];
  return (
    <div className="v vx vx-civil" ref={ref}>
      <svg viewBox="0 0 200 150" className="vx-scales" aria-hidden>
        <motion.path
          d="M100 22 V128 M70 132 H130 M84 128 H116"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={view}
          transition={{ duration: 1.2, ease: ease('smooth') }}
        />
        <circle cx="100" cy="20" r="5" className="vx-scales__cap" />
        <motion.g animate={{ rotate: tilt }} transition={{ type: 'spring', stiffness: 40, damping: 7 }} style={{ originX: '100px', originY: '22px' }}>
          <path d="M38 22 H162" />
          {[38, 162].map((cx) => (
            <motion.g key={cx} animate={{ rotate: -tilt }} transition={{ type: 'spring', stiffness: 40, damping: 7 }} style={{ originX: `${cx}px`, originY: '22px' }}>
              <path d={`M${cx} 22 L${cx - 18} 62 M${cx} 22 L${cx + 18} 62`} className="vx-scales__thin" />
              <path d={`M${cx - 24} 62 Q${cx} 80 ${cx + 24} 62 Z`} className="vx-scales__pan" />
            </motion.g>
          ))}
        </motion.g>
      </svg>

      <Float className="vx-civil__file" delay={0.2}>
        <span className="vx-chip__ic">▤</span>
        <span>
          <small>{x.caseFile}</small>
          <b>CV-2026-0{418 + i}</b>
        </span>
      </Float>

      <motion.div
        className="vx-paper vx-civil__track"
        initial={{ opacity: 0, y: '6cqmin' }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={view}
        transition={{ delay: 0.3, duration: 0.9, ease: ease('premium') }}
      >
        <div className="vx-civil__head">
          <small>{x.stage}</small>
          <AnimatePresence mode="wait">
            <motion.b key={pts[i]} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.3 }}>
              {pts[i]}
            </motion.b>
          </AnimatePresence>
        </div>
        <div className="vx-civil__bar">
          <motion.span animate={{ width: `${(i / (pts.length - 1)) * 100}%` }} transition={{ duration: 0.9, ease: ease('premium') }} />
          {pts.map((p, k) => (
            <i key={p} className={k <= i ? 'is-on' : ''} style={{ left: `${(k / (pts.length - 1)) * 100}%` }} />
          ))}
        </div>
        <div className="vx-civil__labels">
          {pts.map((p, k) => (
            <small key={p} className={k === i ? 'is-on' : ''}>{p}</small>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 04 · Family — rings, orbiting instruments and the certificate        */
/* ------------------------------------------------------------------ */
function FamilyVisual() {
  const { lang, t } = useLang();
  const x = X[lang];
  const n = t.practice.visuals.family.nodes;
  const orbit = [n[2], n[3], n[4]];
  return (
    <div className="v vx vx-family">
      <div className="vx-family__stage">
        <svg viewBox="0 0 120 80" className="vx-rings" aria-hidden>
          <motion.circle cx="46" cy="40" r="22" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={view} transition={{ duration: 1.4, ease: ease('smooth') }} />
          <motion.circle cx="74" cy="40" r="22" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={view} transition={{ delay: 0.5, duration: 1.4, ease: ease('smooth') }} />
          <motion.path
            d="M60 23 l2.4 -4 l2.4 4 l-2.4 3 z"
            className="vx-rings__gem"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={view}
            transition={{ delay: 1.6, duration: 0.6, ease: ease('bounce') }}
          />
        </svg>
        <div className="vx-orbit">
          <motion.div className="vx-orbit__spin" animate={{ rotate: 360 }} transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}>
            {orbit.map((o, k) => (
              <span key={o} className="vx-orbit__slot" style={{ rotate: `${k * 120}deg` }}>
                <motion.span
                  className="vx-orbit__chip"
                  animate={{ rotate: [-k * 120, -k * 120 - 360] }}
                  transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
                >
                  <i /> {o}
                </motion.span>
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div
        className="vx-paper vx-cert"
        initial={{ opacity: 0, y: '8cqmin' }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={view}
        transition={{ delay: 0.4, duration: 1, ease: ease('premium') }}
      >
        <div className="vx-cert__frame">
          <small>{x.certSub}</small>
          <b>{x.cert}</b>
          <div className="vx-cert__names">
            <span><Signature d={SIG_A} /><i /></span>
            <span><Signature d={SIG_B} delay={0.8} /><i /></span>
          </div>
          <div className="vx-cert__foot">
            <small>{x.officiant} · CNC Law Firm</small>
            <Seal text={x.sealText} className="s-cert" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 05 · Administrative — the agency file moves to resolution            */
/* ------------------------------------------------------------------ */
function AdminVisual() {
  const { lang } = useLang();
  const x = X[lang];
  const { ref, i } = useCycle(x.status.length, 2000);
  const days = [30, 21, 12, 0][i];
  return (
    <div className="v vx vx-admin" ref={ref}>
      <svg viewBox="0 0 160 90" className="vx-building" aria-hidden>
        <motion.path
          d="M10 34 L80 6 L150 34 Z M16 40 H144 M26 44 V74 M50 44 V74 M74 44 V74 M86 44 V74 M110 44 V74 M134 44 V74 M14 78 H146 M8 84 H152"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={view}
          transition={{ duration: 2, ease: ease('smooth') }}
        />
        <circle cx="80" cy="24" r="4.5" />
      </svg>

      <motion.div
        className="vx-paper vx-admin__card"
        initial={{ opacity: 0, y: '8cqmin' }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={view}
        transition={{ delay: 0.3, duration: 1, ease: ease('premium') }}
      >
        <div className="vx-admin__top">
          <span>
            <small>{x.agency}</small>
            <b>{x.notice}</b>
          </span>
          <AnimatePresence mode="wait">
            <motion.span
              key={i}
              className={`vx-pill vx-pill--${i}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              {x.status[i]}
            </motion.span>
          </AnimatePresence>
        </div>
        <div className="vx-admin__steps">
          {x.status.map((s, k) => (
            <div key={s} className={`${k < i ? 'is-done' : ''} ${k === i ? 'is-on' : ''}`}>
              <i>{k < i ? <Check size={8} /> : null}</i>
              <small>{s}</small>
            </div>
          ))}
          <motion.span className="vx-admin__fill" animate={{ width: `${(i / (x.status.length - 1)) * 76}%` }} transition={{ duration: 0.8, ease: ease('premium') }} />
        </div>
        <div className="vx-admin__foot">
          <span className="vx-admin__clock">
            <small>{x.deadline}</small>
            <b>{days}</b> {x.days}
          </span>
          <Lines n={2} widths={[100, 70]} />
        </div>
        <AnimatePresence>
          {i === x.status.length - 1 && (
            <motion.span
              className="vx-stamp"
              initial={{ scale: 2, opacity: 0, rotate: -20 }}
              animate={{ scale: 1, opacity: 1, rotate: -12 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.2, 1.4, 0.4, 1] }}
            >
              {x.approved}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default function ServiceVisual({ k }: { k: PracticeKey }) {
  switch (k) {
    case 'contracts':
      return <ContractsVisual />;
    case 'notary':
      return <NotaryVisual />;
    case 'civil':
      return <CivilVisual />;
    case 'family':
      return <FamilyVisual />;
    case 'admin':
      return <AdminVisual />;
  }
}
