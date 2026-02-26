import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';

interface Props { onBack: () => void; }

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

function buildCalendar(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = Array(firstDay).fill(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

const DirectSiteVisit: React.FC<Props> = ({ onBack }) => {
  const [needsCab, setNeedsCab]        = useState(false);
  const today                           = new Date();
  const [viewYear, setViewYear]         = useState(today.getFullYear());
  const [viewMonth, setViewMonth]       = useState(today.getMonth());
  const [selectedDay, setSelectedDay]   = useState<number | null>(null);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const calendarRef  = useRef<HTMLDivElement>(null);
  const triggerRef   = useRef<HTMLButtonElement>(null);
  const [popupStyle, setPopupStyle] = useState<React.CSSProperties>({});

  const cells = buildCalendar(viewYear, viewMonth);

  // Close on outside click
  useEffect(() => {
    if (!calendarOpen) return;
    const handler = (e: MouseEvent) => {
      if (
        calendarRef.current && !calendarRef.current.contains(e.target as Node) &&
        triggerRef.current && !triggerRef.current.contains(e.target as Node)
      ) {
        setCalendarOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [calendarOpen]);

  const openCalendar = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPopupStyle({
        position: 'fixed',
        bottom: window.innerHeight - rect.top + 6,
        left: rect.left,
        width: rect.width,
        zIndex: 9999,
      });
    }
    setCalendarOpen(o => !o);
  };

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const isPast = (day: number) => {
    const d = new Date(viewYear, viewMonth, day);
    d.setHours(0,0,0,0);
    const t = new Date(); t.setHours(0,0,0,0);
    return d < t;
  };

  const selectDay = (day: number) => {
    setSelectedDay(day);
    setCalendarOpen(false);
  };

  const displayDate = selectedDay
    ? `${selectedDay} ${MONTHS[viewMonth]} ${viewYear}`
    : '';

  return (
    <div className="flex flex-col gap-5 animate-fade-in">
      <div className="flex items-center gap-2">
        <button onClick={onBack} aria-label="Go back" className="p-1.5 hover:bg-slate-100 rounded-[7px] transition-all duration-300 shadow-sm hover:shadow-md">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2F3D5A" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>
        <span className="text-[15px] font-extrabold text-[#2F3D5A]">Direct Site Visit</span>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-gradient-to-br from-orange-50 to-orange-100/50 border border-orange-200 rounded-[7px] flex items-center justify-between shadow-md shadow-orange-500/10">
          <div>
            <p className="text-[13px] font-bold text-[#2F3D5A]">Request Complimentary Cab?</p>
            <p className="text-[11px] text-gray-500 font-medium">We offer door-to-door pickup & drop</p>
          </div>
          <input
            type="checkbox"
            title="Request complimentary cab"
            aria-label="Request complimentary cab"
            checked={needsCab}
            onChange={() => setNeedsCab(!needsCab)}
            className="w-5 h-5 accent-[#F85B01]"
          />
        </div>

        {needsCab && (
          <div className="animate-fade-in-up">
            <label className="text-[12px] font-bold text-gray-400 tracking-wide">Pickup Address</label>
            <textarea className="w-full mt-2 p-3 bg-slate-50 border border-slate-200 rounded-[7px] text-[14px] font-medium outline-none focus:border-[#F85B01] focus:shadow-md transition-all h-20 shadow-sm" placeholder="Enter your full address..." />
          </div>
        )}

        {/* ── Date Picker ── */}
        <div>
          <p className="text-[12px] font-bold text-gray-400 tracking-wide mb-2">Preferred Date</p>
          <button
            ref={triggerRef}
            type="button"
            onClick={openCalendar}
            className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-[7px] border text-left transition-all outline-none
              ${calendarOpen ? 'border-[#F85B01] ring-2 ring-[#F85B01]/15 bg-white' : 'border-gray-200 bg-[#F8F9FB]'}`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={calendarOpen ? '#F85B01' : '#94A3B8'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="3" ry="3"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            <span className={`text-[14px] font-bold flex-1 ${displayDate ? 'text-[#1A2540]' : 'text-gray-400'}`}>
              {displayDate || 'Select a date'}
            </span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              className={`transition-transform duration-200 ${calendarOpen ? 'rotate-180' : ''}`}>
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>

          {/* Calendar portal — renders outside all clipping contexts */}
          {calendarOpen && ReactDOM.createPortal(
            <div ref={calendarRef} style={popupStyle} className="rounded-[7px] border border-gray-100 overflow-hidden shadow-[0_-4px_30px_rgba(0,0,0,0.16)]">
              {/* Month header */}
              <div className="flex items-center justify-between px-4 py-3"
                style={{ background: 'linear-gradient(135deg, #1A2540 0%, #0F1929 50%, #1C2E4A 100%)' }}>
                <button onClick={prevMonth} aria-label="Previous month"
                  className="w-7 h-7 rounded-[5px] bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
                </button>
                <span className="text-[13px] font-extrabold text-white tracking-wide">{MONTHS[viewMonth]} {viewYear}</span>
                <button onClick={nextMonth} aria-label="Next month"
                  className="w-7 h-7 rounded-[5px] bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                </button>
              </div>
              {/* Day labels */}
              <div className="grid grid-cols-7 bg-[#F8F9FB] border-b border-gray-100">
                {DAYS.map(d => (
                  <div key={d} className="text-center text-[10px] font-extrabold text-slate-400 py-2">{d}</div>
                ))}
              </div>
              {/* Date cells */}
              <div className="grid grid-cols-7 bg-white p-2 gap-0.5">
                {cells.map((day, i) => {
                  if (!day) return <div key={i} />;
                  const past = isPast(day);
                  const isToday = day === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear();
                  const active = selectedDay === day;
                  return (
                    <button key={i} disabled={past} onClick={() => selectDay(day)}
                      className={`aspect-square flex items-center justify-center text-[12.5px] font-bold rounded-[5px] transition-all duration-150
                        ${past ? 'text-slate-200 cursor-not-allowed' : 'hover:bg-orange-50 hover:text-[#F85B01]'}
                        ${isToday && !active ? 'border border-[#F85B01]/40 text-[#F85B01]' : ''}
                      `}
                      style={active ? { background: 'linear-gradient(135deg, #F85B01, #C94A00)', color: 'white', boxShadow: '0 0 10px rgba(248,91,1,0.35)' } : {}}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>,
            document.body
          )}
        </div>

        {/* ── Preferred Time ── */}
        <div>
          <p className="text-[12px] font-bold text-gray-400 tracking-wide mb-2">Preferred Time</p>
          <div className="relative">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#F85B01" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
            </div>
            <input
              type="time"
              value={selectedTime}
              onChange={e => setSelectedTime(e.target.value)}
              aria-label="Preferred visit time"
              className="w-full pl-10 pr-4 py-3 bg-[#F8F9FB] border border-gray-200 rounded-[7px] text-[14px] font-bold text-[#1A2540] outline-none transition-all focus:border-[#F85B01] focus:ring-2 focus:ring-[#F85B01]/15 focus:bg-white"
            />
          </div>
        </div>

        <button className="w-full bg-gradient-to-r from-[#F85B01] to-[#E24E00] text-white py-4 rounded-[7px] font-extrabold text-[15px] shadow-xl shadow-orange-500/30 hover:shadow-2xl hover:shadow-orange-500/40 transition-all duration-300 hover:scale-102">
          Confirm Schedule
        </button>
      </div>
    </div>
  );
};

export default DirectSiteVisit;