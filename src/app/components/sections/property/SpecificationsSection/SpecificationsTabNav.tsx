import React, { useEffect, useRef, useState } from 'react';

interface TabInfo {
  id: string;
  label: string;
}

interface TabNavigationProps {
  tabs: TabInfo[];
  activeTab: string;
  onTabClick: (id: string) => void;
}

export default function TabNavigation({ tabs, activeTab, onTabClick }: TabNavigationProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
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
  }, [tabs]);

  // Scroll active tab into view smoothly
  useEffect(() => {
    if (scrollContainerRef.current) {
      const activeElement = scrollContainerRef.current.querySelector(`[data-id="${activeTab}"]`);
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
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative w-full rounded-[7px] bg-[#EBE9E2] flex items-center p-1.5 mb-2">
      
      {/* LEFT ARROW & FADE */}
      {canScrollLeft && (
        <div className="absolute left-0 top-0 bottom-0 w-20 z-20 pointer-events-none flex items-center justify-start pl-2.5">
          {/* Solid background under the arrow, fading to transparent to the right */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#EBE9E2] via-[#EBE9E2] to-transparent -z-10 rounded-l-[7px] from-40%"></div>
          
          <button 
            onClick={() => scroll('left')}
            className="pointer-events-auto text-[#152B3C] hover:opacity-70 transition-opacity"
            aria-label="Scroll left"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </button>
        </div>
      )}

      {/* SCROLLABLE CONTAINER */}
      <div 
        ref={scrollContainerRef}
        onScroll={checkScroll}
        className="flex overflow-x-auto gap-1 w-full relative z-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth"
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              data-id={tab.id}
              onClick={() => onTabClick(tab.id)}
              className={`flex-shrink-0 px-4 py-1.5 text-[13.5px] font-bold tracking-wide rounded-[5px] transition-all duration-200 outline-none flex items-center justify-center
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

      {/* RIGHT ARROW & FADE */}
      {canScrollRight && (
        <div className="absolute right-0 top-0 bottom-0 w-20 z-20 pointer-events-none flex items-center justify-end pr-2.5">
          {/* Solid background under the arrow, fading to transparent to the left */}
          <div className="absolute inset-0 bg-gradient-to-l from-[#EBE9E2] via-[#EBE9E2] to-transparent -z-10 rounded-r-[7px] from-40%"></div>
          
          <button 
            onClick={() => scroll('right')}
            className="pointer-events-auto text-[#152B3C] hover:opacity-70 transition-opacity"
            aria-label="Scroll right"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </button>
        </div>
      )}

    </div>
  );
}