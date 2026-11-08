import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ease } from '../utils/easings';

/** Seconds until the hero starts its entrance (loader duration). */
export const INTRO = 1.5;

export default function Loader() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setShow(false), INTRO * 1000 - 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="loader"
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.9, ease: ease('premium') }}
        >
          <motion.img
            src="/images/cnc-mark.png"
            alt=""
            width={96}
            initial={{ scale: 0.7, opacity: 0, rotate: -40 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 1, ease: ease('out') }}
          />
          <motion.p
            initial={{ opacity: 0, letterSpacing: '0.2em' }}
            animate={{ opacity: 1, letterSpacing: '0.5em' }}
            transition={{ duration: 1.1, delay: 0.15 }}
          >
            CNC LAW FIRM
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
