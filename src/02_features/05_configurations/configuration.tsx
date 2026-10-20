import React, { useState, useMemo, useEffect } from 'react';
import { AppDialog } from '../../03_shared/02_ui/AppDialog';
import Tower from './tower';
import ConfigurationTable from './ConfigurationTable';
import SellerQueries from './SellerQueries';
import { mockData } from './data';
import type { UnitItem } from './types';

const TOWER_DISPLAY_MAP: Record<string, string> = {
  'Tower A': 'Shlok',
  'Tower B': 'Ayush',
  'Tower C': 'Ananta',
  'Tower D': 'Advait',
  'Tower E': 'Vihaan',
  'Tower F': 'Ishan',
  'Tower G': 'Aarav',
  'Tower H': 'Kavya',
};

export default function Configuration() {
  const [savedItems, setSavedItems] = useState<Set<string>>(new Set(['2']));
  const [selectedUnit, setSelectedUnit] = useState<UnitItem | null>(null);

  const displayData = useMemo(
    () => mockData.map((item) => ({
      ...item,
      tower: TOWER_DISPLAY_MAP[item.tower] || item.tower,
    })),
    []
  );

  useEffect(() => {
    setSelectedUnit(null);
  }, []);

  const toggleSave = (id: string) => {
    setSavedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id); else newSet.add(id);
      return newSet;
    });
  };

  return (
    <div className="w-full ">
      <ConfigurationTable
        data={displayData}
        savedItems={savedItems}
        onToggleSave={toggleSave}
        onViewUnit={setSelectedUnit}
      />

      <div className="mt-2">
        <SellerQueries />
      </div>

      {selectedUnit && (
        <AppDialog open onClose={() => setSelectedUnit(null)} label="Floor plan details" containerClassName="!p-1" paperClassName="max-h-[96dvh]">
          <Tower unitData={selectedUnit} onClose={() => setSelectedUnit(null)} />
        </AppDialog>
      )}
    </div>
  );
}
