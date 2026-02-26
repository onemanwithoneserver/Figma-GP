import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export type TabId = 'layout' | 'towerA' | 'towerB' | 'towerC' | 'towerD' | 'towerE' | 'towerF' | 'towerG' | 'towerH';

interface LandTNavigationProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

const LandTNavigation: React.FC<LandTNavigationProps> = ({ activeTab, onTabChange }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Map<TabId, HTMLButtonElement>>(new Map());
  
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const tabs: { id: TabId; label: string }[] = [
    { id: 'layout', label: 'Layout' },
    { id: 'towerA', label: 'Tower A' },
    { id: 'towerB', label: 'Tower B' },
    { id: 'towerC', label: 'Tower C' },
    { id: 'towerD', label: 'Tower D' },
    { id: 'towerE', label: 'Tower E' },
    { id: 'towerF', label: 'Tower F' },
    { id: 'towerG', label: 'Tower G' },
    { id: 'towerH', label: 'Tower H' },
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
      {/* MODIFIED: Left/Right Gradients now blend with #F3EFE8 
         to prevent "white-out" on the edges.
      */}
      <div 
        className={`absolute left-2 top-0 bottom-0 w-8 bg-gradient-to-r from-[#F3EFE8] to-transparent z-20 pointer-events-none transition-opacity duration-300 rounded-l-[7px] ${
          canScrollLeft ? 'opacity-100' : 'opacity-0'
        }`} 
      />

      <div 
        className={`absolute right-2 top-0 bottom-0 w-8 bg-gradient-to-l from-[#F3EFE8] to-transparent z-20 pointer-events-none transition-opacity duration-300 rounded-r-[7px] ${
          canScrollRight ? 'opacity-100' : 'opacity-0'
        }`} 
      />

      <div 
        ref={scrollContainerRef}
        onScroll={checkScroll}
        /* MODIFIED: Background changed to #F3EFE8 based gradient for deeper warmth */
        className="relative flex items-center bg-gradient-to-br from-[#F3EFE8] to-[#EBE7DF] p-1.5 rounded-[7px] shadow-sm border border-[#DEDAD2] overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth"
      >
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
              className={`relative min-w-[90px] flex-none py-2.5 px-2 transition-colors duration-300 z-10 outline-none flex items-center justify-center rounded-[7px] ${
                isActive ? 'text-white' : 'text-[#625D52] hover:text-[#322822]'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="landt-active-pill"
                  className="absolute inset-0 rounded-[7px] shadow-md -z-10"
                  style={{ background: '#E76F26' }}
                  transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
                />
              )}
              
              <span className="relative z-20 text-[12px] tracking-wide font-semibold">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default LandTNavigation;