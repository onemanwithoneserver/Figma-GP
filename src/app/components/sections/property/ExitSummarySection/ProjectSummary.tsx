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




const TAB_CONFIG = [
  { key: 'likes', label: 'Likes', emoji: '👍', color: '#E06D28' },
  { key: 'neutral', label: 'Neutral', emoji: '😐', color: '#A39A94' },
  { key: 'apprehensions', label: 'Apprehensions', emoji: '❓', color: '#7A716A' },
];

const ProjectSummary: React.FC = () => {
  const [activeTab, setActiveTab] = useState('likes');

  const getTabData = () => {
    if (activeTab === 'likes') return SUMMARY_DATA.likes;
    if (activeTab === 'neutral') return SUMMARY_DATA.neutral;
    if (activeTab === 'apprehensions') return SUMMARY_DATA.apprehensions;
    return [];
  };

  return (
    <section className="w-full bg-white p-1 font-sans text-[#3A312B]">
      {/* Header with emoji on right */}
      <div className="mb-4 flex items-center justify-between">
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
      <div className="mb-3">
        {/* <h3 className="text-[18px] font-bold text-[#23232B] leading-tight mb-1">How this project compares with your preferences</h3> */}
        <p className="text-[14px] text-[#6B6B7B]">Review the factors below based on your select preferences.</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-4">
        {TAB_CONFIG.map((tab) => (
          <button
            key={tab.key}
            className={`flex items-center gap-1 px-4 py-2 rounded-[5px] text-[15px] font-bold transition-all focus:outline-none ${
              activeTab === tab.key
                ? 'bg-[#E06D28] text-white shadow-none'
                : 'bg-[#F5F1EB] text-[#2D2217] shadow-none'
            }`}
            style={{ border: 'none' }}
            onClick={() => setActiveTab(tab.key)}
          >
            <span>{tab.emoji}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="space-y-5">
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