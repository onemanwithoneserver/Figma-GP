import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import CheckCircleRounded from '@mui/icons-material/CheckCircleRounded';
import RemoveCircleRounded from '@mui/icons-material/RemoveCircleRounded';
import WarningAmberRounded from '@mui/icons-material/WarningAmberRounded';
import ApartmentRounded from '@mui/icons-material/ApartmentRounded';
import LocationOnRounded from '@mui/icons-material/LocationOnRounded';
import ConstructionRounded from '@mui/icons-material/ConstructionRounded';
import CompassCalibrationRounded from '@mui/icons-material/ExploreRounded';
import PaymentsRounded from '@mui/icons-material/PaymentsRounded';
import PoolRounded from '@mui/icons-material/PoolRounded';
import ScheduleRounded from '@mui/icons-material/ScheduleRounded';
import ShieldOutlined from '@mui/icons-material/ShieldOutlined';
import BookmarkRounded from '@mui/icons-material/BookmarkRounded';
import BookmarkBorderRounded from '@mui/icons-material/BookmarkBorderRounded';
import AssignmentTurnedInRounded from '@mui/icons-material/AssignmentTurnedInRounded';
import CheckRounded from '@mui/icons-material/CheckRounded';

interface FactorItem {
  id: string;
  title: string;
  category: string;
  summary: string;
  icon: React.ReactNode;
}

interface SavedPlan {
  id: string;
  title: string;
  type: string;
  area: string;
  price: string;
  tower: string;
  facing: string;
  features: string[];
}

const FACTORS: Record<'likes' | 'neutral' | 'apprehensions', FactorItem[]> = {
  likes: [
    {
      id: 'l1',
      title: 'Prime Location & Connectivity',
      category: 'Location',
      summary: 'Heart of Financial District, 5 mins to ORR Exit 19, walking distance to major MNC tech parks & international schools.',
      icon: <LocationOnRounded className="text-emerald-500" style={{ fontSize: 18 }} />,
    },
    {
      id: 'l2',
      title: 'Advanced Construction & Speed',
      category: 'Engineering',
      summary: 'Mivan aluminum formwork construction with Grade-A steel; currently tracking 2 months ahead of RERA timeline.',
      icon: <ConstructionRounded className="text-emerald-500" style={{ fontSize: 18 }} />,
    },
    {
      id: 'l3',
      title: '100% Vastu & Triple-Side Open',
      category: 'Design',
      summary: 'East and North facing entrance doors with panoramic floor-to-ceiling sunrise views and zero dead spaces.',
      icon: <CompassCalibrationRounded className="text-emerald-500" style={{ fontSize: 18 }} />,
    },
  ],
  neutral: [
    {
      id: 'n1',
      title: 'Price Alignment with Market',
      category: 'Financial',
      summary: '₹9,500/sq.ft is closely aligned with Financial District Tier-1 benchmarks; flexible milestone-linked payment schedules available.',
      icon: <PaymentsRounded className="text-amber-500" style={{ fontSize: 18 }} />,
    },
    {
      id: 'n2',
      title: 'Clubhouse Delivery Schedule',
      category: 'Amenities',
      summary: '50,000 sq.ft signature clubhouse handover is strictly synchronized with Phase 1 tower possession.',
      icon: <PoolRounded className="text-amber-500" style={{ fontSize: 18 }} />,
    },
  ],
  apprehensions: [
    {
      id: 'a1',
      title: 'Higher Absolute Ticket Size',
      category: 'Pricing',
      summary: 'Spacious luxury carpet areas create higher total unit cost. Competitive 8.35% home loan rates available via pre-approved SBI & HDFC.',
      icon: <PaymentsRounded className="text-amber-600" style={{ fontSize: 18 }} />,
    },
    {
      id: 'a2',
      title: 'Possession Timeline to Dec 2026',
      category: 'Timeline',
      summary: 'Target completion Dec 2026. Construction is actively verified by TSRERA escrow audits with penalty-backed milestone guarantees.',
      icon: <ScheduleRounded className="text-amber-600" style={{ fontSize: 18 }} />,
    },
    {
      id: 'a3',
      title: 'Long-term Society Maintenance',
      category: 'Operations',
      summary: 'Professional facility management agency onboarded with dedicated sinking fund and 3-year builder warranty.',
      icon: <ShieldOutlined className="text-amber-600" style={{ fontSize: 18 }} />,
    },
  ],
};

