import React, { useState, useRef } from 'react';
import type { UnitItem } from './types';
import { defaultUnitData } from './data';

interface TowerProps {
  onClose: () => void;
  unitData?: UnitItem;
}

// Map the generic backend names to your custom display names
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
  
  // Carousel state
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Extract raw tower name from data, fallback to 'Tower A'
  const rawTowerName = (unitData as any)?.towerName || (unitData?.towers && unitData.towers[0]) || 'Tower A';
  
  // Translate to the actual custom name
  const actualTowerName = towerNameMap[rawTowerName] || rawTowerName;

  // Structured display data
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

  const images = [displayData.imageUrl, displayData.imageUrl]; // using the same image twice for demo

  // Sync scroll position with the active dot
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const scrollLeft = scrollContainerRef.current.scrollLeft;
      const width = scrollContainerRef.current.clientWidth;
      const newIndex = Math.round(scrollLeft / width);
      setActiveImageIndex(newIndex);
    }
  };

  // Scroll to a specific image when clicking dots
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

  return (
    <div className="w-full rounded-[7px] border border-[#E5DFD4] font-['Outfit',_sans-serif] text-[#322822] overflow-hidden flex flex-col shadow-sm">
      
      {/* Header - Stats bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#322822] border-b border-[#E5DFD4]">
        <div className="flex items-center gap-2.5 text-sm font-medium">
          <span className="text-white/70 text-[11px] font-semibold">Bua</span>
          <strong className="text-[15px] text-white font-semibold">{displayData.bua}</strong>
          <span className="text-white/70 text-[11px]">sq.ft</span>
          <div className="w-px h-3.5 bg-white/20"></div>
          <span className="text-white text-[12px] font-semibold">{displayData.facing}</span>
          <div className="w-px h-3.5 bg-white/20"></div>
          <span className={`font-semibold text-[11px] ${getAvailabilityStyles(displayData.availability)}`}>
            {displayData.availability}
          </span>
        </div>
        <button 
          onClick={onClose} 
          className="p-1.5 rounded-[7px] flex items-center justify-center transition-all bg-white/10 border border-white/15 hover:bg-white/20"
          title="Close view"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.9">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      {/* Image Carousel Area */}
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
              className="w-[96%] h-[220px] md:h-[280px] mx-auto flex-shrink-0 object-contain object-top bg-white px-0.5 pb-0.5 pt-0 snap-center"
              loading="eager"
              draggable={false}
            />
          ))}
        </div>

        {/* Repositioned Indicator Dots - Overlay on Image */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToImage(idx)}
              aria-label={`View image ${idx + 1}`}
              className={`transition-all duration-300 rounded-full shadow-sm ${
                activeImageIndex === idx 
                  ? 'w-4 h-1.5 bg-[#E76F26]' 
                  : 'w-1.5 h-1.5 bg-[#E5DFD4] hover:bg-[#E76F26]/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Title Bar - Displays Actual Name and Unit No. */}
      <div className="px-5 py-3.5 bg-[#FDFBF8] border-b border-[#E5DFD4]">
        <h3 className="text-[17px] text-[#322822] font-bold tracking-wide">
          {displayData.towerName} <span className="text-[#E5DFD4] font-bold mx-1.5">|</span> Unit No. {displayData.unitNo}
        </h3>
      </div>

      {/* Specs List with Estimated Cost */}
      <div className="px-5 py-2 bg-white">
        {displayData.specs.map((spec, index) => (
          <div key={index} className={`flex justify-between items-center py-2.5 border-b border-[#E5DFD4] text-[14px] transition-colors hover:bg-[#F4EFE6]/30 -mx-5 px-5 hover:rounded-[5px] ${index % 2 === 0 ? '' : 'bg-[#F9F7F2]/40'}`}>
            <span className="text-[#554E48] font-semibold">{spec.name}</span>
            <span className="font-bold text-[#322822]">{spec.dimensions}</span>
          </div>
        ))}
        
        {/* Cost Row */}
        <div className={`flex justify-between items-center py-3 border-b border-[#E5DFD4] last:border-0 text-[14px] transition-colors hover:bg-[#F4EFE6]/30 -mx-5 px-5 hover:rounded-[5px] ${displayData.specs.length % 2 === 0 ? '' : 'bg-[#F9F7F2]/40'}`}>
          <span className="text-[#554E48] font-bold">Estimated cost</span>
          <span className="font-extrabold text-[#E76F26] text-[18px] leading-none">
            {displayData.price
              .replace(/\s*Crore\s*/i, 'Cr')
              .replace(/\s*Lakh\s*/i, 'L')
              .replace(/\s+/g, '')}
          </span>
        </div>
      </div>

      {/* Sticky Action Footer */}
      <div className="w-full bg-white px-3 py-2 shrink-0">
        <div className="flex items-center gap-2">

          {/* SAVE BUTTON */}
          <button
            title={isSaved ? "Saved" : "Save plan"}
            onClick={() => setIsSaved(!isSaved)}
            className={`w-[44px] h-[40px] flex items-center justify-center 
            rounded-[7px] border shadow-sm
            transition-all duration-200 active:scale-95
            ${
              isSaved
                ? 'bg-[#E76F26] text-white border-[#E76F26]'
                : 'bg-[#F9F7F2] text-[#554E48] border-[#E5DFD4] hover:text-[#322822]'
            }`}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill={isSaved ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
          </button>


          {/* GO BACK */}
          <button
            onClick={onClose}
            className="flex-1 h-[40px] flex items-center justify-center gap-1.5
            bg-white border border-[#E5DFD4]
            text-[#322822] font-semibold text-[13px]
            rounded-[7px] shadow-sm
            hover:bg-[#F9F7F2]
            transition-all duration-200"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Go back
          </button>

        </div>
      </div>
    </div>
  );
}