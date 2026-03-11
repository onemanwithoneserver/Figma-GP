import React, { useMemo, useState } from 'react';
import { Calendar } from '../../../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../../../ui/popover';

interface Props {
  onBack: () => void;
  showBack?: boolean;
}

type Slot = {
  label: string;
  available: boolean;
};

const SLOT_BY_WEEKDAY: Record<number, Slot[]> = {
  0: [
    { label: '09:30 AM', available: true },
    { label: '11:00 AM', available: true },
    { label: '01:00 PM', available: false },
    { label: '02:30 PM', available: true },
    { label: '04:00 PM', available: true },
    { label: '06:00 PM', available: false },
  ],
  1: [
    { label: '09:00 AM', available: true },
    { label: '10:00 AM', available: true },
    { label: '12:30 PM', available: true },
    { label: '02:00 PM', available: true },
    { label: '03:30 PM', available: true },
    { label: '05:30 PM', available: false },
  ],
  2: [
    { label: '09:30 AM', available: true },
    { label: '10:30 AM', available: true },
    { label: '02:00 PM', available: false },
    { label: '03:30 PM', available: true },
    { label: '05:00 PM', available: true },
    { label: '06:30 PM', available: true },
  ],
  3: [
    { label: '08:30 AM', available: true },
    { label: '09:30 AM', available: true },
    { label: '12:00 PM', available: true },
    { label: '02:30 PM', available: true },
    { label: '04:30 PM', available: false },
    { label: '06:00 PM', available: true },
  ],
  4: [
    { label: '09:00 AM', available: true },
    { label: '10:00 AM', available: true },
    { label: '01:30 PM', available: true },
    { label: '03:00 PM', available: false },
    { label: '06:00 PM', available: true },
    { label: '07:00 PM', available: true },
  ],
  5: [
    { label: '09:30 AM', available: false },
    { label: '11:30 AM', available: true },
    { label: '02:30 PM', available: true },
    { label: '04:00 PM', available: true },
    { label: '05:30 PM', available: false },
    { label: '06:30 PM', available: true },
  ],
  6: [
    { label: '08:30 AM', available: true },
    { label: '10:00 AM', available: true },
    { label: '01:00 PM', available: false },
    { label: '02:30 PM', available: true },
    { label: '03:00 PM', available: true },
    { label: '05:30 PM', available: true },
  ],
};

const OnlineVisit: React.FC<Props> = ({ onBack, showBack = true }) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedSlot, setSelectedSlot] = useState('');
  const today = new Date();
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  const availableSlots = useMemo(() => {
    if (!selectedDate) return [] as Slot[];
    const day = selectedDate.getDay();
    return SLOT_BY_WEEKDAY[day] ?? [];
  }, [selectedDate]);

  return (
    <div className="flex flex-col gap-3 animate-fade-in">
      {showBack && (
        <div className="flex items-center gap-2">
          <button onClick={onBack} aria-label="Go back" title="Go back" className="p-1 hover:bg-[#FFF1E3] rounded-[5px] transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#322822" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          <span className="text-[15px] font-extrabold text-[#322822]">Online Consultation</span>
        </div>
      )}

      <div className="space-y-2.5">
        <div>
          <p className="text-[11px] font-bold text-[#322822] tracking-wide mb-1">Select Date</p>
          <Popover>
            <PopoverTrigger asChild>
              <button
                type="button"
                className="w-full flex items-center gap-2 px-2.5 py-2 rounded-[5px] border border-[#E7D4C1] bg-[#FFF9F2] text-left transition-all outline-none hover:border-[#F06A00]/50 focus:border-[#F06A00]"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#A66B46" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="3" ry="3" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <span className={`text-[12px] font-bold flex-1 ${selectedDate ? 'text-[#322822]' : 'text-[#A68973]'}`}>
                  {selectedDate
                    ? selectedDate.toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })
                    : 'Select a date'}
                </span>
              </button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-auto p-0">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => {
                  setSelectedDate(date);
                  setSelectedSlot('');
                }}
                disabled={(date) => date < todayStart}
                classNames={{
                  caption_label: 'text-[12px] font-bold text-[#322822]',
                  day_selected: 'bg-[#F06A00] text-white hover:bg-[#D95700] focus:bg-[#D95700] focus:text-white',
                  day_today: 'border border-[#F06A00] text-[#D95700] bg-[#FFF1E3]',
                  day: 'size-8 p-0 text-[#322822] hover:bg-[#FFF1E3] hover:text-[#D95700]'
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <p className="text-[11px] font-bold text-[#322822] tracking-wide mb-1">Available Slots</p>
          {selectedDate ? (
            <div className="grid grid-cols-3 gap-2">
              {availableSlots.map((slot) => (
                <button
                  key={slot.label}
                  type="button"
                  disabled={!slot.available}
                  onClick={() => setSelectedSlot(slot.label)}
                  className="rounded-[5px] px-2 py-1.5 text-[11px] font-bold transition-all disabled:cursor-not-allowed"
                  style={
                    !slot.available
                      ? { background: '#F7EDE4', color: '#B08968', border: '1px dashed #D4B59B' }
                      : selectedSlot === slot.label
                        ? { background: 'linear-gradient(135deg, #F06A00, #D95700)', color: 'white', border: '1px solid #F06A00' }
                        : { background: '#FFF9F2', color: '#5C3E2A', border: '1px solid #E7D4C1' }
                  }
                >
                  {slot.label}
                </button>
              ))}
            </div>
          ) : (
            <div className="rounded-[5px] border border-dashed border-[#D4B59B] bg-[#FFF7EF] px-2.5 py-1.5 text-[11px] font-semibold text-[#8B5E3C]">
              Select a date to view available slots.
            </div>
          )}
        </div>

        <button className="w-full bg-gradient-to-r from-[#F06A00] to-[#D95700] text-white py-2.5 rounded-[5px] font-extrabold text-[13px] shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all mt-0.5">
          Proceed to Raise Request
        </button>
      </div>
    </div>
  );
};

export default OnlineVisit;