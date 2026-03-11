import React, { useState, useRef } from 'react';
import type { UnitItem } from './types';
import { defaultUnitData } from './data';

interface TowerProps {
  onClose: () => void;
  unitData?: UnitItem;
}

const towerNameMap: Record<string, string> = {
  'All Towers': 'All Towers',
  'Tower A': 'Shlok',
  'Tower B': 'Ayush',
  'Tower C': 'Ananta',
  'Tower D': 'Advait',
  'Tower E': 'Vihaan',
  'Tower F': 'Ishan',
  'Tower G': 'Aarav',
  'Tower H': 'Kavya'
};

export default function Tower({ onClose, unitData = defaultUnitData }: TowerProps) {
  const [isSaved, setIsSaved] = useState(true);
  const [selectedSuitability, setSelectedSuitability] = useState<string | null>(null);
  const [notForMeFeedback, setNotForMeFeedback] = useState('');
  const [isFeedbackSubmitted, setIsFeedbackSubmitted] = useState(false);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const rawTowerName = (unitData as any)?.towerName || (unitData?.towers && unitData.towers[0]) || 'Tower A';
  const actualTowerName = towerNameMap[rawTowerName] || rawTowerName;

  const displayData = {
    bua: unitData?.bua || defaultUnitData.bua,
    facing: unitData?.facing || defaultUnitData.facing,
    availability: unitData?.availability || defaultUnitData.availability,
    price: unitData?.price || defaultUnitData.price,
    imageUrl: unitData?.imageUrl || defaultUnitData.imageUrl,
    specs: unitData?.specs || defaultUnitData.specs,
    towerName: actualTowerName, 
    unitNo: (unitData as any)?.unitNo || '104',
  };

  const images = [displayData.imageUrl, displayData.imageUrl]; 
  const suitabilityOptions = [
    { emoji: '😍', label: 'Love it' },
    { emoji: '🙂', label: 'Like it' },
    { emoji: '😐', label: "it's okay" },
    { emoji: '😕', label: 'Not for me' }
  ];

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const scrollLeft = scrollContainerRef.current.scrollLeft;
      const width = scrollContainerRef.current.clientWidth;
      const newIndex = Math.round(scrollLeft / width);
      setActiveImageIndex(newIndex);
    }
  };

  const scrollToImage = (index: number) => {
    if (scrollContainerRef.current) {
      const width = scrollContainerRef.current.clientWidth;
      scrollContainerRef.current.scrollTo({ left: width * index, behavior: 'smooth' });
    }
  };

  const getAvailabilityStyles = (status: string) => {
    switch (status) {
      case 'Available': return 'text-white';
      case 'Limited': return 'text-[#F4EFE6]';
      case 'Sold Out': return 'text-[#E5DFD4] opacity-80';
      default: return 'text-[#E5DFD4]';
    }
  };

  const handleSuitabilitySelect = (label: string) => {
    setSelectedSuitability(label);
    if (label !== 'Not for me') {
      setNotForMeFeedback('');
      setIsFeedbackSubmitted(false);
    }
  };

  const handleFeedbackSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!notForMeFeedback.trim()) return;
    setIsFeedbackSubmitted(true);
  };

  return (
    <div className="w-full rounded-[7px] border border-[#E5DFD4] font-['Outfit',_sans-serif] text-[#322822] overflow-hidden flex flex-col shadow-sm">
      
      <div className="flex items-center justify-between px-3 py-2 bg-[#322822] border-b border-[#E5DFD4]">
        <div className="flex items-center gap-2 text-sm font-normal">
          <span className="text-white/70 text-[10px] font-normal">Bua</span>
          <strong className="text-[12px] text-white font-semibold">{displayData.bua}</strong>
          <span className="text-white/70 text-[10px]">sq.ft</span>
          <div className="w-px h-2.5 bg-white/20"></div>
          <span className="text-white text-[11px] font-normal">{displayData.facing}</span>
          <div className="w-px h-2.5 bg-white/20"></div>
          <span className={`font-normal text-[10px] ${getAvailabilityStyles(displayData.availability)}`}>
            {displayData.availability}
          </span>
        </div>
        <button 
          onClick={onClose} 
          className="p-1 rounded-[6px] flex items-center justify-center transition-all bg-white/10 border border-white/15 hover:bg-white/20"
          title="Close view"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.9">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <div className="relative w-full group bg-white border-b border-[#E5DFD4]">
        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex w-full overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: 'none' }}
        >
          {images.map((imgSrc, idx) => (
            <img 
              key={idx}
              src={imgSrc} 
              alt={`Layout marking ${idx + 1}`} 
              className="w-[97%] h-[180px] md:h-[220px] mx-auto flex-shrink-0 object-contain object-top bg-white px-[1px] pb-[1px] pt-0 snap-center"
              loading="eager"
              draggable={false}
            />
          ))}
        </div>

        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1 z-10">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToImage(idx)}
              aria-label={`View image ${idx + 1}`}
              className={`transition-all duration-300 rounded-full shadow-sm ${
                activeImageIndex === idx 
                  ? 'w-3 h-1 bg-[#E76F26]' 
                  : 'w-1 h-1 bg-[#E5DFD4] hover:bg-[#E76F26]/50'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="px-3 py-2 bg-[#FDFBF8] border-b border-[#E5DFD4]">
        <h3 className="text-[14px] text-[#322822] font-semibold tracking-wide">
          {displayData.towerName} <span className="text-[#E5DFD4] font-semibold mx-1">|</span> Unit No. {displayData.unitNo}
        </h3>
      </div>

      <div className="px-3 py-[2px] bg-white">
        {displayData.specs.map((spec, index) => (
          <div key={index} className={`flex justify-between items-center py-[2px] border-b border-[#E5DFD4] text-[12px] transition-colors hover:bg-[#F4EFE6]/30 -mx-3 px-3 hover:rounded-[3px] ${index % 2 === 0 ? '' : 'bg-[#F9F7F2]/40'}`}>
            <span className="text-[#554E48] font-normal">{spec.name}</span>
            <span className="font-semibold text-[#322822]">{spec.dimensions}</span>
          </div>
        ))}
        
        <div className={`flex justify-between items-center py-[2px] border-b border-[#E5DFD4] last:border-0 text-[12px] transition-colors hover:bg-[#F4EFE6]/30 -mx-3 px-3 hover:rounded-[3px] ${displayData.specs.length % 2 === 0 ? '' : 'bg-[#F9F7F2]/40'}`}>
          <span className="text-[#554E48] font-semibold">Estimated cost</span>
          <span className="font-bold text-[#E76F26] text-[16px] leading-none">
            {displayData.price
              .replace(/\s*Crore\s*/i, 'Cr')
              .replace(/\s*Lakh\s*/i, 'L')
              .replace(/\s+/g, '')}
          </span>
        </div>

        <div className="pt-3 pb-2">
          <p className="text-[13px] font-normal text-[#322822] mb-1.5">Does this floor plan suit your needs?</p>
          <div className="flex flex-wrap gap-1">
            {suitabilityOptions.map((option) => {
              const isActive = selectedSuitability === option.label;
              return (
                <button
                  key={option.label}
                  type="button"
                  onClick={() => handleSuitabilitySelect(option.label)}
                  className={`h-[22px] px-[6px] rounded-[2px] border text-[11px] font-normal inline-flex items-center gap-[2px] transition-colors ${
                    isActive
                      ? 'bg-[#E76F26] text-white border-[#E76F26]'
                      : 'bg-[#F9F7F2] text-[#554E48] border-[#E5DFD4] hover:bg-[#F4EFE6]'
                  }`}
                >
                  <span aria-hidden="true">{option.emoji}</span>
                  <span>{option.label}</span>
                </button>
              );
            })}
          </div>

          {selectedSuitability === 'Not for me' && (
            <form onSubmit={handleFeedbackSubmit} className="mt-2 flex flex-col gap-[2px]">
              <textarea
                value={notForMeFeedback}
                onChange={(event) => {
                  setNotForMeFeedback(event.target.value);
                  if (isFeedbackSubmitted) setIsFeedbackSubmitted(false);
                }}
                rows={3}
                placeholder="Tell us what could be better"
                className="w-full resize-none rounded-[2px] border border-[#E5DFD4] bg-white px-[4px] py-[2px] text-[11px] font-normal text-[#322822] outline-none focus:border-[#E76F26]"
              />
              <div className="flex items-center justify-between gap-[2px] mt-1">
                <span className="text-[10px] text-[#7A6F67]">
                  {isFeedbackSubmitted ? 'Thanks for your feedback.' : 'Share feedback and submit'}
                </span>
                <button
                  type="submit"
                  className="h-[22px] px-[8px] rounded-[2px] border border-[#E76F26] bg-[#E76F26] text-white text-[11px] font-normal disabled:opacity-50"
                  disabled={!notForMeFeedback.trim()}
                >
                  Submit
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      <div className="w-full bg-[#FDFBF8] border-t border-[#E5DFD4] px-2 py-2 shrink-0">
        <div className="flex items-center gap-2">

          <button
            onClick={onClose}
            className="flex-1 py-1.5 flex items-center justify-center gap-1.5
            bg-white border border-[#E5DFD4]
            text-[#554E48] font-medium text-[12px]
            rounded-[5px] shadow-sm
            hover:bg-[#F4EFE6] hover:text-[#322822]
            transition-all duration-200 active:scale-95"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Go back
          </button>

          <button
            onClick={() => setIsSaved(!isSaved)}
            className={`flex-1 py-1.5 flex items-center justify-center gap-1.5
            rounded-[5px] border shadow-sm font-medium text-[12px]
            transition-all duration-200 active:scale-95
            ${
              isSaved
                ? 'bg-[#E76F26] text-white border-[#E76F26]'
                : 'bg-white text-[#554E48] border-[#E5DFD4] hover:bg-[#F4EFE6] hover:text-[#322822]'
            }`}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill={isSaved ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
            {isSaved ? 'Saved' : 'Save plan'}
          </button>

        </div>
      </div>
    </div>
  );
}