import ApartmentOutlined from '@mui/icons-material/ApartmentOutlined';
import AccessTimeRounded from '@mui/icons-material/AccessTimeRounded';
import BoltRounded from '@mui/icons-material/BoltRounded';
import KingBedRounded from '@mui/icons-material/KingBedRounded';
import ApartmentRounded from '@mui/icons-material/ApartmentRounded';
import HomeWorkRounded from '@mui/icons-material/HomeWorkRounded';
import GridViewRounded from '@mui/icons-material/GridViewRounded';
import ElevatorRounded from '@mui/icons-material/ElevatorRounded';
import EngineeringRounded from '@mui/icons-material/EngineeringRounded';
import SpeedRounded from '@mui/icons-material/SpeedRounded';
import VerifiedRounded from '@mui/icons-material/VerifiedRounded';
import CalendarMonthRounded from '@mui/icons-material/CalendarMonthRounded';
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

  const displayName = dummyName || towerName;
  const isFuture = status === 'Future Phase';

  const displaySpecs = customSpecs || [
    { label: 'Configurations',  value: 'TBD',      icon: KingBedRounded },
    { label: 'Floors',          value: 'TBD',      icon: ApartmentRounded },
    { label: 'Total Units',     value: 'TBD',      icon: HomeWorkRounded },
    { label: 'Units / Floor',   value: 'TBD',      icon: GridViewRounded },
    { label: 'Passenger Lifts', value: 'TBD',      icon: ElevatorRounded },
    { label: 'Service Lifts',   value: 'TBD',      icon: EngineeringRounded },
    { label: 'Lift Ratio',      value: 'TBD',      icon: SpeedRounded },
    { label: 'Status',          value: 'Planning', icon: VerifiedRounded,      muted: true },
    { label: 'Handover',        value: 'TBA',      icon: CalendarMonthRounded, muted: true },
  ];

  return (
    <div className="w-full space-y-0">

      <div className={cn("relative rounded-control overflow-hidden h-56 shadow-xl shadow-black/10 group mb-5", "bg-ink-gradient")}>

        {imageUrl ? (

          <>
            <img
              src={imageUrl}
              alt={displayName}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />

            <div className={cn("absolute inset-0", "bg-photo-overlay")} />
          </>
        ) : (

          <>

            <div className={cn("absolute inset-0 opacity-100", "[background-image:linear-gradient(rgba(255,255,255,0.04)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(255,255,255,0.04)_1px,_transparent_1px)] [background-size:32px_32px]")} />

            <div className={cn("absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-control opacity-15", "[background:radial-gradient(circle,_#E76F26_0%,_transparent_70%)]")} />

            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
              <ApartmentOutlined className="w-14 h-14 text-outline/50" />
              <span className="text-[12px] font-extrabold text-surface tracking-wide">Render pending</span>
            </div>
          </>
        )}

        <div className="absolute top-3.5 left-3.5">
          <span className={cn("flex items-center gap-1.5 px-3 py-1.5 rounded-control text-[11px] font-extrabold text-surface tracking-wide", "[background:rgba(50,40,34,0.9)] [backdrop-filter:blur(6px)] [border:1px_solid_rgba(229,223,212,0.15)]")}>

            <span className={`w-1.5 h-1.5 rounded-full ${isFuture ? 'bg-outline' : 'bg-brand-warm animate-pulse'}`} />
            {status}
          </span>
        </div>
      </div>

      <div className={cn("mb-5 rounded-control overflow-hidden", "bg-ink-gradient")}>
        <div className="px-4 py-3 flex items-center gap-3">
          <div
            className={cn("w-9 h-9 rounded-control flex-shrink-0 flex items-center justify-center", isFuture ? "[background:rgba(249,247,242,0.08)] [border:1px_solid_rgba(249,247,242,0.12)]" : "[background:rgba(231,111,38,0.15)] [border:1px_solid_rgba(231,111,38,0.25)]")}

          >
            {isFuture ? (
              <AccessTimeRounded className="w-4 h-4 text-outline" />
            ) : (

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

      <div className="mb-5">
        <div className="grid grid-cols-3 gap-2">
          {displaySpecs.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={i}
                className="bg-surface border border-outline rounded-control px-1.5 py-2 sm:py-2.5 flex flex-col items-center justify-center gap-1 text-center shadow-xs hover:shadow-md hover:border-brand-warm/40 hover:bg-white transition-all duration-200 group"
              >
                {Icon && (
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                    s.accent
                      ? 'bg-brand-warm/15 text-brand-warm group-hover:bg-brand-warm group-hover:text-white'
                      : 'bg-[#EDE8E1] text-[#6B5E57] group-hover:bg-brand-warm group-hover:text-white'
                  }`}>
                    <Icon style={{ fontSize: 16 }} />
                  </div>
                )}

                <span className="text-[11px] font-bold text-[#554E48] tracking-tight leading-tight line-clamp-1">
                  {s.label}
                </span>

                <span className={`text-[12px] font-extrabold leading-tight tracking-tight ${
                  s.accent ? 'text-brand-warm' : s.muted ? 'text-[#554E48]' : 'text-ink'
                }`}>
                  {s.value}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="pt-1">
        <TowerEngagementPanel />
      </div>

    </div>
  );
};

export default ShowcaseTower;
