import React, { useState } from 'react';

// --- Types ---
interface OfferItem {
  id: string;
  badge: string;
  title: string;
  description: string;
  validity: string;
  iconSymbol: 'gift' | 'sparkles' | 'tag';
  themeColor: string;
}

// --- Icons ---
const Icons = {
  Gift: ({ color }: { color: string }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 12 20 22 4 22 4 12"></polyline>
      <rect x="2" y="7" width="20" height="5"></rect>
      <line x1="12" y1="22" x2="12" y2="7"></line>
      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path>
      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>
    </svg>
  ),
  Sparkles: ({ color }: { color: string }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v18"></path>
      <path d="M3 12h18"></path>
      <path d="M18.36 5.64l-12.73 12.73"></path>
      <path d="M5.64 5.64l12.73 12.73"></path>
    </svg>
  ),
  Tag: ({ color }: { color: string }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
      <line x1="7" y1="7" x2="7.01" y2="7"></line>
    </svg>
  ),
  ChevronRight: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
  ),
  Clock: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  )
};

// --- Mock Data ---
const OFFERS_DATA: OfferItem[] = [
  {
    id: '1',
    badge: 'Finance Scheme',
    title: 'No EMI till Possession',
    description: 'Pay 20% now and nothing until you get the keys. Partnered exclusively with SBI and HDFC bank.',
    validity: 'Valid till 31st Oct',
    iconSymbol: 'sparkles',
    themeColor: '#3B82F6' // Blue
  },
  {
    id: '2',
    badge: 'Festive Special',
    title: 'Free Modular Kitchen',
    description: 'Premium modular kitchen setup with chimney and hob included for 3 BHK configurations.',
    validity: 'First 50 bookings only',
    iconSymbol: 'gift',
    themeColor: '#10B981' // Green
  },
  {
    id: '3',
    badge: 'Direct Discount',
    title: '₹200/sq.ft Spot Discount',
    description: 'Exclusive spot booking discount applied directly to your base price.',
    validity: 'Valid for today',
    iconSymbol: 'tag',
    themeColor: '#F85B01' // Primary Orange
  }
];

const FEEDBACK_OPTIONS = [
  { id: 'exciting', emoji: '🤩', label: 'Exciting' },
  { id: 'clarity', emoji: '🤔', label: 'Need more details' },
  { id: 'none', emoji: '🤷', label: 'Not looking for offers' }
];

export default function Offers() {
  const [feedback, setFeedback] = useState<string | null>(null);

  const renderIcon = (symbol: string, color: string) => {
    switch (symbol) {
      case 'gift': return <Icons.Gift color={color} />;
      case 'sparkles': return <Icons.Sparkles color={color} />;
      case 'tag': return <Icons.Tag color={color} />;
      default: return <Icons.Gift color={color} />;
    }
  };

  return (
    <div className="w-full bg-white font-['Outfit',_sans-serif]">

      {/* ── Header ── */}
      <div className="px-4 pt-5 pb-4">
        <h3 className="text-[18px] font-extrabold text-[#0F172A] tracking-tight mb-0.5">Current Offers & Schemes</h3>
        <p className="text-[13px] font-medium text-gray-500">Exclusive deals — limited availability</p>
      </div>

      {/* ── Offer Cards ── */}
      <div className="px-4 flex flex-col gap-3.5 mb-5">
        {OFFERS_DATA.map((offer) => (
          <article
            key={offer.id}
            className="relative overflow-hidden rounded-[7px] border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-shadow hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)]"
          >
            {/* Gradient background tint */}
            <div
              className="absolute inset-0 pointer-events-none"
              aria-hidden="true"
              style={{
                background: `linear-gradient(135deg, ${offer.themeColor}08 0%, ${offer.themeColor}03 100%)`
              }}
            />
            {/* Left accent bar */}
            <div
              className="absolute left-0 top-0 bottom-0 w-1.5 rounded-r-sm"
              aria-hidden="true"
              style={{ backgroundColor: offer.themeColor }}
            />

            <div className="relative pl-5 pr-4 py-4 flex items-start gap-3.5">
              {/* Icon circle */}
              <div
                className="w-11 h-11 rounded-[7px] flex-shrink-0 flex items-center justify-center shadow-sm"
                style={{ backgroundColor: `${offer.themeColor}18` }}
                aria-hidden="true"
              >
                {renderIcon(offer.iconSymbol, offer.themeColor)}
              </div>

              <div className="flex-1 min-w-0">
                {/* Badge */}
                <span
                  className="inline-block text-[10.5px] font-black tracking-wide px-2.5 py-0.5 rounded-[5px] text-white mb-2"
                  style={{ backgroundColor: offer.themeColor }}
                >
                  {offer.badge}
                </span>

                <h4 className="text-[15.5px] font-extrabold text-[#0F172A] leading-tight mb-1.5">
                  {offer.title}
                </h4>

                <p className="text-[12.5px] font-medium text-gray-600 leading-relaxed mb-3">
                  {offer.description}
                </p>

                {/* Footer row */}
                <div className="flex items-center justify-between pt-2.5 border-t border-gray-100">
                  <div className="flex items-center gap-1.5 text-[11.5px] font-bold text-gray-500">
                    <Icons.Clock />
                    {offer.validity}
                  </div>
                  <button
                    className="flex items-center gap-1 text-[13px] font-extrabold transition-colors focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-none rounded"
                    style={{ color: offer.themeColor }}
                    aria-label={`Claim offer: ${offer.title}`}
                  >
                    Claim Now
                    <Icons.ChevronRight />
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* ── Feedback ── */}
      <div className="px-4 pb-6">
        <p className="text-[14px] font-bold text-[#0F172A] mb-3">How do these offers look to you?</p>
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
                    ? 'border-[#F97316] bg-orange-50 text-[#F97316]'
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