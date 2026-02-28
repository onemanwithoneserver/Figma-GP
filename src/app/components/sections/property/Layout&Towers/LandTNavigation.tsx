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

  const checkScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setCanScrollLeft(scrollLeft > 5); 
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

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

  return (
    <div className="w-full px-2 mb-4 relative">
      {/* LEFT FADE OVERLAY - Radius restricted to 7px */}
      <div 
        className={`absolute left-2 top-0.5 bottom-0.5 w-10 z-20 pointer-events-none transition-opacity duration-300 rounded-l-[7px] ${
          canScrollLeft ? 'opacity-100' : 'opacity-0'
        }`} 
        style={{
          background: `linear-gradient(to right, ${COLORS.container}, transparent)`,
        }}
      />

      {/* RIGHT FADE OVERLAY - Radius restricted to 7px */}
      <div 
        className={`absolute right-2 top-0.5 bottom-0.5 w-10 z-20 pointer-events-none transition-opacity duration-300 rounded-r-[7px] ${
          canScrollRight ? 'opacity-100' : 'opacity-0'
        }`} 
        style={{
          background: `linear-gradient(to left, ${COLORS.container}, transparent)`,
        }}
      />

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
                <span className="relative z-20 text-[11px] tracking-widest font-bold whitespace-nowrap ">
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