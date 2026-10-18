import React from 'react';
import { motion } from 'motion/react';
import { useMotionSettings } from '../../03_shared/04_motion/useMotionSettings';
import HomeWorkRounded from '@mui/icons-material/HomeWorkRounded';
import TrendingUpRounded from '@mui/icons-material/TrendingUpRounded';
import VerifiedRounded from '@mui/icons-material/VerifiedRounded';
import FamilyRestroomRounded from '@mui/icons-material/FamilyRestroomRounded';
import ParkRounded from '@mui/icons-material/ParkRounded';
import FitnessCenterRounded from '@mui/icons-material/FitnessCenterRounded';
import LocationCityRounded from '@mui/icons-material/LocationCityRounded';
import CurrencyRupeeRounded from '@mui/icons-material/CurrencyRupeeRounded';
import DirectionsSubwayRounded from '@mui/icons-material/DirectionsSubwayRounded';
import SecurityRounded from '@mui/icons-material/SecurityRounded';

interface HighlightItem {
  title: string;
  description: string;
  badge: string;
  icon: React.ElementType;
  metric?: string;
}

const SELF_USE_HIGHLIGHTS: HighlightItem[] = [
  {
    title: 'Low Density & Private Living',
    description: 'Only 4 apartments per floor with high-speed elevators, giving your family maximum privacy, quiet corridors, and natural cross-ventilation.',
    badge: 'Privacy & Space',
    icon: HomeWorkRounded,
    metric: '4 Units / Floor',
  },
  {
    title: '100% Vaastu Compliant Homes',
    description: 'Every layout is architect-crafted with East and North entry options for positive energy, abundant natural morning sunlight, and fresh airflow.',
    badge: 'Positive Energy',
    icon: VerifiedRounded,
    metric: 'East & North',
  },
  {
    title: '12,000 sft Grand Clubhouse',
    description: 'Exclusive resort-style clubhouse with swimming pool, indoor badminton courts, gym, yoga deck, and banquet spaces for family events.',
    badge: 'Lifestyle & Wellness',
    icon: FitnessCenterRounded,
    metric: '12,000 sq.ft',
  },
  {
    title: 'Vehicle-Free Landscaped Podium',
    description: '80% open landscaped spaces with zero surface vehicular traffic, making outdoor play safe for kids and peaceful for walking elders.',
    badge: 'Kids & Elders Safe',
    icon: ParkRounded,
    metric: '80% Open Space',
  },
  {
    title: 'Schools & Essentials Within 10 Mins',
    description: 'Top international schools, multispecialty hospitals, supermarkets, and dining hubs are located in the immediate 3-5 km vicinity.',
    badge: 'Daily Convenience',
    icon: FamilyRestroomRounded,
    metric: '5-10 Min Drive',
  },
];

const INVESTMENT_HIGHLIGHTS: HighlightItem[] = [
  {
    title: 'High Capital Growth Corridor',
    description: 'Hyderabad Hills has consistently demonstrated strong appreciation driven by major IT expansions and premium residential demand.',
    badge: 'Capital Gains',
    icon: TrendingUpRounded,
    metric: '12-15% YoY Growth',
  },
  {
    title: 'High Rental Yield Potential',
    description: 'Situated 15 mins from key tech corridors and financial hubs, ensuring continuous demand from IT professionals and high occupancy rates.',
    badge: 'Steady Cashflow',
    icon: CurrencyRupeeRounded,
    metric: '~4.2% Rental Yield',
  },
  {
    title: 'Upcoming Infrastructure Surge',
    description: 'Proximity to the proposed Metro expansion line and Regional Ring Road (RRR) will significantly boost property valuation on handover.',
    badge: 'Infrastructure Boost',
    icon: DirectionsSubwayRounded,
    metric: 'Metro & RRR Link',
  },
  {
    title: 'Pre-Approved by Leading Banks',
    description: 'HMDA & RERA certified project pre-sanctioned by SBI, HDFC, and ICICI, enabling hassle-free home loan sanctions up to 80%.',
    badge: 'Safe & Clear Title',
    icon: SecurityRounded,
    metric: 'Up to 80% Loan',
  },
  {
    title: 'Gully Properties Delivery Track Record',
    description: 'Reputed builder with a proven track record of timely milestone completions, superior build quality, and high tenant resale value.',
    badge: 'Trusted Developer',
    icon: LocationCityRounded,
    metric: 'On-Time Delivery',
  },
];

interface HighlightsProps {
  mode?: 'self-use' | 'investment';
}

const Highlights: React.FC<HighlightsProps> = ({ mode = 'self-use' }) => {
  const { reducedMotion, itemVariants, staggerVariants } = useMotionSettings();
  const isSelfUse = mode === 'self-use';
  const data = isSelfUse ? SELF_USE_HIGHLIGHTS : INVESTMENT_HIGHLIGHTS;

  return (
    <section className="px-1 py-2 relative">

      <div className="mb-3 flex items-center justify-between rounded-xl bg-surface-muted px-3.5 py-2 border border-outline/50">
        <div className="flex items-center gap-2">
          {isSelfUse ? (
            <FamilyRestroomRounded className="!w-4 !h-4 text-brand" />
          ) : (
            <TrendingUpRounded className="!w-4 !h-4 text-brand" />
          )}
          <span className="text-[12px] font-bold text-ink">
            {isSelfUse ? 'Living Highlights for Families' : 'Financial & Appreciation Insights'}
          </span>
        </div>
        <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-bold text-brand shadow-sm">
          {data.length} Key Factors
        </span>
      </div>

      <motion.div
        variants={staggerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.05 }}
        className="flex flex-col gap-y-2.5"
      >
        {data.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.article
              variants={itemVariants}
              whileHover={reducedMotion ? undefined : { y: -2 }}
              key={item.title}
              className="group flex items-stretch w-full rounded-control bg-white border border-outline/80 transition-all duration-200 hover:border-brand/50 hover:shadow-md overflow-hidden"
            >

              <div className="w-[52px] shrink-0 flex flex-col items-center justify-center bg-surface-muted/70 relative border-r border-outline/40 p-1">
                <div className="absolute inset-y-0 left-0 w-[3px] bg-brand group-hover:w-[4px] transition-all" />
                <span className="text-[17px] font-bold text-brand leading-none mb-1">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <Icon className="!w-4 !h-4 text-ink-subtle group-hover:text-brand transition-colors" />
              </div>

              <div className="flex-1 px-3.5 py-2.5 flex flex-col justify-center min-w-0">
                <div className="flex items-start justify-between gap-1.5 mb-1">
                  <h3 className="text-[12.5px] font-bold text-ink group-hover:text-brand transition-colors duration-200 leading-snug">
                    {item.title}
                  </h3>
                  {item.metric && (
                    <span className="shrink-0 rounded-md bg-brand/10 px-1.5 py-0.5 text-[9.5px] font-bold text-brand whitespace-nowrap">
                      {item.metric}
                    </span>
                  )}
                </div>

                <p className="text-[11.5px] text-ink-muted font-normal leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.article>
          );
        })}
      </motion.div>
    </section>
  );
};

export default Highlights;
