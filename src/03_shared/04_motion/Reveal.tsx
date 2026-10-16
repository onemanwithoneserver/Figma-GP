import { motion, type HTMLMotionProps } from 'motion/react';
import { useMotionSettings } from './useMotionSettings';

/** A once-per-mount section entrance. No transforms are applied to the page shell. */
export function Reveal({ children, ...props }: HTMLMotionProps<'div'>) {
  const { reducedMotion, transition } = useMotionSettings();
  return (
    <motion.div {...props}
      initial={reducedMotion ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={transition}>
      {children}
    </motion.div>
  );
}
