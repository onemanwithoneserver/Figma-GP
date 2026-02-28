import React from 'react';

let _tabIdCounter = 0;

const FolderTab: React.FC<{
  label: string;
  isActive: boolean;
  onClick: () => void;
  className?: string;
}> = ({ label, isActive, onClick, className = "" }) => {
  const [uid] = React.useState(() => `tab-${++_tabIdCounter}`);
  const clipId = `clip-${uid}`;
  const activeGradId = `grad-active-${uid}`;
  const inactiveGradId = `grad-inactive-${uid}`;

  return (
    <button
      onClick={onClick}
      className={`relative h-[38px] w-[160px] sm:w-[180px] shrink-0 outline-none transition-all duration-300 hover:-translate-y-0.5 ${className}`}
    >
      <svg
        className="absolute inset-0 block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 211 41"
      >
        <defs>
          <clipPath id={clipId}>
            <rect width="211" height="41" />
          </clipPath>
          <linearGradient id={activeGradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#43352F" />
            <stop offset="100%" stopColor="#2A211C" />
          </linearGradient>
          <linearGradient id={inactiveGradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F4EFE6" />
            <stop offset="100%" stopColor="#E2D8C9" />
          </linearGradient>
        </defs>
        <g clipPath={`url(#${clipId})`}>
          <path
            d="M10 20C10 8.95431 18.9543 0 30 0L183 0C194.046 0 203 8.95431 203 20V41H10V20Z"
            fill={isActive ? `url(#${activeGradId})` : `url(#${inactiveGradId})`}
            stroke={isActive ? "#A68A56" : "#C7BCAC"}
            strokeWidth="1.5"
          />
          <path
            d="M201.664 9.10362C200.085 3.70784 195.137 0 189.514 0C178.388 0 172.673 13.323 180.342 21.3849L199 41H211L201.664 9.10362Z"
            fill={isActive ? `url(#${activeGradId})` : `url(#${inactiveGradId})`}
          />
          <path
            d="M9.33553 9.10362C10.9148 3.70784 15.8634 0 21.4855 0C32.6122 0 38.3269 13.323 30.6582 21.3849L12 41H0L9.33553 9.10362Z"
            fill={isActive ? `url(#${activeGradId})` : `url(#${inactiveGradId})`}
          />
        </g>
      </svg>

      <span
        className={`absolute inset-0 flex items-center justify-center text-[16px] tracking-[0.1em] font-bold transition-colors duration-300 ${
          isActive
            ? "text-[#F8F3ED]"
            : "text-[#332823] opacity-80 hover:opacity-100"
        }`}
      >
        {label}
      </span>
    </button>
  );
};

interface TabNavigationProps {
  activeTab: 'overview' | 'highlights';
  onTabChange: (tab: 'overview' | 'highlights') => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <section className="w-full py-1.5 bg-[#FDFCF9]">
      <div className="relative flex items-end justify-center -space-x-4 px-2 overflow-visible pt-1 pb-0 w-max max-w-full mx-auto">
        <FolderTab
          label="Overview"
          isActive={activeTab === 'overview'}
          onClick={() => onTabChange('overview')}
          className={activeTab === 'overview' ? 'z-20 scale-105' : 'z-10 opacity-90'}
        />
        <FolderTab
          label="Highlights"
          isActive={activeTab === 'highlights'}
          onClick={() => onTabChange('highlights')}
          className={activeTab === 'highlights' ? 'z-20 scale-105' : 'z-10 opacity-90'}
        />
      </div>
    </section>
  );
};

export default TabNavigation;