import { getScrollBehavior } from '../../03_shared/04_motion/useMotionSettings';
import ChevronRightRounded from '@mui/icons-material/ChevronRightRounded';
import { cn } from '../../03_shared/03_utils/utils';
import { ActionButton } from '../../03_shared/02_ui/ActionButton';
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { TabInfo } from './commuteData';

interface TabNavigationProps {
  tabs: TabInfo[];
  activeTab: string;
  onTabClick: (id: string) => void;
}

export default function TabNavigation({ tabs, activeTab, onTabClick }: TabNavigationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Check scroll position to show/hide arrows
  const checkScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      // Added a 2px threshold so the arrow strictly disappears when reaching the edge
      setCanScrollLeft(scrollLeft > 2);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 2);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [tabs]);

  // Keep active tab near the middle when possible
  useEffect(() => {
    const activeBtn = buttonRefs.current.get(activeTab);
    const container = containerRef.current;

    if (activeBtn && container) {
      const targetLeft = activeBtn.offsetLeft - (container.clientWidth - activeBtn.offsetWidth) / 2;
      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      const clampedLeft = Math.max(0, Math.min(targetLeft, maxScrollLeft));

      container.scrollTo({
        left: clampedLeft,
        behavior: getScrollBehavior(),
      });
    }
  }, [activeTab]);

  // Handle arrow clicks
  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const scrollAmount = 200; // Increased to ensure a solid chunk gets revealed per click
      containerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: getScrollBehavior()
      });
    }
  };

  return (
    <div className="w-full px-2 relative group">

      {/* Left Arrow */}
      {canScrollLeft && (
        <div className="absolute left-2 top-0.5 bottom-0.5 w-12 z-20 pointer-events-none rounded-l-[7px] flex items-center justify-start pl-1">
          <ActionButton
            onClick={() => scroll('left')}
            className="pointer-events-auto p-1.5 rounded-full text-ink bg-transparent hover:bg-transparent transition-colors"
            aria-label="Scroll left"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </ActionButton>
        </div>
      )}

      {/* Scrollable Container */}
      <div
        ref={containerRef}
        onScroll={checkScroll}
        className={cn("relative flex items-center p-1 rounded-[2px] overflow-x-auto touch-pan-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth", "scrollbar-hide")}

      >
        <div className="flex min-w-max flex-nowrap gap-1.5 px-0.5">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <ActionButton
                key={tab.id}
                ref={(el) => {
                  if (el) buttonRefs.current.set(tab.id, el);
                  else buttonRefs.current.delete(tab.id);
                }}
                onClick={() => onTabClick(tab.id)}
                className={`relative flex-none py-1.5 px-3 sm:px-3.5 md:px-4 transition-all duration-200 z-10 outline-none flex items-center justify-center rounded-tab border ${
                  isActive
                    ? 'border-transparent bg-transparent text-white'
                    : 'border-transparent bg-surface-muted hover:bg-outline shadow-none text-ink'
                }`}

              >
                {isActive && (
                  <motion.div
                    layoutId="commute-active-pill"
                    className={cn("absolute inset-0 rounded-[3px] -z-10 -px-4", "bg-active-gradient")}

                    transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
                  />
                )}
                <span className="relative z-20 text-[11px] tracking-widest font-bold whitespace-nowrap">
                  {tab.label}
                </span>
              </ActionButton>
            );
          })}
        </div>
      </div>

      {/* Right Arrow */}
      {canScrollRight && (
        <div className="absolute right-2 top-0.5 bottom-0.5 w-12 z-20 pointer-events-none rounded-r-[7px] flex items-center justify-end pr-1">
          <ActionButton
            onClick={() => scroll('right')}
            className="pointer-events-auto p-1.5 rounded-full text-ink bg-transparent hover:bg-transparent transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRightRounded className={["", "w-[18px] h-[18px]"].join(' ')}  />
          </ActionButton>
        </div>
      )}

    </div>
  );
}