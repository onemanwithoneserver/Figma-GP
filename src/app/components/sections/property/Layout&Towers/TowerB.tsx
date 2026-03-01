import React from 'react';
import TowerEngagementPanel from './TowerEngagementPanel';

const specs = [
  { label: 'Configurations',        value: '2 & 3 BHK',          accent: false },
  { label: 'Floors',                value: 'G + 12',             accent: false },
  { label: 'Total Units',           value: '72 Apartments',      accent: false },
  { label: 'No.of units per floor', value: '6 Units',            accent: false },
  { label: 'Passenger Lifts',       value: '2 High-speed',       accent: false },
  { label: 'Service Lifts',         value: '1 Dedicated',        accent: false },
  { label: 'Lift Ratio',            value: '1 per 24 Flats',     accent: false },
  // Status and Handover keep the 'accent: true' flag to optionally stand out more
  { label: 'Status',                value: 'Slab Work Ongoing',  accent: true  },
  { label: 'Handover',              value: 'Dec 2025',           accent: true  },
];

const TowerB = () => (
  <div className="w-full space-y-0">

    {/* ── Cinematic Hero ── */}
    <div className="relative rounded-[7px] overflow-hidden h-56 shadow-xl shadow-black/15 group mb-5">
      <img
        src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"
        alt="Ayush"
        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
      />
      <div className="absolute inset-0" style={{background: 'linear-gradient(to top, rgba(50,40,34,0.88) 0%, rgba(50,40,34,0.4) 50%, transparent 100%)'}} />
      
      {/* Status badge */}
      <div className="absolute top-3.5 left-3.5">
{/*         <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-[7px] text-[11px] font-extrabold text-[#F9F7F2] tracking-wide" style={{background: 'rgba(50,40,34,0.9)', backdropFilter: 'blur(6px)', border: '1px solid rgba(229,223,212,0.15)'}}>
          <span className="w-1.5 h-1.5 rounded-full bg-[#E76F26] animate-pulse" />
          Under construction
        </span> */}
      </div>
    </div>

    {/* ── Construction Notice ── */}
    <div className="mb-5 rounded-[7px] overflow-hidden shadow-sm" style={{background: 'linear-gradient(135deg, #322822, #1E1713)'}}>
      <div className="px-4 py-3 flex items-center gap-3">
        <div className="w-7 h-7 rounded-[7px] flex-shrink-0 flex items-center justify-center" style={{background: 'rgba(231,111,38,0.15)', border: '1px solid rgba(231,111,38,0.25)'}}>
          <svg className="w-4 h-4 text-[#E76F26]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M5.07 19H19a2 2 0 001.75-2.97L13.75 4a2 2 0 00-3.5 0L3.25 16.03A2 2 0 005.07 19z" /></svg>
        </div>
        <div>
          <p className="text-[14px] font-extrabold text-[#F9F7F2]">Currently under construction</p>
        </div>
      </div>
    </div>

    {/* ── Spec Grid ── */}
    <div className="">
      <div className="grid grid-cols-3 gap-2">
        {specs.map((s, i) => (
          <div key={i} className="bg-[#F9F7F2] border border-[#E5DFD4] rounded-[7px] px-1 py-2 flex flex-col items-center justify-center gap-1 text-center shadow-sm hover:shadow-md hover:shadow-[#E76F26]/15 transition-all duration-200">
            {/* Darker AAA grey #554E48 applied to underlined label */}
            <span className="text-[12px] font-bold text-[#554E48] tracking-wide leading-none underline m-1">{s.label}</span>
            
            {/* The Value text below the label - Updated to #9A3F00 for the best readable orange contrast */}
            <span className={`text-[12px] font-extrabold leading-tight ${
              s.accent ? 'text-[#E76F26]' : 'text-[#9A3F00]'
            }`}>{s.value}</span>
          </div>
        ))}
      </div>
    </div>

    {/* ── Engagement ── */}
    <div className="pt-1" >
      <TowerEngagementPanel towerName="Ayush" />
    </div>
  </div>
);

export default TowerB;