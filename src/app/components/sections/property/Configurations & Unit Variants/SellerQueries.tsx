import React from 'react';

const SELLER_QUESTIONS = [
  'Ask seller: Are there any premium floors?',
  'Ask seller: Can I customize this floor plan?',
];

const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

export default function SellerQueries() {
  return (
    <div className="mx-4 mb-4 rounded-[7px] overflow-hidden shadow-sm border border-[#E5DFD4]">
      <div className="px-4 py-2.5 bg-[#322822]">
        <p className="text-[12px] font-semibold text-white">Ask the Seller</p>
      </div>
      <div className="bg-white py-1">
        {SELLER_QUESTIONS.map((question, index) => (
          <button
            key={index}
            className={`w-full flex justify-between items-center px-4 py-3 text-[12px] font-semibold text-[#322822] hover:text-[#E76F26] hover:bg-[#F4EFE6]/50 transition-all group ${
              index < SELLER_QUESTIONS.length - 1 ? 'border-b border-[#E5DFD4]' : ''
            }`}
          >
            <span className="text-left">{question}</span>
            <span className="text-[#8A7D74] group-hover:text-[#E76F26] group-hover:translate-x-0.5 transition-all flex-shrink-0">
              <ChevronRight />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
