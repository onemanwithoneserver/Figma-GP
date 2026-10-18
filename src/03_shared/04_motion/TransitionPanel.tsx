import { useEffect, useRef } from 'react';
import { AnimatePresence, motion, useIsPresent, type HTMLMotionProps } from 'motion/react';
import { useMotionSettings } from './useMotionSettings';

function Panel({ children, ...props }: HTMLMotionProps<'div'>) {
  const { reducedMotion, transition } = useMotionSettings();
  const present = useIsPresent();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) ref.current.inert = !present;
  }, [present]);

  return (
    <motion.div {...props} ref={ref} aria-hidden={!present || undefined}
      initial={reducedMotion ? false : { opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : -4, transition: { duration: reducedMotion ? 0 : 0.1 } }}
      transition={transition}>
      {children}
    </motion.div>
  );
}

export function TransitionPanel({ transitionKey, ...props }: HTMLMotionProps<'div'> & { transitionKey: string }) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Panel key={transitionKey} {...props} />
    </AnimatePresence>
  );
}
