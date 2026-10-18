import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface FactorItem {
  title: string;
  badge: string;
}

interface SavedPlan {
  id: string;
  type: string;
  area: string;
  tower: string;
  price: string;
  facing: string;
}

const FACTORS: Record<'likes' | 'neutral' | 'apprehensions', FactorItem[]> = {
  likes: [
    { title: 'Location & Connectivity', badge: '5 min to ORR' },
    { title: 'Construction', badge: 'Ahead of Schedule' },
    { title: 'Vaastu / Facing', badge: '100% East/North' },
  ],
  neutral: [
    { title: 'Pricing & Payment Structure', badge: 'Market Tier-1' },
    { title: 'Clubhouse Delivery Milestones', badge: 'Phase 1 Sync' },
    { title: 'Open Green Space Ratio', badge: '78% Open' },
  ],
  apprehensions: [
    { title: 'Peak Hour Road Traffic Buffer', badge: 'Link Road Planned' },
    { title: 'Higher Absolute Ticket Size', badge: '8.35% Loan Rate' },
    { title: 'Long-term Society Maintenance', badge: '3-Yr Warranty' },
  ],
};

const SAVED_PLANS: SavedPlan[] = [
  {
    id: 'p1',
    type: '2 BHK',
    area: '1280 sq ft',
    tower: 'Tower B',
    price: '₹1.12 Cr',
    facing: 'East Facing',
  },
  {
    id: 'p2',
    type: '3 BHK',
    area: '1650 sq ft',
    tower: 'Tower A',
    price: '₹1.48 Cr',
    facing: 'East Facing',
  },
];

const TABS = [
  { key: 'likes' as const, label: 'Likes', emoji: '👍' },
  { key: 'neutral' as const, label: 'Neutral', emoji: '😐' },
  { key: 'apprehensions' as const, label: 'Apprehensions', emoji: '❓' },
];

