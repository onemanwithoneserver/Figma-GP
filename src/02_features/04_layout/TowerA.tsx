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
  { label: 'Configurations',        value: '2 & 3 BHK',          icon: KingBedRounded,       variant: 'default' },
  { label: 'Floors',                value: 'G + 14',             icon: ApartmentRounded,     variant: 'default' },
  { label: 'Total Units',           value: '84 Apartments',      icon: HomeWorkRounded,      variant: 'default' },
  { label: 'No.of units per floor', value: '6 Units',            icon: GridViewRounded,      variant: 'default' },
  { label: 'Passenger Lifts',       value: '2 High-speed',       icon: ElevatorRounded,      variant: 'default' },
  { label: 'Service Lifts',         value: '1 Dedicated',        icon: EngineeringRounded,   variant: 'default' },
  { label: 'Lift Ratio',            value: '1 per 28 Flats',     icon: SpeedRounded,         variant: 'default' },
  { label: 'Status',                value: 'Ready to Move',      icon: VerifiedRounded,      variant: 'status' },
  { label: 'Handover',              value: 'Oct 2024',           icon: CalendarMonthRounded, variant: 'handover' },
];

const getVariantStyles = (variant?: string) => {
  switch (variant) {
    case 'status':
      return {
        card: 'border-[#CFE5D3] bg-[#EAF3EC]/60 hover:border-[#1B522F]/40 hover:bg-[#EAF3EC]',
        badge: 'bg-[#DDEFE0] text-[#1B522F] group-hover:bg-[#1B522F] group-hover:text-white',
        value: 'text-[#1B522F]',
      };
    case 'handover':
      return {
        card: 'border-amber-200/80 bg-amber-50/20 hover:border-brand-warm/40',
        badge: 'bg-brand-warm/15 text-brand-warm group-hover:bg-brand-warm group-hover:text-white',
        value: 'text-brand-warm',
      };
    default:
      return {
        card: 'border-outline bg-surface hover:border-[#D5CFC9] hover:bg-white',
        badge: 'bg-[#EDE8E1] text-[#6B5E57] group-hover:bg-[#322822] group-hover:text-white',
        value: 'text-[#2C2420]',
      };
  }
};

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
          const styles = getVariantStyles(s.variant);

          return (
            <div
              key={i}
              className={cn(
                "border rounded-control px-1.5 py-2 sm:py-2.5 flex flex-col items-center justify-center gap-1 text-center shadow-xs hover:shadow-md transition-all duration-200 group",
                styles.card
              )}
            >
              {Icon && (
                <div className={cn("w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200", styles.badge)}>
                  <Icon style={{ fontSize: 16 }} />
                </div>
              )}

              <span className="text-[11px] font-bold text-[#554E48] tracking-tight leading-tight line-clamp-1">
                {s.label}
              </span>

              <span className={cn("text-[12px] font-extrabold leading-tight tracking-tight", styles.value)}>
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
