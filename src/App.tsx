import { useEffect } from 'react';
import { MotionConfig } from 'framer-motion';
import Lenis from 'lenis';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Loader from './components/Loader';
import Nav from './components/Nav';
import Hero from './components/Hero';
import About, { Manifesto } from './components/About';
import Services from './components/Services';
import USClients from './components/USClients';
import Process, { Values } from './components/Method';
import Insights from './components/Insights';
import CtaBand from './components/CtaBand';
import ServicePage from './components/ServicePage';
import { CallFloat, Contact, Faq, Footer } from './components/Closing';
import { LangProvider, useLang } from './i18n';
import { getLenis, scrollToId, setLenis } from './utils/scroll';

function SkipLink() {
  const { t } = useLang();
  return (
    <a className="skip" href="#main">
      {t.skip}
    </a>
  );
}

/** Reset scroll on page change; on the home page honour /#section links. */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
    else window.scrollTo(0, 0);
    if (hash) {
      const id = hash.slice(1);
      const timer = window.setTimeout(() => scrollToId(id), 450);
      return () => window.clearTimeout(timer);
    }
  }, [pathname, hash]);
  return null;
}

function Home() {
  const { t } = useLang();
  useEffect(() => {
    document.title = t.meta.title;
  }, [t]);
  return (
    <>
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
    </>
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
    <BrowserRouter>
      <LangProvider>
        <MotionConfig reducedMotion="user">
          <ScrollManager />
          <SkipLink />
          <Loader />
          <Nav />
          <main id="main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services/:slug" element={<ServicePage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
          <CallFloat />
        </MotionConfig>
      </LangProvider>
    </BrowserRouter>
  );
}
