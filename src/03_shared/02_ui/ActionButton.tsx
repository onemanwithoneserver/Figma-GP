import { forwardRef, type ComponentProps } from 'react';
import MuiButton, { type ButtonProps } from '@mui/material/Button';
import { motion } from 'motion/react';
import { useMotionSettings } from '../04_motion/useMotionSettings';

export const ActionButton = forwardRef<HTMLButtonElement, ButtonProps>(
  function ActionButton({ type = 'button', ...props }, ref) {
    return <MuiButton ref={ref} type={type} {...props} />;
  },
);

const AnimatedButton = motion.create(ActionButton);

export const MotionButton = forwardRef<HTMLButtonElement, ComponentProps<typeof AnimatedButton>>(
  function MotionButton({ disabled, whileHover, whileTap, transition, ...props }, ref) {
    const settings = useMotionSettings();
    const stationary = disabled || settings.reducedMotion;
    return <AnimatedButton ref={ref} {...props} disabled={disabled}
      whileHover={stationary ? undefined : (whileHover ?? { scale: 1.02 })}
      whileTap={stationary ? undefined : (whileTap ?? { scale: 0.97 })}
      transition={settings.reducedMotion ? { duration: 0 } : (transition ?? { type: 'spring', stiffness: 420, damping: 28 })} />;
  },
);