const SAVED_PLANS: SavedPlan[] = [
  {
    id: 'p1',
    title: '2 BHK Luxury Suite',
    type: '2 BHK',
    area: '1,280 sq.ft.',
    price: '₹1.12 Cr',
    tower: 'Tower B · Floor 14',
    facing: 'East Facing',
    features: ['Grand Living Room', 'Master with En-Suite', 'East Sunrise Balcony'],
  },
  {
    id: 'p2',
    title: '3 BHK Grand Sky Villa',
    type: '3 BHK',
    area: '1,650 sq.ft.',
    price: '₹1.48 Cr',
    tower: 'Tower A · Floor 22',
    facing: 'East Facing',
    features: ['Home Office Nook', 'Double Height Balcony', 'Walk-in Dresser'],
  },
];

const TAB_BUTTONS = [
  { key: 'likes' as const, label: 'Likes', count: 3, icon: <CheckCircleRounded style={{ fontSize: 15 }} />, color: 'text-emerald-600' },
  { key: 'neutral' as const, label: 'Neutral', count: 2, icon: <RemoveCircleRounded style={{ fontSize: 15 }} />, color: 'text-amber-600' },
  { key: 'apprehensions' as const, label: 'Apprehensions', count: 3, icon: <WarningAmberRounded style={{ fontSize: 15 }} />, color: 'text-rose-600' },
];

