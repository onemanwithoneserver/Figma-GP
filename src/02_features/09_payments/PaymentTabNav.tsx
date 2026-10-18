import React, { useEffect, useRef, useState } from 'react';
import ChevronLeftRounded from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRounded from '@mui/icons-material/ChevronRightRounded';
import { motion } from 'motion/react';
import { ActionButton } from '../../03_shared/02_ui/ActionButton';
import { getScrollBehavior } from '../../03_shared/04_motion/useMotionSettings';
import { cn } from '../../03_shared/03_utils/utils';

export interface PaymentTabItem {
  id: string;
  label: string;
}

interface PaymentTabNavProps {
  tabs: PaymentTabItem[];
  activeTab: string;
  onTabClick: (id: string) => void;
}

export default function PaymentTabNav({ tabs, activeTab, onTabClick }: PaymentTabNavProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 2);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 2);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [tabs]);

  useEffect(() => {
    const activeBtn = buttonRefs.current.get(activeTab);
    const container = scrollContainerRef.current;

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

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 180;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: getScrollBehavior(),
      });
    }
  };

  return (
    <div className="w-full relative group mb-1">

      {canScrollLeft && (
        <div className="absolute left-1 top-0.5 bottom-0.5 w-10 z-20 pointer-events-none rounded-l-[4px] flex items-center justify-start pl-0.5">
          <ActionButton
            onClick={() => scroll('left')}
            className="pointer-events-auto w-6 h-6 rounded-full bg-white text-[#241E1A] shadow-md hover:shadow-lg border border-[#EAE3D9] flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 hover:text-[#F85B01]"
            aria-label="Scroll left"
          >
            <ChevronLeftRounded className="w-4 h-4" />
          </ActionButton>
        </div>
      )}

      <div
        ref={scrollContainerRef}
        onScroll={checkScroll}
        role="tablist"
        aria-label="Payment Plans and Offers tabs"
        className={cn(
          "relative flex items-center p-1 rounded-[4px] overflow-x-auto touch-pan-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth",
          "scrollbar-hide"
        )}
      >
        <div className="flex min-w-max flex-nowrap gap-1.5 px-0.5">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <ActionButton
                key={tab.id}
                id={`payment-tab-${tab.id}`}
                role="tab"
                aria-selected={isActive}
                aria-controls={`payment-panel-${tab.id}`}
                ref={(el) => {
                  if (el) buttonRefs.current.set(tab.id, el);
                  else buttonRefs.current.delete(tab.id);
                }}
                onClick={() => onTabClick(tab.id)}
                className={`relative flex-none py-1.5 px-3.5 sm:px-4 transition-all duration-200 z-10 outline-none flex items-center justify-center rounded-[3px] border ${
                  isActive
                    ? 'border-transparent bg-transparent text-white'
                    : 'border-transparent bg-surface-muted hover:bg-outline shadow-none text-ink'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="payment-active-pill"
                    className={cn("absolute inset-0 rounded-[3px] -z-10", "bg-active-gradient")}
                    transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
                  />
                )}
                <span className="relative z-20 text-[11px] tracking-wide font-bold whitespace-nowrap">
                  {tab.label}
                </span>
              </ActionButton>
            );
          })}
        </div>
      </div>

      {canScrollRight && (
        <div className="absolute right-1 top-0.5 bottom-0.5 w-10 z-20 pointer-events-none rounded-r-[4px] flex items-center justify-end pr-0.5">
          <ActionButton
            onClick={() => scroll('right')}
            className="pointer-events-auto w-6 h-6 rounded-full bg-white text-[#241E1A] shadow-md hover:shadow-lg border border-[#EAE3D9] flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 hover:text-[#F85B01]"
            aria-label="Scroll right"
          >
            <ChevronRightRounded className="w-4 h-4" />
          </ActionButton>
        </div>
      )}
    </div>
  );
}
