import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import CheckRounded from '@mui/icons-material/CheckRounded';

interface SavedPlan {
  id: string;
  type: string;
  area: string;
  price: string;
  tower: string;
  facing: string;
}

const FACTORS: Record<'likes' | 'neutral' | 'apprehensions', string[]> = {
  likes: [
    'Location & Connectivity',
    'Construction',
    'Vaastu / Facing',
  ],
  neutral: [
    'Price Alignment',
    'Clubhouse Delivery Schedule',
    'Open Space & Density',
  ],
  apprehensions: [
    'Higher Absolute Ticket Size',
    'Possession Timeline Buffer',
    'Long-term Maintenance',
  ],
};

const SAVED_PLANS: SavedPlan[] = [
  {
    id: 'p1',
    type: '2 BHK',
    area: '1280 sq ft',
    price: '₹1.12 Cr',
    tower: 'Tower B',
    facing: 'East Facing',
  },
  {
    id: 'p2',
    type: '3 BHK',
    area: '1650 sq ft',
    price: '₹1.48 Cr',
    tower: 'Tower A',
    facing: 'East Facing',
  },
];

const TABS = [
  { key: 'likes' as const, label: 'Likes', emoji: '👍' },
  { key: 'neutral' as const, label: 'Neutral', emoji: '🙄' },
  { key: 'apprehensions' as const, label: 'Apprehensions', emoji: '❓' },
];

const ProjectSummary: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'likes' | 'neutral' | 'apprehensions'>('likes');
  const [savedPlans, setSavedPlans] = useState<Record<string, boolean>>({ p1: true, p2: true });

  const toggleSavePlan = (id: string) => {
    setSavedPlans((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="w-full bg-white px-4 py-5 sm:px-6 sm:py-6 rounded-[16px] border border-gray-100 shadow-sm mb-4">
      <div className="flex items-start justify-between gap-3 mb-1">
        <div>
          <h2 className="text-[25px] sm:text-[27px] font-black text-[#2B231D] tracking-tight leading-tight">
            Project Summary
          </h2>
          <p className="text-[13.5px] sm:text-[14px] text-[#6B7280] font-normal mt-1 leading-normal">
            Review the factors below based on your select preferences.
          </p>
        </div>

        <div className="p-1 text-[#5C4D44] flex-shrink-0 mt-0.5" aria-hidden="true">
          <svg
            width="22"
            height="24"
            viewBox="0 0 20 22"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2.5" y="4.5" width="15" height="16" rx="2" />
            <path d="M7 4.5V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1.5" />
            <line x1="5.5" y1="9.5" x2="14.5" y2="9.5" />
            <line x1="5.5" y1="13.5" x2="14.5" y2="13.5" />
            <line x1="5.5" y1="17.5" x2="11.5" y2="17.5" />
          </svg>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2.5 my-4">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <motion.button
              key={tab.key}
              type="button"
              whileTap={{ scale: 0.96 }}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-[10px] text-[13.5px] sm:text-[14.5px] font-bold transition-all duration-150 cursor-pointer outline-none select-none ${
                isActive
                  ? 'bg-[#E76F26] text-white shadow-sm'
                  : 'bg-[#F5EFEB] text-[#2D241E] hover:bg-[#EFE8E3]'
              }`}
            >
              <span className="text-[14px]">{tab.emoji}</span>
              <span>{tab.label}</span>
            </motion.button>
          );
        })}
      </div>

      <div className="mb-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="flex flex-col gap-3"
          >
            {FACTORS[activeTab].map((title) => (
              <div key={title} className="flex items-center gap-2.5">
                <div className="flex items-center justify-center w-5 h-5 rounded-full bg-[#E76F26] text-white flex-shrink-0 shadow-xs">
                  <CheckRounded style={{ fontSize: 13, strokeWidth: 1.5 }} />
                </div>
                <span className="text-[16px] sm:text-[17px] font-black text-[#2B231D] tracking-tight">
                  {title}
                </span>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="pt-2">
        <div className="flex items-center gap-2 mb-3.5">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-[#E76F26] flex-shrink-0">
            <rect x="2" y="2" width="6" height="16" rx="2" fill="currentColor" />
            <rect x="11" y="2" width="7" height="16" rx="2" fill="currentColor" />
          </svg>
          <h3 className="text-[20px] sm:text-[21px] font-black text-[#E76F26] tracking-tight">
            Saved Floor Plans
          </h3>
        </div>

        <div className="flex flex-col gap-3.5">
          {SAVED_PLANS.map((plan) => {
            const isChecked = Boolean(savedPlans[plan.id]);

            return (
              <div
                key={plan.id}
                onClick={() => toggleSavePlan(plan.id)}
                className="flex items-start gap-3 cursor-pointer group select-none"
              >
                <div
                  className={`w-5 h-5 rounded-[4px] mt-0.5 flex items-center justify-center flex-shrink-0 transition-colors ${
                    isChecked
                      ? 'bg-[#2E2722] text-white'
                      : 'border-2 border-gray-400 bg-white group-hover:border-gray-600'
                  }`}
                >
                  {isChecked && (
                    <CheckRounded style={{ fontSize: 14, strokeWidth: 2 }} />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <span className="text-[16.5px] sm:text-[17.5px] font-black text-[#2B231D] block leading-tight">
                    {plan.type} • {plan.area}
                  </span>
                  <span className="text-[13px] sm:text-[13.5px] text-[#6B7280] font-medium block mt-0.5 leading-snug">
                    {plan.tower} • {plan.price} • {plan.facing}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProjectSummary;