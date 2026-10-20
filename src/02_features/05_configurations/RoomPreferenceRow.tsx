import React, { useState } from 'react';

import { motion, useReducedMotion } from 'motion/react';

const MOODS = [
  { emoji: '👎', label: 'Not for me' },
  { emoji: '👍', label: 'Like' },
  { emoji: '❤️', label: 'Love' },
  { emoji: '🤩', label: 'Love it most' },
] as const;

const ROW_LAYOUT = 'grid grid-cols-[minmax(0,1fr)_52px_repeat(4,24px)] items-center gap-x-1 border px-2';

interface RoomPreferenceRowProps {
  name: string;
  dimensions: string;
  icon: React.ReactNode;
}

function RatingEmoji({ index, active = true }: { index: number; active?: boolean }) {
  const reducedMotion = useReducedMotion();
  const animate = active && !reducedMotion;

  return (
    <motion.span
      aria-hidden="true"
      className="inline-block leading-none"
      initial={false}
      animate={animate
        ? index === 2
          ? { scale: [1, 1.15, 1, 1.08, 1], y: 0, rotate: 0 }
          : { y: [0, -2, 0], rotate: [0, index === 0 ? 7 : -7, 0], scale: [1, 1.06, 1] }
        : { scale: 1, y: 0, rotate: 0 }}
      transition={{ duration: animate ? 0.9 : 0, repeat: animate ? Infinity : 0, repeatDelay: index === 2 ? 1.6 : 2.4, ease: 'easeInOut' }}
    >
      {MOODS[index].emoji}
    </motion.span>
  );
}

export function RoomPreferenceHeader() {
  return (
    <div role="row" className={`${ROW_LAYOUT} border-transparent py-0.5`}>
      <span role="columnheader" className="text-[9px] font-medium text-[#8B8174]">Room</span>
      <span role="columnheader" className="text-[9px] font-medium text-[#8B8174]">Dimensions</span>
      {MOODS.map((option, index) => (
        <span
          key={option.label}
          role="columnheader"
          aria-label={option.label}
          title={option.label}
          className="flex h-6 items-center justify-center text-[16px] leading-none"
        >
          <RatingEmoji index={index} />
        </span>
      ))}
    </div>
  );
}

export default function RoomPreferenceRow({ name, dimensions, icon }: RoomPreferenceRowProps) {
  const [rating, setRating] = useState<number | null>(null);
  const [isSliding, setIsSliding] = useState(false);
  const sliderProgress = (rating ?? 0) / (MOODS.length - 1);

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
        className="group/rating relative col-span-4 h-6 rounded-full has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[#A68A56]"
      >
        <span
          aria-hidden="true"
          style={{ left: `calc(${sliderProgress * 100}% + ${12 - sliderProgress * 24}px)` }}
          className={`pointer-events-none absolute top-1/2 z-20 flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center text-[18px] leading-none transition-opacity duration-150 motion-reduce:transition-none ${
            isSliding ? 'opacity-100' : 'opacity-75 group-hover/rating:opacity-100 group-has-[:focus-visible]/rating:opacity-100'
          }`}
        >
          <RatingEmoji key={rating ?? 0} index={rating ?? 0} active={rating !== null || isSliding} />
        </span>
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute left-3 right-3 top-1/2 h-1 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#EF4444] via-[#F5C451] to-[#22A66A] transition-opacity duration-150 motion-reduce:transition-none ${
            isSliding ? 'opacity-100' : 'opacity-45 group-hover/rating:opacity-100 group-has-[:focus-visible]/rating:opacity-100'
          }`}
        />
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
