import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TowerDropdownProps {
  towers: string[];
  selected: string;
  onSelect: (tower: string) => void;
}

export default function TowerDropdown({ towers, selected, onSelect }: TowerDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between gap-2.5 text-[#2A2C32] py-1 pl-3 pr-2.5 rounded-[7px] font-bold text-[12px] transition-all duration-200 outline-none ${
          isOpen
            ? 'text-white'
            : 'bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-[#F85B01]/40'
        }`}
        style={isOpen ? {background:'linear-gradient(135deg,#1A2540,#0F1929)', boxShadow:'0 4px 16px rgba(0,0,0,0.2)'} : {}}
      >
        <span className={`truncate ${isOpen ? 'text-white' : ''}`}>{selected}</span>
        <svg
          className={`w-3.5 h-3.5 transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180 text-white/70' : 'text-[#94A3B8]'}`}
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 4 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute z-50 mt-1.5 right-0 w-max min-w-[140px] bg-white border border-gray-100 rounded-[7px] overflow-hidden"
            style={{boxShadow:'0 8px 24px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.06)'}}
          >
            <div className="max-h-60 overflow-y-auto pb-1">
              <div className="px-3.5 pt-2.5 pb-1">
                <p className="text-[9px] font-extrabold text-[#94A3B8] tracking-widest">SELECT TOWER</p>
              </div>
              {towers.map((tower) => (
                <button
                  key={tower}
                  onClick={() => { onSelect(tower); setIsOpen(false); }}
                  className={`w-full text-left px-3.5 py-2 text-[12px] font-bold transition-colors duration-150 flex items-center gap-2 ${
                    selected === tower
                      ? 'text-[#F85B01] bg-orange-50'
                      : 'text-[#4A4D57] hover:bg-gray-50 hover:text-[#2A2C32]'
                  }`}
                >
                  {selected === tower && <span className="w-1 h-1 rounded-[7px] bg-[#F85B01] flex-shrink-0" />}
                  {tower}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
