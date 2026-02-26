import React from 'react';

// --- Types & Interfaces ---
interface SavedPlan {
  id: string;
  title: string;
  subtitle: string;
  notes?: string[];
}

interface ExitSummaryData {
  likes: string[];
  neutral: string[];
  apprehensions: string[];
  savedPlans: SavedPlan[];
}

// --- Mock Data ---
// (You can replace this with your actual dynamic state later)
const SUMMARY_DATA: ExitSummaryData = {
  likes: ['Location & Connectivity', 'Construction', 'Vaastu / Facing'],
  neutral: ['Price Fit', 'Amenities'],
  apprehensions: [
    'Overall pricing range',
    'Possession timeline',
    'Long-term maintenance'
  ],
  savedPlans: [
    {
      id: 'p1',
      title: '2 BHK • 1280 sq ft',
      subtitle: 'Tower B • 7th Floor • East Facing',
      notes: [
        'Budget range noted',
        'Preferred move-in timeline',
        'Interest in site visit'
      ]
    },
    {
      id: 'p2',
      title: '3 BHK • 1650 sq ft',
      subtitle: 'Tower A • 10th Floor • East Facing',
      notes: [] // Empty notes to show dynamic rendering
    }
  ]
};

// --- Inline SVGs ---
const Icons = {
  CheckCircle: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#10B981" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  ),
  Clock: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  ),
  Info: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="16" x2="12" y2="12"></line>
      <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
  ),
  Message: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
  ),
  Bookmark: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
    </svg>
  ),
  Handshake: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2F3D5A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12h20"></path>
      <path d="M6 12v-2a4 4 0 0 1 8 0v2"></path>
      <path d="M10 12v2a4 4 0 0 0 8 0v-2"></path>
    </svg>
  )
};

const ExitSummarySection: React.FC = () => {
  return (
    <div className="font-['Outfit',_sans-serif]">
      {/* Main Header */}
      <h2 className="text-[22px] font-extrabold text-slate-800 mb-2 tracking-tight px-1 drop-shadow-sm">
        Exit Summary
      </h2>
      <p className="text-[14.5px] text-gray-500 font-medium px-1 mb-6 leading-snug">
        Here's a quick snapshot of how you're feeling about this project
      </p>

      <div className="w-full bg-gradient-to-br from-[#F8FAFC] via-[#F8FAFC] to-[#EDF2F7] p-5 rounded-[7px] shadow-lg flex flex-col gap-6">
        
        {/* --- LIKES SECTION --- */}
        <div>
          <h3 className="text-[17px] font-extrabold text-[#2F3D5A] mb-3">Likes</h3>
          {SUMMARY_DATA.likes.length > 0 && (
            <div className="flex flex-wrap gap-2.5">
              {SUMMARY_DATA.likes.map((like, index) => (
                <div key={index} className="flex items-center gap-2 bg-gradient-to-r from-[#ECFDF5] to-[#D1FAE5]/50 border border-[#A7F3D0] px-3.5 py-2.5 rounded-[7px] shadow-md shadow-emerald-500/10">
                  <Icons.CheckCircle />
                  <span className="text-[13.5px] font-bold text-[#059669]">{like}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* --- NEUTRAL SECTION --- */}
        <div>
          <h3 className="text-[17px] font-extrabold text-[#2F3D5A] mb-3">Neutral</h3>
          {SUMMARY_DATA.neutral.length > 0 && (
            <div className="flex flex-wrap gap-2.5">
              {SUMMARY_DATA.neutral.map((item, index) => (
                <div key={index} className="flex items-center gap-2 bg-gradient-to-r from-[#F1F5F9] to-[#E2E8F0] border border-gray-200 px-3.5 py-2.5 rounded-[7px] shadow-md shadow-slate-500/5">
                  <Icons.Clock />
                  <span className="text-[13.5px] font-bold text-gray-600">{item}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* --- APPREHENSIONS SECTION --- */}
        <div>
          <h3 className="text-[17px] font-extrabold text-[#2F3D5A] mb-3">Apprehensions</h3>
          {SUMMARY_DATA.apprehensions.length > 0 && (
            <div className="flex flex-col gap-2 mb-3 px-1">
              {SUMMARY_DATA.apprehensions.map((item, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 flex-shrink-0"></div>
                  <span className="text-[14.5px] font-medium text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          )}
          {/* Info Notice */}
          {SUMMARY_DATA.apprehensions.length > 0 && (
            <div className="flex items-center gap-2.5 bg-gradient-to-r from-[#EFF6FF] to-[#DBEAFE]/50 border border-[#BFDBFE] text-[#3B82F6] px-3.5 py-3 rounded-[7px] text-[13px] font-semibold mt-1 shadow-md shadow-blue-500/10">
              <Icons.Info />
              You can revisit these anytime
            </div>
          )}
        </div>

        <hr className="border-gray-200" />

        {/* --- SAVED FLOOR PLANS SECTION --- */}
        <div>
          <h3 className="text-[17px] font-extrabold text-[#2F3D5A] mb-4">Saved Floor Plans</h3>
          {SUMMARY_DATA.savedPlans.length > 0 && (
            <div className="flex flex-col gap-4">
              {SUMMARY_DATA.savedPlans.map((plan) => (
                <div key={plan.id} className="bg-white border border-gray-200 rounded-[7px] p-5 shadow-xl shadow-black/5 flex flex-col gap-3 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/50 before:via-transparent before:to-transparent before:pointer-events-none">
                  
                  {/* Plan Header */}
                  <div className="flex flex-col gap-1 relative z-10">
                    <h4 className="text-[16px] font-extrabold text-[#2F3D5A] drop-shadow-sm">{plan.title}</h4>
                    <p className="text-[13px] font-medium text-gray-500">{plan.subtitle}</p>
                  </div>

                  {/* Plan Notes (If any) */}
                  {plan.notes && plan.notes.length > 0 && (
                    <div className="flex flex-col gap-1.5 mb-1 px-1">
                      {plan.notes.map((note, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-2 flex-shrink-0"></div>
                          <span className="text-[13px] font-medium text-gray-600">{note}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Card Action Buttons */}
                  <div className="flex gap-3 mt-1 relative z-10">
                    <button className="flex-1 bg-gradient-to-r from-[#F85B01] to-[#E24E00] hover:from-[#E24E00] hover:to-[#C94400] text-white flex items-center justify-center gap-2 py-3 rounded-[7px] text-[13px] font-bold transition-all duration-300 shadow-lg shadow-orange-600/30 hover:shadow-xl hover:shadow-orange-600/40 hover:scale-105">
                      <Icons.Message /> Contact Seller
                    </button>
                    <button className="flex-1 bg-white border-2 border-gray-200 text-[#2F3D5A] hover:bg-gray-50 hover:border-[#2F3D5A] flex items-center justify-center gap-2 py-3 rounded-[7px] text-[13px] font-bold transition-all duration-300 shadow-md hover:shadow-lg">
                      <Icons.Bookmark /> Review Later
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExitSummarySection;