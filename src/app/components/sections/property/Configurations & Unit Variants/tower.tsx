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

  // Safely fallback to default data if certain fields are missing from the clicked row
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
      case 'Sold Out': return 'text-[#9E9E9E]';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="w-full rounded-[7px] border border-gray-100 font-['Outfit',_sans-serif] text-[#2F3D5A] overflow-hidden flex flex-col mt-2" style={{boxShadow:'0 4px 24px rgba(0,0,0,0.09)'}}>
      
      {/* Unit Summary Bar & Close Button */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100" style={{background:'linear-gradient(135deg,#1A2540,#0F1929)'}}>
        <div className="flex items-center gap-2.5 text-sm font-medium">
          <span className="text-white/50 text-[11px] font-semibold">BUA</span>
          <strong className="text-[15px] text-white font-extrabold">{displayData.bua}</strong>
          <span className="text-white/30 text-[11px]">sq.ft</span>
          <div className="w-px h-3.5 bg-white/20"></div>
          <span className="text-white/60 text-[12px] font-semibold">{displayData.facing}</span>
          <div className="w-px h-3.5 bg-white/20"></div>
          <span className={`font-bold text-[11px] ${getAvailabilityStyles(displayData.availability)}`}>
            {displayData.availability}
          </span>
        </div>
        <button 
          onClick={onClose} 
          className="p-1.5 rounded-[7px] flex items-center justify-center transition-all" 
          style={{background:'rgba(255,255,255,0.1)', border:'1px solid rgba(255,255,255,0.15)'}}
          title="Close View"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.7"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>

      {/* Floor Plan Image */}
      <div className="w-full bg-gradient-to-br from-[#F8FAFC] to-[#F0F4F8] border-b border-gray-100 p-5">
        <img 
          src={displayData.imageUrl} 
          alt="Floor Plan Layout" 
          className="w-full h-auto object-contain mix-blend-multiply"
        />
      </div>

      {/* Pricing */}
      <div className="px-5 py-3.5 border-b border-gray-100 bg-white flex items-center justify-between">
        <p className="text-[13px] font-bold text-[#94A3B8]">Estimated Cost</p>
        <span className="text-[22px] font-extrabold text-[#F85B01] leading-none">
          {displayData.price
            .replace(/\s*Crore\s*/i, 'Cr')
            .replace(/\s*Lakh\s*/i, 'L')
            .replace(/\s+/g, '')}
        </span>
      </div>

      {/* Specifications Table */}
      <div className="px-5 py-1">
        {displayData.specs.map((spec, index) => (
          <div key={index} className={`flex justify-between items-center py-2.5 border-b border-[#F0EDE7] last:border-0 text-[14px] transition-colors hover:bg-gradient-to-r hover:from-[#FAFAF8] hover:to-[#F6F4EF] -mx-5 px-5 hover:rounded-[5px] ${index % 2 === 0 ? '' : 'bg-[#FAFAF9]/40'}`}>
            <span className="text-[#8292A6] font-semibold">{spec.name}</span>
            <span className="font-bold text-[#2A2C32]">{spec.dimensions}</span>
          </div>
        ))}
      </div>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#E8E5DF] to-transparent"></div>

      {/* User Feedback */}
      <div className="mx-4 my-4 rounded-[7px] border border-[#E8E5DF] bg-gradient-to-br from-[#FAFAF8] to-[#F6F4EF] shadow-md shadow-black/5 overflow-hidden">
        <div className="px-4 py-3 border-b border-[#E8E5DF] bg-gradient-to-r from-[#2A2C32] to-[#1E293B]">
          <p className="text-[13px] font-bold text-white tracking-wide">Does this floor plan suit your needs?</p>
        </div>
        <div className="px-4 py-3">
        <div className="flex gap-2.5">
          {FEEDBACK_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setFeedback(opt.value)}
              className={`flex-1 py-2 px-1.5 flex flex-col items-center justify-center gap-1 rounded-[7px] border text-[12px] font-bold transition-all duration-300 shadow-sm
                ${feedback === opt.value 
                  ? 'border-[#F85B01] bg-gradient-to-br from-[#FFF3E0] to-[#FFE4C4] text-[#F85B01] shadow-md shadow-orange-500/20 scale-105' 
                  : 'border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100 hover:shadow-md'
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

      {/* Bottom Action Bar */}
      <div className="w-full bg-gradient-to-b from-white to-gray-50/50 border-t border-gray-200 p-4 flex gap-3 shrink-0 shadow-inner">
        <button 
          onClick={() => setIsSaved(!isSaved)}
          className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#F85B01] to-[#E24E00] text-white py-3 rounded-[7px] font-bold text-[14px] transition-all duration-300 active:scale-95 shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill={isSaved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
          {isSaved ? 'Saved' : 'Save Plan'}
        </button>
        <button className="flex-[1.5] flex items-center justify-center gap-2 bg-white border-2 border-gray-200 text-[#2F3D5A] py-3 rounded-[7px] font-bold text-[14px] hover:bg-gray-50 hover:border-[#2F3D5A] transition-all duration-300 shadow-md hover:shadow-lg">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          Ask availability
        </button>
      </div>

    </div>
  );
}