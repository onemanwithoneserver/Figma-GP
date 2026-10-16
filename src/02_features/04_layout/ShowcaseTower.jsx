import ApartmentOutlined from '@mui/icons-material/ApartmentOutlined';
import AccessTimeRounded from '@mui/icons-material/AccessTimeRounded';
import BoltRounded from '@mui/icons-material/BoltRounded';
import { cn } from '../../03_shared/03_utils/utils';
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
      <div className={cn("relative rounded-control overflow-hidden h-56 shadow-xl shadow-black/10 group mb-5", "bg-ink-gradient")} >

        {imageUrl ? (
          /* Render Real Image for Active Phases */
          <>
            <img
              src={imageUrl}
              alt={displayName}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            {/* Warm overlay gradient */}
            <div className={cn("absolute inset-0", "bg-photo-overlay")}  />
          </>
        ) : (
          /* Render Placeholder for Future Phases */
          <>
            {/* Subtle architectural grid */}
            <div className={cn("absolute inset-0 opacity-100", "[background-image:linear-gradient(rgba(255,255,255,0.04)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(255,255,255,0.04)_1px,_transparent_1px)] [background-size:32px_32px]")}  />
            {/* Glowing orb updated to #E76F26 */}
            <div className={cn("absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-control opacity-15", "[background:radial-gradient(circle,_#E76F26_0%,_transparent_70%)]")}  />
            {/* Building silhouette */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
              <ApartmentOutlined className="w-14 h-14 text-outline/50" />
              <span className="text-[12px] font-extrabold text-surface tracking-wide">Render pending</span>
            </div>
          </>
        )}

        {/* Status badge */}
        <div className="absolute top-3.5 left-3.5">
          <span className={cn("flex items-center gap-1.5 px-3 py-1.5 rounded-control text-[11px] font-extrabold text-surface tracking-wide", "[background:rgba(50,40,34,0.9)] [backdrop-filter:blur(6px)] [border:1px_solid_rgba(229,223,212,0.15)]")} >
            {/* Dot changes to #E76F26 and pulses if active, stays grey if future */}
            <span className={`w-1.5 h-1.5 rounded-full ${isFuture ? 'bg-outline' : 'bg-brand-warm animate-pulse'}`} />
            {status}
          </span>
        </div>
      </div>

      {/* ── Status Notice Banner ── */}
      <div className={cn("mb-5 rounded-control overflow-hidden", "bg-ink-gradient")} >
        <div className="px-4 py-3 flex items-center gap-3">
          <div
            className={cn("w-9 h-9 rounded-control flex-shrink-0 flex items-center justify-center", isFuture ? "[background:rgba(249,247,242,0.08)] [border:1px_solid_rgba(249,247,242,0.12)]" : "[background:rgba(231,111,38,0.15)] [border:1px_solid_rgba(231,111,38,0.25)]")}

          >
            {isFuture ? (
              <AccessTimeRounded className="w-4 h-4 text-outline" />
            ) : (
              // Active Icon updated to #E76F26
              <BoltRounded className="w-4 h-4 text-brand-warm" />
            )}
          </div>
          <div>
            <p className="text-[14px] tracking-wide font-extrabold text-surface">
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
            <div key={i} className="bg-surface border border-outline rounded-control px-1 py-2 flex flex-col items-center justify-center gap-1 text-center shadow-sm hover:shadow-md hover:shadow-brand-warm/15 transition-all duration-200">
              {/* Applied your text-[12px], underline, and m-1 */}
              <span className="text-[12px] font-bold text-[#554E48] tracking-wide leading-none underline m-1">
                {s.label}
              </span>

              {/* Added the logic to handle muted text for future phases along with the accent color */}
              <span className={`text-[12px] font-extrabold leading-tight ${
                s.accent ? 'text-brand-warm' : s.muted ? 'text-[#554E48]' : 'text-ink'
              }`}>
                {s.value}
              </span>
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
};

export default ShowcaseTower;
