import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';


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
        behavior: 'smooth',
      });
    }
  }, [activeTab]);

  // Handle arrow clicks
  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="w-full relative group">
      {/* LEFT ARROW */}
      {canScrollLeft && (
        <div className="absolute left-2 top-0.5 bottom-0.5 w-12 z-20 pointer-events-none rounded-l-[7px] flex items-center justify-start pl-1">
          <button
            onClick={() => scroll('left')}
            className="pointer-events-auto p-1.5 rounded-full text-[#322822] bg-transparent hover:bg-transparent transition-colors"
            aria-label="Scroll left"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </button>
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
              <button
                key={tab.id}
                ref={(el) => {
                  if (el) buttonRefs.current.set(tab.id, el);
                  else buttonRefs.current.delete(tab.id);
                }}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex-none py-1.5 px-3 sm:px-3.5 md:px-4 transition-all duration-200 z-10 outline-none flex items-center justify-center rounded-[4px] border ${
                  isActive
                    ? 'border-transparent bg-transparent'
                    : 'border-transparent bg-[#F4EFE6] hover:bg-[#E5DFD4] shadow-none'
                }`}
                style={{ color: isActive ? '#FFFFFF' : '#322822' }}
              >
                {isActive && (
                  <motion.div
                    layoutId="amenity-active-pill"
                    className="absolute inset-0 rounded-[3px] -z-10"
                    style={{
                      background: 'linear-gradient(135deg, #F85B01, #C94A00)'
                    }}
                    transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
                  />
                )}
                <span className="relative z-20 text-[11px] tracking-widest font-bold whitespace-nowrap">
                  {tab.tabLabel}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* RIGHT ARROW */}
      {canScrollRight && (
        <div className="absolute right-2 top-0.5 bottom-0.5 w-12 z-20 pointer-events-none rounded-r-[7px] flex items-center justify-end pr-1">
          <button
            onClick={() => scroll('right')}
            className="pointer-events-auto p-1.5 rounded-full text-[#322822] bg-transparent hover:bg-transparent transition-colors"
            aria-label="Scroll right"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default AmenityTabNav;
