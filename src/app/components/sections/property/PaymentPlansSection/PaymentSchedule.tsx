import React from 'react';

const MILESTONES = [
  { stage: 'Booking Amount', percent: '10%', amount: '₹15,00,000', status: 'Immediate', color: '#E76F26', border: '#FFD4B2' },
  { stage: 'Execution of Agreement', percent: '10%', amount: '₹15,00,000', status: 'Within 30 days', color: '#1E90FF', border: '#B2D8FF' },
  { stage: 'Completion of Plinth', percent: '15%', amount: '₹22,50,000', status: 'Construction linked', color: '#22A06B', border: '#B2FFD4' },
  { stage: '5th Slab Completion', percent: '10%', amount: '₹15,00,000', status: 'Construction linked', color: '#A259D9', border: '#E2B2FF' },
  { stage: '10th Slab Completion', percent: '10%', amount: '₹15,00,000', status: 'Construction linked', color: '#F5B700', border: '#FFF7B2' },
  { stage: 'Terrace Completion', percent: '15%', amount: '₹22,50,000', status: 'Construction linked', color: '#FF5A5F', border: '#FFB2B2' },
  { stage: 'Possession', percent: '30%', amount: '₹45,00,000', status: 'Final payment', color: '#322822', border: '#D9D1C3' },
];

export default function PaymentSchedule() {
  return (
    <div className="w-full bg-white font-['Outfit',_sans-serif] p-2">
      <div className="pb-1.5">
       {/*  <h3 className="text-[16px] font-bold text-[#322822]">Payment Schedule</h3> */}
        <p className="text-[14px] text-[#6B5E57] font-medium">Standard construction linked plan</p>
      </div>

      <div className="relative">
        <div className="absolute left-[11px] top-3 bottom-3 w-px bg-[#D9D1C3]" aria-hidden="true" />

        <ol className="flex flex-col gap-1.5" aria-label="Payment milestones">
          {MILESTONES.map((item, idx) => (
            <li key={idx} className="relative flex items-start pl-7">
              <div
                className="absolute left-0 w-[22px] h-[22px] rounded-[5px] flex items-center justify-center z-10 text-[10px] font-semibold text-white"
                aria-hidden="true"
                style={{ background: item.color }}
              >
                {idx + 1}
              </div>

              <div
                className="flex-1 rounded-[5px] p-2 bg-white border"
                style={{ borderColor: item.border }}
              >
                <div className="flex justify-between items-start gap-2">
                  <h4 className="text-[12px] font-semibold text-[#322822] leading-snug flex-1">{item.stage}</h4>
                  <span className="flex-shrink-0 text-[12px] font-semibold text-[#322822]">{item.percent}</span>
                </div>
                <div className="flex justify-between items-center mt-0.5 gap-2">
                  <p className="text-[10px] font-medium text-[#6B5E57]">{item.status}</p>
                  <p className="text-[11px] font-semibold text-[#322822]">{item.amount}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-2 rounded-[5px] p-2 flex items-start gap-2 bg-[#FFF4EC] border border-[#FFD4B2]">
        <div className="w-7 h-7 rounded-[5px] bg-white flex-shrink-0 flex items-center justify-center text-[12px]" aria-hidden="true">
          💡
        </div>
        <p className="text-[10px] text-[#6B5E57] font-medium leading-[1.4]">
          <span className="font-semibold text-[#322822]">GST (5%)</span> and <span className="font-semibold text-[#322822]">Stamp Duty</span> are collected separately as per government norms and are not included above.
        </p>
      </div>
    </div>
  );
}
