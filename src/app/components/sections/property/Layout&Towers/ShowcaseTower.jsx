import React from 'react';
import TowerEngagementPanel from './TowerEngagementPanel';

const ShowcaseTower = ({ towerName, dummyName }) => (
  <div className="w-full space-y-0">

    {/* ── Cinematic Hero Placeholder ── */}
    <div className="relative rounded-[7px] overflow-hidden h-56 shadow-xl shadow-black/10 group mb-5" style={{background: 'linear-gradient(135deg, #322822 0%, #1E1713 100%)'}}>
      {/* Subtle architectural grid */}
      <div className="absolute inset-0 opacity-100" style={{backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '32px 32px'}} />
      {/* Glowing orb (Warm brand accent) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-[7px] opacity-15" style={{background: 'radial-gradient(circle, #F85B01 0%, transparent 70%)'}} />
      {/* Building silhouette */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
        <svg className="w-14 h-14 text-[#E5DFD4]/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.8} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
        <span className="text-[11px] font-extrabold text-[#E5DFD4]/40 tracking-[0.25em]">Render Pending</span>
      </div>
      {/* Status badge */}
      <div className="absolute top-3.5 left-3.5">
        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-[7px] text-[11px] font-extrabold text-[#F9F7F2] tracking-wide" style={{background: 'rgba(50,40,34,0.85)', backdropFilter: 'blur(6px)', border: '1px solid rgba(229,223,212,0.15)'}}>
          <span className="w-1.5 h-1.5 rounded-[7px] bg-[#E5DFD4]" />
          Future Phase
        </span>
      </div>
    </div>

    {/* ── Future Phase Notice ── */}
    <div className="mb-5 rounded-[7px] overflow-hidden" style={{background: 'linear-gradient(135deg, #322822, #1E1713)'}}>
      <div className="px-4 py-3 flex items-center gap-3">
        <div className="w-9 h-9 rounded-[7px] flex-shrink-0 flex items-center justify-center" style={{background: 'rgba(249,247,242,0.08)', border: '1px solid rgba(249,247,242,0.12)'}}>
          <svg className="w-4 h-4 text-[#E5DFD4]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </div>
        <div>
          <p className="text-[14px] font-extrabold text-[#F9F7F2]">Future Development Phase</p>
        </div>
      </div>
    </div>

    {/* ── Spec Grid ── */}
    <div className="mb-5">
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: 'Tower',         value: `Tower ${towerName}` },
          { label: 'Phase',         value: 'Future Phase'       },
          { label: 'Configuration', value: 'Residential'        },
          { label: 'Lifts',         value: 'High-speed'         },
          { label: 'Status',        value: 'Planning',   muted: true },
          { label: 'Handover',      value: 'TBA',        muted: true },
        ].map((s, i) => (
          <div key={i} className="bg-[#F9F7F2] border border-[#E5DFD4] rounded-[7px] px-3 py-3 flex flex-col gap-1 opacity-90">
            <span className="text-[9px] font-bold text-[#8C827A] tracking-wider leading-none">{s.label}</span>
            <span className={`text-[12px] font-extrabold leading-tight ${s.muted ? 'text-[#8C827A]' : 'text-[#322822]'}`}>{s.value}</span>
          </div>
        ))}
      </div>
    </div>

    {/* ── Engagement ── */}
    <div className="pt-4" style={{borderTop: '1px solid rgba(50,40,34,0.08)'}}>
      <TowerEngagementPanel towerName={`Tower ${towerName}`} />
    </div>
  </div>
);

export default ShowcaseTower;