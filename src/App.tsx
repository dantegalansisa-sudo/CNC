import { useEffect } from 'react';
import { MotionConfig } from 'framer-motion';
import Lenis from 'lenis';
import CustomCursor from './components/CustomCursor';
import Loader from './components/Loader';
import Nav from './components/Nav';
import Hero from './components/Hero';
import About, { Manifesto } from './components/About';
import Services from './components/Services';
import USClients from './components/USClients';
import Process, { Values } from './components/Method';
import Insights from './components/Insights';
import CtaBand from './components/CtaBand';
import { CallFloat, Contact, Faq, Footer } from './components/Closing';
import { LangProvider, useLang } from './i18n';
import { setLenis } from './utils/scroll';

function SkipLink() {
  const { t } = useLang();
  return (
    <a className="skip" href="#main">
      {t.skip}
    </a>
  );
}

export default function App() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    setLenis(lenis);
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <LangProvider>
      <MotionConfig reducedMotion="user">
        <SkipLink />
        <CustomCursor />
        <Loader />
        <Nav />
        <main id="main">
          <Hero />
          <Manifesto />
          <About />
          <Services />
          <CtaBand />
          <USClients />
          <Process />
          <Values />
          <CtaBand variant="dark" />
          <Insights />
          <Faq />
          <Contact />
        </main>
        <Footer />
        <CallFloat />
        <div className="grain" aria-hidden />
      </MotionConfig>
    </LangProvider>
  );
}
