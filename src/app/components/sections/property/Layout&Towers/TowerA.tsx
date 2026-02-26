import React from 'react';
import TowerEngagementPanel from './TowerEngagementPanel';

const specs = [
  { label: 'Tower Name',     value: 'Advaita',            accent: true  },
  { label: 'Configuration',  value: '2 & 3 BHK',          accent: false },
  { label: 'Structure',      value: 'G + 14 Floors',       accent: false },
  { label: 'Total Units',    value: '84 Apartments',       accent: false },
  { label: 'Elevators',      value: '3 High-speed Lifts',  accent: false },
  { label: 'Fire Safety',    value: '2 Staircases',        accent: false },
  { label: 'Lift Ratio',     value: '1 per 28 Flats',      accent: false },
  { label: 'Status',         value: 'Completed',          accent: true  },
  { label: 'Handover',       value: 'October 2024',        accent: true  },
];

const TowerA = () => (
  <div className="w-full space-y-0">

    {/* ── Cinematic Hero ── */}
    <div className="relative rounded-[7px] overflow-hidden h-56 shadow-xl shadow-black/15 group mb-5">
      <img
        src="https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=1200&q=80"
        alt="Tower A"
        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
      />
      {/* Warmed up the gradient overlay to match brand charcoal */}
      <div className="absolute inset-0" style={{background: 'linear-gradient(to top, rgba(50,40,34,0.88) 0%, rgba(50,40,34,0.2) 50%, transparent 100%)'}} />
      
      {/* Status badge: Replaced green with Charcoal + Orange Dot */}
      <div className="absolute top-3.5 left-3.5">
        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-[7px] text-[11px] font-extrabold text-[#F9F7F2] tracking-wide" style={{background: 'rgba(50,40,34,0.85)', backdropFilter: 'blur(6px)', border: '1px solid rgba(229,223,212,0.15)'}}>
          <span className="w-1.5 h-1.5 rounded-[7px] bg-[#F85B01] animate-pulse" />
          Ready to Move
        </span>
      </div>
      
      {/* Bottom overlay */}
      <div className="absolute bottom-0 left-0 right-0 px-4 pb-3">
      </div>
    </div>

    {/* ── Spec Grid ── */}
    <div className="mb-5">
      <div className="grid grid-cols-3 gap-2">
        {specs.map((s, i) => (
          <div key={i} className="bg-white border border-[#E5DFD4] rounded-[7px] px-3 py-3 flex flex-col gap-1 shadow-sm hover:shadow-md hover:shadow-[#F85B01]/10 hover:-translate-y-px transition-all duration-200">
            <span className="text-[9px] font-bold text-[#6B5E57] tracking-wider leading-none">{s.label}</span>
            <span className={`text-[12px] font-extrabold leading-tight ${
              s.accent ? 'text-[#F85B01]' : 'text-[#322822]'
            }`}>{s.value}</span>
          </div>
        ))}
      </div>
    </div>

    {/* ── Engagement ── */}
    <div className="pt-4" style={{borderTop: '1px solid rgba(50,40,34,0.08)'}}>
      <TowerEngagementPanel towerName="Tower A" />
    </div>
  </div>
);

export default TowerA;