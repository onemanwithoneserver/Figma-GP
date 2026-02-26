import React from 'react';

// --- Types ---
interface Seller {
  id: string;
  name: string;
  type: 'Developer' | 'Strategic Partner' | 'Agency';
  rating: number;
  tags: string[];
  isVerified: boolean;
}

// --- Icons ---
const Icons = {
  Verified: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#3B82F6" stroke="white" strokeWidth="2">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
  Star: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="#FBBF24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
  ExternalLink: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
      <polyline points="15 3 21 3 21 9"></polyline>
      <line x1="10" y1="14" x2="21" y2="3"></line>
    </svg>
  )
};

const SELLERS: Seller[] = [
  { 
    id: 's1', 
    name: 'Prestige Group Sales', 
    type: 'Developer', 
    rating: 4.9, 
    tags: ['Direct', 'Best Price'], 
    isVerified: true 
  },
  { 
    id: 's2', 
    name: 'Anarock Property Consultants', 
    type: 'Strategic Partner', 
    rating: 4.7, 
    tags: ['Bulk Deals', 'Assisted Visit'], 
    isVerified: true 
  },
];

export default function Sellers() {
  return (
    <div className="w-full bg-white font-['Outfit',_sans-serif] p-4">

      {/* ── Header ── */}
      <div className="mb-4">
        <h3 className="text-[18px] font-extrabold text-[#0F172A] tracking-tight mb-0.5">Authorized Sellers</h3>
        <p className="text-[13px] font-medium text-gray-500">Verified & trusted channel partners</p>
      </div>

      {/* ── Seller Cards ── */}
      <div className="flex flex-col gap-3 mb-5">
        {SELLERS.map((seller) => (
          <article
            key={seller.id}
            className="border border-gray-100 rounded-[7px] overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.05)] bg-white"
          >
            {/* Top accent strip */}
            <div
              className="h-1 w-full"
              style={{ background: 'linear-gradient(90deg, #2563EB, #F97316)' }}
              aria-hidden="true"
            />
            <div className="p-4">
              <div className="flex justify-between items-start gap-3 mb-3">
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <h4 className="text-[15.5px] font-bold text-[#0F172A] leading-snug">{seller.name}</h4>
                    {seller.isVerified && (
                      <span title="Verified seller">
                        <Icons.Verified />
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11.5px] font-bold text-[#2563EB] bg-[#EFF6FF] border border-blue-100 px-2.5 py-0.5 rounded-[5px]">
                      {seller.type}
                    </span>
                    <div className="flex items-center gap-0.5" aria-label={`Rating: ${seller.rating} out of 5`}>
                      <Icons.Star />
                      <span className="text-[12px] font-extrabold text-[#0F172A]">{seller.rating}</span>
                    </div>
                  </div>
                </div>
                <button
                  aria-label={`Visit ${seller.name} profile`}
                  className="flex-shrink-0 flex items-center gap-1.5 text-[12px] font-bold text-[#2563EB] bg-[#EFF6FF] border border-blue-200 px-3 py-2 rounded-[7px] hover:bg-blue-100 transition-colors focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none"
                >
                  Profile <Icons.ExternalLink />
                </button>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {seller.tags.map(tag => (
                  <span
                    key={tag}
                    className="text-[11px] font-extrabold text-[#0F172A] bg-slate-100 px-2.5 py-1 rounded-[5px]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* ── Premium CTA Banner ── */}
      <div
        className="rounded-[7px] p-4 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1A2638 0%, #243450 100%)' }}
      >
        <div
          className="absolute right-0 top-0 w-32 h-32 pointer-events-none"
          aria-hidden="true"
          style={{
            background: 'radial-gradient(circle, rgba(249,115,22,0.25) 0%, transparent 70%)',
            transform: 'translate(20%, -20%)'
          }}
        />
        <div className="relative flex items-center justify-between gap-3">
          <div>
            <p className="text-[10.5px] font-bold text-white/50 tracking-wide mb-0.5">Starting from</p>
            <p className="text-[20px] font-black text-white tracking-tight">₹1.58 Cr
              <span className="text-[13px] font-medium text-white/60 ml-1">onwards</span>
            </p>
          </div>
          <button
            aria-label="Get a personalised price quote"
            className="flex-shrink-0 bg-[#F97316] hover:bg-[#ea6c0e] text-white font-bold text-[14px] px-5 py-3 rounded-[7px] shadow-lg transition-colors active:scale-95 focus-visible:ring-2 focus-visible:ring-orange-300 focus-visible:outline-none"
          >
            Get Quote
          </button>
        </div>
      </div>
    </div>
  );
}