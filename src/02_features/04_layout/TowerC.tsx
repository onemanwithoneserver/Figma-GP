import { cn } from '../../03_shared/03_utils/utils';
import React from 'react';
import TowerEngagementPanel from './TowerEngagementPanel';

const specs = [
  { label: 'Configurations',        value: '2 & 3 BHK',          accent: false },
  { label: 'Floors',                value: 'G + 10',             accent: false },
  { label: 'Total Units',           value: '60 Apartments',      accent: false },
  { label: 'No.of units per floor', value: '6 Units',            accent: false },
  { label: 'Passenger Lifts',       value: '2 High-speed',       accent: false },
  { label: 'Service Lifts',         value: '1 Dedicated',        accent: false },
  { label: 'Lift Ratio',            value: '1 per 20 Flats',     accent: false },
  { label: 'Status',                value: 'Pre-launch Stage',   accent: true  },
  { label: 'Handover',              value: 'TBA',                muted: true   },
];

const TowerC = () => (
  <div className="w-full space-y-0">

    {/* ── Cinematic Hero ── */}
    <div className="relative rounded-control overflow-hidden h-56 shadow-xl shadow-black/15 group mb-5">
      <img
        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
        alt="Ananta"
        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
      />
      {/* Warmed up gradient overlay to match brand charcoal */}
      <div className={cn("absolute inset-0", "bg-photo-overlay")}  />

      {/* Status badge */}
      <div className="absolute top-3.5 left-3.5">
{/*         <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-control text-[11px] font-extrabold text-surface tracking-wide" style={{background: 'rgba(50,40,34,0.9)', backdropFilter: 'blur(6px)', border: '1px solid rgba(229,223,212,0.15)'}}>
          <span className="w-1.5 h-1.5 rounded-full bg-brand-warm animate-pulse" />
          Launching soon
        </span> */}
      </div>
    </div>

    {/* ── Launching Notice ── */}
    <div className={cn("mb-5 rounded-control overflow-hidden shadow-sm", "bg-ink-gradient")} >
      <div className="px-4 py-3 flex items-center gap-3">
        {/* Border and background updated to the rgba equivalent of #E76F26 */}
        <div className={cn("w-9 h-9 rounded-control flex-shrink-0 flex items-center justify-center", "[background:rgba(231,111,38,0.15)] [border:1px_solid_rgba(231,111,38,0.25)]")} >
          <svg className="w-4 h-4 text-brand-warm" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
        </div>
        <div>
          <p className="text-[14px] font-extrabold text-surface">Currently launching soon</p>
        </div>
      </div>
    </div>

    {/* ── Spec Grid ── */}
    <div className="">
      <div className="grid grid-cols-3 gap-2">
        {specs.map((s, i) => (
          <div key={i} className="bg-surface border border-outline rounded-control px-1 py-2 flex flex-col items-center justify-center gap-1 text-center shadow-sm hover:shadow-md hover:shadow-brand-warm/15 transition-all duration-200">
            {/* Darker AAA grey #554E48 applied to underlined label */}
            <span className="text-[12px] font-bold text-[#554E48] tracking-wide leading-none underline m-1">{s.label}</span>

            {/* Value text below the label - Updated to #9A3F00 for the best readable orange contrast, or #554E48 if muted */}
            <span className={`text-[12px] font-extrabold leading-tight ${
              s.accent ? 'text-brand-warm' : s.muted ? 'text-[#554E48]' : 'text-[#9A3F00]'
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

export default TowerC;
