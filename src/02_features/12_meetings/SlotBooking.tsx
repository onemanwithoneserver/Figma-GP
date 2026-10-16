import React, { useState } from 'react';

const dates = [
  { day: '11', label: 'Today' },
  { day: '12', label: 'Thu' },
  { day: '13', label: 'Fri' },
  { day: '14', label: 'Sat' },
  { day: '15', label: 'Sun' },
  { day: '16', label: 'Mon' },
  { day: '17', label: 'Tue' },
];

const sessions = [
  { key: 'morning', label: 'Morning', count: 11, icon: '🌅' },
  { key: 'afternoon', label: 'Afternoon', count: 12, icon: '🌤️' },
  { key: 'evening', label: 'Evening', count: 8, icon: '🌙' },
];

const timeSlots = {
  morning: [
    '07:00 AM', '07:30 AM', '08:00 AM', '08:30 AM',
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '12:00 PM',
  ],
  afternoon: [
    '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM',
    '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM',
    '04:30 PM', '05:00 PM', '05:30 PM', '06:00 PM',
  ],
  evening: [
    '06:30 PM', '07:00 PM', '07:30 PM', '08:00 PM',
    '08:30 PM', '09:00 PM', '09:30 PM', '10:00 PM',
  ],
};

const orange = '#E06D28';
const brown = '#3A312B';

const SlotBooking: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState('12');
  const [selectedSession, setSelectedSession] = useState('morning');
  const [selectedSlot, setSelectedSlot] = useState('');

  return (
    <div
      className="max-w-md bg-white rounded-[5px] "
      style={{ color: brown }}
    >
      {/* Date Row */}
      <div className="flex items-stretch gap-2 mb-2 pb-1">
        {/* Month Sidebar */}
        <div className="flex items-center justify-center px-3 py-2 bg-gray-50 border border-gray-200 rounded-[5px]">
          <span className="text-[11px] font-bold rotate-180 [writing-mode:vertical-lr] text-gray-500 uppercase tracking-tighter">MAR</span>
        </div>

        {dates.map((date) => (
          <button
            key={date.day}
            onClick={() => setSelectedDate(date.day)}
            className={`flex flex-col items-center justify-center min-w-[56px] py-1 px-1 rounded-[5px] border transition-all
              ${selectedDate === date.day 
                ? 'bg-orange-50 border-[#E06D28] text-[#E06D28]' 
                : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'}`}
          >
            <span className={`text-base font-bold leading-none mb-1 ${selectedDate === date.day ? 'text-[#3A312B]' : 'text-gray-700'}`}>
              {date.day}
            </span>
            <span className="text-[10px] font-semibold uppercase">{date.label}</span>
          </button>
        ))}
      </div>

      {/* Session Filter Pills */}
      <div className="flex bg-gray-100 p-1 rounded-[5px] gap-1 mb-1">
        {sessions.map((session) => (
          <button
            key={session.key}
            onClick={() => setSelectedSession(session.key)}
            className={`flex-1 flex items-center justify-center gap-1 py-1 px-1 rounded-[5px] text-[12px] font-bold transition-all
              ${selectedSession === session.key 
                ? 'bg-white text-[#E06D28] shadow-sm border border-transparent' 
                : 'text-gray-600 hover:text-gray-800'}`}
          >
            <span className="text-[13px]">{session.icon}</span>
            {session.label}
          </button>
        ))}
      </div>

      {/* Time Slot Grid */}
      <div className="grid grid-cols-4 gap-2 mb-1">
        {timeSlots[selectedSession as keyof typeof timeSlots].map((slot) => (
          <button
            key={slot}
            onClick={() => setSelectedSlot(slot)}
            className={`px-1 py-1 rounded-[5px] border text-[12px] font-bold transition-all
              ${selectedSlot === slot 
                ? 'bg-[#E06D28] text-white border-[#E06D28]' 
                : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'}`}
          >
            {slot}
          </button>
        ))}
      </div>

      {/* Confirm Button */}
      <button
        className={`w-full py-2 mt-2 rounded-[5px] font-bold text-[13px] shadow-md transition-all active:scale-[0.98]
          ${selectedSlot ? 'opacity-100 cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
        style={{ background: orange, color: 'white' }}
        disabled={!selectedSlot}
      >
        Confirm Booking
      </button>
    </div>
  );
};

export default SlotBooking;