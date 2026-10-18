import React, { useState, useRef, useEffect } from 'react';
import KeyboardArrowDownRounded from '@mui/icons-material/KeyboardArrowDownRounded';
import PictureAsPdfRounded from '@mui/icons-material/PictureAsPdfRounded';
import CheckRounded from '@mui/icons-material/CheckRounded';
import { motion, AnimatePresence } from 'motion/react';

export interface ProjectFileItem {
  id: number;
  label: string;
  size: string;
  description: string;
}

interface ModernPdfDropdownProps {
  files: ProjectFileItem[];
  selectedFile: ProjectFileItem;
  onSelect: (file: ProjectFileItem) => void;
}

export const ModernPdfDropdown: React.FC<ModernPdfDropdownProps> = ({
  files,
  selectedFile,
  onSelect,
}) => {
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
    <div ref={dropdownRef} className="relative z-30 inline-block">
      {/* Modern Trigger Button sized as per the name */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-[8px] bg-[#25201C] hover:bg-[#2C2723] border border-white/20 hover:border-[#F85B01]/70 transition-all duration-200 text-left shadow-sm cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#F85B01]"
      >
        <div className="flex items-center gap-1.5">
          <div className="flex items-center justify-center w-5 h-5 rounded bg-red-600/90 text-white flex-shrink-0">
            <PictureAsPdfRounded style={{ fontSize: 13 }} />
          </div>
          <span className="text-[12px] font-bold text-white whitespace-nowrap">
            {selectedFile.label}
          </span>
        </div>

        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-white/70 flex-shrink-0"
        >
          <KeyboardArrowDownRounded style={{ fontSize: 16 }} />
        </motion.span>
      </button>

      {/* Modern Floating Menu sized to fit names */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 4 }}
            exit={{ opacity: 0, scale: 0.95, y: -6 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute left-0 top-full w-max min-w-[160px] rounded-[10px] bg-[#1C1815]/95 backdrop-blur-2xl border border-white/20 shadow-[0_16px_36px_rgba(0,0,0,0.6)] p-1 overflow-hidden z-50"
          >
            <div className="px-2 py-1 text-[9.5px] font-extrabold uppercase tracking-wider text-white/40 border-b border-white/10 mb-1">
              Select PDF
            </div>

            <div className="flex flex-col gap-0.5 max-h-[240px] overflow-y-auto scrollbar-hide">
              {files.map((file) => {
                const isSelected = file.id === selectedFile.id;

                return (
                  <button
                    key={file.id}
                    type="button"
                    onClick={() => {
                      onSelect(file);
                      setIsOpen(false);
                    }}
                    className={`flex items-center justify-between gap-3 px-2.5 py-1.5 rounded-[6px] text-left transition-all duration-150 cursor-pointer whitespace-nowrap ${
                      isSelected
                        ? 'bg-[#F85B01] text-white shadow-sm font-bold'
                        : 'text-white/90 hover:text-white hover:bg-white/10 font-semibold'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <PictureAsPdfRounded
                        style={{ fontSize: 15 }}
                        className={isSelected ? 'text-white' : 'text-red-500'}
                      />
                      <span className="text-[12px] leading-none">
                        {file.label}
                      </span>
                    </div>

                    {isSelected && (
                      <CheckRounded style={{ fontSize: 14 }} className="text-white flex-shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
