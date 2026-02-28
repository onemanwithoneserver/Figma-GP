import React, { useState } from 'react';
import { Icons } from './commuteData';

interface AddNewPlaceProps {
  title: string;
  onSave: (name: string, mapSearch: string) => void;
  onCancel: () => void;
}

export default function AddNewPlace({ title, onSave, onCancel }: AddNewPlaceProps) {
  const [placeName, setPlaceName] = useState('');
  const [mapSearch, setMapSearch] = useState('');

  return (
    <div className="flex flex-col bg-[#FDFBF8] rounded-b-[7px]">

      <div className="p-4 space-y-4">
        {/* Search Input - Removed Numbering & Uppercase */}
        <div className="space-y-1">
          <label className="text-[12px] font-semibold text-[#312822] ml-0.5">Search location</label>
          <div className="flex items-center bg-white rounded-[7px] px-3 py-2.5 border border-[#E5DFD4] focus-within:border-[#E76F26] transition-all shadow-sm">
            <Icons.Search />
            <input
              type="text" 
              placeholder="Search location on map…" 
              autoFocus
              className="bg-transparent border-none outline-none w-full ml-2 text-[14px] text-[#312822] font-medium placeholder-[#8C827A]/60"
              value={mapSearch} 
              onChange={(e) => setMapSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Map Visualizer - Reduced Height */}
        <div className="h-[150px] bg-[#EBE4D8] rounded-[7px] relative overflow-hidden flex items-center justify-center border border-[#E5DFD4]">
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#312822 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
          <div className="bg-[#312822] text-white px-3 py-1.5 rounded-[7px] text-[11px] font-bold shadow-lg z-10 flex items-center gap-2 max-w-[80%]">
            <Icons.MapPin /> 
            <span className="truncate">{mapSearch || 'Move map to pin location'}</span>
          </div>
        </div>

        {/* Name Input - Removed Numbering & Uppercase */}
        <div className="space-y-1">
          <label className="text-[12px] font-semibold text-[#312822] ml-0.5">Name of the Place</label>
          <div className="flex items-center bg-white rounded-[7px] px-3 py-2.5 border border-[#E5DFD4] focus-within:border-[#E76F26] transition-all shadow-sm">
            <Icons.Tag />
            <input
              type="text" 
              placeholder="e.g. My Gym, Office, Parent's Home"
              className="bg-transparent border-none outline-none w-full ml-2 text-[14px] text-[#312822] font-bold placeholder-[#8C827A]/60"
              value={placeName} 
              onChange={(e) => setPlaceName(e.target.value)}
            />
          </div>
        </div>

        {/* Action Buttons - Optimized Padding */}
        <div className="flex gap-2.5 pt-1">
          <button 
            onClick={onCancel} 
            className="flex-1 py-2.5 rounded-[7px] border border-[#E5DFD4] text-[#554E48] font-bold text-[13px] bg-white hover:bg-[#F9F7F2] transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={() => onSave(placeName, mapSearch)} 
            disabled={!placeName || !mapSearch} 
            className="flex-[1.5] py-2.5 rounded-[7px] text-white font-bold text-[13px] bg-[#E76F26] disabled:opacity-40 shadow-sm active:scale-95 transition-all"
          >
            Save Place
          </button>
        </div>
      </div>
    </div>
  );
}