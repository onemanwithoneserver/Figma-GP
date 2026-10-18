import { motion, type HTMLMotionProps } from 'motion/react';
import { useMotionSettings } from './useMotionSettings';

type From = 'up' | 'left' | 'right';
const OFFSET: Record<From, { x: number; y: number }> = {
  up: { x: 0, y: 28 },
  left: { x: -40, y: 12 },
  right: { x: 40, y: 12 },
};

/** A once-per-mount section entrance that slides in from `from`. Transforms settle to none after entry. */
export function Reveal({ children, from = 'up', ...props }: HTMLMotionProps<'div'> & { from?: From }) {
  const { reducedMotion } = useMotionSettings();
  const o = OFFSET[from];
  return (
    <motion.div {...props}
      initial={reducedMotion ? false : { opacity: 0, x: o.x, y: o.y, scale: 0.98 }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.08 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20, mass: 0.8, opacity: { duration: 0.4 } }}>
      {children}
    </motion.div>
  );
}
