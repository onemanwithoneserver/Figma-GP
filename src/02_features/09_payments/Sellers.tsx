import VerifiedRounded from '@mui/icons-material/VerifiedRounded';
import StarRounded from '@mui/icons-material/StarRounded';
import OpenInNewRounded from '@mui/icons-material/OpenInNewRounded';
import { ActionButton } from '../../03_shared/02_ui/ActionButton';
import React from 'react';

interface Seller {
  id: string;
  name: string;
  type: 'Developer' | 'Strategic Partner' | 'Agency';
  rating: number;
  tags: string[];
  isVerified: boolean;
}

const Icons = {
  Verified: () => (
    <VerifiedRounded className="w-[14px] h-[14px] text-brand-warm" />
  ),
  Star: () => (
    <StarRounded className="w-[12px] h-[12px] text-[#E76F26]" />
  ),
  ExternalLink: () => (
    <OpenInNewRounded className="w-[14px] h-[14px]" />
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
    <div className="w-full bg-white p-2">
      <div className="mb-1.5">
      </div>

      <div className="flex flex-col gap-1.5 mb-2">
        {SELLERS.map((seller) => (
          <article key={seller.id} className="rounded-chip bg-white border border-outline overflow-hidden">
            <div className="p-2">
              <div className="flex justify-between items-start gap-2 mb-1.5">
                <div>
                  <div className="flex items-center gap-1 mb-0.5">
                    <h4 className="text-[13px] font-semibold text-ink leading-snug">{seller.name}</h4>
                    {seller.isVerified && (
                      <span title="Verified seller">
                        <Icons.Verified />
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-medium text-brand-warm bg-[#FFF4EC] px-1.5 py-0.5 rounded-chip">{seller.type}</span>
                    <div className="flex items-center gap-0.5" aria-label={`Rating: ${seller.rating} out of 5`}>
                      <Icons.Star />
                      <span className="text-[10px] font-semibold text-ink">{seller.rating}</span>
                    </div>
                  </div>
                </div>
                <ActionButton
                  aria-label={`Visit ${seller.name} profile`}
                  className="flex-shrink-0 flex items-center gap-1 text-[11px] font-medium text-ink bg-white border border-outline px-2 py-1 rounded-chip transition-colors focus-visible:ring-2 focus-visible:ring-ink/20 focus-visible:outline-none"
                >
                  Profile <Icons.ExternalLink />
                </ActionButton>
              </div>

              <div className="flex flex-wrap gap-1">
                {seller.tags.map((tag) => (
                  <span key={tag} className="text-[10px] font-medium text-ink-muted bg-surface px-1.5 py-0.5 rounded-chip">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="rounded-chip p-2 bg-[#FFF4EC] border border-[#FFD4B2]">
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-[10px] font-medium text-ink-muted mb-0.5">Starting from</p>
            <p className="text-[17px] font-bold text-ink">
              &#x20B9;1.58 Cr
              <span className="text-[11px] font-medium text-ink-muted ml-1">onwards</span>
            </p>
          </div>
          <ActionButton
            aria-label="Get a personalised price quote"
            className="flex-shrink-0 bg-brand-warm text-white font-medium text-[11px] px-2 py-1 rounded-chip transition-colors focus-visible:ring-2 focus-visible:ring-brand-warm/20 focus-visible:outline-none"
          >
            Get Quote
          </ActionButton>
        </div>
      </div>
    </div>
  );
}
