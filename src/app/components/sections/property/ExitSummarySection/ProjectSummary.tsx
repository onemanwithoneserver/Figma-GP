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
    e.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    requestAnimationFrame(updateScrollButtons);
  };

  const scrollTabs = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: direction === 'left' ? -140 : 140, behavior: 'smooth' });
  };

  const getTabData = () => {
    if (activeTab === 'likes') return SUMMARY_DATA.likes;
    if (activeTab === 'neutral') return SUMMARY_DATA.neutral;
    if (activeTab === 'apprehensions') return SUMMARY_DATA.apprehensions;
    return [];
  };

  return (
    <div className="font-['Outfit',_sans-serif] bg-white">
      <div id="panel-summary" role="tabpanel" className="bg-white overflow-hidden min-h-[320px] transition-all duration-300 p-1">
        {/* Header with emoji on right */}
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-[20px] font-extrabold text-[#3A312B]">
            Project Summary
          </h2>
          <span className="text-[20px]">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="5" y="4" width="14" height="18" rx="3" fill="#7A5C3A"/>
              <rect x="9" y="2" width="6" height="4" rx="2" fill="#A97B50"/>
              <rect x="7" y="8" width="10" height="2" rx="1" fill="#fff"/>
              <rect x="7" y="12" width="10" height="2" rx="1" fill="#fff"/>
              <rect x="7" y="16" width="7" height="2" rx="1" fill="#fff"/>
            </svg>
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
              <button
                type="button"
                onClick={() => scrollTabs('left')}
                aria-label="Scroll tabs left"
                className="absolute left-1 top-1/2 -translate-y-1/2 z-10 h-7 w-7 rounded-[4px] bg-[#F3EEE6] text-[#322822] flex items-center justify-center"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
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
                  <button
                    key={tab.key}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`panel-${tab.key}`}
                    onClick={(e) => handleTabClick(tab.key, e)}
                    className="flex-shrink-0 flex items-center justify-center px-1 py-2 text-[12px] leading-none font-semibold rounded-[4px] transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#E76F26]/25"
                    style={isActive ? { background: '#E76F26', color: '#FFFFFF' } : { background: '#F3EEE6', color: '#322822' }}
                  >
                    <span className="mr-1">{tab.emoji}</span>
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {canScrollRight && (
              <button
                type="button"
                onClick={() => scrollTabs('right')}
                aria-label="Scroll tabs right"
                className="absolute right-1 top-1/2 -translate-y-1/2 z-10 h-7 w-7 rounded-[4px] bg-[#F3EEE6] text-[#322822] flex items-center justify-center"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
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
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" fill="#E06D28" />
                      <path d="M7.5 12L10.5 15L16.5 9" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                  {activeTab === 'neutral' && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" fill="#A39A94" />
                      <path d="M8 12H16" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/>
                    </svg>
                  )}
                  {activeTab === 'apprehensions' && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" fill="#FFD600" />
                      <path d="M12 7V12" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/>
                      <circle cx="12" cy="16" r="1.2" fill="#fff" />
                    </svg>
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
                {/* Orange grid SVG icon for Saved Floor Plans heading */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="3" width="18" height="18" rx="2" fill="#E06D28" />
                  <path d="M3 9H21M9 21V9" stroke="#FFF4EC" strokeWidth="1.5"/>
                </svg>
              </span>
              <span style={{ color: '#E06D28' }}>Saved Floor Plans</span>
            </h3>
            <div className="flex flex-col gap-y-3">
              {SUMMARY_DATA.savedPlans.map((plan) => (
                <div key={plan.id} className="ml-3 flex items-start gap-x-1">
                  {/* Brown tick SVG icon for each saved plan */}
                  <svg className="mt-0.5 shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="3" width="18" height="18" rx="2" fill="#3A312B" />
                    <path d="M7 13l3 3 7-7" stroke="#FFD4B2" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
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