import CardGiftcardRounded from '@mui/icons-material/CardGiftcardRounded';
import AutoAwesomeRounded from '@mui/icons-material/AutoAwesomeRounded';
import SellOutlined from '@mui/icons-material/SellOutlined';
import AccessTimeRounded from '@mui/icons-material/AccessTimeRounded';
import { ActionButton } from '../../03_shared/02_ui/ActionButton';
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
    <CardGiftcardRounded style={{ color }} className="w-[18px] h-[18px]" />
  ),
  Sparkles: ({ color }: { color: string }) => (
    <AutoAwesomeRounded style={{ color }} className="w-[18px] h-[18px]" />
  ),
  Tag: ({ color }: { color: string }) => (
    <SellOutlined style={{ color }} className="w-[18px] h-[18px]" />
  ),
  Clock: () => (
    <AccessTimeRounded className="w-[11px] h-[11px]" />
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
    <div className="w-full bg-white ">
      <div className="px-2 pt-2 pb-1.5">
      </div>

      <div className="px-2 flex flex-col gap-1.5 pb-2">
        {OFFERS_DATA.map((offer) => (
          <article
            key={offer.id}
            className="relative overflow-hidden rounded-chip bg-white border"
            style={{ borderColor: offer.color }}
          >
            <div
              className="absolute left-0 top-0 bottom-0 w-[3px]"
              aria-hidden="true"
              style={{ background: offer.color }}
            />

            <div className="relative pl-3 pr-2 py-2 flex items-start gap-2">
              <div
                className="w-8 h-8 rounded-chip flex-shrink-0 flex items-center justify-center"
                aria-hidden="true"
                style={{ background: offer.bg }}
              >
                {renderIcon(offer.iconSymbol)}
              </div>

              <div className="flex-1 min-w-0">
                <span
                  className="inline-block text-[10px] font-medium px-1.5 py-0.5 rounded-chip mb-1"
                  style={{ color: offer.color, background: offer.bg }}
                >
                  {offer.badge}
                </span>

                <h4 className="text-[13px] font-semibold text-ink leading-tight mb-0.5">{offer.title}</h4>

                <p className="text-[11px] font-medium text-ink-muted leading-[1.4] mb-1.5">{offer.description}</p>

                <div className="flex items-center justify-between pt-1 border-t border-outline/80">
                  <div className="flex items-center gap-1 text-[10px] font-medium text-ink-muted">
                    <Icons.Clock />
                    {offer.validity}
                  </div>
                  <ActionButton
                    className="flex items-center gap-1 text-[11px] font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-none rounded-chip"
                    style={{ color: offer.color }}
                    aria-label={`View offer: ${offer.title}`}
                  >
                    View
                  </ActionButton>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="px-2 pb-2">
        <p className="text-[11px] font-medium text-ink mb-1">How do these offers look?</p>
        <div className="flex flex-wrap gap-1">
          {FEEDBACK_OPTIONS.map((opt) => {
            const isSelected = feedback === opt.id;
            return (
              <ActionButton
                key={opt.id}
                onClick={() => setFeedback(opt.id)}
                title={isSelected ? `${opt.label} (selected)` : opt.label}
                className={`flex items-center gap-1 px-2 py-1 rounded-chip text-[11px] font-medium transition-colors focus-visible:ring-2 focus-visible:ring-ink/20 focus-visible:outline-none ${
                  isSelected ? 'bg-brand-warm text-white' : 'bg-surface text-ink-muted'
                }`}
              >
                {opt.label}
              </ActionButton>
            );
          })}
        </div>
      </div>
    </div>
  );
}
