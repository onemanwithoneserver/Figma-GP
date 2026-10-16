import React from 'react';
import TowerEngagementPanel from './TowerEngagementPanel';

const ShowcaseTower = ({ 
  towerName, 
  dummyName, 
  status = 'Future Phase', 
  imageUrl = null, 
  customSpecs = null 
}) => {
  // Use the Indian name (dummyName) if available, otherwise fallback to ID
  const displayName = dummyName || towerName;
  const isFuture = status === 'Future Phase';

  // Default 9-field grid if no custom specs are passed (for future phases)
  const displaySpecs = customSpecs || [
    { label: 'Configurations',  value: 'TBD' },
    { label: 'Floors',          value: 'TBD' },
    { label: 'Total Units',     value: 'TBD' },
    { label: 'Units / Floor',   value: 'TBD' },
    { label: 'Passenger Lifts', value: 'TBD' },
    { label: 'Service Lifts',   value: 'TBD' },
    { label: 'Lift Ratio',      value: 'TBD' },
    { label: 'Status',          value: 'Planning', muted: true },
    { label: 'Handover',        value: 'TBA',      muted: true },
  ];

  return (
    <div className="w-full space-y-0">

      {/* ── Cinematic Hero Area ── */}
      <div className="relative rounded-[7px] overflow-hidden h-56 shadow-xl shadow-black/10 group mb-5" style={{background: 'linear-gradient(135deg, #322822 0%, #1E1713 100%)'}}>
        
        {imageUrl ? (
          /* Render Real Image for Active Phases */
          <>
            <img
              src={imageUrl}
              alt={displayName}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            {/* Warm overlay gradient */}
            <div className="absolute inset-0" style={{background: 'linear-gradient(to top, rgba(50,40,34,0.88) 0%, rgba(50,40,34,0.4) 50%, transparent 100%)'}} />
          </>
        ) : (
          /* Render Placeholder for Future Phases */
          <>
            {/* Subtle architectural grid */}
            <div className="absolute inset-0 opacity-100" style={{backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '32px 32px'}} />
            {/* Glowing orb updated to #E76F26 */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-[7px] opacity-15" style={{background: 'radial-gradient(circle, #E76F26 0%, transparent 70%)'}} />
            {/* Building silhouette */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
              <svg className="w-14 h-14 text-[#E5DFD4]/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.8} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span className="text-[12px] font-extrabold text-[#F9F7F2] tracking-wide">Render pending</span>
            </div>
          </>
        )}
        
        {/* Status badge */}
        <div className="absolute top-3.5 left-3.5">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-[7px] text-[11px] font-extrabold text-[#F9F7F2] tracking-wide" style={{background: 'rgba(50,40,34,0.9)', backdropFilter: 'blur(6px)', border: '1px solid rgba(229,223,212,0.15)'}}>
            {/* Dot changes to #E76F26 and pulses if active, stays grey if future */}
            <span className={`w-1.5 h-1.5 rounded-full ${isFuture ? 'bg-[#E5DFD4]' : 'bg-[#E76F26] animate-pulse'}`} />
            {status}
          </span>
        </div>
      </div>

      {/* ── Status Notice Banner ── */}
      <div className="mb-5 rounded-[7px] overflow-hidden" style={{background: 'linear-gradient(135deg, #322822, #1E1713)'}}>
        <div className="px-4 py-3 flex items-center gap-3">
          <div 
            className="w-9 h-9 rounded-[7px] flex-shrink-0 flex items-center justify-center" 
            style={isFuture ? {background: 'rgba(249,247,242,0.08)', border: '1px solid rgba(249,247,242,0.12)'} : {background: 'rgba(231,111,38,0.15)', border: '1px solid rgba(231,111,38,0.25)'}}
          >
            {isFuture ? (
              <svg className="w-4 h-4 text-[#E5DFD4]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            ) : (
              // Active Icon updated to #E76F26
              <svg className="w-4 h-4 text-[#E76F26]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            )}
          </div>
          <div>
            <p className="text-[14px] tracking-wide font-extrabold text-[#F9F7F2]">
              {isFuture ? 'Future development phase' : `Currently ${status.toLowerCase()}`}
            </p>
          </div>
        </div>
      </div>

      {/* ── Spec Grid ── */}
      <div className="mb-5">
        <div className="grid grid-cols-3 gap-2">
          {displaySpecs.map((s, i) => (
            // Applied your specific grid styling (px-1, py-2, etc)
            <div key={i} className="bg-[#F9F7F2] border border-[#E5DFD4] rounded-[7px] px-1 py-2 flex flex-col items-center justify-center gap-1 text-center shadow-sm hover:shadow-md hover:shadow-[#E76F26]/15 transition-all duration-200">
              {/* Applied your text-[12px], underline, and m-1 */}
              <span className="text-[12px] font-bold text-[#554E48] tracking-wide leading-none underline m-1">
                {s.label}
              </span>
              
              {/* Added the logic to handle muted text for future phases along with the accent color */}
              <span className={`text-[12px] font-extrabold leading-tight ${
                s.accent ? 'text-[#E76F26]' : s.muted ? 'text-[#554E48]' : 'text-[#322822]'
              }`}>
                {s.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Engagement ── */}
      <div className="pt-1" >
        <TowerEngagementPanel towerName={displayName} />
      </div>
      
    </div>
  );
};

export default ShowcaseTower;