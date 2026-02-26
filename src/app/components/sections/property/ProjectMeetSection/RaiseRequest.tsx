import React from 'react';

const RaiseRequest: React.FC = () => {
  return (
    <div className="flex flex-col items-center text-center py-6 animate-fade-in">
      {/* Success Animation Container */}
      <div className="w-20 h-20 bg-green-50 rounded-[7px] flex items-center justify-center mb-4">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>

      <h3 className="text-[18px] font-extrabold text-[#2F3D5A] mb-2">Request Raised Successfully!</h3>
      <p className="text-[13px] text-gray-500 font-medium px-6 leading-relaxed mb-6">
        Your meeting request has been sent to the project coordinator. A Relationship Manager will contact you shortly.
      </p>

      {/* Ticket Card */}
      <div className="w-full bg-gradient-to-br from-[#F8FAFC] to-[#EFF6FF] border border-dashed border-slate-300 rounded-[7px] p-4 mb-6 shadow-sm">
        <div className="flex justify-between mb-2">
          <span className="text-[11px] font-bold text-gray-400 tracking-wide">Request ID</span>
          <span className="text-[11px] font-extrabold text-[#2F3D5A]">#REQ-88291</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[11px] font-bold text-gray-400 tracking-wide">Status</span>
          <span className="text-[11px] font-bold text-orange-500 bg-gradient-to-r from-orange-50 to-orange-100 px-2 py-0.5 rounded-[7px]">Pending Approval</span>
        </div>
      </div>

      <button className="w-full bg-gradient-to-r from-[#2F3D5A] to-[#1E293B] text-white py-4 rounded-[7px] font-extrabold text-[15px] shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all">
        Done
      </button>
    </div>
  );
};

export default RaiseRequest;