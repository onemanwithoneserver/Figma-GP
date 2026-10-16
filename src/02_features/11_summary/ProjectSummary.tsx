import AssignmentOutlined from '@mui/icons-material/AssignmentOutlined';
import ChevronLeftRounded from '@mui/icons-material/ChevronLeftRounded';
import CheckCircleRounded from '@mui/icons-material/CheckCircleRounded';
import RemoveCircleRounded from '@mui/icons-material/RemoveCircleRounded';
import ErrorRounded from '@mui/icons-material/ErrorRounded';
import SpaceDashboardRounded from '@mui/icons-material/SpaceDashboardRounded';
import CheckBoxRounded from '@mui/icons-material/CheckBoxRounded';
import { getScrollBehavior } from '../../03_shared/04_motion/useMotionSettings';
import ChevronRightRounded from '@mui/icons-material/ChevronRightRounded';
import { cn } from '../../03_shared/03_utils/utils';
import { ActionButton } from '../../03_shared/02_ui/ActionButton';
import { useState } from 'react';
import React from 'react';

interface SavedPlan {
  id: string;
  title: string;
  subtitle: string;
  notes?: string[];
}

interface ExitSummaryData {
  likes: string[];
  neutral: string[];
  apprehensions: string[];
  savedPlans: SavedPlan[];
}

const SUMMARY_DATA: ExitSummaryData = {
  likes: ['Location & Connectivity', 'Construction', 'Vaastu / Facing'],
  neutral: ['Price Fit', 'Amenities'],
  apprehensions: [
    'Overall pricing range',
    'Possession timeline',
    'Long-term maintenance'
  ],
  savedPlans: [
    {
      id: 'p1',
      title: '2 BHK • 1280 sq ft',
      subtitle: 'Tower B  ·  ₹1.12 Cr  ·  East Facing',
    },
    {
      id: 'p2',
      title: '3 BHK • 1650 sq ft',
      subtitle: 'Tower A • ₹1.48 Cr • East Facing',
      notes: []
    }
  ]
};




const TAB_CONFIG = [
  { key: 'likes', label: 'Likes', emoji: '👍' },
  { key: 'neutral', label: 'Neutral', emoji: '😐' },
  { key: 'apprehensions', label: 'Apprehensions', emoji: '❓' },
];


