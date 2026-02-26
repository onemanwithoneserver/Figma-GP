import React, { useState, useMemo, useRef, useEffect } from 'react';
import type { UnitItem } from './types';

interface ConfigurationTableProps {
  data: UnitItem[];
  savedItems: Set<string>;
  onToggleSave: (id: string) => void;
  onViewUnit: (item: UnitItem) => void;
}

// --- Filter Pill (sits above the table) ---
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
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[7px] border text-[11px] font-bold transition-all shadow-sm hover:shadow-md
          ${isActive
            ? 'bg-gradient-to-r from-[#2A2C32] to-[#1E293B] text-white border-[#2A2C32] shadow-md shadow-black/10'
            : 'bg-gradient-to-br from-[#F6F4EF] to-[#EFECE5] text-[#4A4D57] border-[#E8E5DF] hover:border-[#2A2C32]'
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
            className={`w-full text-left px-3 py-1.5 text-[11px] hover:bg-[#F6F4EF] ${value === null ? 'text-[#F85B01] font-bold' : 'text-[#4A4D57]'}`}
          >
            All
          </button>
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => { onChange(opt); setIsOpen(false); }}
              className={`w-full text-left px-3 py-1.5 text-[11px] hover:bg-[#F6F4EF] ${value === opt ? 'text-[#F85B01] font-bold' : 'text-[#4A4D57]'}`}
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
    case 'Available': return 'bg-emerald-50 text-emerald-700 border-emerald-200/50';
    case 'Limited':   return 'bg-amber-50 text-amber-700 border-amber-200/50';
    case 'Sold Out':  return 'bg-slate-100 text-slate-500 border-slate-200';
    default:          return 'bg-gray-50 text-gray-500';
  }
};

export default function ConfigurationTable({
  data,
  savedItems,
  onToggleSave,
  onViewUnit,
}: ConfigurationTableProps) {

  const [buaFilter, setBuaFilter] = useState<string | null>(null);
  const [facingFilter, setFacingFilter] = useState<string | null>(null);
  const [availFilter, setAvailFilter] = useState<string | null>(null);

  const buaOptions    = useMemo(() => Array.from(new Set(data.map(d => d.bua))).sort(), [data]);
  const facingOptions = useMemo(() => Array.from(new Set(data.map(d => d.facing))).sort(), [data]);
  const availOptions  = useMemo(() => Array.from(new Set(data.map(d => d.availability))).sort(), [data]);

  const filteredData = useMemo(() => data.filter(item => {
    if (buaFilter    && item.bua          !== buaFilter)    return false;
    if (facingFilter && item.facing       !== facingFilter) return false;
    if (availFilter  && item.availability !== availFilter)  return false;
    return true;
  }), [data, buaFilter, facingFilter, availFilter]);

  const hasActiveFilters = buaFilter || facingFilter || availFilter;

  return (
    <div className="w-full flex flex-col gap-3">

      {/* --- Filter Bar --- */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-[10px] font-bold text-[#94A3B8] tracking-widest mr-1">Filter</span>
        <FilterPill label="BUA"     options={buaOptions}    value={buaFilter}    onChange={setBuaFilter} />
        <FilterPill label="Facing"  options={facingOptions} value={facingFilter} onChange={setFacingFilter} />
        <FilterPill label="Status"  options={availOptions}  value={availFilter}  onChange={setAvailFilter} />
        {hasActiveFilters && (
          <button
            onClick={() => { setBuaFilter(null); setFacingFilter(null); setAvailFilter(null); }}
            className="text-[10px] font-bold text-[#F85B01] hover:underline ml-auto"
          >
            Clear all
          </button>
        )}
      </div>

      {/* --- Table --- */}
      <div className="w-full bg-white rounded-[7px] border border-gray-100 overflow-hidden" style={{boxShadow:'0 4px 20px rgba(0,0,0,0.07)'}}>
        {filteredData.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-[#8292A6] gap-2">
            <svg className="w-9 h-9 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            <p className="text-[13px] font-bold text-[#4A4D57]">No units match your filters</p>
            <p className="text-[11px]">Try adjusting or clearing the filters above</p>
          </div>
        ) : (
          <table className="w-full text-left border-collapse table-auto">
            <thead>
              <tr className="bg-gradient-to-r from-[#2A2C32] to-[#1E293B]">
                <th className="border border-[#3f424a] px-2 py-2.5 text-[11px] font-bold text-[#F6F4EF] tracking-wide">BUA</th>
                <th className="border border-[#3f424a] px-2 py-2.5 text-[11px] font-bold text-[#F6F4EF] tracking-wide">Facing</th>
                <th className="border border-[#3f424a] px-2 py-2.5 text-[11px] font-bold text-[#F6F4EF] tracking-wide">Status</th>
                <th className="border border-[#3f424a] px-1 py-2.5 text-[11px] font-bold text-[#F6F4EF] text-center tracking-wide">Save</th>
                <th className="border border-[#3f424a] px-1 py-2.5 text-[11px] font-bold text-[#F6F4EF] text-center whitespace-nowrap tracking-wide">View Plan</th>
              </tr>
            </thead>

            <tbody className="bg-white">
              {filteredData.map((item, idx) => (
                <tr key={item.id} className={`transition-colors hover:bg-gradient-to-r hover:from-[#FAFAF8] hover:to-[#F6F4EF] ${idx % 2 === 0 ? 'bg-white' : 'bg-[#FAFAF9]'}`}>
                  <td className="border border-[#E8E5DF] px-2 py-2.5 align-middle">
                    <span className="font-bold text-[13px] text-[#2A2C32]">{item.bua}</span>
                    <span className="text-[10px] text-[#8292A6] ml-1">sq.ft</span>
                  </td>

                  <td className="border border-[#E8E5DF] px-2 py-2.5 align-middle text-[12px] font-bold text-[#4A4D57]">
                    {item.facing}
                  </td>

                  <td className="border border-[#E8E5DF] px-2 py-2.5 align-middle">
                    <span className={`inline-block px-2 py-0.5 rounded-[5px] text-[10px] font-bold border shadow-sm ${getAvailabilityStyles(item.availability)}`}>
                      {item.availability}
                    </span>
                  </td>

                  <td className="border border-[#E8E5DF] px-1 py-2.5 align-middle text-center">
                    <button onClick={() => onToggleSave(item.id)} title={savedItems.has(item.id) ? 'Remove from saved' : 'Save unit'} className="inline-block align-middle hover:scale-110 transition-transform">
                      <svg className={`w-4 h-4 ${savedItems.has(item.id) ? 'text-[#F85B01]' : 'text-[#8292A6]'}`} viewBox="0 0 24 24" fill={savedItems.has(item.id) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                      </svg>
                    </button>
                  </td>

                  <td className="border border-[#E8E5DF] px-1 py-2.5 align-middle text-center">
                    <button
                      title="View floor plan"
                      className="p-1.5 text-[#F85B01] hover:bg-gradient-to-br hover:from-orange-50 hover:to-orange-100/50 rounded-[7px] transition-all hover:shadow-md disabled:opacity-30"
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