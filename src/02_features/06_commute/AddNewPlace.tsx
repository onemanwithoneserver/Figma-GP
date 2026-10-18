import { cn } from '../../03_shared/03_utils/utils';
import { ActionButton } from '../../03_shared/02_ui/ActionButton';
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
    <div className="flex flex-col bg-surface-soft rounded-b-[7px]">

      <div className="p-4 space-y-4">

        <div className="space-y-1">
          <label className="text-[12px] font-semibold text-[#312822] ml-0.5">Search location</label>
          <div className="flex items-center bg-white rounded-control px-3 py-2.5 border border-outline focus-within:border-brand-warm transition-all shadow-sm">
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

        <div className="h-[150px] bg-[#EBE4D8] rounded-control relative overflow-hidden flex items-center justify-center border border-outline">
          <div className={cn("absolute inset-0 opacity-5", "[background-image:radial-gradient(#312822_1px,_transparent_1px)] [background-size:16px_16px]")}  />
          <div className="bg-[#312822] text-white px-3 py-1.5 rounded-control text-[11px] font-bold shadow-lg z-10 flex items-center gap-2 max-w-[80%]">
            <Icons.MapPin />
            <span className="truncate">{mapSearch || 'Move map to pin location'}</span>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[12px] font-semibold text-[#312822] ml-0.5">Name of the Place</label>
          <div className="flex items-center bg-white rounded-control px-3 py-2.5 border border-outline focus-within:border-brand-warm transition-all shadow-sm">
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

        <div className="flex gap-2.5 pt-1">
          <ActionButton
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-control border border-outline text-[#554E48] font-bold text-[13px] bg-white hover:bg-surface transition-colors"
          >
            Cancel
          </ActionButton>
          <ActionButton
            onClick={() => onSave(placeName, mapSearch)}
            disabled={!placeName || !mapSearch}
            className="flex-[1.5] py-2.5 rounded-control text-white font-bold text-[13px] bg-brand-warm disabled:opacity-40 shadow-sm active:scale-95 transition-all"
          >
            Save Place
          </ActionButton>
        </div>
      </div>
    </div>
  );
}