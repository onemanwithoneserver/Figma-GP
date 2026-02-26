import React from 'react';

const MILESTONES = [
  { stage: 'Booking Amount',         percent: '10%', amount: '₹15,00,000', status: 'Immediate',          dotColor: '#2563EB' },
  { stage: 'Execution of Agreement', percent: '10%', amount: '₹15,00,000', status: 'Within 30 days',     dotColor: '#2563EB' },
  { stage: 'Completion of Plinth',   percent: '15%', amount: '₹22,50,000', status: 'Construction linked', dotColor: '#8B5CF6' },
  { stage: '5th Slab Completion',    percent: '10%', amount: '₹15,00,000', status: 'Construction linked', dotColor: '#8B5CF6' },
  { stage: '10th Slab Completion',   percent: '10%', amount: '₹15,00,000', status: 'Construction linked', dotColor: '#8B5CF6' },
  { stage: 'Terrace Completion',     percent: '15%', amount: '₹22,50,000', status: 'Construction linked', dotColor: '#8B5CF6' },
  { stage: 'Possession',             percent: '30%', amount: '₹45,00,000', status: 'Final payment',       dotColor: '#F97316' },
];

export default function PaymentSchedule() {
  return (
    <div className="w-full bg-white font-['Outfit',_sans-serif] p-4">

      {/* ── Header ── */}
      <div className="mb-5">
        <h3 className="text-[18px] font-extrabold text-[#0F172A] tracking-tight mb-0.5">Payment Schedule</h3>
        <p className="text-[13px] text-gray-500 font-medium">Standard Construction Linked Plan (CLP)</p>
      </div>

      {/* ── Gradient progress bar ── */}
      <div
        className="mb-5 bg-slate-100 rounded-full h-2 overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="h-full w-full rounded-full"
          style={{ background: 'linear-gradient(90deg, #2563EB, #8B5CF6, #F97316)' }}
        />
      </div>

      {/* ── Timeline ── */}
      <div className="relative">
        {/* Connector line */}
        <div
          className="absolute left-[15px] top-4 bottom-4 w-0.5"
          aria-hidden="true"
          style={{ background: 'linear-gradient(to bottom, #2563EB44, #8B5CF644, #F9731644)' }}
        />

        <ol className="flex flex-col gap-4" aria-label="Payment milestones">
          {MILESTONES.map((item, idx) => (
            <li key={idx} className="relative flex items-start pl-9">
              {/* Numbered dot */}
              <div
                className="absolute left-0 w-8 h-8 rounded-full border-[3px] border-white shadow-md flex items-center justify-center z-10 text-[10.5px] font-black text-white"
                style={{ backgroundColor: item.dotColor }}
                aria-hidden="true"
              >
                {idx + 1}
              </div>

              {/* Card */}
              <div
                className={`flex-1 rounded-[7px] p-3.5 border shadow-md transition-all duration-300 hover:shadow-lg
                  ${ idx === MILESTONES.length - 1
                      ? 'border-orange-200 bg-gradient-to-br from-orange-50/80 to-orange-100/40'
                      : idx <= 1
                      ? 'border-blue-100 bg-gradient-to-br from-blue-50/60 to-blue-100/20'
                      : 'border-gray-100 bg-gradient-to-br from-slate-50/70 to-gray-50/30'
                  }
                `}
              >
                <div className="flex justify-between items-start gap-2">
                  <h4 className="text-[13.5px] font-bold text-[#0F172A] leading-snug flex-1">{item.stage}</h4>
                  <span className="flex-shrink-0 text-[14px] font-black" style={{ color: item.dotColor }}>
                    {item.percent}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-[11.5px] font-semibold text-gray-400">{item.status}</p>
                  <p className="text-[13px] font-extrabold text-[#0F172A]">{item.amount}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* ── Tax note banner ── */}
      <div
        className="mt-6 rounded-[7px] p-4 flex items-start gap-3"
        style={{ background: 'linear-gradient(135deg, #1A2638 0%, #243450 100%)' }}
      >
        <div
          className="w-9 h-9 rounded-[7px] bg-white/10 flex-shrink-0 flex items-center justify-center text-[16px]"
          aria-hidden="true"
        >
          💡
        </div>
        <p className="text-[12px] text-slate-300 font-medium leading-relaxed">
          <span className="font-extrabold text-white">GST (5%)</span> and{' '}
          <span className="font-extrabold text-white">Stamp Duty</span> are collected
          separately as per government norms and are not included above.
        </p>
      </div>
    </div>
  );
}