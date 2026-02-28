import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TowerDropdownProps {
  towers: string[];
  selected: string;
  onSelect: (tower: string) => void;
}

// Map the generic backend names to your custom display names
const towerNameMap: Record<string, string> = {
  'All Towers': 'All Towers', // Updated to match the image
  'Tower A': 'Shlok',
  'Tower B': 'Ayush',
  'Tower C': 'Ananta',
  'Tower D': 'Advait',
  'Tower E': 'Vihaan',
  'Tower F': 'Ishan',
  'Tower G': 'Aarav',
  'Tower H': 'Kavya'
};

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

  const displaySelected = towerNameMap[selected] || selected;

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between gap-2.5 py-1 pl-3 pr-2.5 rounded-[7px] font-semibold text-[12px] transition-all duration-200 outline-none ${
          isOpen
            ? 'bg-[#322822] text-white'
            : 'bg-white border border-[#E5DFD4] text-[#322822] shadow-sm hover:shadow-md hover:border-[#E76F26]/40'
        }`}
      >
        <span className={`truncate ${isOpen ? 'text-white' : 'text-[#322822]'}`}>
          {displaySelected}
        </span>
        <svg
          className={`w-3.5 h-3.5 transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180 text-white/70' : 'text-[#554E48]'}`}
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
            className="absolute z-50 mt-1.5 right-0 w-max min-w-[140px] bg-white border border-[#E5DFD4] rounded-[7px] overflow-hidden shadow-md"
          >
            <div className="max-h-60 overflow-y-auto pb-1">
              <div className="px-4 pt-3 pb-2">
                {/* Updated to standard title case as seen in your image */}
                <p className="text-[11px] font-bold text-[#554E48]">Select Tower</p>
              </div>
              
              {towers.map((tower) => {
                const displayName = towerNameMap[tower] || tower;
                const isSelected = selected === tower;

                return (
                  <button
                    key={tower}
                    onClick={() => { onSelect(tower); setIsOpen(false); }}
                    className={`w-full text-left px-4 py-2 text-[12px] font-bold transition-colors duration-150 flex items-center gap-2.5 ${
                      isSelected
                        ? 'text-[#E76F26] bg-[#F4EFE6]'
                        : 'text-[#554E48] hover:bg-[#F9F7F2]'
                    }`}
                  >
                    {/* The transparent background on unselected items keeps the text perfectly aligned with the selected item */}
                    <span 
                      className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                        isSelected ? 'bg-[#E76F26]' : 'bg-transparent'
                      }`} 
                    />
                    {displayName}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}