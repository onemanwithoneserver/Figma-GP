import React from 'react';

const REQUEST_STATUS = [
  { label: 'Request Raised', date: '22 Feb, 10:30 AM', status: 'completed' },
  { label: 'Expert Assigned', date: '22 Feb, 11:15 AM', status: 'completed' },
  { label: 'Meeting Scheduled', date: 'Pending', status: 'active' },
  { label: 'Consultation Done', date: '--', status: 'upcoming' },
];

const TrackRequest: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h4 className="text-[15px] font-extrabold text-[#2F3D5A]">Active Request</h4>
          <p className="text-[11px] font-bold text-[#F85B01]">Direct Site Visit • #REQ-88291</p>
        </div>
        <button className="text-[12px] font-bold text-blue-600 hover:underline">View Details</button>
      </div>

      {/* Vertical Timeline */}
      <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[11px] before:-z-10 before:h-full before:w-0.5 before:bg-slate-100">
        {REQUEST_STATUS.map((step, idx) => (
          <div key={idx} className="relative flex items-start gap-4">
            {/* Status Dot */}
            <div className={`mt-1.5 w-[24px] h-[24px] rounded-full border-4 border-white flex items-center justify-center shadow-sm z-10 ${
              step.status === 'completed' ? 'bg-green-500' : 
              step.status === 'active' ? 'bg-[#F85B01]' : 'bg-slate-200'
            }`}>
              {step.status === 'completed' && (
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4"><polyline points="20 6 9 17 4 12"></polyline></svg>
              )}
            </div>

            <div className="flex-1">
              <h5 className={`text-[13px] font-bold ${step.status === 'upcoming' ? 'text-gray-400' : 'text-[#2F3D5A]'}`}>
                {step.label}
              </h5>
              <p className="text-[11px] font-medium text-gray-500">{step.date}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-[7px] flex items-center gap-3 border border-blue-100 shadow-sm">
        <div className="text-xl">📞</div>
        <div>
          <p className="text-[12px] font-bold text-[#2F3D5A]">Need help with this request?</p>
          <p className="text-[11px] font-medium text-blue-600">Call Support: +91 98XXX XXXXX</p>
        </div>
      </div>
    </div>
  );
};

export default TrackRequest;