import { useReducedMotion, type Transition, type Variants } from 'motion/react';

export const easeOut = [0.22, 1, 0.36, 1] as const;

export function getScrollBehavior(): ScrollBehavior {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth';
}

export function useMotionSettings() {
  const reducedMotion = Boolean(useReducedMotion());
  const transition: Transition = { duration: reducedMotion ? 0 : 0.28, ease: easeOut };
  const itemVariants: Variants = {
    hidden: { opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 10 },
    show: { opacity: 1, y: 0, transition },
    exit: { opacity: reducedMotion ? 1 : 0, transition: { duration: reducedMotion ? 0 : 0.1 } },
  };
  const staggerVariants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reducedMotion ? 0 : 0.045 } },
  };
  return { reducedMotion, transition, itemVariants, staggerVariants };
}
