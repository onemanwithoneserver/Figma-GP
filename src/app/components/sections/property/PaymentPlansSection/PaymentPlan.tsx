import React, { useState, useRef } from 'react';

// --- Sub-Component Imports ---
import Cost from './Cost';
import Offers from './Offers';
import Sellers from './Sellers';
import BankingPartners from './BankingPartners';
import PaymentSchedule from './PaymentSchedule';

// --- Tab Configuration ---
const TABS = [
  { id: 'cost',     label: 'Cost',             icon: '₹' },
  { id: 'offers',   label: 'Offers',           icon: '🎁' },
  { id: 'sellers',  label: 'Sellers',          icon: '🏢' },
  { id: 'banking',  label: 'Banking',          icon: '🏦' },
  { id: 'schedule', label: 'Schedule',         icon: '📅' },
];

const PaymentPlan: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('cost');
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleTabClick = (id: string, e: React.MouseEvent<HTMLButtonElement>) => {
    setActiveTab(id);
    e.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  };

  // Helper to render the selected component
  const renderContent = () => {
    switch (activeTab) {
      case 'cost':
        return <Cost />;
      case 'offers':
        return <Offers />;
      case 'sellers':
        return <Sellers />;
      case 'banking':
        return <BankingPartners />;
      case 'schedule':
        return <PaymentSchedule />;
      default:
        return <Cost />;
    }
  };

  return (
    <div className="font-['Outfit',_sans-serif]">

      {/* ── HORIZONTAL TAB NAV — orange gradient pill style ── */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto scrollbar-hide gap-2 px-4 pt-4 pb-3"
        role="tablist"
        aria-label="Payment section navigation"
        style={{ background: 'linear-gradient(180deg, #F8F9FB 0%, #FFFFFF 100%)' }}
      >
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              onClick={(e) => handleTabClick(tab.id, e)}
              className="flex-shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 text-[13px] font-bold rounded-[7px] transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
              style={isActive ? {
                background: 'linear-gradient(135deg, #F85B01, #C94A00)',
                color: 'white',
                boxShadow: '0 0 14px rgba(248,91,1,0.35), inset 0 1px 0 rgba(255,255,255,0.15)'
              } : {
                background: '#F1F5F9',
                color: '#64748B'
              }}
            >
              <span aria-hidden="true">{tab.icon}</span>
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ── DARK HEADER ── */}
      <div
        className="relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E3A5F 55%, #0D2137 100%)' }}
        role="banner"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)',
            backgroundSize: '18px 18px'
          }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-36 pointer-events-none"
          aria-hidden="true"
          style={{ background: 'radial-gradient(circle at right center, rgba(249,115,22,0.20) 0%, transparent 70%)' }}
        />

        <div className="relative px-4 py-2.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-[11.5px] text-slate-400 font-medium">
              Transparent pricing · Bank-approved financing
            </p>
            <div className="flex gap-1.5" role="list" aria-label="Quick highlights">
              {([
                { label: '✓ Bank Approved', cls: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/25' },
                { label: '5 Plans',         cls: 'bg-blue-500/15    text-blue-300    border-blue-500/25'    },
                { label: '3 Offers',        cls: 'bg-orange-500/15  text-orange-300  border-orange-500/25'  },
              ] as const).map(p => (
                <span key={p.label} role="listitem" className={`text-[10px] font-bold border px-2 py-0.5 rounded-[5px] ${p.cls}`}>
                  {p.label}
                </span>
              ))}
            </div>
          </div>
          <div className="flex-shrink-0 flex flex-col items-end">
            <span className="text-[9.5px] font-bold text-white/40 tracking-wide">Starts at</span>
            <span className="text-[16px] font-black text-[#F97316] tracking-tight">₹1.58 Cr</span>
          </div>
        </div>
      </div>

      {/* ── CONTENT PANEL ── */}
      <div
        id={`panel-${activeTab}`}
        role="tabpanel"
        className="bg-white overflow-hidden min-h-[380px] transition-all duration-300"
      >
        {renderContent()}
      </div>

      {/* ── BOTTOM SOCIAL PROOF + HELP ── */}
      <div
        className="flex items-center justify-between px-4 py-3.5"
        style={{ background: 'linear-gradient(90deg, #0F172A 0%, #1E3A5F 100%)' }}
      >
        <div className="flex items-center gap-2.5">
          <div className="flex -space-x-2" aria-hidden="true">
            {['A', 'R', 'S'].map((l, i) => (
              <div
                key={i}
                className="w-7 h-7 rounded-full border-2 border-[#1E3A5F] flex items-center justify-center text-[10.5px] font-black text-white"
                style={{ backgroundColor: ['#2563EB','#F97316','#10B981'][i] }}
              >
                {l}
              </div>
            ))}
          </div>
          <p className="text-[11.5px] font-semibold text-slate-400">
            <span className="text-white font-bold">+12</span> others interested today
          </p>
        </div>
        <button
          aria-label="Get help from a sales advisor"
          className="flex items-center gap-1.5 bg-[#F97316] hover:bg-[#ea6c0e] text-white text-[12.5px] font-bold px-3.5 py-2 rounded-[7px] transition-colors shadow-md focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:outline-none active:scale-95"
        >
          Need Help?
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </button>
      </div>

      {/* Footer hint */}
      <p className="text-center text-[11.5px] text-gray-400 font-medium py-3 px-4 bg-white border-t border-[#F0EDE8]">
        Prices are indicative. Final quote from the seller may vary.
      </p>
    </div>
  );
};

export default PaymentPlan;