const ProjectSummary: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'likes' | 'neutral' | 'apprehensions'>('likes');
  const [savedPlans, setSavedPlans] = useState<Record<string, boolean>>({ p1: true, p2: true });

  const toggleSavePlan = (id: string) => {
    setSavedPlans((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="bg-white">
      <div id="panel-summary" role="tabpanel" className="bg-white overflow-hidden min-h-[320px] transition-all duration-300 p-2 sm:p-3 rounded-control  shadow-xs">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-[20px] font-extrabold text-[#3A312B]">Project Summary</h2>
          <span className="text-[20px]">
            <svg
              className="w-[22px] h-[22px] text-[#7A5C3A]"
              focusable="false"
              aria-hidden="true"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M7 15h7v2H7zm0-4h10v2H7zm0-4h10v2H7zm12-4h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5c-.14 0-.27.01-.4.04-.39.08-.74.28-1.01.55-.18.18-.33.4-.43.64-.1.23-.16.49-.16.77v14c0 .27.06.54.16.78s.25.45.43.64c.27.27.62.47 1.01.55.13.02.26.03.4.03h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m-7-.25c.41 0 .75.34.75.75s-.34.75-.75.75-.75-.34-.75-.75.34-.75.75-.75M19 19H5V5h14z"
              />
            </svg>
          </span>
        </div>

        <div className="mb-2">
          <p className="text-[12px] text-[#6B6B7B]">Review the factors below based on your select preferences.</p>
        </div>

        <div className="my-2.5 px-3 py-2 rounded-control bg-gradient-to-r from-emerald-50/80 via-surface-soft to-emerald-50/50 border border-emerald-200/80 flex items-center justify-between gap-3 shadow-xs">
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between text-[11.5px] font-bold text-[#3A312B] mb-1">
              <span className="flex items-center gap-1.5">
                <span className="text-emerald-700 font-extrabold">✓</span>
                <span>Preference Compatibility</span>
              </span>
              <span className="text-emerald-700 font-extrabold font-mono text-[12px]">85% Match</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-emerald-100/70 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '85%' }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-[#10B981]"
              />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center px-2 py-0.5 rounded-chip bg-emerald-100/70 border border-emerald-300/70 text-emerald-900 font-mono font-black text-[13px] flex-shrink-0">
            85%
          </div>
        </div>

        <div className="flex justify-start sm:justify-center">
          <div className="relative w-full max-w-xl">
            <div className="flex overflow-x-auto scrollbar-hide gap-2 px-1 pt-1 pb-1 bg-white" role="tablist" aria-label="Project Summary section navigation">
              {TABS.map((tab) => {
                const isActive = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`panel-${tab.key}`}
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex-shrink-0 flex items-center justify-center gap-1.5 px-3 py-1.5 text-[12px] leading-none font-semibold rounded-tab transition-all duration-200 outline-none cursor-pointer select-none ${
                      isActive
                        ? 'bg-brand-warm text-white shadow-sm ring-1 ring-brand-warm/30'
                        : 'bg-surface-tab text-ink hover:bg-[#EAE4DC]'
                    }`}
                  >
                    <span>{tab.emoji}</span>
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="space-y-4 mt-2">
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -3 }}
                transition={{ duration: 0.15 }}
                className="flex flex-col gap-y-1.5"
              >
                {FACTORS[activeTab].map((item) => (
                  <div
                    key={item.title}
                    className="flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-control hover:bg-[#FAF8F5] transition-colors duration-150"
                  >
                    <div className="flex items-center gap-x-2 min-w-0">
                      <svg
                        className="w-[16px] h-[16px] text-brand-booking flex-shrink-0"
                        focusable="false"
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2M9.29 16.29 5.7 12.7a.996.996 0 0 1 0-1.41c.39-.39 1.02-.39 1.41 0L10 14.17l6.88-6.88c.39-.39 1.02-.39 1.41 0s.39 1.02 0 1.41l-7.59 7.59c-.38.39-1.02.39-1.41 0"
                        />
                      </svg>
                      <span className="text-[14px] font-bold text-[#3A312B] leading-tight truncate">
                        {item.title}
                      </span>
                    </div>

                    <span className="text-[10px] font-semibold text-[#8C827A] px-2 py-0.5 rounded-chip bg-[#F3EEE6] border border-[#EBE4DC] flex-shrink-0">
                      {item.badge}
                    </span>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <div>
            <div className="mb-2">
              <h3 className="flex items-center text-[16px] font-extrabold">
                <span className="mr-1.5 flex items-center">
                  <svg
                    className="w-[18px] h-[18px] text-brand-booking"
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M9 21H5c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2m6 0h4c1.1 0 2-.9 2-2v-5c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v5c0 1.1.9 2 2 2m6-13V5c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v3c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2"
                    />
                  </svg>
                </span>
                <span className="text-brand-booking">Saved Floor Plans</span>
              </h3>
            </div>

            <div className="flex flex-col gap-y-2">
              {SAVED_PLANS.map((plan) => {
                const isChecked = Boolean(savedPlans[plan.id]);
                return (
                  <div
                    key={plan.id}
                    onClick={() => toggleSavePlan(plan.id)}
                    className="flex items-center justify-between gap-3 px-2.5 py-2 rounded-control hover:bg-[#FAF8F5] cursor-pointer group select-none transition-colors duration-150 border border-transparent hover:border-[#EBE4DC]"
                  >
                    <div className="flex items-start gap-x-2.5 min-w-0">
                      <button
                        type="button"
                        aria-label={`Toggle ${plan.type}`}
                        className="mt-0.5 shrink-0 text-[#3A312B] group-hover:text-brand-booking transition-colors cursor-pointer outline-none"
                      >
                        {isChecked ? (
                          <svg
                            className="w-[16px] h-[16px]"
                            focusable="false"
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m-8.29 13.29c-.39.39-1.02.39-1.41 0L5.71 12.7a.996.996 0 0 1 0-1.41c.39-.39 1.02-.39 1.41 0L10 14.17l6.88-6.88c.39-.39 1.02-.39 1.41 0s.39 1.02 0 1.41z"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-[16px] h-[16px] text-gray-400 group-hover:text-[#3A312B]"
                            focusable="false"
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
                            />
                          </svg>
                        )}
                      </button>

                      <div className="flex flex-col min-w-0">
                        <span className="text-[14px] font-bold text-[#3A312B] leading-tight">
                          {plan.type} • {plan.area}
                        </span>
                        <span className="text-[12px] font-medium text-[#7A716A] mt-0.5">
                          {plan.tower}  ·  {plan.facing}
                        </span>
                      </div>
                    </div>

                    <span className="text-[13px] font-mono font-bold text-[#3A312B] bg-[#F9F7F2] px-2 py-0.5 rounded-chip border border-[#EBE4DC] flex-shrink-0">
                      {plan.price}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectSummary;