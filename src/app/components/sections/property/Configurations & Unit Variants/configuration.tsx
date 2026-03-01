import React, { useState, useMemo, useEffect } from 'react';
import Tower from './tower';
import ConfigurationTable from './ConfigurationTable';
import SellerQueries from './SellerQueries';
import { mockData } from './data';
import type { UnitItem } from './types';

interface ConfigurationProps {
  selectedTower: string;
}

export default function Configuration({ selectedTower }: ConfigurationProps) {
  const [savedItems, setSavedItems] = useState<Set<string>>(new Set(['2']));
  const [selectedUnit, setSelectedUnit] = useState<UnitItem | null>(null);

  const dataFilteredByTower = useMemo(() => {
    if (selectedTower === 'All Towers') return mockData;
    return mockData.filter(item => item.tower === selectedTower);
  }, [selectedTower]);

  useEffect(() => {
    setSelectedUnit(null);
  }, [selectedTower]);

  const toggleSave = (id: string) => {
    setSavedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id); else newSet.add(id);
      return newSet;
    });
  };

  return (
    <div className="w-full font-['Outfit',_sans-serif]">
      <ConfigurationTable
        data={dataFilteredByTower}
        savedItems={savedItems}
        onToggleSave={toggleSave}
        onViewUnit={setSelectedUnit}
      />

      <div className="mt-2">
        <SellerQueries />
      </div>

      {selectedUnit && (
        <div
          className="fixed inset-0 z-[100] bg-black/45 backdrop-blur-[1px] flex items-center justify-center p-3"
          onClick={() => setSelectedUnit(null)}
        >
          <div
            className="w-[92vw] max-w-[340px] max-h-[78vh] overflow-y-auto rounded-[7px] [scrollbar-width:thin] [scrollbar-color:#B8AEA2_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#B8AEA2] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:border-[2px] [&::-webkit-scrollbar-thumb]:border-transparent [&::-webkit-scrollbar-thumb]:bg-clip-content hover:[&::-webkit-scrollbar-thumb]:bg-[#9B8F82]"
            onClick={(e) => e.stopPropagation()}
          >
            <Tower unitData={selectedUnit} onClose={() => setSelectedUnit(null)} />
          </div>
        </div>
      )}
    </div>
  );
}
