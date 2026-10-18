import { motion } from 'motion/react';
import { useMotionSettings } from './useMotionSettings';

const BLOBS = [
  { cls: 'left-[-10%] top-[8%] h-[38vh] w-[38vh] bg-brand/10', x: [0, 80, -20, 0], y: [0, 60, 120, 0], d: 26 },
  { cls: 'right-[-12%] top-[40%] h-[44vh] w-[44vh] bg-brand-warm/10', x: [0, -90, 20, 0], y: [0, -70, 40, 0], d: 32 },
  { cls: 'left-[20%] bottom-[-10%] h-[34vh] w-[34vh] bg-[#F4C9A8]/25', x: [0, 60, -60, 0], y: [0, -50, -10, 0], d: 28 },
];

export function AmbientBackground() {
  const { reducedMotion } = useMotionSettings();
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {BLOBS.map((b, i) => (
        <motion.div key={i} className={`absolute rounded-full blur-3xl ${b.cls}`}
          animate={reducedMotion ? undefined : { x: b.x, y: b.y }}
          transition={{ duration: b.d, repeat: Infinity, ease: 'easeInOut' }} />
      ))}
    </div>
  );
}
