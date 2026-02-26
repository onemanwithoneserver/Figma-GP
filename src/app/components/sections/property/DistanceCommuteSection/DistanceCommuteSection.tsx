import React, { useState, useEffect } from 'react';

// --- TYPES ---
interface PlaceItem {
  id: string;
  name: string;
  time: string;
  distance: string;
  mode: 'drive' | 'walk';
  color: string;
  iconType?: string;
}

interface TabData {
  title: string;
  color: string;
  footer: string;
  items: PlaceItem[];
}

interface TabInfo {
  id: string;
  label: string;
  color: string;
}

// --- INLINE SVGS ---
const Icons = {
  Drive: ({ color = "currentColor" }: { color?: string }) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 16H9m10 0h3v-3.15a1 1 0 00-.84-.99L16 11l-2.7-3.6a2 2 0 00-1.6-.8H9.3a2 2 0 00-1.6.8L5 11l-5.16.86a1 1 0 00-.84.99V16h3m10 0a2 2 0 11-4 0m4 0a2 2 0 10-4 0m-6 0a2 2 0 11-4 0m4 0a2 2 0 10-4 0"></path></svg>,
  Walk: ({ color = "currentColor" }: { color?: string }) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5m-1 0a1 1 0 102 0a1 1 0 10-2 0m-1 6l1-4l1 4m-1-4v10m-3-3l3 3l3-3"></path></svg>,
  Building: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><path d="M9 22v-4h6v4"></path><path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M16 10h.01M8 10h.01M8 14h.01M12 14h.01M16 14h.01"></path></svg>,
  School: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>,
  MapPin: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3" fill="white"></circle></svg>,
  Search: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>,
  ChevronRight: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>,
  Tag: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>,
  Plus: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>,
  Check: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
};

// --- INITIAL DATA ---
const INITIAL_TABS: TabInfo[] = [
  { id: 'frequent', label: 'My Frequent Places', color: '#3B82F6' },
  { id: 'education', label: 'Education', color: '#64748B' },
  { id: 'emergency', label: 'Emergency', color: '#F43F5E' },
];

const INITIAL_DATA: Record<string, TabData> = {
  frequent: {
    title: 'My Frequent Places',
    color: '#3B82F6', 
    footer: 'Private & visible only to you.',
    items: [
      { id: 'f1', name: 'Workplace - Hitech City', time: '45 min', distance: '18.2 km', mode: 'drive', color: '#3B82F6' },
    ]
  },
  education: {
    title: 'Nearby Education',
    color: '#64748B', 
    footer: 'Distances calculated via fastest driving routes.',
    items: [
      { id: 'e1', name: 'Ryan International School', time: '6 min', distance: '1.8 km', mode: 'drive', color: '#F59E0B' },
      { id: 'e2', name: 'Delhi Public School', time: '9 min', distance: '3.1 km', mode: 'drive', color: '#14B8A6' },
    ]
  },
  emergency: {
    title: 'Emergency Services Nearby',
    color: '#F43F5E',
    footer: 'Emergency locations are auto-detected.',
    items: [
      { id: 'em1', name: 'Apollo Hospital', time: '9 min', distance: '2.3 km', mode: 'drive', color: '#F43F5E' },
    ]
  }
};

