import React, { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import { useMotionSettings } from '../../03_shared/04_motion/useMotionSettings';

const MOODS = [
  { emoji: '😞', label: 'Sad', color: '#EF4444' },
  { emoji: '😕', label: 'Unsure', color: '#F59E0B' },
  { emoji: '🙂', label: 'Pleased', color: '#84B84A' },
  { emoji: '😄', label: 'Happy', color: '#22A66A' },
] as const;

interface RoomPreferenceRowProps {
  name: string;
  dimensions: string;
  icon: React.ReactNode;
}

export default function RoomPreferenceRow({ name, dimensions, icon }: RoomPreferenceRowProps) {
  const { reducedMotion } = useMotionSettings();
  const panelId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isDragging = useRef(false);
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 128 });
  const [rating, setRating] = useState<number | null>(null);
  const mood = rating === null ? null : MOODS[rating];

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  const openPicker = () => {
    cancelClose();
    setIsOpen(true);
  };

  const scheduleClose = () => {
    cancelClose();
    if (isDragging.current) return;
    closeTimer.current = setTimeout(() => setIsOpen(false), 180);
  };

  const closePicker = () => {
    cancelClose();
    if (panelRef.current?.contains(document.activeElement)) triggerRef.current?.focus();
    setIsOpen(false);
  };

  const selectRating = (value: number) => {
    setRating(value);
    closePicker();
  };

  const handleBlur = (event: React.FocusEvent) => {
    const next = event.relatedTarget as Node | null;
    if (!triggerRef.current?.contains(next) && !panelRef.current?.contains(next)) {
      setIsOpen(false);
    }
  };

  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  useLayoutEffect(() => {
    if (!isOpen) return;
    const updatePosition = () => {
      const rect = triggerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const width = Math.min(128, window.innerWidth - 24);
      const height = panelRef.current?.offsetHeight || 44;
      const below = rect.bottom + 4;
      setPosition({
        width,
        left: Math.max(12, Math.min(rect.right - width, window.innerWidth - width - 12)),
        top: Math.max(12, below + height <= window.innerHeight - 12 ? below : rect.top - height - 4),
      });
    };
    const dismissOutside = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!triggerRef.current?.contains(target) && !panelRef.current?.contains(target)) {
        setIsOpen(false);
      }
    };
    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);
    document.addEventListener('pointerdown', dismissOutside);
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
      document.removeEventListener('pointerdown', dismissOutside);
    };
  }, [isOpen]);

  return (
    <div
      onBlurCapture={handleBlur}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          event.stopPropagation();
          closePicker();
        }
      }}
      className="relative flex items-center justify-between gap-2 rounded-[5px] border border-[#EFE9DF] bg-[#FCFAF7] py-1 pl-2 pr-1"
    >
      <span className="flex min-w-0 items-center gap-1.5">
        {icon}
        <span className="truncate text-[10px] font-medium text-[#554E48]">{name}</span>
      </span>
      <span className="ml-auto shrink-0 text-[10px] font-bold text-[#241E1A]">{dimensions}</span>
      <button
        ref={triggerRef}
        type="button"
        onPointerEnter={(event) => {
          if (event.pointerType === 'mouse') openPicker();
        }}
        onPointerLeave={scheduleClose}
        onClick={(event) => {
          openPicker();
          if (event.detail === 0) {
            requestAnimationFrame(() => panelRef.current?.querySelector('button')?.focus());
          }
        }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown') {
            event.preventDefault();
            openPicker();
            requestAnimationFrame(() => panelRef.current?.querySelector('button')?.focus());
          }
        }}
        onFocus={openPicker}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls={isOpen ? panelId : undefined}
        aria-label={`${name}, ${dimensions}. ${mood ? `Feeling ${mood.label.toLowerCase()}.` : 'Rate this room.'}`}
        className="flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-full bg-transparent text-[16px] text-[#A68A56] focus-visible:outline-2 focus-visible:outline-[#A68A56]"
      >
        <span aria-hidden="true">{mood?.emoji ?? '☺'}</span>
      </button>

      {createPortal(<AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            ref={panelRef}
            id={panelId}
            role="dialog"
            aria-label={`Rate ${name}`}
            style={position}
            onPointerEnter={cancelClose}
            onPointerLeave={scheduleClose}
            onPointerDown={(event) => event.stopPropagation()}
            onClick={(event) => event.stopPropagation()}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: reducedMotion ? 0 : 0.18 }}
            className="fixed z-[10000] rounded-xl border border-white/70 bg-white/45 bg-gradient-to-br from-white/60 via-white/10 to-[#F3E5CF]/30 backdrop-blur-xl backdrop-saturate-150 shadow-[0_6px_20px_rgba(60,42,20,0.12),inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-1px_0_rgba(255,255,255,0.35)]"
          >
            <div className="p-0.5">
              <span aria-live="polite" className="sr-only">{mood?.label ?? 'Slide to rate'}</span>
              <div className="grid grid-cols-4">
                {MOODS.map((option, index) => (
                  <button
                    key={option.label}
                    type="button"
                    aria-label={`${name}: ${option.label}`}
                    title={option.label}
                    aria-pressed={rating === index}
                    onClick={() => selectRating(index)}
                    className={`flex h-6 cursor-pointer items-center justify-center rounded-sm border-b-2 bg-transparent focus-visible:outline-2 focus-visible:outline-[#A68A56] ${
                      rating === index
                        ? 'border-[#A67C43]'
                        : 'border-transparent hover:border-[#D8B88C]'
                    }`}
                  >
                    <span aria-hidden="true" className="text-[16px] leading-none">{option.emoji}</span>
                  </button>
                ))}
              </div>
              <div className="mx-[calc(12.5%-6px)]">
                <input
                  type="range"
                  min={0}
                  max={3}
                  step={1}
                  value={rating ?? 0}
                  style={{ '--mood-color': mood?.color ?? MOODS[0].color } as React.CSSProperties}
                  aria-label={`How ${name} makes you feel`}
                  aria-valuetext={mood?.label ?? 'Not rated'}
                  onChange={(event) => setRating(Number(event.target.value))}
                  onPointerDown={() => {
                    cancelClose();
                    isDragging.current = true;
                  }}
                  onPointerUp={(event) => {
                    isDragging.current = false;
                    selectRating(Number(event.currentTarget.value));
                  }}
                  onPointerCancel={() => {
                    isDragging.current = false;
                    scheduleClose();
                  }}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') selectRating(Number(event.currentTarget.value));
                  }}
                  className="block h-4 w-full cursor-pointer appearance-none rounded-full bg-transparent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A68A56] [&::-webkit-slider-runnable-track]:h-1 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-gradient-to-r [&::-webkit-slider-runnable-track]:from-[#EF4444] [&::-webkit-slider-runnable-track]:via-[#F5C451] [&::-webkit-slider-runnable-track]:to-[#22A66A] [&::-webkit-slider-thumb]:-mt-1 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-[var(--mood-color)] [&::-webkit-slider-thumb]:shadow-sm [&::-moz-range-track]:h-1 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-gradient-to-r [&::-moz-range-track]:from-[#EF4444] [&::-moz-range-track]:via-[#F5C451] [&::-moz-range-track]:to-[#22A66A] [&::-moz-range-thumb]:box-border [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-[var(--mood-color)]"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>, document.body)}
    </div>
  );
}
