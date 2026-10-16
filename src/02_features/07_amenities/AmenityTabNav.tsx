import ChevronLeftRounded from '@mui/icons-material/ChevronLeftRounded';
import { getScrollBehavior } from '../../03_shared/04_motion/useMotionSettings';
import ChevronRightRounded from '@mui/icons-material/ChevronRightRounded';
import { cn } from '../../03_shared/03_utils/utils';
import { ActionButton } from '../../03_shared/02_ui/ActionButton';
import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';


interface AmenityTabNavProps {
  activeTab: string;
  setActiveTab: (id: string) => void;
  amenitiesData: Array<{ id: string; tabLabel: string }>;
}


const AmenityTabNav: React.FC<AmenityTabNavProps> = ({ activeTab, setActiveTab, amenitiesData }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Check scroll position to show/hide arrows
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
  }, [amenitiesData]);

  // Keep active tab near the middle when possible
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

  // Handle arrow clicks
  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: getScrollBehavior()
      });
    }
  };

  return (
    <div className="w-full relative group">
      {/* LEFT ARROW */}
      {canScrollLeft && (
        <div className="absolute left-2 top-0.5 bottom-0.5 w-12 z-20 pointer-events-none rounded-l-[7px] flex items-center justify-start pl-1">
          <ActionButton
            onClick={() => scroll('left')}
            className="pointer-events-auto p-1.5 rounded-full text-ink bg-transparent hover:bg-transparent transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeftRounded className="w-[18px] h-[18px]" />
          </ActionButton>
        </div>
      )}

      {/* SCROLLABLE CONTAINER */}
      <div
        ref={scrollContainerRef}
        onScroll={checkScroll}
        className="relative flex items-center p-1 rounded-[2px] overflow-x-auto touch-pan-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth"
      >
        <div className="flex min-w-max flex-nowrap gap-1.5 px-0.5">
          {amenitiesData.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <ActionButton
                key={tab.id}
                ref={(el) => {
                  if (el) buttonRefs.current.set(tab.id, el);
                  else buttonRefs.current.delete(tab.id);
                }}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex-none py-1.5 px-3 sm:px-3.5 md:px-4 transition-all duration-200 z-10 outline-none flex items-center justify-center rounded-tab border ${
                  isActive
                    ? 'border-transparent bg-transparent text-white'
                    : 'border-transparent bg-surface-muted hover:bg-outline shadow-none text-ink'
                }`}

              >
                {isActive && (
                  <motion.div
                    layoutId="amenity-active-pill"
                    className={cn("absolute inset-0 rounded-[3px] -z-10", "bg-active-gradient")}

                    transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
                  />
                )}
                <span className="relative z-20 text-[11px] tracking-widest font-bold whitespace-nowrap">
                  {tab.tabLabel}
                </span>
              </ActionButton>
            );
          })}
        </div>
      </div>

      {/* RIGHT ARROW */}
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
};

export default AmenityTabNav;
