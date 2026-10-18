import { useEffect, useRef } from 'react';
import { animate, useInView } from 'motion/react';
import { easeOut, useMotionSettings } from './useMotionSettings';

/**
 * Counts every number inside `text` up from 0 once it scrolls into view,
 * e.g. "G+14 Floors" -> "G+0 Floors" ... "G+14 Floors". Final text is always rendered for SSR/a11y.
 */
export function CountUp({ text, duration = 0.9, delay = 0 }: { text: string; duration?: number; delay?: number }) {
  const { reducedMotion } = useMotionSettings();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.5 });

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion) return;
    const render = (p: number) =>
      text.replace(/\d+/g, (n) => Math.round(Number(n) * p).toLocaleString('en-IN'));

    if (!inView) {
      el.textContent = render(0);
      return;
    }

    const controls = animate(0, 1, {
      duration,
      delay,
      ease: easeOut,
      onUpdate: (p) => { el.textContent = render(p); },
      onComplete: () => { el.textContent = text; },
    });
    return () => controls.stop();
  }, [inView, reducedMotion, text, duration, delay]);

  return <span ref={ref} aria-label={text} className="tabular-nums">{text}</span>;
}
