import type { ReactNode } from 'react';
import Dialog from '@mui/material/Dialog';
import { cn } from '../03_utils/utils';
import { useMotionSettings } from '../04_motion/useMotionSettings';

type AppDialogProps = {
  open: boolean;
  onClose: () => void;
  label: string;
  children: ReactNode;
  paperClassName?: string;
  backdropClassName?: string;
  containerClassName?: string;
};

export function AppDialog({ open, onClose, label, children, paperClassName, backdropClassName, containerClassName }: AppDialogProps) {
  const { reducedMotion } = useMotionSettings();
  return (
    <Dialog
      open={open}
      transitionDuration={reducedMotion ? 0 : undefined}
      onClose={onClose}
      aria-describedby={undefined}
      maxWidth={false}
      slotProps={{
        backdrop: { className: cn('bg-black/35 backdrop-blur-md', backdropClassName) },
        container: { className: cn('p-3', containerClassName) },
        paper: {
          'aria-label': label,
          elevation: 0,
          className: cn('m-0 max-h-[90dvh] max-w-full bg-transparent bg-none shadow-none', paperClassName),
        },
      }}
    >
      {children}
    </Dialog>
  );
}
