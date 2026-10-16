import IconButton from '@mui/material/IconButton';
import CloseRounded from '@mui/icons-material/CloseRounded';
import ChevronLeftRounded from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRounded from '@mui/icons-material/ChevronRightRounded';
import { AppDialog } from './AppDialog';

type ImageDialogProps = {
  open: boolean;
  src: string;
  alt: string;
  onClose: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  counter?: string;
  backdropClassName?: string;
};

export function ImageDialog({ open, src, alt, onClose, onPrevious, onNext, counter, backdropClassName = 'bg-black/95' }: ImageDialogProps) {
  return (
    <AppDialog open={open} onClose={onClose} label={alt}
      backdropClassName={`${backdropClassName} backdrop-blur-sm`}
      containerClassName="p-0" paperClassName="w-full h-full max-h-none rounded-none">
      <div className="relative flex h-full items-center justify-center p-4" onClick={onClose}>
        <IconButton aria-label="Close image viewer" autoFocus
          className="absolute top-6 right-6 z-10 p-0 text-white/70 hover:text-white"
          onClick={onClose}>
          <CloseRounded className="size-7" />
        </IconButton>
        {onPrevious && (
          <IconButton aria-label="Previous image"
            className="absolute left-4 md:left-8 z-10 p-2 text-white/50 hover:text-white"
            onClick={event => { event.stopPropagation(); onPrevious(); }}>
            <ChevronLeftRounded className="size-12" />
          </IconButton>
        )}
        <img src={src} alt={alt} className="max-w-full max-h-[80vh] object-contain rounded-control shadow-2xl"
          onClick={event => event.stopPropagation()} />
        {onNext && (
          <IconButton aria-label="Next image"
            className="absolute right-4 md:right-8 z-10 p-2 text-white/50 hover:text-white"
            onClick={event => { event.stopPropagation(); onNext(); }}>
            <ChevronRightRounded className="size-12" />
          </IconButton>
        )}
        {counter && <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 text-[10px] font-bold tracking-[0.3em]">{counter}</div>}
      </div>
    </AppDialog>
  );
}
