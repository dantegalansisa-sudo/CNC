import { useRef, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  strength?: number;
  external?: boolean;
  cursor?: string;
}

export default function MagneticButton({
  children,
  href,
  onClick,
  className = '',
  strength = 0.35,
  external,
  cursor,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    setPos({
      x: (e.clientX - (r.left + r.width / 2)) * strength,
      y: (e.clientY - (r.top + r.height / 2)) * strength,
    });
  };

  const Comp = href ? motion.a : motion.button;
  const extra = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};

  return (
    <div ref={ref} className="magnetic" onMouseMove={handleMove} onMouseLeave={() => setPos({ x: 0, y: 0 })}>
      <Comp
        href={href}
        onClick={onClick}
        className={className}
        data-cursor={cursor}
        animate={{ x: pos.x, y: pos.y }}
        transition={{ type: 'spring', stiffness: 200, damping: 18, mass: 0.6 }}
        whileTap={{ scale: 0.96 }}
        {...extra}
      >
        {children}
      </Comp>
    </div>
  );
}
