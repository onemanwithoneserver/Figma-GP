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

  return (
    <div className="w-full mb-4 relative">
      {/* LEFT FADE OVERLAY - Radius restricted to 7px */}
      <div 
        className={`absolute left-0 top-0.5 bottom-0.5 w-8 z-20 pointer-events-none transition-opacity duration-300 rounded-l-[7px] ${
          canScrollLeft ? 'opacity-100' : 'opacity-0'
        }`} 
        style={{
          background: `linear-gradient(to right, ${COLORS.container}, transparent)`,
        }}
      />

      {/* RIGHT FADE OVERLAY - Radius restricted to 7px */}
      <div 
        className={`absolute right-0 top-0.5 bottom-0.5 w-8 z-20 pointer-events-none transition-opacity duration-300 rounded-r-[7px] ${
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
        <div className="flex gap-1.5 px-0.5 w-full"> 
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            
            return (
              <button
                key={tab}
                onClick={() => onTabChange(tab)}
                /* flex-1 lets them stretch evenly, min-w-max ensures they don't squish too much */
                className="relative flex-1 min-w-max py-1.5 px-4 transition-colors duration-300 z-10 outline-none flex items-center justify-center rounded-[7px]"
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
                
                {/* 11px uppercase to perfectly match the L&T Master Navigation */}
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