import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface BHKTabNavProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const COLORS = {
  primary: '#332823',      // Dark brand charcoal matching L&T nav
  container: '#E8E7E2',    // Warm off-white
  textInactive: '#332823', 
  white: '#FFFFFF',
};

export default function BHKTabNav({ tabs, activeTab, onTabChange }: BHKTabNavProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Check scroll position to show/hide arrows with a 2px threshold for exact hiding
  const checkScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setCanScrollLeft(scrollLeft > 2); 
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 2);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [tabs]);

  // Center the scroll on the active tab if it overflows
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const activeElement = Array.from(container.querySelectorAll('button')).find(
        (btn) => btn.textContent?.toLowerCase() === activeTab.toLowerCase()
      );
      
      if (activeElement) {
        const containerWidth = container.offsetWidth;
        const buttonLeft = activeElement.offsetLeft;
        const buttonWidth = activeElement.offsetWidth;
        const scrollPosition = buttonLeft - (containerWidth / 2) + (buttonWidth / 2);
        container.scrollTo({ left: scrollPosition, behavior: 'smooth' });
      }
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
    <div className="w-fit max-w-full mb-4 mx-auto my-3 relative group">
      
      {/* LEFT FADE OVERLAY & ARROW */}
      {canScrollLeft && (
        <div 
          className="absolute left-0 top-0.5 bottom-0.5 w-auto z-20 pointer-events-none rounded-l-[7px] flex items-center justify-start pl-1"
          style={{
            background: `linear-gradient(to right, ${COLORS.container} 40%, transparent)`,
          }}
        >
          <button 
            onClick={() => scroll('left')}
            className="pointer-events-auto p-1 rounded-full text-[#332823] hover:bg-black/10 transition-colors"
            aria-label="Scroll left"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </button>
        </div>
      )}

      {/* RIGHT FADE OVERLAY & ARROW */}
      {canScrollRight && (
        <div 
          className="absolute right-0 top-0.5 bottom-0.5 w-12 z-20 pointer-events-none rounded-r-[7px] flex items-center justify-end pr-1"
          style={{
            background: `linear-gradient(to left, ${COLORS.container} 40%, transparent)`,
          }}
        >
          <button 
            onClick={() => scroll('right')}
            className="pointer-events-auto p-1 rounded-full text-[#332823] hover:bg-black/10 transition-colors"
            aria-label="Scroll right"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </button>
        </div>
      )}

      {/* SCROLLABLE CONTAINER */}
      <div 
        ref={scrollContainerRef}
        onScroll={checkScroll}
        style={{ 
            backgroundColor: COLORS.container, 
            borderColor: '#E8E2D9' 
        }}
        className="relative w-fit max-w-full flex items-center p-1 rounded-[7px] border overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth"
      >
        <div className="flex gap-1 px-0.5 w-max">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            
            return (
              <button
                key={tab}
                onClick={() => onTabChange(tab)}
                className="relative w-auto shrink-0 min-w-max py-1.5 px-3 transition-colors duration-300 z-10 outline-none flex items-center justify-center rounded-[7px]"
                style={{ color: isActive ? COLORS.white : COLORS.textInactive }}
              >
                {isActive && (
                  <motion.div
                    layoutId="bhk-active-pill"
                    className="absolute inset-0 rounded-[7px] -z-10"
                    style={{ background: COLORS.primary }}
                    transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                  />
                )}
                
                <span className="relative z-20 text-[11px] tracking-widest font-bold whitespace-nowrap uppercase">
                  {tab}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}