const ProjectSummary: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'likes' | 'neutral' | 'apprehensions'>('likes');
  const [savedPlans, setSavedPlans] = useState<Record<string, boolean>>({ p1: true, p2: true });

  const toggleSavePlan = (id: string) => {
    setSavedPlans((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="w-full bg-white rounded-control shadow-xl shadow-black/5 border border-gray-100 p-3.5 sm:p-5 mb-4">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-3.5 mb-3.5">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-7 h-7 rounded-full bg-amber-50 text-brand">
              <AssignmentTurnedInRounded style={{ fontSize: 18 }} />
            </div>
            <h2 className="text-[19px] sm:text-[21px] font-extrabold text-ink tracking-tight">
              Project Summary
            </h2>
          </div>
          <p className="text-[12px] text-ink-muted mt-0.5">
            Personalized buyer decision matrix based on your walkthrough &amp; preferences.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 shadow-sm">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="text-[11px] font-extrabold text-emerald-800 uppercase tracking-wide">
            85% Buyer Match
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
        <div className="bg-surface-soft border border-outline/70 rounded-control p-2.5 text-center">
          <span className="text-[10px] font-semibold text-ink-subtle uppercase block">Vastu Compliance</span>
          <span className="text-[13px] font-extrabold text-ink mt-0.5 block">100% East/North</span>
        </div>
        <div className="bg-surface-soft border border-outline/70 rounded-control p-2.5 text-center">
          <span className="text-[10px] font-semibold text-ink-subtle uppercase block">Construction</span>
          <span className="text-[13px] font-extrabold text-emerald-700 mt-0.5 block">Ahead of Schedule</span>
        </div>
        <div className="bg-surface-soft border border-outline/70 rounded-control p-2.5 text-center">
          <span className="text-[10px] font-semibold text-ink-subtle uppercase block">Target Handover</span>
          <span className="text-[13px] font-extrabold text-brand-dark mt-0.5 block">December 2026</span>
        </div>
        <div className="bg-surface-soft border border-outline/70 rounded-control p-2.5 text-center">
          <span className="text-[10px] font-semibold text-ink-subtle uppercase block">Car Parking</span>
          <span className="text-[13px] font-extrabold text-ink mt-0.5 block">2 Covered Bays</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-1.5 bg-surface-muted/60 p-1 rounded-control border border-outline/60 mb-3.5">
        {TAB_BUTTONS.map((tab) => {
          const isActive = activeTab === tab.key;

          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`relative flex items-center justify-center gap-1.5 py-2 px-2 rounded-chip text-[12px] font-bold transition-all duration-200 cursor-pointer outline-none ${
                isActive
                  ? 'bg-white text-ink shadow-sm border border-black/5'
                  : 'text-ink-muted hover:text-ink hover:bg-white/50'
              }`}
            >
              <span className={tab.color}>{tab.icon}</span>
              <span>{tab.label}</span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full font-bold ${
                  isActive ? 'bg-orange-100 text-brand-dark' : 'bg-black/5 text-ink-subtle'
                }`}
              >
                {tab.count}
              </span>

              {isActive && (
                <motion.div
                  layoutId="summary-active-pill"
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full bg-brand"
                />
              )}
            </button>
          );
        })}
      </div>

      <div className="mb-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-2.5"
          >
            {FACTORS[activeTab].map((factor) => (
              <motion.div
                key={factor.id}
                whileHover={{ y: -1 }}
                className={`flex items-start gap-3 p-3 rounded-control border transition-all duration-200 ${
                  activeTab === 'likes'
                    ? 'bg-emerald-50/40 border-emerald-100 hover:border-emerald-200 hover:bg-emerald-50/70'
                    : activeTab === 'neutral'
                    ? 'bg-amber-50/30 border-amber-100 hover:border-amber-200 hover:bg-amber-50/60'
                    : 'bg-rose-50/30 border-rose-100 hover:border-rose-200 hover:bg-rose-50/60'
                }`}
              >
                <div className="flex items-center justify-center w-7 h-7 rounded-full bg-white shadow-sm flex-shrink-0 mt-0.5 border border-black/5">
                  {factor.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <h4 className="text-[13px] font-bold text-ink leading-tight">
                      {factor.title}
                    </h4>
                    <span className="text-[10px] font-bold text-ink-subtle uppercase tracking-wider px-1.5 py-0.2 rounded bg-white/70 border border-black/5">
                      {factor.category}
                    </span>
                  </div>
                  <p className="text-[11.5px] text-ink-muted leading-relaxed">
                    {factor.summary}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="pt-3 border-t border-gray-100">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-1.5">
            <ApartmentRounded className="text-brand-warm" style={{ fontSize: 18 }} />
            <h3 className="text-[14.5px] font-extrabold text-ink">
              Shortlisted Floor Plans
            </h3>
          </div>
          <span className="text-[11px] font-semibold text-brand">
            {Object.values(savedPlans).filter(Boolean).length} Plans Saved
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {SAVED_PLANS.map((plan) => {
            const isBookmarked = savedPlans[plan.id];

            return (
              <motion.div
                key={plan.id}
                whileHover={{ y: -2 }}
                className={`relative p-3 rounded-control border transition-all duration-200 ${
                  isBookmarked
                    ? 'bg-gradient-to-br from-white to-orange-50/30 border-brand-warm/40 shadow-sm'
                    : 'bg-white border-outline/70 opacity-75'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div>
                    <span className="text-[10px] font-extrabold font-mono uppercase tracking-wider text-brand">
                      {plan.type} · {plan.area}
                    </span>
                    <h4 className="text-[13px] font-bold text-ink leading-tight mt-0.5">
                      {plan.title}
                    </h4>
                    <span className="text-[11px] text-ink-muted">
                      {plan.tower} · {plan.facing}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleSavePlan(plan.id)}
                    className="p-1 rounded-full text-brand hover:bg-orange-50 transition-colors cursor-pointer"
                    title={isBookmarked ? 'Remove bookmark' : 'Bookmark plan'}
                  >
                    {isBookmarked ? (
                      <BookmarkRounded style={{ fontSize: 20 }} />
                    ) : (
                      <BookmarkBorderRounded style={{ fontSize: 20 }} className="text-gray-400" />
                    )}
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-1 my-2">
                  {plan.features.map((feat) => (
                    <span
                      key={feat}
                      className="text-[9.5px] font-semibold text-ink-muted bg-white/80 border border-outline/60 px-1.5 py-0.5 rounded-chip"
                    >
                      {feat}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-1.5 border-t border-outline/40">
                  <span className="text-[10px] text-ink-subtle font-medium">All-inclusive value</span>
                  <span className="text-[14px] font-black font-mono text-brand-dark">
                    {plan.price}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProjectSummary;