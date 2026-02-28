import React, { useState } from 'react';
import type { UnitItem } from './types';
import { defaultUnitData, FEEDBACK_OPTIONS } from './data';
import SellerQueries from './SellerQueries';

interface TowerProps {
  onClose: () => void;
  unitData?: UnitItem;
}

export default function Tower({ onClose, unitData = defaultUnitData }: TowerProps) {
  const [feedback, setFeedback] = useState(null);
  const [isSaved, setIsSaved] = useState(true);

  const displayData = {
    bua: unitData?.bua || defaultUnitData.bua,
    facing: unitData?.facing || defaultUnitData.facing,
    availability: unitData?.availability || defaultUnitData.availability,
    price: unitData?.price || defaultUnitData.price,
    towers: unitData?.towers || defaultUnitData.towers,
    imageUrl: unitData?.imageUrl || defaultUnitData.imageUrl,
    specs: unitData?.specs || defaultUnitData.specs,
  };

  const getAvailabilityStyles = (status) => {
    switch (status) {
      case 'Available': return 'text-[#429E6A]';
      case 'Limited': return 'text-[#E68A00]';
      case 'Sold Out': return 'text-[#8A7D74]';
      default: return 'text-[#8A7D74]';
    }
  };

  return (
    <div className="w-full rounded-[7px] border border-[#E5DFD4] font-['Outfit',_sans-serif] text-[#322822] overflow-hidden flex flex-col mt-2 shadow-sm">
      
      <div className="flex items-center justify-between px-4 py-3 bg-[#322822] border-b border-[#E5DFD4]">
        <div className="flex items-center gap-2.5 text-sm font-medium">
          <span className="text-white/50 text-[11px] font-semibold">BUA</span>
          <strong className="text-[15px] text-white font-semibold">{displayData.bua}</strong>
          <span className="text-white/30 text-[11px]">sq.ft</span>
          <div className="w-px h-3.5 bg-white/20"></div>
          <span className="text-white/60 text-[12px] font-semibold">{displayData.facing}</span>
          <div className="w-px h-3.5 bg-white/20"></div>
          <span className={`font-semibold text-[11px] ${getAvailabilityStyles(displayData.availability)}`}>
            {displayData.availability}
          </span>
        </div>
        <button 
          onClick={onClose} 
          className="p-1.5 rounded-[7px] flex items-center justify-center transition-all bg-white/10 border border-white/15"
          title="Close View"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.7"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>

        <img 
          src={displayData.imageUrl} 
          alt="Floor Plan Layout" 
          className="w-full h-[250px] object-contain mix-blend-multiply"
        />


      <div className="px-5 py-3.5 border-b border-[#E5DFD4] bg-white flex items-center justify-between">
        <p className="text-[13px] font-semibold text-[#8A7D74]">Estimated Cost</p>
        <span className="text-[22px] font-semibold text-[#E76F26] leading-none">
          {displayData.price
            .replace(/\s*Crore\s*/i, 'Cr')
            .replace(/\s*Lakh\s*/i, 'L')
            .replace(/\s+/g, '')}
        </span>
      </div>

      <div className="px-5 py-1">
        {displayData.specs.map((spec, index) => (
          <div key={index} className={`flex justify-between items-center py-2.5 border-b border-[#E5DFD4] last:border-0 text-[14px] transition-colors hover:bg-[#F4EFE6]/30 -mx-5 px-5 hover:rounded-[5px] ${index % 2 === 0 ? '' : 'bg-[#F9F7F2]/40'}`}>
            <span className="text-[#8A7D74] font-semibold">{spec.name}</span>
            <span className="font-semibold text-[#322822]">{spec.dimensions}</span>
          </div>
        ))}
      </div>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#E5DFD4] to-transparent"></div>

      <div className="mx-4 my-4 rounded-[7px] border border-[#E5DFD4] bg-[#FDFBF8] shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-[#E5DFD4] bg-[#322822]">
          <p className="text-[13px] font-semibold text-white">Does this floor plan suit your needs?</p>
        </div>
        <div className="px-4 py-3">
        <div className="flex gap-2.5">
          {FEEDBACK_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setFeedback(opt.value)}
              className={`flex-1 py-2 px-1.5 flex flex-col items-center justify-center gap-1 rounded-[7px] border text-[12px] font-semibold transition-all duration-300 shadow-sm
                ${feedback === opt.value 
                  ? 'border-[#E76F26] bg-[#F4EFE6] text-[#E76F26] shadow-sm scale-105' 
                  : 'border-[#E5DFD4] bg-[#F9F7F2] text-[#8A7D74] hover:bg-[#F4EFE6]/50 hover:shadow-sm'
                }`}
            >
              <span className="text-[16px]">{opt.emoji}</span>
              <span className="text-center leading-tight whitespace-normal break-words">{opt.label}</span>
            </button>
          ))}
        </div>
        </div>
      </div>

      {/* Seller Queries */}
      <SellerQueries />

     <div className="w-full bg-white border-t border-[#E5DFD4] px-3 py-3 shrink-0">
  <div className="flex gap-2">

    {/* Save Button */}
    <button
      title={isSaved ? "Saved" : "Save Plan"}
      onClick={() => setIsSaved(!isSaved)}
      className="w-[48px] h-[44px] flex items-center justify-center
      bg-[#E76F26] 
      text-white rounded-[7px]
      shadow-sm transition-all duration-200 active:scale-95"
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

    {/* Ask Availability */}
    <button
      className="flex-1 h-[44px] flex items-center justify-center gap-1.5
      bg-white border border-[#E5DFD4]
      text-[#322822] font-semibold text-[13px]
      rounded-[7px] shadow-sm
      hover:bg-[#F9F7F2] hover:border-[#322822]
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
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
      Ask Availability
    </button>

    {/* Floor Plans */}
    <button
      onClick={onClose}
      className="flex-1 h-[44px] flex items-center justify-center gap-1.5
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
      Floor Plans
    </button>

  </div>
</div>

    </div>
  );
}