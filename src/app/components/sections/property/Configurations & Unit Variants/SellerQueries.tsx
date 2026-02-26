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
    <div className="mx-4 mb-4 rounded-[7px] overflow-hidden" style={{boxShadow:'0 2px 12px rgba(0,0,0,0.06)'}}>
      <div className="px-4 py-2.5 relative overflow-hidden" style={{background:'linear-gradient(135deg,#1A2540,#0F1929)'}}>
        <div className="absolute -top-4 -right-4 w-16 h-16 rounded-[7px] opacity-10" style={{background:'radial-gradient(circle,#F85B01 0%,transparent 70%)'}} />
        <p className="text-[10px] font-bold text-white/40 tracking-widest">Quick Questions</p>
        <p className="text-[12px] font-extrabold text-white">Ask the Seller</p>
      </div>
      <div className="bg-white py-1">
        {SELLER_QUESTIONS.map((question, index) => (
          <button
            key={index}
            className={`w-full flex justify-between items-center px-4 py-3 text-[12px] font-semibold text-[#4A4D57] hover:text-[#F85B01] hover:bg-orange-50/50 transition-all group ${
              index < SELLER_QUESTIONS.length - 1 ? 'border-b border-gray-50' : ''
            }`}
          >
            <span className="text-left">{question}</span>
            <span className="text-gray-300 group-hover:text-[#F85B01] group-hover:translate-x-0.5 transition-all flex-shrink-0">
              <ChevronRight />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
