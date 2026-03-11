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
      subtitle: 'Tower B • 7th Floor • East Facing',
    },
    {
      id: 'p2',
      title: '3 BHK • 1650 sq ft',
      subtitle: 'Tower A • 10th Floor • East Facing',
      notes: []
    }
  ]
};

const ProjectSummary: React.FC = () => {
  return (
    <section className="w-full bg-white p-1 font-sans text-[#3A312B]">
      {/* Header with emoji on right */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-[20px] font-extrabold text-[#3A312B]">
          Project Summary
        </h2>
        <span className="text-[20px]">📋</span>
      </div>

      <div className="space-y-5">
        {/* LIKES */}
        <div>
          <h3 className="mb-1 flex items-center text-[16px] font-extrabold">
            <span className="mr-1">👍</span> Likes
          </h3>
          <div className="flex flex-col gap-y-2">
            {SUMMARY_DATA.likes.map((like) => (
              <div key={like} className="ml-3 flex items-center gap-x-1">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#E06D28"/>
                  <path d="M7.5 12L10.5 15L16.5 9" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-[14px] font-bold text-[#3A312B]">{like}</span>
              </div>
            ))}
          </div>
        </div>

        {/* NEUTRAL */}
        <div>
          <h3 className="mb-1 flex items-center text-[16px] font-extrabold">
            <span className="mr-1">😐</span> Neutral
          </h3>
          <div className="flex flex-col gap-y-2">
            {SUMMARY_DATA.neutral.map((item) => (
              <div key={item} className="ml-3 flex items-center gap-x-1">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#A39A94"/>
                  <path d="M8 12H16" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
                <span className="text-[14px] font-bold text-[#5A514B]">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* APPREHENSIONS */}
        <div>
          <h3 className="mb-1 flex items-center text-[16px] font-extrabold">
            <span className="mr-1">❓</span> Apprehensions
          </h3>
          <div className="flex flex-col gap-y-2">
            {SUMMARY_DATA.apprehensions.map((item) => (
              <div key={item} className="ml-3 flex items-start gap-x-1">
                <svg className="mt-0.5 shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#7A716A"/>
                  <path d="M12 8V12M12 16H12.01" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-[14px] font-bold text-[#5A514B] leading-tight">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* SAVED FLOOR PLANS */}
        <div>
          <h3 className="mb-1 flex items-center text-[16px] font-extrabold">
            <span className="mr-1">📐</span> Saved Floor Plans
          </h3>
          <div className="flex flex-col gap-y-3">
            {SUMMARY_DATA.savedPlans.map((plan) => (
              <div key={plan.id} className="ml-3 flex items-start gap-x-1">
                <svg className="mt-0.5 shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="3" width="18" height="18" rx="2" fill="#3A312B" />
                  <path d="M3 9H21M9 21V9" stroke="white" strokeWidth="1.5"/>
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
    </section>
  );
};

export default ProjectSummary;