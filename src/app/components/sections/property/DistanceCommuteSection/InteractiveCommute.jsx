import React, { useState, useEffect } from 'react';

// --- INLINE SVGS ---
const Icons = {
  Drive: ({ color = "currentColor" }) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 16H9m10 0h3v-3.15a1 1 0 00-.84-.99L16 11l-2.7-3.6a2 2 0 00-1.6-.8H9.3a2 2 0 00-1.6.8L5 11l-5.16.86a1 1 0 00-.84.99V16h3m10 0a2 2 0 11-4 0m4 0a2 2 0 10-4 0m-6 0a2 2 0 11-4 0m4 0a2 2 0 10-4 0"></path></svg>,
  Hospital: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M12 8v8M8 12h8"/></svg>,
  Walk: ({ color = "currentColor" }) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5m-1 0a1 1 0 102 0a1 1 0 10-2 0m-1 6l1-4l1 4m-1-4v10m-3-3l3 3l3-3"></path></svg>,
  Building: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><path d="M9 22v-4h6v4"></path><path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M16 10h.01M8 10h.01M8 14h.01M12 14h.01M16 14h.01"></path></svg>,
  School: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>,
  MapPin: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3" fill="white"></circle></svg>,
  Search: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>,
  ChevronRight: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>,
  Tag: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>,
  Plus: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>,
  Check: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
};

// --- 3 FIXED TABS / PAGES ---
const TABS = [
  { id: 'frequent',  label: 'My Frequent Places', color: '#3B82F6' },
  { id: 'education', label: 'Education',           color: '#64748B' },
  { id: 'emergency', label: 'Emergency',           color: '#F43F5E' },
];

// --- INITIAL DATA ---
const INITIAL_DATA = {
  frequent: {
    title: 'My Frequent Places',
    color: '#3B82F6',
    footer: 'Private & visible only to you.',
    items: [
      { id: 'f1', name: 'Workplace - Hitech City', time: '45 min', distance: '18.2 km', mode: 'drive', color: '#3B82F6', icon: 'building' },
    ]
  },
  education: {
    title: 'Nearby Education',
    color: '#64748B',
    footer: 'Distances calculated via fastest driving routes.',
    items: [
      { id: 'e1', name: 'Ryan International School', time: '6 min',  distance: '1.8 km', mode: 'drive', color: '#F59E0B', icon: 'school' },
      { id: 'e2', name: 'Delhi Public School',        time: '9 min',  distance: '3.1 km', mode: 'drive', color: '#14B8A6', icon: 'school' },
    ]
  },
  emergency: {
    title: 'Emergency Services Nearby',
    color: '#F43F5E',
    footer: 'Emergency locations are auto-detected.',
    items: [
      { id: 'em1', name: 'Apollo Hospital', time: '9 min', distance: '2.3 km', mode: 'drive', color: '#F43F5E', icon: 'hospital' },
    ]
  }
};

// --- PLACE ICON HELPER ---
function PlaceIcon({ icon, color }) {
  return (
    <div
      className="w-11 h-11 flex-shrink-0 flex items-center justify-center rounded-[7px] shadow-sm transition-all duration-300 hover:scale-105"
      style={{ backgroundColor: `${color}15`, color }}
    >
      {icon === 'school'   ? <Icons.School />   :
       icon === 'hospital' ? <Icons.Hospital /> :
       <Icons.Building />}
    </div>
  );
}

