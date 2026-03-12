import React from 'react';
import SlotBooking from './SlotBooking';

interface Props {
  onBack: () => void;
  showBack?: boolean;
}

const OnlineVisit: React.FC<Props> = ({ onBack, showBack = true }) => {
  return (
    <div className="flex flex-col gap-1 animate-fade-in">
      {showBack && (
        <div className="flex items-center gap-2">
          <button onClick={onBack} aria-label="Go back" title="Go back" className="p-1 hover:bg-[#FFF1E3] rounded-[5px] transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#322822" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          <span className="text-[15px] font-extrabold text-[#322822]">Online Consultation</span>
        </div>
      )}
      <SlotBooking />
    </div>
  );
};

export default OnlineVisit;