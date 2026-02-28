import React, { useEffect, useRef, useState } from 'react';
import { TabInfo } from './commuteData';

interface TabNavigationProps {
  tabs: TabInfo[];
  activeTab: string;
  onTabClick: (id: string) => void;
}

export default function TabNavigation({ tabs, activeTab, onTabClick }: TabNavigationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
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

  // Scroll active tab into view
  useEffect(() => {
    if (containerRef.current) {
      const activeElement = containerRef.current.querySelector('[data-active="true"]');
      if (activeElement) {
        activeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center' 
        });
      }
    }
  }, [activeTab]);

  // Handle arrow clicks
  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const scrollAmount = 200; // Increased to ensure a solid chunk gets revealed per click
      containerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative w-full mb-2 group">
      
      {/* Left Arrow & Fade */}
      {canScrollLeft && (
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#EBE9E2] via-[#EBE9E2] to-transparent pointer-events-none rounded-l-[7px] z-30 flex items-center justify-start pl-1">
          <button 
            onClick={() => scroll('left')}
            className="pointer-events-auto p-1 rounded-full text-[#152B3C] hover:bg-black/10 transition-colors"
            aria-label="Scroll left"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </button>
        </div>
      )}

      {/* Scrollable Container */}
      <div 
        ref={containerRef}
        onScroll={checkScroll}
        className="flex overflow-x-auto gap-2 px-1.5 py-1.5 bg-[#EBE9E2] rounded-[7px] items-center relative z-20 [&::-webkit-scrollbar]:hidden" 
        style={{ scrollbarWidth: 'none' }}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              data-active={isActive}
              onClick={() => onTabClick(tab.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-[5px] text-[13px] font-bold tracking-wide transition-all duration-200 outline-none flex items-center justify-center
                ${isActive 
                  ? 'bg-[#332822] text-[#ffffff]' 
                  : 'bg-transparent text-[#152B3C] hover:bg-black/5'
                }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Right Arrow & Fade */}
      {canScrollRight && (
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#EBE9E2] via-[#EBE9E2] to-transparent pointer-events-none rounded-r-[7px] z-30 flex items-center justify-end pr-1">
          <button 
            onClick={() => scroll('right')}
            className="pointer-events-auto p-1 rounded-full text-[#152B3C] hover:bg-black/10 transition-colors"
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
}