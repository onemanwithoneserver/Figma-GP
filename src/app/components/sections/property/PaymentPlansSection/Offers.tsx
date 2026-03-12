import React, { useState } from 'react';

interface OfferItem {
  id: string;
  badge: string;
  title: string;
  description: string;
  validity: string;
  iconSymbol: 'gift' | 'sparkles' | 'tag';
}

const Icons = {
  Gift: ({ color }: { color: string }) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 12 20 22 4 22 4 12"></polyline>
      <rect x="2" y="7" width="20" height="5"></rect>
      <line x1="12" y1="22" x2="12" y2="7"></line>
      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path>
      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>
    </svg>
  ),
  Sparkles: ({ color }: { color: string }) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v18"></path>
      <path d="M3 12h18"></path>
      <path d="M18.36 5.64l-12.73 12.73"></path>
      <path d="M5.64 5.64l12.73 12.73"></path>
    </svg>
  ),
  Tag: ({ color }: { color: string }) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
      <line x1="7" y1="7" x2="7.01" y2="7"></line>
    </svg>
  ),
  Clock: () => (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  )
};

const OFFERS_DATA: (OfferItem & { color: string; bg: string })[] = [
  {
    id: '1',
    badge: 'Finance Scheme',
    title: 'No EMI till Possession',
    description: 'Pay 20% now and nothing until you get the keys. Partnered exclusively with SBI and HDFC bank.',
    validity: 'Valid till 31st Oct',
    iconSymbol: 'sparkles',
    color: '#E76F26',
    bg: '#FFF4EC',
  },
  {
    id: '2',
    badge: 'Festive Special',
    title: 'Free Modular Kitchen',
    description: 'Premium modular kitchen setup with chimney and hob included for 3 BHK configurations.',
    validity: 'First 50 bookings only',
    iconSymbol: 'gift',
    color: '#1E90FF',
    bg: '#E6F2FF',
  },
  {
    id: '3',
    badge: 'Direct Discount',
    title: '₹200/sq.ft Spot Discount',
    description: 'Exclusive spot booking discount applied directly to your base price.',
    validity: 'Valid for today',
    iconSymbol: 'tag',
    color: '#22A06B',
    bg: '#E6FFF2',
  }
];

const FEEDBACK_OPTIONS = [
  { id: 'exciting', label: 'Looks useful' },
  { id: 'clarity', label: 'Need more details' },
  { id: 'none', label: 'Not interested' }
];

export default function Offers() {
  const [feedback, setFeedback] = useState<string | null>(null);

  const renderIcon = (symbol: string) => {
    switch (symbol) {
      case 'gift':
        return <Icons.Gift color="#E76F26" />;
      case 'sparkles':
        return <Icons.Sparkles color="#E76F26" />;
      case 'tag':
        return <Icons.Tag color="#E76F26" />;
      default:
        return <Icons.Gift color="#E76F26" />;
    }
  };

  return (
    <div className="w-full bg-white font-['Outfit',_sans-serif]">
      <div className="px-2 pt-2 pb-1.5">
      </div>

      <div className="px-2 flex flex-col gap-1.5 pb-2">
        {OFFERS_DATA.map((offer) => (
          <article
            key={offer.id}
            className="relative overflow-hidden rounded-[5px] bg-white border"
            style={{ borderColor: offer.color }}
          >
            <div
              className="absolute left-0 top-0 bottom-0 w-[3px]"
              aria-hidden="true"
              style={{ background: offer.color }}
            />

            <div className="relative pl-3 pr-2 py-2 flex items-start gap-2">
              <div
                className="w-8 h-8 rounded-[5px] flex-shrink-0 flex items-center justify-center"
                aria-hidden="true"
                style={{ background: offer.bg }}
              >
                {renderIcon(offer.iconSymbol)}
              </div>

              <div className="flex-1 min-w-0">
                <span
                  className="inline-block text-[10px] font-medium px-1.5 py-0.5 rounded-[5px] mb-1"
                  style={{ color: offer.color, background: offer.bg }}
                >
                  {offer.badge}
                </span>

                <h4 className="text-[13px] font-semibold text-[#322822] leading-tight mb-0.5">{offer.title}</h4>

                <p className="text-[11px] font-medium text-[#6B5E57] leading-[1.4] mb-1.5">{offer.description}</p>

                <div className="flex items-center justify-between pt-1 border-t border-[#E5DFD4]/80">
                  <div className="flex items-center gap-1 text-[10px] font-medium text-[#6B5E57]">
                    <Icons.Clock />
                    {offer.validity}
                  </div>
                  <button
                    className="flex items-center gap-1 text-[11px] font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-none rounded-[5px]"
                    style={{ color: offer.color }}
                    aria-label={`View offer: ${offer.title}`}
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="px-2 pb-2">
        <p className="text-[11px] font-medium text-[#322822] mb-1">How do these offers look?</p>
        <div className="flex flex-wrap gap-1">
          {FEEDBACK_OPTIONS.map((opt) => {
            const isSelected = feedback === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setFeedback(opt.id)}
                title={isSelected ? `${opt.label} (selected)` : opt.label}
                className={`flex items-center gap-1 px-2 py-1 rounded-[5px] text-[11px] font-medium transition-colors focus-visible:ring-2 focus-visible:ring-[#322822]/20 focus-visible:outline-none ${
                  isSelected ? 'bg-[#E76F26] text-white' : 'bg-[#F9F7F2] text-[#6B5E57]'
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
