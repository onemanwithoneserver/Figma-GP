import type { Transition, Variants } from 'motion/react';

export const easeOut = [0.22, 1, 0.36, 1] as const;

export const defaultSpring: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 26,
};

export const defaultViewport = {
  once: true,
  amount: 0.05,
  margin: '0px 0px -30px 0px',
} as const;

export function getScrollBehavior(): ScrollBehavior {
  return 'smooth';
}

export function useMotionSettings() {
  const reducedMotion = false;
  const transition: Transition = { duration: 0.35, ease: easeOut };
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition },
    exit: { opacity: 0, transition: { duration: 0.15 } },
  };
  const staggerVariants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.05 } },
  };
  return { reducedMotion, transition, itemVariants, staggerVariants, defaultViewport, defaultSpring };
}