export default function InteractiveCommute() {
  const [tabData, setTabData]             = useState(INITIAL_DATA);
  const [activeTab, setActiveTab]         = useState('frequent');
  const [isAddingPlace, setIsAddingPlace] = useState(false);
  const [successToast, setSuccessToast]   = useState(null);
  const [placeName, setPlaceName]         = useState('');
  const [mapSearch, setMapSearch]         = useState('');

  // Auto-hide toast
  useEffect(() => {
    if (!successToast) return;
    const t = setTimeout(() => setSuccessToast(null), 3000);
    return () => clearTimeout(t);
  }, [successToast]);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setIsAddingPlace(false);
  };

  const handleSavePlace = () => {
    if (!placeName.trim() && !mapSearch.trim()) return;
    const finalName = placeName.trim() || mapSearch.trim();

    setTabData(prev => ({
      ...prev,
      frequent: {
        ...prev.frequent,
        items: [
          { id: Date.now().toString(), name: finalName, time: '7 min', distance: '3.2 km', mode: 'drive', color: prev.frequent.color, icon: 'building' },
          ...prev.frequent.items
        ]
      }
    }));

    setSuccessToast(`"${finalName}" added to My Frequent Places!`);
    setIsAddingPlace(false);
    setPlaceName('');
    setMapSearch('');
  };

  const currentData = tabData[activeTab];

  return (
    <div className="w-full font-['Outfit',_sans-serif]">
      <div className="w-full bg-white overflow-hidden flex flex-col rounded-[7px] border border-gray-100" style={{boxShadow:'0 2px 12px rgba(0,0,0,0.05)'}}>

        {/* ── TAB NAV ── */}
        <div className="flex overflow-x-auto scrollbar-hide border-b border-gray-100 whitespace-nowrap relative z-20" style={{background:'linear-gradient(to bottom, #ffffff, #fafafa)'}}>
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id && !isAddingPlace;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className="relative px-4 py-3.5 text-[13.5px] transition-all duration-200 outline-none"
              >
                <span className={isActive ? 'font-extrabold text-[#2A2C32]' : 'font-medium text-gray-400 hover:text-gray-600'}>
                  {tab.label}
                </span>
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] rounded-t-[3px]" style={{ background: `linear-gradient(90deg, ${tab.color}, ${tab.color}cc)`, boxShadow: `0 -1px 6px ${tab.color}55` }} />
                )}
              </button>
            );
          })}
        </div>

        {/* ── CONTENT AREA ── */}
        <div className="p-4 bg-[#F8FAFC] flex-1 rounded-b-[7px]">

          {/* Toast */}
          {successToast && (
            <div className="flex items-center gap-2 bg-gradient-to-r from-[#ECFDF5] to-[#D1FAE5]/50 text-[#059669] px-4 py-3 rounded-[7px] mb-4 text-[13px] font-bold border border-[#10B981]/20 shadow-lg">
              <Icons.Check />
              {successToast}
            </div>
          )}

          {/* ═══════════════════════════════════════════
              ADD PLACE FORM  (frequent tab only)
              Order: Search → Map Pin → Name → Cancel/Save
          ═══════════════════════════════════════════ */}
          {isAddingPlace ? (
            <div className="flex flex-col -mx-4 -mt-4">

              {/* Header */}
              <div className="px-5 pt-5 pb-3 bg-white border-b border-gray-100">
                <h3 className="text-[15px] font-extrabold text-[#2A2C32] tracking-tight">
                  Add to My Frequent Places
                </h3>
              </div>

              {/* 1 ── Search */}
              <div className="px-5 pt-4 pb-3 bg-white">
                <label className="text-[11px] font-bold text-gray-400 tracking-widest mb-1.5 block">
                  Search Location
                </label>
                <div className="flex items-center bg-gradient-to-br from-[#F8FAFC] to-[#EEF2F6] rounded-[7px] px-3.5 py-3 border border-gray-200 focus-within:border-[#3B82F6] focus-within:bg-white focus-within:shadow-lg transition-all">
                  <Icons.Search />
                  <input
                    type="text"
                    placeholder="Search location on map…"
                    className="bg-transparent border-none outline-none w-full ml-2.5 text-[14px] text-[#2A2C32] font-medium placeholder-gray-400"
                    value={mapSearch}
                    onChange={(e) => setMapSearch(e.target.value)}
                    autoFocus
                  />
                </div>
              </div>

              {/* 2 ── Map Pin area */}
              <div className="h-[190px] bg-[#E8EDF2] relative overflow-hidden">
                {/* subtle dot grid */}
                <div
                  className="absolute inset-0 opacity-25 pointer-events-none"
                  style={{ backgroundImage: 'radial-gradient(#94A3B8 1px, transparent 1px)', backgroundSize: '22px 22px' }}
                />
                {/* road suggestion lines */}
                <svg className="absolute inset-0 w-full h-full opacity-15" preserveAspectRatio="none" viewBox="0 0 400 190">
                  <line x1="0"   y1="95"  x2="400" y2="95"  stroke="#64748B" strokeWidth="7" />
                  <line x1="200" y1="0"   x2="200" y2="190" stroke="#64748B" strokeWidth="5" />
                  <line x1="0"   y1="45"  x2="400" y2="145" stroke="#64748B" strokeWidth="2.5" />
                </svg>
                {/* pin */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-full flex flex-col items-center drop-shadow-lg">
                  <div className="bg-[#3B82F6] text-white px-3 py-1 rounded-[7px] text-[12.5px] font-bold shadow-md mb-1 max-w-[200px] truncate">
                    {mapSearch || 'Move map to pin'}
                  </div>
                  <Icons.MapPin />
                </div>
              </div>

              {/* 3 ── Name  +  4 Cancel / Save */}
              <div className="bg-white px-5 pt-4 pb-5">
                <label className="text-[11px] font-bold text-gray-400 tracking-widest mb-1.5 block">
                  Place Name
                </label>
                <div className="flex items-center bg-gradient-to-br from-[#F8FAFC] to-[#EEF2F6] rounded-[7px] px-3.5 py-3 border border-gray-200 focus-within:border-[#3B82F6] focus-within:bg-white focus-within:shadow-lg transition-all mb-4">
                  <Icons.Tag />
                  <input
                    type="text"
                    placeholder="e.g. My Office, Gym, Parent's Home"
                    className="bg-transparent border-none outline-none w-full ml-2.5 text-[14px] text-[#2A2C32] font-bold placeholder-gray-400"
                    value={placeName}
                    onChange={(e) => setPlaceName(e.target.value)}
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => { setIsAddingPlace(false); setPlaceName(''); setMapSearch(''); }}
                    className="flex-1 py-3 rounded-[7px] border-2 border-gray-200 text-gray-500 font-bold text-[14px] hover:border-gray-300 hover:bg-gray-50 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSavePlace}
                    disabled={!placeName.trim() && !mapSearch.trim()}
                    className="flex-[1.5] py-3 rounded-[7px] text-white font-bold text-[14px] disabled:opacity-40 active:scale-[0.98] transition-all shadow-lg hover:shadow-xl disabled:shadow-none bg-gradient-to-r from-[#3B82F6] to-[#2563EB]"
                  >
                    Save Place
                  </button>
                </div>
              </div>
            </div>

          ) : (
            /* ═══════════════════════════════════════════
                NORMAL LIST VIEW
            ═══════════════════════════════════════════ */
            <div className="flex flex-col h-full">

              {/* Empty state */}
              {currentData.items.length === 0 && (
                <div className="border-[1.5px] border-dashed border-gray-200 rounded-[7px] p-6 flex flex-col items-center justify-center text-center bg-gradient-to-br from-white to-gray-50/50 mb-4">
                  <div className="mb-2 text-gray-300"><Icons.MapPin /></div>
                  <p className="text-[14px] font-bold text-[#2A2C32] mb-1">No places added yet</p>
                  <p className="text-[12px] text-gray-400 font-medium">Tap below to add a location</p>
                </div>
              )}

              {/* Place cards */}
              <div className="flex flex-col gap-2.5 mb-4">
                {currentData.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 p-3.5 rounded-[7px] border border-gray-100 bg-white hover:border-gray-200 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                    style={{boxShadow:'0 1px 8px rgba(0,0,0,0.06)'}}
                  >
                    <PlaceIcon icon={item.icon} color={item.color} />
                    <div className="flex-1 min-w-0">
                      <p className="text-[14.5px] font-bold text-[#2A2C32] truncate mb-0.5">{item.name}</p>
                      <div
                        className="flex items-center gap-1.5 text-[12.5px] font-semibold"
                        style={{ color: item.mode === 'drive' ? '#EF4444' : '#22C55E' }}
                      >
                        {item.mode === 'drive' ? <Icons.Drive color="currentColor" /> : <Icons.Walk color="currentColor" />}
                        <span>{item.time} {item.mode}</span>
                        <span className="text-gray-300 mx-0.5">•</span>
                        <span className="text-gray-400 font-medium">{item.distance}</span>
                      </div>
                    </div>
                    <div className="flex-shrink-0 text-gray-300">
                      <Icons.ChevronRight />
                    </div>
                  </div>
                ))}
              </div>

              {/* ── Add place button — ONLY for My Frequent Places tab ── */}
              {activeTab === 'frequent' && (
                <button
                  onClick={() => setIsAddingPlace(true)}
                  className="w-full py-3 rounded-[7px] font-bold text-[13.5px] flex items-center justify-center gap-2 transition-all duration-200 hover:-translate-y-px hover:shadow-md mb-1"
                  style={{
                    border: `1.5px dashed ${currentData.color}55`,
                    color: currentData.color,
                    background: `linear-gradient(135deg, ${currentData.color}06, ${currentData.color}0a)`
                  }}
                >
                  <Icons.Plus /> Add to My Frequent Places
                </button>
              )}

              <p className="text-[11.5px] font-medium text-gray-400 text-center mt-4 pb-1">
                {currentData.footer}
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}