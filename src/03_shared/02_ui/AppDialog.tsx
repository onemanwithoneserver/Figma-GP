import type { ReactNode } from 'react';
import Dialog from '@mui/material/Dialog';
import { cn } from '../03_utils/utils';
import { useMotionSettings } from '../04_motion/useMotionSettings';

type AppDialogProps = {
  open: boolean;
  onClose: () => void;
  label: string;
  children: ReactNode;
  fullScreen?: boolean;
  paperClassName?: string;
  backdropClassName?: string;
  containerClassName?: string;
};

export function AppDialog({ open, onClose, label, children, fullScreen = false, paperClassName, backdropClassName, containerClassName }: AppDialogProps) {
  const { reducedMotion } = useMotionSettings();
  return (
    <Dialog
      open={open}
      fullScreen={fullScreen}
      transitionDuration={reducedMotion ? 0 : undefined}
      onClose={onClose}
      aria-describedby={undefined}
      maxWidth={false}
      slotProps={{
        backdrop: { className: cn('bg-black/35 backdrop-blur-md', backdropClassName) },
        container: { className: cn(fullScreen ? 'p-0' : 'p-3', containerClassName) },
        paper: {
          'aria-label': label,
          elevation: 0,
          className: cn(
            'm-0 max-w-full bg-transparent bg-none shadow-none',
            fullScreen ? 'h-[100dvh] max-h-[100dvh] w-full rounded-none overflow-hidden' : 'max-h-[90dvh]',
            paperClassName,
          ),
        },
      }}
    >
      {children}
    </Dialog>
  );
}
