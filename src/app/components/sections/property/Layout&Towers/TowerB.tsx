import React from 'react';
import TowerEngagementPanel from './TowerEngagementPanel';

const specs = [
  { label: 'Tower Name',    value: 'Bhavya',            accent: true  },
  { label: 'Configuration', value: '2 & 3 BHK',          accent: false },
  { label: 'Structure',     value: 'G + 12 Floors',      accent: false },
  { label: 'Total Units',   value: '72 Apartments',      accent: false },
  { label: 'Elevators',     value: '2 High-speed Lifts', accent: false },
  { label: 'Fire Safety',   value: '2 Staircases',       accent: false },
  { label: 'Status',        value: 'Slab Work Ongoing',  accent: true  },
  { label: 'Handover',      value: 'Dec 2025',           accent: true  },
];

const TowerB = () => (
  <div className="w-full space-y-0">

    {/* ── Cinematic Hero ── */}
    <div className="relative rounded-[7px] overflow-hidden h-56 shadow-xl shadow-black/15 group mb-5">
      <img
        src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"
        alt="Tower B"
        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
      />
      {/* Warmed up the gradient overlay to match brand charcoal */}
      <div className="absolute inset-0" style={{background: 'linear-gradient(to top, rgba(50,40,34,0.88) 0%, rgba(50,40,34,0.2) 50%, transparent 100%)'}} />
      
      {/* Status badge: Unified with Tower A's elegant Charcoal + Orange dot system */}
      <div className="absolute top-3.5 left-3.5">
        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-[7px] text-[11px] font-extrabold text-[#F9F7F2] tracking-wide" style={{background: 'rgba(50,40,34,0.85)', backdropFilter: 'blur(6px)', border: '1px solid rgba(229,223,212,0.15)'}}>
          <span className="w-1.5 h-1.5 rounded-[7px] bg-[#F85B01] animate-pulse" />
          Under Construction
        </span>
      </div>
    </div>

    {/* ── Construction Notice ── */}
    {/* Replaced the cold Navy SaaS gradient with the warm Charcoal brand gradient */}
    <div className="mb-5 rounded-[7px] overflow-hidden shadow-sm" style={{background: 'linear-gradient(135deg, #322822, #1E1713)'}}>
      <div className="px-4 py-3 flex items-center gap-3">
        <div className="w-7 h-7 rounded-[7px] flex-shrink-0 flex items-center justify-center" style={{background: 'rgba(248,91,1,0.15)', border: '1px solid rgba(248,91,1,0.25)'}}>
          <svg className="w-4 h-4 text-[#F85B01]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M5.07 19H19a2 2 0 001.75-2.97L13.75 4a2 2 0 00-3.5 0L3.25 16.03A2 2 0 005.07 19z" /></svg>
        </div>
        <div>
          <p className="text-[14px] font-extrabold text-[#F9F7F2]">Currently Under Construction</p>
        </div>
      </div>
    </div>

    {/* ── Spec Grid ── */}
    {/* Removed heading wrapper */}
    <div className="mb-5">
      <div className="grid grid-cols-3 gap-2">
        {specs.map((s, i) => (
          <div key={i} className="bg-white border border-[#E5DFD4] rounded-[7px] px-3 py-3 flex flex-col gap-1 shadow-sm hover:shadow-md hover:shadow-[#F85B01]/10 hover:-translate-y-px transition-all duration-200">
            <span className="text-[9px] font-bold text-[#6B5E57] tracking-wider leading-none">{s.label}</span>
            <span className={`text-[12px] font-extrabold leading-tight ${s.accent ? 'text-[#F85B01]' : 'text-[#322822]'}`}>{s.value}</span>
          </div>
        ))}
      </div>
    </div>

    {/* ── Engagement ── */}
    <div className="pt-4" style={{borderTop: '1px solid rgba(50,40,34,0.08)'}}>
      <TowerEngagementPanel towerName="Tower B" />
    </div>
  </div>
);

export default TowerB;