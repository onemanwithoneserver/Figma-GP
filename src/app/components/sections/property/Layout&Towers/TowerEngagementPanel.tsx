import React, { useState } from 'react';

const reactions = [
  {
    key: 'yes',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
      </svg>
    ),
    activeStyle: { background: 'linear-gradient(135deg,#E76F26,#C94A00)', boxShadow: '0 0 14px rgba(231,111,38,0.4)', borderColor: '#E76F26' },
    activeText: 'text-white',
  },
  {
    key: 'maybe',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 12h14" />
      </svg>
    ),
    activeStyle: { background: 'linear-gradient(135deg, #322822, #1E1713)', borderColor: '#322822' },
    activeText: 'text-[#F9F7F2]',
  },
  {
    key: 'no',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3.5} d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
    activeStyle: { background: 'linear-gradient(135deg, #8C827A, #6B5E57)', borderColor: '#8C827A' },
    activeText: 'text-[#F9F7F2]',
  },
];

const initialQuestions = [
  'Which units provide best view from balcony?',
  'Corridor width between flats?',
];

const extraQuestions = [
  'Are there any corner flats currently available?',
  'What is the carpet area vs super built-up area?',
  'What is the expected monthly maintenance cost?',
];

const TowerEngagementPanel = ({ towerName }) => {
  const [active, setActive] = useState(null);
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="space-y-2">
      {/* ── Reaction Row ── */}
      <div>
        <p className="text-[14px] font-bold text-[#322822] mb-3 leading-tight">
          Do you like to review this tower/block later?
        </p>
        
        {/* Enforced single row with larger gaps to match the uploaded design */}
        <div className="flex flex-row items-center gap-6">
          {reactions.map((r) => {
            const isActive = active === r.key;
            return (
              <button
                key={r.key}
                onClick={() => setActive(isActive ? null : r.key)}
                className={`flex-shrink-0 flex items-center justify-center w-[36px] h-[36px] rounded-[7px] transition-all duration-200 border ${
                  isActive 
                    ? r.activeText 
                    : 'text-[#554E48] bg-white border-[#E5DFD4] shadow-sm hover:shadow-md hover:-translate-y-px hover:border-[#E76F26]/40 hover:text-[#E76F26]'
                }`}
                style={isActive ? r.activeStyle : {}}
              >
                {/* Icon only, exact match to the screenshot */}
                {r.icon}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Q&A Card ── */}
      <div className="rounded-[7px] overflow-hidden border border-[#E5DFD4]/50" style={{boxShadow: '0 4px 20px rgba(50,40,34,0.06)'}}>

        {/* Body */}
        <div className="bg-white px-4 py-3 space-y-3">
          
          {/* Preset Questions Map */}
          {[...initialQuestions, ...(showMore ? extraQuestions : [])].map((q, i) => (
            <div key={i} className="flex items-start gap-2.5 cursor-pointer group">
              <div className="mt-0.5 w-4 h-4 rounded-[4px] flex-shrink-0 flex items-center justify-center shadow-sm transition-colors group-hover:bg-[#E76F26]" style={{background: 'linear-gradient(135deg, #322822, #1E1713)'}}>
                <svg className="w-2.5 h-2.5 text-[#E5DFD4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-[12px] font-semibold text-[#322822] leading-tight group-hover:text-[#E76F26] transition-colors">{q}</span>
            </div>
          ))}

          <div className="h-px w-full bg-[#E5DFD4]/50 my-1"></div>

          {/* Load More / Show Fewer Questions Button */}
          <button 
            onClick={() => setShowMore(!showMore)} 
            className="flex items-center gap-2.5 w-full group"
          >
            <div className="w-4 h-4 rounded-[4px] flex-shrink-0 flex items-center justify-center bg-[#F9F7F2] border border-[#E5DFD4] group-hover:border-[#E76F26] transition-colors">
              <svg className="w-2.5 h-2.5 text-[#8C827A] group-hover:text-[#E76F26] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {showMore ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                )}
              </svg>
            </div>
            <span className="text-[12px] font-bold text-[#E76F26] underline group-hover:text-[#E76F26] transition-colors leading-tight text-left">
              {showMore ? 'Show fewer questions' : 'Load more questions'}
            </span>
          </button>

          {/* Custom Question Button */}
          <button className="flex items-center gap-2.5 w-full group">
            <div className="w-4 h-4 rounded-[4px] flex-shrink-0 flex items-center justify-center border border-dashed border-[#8C827A] group-hover:border-[#E76F26] group-hover:bg-[#E76F26]/10 transition-colors">
              <svg className="w-2.5 h-2.5 text-[#8C827A] group-hover:text-[#E76F26] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <span className="text-[12px] font-bold text-[#554E48] group-hover:text-[#E76F26] transition-colors leading-tight text-left">
              Custom question
            </span>
          </button>

        </div>

        {/* Footer */}
        <div className="bg-white px-4 pb-3.5 pt-1.5" style={{borderTop: '1px solid rgba(50,40,34,0.06)'}}>
          {/* Replaced gradient background with solid #E76F26 */}
          <button
            className="w-full py-2.5 rounded-[7px] text-[13px] font-extrabold bg-[#2B231D] text-[#ffffff] tracking-wide transition-all duration-200"
          >
            Ask Seller
          </button>
        </div>
      </div>
    </div>
  );
};

export default TowerEngagementPanel;