const ProjectSummary: React.FC = () => {
  const [activeTab, setActiveTab] = useState('likes');
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(false);

  const updateScrollButtons = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 2);
    setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 2);
  };

  React.useEffect(() => {
    const node = scrollRef.current;
    if (!node) return;
    updateScrollButtons();
    node.addEventListener('scroll', updateScrollButtons);
    window.addEventListener('resize', updateScrollButtons);
    return () => {
      node.removeEventListener('scroll', updateScrollButtons);
      window.removeEventListener('resize', updateScrollButtons);
    };
  }, []);

  const handleTabClick = (id: string, e: React.MouseEvent<HTMLButtonElement>) => {
    setActiveTab(id);
    e.currentTarget.scrollIntoView({ behavior: getScrollBehavior(), block: 'nearest', inline: 'center' });
    requestAnimationFrame(updateScrollButtons);
  };

  const scrollTabs = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: direction === 'left' ? -140 : 140, behavior: getScrollBehavior() });
  };

  const getTabData = () => {
    if (activeTab === 'likes') return SUMMARY_DATA.likes;
    if (activeTab === 'neutral') return SUMMARY_DATA.neutral;
    if (activeTab === 'apprehensions') return SUMMARY_DATA.apprehensions;
    return [];
  };

  return (
    <div className="bg-white">
      <div id="panel-summary" role="tabpanel" className="bg-white overflow-hidden min-h-[320px] transition-all duration-300 p-1">
        {/* Header with emoji on right */}
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-[20px] font-extrabold text-[#3A312B]">
            Project Summary
          </h2>
          <span className="text-[20px]">
            <AssignmentOutlined className="w-[22px] h-[22px] text-[#7A5C3A]" />
          </span>
        </div>

        {/* Heading and Subtext */}
        <div className="mb-1">
          <p className="text-[12px] text-[#6B6B7B]">Review the factors below based on your select preferences.</p>
        </div>

        {/* Centered Tab Navigation */}
        <div className="flex justify-center">
          <div className="relative w-full max-w-xl">
            {canScrollLeft && (
              <ActionButton
                type="button"
                onClick={() => scrollTabs('left')}
                aria-label="Scroll tabs left"
                className="absolute left-1 top-1/2 -translate-y-1/2 z-10 h-7 w-7 rounded-tab bg-surface-tab text-ink flex items-center justify-center"
              >
                <ChevronLeftRounded className="w-[14px] h-[14px]" />
              </ActionButton>
            )}

            <div
              ref={scrollRef}
              className="flex overflow-x-auto scrollbar-hide gap-2 px-2 pt-2 pb-1.5 bg-white"
              role="tablist"
              aria-label="Project Summary section navigation"
            >
              {TAB_CONFIG.map((tab) => {
                const isActive = activeTab === tab.key;
                return (
                  <ActionButton
                    key={tab.key}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`panel-${tab.key}`}
                    onClick={(e) => handleTabClick(tab.key, e)}
                    className={cn("flex-shrink-0 flex items-center justify-center px-1 py-2 text-[12px] leading-none font-semibold rounded-tab transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-brand-warm/25", isActive ? "bg-brand-warm text-white" : "bg-surface-tab text-ink")}

                  >
                    <span className="mr-1">{tab.emoji}</span>
                    {tab.label}
                  </ActionButton>
                );
              })}
            </div>

            {canScrollRight && (
              <ActionButton
                type="button"
                onClick={() => scrollTabs('right')}
                aria-label="Scroll tabs right"
                className="absolute right-1 top-1/2 -translate-y-1/2 z-10 h-7 w-7 rounded-tab bg-surface-tab text-ink flex items-center justify-center"
              >
                <ChevronRightRounded className={["", "w-[14px] h-[14px]"].join(' ')} aria-hidden="true" />
              </ActionButton>
            )}
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-5 mt-1">
          <div>
            <div className="flex flex-col gap-y-2">
              {getTabData().map((item) => (
                <div key={item} className="ml-3 flex items-center gap-x-1">
                  {activeTab === 'likes' && (
                    <CheckCircleRounded className="w-[16px] h-[16px] text-brand-booking" />
                  )}
                  {activeTab === 'neutral' && (
                    <RemoveCircleRounded className="w-[16px] h-[16px] text-[#A39A94]" />
                  )}
                  {activeTab === 'apprehensions' && (
                    <ErrorRounded className="w-[16px] h-[16px] text-[#FFD600]" />
                  )}
                  <span className={`text-[14px] font-bold ${activeTab === 'likes' ? 'text-[#3A312B]' : 'text-[#5A514B]'} leading-tight`}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* SAVED FLOOR PLANS */}
          <div>
            <h3 className="mb-1 flex items-center text-[16px] font-extrabold">
              <span className="mr-1">
                {/* Saved floor-plan icon */}
                <SpaceDashboardRounded className="w-[18px] h-[18px] text-brand-booking" />
              </span>
              <span className={"text-brand-booking"} >Saved Floor Plans</span>
            </h3>
            <div className="flex flex-col gap-y-3">
              {SUMMARY_DATA.savedPlans.map((plan) => (
                <div key={plan.id} className="ml-3 flex items-start gap-x-1">
                  {/* Saved plan indicator */}
                  <CheckBoxRounded className="mt-0.5 shrink-0 w-[16px] h-[16px] text-[#3A312B]" />
                  <div className="flex flex-col ml-1">
                    <span className="text-[14px] font-bold text-[#3A312B] leading-tight">{plan.title}</span>
                    <span className="text-[12px] font-medium text-[#7A716A]">{plan.subtitle}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectSummary;