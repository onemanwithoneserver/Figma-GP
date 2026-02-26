import React, { useState, useEffect } from 'react';

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

const Icons = {
  Drive: ({ color = "currentColor" }: { color?: string }) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 16H9m10 0h3v-3.15a1 1 0 00-.84-.99L16 11l-2.7-3.6a2 2 0 00-1.6-.8H9.3a2 2 0 00-1.6.8L5 11l-5.16.86a1 1 0 00-.84.99V16h3m10 0a2 2 0 11-4 0m4 0a2 2 0 10-4 0m-6 0a2 2 0 11-4 0m4 0a2 2 0 10-4 0"></path></svg>,
  Walk: ({ color = "currentColor" }: { color?: string }) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5m-1 0a1 1 0 102 0a1 1 0 10-2 0m-1 6l1-4l1 4m-1-4v10m-3-3l3 3l3-3"></path></svg>,
  Building: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><path d="M9 22v-4h6v4"></path><path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M16 10h.01M8 10h.01M8 14h.01M12 14h.01M16 14h.01"></path></svg>,
  School: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>,
  MapPin: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3" fill="white"></circle></svg>,
  Search: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8A7D74" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>,
  ChevronRight: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>,
  Tag: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8A7D74" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>,
  Plus: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>,
  Check: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
};

const INITIAL_TABS: TabInfo[] = [
  { id: 'frequent', label: 'My Frequent Places', color: '#E76F26' },
  { id: 'education', label: 'Education', color: '#8A7D74' },
  { id: 'emergency', label: 'Emergency', color: '#E76F26' },
];

const INITIAL_DATA: Record<string, TabData> = {
  frequent: {
    title: 'My Frequent Places',
    color: '#E76F26',
    footer: 'Private & visible only to you.',
    items: [
      { id: 'f1', name: 'Workplace - Hitech City', time: '45 min', distance: '18.2 km', mode: 'drive', color: '#E76F26' },
    ]
  },
  education: {
    title: 'Nearby Education',
    color: '#8A7D74',
    footer: 'Distances calculated via fastest driving routes.',
    items: [
      { id: 'e1', name: 'Ryan International School', time: '6 min', distance: '1.8 km', mode: 'drive', color: '#E76F26' },
      { id: 'e2', name: 'Delhi Public School', time: '9 min', distance: '3.1 km', mode: 'drive', color: '#E76F26' },
    ]
  },
  emergency: {
    title: 'Emergency Services Nearby',
    color: '#E76F26',
    footer: 'Emergency locations are auto-detected.',
    items: [
      { id: 'em1', name: 'Apollo Hospital', time: '9 min', distance: '2.3 km', mode: 'drive', color: '#E76F26' },
    ]
  }
};

