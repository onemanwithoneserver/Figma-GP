import React from 'react';

const BANKS = [
  {
    name: 'State Bank of India',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/SBI-logo.svg',
    rate: '8.40%', processing: '0.25%',
  },
  {
    name: 'HDFC Bank',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/28/HDFC_Bank_Logo.svg',
    rate: '8.55%', processing: '0.15%',
  },
  {
    name: 'ICICI Bank',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/12/ICICI_Bank_Logo.svg',
    rate: '8.65%', processing: '₹4,999',
  },
  {
    name: 'Axis Bank',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Axis_Bank_logo.svg',
    rate: '8.70%', processing: 'Nil',
  },
];

export default function BankingPartners() {
  return (
    <div className="w-full bg-white font-['Outfit',_sans-serif] p-4">

      {/* ── Header ── */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-[18px] font-extrabold text-[#0F172A] tracking-tight">Loan Assistance</h3>
          <p className="text-[12.5px] font-medium text-gray-500 mt-0.5">Compare home loan rates</p>
        </div>

      </div>

      {/* ── Bank Cards ── */}
      <div className="flex flex-col gap-2.5 mb-5">
        {BANKS.map((bank) => (
          <div
            key={bank.name}
            className="flex items-center justify-between p-3.5 rounded-[7px] border border-orange-200 bg-orange-50/50 shadow-[0_2px_10px_rgba(249,115,22,0.10)] transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-[7px] flex items-center justify-center bg-white border border-[#E8E5DF] shadow-sm overflow-hidden shrink-0 p-1.5">
                <img
                  src={bank.logoUrl}
                  alt={bank.name + ' logo'}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <p className="text-[14px] font-bold text-[#0F172A]">{bank.name}</p>
                </div>
                <p className="text-[12px] text-gray-500 font-medium">
                  ROI from{' '}
                  <span className="font-extrabold text-[#0F172A]">{bank.rate}</span>
                  <span className="text-gray-400"> p.a.*</span>
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-gray-400 font-bold tracking-wide">Processing</p>
              <p className="text-[13px] font-extrabold text-[#0F172A]">{bank.processing}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="text-[11px] text-gray-400 font-medium mb-4">
        *Rates are indicative and subject to individual eligibility & bank T&Cs.
      </p>

      <button
        aria-label="Check your home loan eligibility"
        className="w-full py-3.5 rounded-[7px] text-[14.5px] font-extrabold text-white transition-colors shadow-lg active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:outline-none"
        style={{ background: 'linear-gradient(90deg, #F97316 0%, #ea6c0e 100%)' }}
      >
        Check My Eligibility
      </button>
    </div>
  );
}