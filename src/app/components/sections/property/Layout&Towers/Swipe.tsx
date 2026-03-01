import React, { useMemo, useRef } from 'react';

type SwipeProps = {
  activeTab: string;
  onTabChange: (tabId: string) => void;
  children: React.ReactNode;
  className?: string;
};

const swipeTabs = [
  'shlok',
  'ayush',
  'ananta',
  'advait',
  'vihaan',
  'ishan',
  'aarav',
  'kavya',
];

const SWIPE_THRESHOLD = 40;

const Swipe: React.FC<SwipeProps> = ({ activeTab, onTabChange, children, className }) => {
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  const activeIndex = useMemo(() => {
    return swipeTabs.indexOf(activeTab);
  }, [activeTab]);

  const moveTo = (nextIndex: number) => {
    const clampedIndex = Math.max(0, Math.min(nextIndex, swipeTabs.length - 1));
    const nextTab = swipeTabs[clampedIndex];
    if (nextTab && nextTab !== activeTab) {
      onTabChange(nextTab);
    }
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartXRef.current = event.changedTouches[0]?.clientX ?? null;
    touchStartYRef.current = event.changedTouches[0]?.clientY ?? null;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    const startX = touchStartXRef.current;
    const startY = touchStartYRef.current;
    const endX = event.changedTouches[0]?.clientX ?? null;
    const endY = event.changedTouches[0]?.clientY ?? null;

    if (startX === null || startY === null || endX === null || endY === null) {
      touchStartXRef.current = null;
      touchStartYRef.current = null;
      return;
    }

    const deltaX = endX - startX;
    const deltaY = endY - startY;

    if (Math.abs(deltaX) <= Math.abs(deltaY)) {
      touchStartXRef.current = null;
      touchStartYRef.current = null;
      return;
    }

    if (Math.abs(deltaX) < SWIPE_THRESHOLD) {
      touchStartXRef.current = null;
      touchStartYRef.current = null;
      return;
    }

    if (activeIndex < 0) {
      touchStartXRef.current = null;
      touchStartYRef.current = null;
      return;
    }

    if (deltaX < 0) {
      moveTo(activeIndex + 1);
    } else {
      moveTo(activeIndex - 1);
    }

    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  return (
    <div
      className={`w-full bg-transparent touch-pan-y ${className ?? ''}`.trim()}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Swipe to change Layout & Towers content"
    >
      {children}
    </div>
  );
};

export default Swipe;
