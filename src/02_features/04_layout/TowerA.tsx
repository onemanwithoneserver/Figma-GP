import { cn } from '../../03_shared/03_utils/utils';
import React from 'react';
import TowerEngagementPanel from './TowerEngagementPanel';

const specs = [
  { label: 'Configurations',        value: '2 & 3 BHK',          accent: false },
  { label: 'Floors',                value: 'G + 14',             accent: false },
  { label: 'Total Units',           value: '84 Apartments',      accent: false },
  { label: 'No.of units per floor', value: '6 Units',            accent: false },
  { label: 'Passenger Lifts',       value: '2 High-speed',       accent: false },
  { label: 'Service Lifts',         value: '1 Dedicated',        accent: false },
  { label: 'Lift Ratio',            value: '1 per 28 Flats',     accent: false },
  { label: 'Status',                value: 'Ready to Move',      accent: true  },
  { label: 'Handover',              value: 'Oct 2024',           accent: true  },
];

const TowerA = () => (
  <div className="w-full space-y-0">

    {/* ── Cinematic Hero ── */}
    <div className="relative rounded-control overflow-hidden h-56 shadow-xl shadow-black/15 group mb-5">
      <img
        src="https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=1200&q=80"
        alt="Shlok"
        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
      />
      {/* Warmed up the gradient overlay to match brand charcoal */}
      <div className={cn("absolute inset-0", "bg-photo-overlay")}  />

      {/* Status badge */}
      <div className="absolute top-3.5 left-3.5">
{/*         <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-control text-[11px] font-extrabold text-surface tracking-wide" style={{background: 'rgba(50,40,34,0.9)', backdropFilter: 'blur(6px)', border: '1px solid rgba(229,223,212,0.15)'}}>
          <span className="w-1.5 h-1.5 rounded-full bg-brand-warm animate-pulse" />
          Ready to Move
        </span> */}
      </div>
    </div>

    {/* ── Spec Grid ── */}
    <div className="">
      <div className="grid grid-cols-3 gap-2">
        {specs.map((s, i) => (
          <div key={i} className="bg-surface border border-outline rounded-control px-1 py-2 flex flex-col items-center justify-center gap-1 text-center shadow-sm hover:shadow-md hover:shadow-brand-warm/15 transition-all duration-200">
            {/* Darker AAA grey #554E48 applied to underlined label */}
            <span className="text-[12px] font-bold text-[#554E48] tracking-wide leading-none underline m-1">
              {s.label}
            </span>

            {/* Value text below the label - Updated to #9A3F00 for the best readable orange contrast */}
            <span className={`text-[12px] font-extrabold leading-tight ${
              s.accent ? 'text-[#fc6100]' : 'text-[#9A3F00]'
            }`}>{s.value}</span>
          </div>
        ))}
      </div>
    </div>

    {/* ── Engagement ── */}
    <div className="pt-1" >
      <TowerEngagementPanel />
    </div>
  </div>
);

export default TowerA;
