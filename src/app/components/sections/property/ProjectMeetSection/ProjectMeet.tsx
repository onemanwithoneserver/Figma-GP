import React, { useState } from 'react';

const dates = [
  { day: '11', label: 'Today', isToday: true },
  { day: '12', label: 'Thu' },
  { day: '13', label: 'Fri' },
  { day: '14', label: 'Sat' },
  { day: '15', label: 'Sun' },
  { day: '16', label: 'Mon' },
  { day: '17', label: 'Tue' },
];

const sessions = [
  { key: 'morning', label: 'Morning', count: 11, icon: '🌤️' },
  { key: 'afternoon', label: 'Afternoon', count: 12, icon: '☀️' },
  { key: 'evening', label: 'Evening', count: 8, icon: '🌙' },
];

const timeSlots: Record<string, string[]> = {
  morning: [
    '07:00 AM', '07:30 AM', '08:00 AM', '08:30 AM',
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '12:00 PM',
  ],
  afternoon: ['12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM'],
  evening: ['06:30 PM', '07:00 PM', '07:30 PM'],
};

const ProjectMeetSection: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState('12');
  const [selectedSession, setSelectedSession] = useState('morning');
  const [selectedSlot, setSelectedSlot] = useState('07:00 AM');

  return (
    <div className="max-w-md mx-auto p-4 bg-white font-sans text-[#333]">
      <h2 className="text-lg font-bold mb-4">Pick a Date</h2>

      {/* Date Picker Row */}
      <div className="flex items-stretch gap-2 mb-6 overflow-x-auto pb-2 no-scrollbar">
        {/* Month Sidebar */}
        <div className="flex items-center justify-center px-2 py-2 bg-gray-50 border border-gray-100 rounded-xl">
          <span className="text-[10px] font-bold rotate-180 [writing-mode:vertical-lr] text-gray-500">MAR</span>
        </div>

        {dates.map((date) => (
          <button
            key={date.day}
            onClick={() => setSelectedDate(date.day)}
            className={`flex flex-col items-center justify-center min-w-[65px] py-3 rounded-2xl border transition-all
              ${selectedDate === date.day 
                ? 'bg-[#E6F2F0] border-[#4D9686] text-[#4D9686]' 
                : 'bg-white border-gray-100 text-gray-400'}`}
          >
            <span className={`text-lg font-bold ${selectedDate === date.day ? 'text-[#333]' : 'text-gray-300'}`}>
              {date.day}
            </span>
            <span className="text-xs font-medium">{date.label}</span>
          </button>
        ))}
      </div>

      {/* Session Filter Pills */}
      <div className="flex bg-gray-50 p-1.5 rounded-2xl gap-1 mb-6">
        {sessions.map((session) => (
          <button
            key={session.key}
            onClick={() => setSelectedSession(session.key)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all
              ${selectedSession === session.key 
                ? 'bg-white text-[#4D9686] shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'}`}
          >
            <span className="text-base">{session.icon}</span>
            {session.label} <span className="text-gray-400 font-normal">({session.count})</span>
          </button>
        ))}
      </div>

      {/* Time Slot Grid */}
      <div className="grid grid-cols-4 gap-3 mb-8">
        {timeSlots[selectedSession].map((slot) => (
          <button
            key={slot}
            onClick={() => setSelectedSlot(slot)}
            className={`py-3 px-1 rounded-xl border text-[13px] font-bold transition-all
              ${selectedSlot === slot 
                ? 'border-[#4D9686] bg-white text-[#333] ring-1 ring-[#4D9686]' 
                : 'border-gray-100 text-[#333] hover:border-gray-200'}`}
          >
            {slot}
          </button>
        ))}
      </div>

      {/* Confirm Button */}
      <button
        className="w-full py-4 rounded-xl bg-[#4D9686] text-white font-bold text-base shadow-lg shadow-[#4d968633] active:scale-[0.98] transition-transform"
      >
        Confirm Booking
      </button>
    </div>
  );
};

export default ProjectMeetSection;