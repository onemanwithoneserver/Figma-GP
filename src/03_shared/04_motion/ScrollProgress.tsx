import { motion, useScroll, useSpring } from 'motion/react';
import { useMotionSettings } from './useMotionSettings';

export function ScrollProgress() {
  const { reducedMotion } = useMotionSettings();
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  return (
    <div aria-hidden="true" className="fixed inset-x-0 top-0 z-[60] flex justify-center pointer-events-none">
      <motion.div
        className="h-[2px] w-full max-w-[390px] origin-left bg-brand-gradient shadow-brand"
        style={{ scaleX: reducedMotion ? scrollYProgress : smooth }}
      />
    </div>
  );
}
