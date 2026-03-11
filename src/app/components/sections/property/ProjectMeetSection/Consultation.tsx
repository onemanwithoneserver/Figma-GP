import React, { useState } from 'react';
import OnlineVisit from './OnlineVisit';
import DirectSiteVisit from './DirectSiteVisit';

const Consultation: React.FC = () => {
  const [type, setType] = useState<'online' | 'site'>('online');

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-1 rounded-[7px] bg-[#ECE8E1] p-1">
        <button
          type="button"
          onClick={() => setType('online')}
          className="flex-1 rounded-[6px] py-1.5 text-[12px] font-bold transition-all duration-200"
          style={type === 'online'
            ? {
                background: 'linear-gradient(135deg, #F06A00, #D95700)',
                color: 'white',
                boxShadow: '0 0 10px rgba(240,106,0,0.28)'
              }
            : {
                background: 'transparent',
                color: '#3D332D'
              }}
        >
          Online Meet
        </button>
        <button
          type="button"
          onClick={() => setType('site')}
          className="flex-1 rounded-[6px] py-1.5 text-[12px] font-bold transition-all duration-200"
          style={type === 'site'
            ? {
                background: 'linear-gradient(135deg, #F06A00, #D95700)',
                color: 'white',
                boxShadow: '0 0 10px rgba(240,106,0,0.28)'
              }
            : {
                background: 'transparent',
                color: '#3D332D'
              }}
        >
          Direct Site Visit
        </button>
      </div>

      {type === 'online' ? (
        <OnlineVisit onBack={() => setType('online')} showBack={false} />
      ) : (
        <DirectSiteVisit onBack={() => setType('site')} showBack={false} />
      )}
    </div>
  );
};

export default Consultation;