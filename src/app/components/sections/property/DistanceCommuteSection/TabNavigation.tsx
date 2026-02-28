import React, { useEffect, useRef } from 'react';
import { TabInfo } from './commuteData';

interface TabNavigationProps {
  tabs: TabInfo[];
  activeTab: string;
  onTabClick: (id: string) => void;
}

export default function TabNavigation({ tabs, activeTab, onTabClick }: TabNavigationProps) {
  // 1. Create a ref for the scrollable container
  const containerRef = useRef<HTMLDivElement>(null);

  // 2. Automatically scroll the active tab into view
  useEffect(() => {
    if (containerRef.current) {
      const activeElement = containerRef.current.querySelector('[data-active="true"]');
      if (activeElement) {
        activeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest', // Prevents vertical jumping of the whole page
          inline: 'center'  // Centers the tab for better UX
        });
      }
    }
  }, [activeTab]);

  return (
    <div 
      ref={containerRef}
      className="flex overflow-x-auto gap-2.5 px-4 py-2 bg-white border-b border-[#E5DFD4] items-center relative z-20 [&::-webkit-scrollbar]:hidden" 
      style={{ scrollbarWidth: 'none' }}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            data-active={isActive} // 3. Added data attribute for the selector
            onClick={() => onTabClick(tab.id)}
            className={`flex-shrink-0 px-3.5 py-1.5 rounded-[5px] border text-[11px] font-bold transition-all duration-200 outline-none flex items-center justify-center
              ${isActive 
                ? 'bg-[#322822] text-white border-[#322822] shadow-sm' 
                : 'bg-[#F9F7F2] text-[#554E48] border-[#E5DFD4] hover:border-[#322822] hover:text-[#322822]'
              }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}