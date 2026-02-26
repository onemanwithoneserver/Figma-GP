import React, { useState } from 'react';
import OnlineVisit from './OnlineVisit';
import DirectSiteVisit from './DirectSiteVisit';

const Consultation: React.FC = () => {
  const [type, setType] = useState<'online' | 'site' | null>(null);

  if (type === 'online') return <OnlineVisit onBack={() => setType(null)} />;
  if (type === 'site') return <DirectSiteVisit onBack={() => setType(null)} />;

  return (
    <div className="flex flex-col gap-4">
      <p className="text-[14px] font-bold text-[#2F3D5A] mb-1">Select meeting type:</p>
      
      {/* Online Visit Option */}
      <button 
        onClick={() => setType('online')}
        className="flex items-center gap-4 p-4 border-2 border-slate-100 rounded-[7px] hover:border-[#F85B01]/30 hover:shadow-lg hover:-translate-y-0.5 transition-all text-left group bg-gradient-to-br from-white to-blue-50/20"
      >
        <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-blue-100 rounded-[7px] flex items-center justify-center text-xl shadow-sm">💻</div>
        <div className="flex-1">
          <h4 className="text-[15px] font-bold text-[#2F3D5A]">Virtual Tour</h4>
          <p className="text-[12px] text-gray-500 font-medium">Video call with a project expert</p>
        </div>
        <div className="text-[#F85B01] opacity-0 group-hover:opacity-100 transition-opacity">→</div>
      </button>

      {/* Site Visit Option */}
      <button 
        onClick={() => setType('site')}
        className="flex items-center gap-4 p-4 border-2 border-slate-100 rounded-[7px] hover:border-[#F85B01]/30 hover:shadow-lg hover:-translate-y-0.5 transition-all text-left group bg-gradient-to-br from-white to-orange-50/20"
      >
        <div className="w-12 h-12 bg-gradient-to-br from-orange-50 to-orange-100 rounded-[7px] flex items-center justify-center text-xl shadow-sm">🚗</div>
        <div className="flex-1">
          <h4 className="text-[15px] font-bold text-[#2F3D5A]">Direct Site Visit</h4>
          <p className="text-[12px] text-gray-500 font-medium">Physical visit with pickup facility</p>
        </div>
        <div className="text-[#F85B01] opacity-0 group-hover:opacity-100 transition-opacity">→</div>
      </button>
    </div>
  );
};

export default Consultation;