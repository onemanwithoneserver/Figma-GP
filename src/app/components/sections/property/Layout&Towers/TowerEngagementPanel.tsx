import React, { useState } from 'react';

interface TowerEngagementPanelProps {
  towerName: string;
}

const reactions = [
  {
    key: 'like',
    label: 'Like it',
    icon: (
      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
      </svg>
    ),
    activeStyle: { background: 'linear-gradient(135deg,#F85B01,#C94A00)', boxShadow: '0 0 14px rgba(248,91,1,0.4)' },
    activeText: 'text-white',
  },
  {
    key: 'info',
    label: 'Need Info',
    icon: (
      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
      </svg>
    ),
    activeStyle: { background: 'linear-gradient(135deg, #322822, #1E1713)' },
    activeText: 'text-[#F9F7F2]',
  },
  {
    key: 'pass',
    label: 'Not for Me',
    icon: (
      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z" />
      </svg>
    ),
    activeStyle: { background: 'linear-gradient(135deg, #8C827A, #6B5E57)' },
    activeText: 'text-[#F9F7F2]',
  },
];

const questions = [
  'Is this tower fully occupied?',
  'Which floors have the best views?',
  'Any maintenance or corpus charges?',
];

const TowerEngagementPanel: React.FC<TowerEngagementPanelProps> = ({ towerName }) => {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="space-y-5">
      {/* ── Reaction Row ── */}
      <div>
        <p className="text-[10px] font-bold text-[#8C827A] tracking-widest mb-3 uppercase">How do you feel about {towerName}?</p>
        <div className="flex gap-2">
          {reactions.map((r) => {
            const isActive = active === r.key;
            return (
              <button
                key={r.key}
                onClick={() => setActive(isActive ? null : r.key)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-[7px] text-[11px] font-extrabold transition-all duration-200 ${
                  isActive ? r.activeText : 'text-[#6B5E57] bg-white border border-[#E5DFD4] shadow-sm hover:shadow-md hover:-translate-y-px hover:border-[#F85B01]/30'
                }`}
                style={isActive ? r.activeStyle : {}}
              >
                {r.icon}
                {r.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Q&A Card ── */}
      <div className="rounded-[7px] overflow-hidden border border-[#E5DFD4]/50" style={{boxShadow: '0 4px 20px rgba(50,40,34,0.06)'}}>
        
        {/* Dark header */}
        <div className="px-4 py-3 relative overflow-hidden" style={{background: 'linear-gradient(135deg, #322822 0%, #1E1713 100%)'}}>
          <div className="absolute -top-6 -right-6 w-24 h-24 rounded-[7px] opacity-15" style={{background: 'radial-gradient(circle, #F85B01 0%, transparent 70%)'}} />
          <p className="text-[13px] font-extrabold text-[#F9F7F2]">Questions you can ask</p>
        </div>

        {/* Body */}
        <div className="bg-white px-4 py-4 space-y-3.5">
          {questions.map((q, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="mt-0.5 w-5 h-5 rounded-[5px] flex-shrink-0 flex items-center justify-center shadow-sm" style={{background: 'linear-gradient(135deg, #322822, #1E1713)'}}>
                <svg className="w-3 h-3 text-[#E5DFD4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-[12px] font-semibold text-[#322822] leading-snug">{q}</span>
            </div>
          ))}

          {/* Redesigned Customize Question Button */}
          <button className="flex items-start gap-3 w-full group pt-1">
            <div className="mt-0.5 w-5 h-5 rounded-[5px] flex-shrink-0 flex items-center justify-center border border-dashed border-[#8C827A] group-hover:border-[#F85B01] group-hover:bg-[#F85B01]/10 transition-colors">
              <svg className="w-3 h-3 text-[#8C827A] group-hover:text-[#F85B01] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <span className="text-[12px] font-semibold text-[#322822] group-hover:text-[#F85B01] transition-colors leading-snug text-left">
              Write your own question...
            </span>
          </button>
        </div>

        {/* Footer */}
        <div className="bg-white px-4 pb-4 pt-3" style={{borderTop: '1px solid rgba(50,40,34,0.06)'}}>
          <button
            className="w-full py-3 rounded-[7px] text-[13px] font-extrabold text-white tracking-wide transition-all duration-200 hover:-translate-y-px"
            style={{background: 'linear-gradient(135deg,#F85B01,#C94A00)', boxShadow: '0 4px 16px rgba(248,91,1,0.35), inset 0 1px 0 rgba(255,255,255,0.15)'}}
          >
            Ask Seller
          </button>
        </div>
      </div>
    </div>
  );
};

export default TowerEngagementPanel;