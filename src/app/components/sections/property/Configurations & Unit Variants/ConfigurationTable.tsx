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
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[7px] border text-[11px] font-semibold transition-all shadow-sm hover:shadow-md
          ${isActive
            ? 'bg-[#322822] text-white border-[#322822]'
            : 'bg-[#F9F7F2] text-[#322822] border-[#E5DFD4] hover:border-[#322822]'
          }`}
      >
        <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        {label}{isActive ? `: ${value}` : ''}
        {isActive && (
          <span
            role="button"
            onClick={(e) => { e.stopPropagation(); onChange(null); }}
            className="ml-0.5 opacity-70 hover:opacity-100"
          >✕</span>
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 min-w-[120px] bg-white border border-[#E8E5DF] rounded-[7px] shadow-lg z-[999] py-1">
          <button
            onClick={() => { onChange(null); setIsOpen(false); }}
            className={`w-full text-left px-3 py-1.5 text-[11px] hover:bg-[#F4EFE6] ${value === null ? 'text-[#E76F26] font-semibold' : 'text-[#322822]'}`}
          >
            All
          </button>
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => { onChange(opt); setIsOpen(false); }}
              className={`w-full text-left px-3 py-1.5 text-[11px] hover:bg-[#F4EFE6] ${value === opt ? 'text-[#E76F26] font-semibold' : 'text-[#322822]'}`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const getAvailabilityStyles = (status: string): string => {
  switch (status) {
    case 'Available': return 'bg-white text-[#322822] border-[#E5DFD4] shadow-sm';
    case 'Limited':   return 'bg-[#E76F26]/10 text-[#C94A00] border-[#E76F26]/30';
    case 'Sold Out':  return 'bg-[#F4EFE6] text-[#8C827A] border-[#E5DFD4]';
    default:          return 'bg-[#F9F7F2] text-[#8C827A] border-[#E5DFD4]';
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
          <button
            onClick={() => { setTowerFilter(null); setTypeFilter(null); setFacingFilter(null); setAvailFilter(null); }}
            className="text-[10px] font-bold text-[#E76F26] hover:underline ml-auto  tracking-wide"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="w-full bg-white rounded-[7px]  border border-[#E5DFD4] overflow-hidden shadow-sm">
        {filteredData.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-[#8C827A] gap-2">
            <svg className="w-9 h-9 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            <p className="text-[13px] font-extrabold text-[#322822]">No units match your filters</p>
            <p className="text-[11px] text-[#8C827A] font-medium">Try adjusting or clearing the filters above</p>
          </div>
        ) : (
          <table className="w-full text-left border-collapse table-auto">
            <thead>
              <tr className="bg-[#E76F26]">
                <th className="border border-[#C94A00] px-1 py-1.5 text-[11px] font-extrabold text-white tracking-wide ">Type</th>
                <th className="border border-[#C94A00] px-1 py-1.5 text-[11px] font-extrabold text-white tracking-wide ">Facing</th>
                <th className="border border-[#C94A00] px-1 py-1.5 text-[11px] font-extrabold text-white tracking-wide ">Status</th>
                <th className="border border-[#C94A00] px-1 py-1.5 text-[11px] font-extrabold text-white text-center tracking-wide ">Save</th>
                <th className="border border-[#C94A00] px-1 py-1.5 text-[11px] font-extrabold text-white text-center whitespace-nowrap tracking-wide ">View Plan</th>
              </tr>
            </thead>

            <tbody className="bg-white">
              {filteredData.map((item, idx) => (
                <tr key={item.id} className={`transition-colors hover:bg-[#F4EFE6]/50 ${idx % 2 === 0 ? 'bg-white' : 'bg-[#F9F7F2]/50'}`}>
                  <td className="border border-[#E5DFD4] px-2 py-2.5 align-middle">
                    <span className="font-extrabold text-[12px] text-[#322822]">{item.type}</span>
                  </td>

                  <td className="border border-[#E5DFD4] px-2 py-2.5 align-middle text-[12px] font-bold text-[#554E48]">
                    {item.facing}
                  </td>

                  <td className="border border-[#E5DFD4] px-2 py-2.5 align-middle">
                    <span className={`inline-block px-2 py-0.5 rounded-[5px] text-[10px] font-extrabold border  tracking-wider ${getAvailabilityStyles(item.availability)}`}>
                      {item.availability}
                    </span>
                  </td>

                  <td className="border border-[#E5DFD4] px-1 py-2.5 align-middle text-center">
                    <button onClick={() => onToggleSave(item.id)} title={savedItems.has(item.id) ? 'Remove from saved' : 'Save unit'} className="inline-block align-middle hover:scale-110 transition-transform">
                      <svg className={`w-4 h-4 ${savedItems.has(item.id) ? 'text-[#E76F26]' : 'text-[#8C827A]'}`} viewBox="0 0 24 24" fill={savedItems.has(item.id) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                      </svg>
                    </button>
                  </td>

                  <td className="border border-[#E5DFD4] px-1 py-2.5 align-middle text-center">
                    <button
                      title="View floor plan"
                      /* Updated color to #332823 */
                      className="p-1.5 text-[#332823] hover:bg-[#F4EFE6] rounded-[7px] transition-all hover:shadow-sm disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:shadow-none"
                      disabled={item.availability === 'Sold Out'}
                      onClick={() => onViewUnit(item)}
                    >
                      <svg className="w-4 h-4 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    </button>
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