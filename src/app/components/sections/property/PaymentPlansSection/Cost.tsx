import React, { useState } from 'react';

// --- Types ---
interface CostItem {
  id: string;
  component: string;
  amount: string;
  info: string;
  hasInfoIcon?: boolean;
  highlight?: boolean;
}

// --- Icons ---
const Icons = {
  InfoCircle: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#2563EB" stroke="none" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
    </svg>
  ),
  ArrowRight: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
};

// --- Mock Data ---
const COST_BREAKDOWN: CostItem[] = [
  { id: '1', component: 'Base Price',            amount: '₹8,200 / sq.ft', info: 'Carpet area basis',          hasInfoIcon: true,  highlight: true  },
  { id: '2', component: 'Floor Rise Charges',    amount: '₹3,00,000',      info: 'Above 5th floor' },
  { id: '3', component: 'Amenities Charges',     amount: '₹3,50,000',      info: 'One-time' },
  { id: '4', component: 'Maintenance Deposit',   amount: '₹1,20,000',      info: '12 months advance',          hasInfoIcon: true },
  { id: '5', component: 'Corpus Fund',           amount: '₹75,000',        info: 'One-time' },
  { id: '6', component: 'Gas Pipeline',          amount: '₹35,000',        info: 'One-time' },
  { id: '7', component: 'Parking',               amount: '₹2,50,000',      info: '1 covered slot' },
  { id: '8', component: 'Legal & Documentation', amount: '₹25,000',        info: 'Govt + admin' },
  { id: '9', component: 'GST',                   amount: 'As applicable',  info: 'Under-const. only',          hasInfoIcon: true },
];

const FEEDBACK_OPTIONS = [
  { id: 'interested', emoji: '👍', label: 'Looks good!' },
  { id: 'high',       emoji: '💸', label: 'Price is high' },
  { id: 'clarity',    emoji: '🤔', label: 'Need clarity'  },
];

export default function Cost() {
  const [feedback, setFeedback] = useState<string | null>(null);

  return (
    <div className="w-full bg-white font-['Outfit',_sans-serif]">

      {/* ── Header ── */}
      <div className="px-4 pt-5 pb-4">
        <h3 className="text-[18px] font-extrabold text-[#0F172A] tracking-tight mb-0.5">Cost Breakdown</h3>
        <p className="text-[13px] font-medium text-gray-500">Transparent breakup of all applicable charges</p>
      </div>

      {/* ── Cost Items List ── */}
      <div className="px-4 mb-5 flex flex-col gap-2">
        {COST_BREAKDOWN.map((item) => (
          <div
            key={item.id}
            className={`rounded-[7px] border px-4 py-3 flex items-center justify-between gap-3
              ${item.highlight
                ? 'border-orange-200 bg-orange-50/60'
                : 'border-gray-100 bg-[#F5F7FA]'
              }
            `}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <p className="text-[13.5px] font-bold text-[#1A2638]">{item.component}</p>
                {item.highlight && (
                  <span className="text-[9px] font-black text-[#F97316] bg-orange-100 px-1.5 py-0.5 rounded-[5px] tracking-wide">
                    Key
                  </span>
                )}
              </div>
              <p className="text-[11.5px] font-medium text-gray-400 mt-0.5 flex items-center gap-1">
                {item.info}
                {item.hasInfoIcon && (
                  <button
                    aria-label={`More info about ${item.component}`}
                    className="flex-shrink-0 focus-visible:ring-2 focus-visible:ring-orange-400 rounded-full outline-none"
                  >
                    <Icons.InfoCircle />
                  </button>
                )}
              </p>
            </div>
            <p className="text-[14px] font-extrabold text-[#1A2638] flex-shrink-0 text-right">
              {item.amount}
            </p>
          </div>
        ))}
      </div>

      {/* ── Estimated Total Banner ── */}
      <div className="px-4 mb-5">
        <div
          className="rounded-[7px] p-4 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #1A2638 0%, #243450 100%)' }}
        >
          <div
            className="absolute right-0 top-0 w-32 h-32 pointer-events-none"
            aria-hidden="true"
            style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.22) 0%, transparent 70%)', transform: 'translate(20%, -20%)' }}
          />
          <p className="text-[11px] font-bold text-white/50 tracking-wide mb-1">Estimated Total</p>
          <p className="text-[22px] font-black text-white tracking-tight">
            ₹1.58 Cr
            <span className="text-[14px] font-bold text-white/60 ml-1">— 1.62 Cr*</span>
          </p>
          <p className="text-[11.5px] text-slate-400 mt-1 mb-4">
            *Varies based on unit floor, type & statutory charges
          </p>
          <button
            className="flex items-center gap-2 bg-[#F97316] hover:bg-[#ea6c0e] text-white text-[13.5px] font-bold px-4 py-2.5 rounded-[7px] transition-colors shadow-lg active:scale-95 focus-visible:ring-2 focus-visible:ring-orange-300 focus-visible:outline-none"
            aria-label="View seller-wise pricing breakdown"
          >
            View Seller-wise Pricing
            <Icons.ArrowRight />
          </button>
        </div>
      </div>

      {/* ── Feedback ── */}
      <div className="px-4 pb-6">
        <p className="text-[14px] font-bold text-[#0F172A] mb-3">How does this pricing look to you?</p>
        <div className="flex flex-wrap gap-2">
          {FEEDBACK_OPTIONS.map((opt) => {
            const isSelected = feedback === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setFeedback(opt.id)}
                title={isSelected ? `${opt.label} (selected)` : opt.label}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-[7px] text-[13px] font-bold border-2 transition-all
                  focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:outline-none
                  ${isSelected
                    ? 'border-[#F97316] bg-orange-50 text-[#F97316] shadow-sm'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                  }`}
              >
                <span aria-hidden="true">{opt.emoji}</span>
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}