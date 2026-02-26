import React, { useState } from 'react';
import Consultation from './Consultation';
import RaiseRequest from './RaiseRequest';
import TrackRequest from './TrackRequest';

type MeetTab = 'new' | 'track';

const PropertyMeetNav: React.FC = () => {
  const [activeTab, setActiveTab] = useState<MeetTab>('new');

  return (
    <div className="font-['Outfit',_sans-serif] pb-4">
      {/* Orange pill tab bar */}
      <div className="flex gap-2 px-4 pt-1 pb-3">
        {(['new', 'track'] as MeetTab[]).map((tab) => {
          const isActive = activeTab === tab;
          const label = tab === 'new' ? 'New Consultation' : 'Track Requests';
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="flex-1 py-2 text-[13px] font-bold rounded-[7px] transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
              style={isActive ? {
                background: 'linear-gradient(135deg, #F85B01, #C94A00)',
                color: 'white',
                boxShadow: '0 0 14px rgba(248,91,1,0.35), inset 0 1px 0 rgba(255,255,255,0.15)'
              } : {
                background: '#F1F5F9',
                color: '#64748B'
              }}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Content Area */}
      <div className="px-4">
        {activeTab === 'new' ? <Consultation /> : <TrackRequest />}
      </div>
    </div>
  );
};

export default PropertyMeetNav;