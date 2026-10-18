import { cn } from '../../03_shared/03_utils/utils';
import React from 'react';
import TowerEngagementPanel from './TowerEngagementPanel';
import KingBedRounded from '@mui/icons-material/KingBedRounded';
import ApartmentRounded from '@mui/icons-material/ApartmentRounded';
import HomeWorkRounded from '@mui/icons-material/HomeWorkRounded';
import GridViewRounded from '@mui/icons-material/GridViewRounded';
import ElevatorRounded from '@mui/icons-material/ElevatorRounded';
import EngineeringRounded from '@mui/icons-material/EngineeringRounded';
import SpeedRounded from '@mui/icons-material/SpeedRounded';
import VerifiedRounded from '@mui/icons-material/VerifiedRounded';
import CalendarMonthRounded from '@mui/icons-material/CalendarMonthRounded';

const specs = [
  { label: 'Configurations',        value: '2 & 3 BHK',          icon: KingBedRounded,       accent: false },
  { label: 'Floors',                value: 'G + 14',             icon: ApartmentRounded,     accent: false },
  { label: 'Total Units',           value: '84 Apartments',      icon: HomeWorkRounded,      accent: false },
  { label: 'No.of units per floor', value: '6 Units',            icon: GridViewRounded,      accent: false },
  { label: 'Passenger Lifts',       value: '2 High-speed',       icon: ElevatorRounded,      accent: false },
  { label: 'Service Lifts',         value: '1 Dedicated',        icon: EngineeringRounded,   accent: false },
  { label: 'Lift Ratio',            value: '1 per 28 Flats',     icon: SpeedRounded,         accent: false },
  { label: 'Status',                value: 'Ready to Move',      icon: VerifiedRounded,      accent: true  },
  { label: 'Handover',              value: 'Oct 2024',           icon: CalendarMonthRounded, accent: true  },
];

const TowerA = () => (
  <div className="w-full space-y-0">

    <div className="relative rounded-control overflow-hidden h-56 shadow-xl shadow-black/15 group mb-5">
      <img
        src="https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=1200&q=80"
        alt="Shlok"
        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
      />

      <div className={cn("absolute inset-0", "bg-photo-overlay")} />

      <div className="absolute top-3.5 left-3.5">

      </div>
    </div>

    <div>
      <div className="grid grid-cols-3 gap-2">
        {specs.map((s, i) => {
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
                s.accent ? 'text-[#FC6100]' : 'text-[#9A3F00]'
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

export default TowerA;
