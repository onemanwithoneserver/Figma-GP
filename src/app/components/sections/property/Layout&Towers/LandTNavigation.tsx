import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const COLORS = {
  primary: '#332823',      
  container: '#E8E7E2',    
  textInactive: '#332823', 
  white: '#FFFFFF',
};

const LandTNavigation = ({ activeTab, onTabChange }) => {
  const scrollContainerRef = useRef(null);
  const buttonRefs = useRef(new Map());
  
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Array of tabs
  const tabs = [
    { id: 'layout', label: 'Layout' },
    { id: 'shlok', label: 'Shlok' },
    { id: 'ayush', label: 'Ayush' },
    { id: 'ananta', label: 'Ananta' },
    { id: 'advait', label: 'Advait' },
    { id: 'vihaan', label: 'Vihaan' },
    { id: 'ishan', label: 'Ishan' },
    { id: 'aarav', label: 'Aarav' },
    { id: 'kavya', label: 'Kavya' },
  ];

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
  }, []);

  // Center the scroll on the active tab if it overflows
  useEffect(() => {
    const activeBtn = buttonRefs.current.get(activeTab);
    const container = scrollContainerRef.current;

    if (activeBtn && container) {
      const containerWidth = container.offsetWidth;
      const buttonLeft = activeBtn.offsetLeft;
      const buttonWidth = activeBtn.offsetWidth;
      const scrollPosition = buttonLeft - (containerWidth / 2) + (buttonWidth / 2);
      container.scrollTo({ left: scrollPosition, behavior: 'smooth' });
    }
  }, [activeTab]);

  // Handle arrow clicks
  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="w-full px-2 mb-4 relative group">
      
      {/* LEFT FADE OVERLAY & ARROW */}
      {canScrollLeft && (
        <div 
          className="absolute left-2 top-0.5 bottom-0.5 w-12 z-20 pointer-events-none rounded-l-[7px] flex items-center justify-start pl-1"
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
          className="absolute right-2 top-0.5 bottom-0.5 w-12 z-20 pointer-events-none rounded-r-[7px] flex items-center justify-end pr-1"
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

      <div 
        ref={scrollContainerRef}
        onScroll={checkScroll}
        style={{ 
            backgroundColor: COLORS.container, 
            borderColor: '#E8E2D9' 
        }}
        /* Container radius capped at 7px */
        className="relative flex items-center p-1 rounded-[7px] border overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth"
      >
        <div className="flex gap-1.5 px-0.5"> 
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                ref={(el) => {
                  if (el) buttonRefs.current.set(tab.id, el);
                  else buttonRefs.current.delete(tab.id);
                }}
                onClick={() => onTabChange(tab.id)}
                /* Button radius capped at 7px */
                className="relative flex-none py-1.5 px-4 transition-colors duration-300 z-10 outline-none flex items-center justify-center rounded-[7px]"
                style={{ color: isActive ? COLORS.white : COLORS.textInactive }}
              >
                {isActive && (
                  <motion.div
                    layoutId="landt-active-pill"
                    className="absolute inset-0 rounded-[7px] -z-10"
                    style={{ background: COLORS.primary }}
                    transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                  />
                )}
                
                {/* Text is kept small (11px) as requested */}
                <span className="relative z-20 text-[11px] tracking-widest font-bold whitespace-nowrap">
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LandTNavigation;