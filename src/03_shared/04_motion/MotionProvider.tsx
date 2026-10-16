import type { ReactNode } from 'react';
import { MotionConfig } from 'motion/react';
import { useMotionSettings } from './useMotionSettings';

export function MotionProvider({ children }: { children: ReactNode }) {
  const { transition } = useMotionSettings();
  return <MotionConfig reducedMotion="user" transition={transition}>{children}</MotionConfig>;
}
