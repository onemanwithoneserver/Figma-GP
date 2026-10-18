import FilterAltOutlined from '@mui/icons-material/FilterAltOutlined';
import FavoriteBorderRounded from '@mui/icons-material/FavoriteBorderRounded';
import VisibilityOutlined from '@mui/icons-material/VisibilityOutlined';
import FavoriteRounded from '@mui/icons-material/FavoriteRounded';
import { ActionButton } from '../../03_shared/02_ui/ActionButton';
import React, { useState, useMemo, useRef, useEffect } from 'react';
import type { UnitItem } from './types';

interface ConfigurationTableProps {
  data: UnitItem[];
  savedItems: Set<string>;
  onToggleSave: (id: string) => void;
  onViewUnit: (item: UnitItem) => void;
}

const FilterPill = ({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string | null;
  onChange: (val: string | null) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const isActive = value !== null;

  return (
    <div className="relative" ref={ref}>
      <ActionButton
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-control border text-[11px] font-semibold transition-all shadow-sm hover:shadow-md
          ${isActive
            ? 'bg-ink text-white border-ink'
            : 'bg-surface text-ink border-outline hover:border-ink'
          }`}
      >
        <FilterAltOutlined className="w-3 h-3 shrink-0" />
        {label}{isActive ? `: ${value}` : ''}
        {isActive && (
          <span
            role="button"
            onClick={(e) => { e.stopPropagation(); onChange(null); }}
            className="ml-0.5 opacity-70 hover:opacity-100"
          >✕</span>
        )}
      </ActionButton>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 min-w-[120px] bg-white border border-[#E8E5DF] rounded-control shadow-lg z-[999] py-1">
          <ActionButton
            onClick={() => { onChange(null); setIsOpen(false); }}
            className={`w-full text-left px-3 py-1.5 text-[11px] hover:bg-surface-muted ${value === null ? 'text-brand-warm font-semibold' : 'text-ink'}`}
          >
            All
          </ActionButton>
          {options.map((opt) => (
            <ActionButton
              key={opt}
              onClick={() => { onChange(opt); setIsOpen(false); }}
              className={`w-full text-left px-3 py-1.5 text-[11px] hover:bg-surface-muted ${value === opt ? 'text-brand-warm font-semibold' : 'text-ink'}`}
            >
              {opt}
            </ActionButton>
          ))}
        </div>
      )}
    </div>
  );
};

const getAvailabilityStyles = (status: string): string => {
  switch (status) {
    case 'Available': return 'bg-[#EAF3EC] text-[#1B522F] border-[#CFE5D3] shadow-xs';
    case 'Limited':   return 'bg-[#ECF2F7] text-[#234568] border-[#CEE0EE] shadow-xs';
    case 'Sold Out':  return 'bg-[#F3EFE9] text-[#6B5E57] border-[#DFD7CB]';
    default:          return 'bg-[#F3EFE9] text-[#6B5E57] border-[#DFD7CB]';
  }
};

export default function ConfigurationTable({
  data,
  savedItems,
  onToggleSave,
  onViewUnit,
}: ConfigurationTableProps) {

  const [towerFilter, setTowerFilter] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [facingFilter, setFacingFilter] = useState<string | null>(null);
  const [availFilter, setAvailFilter] = useState<string | null>(null);

  const towerOptions  = useMemo(() => Array.from(new Set(data.map(d => d.tower))).sort(), [data]);
  const typeOptions   = useMemo(() => ['2 BHK', '3 BHK', '4 BHK'], []);
  const facingOptions = useMemo(() => Array.from(new Set(data.map(d => d.facing))).sort(), [data]);
  const availOptions  = useMemo(() => Array.from(new Set(data.map(d => d.availability))).sort(), [data]);

  const filteredData = useMemo(() => data.filter(item => {
    if (towerFilter  && item.tower        !== towerFilter)  return false;
    if (typeFilter   && item.type         !== typeFilter)   return false;
    if (facingFilter && item.facing       !== facingFilter) return false;
    if (availFilter  && item.availability !== availFilter)  return false;
    return true;
  }), [data, towerFilter, typeFilter, facingFilter, availFilter]);

  const hasActiveFilters = towerFilter || typeFilter || facingFilter || availFilter;

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex items-center gap-2 flex-wrap">
        <FilterPill label="Tower"   options={towerOptions}  value={towerFilter}  onChange={setTowerFilter} />
        <FilterPill label="Type"    options={typeOptions}   value={typeFilter}   onChange={setTypeFilter} />
        <FilterPill label="Facing"  options={facingOptions} value={facingFilter} onChange={setFacingFilter} />
        <FilterPill label="Status"  options={availOptions}  value={availFilter}  onChange={setAvailFilter} />
        {hasActiveFilters && (
          <ActionButton
            onClick={() => { setTowerFilter(null); setTypeFilter(null); setFacingFilter(null); setAvailFilter(null); }}
            className="text-[10px] font-bold text-brand-warm hover:underline ml-auto  tracking-wide"
          >
            Clear all
          </ActionButton>
        )}
      </div>

      <div className="w-full bg-white rounded-control  border border-outline overflow-hidden shadow-sm">
        {filteredData.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-ink-subtle gap-2">
            <FilterAltOutlined className="w-9 h-9 opacity-40" />
            <p className="text-[13px] font-extrabold text-ink">No units match your filters</p>
            <p className="text-[11px] text-ink-subtle font-medium">Try adjusting or clearing the filters above</p>
          </div>
        ) : (
          <table className="w-full text-left border-collapse table-auto">
            <thead>
              <tr className="bg-brand-warm">
                <th className="border border-brand-dark px-1 py-1.5 text-[11px] font-extrabold text-white text-center tracking-wide w-12">Save</th>
                <th className="border border-brand-dark px-1 py-1.5 text-[11px] font-extrabold text-white tracking-wide ">Type</th>
                <th className="border border-brand-dark px-1 py-1.5 text-[11px] font-extrabold text-white tracking-wide ">Facing</th>
                <th className="border border-brand-dark px-1 py-1.5 text-[11px] font-extrabold text-white tracking-wide ">Status</th>
                <th className="border border-brand-dark px-1 py-1.5 text-[11px] font-extrabold text-white text-center whitespace-nowrap tracking-wide ">View Plan</th>
              </tr>
            </thead>

            <tbody className="bg-white">
              {filteredData.map((item, idx) => (
                <tr key={item.id} className={`transition-colors hover:bg-surface-muted/50 ${idx % 2 === 0 ? 'bg-white' : 'bg-surface/50'}`}>
                  <td className="border border-outline px-1 py-2.5 align-middle text-center w-12">
                    <ActionButton
                      onClick={() => onToggleSave(item.id)}
                      title={savedItems.has(item.id) ? 'Remove from saved' : 'Save unit'}
                      className="inline-block align-middle hover:scale-110 active:scale-95 transition-transform p-0.5 rounded-full hover:bg-red-50/60"
                    >
                      {savedItems.has(item.id) ? (
                        <FavoriteRounded className="h-4 w-4 text-red-500 fill-red-500" />
                      ) : (
                        <FavoriteBorderRounded className="h-4 w-4 text-ink-subtle hover:text-red-400 transition-colors" />
                      )}
                    </ActionButton>
                  </td>

                  <td className="border border-outline px-2 py-2.5 align-middle">
                    <span className="font-extrabold text-[12px] text-ink">{item.type}</span>
                  </td>

                  <td className="border border-outline px-2 py-2.5 align-middle text-[12px] font-bold text-[#554E48]">
                    {item.facing}
                  </td>

                  <td className="border border-outline px-2 py-2.5 align-middle">
                    <span className={`inline-block px-2 py-0.5 rounded-chip text-[10px] font-extrabold border  tracking-wider ${getAvailabilityStyles(item.availability)}`}>
                      {item.availability}
                    </span>
                  </td>

                  <td className="border border-outline px-1 py-2.5 align-middle text-center">
                    <ActionButton
                      title="View floor plan"

                      className="p-1.5 text-[#332823] hover:bg-surface-muted rounded-control transition-all hover:shadow-sm disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:shadow-none"
                      disabled={item.availability === 'Sold Out'}
                      onClick={() => onViewUnit(item)}
                    >
                      <VisibilityOutlined className="w-4 h-4 mx-auto" />
                    </ActionButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}