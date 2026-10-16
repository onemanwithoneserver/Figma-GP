import React, { useState, useEffect } from 'react';
import { INITIAL_DATA, INITIAL_TABS, Icons } from './commuteData';
import TabNavigation from './TabNavigation';
import MyFrequentPlaces from './MyFrequentPlaces';

export default function InteractiveCommute() {
  const [tabData, setTabData] = useState(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState('frequent');
  const [successToast, setSuccessToast] = useState<string | null>(null);

  useEffect(() => {
    if (!successToast) return;
    const t = setTimeout(() => setSuccessToast(null), 3000);
    return () => clearTimeout(t);
  }, [successToast]);

  const handleSavePlace = (name: string, mapSearch: string) => {
    const finalName = name.trim() || mapSearch.trim();
    setTabData(prev => ({
      ...prev,
      frequent: {
        ...prev.frequent,
        items: [
          { 
            id: Date.now().toString(), 
            name: finalName, 
            distance: '3.2 km', 
            color: prev.frequent.color, 
            icon: 'building' 
          },
          ...prev.frequent.items
        ]
      }
    }));
    setSuccessToast(`"${finalName}" added successfully!`);
  };

  return (
    <div className="w-full ">
        
        {/* Tab Navigation */}
        <TabNavigation 
          tabs={INITIAL_TABS} 
          activeTab={activeTab} 
          onTabClick={setActiveTab} 
        />

        <div className="py-1 px-1 bg-[#ffffff] flex-1 rounded-b-[7px]">
          {/* Success Notification */}
          {successToast && (
            <div className="flex items-center gap-2 bg-[#F4EFE6] text-[#322822] px-4 py-3 rounded-[7px] mb-4 text-[13px] font-bold border border-[#E5DFD4] shadow-sm animate-pulse">
              <Icons.Check /> {successToast}
            </div>
          )}
          
          {/* Places List */}
          <MyFrequentPlaces 
            activeTabId={activeTab} 
            currentData={tabData[activeTab]} 
            onSavePlace={handleSavePlace} 
          />
        </div>
      </div>
  );
}