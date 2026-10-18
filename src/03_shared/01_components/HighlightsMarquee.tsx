import React from 'react';
import AutoAwesome from '@mui/icons-material/AutoAwesomeRounded';

const ITEMS = [
  'HMDA & RERA Approved',
  '2 & 3 BHK Homes',
  '4 Towers · G+14',
  '12 Acres · 456 Units',
  '₹8,000/sft Onwards',
  'Under Construction',
  'Hyderabad Hills',
];

const HighlightsMarquee: React.FC = () => {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center gap-6 pr-6" aria-hidden={hidden || undefined}>
      {ITEMS.map((t) => (
        <li key={t} className="flex items-center gap-2 whitespace-nowrap text-[12px] font-semibold tracking-wide text-white/90">
          <AutoAwesome className="!w-3.5 !h-3.5 text-brand" aria-hidden="true" />
          {t}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="group relative overflow-hidden rounded-control bg-ink-gradient py-2.5 mx-1
      [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]"
      aria-label="Project highlights">
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
};

export default HighlightsMarquee;
