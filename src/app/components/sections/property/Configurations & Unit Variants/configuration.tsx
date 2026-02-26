import React, { useState, useMemo, useEffect } from 'react';
import Tower from './tower';
import ConfigurationTable from './ConfigurationTable';
import BHKTabNav from './BHKTabNav';
import { mockData } from './data';
import type { UnitItem } from './types';

interface ConfigurationProps {
  selectedTower: string;
}

export default function Configuration({ selectedTower }: ConfigurationProps) {
  const [activeTab, setActiveTab] = useState('2 BHK');
  const [savedItems, setSavedItems] = useState<Set<string>>(new Set(['2']));
  const [selectedUnit, setSelectedUnit] = useState<UnitItem | null>(null);

  const dataFilteredByTower = useMemo(() => {
    if (selectedTower === 'All Towers') return mockData;
    return mockData.filter(item => item.tower === selectedTower);
  }, [selectedTower]);

  const availableTabs = useMemo(() => {
    const tabs = new Set(dataFilteredByTower.map(item => item.type));
    return Array.from(tabs).sort((a, b) => parseInt(a) - parseInt(b));
  }, [dataFilteredByTower]);

  const finalFilteredData = useMemo(() => {
    return dataFilteredByTower.filter(item => item.type === activeTab);
  }, [dataFilteredByTower, activeTab]);

  useEffect(() => {
    setSelectedUnit(null);
    const validTabs = Array.from(new Set(
      (selectedTower === 'All Towers' ? mockData : mockData.filter(item => item.tower === selectedTower))
        .map(item => item.type)
    )).sort((a, b) => parseInt(a) - parseInt(b));
    if (!validTabs.includes(activeTab) && validTabs.length > 0) {
      setActiveTab(validTabs[0]);
    }
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
      <BHKTabNav
        tabs={availableTabs}
        activeTab={activeTab}
        onTabChange={(tab) => { setActiveTab(tab); setSelectedUnit(null); }}
      />

      {selectedUnit ? (
        <Tower unitData={selectedUnit} onClose={() => setSelectedUnit(null)} />
      ) : (
        <ConfigurationTable
          data={finalFilteredData}
          savedItems={savedItems}
          onToggleSave={toggleSave}
          onViewUnit={setSelectedUnit}
        />
      )}
    </div>
  );
}
