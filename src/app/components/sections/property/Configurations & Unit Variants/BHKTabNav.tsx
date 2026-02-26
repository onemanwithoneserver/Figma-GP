import React from 'react';
import { motion } from 'framer-motion';

interface BHKTabNavProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function BHKTabNav({ tabs, activeTab, onTabChange }: BHKTabNavProps) {
  return (
    <div className="relative flex bg-white rounded-[7px] p-1 mb-4 border border-gray-100 shadow-sm" style={{boxShadow:'0 2px 8px rgba(0,0,0,0.06)'}}>
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className="relative flex-1 py-2.5 text-center text-[13px] font-bold transition-all duration-200 rounded-[7px] z-10"
        >
          {activeTab === tab && (
            <motion.div
              layoutId="bhk-active"
              className="absolute inset-0 rounded-[7px]"
              style={{background:'linear-gradient(135deg,#F85B01,#C94A00)', boxShadow:'0 0 14px rgba(248,91,1,0.35), inset 0 1px 0 rgba(255,255,255,0.15)'}}
              transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
            />
          )}
          <span className={`relative z-10 transition-colors duration-200 ${
            activeTab === tab ? 'text-white' : 'text-[#94A3B8] hover:text-[#2A2C32]'
          }`}>
            {tab}
          </span>
        </button>
      ))}
    </div>
  );
}
