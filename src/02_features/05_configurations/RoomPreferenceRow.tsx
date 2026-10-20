import React, { useState } from 'react';

import { motion, useReducedMotion } from 'motion/react';

const MOODS = [
  { emoji: '😞', label: 'Sad' },
  { emoji: '😕', label: 'Unsure' },
  { emoji: '🙂', label: 'Pleased' },
  { emoji: '😄', label: 'Happy' },
] as const;

const ROW_LAYOUT = 'grid grid-cols-[minmax(0,1fr)_52px_repeat(4,24px)] items-center gap-x-1 border px-2';

interface RoomPreferenceRowProps {
  name: string;
  dimensions: string;
  icon: React.ReactNode;
}

export function RoomPreferenceHeader() {
  return (
    <div role="row" className={`${ROW_LAYOUT} border-transparent py-0.5`}>
      <span role="columnheader" className="text-[9px] font-medium text-[#8B8174]">Room</span>
      <span role="columnheader" className="text-[9px] font-medium text-[#8B8174]">Dimensions</span>
      {MOODS.map((option) => (
        <span
          key={option.label}
          role="columnheader"
          aria-label={option.label}
          title={option.label}
          className="flex h-6 items-center justify-center text-[16px] leading-none"
        >
          <span aria-hidden="true">{option.emoji}</span>
        </span>
      ))}
    </div>
  );
}

export default function RoomPreferenceRow({ name, dimensions, icon }: RoomPreferenceRowProps) {
  const [rating, setRating] = useState<number | null>(null);
  const [isSliding, setIsSliding] = useState(false);
  const selectionId = React.useId();
  const reducedMotion = useReducedMotion();

  return (
    <div role="row" className={`${ROW_LAYOUT} min-h-10 rounded-[5px] border-[#EFE9DF] bg-[#FCFAF7] py-1.5`}>
      <div role="rowheader" className="grid min-w-0 grid-cols-[12px_minmax(0,1fr)] items-center gap-1.5 pr-1">
        <span className="flex items-center justify-center">{icon}</span>
        <span className="text-[10px] font-medium leading-tight text-[#554E48]">{name}</span>
      </div>
      <span role="cell" className="whitespace-nowrap text-[10px] font-bold tabular-nums text-[#241E1A]">{dimensions}</span>
      <div
        role="cell"
        aria-colspan={4}
        className="relative col-span-4 h-6 rounded-full has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[#A68A56]"
      >
        <motion.div
          aria-hidden="true"
          initial={false}
          animate={{ opacity: isSliding ? 1 : 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.15 }}
          className="pointer-events-none absolute inset-0 rounded-full border border-[#E7C98C]/60 bg-gradient-to-r from-[#F8D5D0]/70 via-[#F8E8C4]/80 to-[#D7E8CC]/70"
        />
        <div aria-hidden="true" className="pointer-events-none grid grid-cols-4 gap-1">
          {MOODS.map((option, index) => {
            const isSelected = rating === index;
            return (
            <div
              key={option.label}
              className="relative isolate flex h-6 w-6 items-center justify-center rounded-full"
            >
              {isSelected && (
                <motion.span
                  aria-hidden="true"
                  layoutId={reducedMotion ? undefined : `emoji-selection-${selectionId}`}
                  initial={false}
                  transition={reducedMotion || isSliding ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 30 }}
                  className={`pointer-events-none absolute inset-0 rounded-full border ${
                    isSliding ? 'border-[#D9AE64] bg-white/70' : 'border-[#E7C98C]/50 bg-transparent'
                  }`}
                />
              )}
              <motion.span
                aria-hidden="true"
                initial={false}
                animate={{
                  scale: isSelected ? 1.1 : 0.75,
                  opacity: isSelected ? 1 : 0.35,
                  filter: isSelected ? 'grayscale(0)' : 'grayscale(1)',
                }}
                transition={reducedMotion || isSliding ? { duration: 0 } : {
                  scale: { type: 'spring', stiffness: 500, damping: 20 },
                  opacity: { duration: 0.18 },
                  filter: { duration: 0.18 },
                }}
                className={`relative flex h-5 w-5 items-center justify-center rounded-full text-[16px] leading-none ${
                  isSelected
                    ? ''
                    : 'shadow-[inset_0_1px_3px_rgba(60,42,20,0.2)]'
                }`}
              >
                {option.emoji}
              </motion.span>
            </div>
            );
          })}
        </div>
        <input
          type="range"
          min={0}
          max={3}
          step={1}
          value={rating ?? 0}
          aria-label={`Rate ${name}`}
          aria-valuetext={rating === null ? 'Not rated' : MOODS[rating].label}
          onChange={(event) => setRating(Number(event.target.value))}
          onPointerDown={() => setIsSliding(true)}
          onPointerUp={(event) => {
            setRating(Number(event.currentTarget.value));
            setIsSliding(false);
          }}
          onPointerCancel={() => setIsSliding(false)}
          onLostPointerCapture={() => setIsSliding(false)}
          onBlur={() => setIsSliding(false)}
          onKeyDown={(event) => {
            if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End', 'PageUp', 'PageDown'].includes(event.key)) {
              setIsSliding(true);
            }
          }}
          onKeyUp={() => setIsSliding(false)}
          className="absolute inset-0 z-10 m-0 h-6 w-full cursor-grab active:cursor-grabbing touch-none appearance-none bg-transparent opacity-0 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:appearance-none [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:border-0"
        />
      </div>
    </div>
  );
}
