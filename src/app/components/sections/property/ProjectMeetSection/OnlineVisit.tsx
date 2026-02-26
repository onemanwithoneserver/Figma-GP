import React from 'react';

interface Props { onBack: () => void; }

const OnlineVisit: React.FC<Props> = ({ onBack }) => {
  return (
    <div className="flex flex-col gap-5 animate-fade-in">
      <div className="flex items-center gap-2">
        <button onClick={onBack} className="p-1 hover:bg-slate-100 rounded-[7px] transition-colors">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2F3D5A" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>
        <span className="text-[15px] font-extrabold text-[#2F3D5A]">Online Consultation</span>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-[12px] font-bold text-gray-400 tracking-wide">Preferred Platform</label>
          <div className="grid grid-cols-2 gap-3 mt-2">
            <button className="py-3 border-2 border-[#F85B01] bg-gradient-to-br from-[#FFF3E0] to-[#FFE8CC] text-[#F85B01] rounded-[7px] font-bold text-[13px] shadow-sm hover:shadow-md transition-all">Google Meet</button>
            <button className="py-3 border-2 border-slate-100 text-gray-500 rounded-[7px] font-bold text-[13px] bg-white hover:bg-slate-50 transition-all">Zoom Call</button>
          </div>
        </div>

        <div>
          <label className="text-[12px] font-bold text-gray-400 tracking-wide">Select Date</label>
          <input type="date" className="w-full mt-2 p-3 bg-gradient-to-br from-slate-50 to-slate-100/50 border border-slate-200 rounded-[7px] text-[14px] font-medium outline-none focus:border-[#F85B01] focus:ring-2 focus:ring-[#F85B01]/20 transition-all" />
        </div>

        <button className="w-full bg-gradient-to-r from-[#2F3D5A] to-[#1E293B] text-white py-4 rounded-[7px] font-extrabold text-[15px] shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all mt-2">
          Proceed to Raise Request
        </button>
      </div>
    </div>
  );
};

export default OnlineVisit;