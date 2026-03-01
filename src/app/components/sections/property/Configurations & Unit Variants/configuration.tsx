import React, { useState, useMemo, useEffect } from 'react';
import Tower from './tower';
import ConfigurationTable from './ConfigurationTable';
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
      {selectedUnit ? (
        <Tower unitData={selectedUnit} onClose={() => setSelectedUnit(null)} />
      ) : (
        <ConfigurationTable
          data={dataFilteredByTower}
          savedItems={savedItems}
          onToggleSave={toggleSave}
          onViewUnit={setSelectedUnit}
        />
      )}
    </div>
  );
}
