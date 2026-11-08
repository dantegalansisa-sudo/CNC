import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { CONTENT, type Lang } from './content';

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (typeof CONTENT)['en'] };

const LangContext = createContext<Ctx | null>(null);

const initial = (): Lang => {
  try {
    const saved = localStorage.getItem('cnc-lang');
    if (saved === 'en' || saved === 'es') return saved;
  } catch {
    /* storage unavailable */
  }
  return 'en';
};

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(initial);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = CONTENT[lang].meta.title;
    try {
      localStorage.setItem('cnc-lang', lang);
    } catch {
      /* storage unavailable */
    }
  }, [lang]);

  return <LangContext.Provider value={{ lang, setLang, t: CONTENT[lang] }}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used inside LangProvider');
  return ctx;
}
