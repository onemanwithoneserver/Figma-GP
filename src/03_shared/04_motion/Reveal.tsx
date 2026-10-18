import { motion, type HTMLMotionProps } from 'motion/react';
import { useMotionSettings } from './useMotionSettings';

type From = 'up' | 'left' | 'right';
const OFFSET: Record<From, { x: number; y: number }> = {
  up: { x: 0, y: 28 },
  left: { x: -40, y: 12 },
  right: { x: 40, y: 12 },
};

export function Reveal({ children, from = 'up', ...props }: HTMLMotionProps<'div'> & { from?: From }) {
  const o = OFFSET[from];
  return (
    <motion.div {...props}
      initial={{ opacity: 0, x: o.x, y: o.y, scale: 0.98 }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.05, margin: '0px 0px -30px 0px' }}
      transition={{ type: 'spring', stiffness: 140, damping: 20, mass: 0.8, opacity: { duration: 0.35 } }}>
      {children}
    </motion.div>
  );
}
