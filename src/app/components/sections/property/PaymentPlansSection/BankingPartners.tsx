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
    <div className="w-full bg-white font-['Outfit',_sans-serif] p-2">
      <div className="flex justify-between items-center mb-1.5">
        <div>
          <p className="text-[14px] font-medium text-[#6B5E57] mt-0.5">Compare home loan rates</p>
        </div>
      </div>

      <div className="flex flex-col gap-1 mb-2">
        {BANKS.map((bank) => (
          <div key={bank.name} className="flex items-center justify-between p-2 rounded-[5px] bg-white border border-[#E5DFD4] transition-colors">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-[5px] flex items-center justify-center bg-white overflow-hidden shrink-0 p-1">
                <img src={bank.logoUrl} alt={bank.name + ' logo'} className="w-full h-full object-contain" loading="lazy" />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <p className="text-[12px] font-semibold text-[#322822]">{bank.name}</p>
                </div>
                <p className="text-[10px] text-[#6B5E57] font-medium">
                  ROI from <span className="font-semibold text-[#322822]">{bank.rate}</span>
                  <span className="text-[#6B5E57]"> p.a.</span>
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-[#6B5E57] font-medium">Processing</p>
              <p className="text-[11px] font-semibold text-[#322822]">{bank.processing}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="text-[10px] text-[#6B5E57] font-medium mb-2">*Rates are indicative and subject to individual eligibility and bank terms.</p>

      <button
        aria-label="Check your home loan eligibility"
        className="w-full py-1.5 rounded-[5px] text-[11px] font-semibold text-white transition-colors focus-visible:ring-2 focus-visible:ring-[#E76F26]/20 focus-visible:outline-none bg-[#E76F26]"
      >
        Check My Eligibility
      </button>
    </div>
  );
}
