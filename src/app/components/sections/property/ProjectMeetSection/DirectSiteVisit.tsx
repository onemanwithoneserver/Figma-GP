import React from 'react';
import SlotBooking from './SlotBooking';

interface Props {
  onBack: () => void;
  showBack?: boolean;
}

const DirectSiteVisit: React.FC<Props> = ({ onBack, showBack = true }) => {
  return (
    <div className="flex flex-col gap-5 animate-fade-in bg-white p-2">
      {showBack && (
        <div className="flex items-center gap-2 mb-2">
          <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <span className="text-lg font-bold text-gray-800">Direct Site Visit</span>
        </div>
      )}
      <SlotBooking />
    </div>
  );
};

export default DirectSiteVisit;