import React, { useState } from 'react';
import { Icons, TabData } from './commuteData';
import AddNewPlace from './AddNewPlace';
import SellerQueries from './SellerQueries'; // 1. Import the component

interface MyFrequentPlacesProps {
  activeTabId: string;
  currentData: TabData;
  onSavePlace: (name: string, mapSearch: string) => void;
}

function PlaceIcon({ icon }: { icon: string }) {
  return (
    <div className="w-11 h-11 flex-shrink-0 flex items-center justify-center rounded-[7px] shadow-sm bg-[#F4EFE6] text-[#E76F26]">
      {icon === 'school' ? <Icons.School /> : 
       icon === 'hospital' ? <Icons.Hospital /> : 
       icon === 'tree' ? <Icons.Tree /> :
       <Icons.Building />}
    </div>
  );
}

function TileArrow() {
  return (
    <div className="flex-shrink-0 text-[#8A7D74] group-hover:text-[#322822] transition-colors duration-200" aria-hidden="true">
      <Icons.ChevronRight />
    </div>
  );
}

export default function MyFrequentPlaces({ activeTabId, currentData, onSavePlace }: MyFrequentPlacesProps) {
  const [showAddPage, setShowAddPage] = useState(false);

  const handleSaveAndReturn = (name: string, mapSearch: string) => {
    onSavePlace(name, mapSearch);
    setShowAddPage(false);
  };

  if (showAddPage) {
    return (
      <div className="flex flex-col bg-[#FDFBF8] rounded-b-[7px] -mx-3 -mt-3 animate-in fade-in duration-300">
        <div className="px-4 py-3 bg-white border-b border-[#E5DFD4] flex items-center gap-2">
          <button onClick={() => setShowAddPage(false)} className="p-1 -ml-1 text-[#312822]" aria-label="Back" title="Back">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M19 12H5m7-7l-7 7 7 7"/>
            </svg>
          </button>
          <h3 className="text-[15px] font-bold text-[#312822]">Add New Place</h3>
        </div>
        <AddNewPlace title={currentData.title} onSave={handleSaveAndReturn} onCancel={() => setShowAddPage(false)} />
      </div>
    );
  }

  return (
    <>
      {/* Main Section */}
      <div className="flex flex-col bg-[#ffffff] py-2 px-1">
        {activeTabId === 'frequent' && (
          <h3 className="text-[12px] text-center py-1.5 font-medium text-[#312822] leading-tight">
            Auto calculate distance between your frequent visiting places and this project
          </h3>
        )}

        <div className="flex flex-col gap-2 mb-4">
          {currentData.items.length === 0 ? (
            <div className="border border-dashed border-[#E5DFD4] rounded-[7px] p-8 flex flex-col items-center justify-center text-center bg-white">
              <div className="mb-2 text-[#8A7D74]"><Icons.MapPin /></div>
              <p className="text-[14px] font-semibold text-[#312822]">No places added yet</p>
            </div>
          ) : (
            currentData.items.map((item) => (
              <div key={item.id} className="group flex items-center gap-3 p-3.5 rounded-[7px] border border-[#E5DFD4]/60 bg-white hover:border-[#E5DFD4] shadow-sm cursor-pointer transition-all duration-200">
                <PlaceIcon icon={item.icon} />
                <div className="flex-1 min-w-0">
                  <p className="text-[14.5px] font-bold text-[#312822] truncate mb-0.5">{item.name}</p>
                  <p className="text-[12.5px] text-[#312822] font-medium">{item.distance}</p>
                </div>
                <TileArrow />
              </div>
            ))
          )}
        </div>

        {activeTabId === 'frequent' && (
          <div className="space-y-2 flex flex-col items-stretch">
            <button 
              onClick={() => setShowAddPage(true)} 
              className="w-auto py-2 px-2 rounded-[7px] border border-dashed border-[#312822c7] text-[#E76F26] font-bold text-[12px] flex items-center justify-center gap-2 bg-white hover:bg-[#F4EFE6] transition-all active:scale-[0.99]"
            >
              <Icons.Plus /> 
              <span className="tracking-tight">Add New Place</span>
            </button>

            <p className="text-[11px] font-bold text-[#312822] text-center tracking-tight leading-tight">
              (Ex: Kids school, Spouse office, etc)
            </p>
          </div>
        )}
      </div>

      {/* Seller Question Section */}
      <div className="w-full">
        <SellerQueries />
      </div>
    </>
  );
}