export default function DistanceCommuteSection() {
  const [tabs, setTabs] = useState<TabInfo[]>(INITIAL_TABS);
  const [tabData, setTabData] = useState<Record<string, TabData>>(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<string>('frequent');
  const [isAddingPlace, setIsAddingPlace] = useState<boolean>(false);
  const [isAddingCategory, setIsAddingCategory] = useState<boolean>(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);
  const [placeName, setPlaceName] = useState<string>('');
  const [mapSearch, setMapSearch] = useState<string>('');
  const [newCategoryName, setNewCategoryName] = useState<string>('');

  useEffect(() => {
    if (successToast) {
      const timer = setTimeout(() => setSuccessToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [successToast]);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsAddingPlace(false);
    setIsAddingCategory(false);
  };

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) return;
    const newId = `custom_${Date.now()}`;
    const newColor = '#E76F26';
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
    setActiveTab(newId);
    setSuccessToast(`Category "${newCategoryName}" created!`);
  };

  const handleSavePlace = () => {
    if (!placeName && !mapSearch) return;
    const finalName = placeName.trim() !== '' ? placeName : mapSearch;
    const currentTabColor = tabData[activeTab].color;
    const newPlace: PlaceItem = {
      id: Date.now().toString(),
      name: finalName,
      time: '7 min',
      distance: '3.2 km',
      mode: 'drive',
      color: currentTabColor
    };
    setTabData(prev => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        items: [newPlace, ...prev[activeTab].items]
      }
    }));
    setSuccessToast(`${finalName} added to ${tabData[activeTab].title}!`);
    setIsAddingPlace(false);
    setPlaceName('');
    setMapSearch('');
  };

  return (
    <div>
      <h2 className="text-[20px] font-bold text-[#322822] mb-4 tracking-tight font-['Outfit',_sans-serif]">
        Distance / Commute To
      </h2>

      <div className="w-full bg-[#FDFBF8] font-['Outfit',_sans-serif] overflow-hidden flex flex-col rounded-[7px] shadow-sm border border-[#E5DFD4]/60">

        <div className="flex overflow-x-auto scrollbar-hide border-b border-[#E5DFD4] items-center justify-start whitespace-nowrap px-4 bg-white relative z-20">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id && !isAddingCategory;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className="relative px-4 py-4 text-[14px] transition-all duration-300 outline-none"
              >
                <span className={isActive ? 'font-semibold text-[#322822]' : 'font-medium text-[#8A7D74] hover:text-[#322822]'}>
                  {tab.label}
                </span>
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] rounded-t-full shadow-sm" style={{ backgroundColor: tab.color }} />
                )}
              </button>
            );
          })}

          <button
            onClick={() => {
              setIsAddingCategory(true);
              setIsAddingPlace(false);
              setActiveTab('add_category');
            }}
            className="relative px-4 py-4 text-[13.5px] font-semibold text-[#E76F26] hover:text-[#c45e1a] flex items-center gap-1.5 transition-all duration-300 outline-none rounded-[7px]"
          >
            <Icons.Plus /> Category
            {isAddingCategory && (
              <div className="absolute bottom-0 left-0 right-0 h-[3px] rounded-t-full bg-[#F85B01] shadow-sm" />
            )}
          </button>
        </div>

        <div className="p-5 bg-[#F9F7F2] flex-1">
          {successToast && (
            <div className="flex items-center gap-2 bg-[#F4EFE6] text-[#322822] px-4 py-3.5 rounded-[7px] mb-4 text-[13.5px] font-semibold border border-[#E5DFD4] shadow-sm">
              <Icons.Check />
              {successToast}
            </div>
          )}

          {isAddingCategory ? (
            <div className="animate-fade-in bg-white p-5 rounded-[7px] border border-[#E5DFD4] shadow-sm">
              <h3 className="text-[16px] font-semibold text-[#322822] mb-4">Create a Custom Category</h3>
              
              <div className="flex items-center bg-[#F9F7F2] rounded-[7px] px-4 py-3.5 border border-[#E5DFD4] focus-within:border-[#E76F26] focus-within:bg-white transition-all mb-5">
                <input 
                  type="text" 
                  placeholder="e.g. Gyms, Relatives, Hangouts" 
                  className="bg-transparent border-none outline-none w-full text-[14.5px] text-[#322822] font-semibold placeholder-[#8A7D74]/70"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  autoFocus
                />
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => setIsAddingCategory(false)}
                  className="flex-1 py-3 rounded-[7px] border border-[#E5DFD4] text-[#8A7D74] font-semibold text-[13.5px] hover:bg-[#F4EFE6]/50 transition-all duration-300"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleAddCategory}
                  disabled={!newCategoryName.trim()}
                  className="flex-[1.5] py-3 rounded-[7px] bg-[#E76F26] text-white font-semibold text-[13.5px] disabled:opacity-50 transition-all duration-300 active:scale-95 shadow-sm hover:shadow-md"
                >
                  Create Category
                </button>
              </div>
            </div>
          ) :

          isAddingPlace ? (
            <div className="flex flex-col -mx-5 -mt-5">

              <div className="px-5 py-4 bg-white border-b border-[#E5DFD4] z-10 flex flex-col gap-3">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-[15px] font-semibold text-[#322822]">Add to {tabData[activeTab].title}</h3>
                </div>

                <div className="flex items-center bg-[#F9F7F2] rounded-[7px] px-3.5 py-3.5 border border-[#E5DFD4] focus-within:border-[#E76F26] focus-within:bg-white transition-all">
                  <div className="text-[#8A7D74]"><Icons.Tag /></div>
                  <input 
                    type="text" 
                    placeholder="Name this place (e.g. My Gym)" 
                    className="bg-transparent border-none outline-none w-full ml-2.5 text-[14.5px] text-[#322822] font-semibold placeholder-[#8A7D74]/70"
                    value={placeName}
                    onChange={(e) => setPlaceName(e.target.value)}
                    autoFocus
                  />
                </div>

                <div className="flex items-center bg-[#F9F7F2] rounded-[7px] px-3.5 py-3.5 border border-[#E5DFD4] focus-within:border-[#E76F26] focus-within:bg-white transition-all">
                  <Icons.Search />
                  <input 
                    type="text" 
                    placeholder="Search location on map..." 
                    className="bg-transparent border-none outline-none w-full ml-2.5 text-[14px] text-[#322822] font-medium placeholder-[#8A7D74]/70"
                    value={mapSearch}
                    onChange={(e) => setMapSearch(e.target.value)}
                  />
                </div>
              </div>

              <div className="h-[200px] bg-[#EBE4D8] relative overflow-hidden">
                <div className="absolute inset-0 opacity-25 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#8A7D74 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <div className="bg-[#E76F26] text-white px-3.5 py-1.5 rounded-[7px] text-[13px] font-semibold shadow-sm mb-1 max-w-[200px] truncate">
                    {mapSearch || 'Move map to pin'}
                  </div>
                  <Icons.MapPin />
                </div>
              </div>

              <div className="bg-white p-5 rounded-b-[7px] shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
                <div className="flex gap-3">
                  <button 
                    onClick={() => setIsAddingPlace(false)}
                    className="flex-1 py-3.5 rounded-[7px] border border-[#E5DFD4] text-[#8A7D74] font-semibold text-[13.5px] hover:bg-[#F4EFE6]/50 transition-all duration-300"
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
          ) : (
            <div className="flex flex-col h-full">
              <h3 className="text-[16px] font-semibold text-[#322822] mb-4">
                {tabData[activeTab]?.title}
              </h3>

              {tabData[activeTab]?.items.length === 0 && (
                <div className="border border-dashed border-[#E5DFD4] rounded-[7px] p-6 flex flex-col items-center justify-center text-center bg-white mb-4">
                  <div className="mb-2 text-[#8A7D74]"><Icons.MapPin /></div>
                  <p className="text-[14px] font-semibold text-[#322822] mb-1">No places added yet</p>
                  <p className="text-[12px] text-[#8A7D74] font-medium">Click below to add a location</p>
                </div>
              )}

              <div className="flex flex-col gap-3 mb-5">
                {tabData[activeTab]?.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3.5 p-4 rounded-[7px] border border-[#E5DFD4]/60 shadow-sm bg-white cursor-pointer hover:border-[#E5DFD4] hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
                    <div className="w-11 h-11 flex-shrink-0 flex items-center justify-center rounded-[7px] shadow-sm bg-[#F4EFE6] text-[#E76F26]">
                      <Icons.Building />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[14.5px] font-semibold text-[#322822] truncate mb-0.5">{item.name}</p>
                      <div className="flex items-center gap-1.5 text-[12.5px] font-medium text-[#8A7D74]">
                        {item.mode === 'drive' ? <Icons.Drive color="#E76F26" /> : <Icons.Walk color="#E76F26" />}
                        <span>{item.time}</span>
                        <span className="mx-1">•</span>
                        <span>{item.distance}</span>
                      </div>
                    </div>
                    <div className="flex-shrink-0 text-[#8A7D74]/60">
                      <Icons.ChevronRight />
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setIsAddingPlace(true)}
                className="w-full py-3.5 rounded-[7px] border border-dashed border-[#E5DFD4] font-semibold text-[13.5px] text-[#E76F26] flex items-center justify-center gap-2 transition-all duration-300 hover:bg-[#F4EFE6]/50 bg-white"
              >
                <Icons.Plus /> Add Place to {tabData[activeTab]?.title}
              </button>

              <p className="text-[12px] font-medium text-[#8A7D74] text-center mt-6 pb-2">
                {tabData[activeTab]?.footer}
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}