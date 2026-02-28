import React from 'react';

const FolderTab: React.FC<{
  label: string;
  isActive: boolean;
  onClick: () => void;
  className?: string;
}> = ({ label, isActive, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`relative h-[38px] w-[160px] sm:w-[180px] shrink-0 outline-none transition-all duration-300 hover:-translate-y-0.5 ${className}`}
    >
      <svg
        className={`absolute inset-0 block size-full transition-all duration-300 ${
          isActive 
            ? "drop-shadow-[0_-3px_6px_rgba(42,33,28,0.3)]" // Tinted shadow for depth
            : "drop-shadow-[0_-1px_2px_rgba(0,0,0,0.1)]"
        }`}
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 211 41"
      >
        <g clipPath="url(#clip0_tab)">
          <path
            d="M10 20C10 8.95431 18.9543 0 30 0L183 0C194.046 0 203 8.95431 203 20V41H10V20Z"
            fill={isActive ? "url(#vintage-active)" : "url(#vintage-inactive)"}
            // Active stroke changed to a muted gold/bronze for a premium touch
            stroke={isActive ? "#A68A56" : "#C7BCAC"} 
            strokeWidth="1.5"
            className="transition-colors duration-300"
          />
          <path
            d="M201.664 9.10362C200.085 3.70784 195.137 0 189.514 0C178.388 0 172.673 13.323 180.342 21.3849L199 41H211L201.664 9.10362Z"
            fill={isActive ? "url(#vintage-active)" : "url(#vintage-inactive)"}
            className="transition-colors duration-300"
          />
          <path
            d="M9.33553 9.10362C10.9148 3.70784 15.8634 0 21.4855 0C32.6122 0 38.3269 13.323 30.6582 21.3849L12 41H0L9.33553 9.10362Z"
            fill={isActive ? "url(#vintage-active)" : "url(#vintage-inactive)"}
            className="transition-colors duration-300"
          />
        </g>
      </svg>
      
      <span
        className={`absolute inset-0 flex items-center justify-center text-[16px] tracking-[0.1em] font-bold transition-colors duration-300 ${
          isActive 
            ? "text-[#F8F3ED]" // Soft off-white for better readability
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
    <section className="w-full relative py-1.5">
      <svg width="0" height="0" className="absolute pointer-events-none" aria-hidden="true">
        <defs>
          <clipPath id="clip0_tab">
            <rect fill="white" height="41" width="211" />
          </clipPath>
          
          {/* Deepened the active gradient for more "leathery" texture */}
          <linearGradient id="vintage-active" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#43352F" />
            <stop offset="100%" stopColor="#2A211C" />
          </linearGradient>
          
          {/* Enhanced the parchment feel with a slightly warmer bottom stop */}
          <linearGradient id="vintage-inactive" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F4EFE6" />
            <stop offset="100%" stopColor="#E2D8C9" />
          </linearGradient>
        </defs>
      </svg>

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