export default function DistanceCommuteSection() {
  // Core State
  const [tabs, setTabs] = useState<TabInfo[]>(INITIAL_TABS);
  const [tabData, setTabData] = useState<Record<string, TabData>>(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<string>('frequent');
  
  // UI Flow States
  const [isAddingPlace, setIsAddingPlace] = useState<boolean>(false);
  const [isAddingCategory, setIsAddingCategory] = useState<boolean>(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Input States
  const [placeName, setPlaceName] = useState<string>('');
  const [mapSearch, setMapSearch] = useState<string>('');
  const [newCategoryName, setNewCategoryName] = useState<string>('');

  // Auto-hide toast
  useEffect(() => {
    if (successToast) {
      const timer = setTimeout(() => setSuccessToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [successToast]);

  // Handle Tab Switching
  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsAddingPlace(false);
    setIsAddingCategory(false);
  };

  // 1. ADD NEW CUSTOM CATEGORY
  const handleAddCategory = () => {
    if (!newCategoryName.trim()) return;
    
    const newId = `custom_${Date.now()}`;
    const newColor = '#8B5CF6'; // Purple default for custom tabs

    setTabs([...tabs, { id: newId, label: newCategoryName, color: newColor }]);
    setTabData({
      ...tabData,
      [newId]: {
        title: newCategoryName,
        color: newColor,
        footer: `Custom locations for ${newCategoryName}`,
        items: []
      }
    });

    setNewCategoryName('');
    setIsAddingCategory(false);
    setActiveTab(newId); // Switch to the newly created tab automatically
    setSuccessToast(`Category "${newCategoryName}" created!`);
  };

  // 2. ADD NEW PLACE TO CURRENT TAB
  const handleSavePlace = () => {
    if (!placeName && !mapSearch) return;

    const finalName = placeName.trim() !== '' ? placeName : mapSearch;
    const currentTabColor = tabData[activeTab].color;
    
    const newPlace: PlaceItem = {
      id: Date.now().toString(),
      name: finalName,
      time: '7 min', // Mock data for demo
      distance: '3.2 km', // Mock data for demo
      mode: 'drive',
      color: currentTabColor
    };
    
    setTabData(prev => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        items: [newPlace, ...prev[activeTab].items] // Add to top of list
      }
    }));

    setSuccessToast(`${finalName} added to ${tabData[activeTab].title}!`);
    setIsAddingPlace(false);
    setPlaceName('');
    setMapSearch('');
  };

  return (
    <div>
      {/* Fixed Title Header */}
      <h2 className="text-xl font-extrabold text-slate-800 mb-4 tracking-tight px-1 drop-shadow-sm">
        Distance / Commute To
      </h2>
      
      <div className="w-full bg-gradient-to-br from-white to-gray-50/50 font-['Outfit',_sans-serif] overflow-hidden flex flex-col rounded-[7px] shadow-lg shadow-black/5 border border-gray-100">
        
        {/* --- DYNAMIC SCROLLABLE TAB BAR --- */}
        <div className="flex overflow-x-auto scrollbar-hide border-b border-gray-200 items-center justify-start whitespace-nowrap px-4 bg-gradient-to-r from-white to-gray-50/80 backdrop-blur-sm relative z-20 shadow-sm">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id && !isAddingCategory;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className="relative px-4 py-4 text-[14px] transition-all duration-300 outline-none"
              >
                <span className={isActive ? 'font-bold text-[#2F3D5A]' : 'font-medium text-gray-500 hover:text-gray-700'}>
                  {tab.label}
                </span>
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] rounded-t-full shadow-sm" style={{ backgroundColor: tab.color }} />
                )}
              </button>
            );
          })}

          {/* "+ Add Category" Button at the end of tabs */}
          <button
            onClick={() => {
              setIsAddingCategory(true);
              setIsAddingPlace(false);
              setActiveTab('add_category');
            }}
            className="relative px-4 py-4 text-[13.5px] font-bold text-[#F85B01] hover:text-[#e05000] flex items-center gap-1.5 transition-all duration-300 outline-none hover:bg-orange-50/50 rounded-[7px]"
          >
            <Icons.Plus /> Category
            {isAddingCategory && (
              <div className="absolute bottom-0 left-0 right-0 h-[3px] rounded-t-full bg-[#F85B01] shadow-sm" />
            )}
          </button>
        </div>

        {/* --- DYNAMIC CONTENT AREA --- */}
        <div className="p-5 bg-[#F8FAFC] flex-1">
          
          {/* TOAST NOTIFICATION */}
          {successToast && (
            <div className="flex items-center gap-2 bg-gradient-to-r from-[#ECFDF5] to-[#D1FAE5]/50 text-[#059669] px-4 py-3.5 rounded-[7px] mb-4 text-[13.5px] font-bold border border-[#A7F3D0] shadow-lg shadow-emerald-500/10 animate-fade-in">
              <Icons.Check />
              {successToast}
            </div>
          )}

          {/* VIEW 1: CREATE NEW CATEGORY */}
          {isAddingCategory ? (
            <div className="animate-fade-in bg-white p-5 rounded-[7px] border border-gray-200 shadow-xl shadow-black/5">
              <h3 className="text-[17px] font-bold text-[#2F3D5A] mb-4">Create a Custom Category</h3>
              
              <div className="flex items-center bg-[#F8FAFC] rounded-[7px] px-4 py-3.5 border border-gray-200 focus-within:border-[#F85B01] focus-within:bg-white transition-all mb-5 shadow-sm">
                <input 
                  type="text" 
                  placeholder="e.g. Gyms, Relatives, Hangouts" 
                  className="bg-transparent border-none outline-none w-full text-[14.5px] text-[#2F3D5A] font-bold placeholder-gray-400"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  autoFocus
                />
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => setIsAddingCategory(false)}
                  className="flex-1 py-3 rounded-[7px] border-2 border-gray-200 text-gray-500 font-bold text-[14px] hover:bg-gray-50 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleAddCategory}
                  disabled={!newCategoryName.trim()}
                  className="flex-[1.5] py-3 rounded-[7px] bg-gradient-to-r from-[#F85B01] to-[#E24E00] text-white font-bold text-[14px] disabled:opacity-50 transition-all duration-300 active:scale-95 shadow-lg shadow-orange-500/30 hover:shadow-xl"
                >
                  Create Category
                </button>
              </div>
            </div>
          ) : 

          /* VIEW 2: ADD PLACE TO CURRENT TAB */
          isAddingPlace ? (
            <div className="flex flex-col animate-fade-in -mx-5 -mt-5">
              
              {/* Input Fields Area */}
              <div className="px-5 py-4 bg-white border-b border-gray-100 z-10 flex flex-col gap-3">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-[16px] font-bold text-[#2F3D5A]">Add to {tabData[activeTab].title}</h3>
                </div>

                <div className="flex items-center bg-[#F8FAFC] rounded-[7px] px-3.5 py-3.5 border border-gray-200 focus-within:border-[#3B82F6] focus-within:bg-white transition-all shadow-sm">
                  <div className="text-gray-400"><Icons.Tag /></div>
                  <input 
                    type="text" 
                    placeholder="Name this place (e.g. My Gym)" 
                    className="bg-transparent border-none outline-none w-full ml-2.5 text-[14.5px] text-[#2F3D5A] font-bold placeholder-gray-400"
                    value={placeName}
                    onChange={(e) => setPlaceName(e.target.value)}
                    autoFocus
                  />
                </div>

                <div className="flex items-center bg-[#F8FAFC] rounded-[7px] px-3.5 py-3.5 border border-gray-200 focus-within:border-[#3B82F6] focus-within:bg-white transition-all shadow-sm">
                  <Icons.Search />
                  <input 
                    type="text" 
                    placeholder="Search location on map..." 
                    className="bg-transparent border-none outline-none w-full ml-2.5 text-[14px] text-[#2F3D5A] font-medium placeholder-gray-400"
                    value={mapSearch}
                    onChange={(e) => setMapSearch(e.target.value)}
                  />
                </div>
              </div>

              {/* Embedded Map Area */}
              <div className="h-[200px] bg-[#E5E7EB] relative overflow-hidden">
                <div className="absolute inset-0 opacity-40 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#9CA3AF 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <div className="bg-[#3B82F6] text-white px-3.5 py-1.5 rounded-[7px] text-[13px] font-bold shadow-md mb-1 max-w-[200px] truncate">
                    {mapSearch || 'Move map to pin'}
                  </div>
                  <Icons.MapPin />
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="bg-white p-5 rounded-b-[7px] shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
                <div className="flex gap-3">
                  <button 
                    onClick={() => setIsAddingPlace(false)}
                    className="flex-1 py-3.5 rounded-[7px] border-2 border-gray-200 text-gray-500 font-bold text-[14px] hover:bg-gray-50 transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSavePlace}
                    disabled={!placeName && !mapSearch}
                    className="flex-[1.5] py-3.5 rounded-[7px] text-white font-bold text-[14px] disabled:opacity-50 transition-all duration-300 active:scale-95 shadow-lg hover:shadow-xl"
                    style={{ backgroundColor: tabData[activeTab].color }}
                  >
                    Save Place
                  </button>
                </div>
              </div>
            </div>
          ) : 

          /* VIEW 3: NORMAL LIST VIEW (For the active tab) */
          (
            <div className="animate-fade-in flex flex-col h-full">
              <h3 className="text-[17px] font-bold text-[#2F3D5A] mb-4">
                {tabData[activeTab]?.title}
              </h3>
              
              {/* If Empty */}
              {tabData[activeTab]?.items.length === 0 && (
                <div className="border-[2px] border-dashed border-gray-300 rounded-[7px] p-6 flex flex-col items-center justify-center text-center bg-white/80 mb-4 shadow-sm">
                  <div className="mb-2 text-gray-400"><Icons.MapPin /></div>
                  <p className="text-[14.5px] font-bold text-[#2F3D5A] mb-1">No places added yet</p>
                  <p className="text-[12.5px] text-gray-400 font-medium">Click below to add a location</p>
                </div>
              )}

              {/* List of Places */}
              <div className="flex flex-col gap-3 mb-5">
                {tabData[activeTab]?.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3.5 p-4 rounded-[7px] border border-gray-100 shadow-md shadow-black/5 bg-white cursor-pointer hover:border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
                    <div className="w-11 h-11 flex-shrink-0 flex items-center justify-center rounded-[7px] shadow-sm" style={{ backgroundColor: `${item.color}15`, color: item.color }}>
                      <Icons.Building />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[15px] font-bold text-[#2F3D5A] truncate mb-0.5">{item.name}</p>
                      <div className="flex items-center gap-1.5 text-[13px] font-semibold" style={{ color: item.mode === 'drive' ? '#EF4444' : '#22C55E' }}>
                        {item.mode === 'drive' ? <Icons.Drive /> : <Icons.Walk />}
                        <span>{item.time} {item.mode}</span>
                        <span className="text-gray-400 mx-1">•</span>
                        <span className="text-gray-500 font-medium">{item.distance}</span>
                      </div>
                    </div>
                    <div className="flex-shrink-0 text-gray-300">
                      <Icons.ChevronRight />
                    </div>
                  </div>
                ))}
              </div>

              {/* + ADD PLACE BUTTON (Available inside every tab) */}
              <button 
                onClick={() => setIsAddingPlace(true)}
                className="w-full py-3.5 rounded-[7px] border-2 border-dashed font-bold text-[14.5px] flex items-center justify-center gap-2 transition-all duration-300 hover:scale-102 shadow-sm hover:shadow-md"
                style={{ borderColor: `${tabData[activeTab]?.color}40`, color: tabData[activeTab]?.color, backgroundColor: `${tabData[activeTab]?.color}05` }}
              >
                <Icons.Plus /> Add Place to {tabData[activeTab]?.title}
              </button>

              <p className="text-[12px] font-medium text-gray-400 text-center mt-6 pb-2">
                {tabData[activeTab]?.footer}
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}