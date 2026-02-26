import React from 'react';
import { motion } from 'framer-motion';

interface BHKTabNavProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function BHKTabNav({ tabs, activeTab, onTabChange }: BHKTabNavProps) {
  return (
    <div className="relative flex bg-white rounded-[7px] p-1 mb-4 border border-[#E5DFD4] shadow-sm">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className="relative flex-1 py-2.5 text-center text-[13px] font-semibold transition-all duration-200 rounded-[7px] z-10"
        >
          {activeTab === tab && (
            <motion.div
              layoutId="bhk-active"
              className="absolute inset-0 rounded-[7px] bg-[#E76F26]"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
            />
          )}
          <span className={`relative z-10 transition-colors duration-200 ${
            activeTab === tab ? 'text-white' : 'text-[#8A7D74] hover:text-[#322822]'
          }`}>
            {tab}
          </span>
        </button>
      ))}
    </div>
  );
}
