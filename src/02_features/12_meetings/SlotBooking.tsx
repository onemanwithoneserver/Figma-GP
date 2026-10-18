import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import CalendarMonthRounded from '@mui/icons-material/CalendarMonthRounded';
import AccessTimeRounded from '@mui/icons-material/AccessTimeRounded';
import CheckCircleRounded from '@mui/icons-material/CheckCircleRounded';
import LocationOnRounded from '@mui/icons-material/LocationOnRounded';
import DirectionsCarOutlined from '@mui/icons-material/DirectionsCarOutlined';
import VideocamOutlined from '@mui/icons-material/VideocamOutlined';
import RestartAltRounded from '@mui/icons-material/RestartAltRounded';
import EventAvailableRounded from '@mui/icons-material/EventAvailableRounded';

interface SlotBookingProps {
  meetType?: string;
}

interface DateItem {
  day: string;
  label: string;
  weekday: string;
  fullDate: string;
}

const DATES: DateItem[] = [
  { day: '11', label: 'Today', weekday: 'Wed', fullDate: 'Wednesday, 11 Mar 2026' },
  { day: '12', label: 'Thu',   weekday: 'Thu', fullDate: 'Thursday, 12 Mar 2026' },
  { day: '13', label: 'Fri',   weekday: 'Fri', fullDate: 'Friday, 13 Mar 2026' },
  { day: '14', label: 'Sat',   weekday: 'Sat', fullDate: 'Saturday, 14 Mar 2026' },
  { day: '15', label: 'Sun',   weekday: 'Sun', fullDate: 'Sunday, 15 Mar 2026' },
  { day: '16', label: 'Mon',   weekday: 'Mon', fullDate: 'Monday, 16 Mar 2026' },
  { day: '17', label: 'Tue',   weekday: 'Tue', fullDate: 'Tuesday, 17 Mar 2026' },
];

const SESSIONS = [
  { key: 'morning',   label: 'Morning',   count: 11, icon: '🌅', timeRange: '07:00 AM – 12:00 PM' },
  { key: 'afternoon', label: 'Afternoon', count: 12, icon: '🌤️', timeRange: '12:30 PM – 06:00 PM' },
  { key: 'evening',   label: 'Evening',   count: 8,  icon: '🌙', timeRange: '06:30 PM – 10:00 PM' },
] as const;

type SessionKey = typeof SESSIONS[number]['key'];

const TIME_SLOTS: Record<SessionKey, string[]> = {
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

const FAST_FILLING = new Set(['10:00 AM', '11:00 AM', '04:30 PM', '07:00 PM']);

const SlotBooking: React.FC<SlotBookingProps> = ({ meetType = 'direct-site-visit' }) => {
  const [selectedDay, setSelectedDay] = useState('12');
  const [selectedSession, setSelectedSession] = useState<SessionKey>('morning');
  const [selectedSlot, setSelectedSlot] = useState('10:00 AM');
  const [isBooked, setIsBooked] = useState(false);
  const [calendarAdded, setCalendarAdded] = useState(false);

  const isOnline = meetType === 'online-visit';
  const currentDateObj = DATES.find(d => d.day === selectedDay) || DATES[1];
  const activeSessionObj = SESSIONS.find(s => s.key === selectedSession) || SESSIONS[0];

  const handleConfirm = () => {
    if (!selectedSlot) return;
    setIsBooked(true);
    setCalendarAdded(false);
  };

  const handleReset = () => {
    setIsBooked(false);
    setCalendarAdded(false);
  };

  return (
    <div className="w-full text-[#3A312B]">
      <AnimatePresence mode="wait">
        {!isBooked ? (
          <motion.div
            key="slot-selection"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-3"
          >
            <div className="bg-surface-soft/80 border border-outline/70 rounded-control p-2.5">
              <div className="flex items-center justify-between mb-2 px-1">
                <span className="flex items-center gap-1.5 text-[12px] font-bold text-ink uppercase tracking-wider">
                  <CalendarMonthRounded className="text-brand-warm" style={{ fontSize: 16 }} />
                  March 2026
                </span>
                <span className="text-[11px] font-medium text-ink-subtle">
                  Select preferred date
                </span>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
                {DATES.map((date) => {
                  const isSelected = selectedDay === date.day;
                  const isToday = date.label === 'Today';

                  return (
                    <motion.button
                      key={date.day}
                      type="button"
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setSelectedDay(date.day)}
                      className={`relative flex flex-col items-center justify-center min-w-[58px] py-1.5 px-2 rounded-control border transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'bg-gradient-to-b from-[#F85B01] to-[#E76F26] text-white border-transparent shadow-md shadow-brand/25 ring-2 ring-brand-warm/30'
                          : 'bg-white border-outline/80 text-ink-muted hover:border-brand-warm/60 hover:text-ink'
                      }`}
                    >
                      <span className={`text-[10px] font-semibold tracking-tight uppercase ${isSelected ? 'text-white/90' : isToday ? 'text-brand-warm font-bold' : 'text-ink-subtle'}`}>
                        {date.label}
                      </span>
                      <span className={`text-[17px] font-extrabold leading-tight mt-0.5 ${isSelected ? 'text-white' : 'text-ink'}`}>
                        {date.day}
                      </span>
                      {isSelected && (
                        <motion.span
                          layoutId="active-date-dot"
                          className="w-1.5 h-1.5 rounded-full bg-white mt-1 shadow-sm"
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5 px-1">
                <span className="text-[12px] font-bold text-ink flex items-center gap-1">
                  <AccessTimeRounded className="text-brand-warm" style={{ fontSize: 15 }} />
                  Time of Day
                </span>
                <span className="text-[11px] text-ink-subtle font-medium">
                  {activeSessionObj.timeRange}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-1.5 bg-surface-muted/60 p-1 rounded-control border border-outline/50">
                {SESSIONS.map((session) => {
                  const isSelected = selectedSession === session.key;
                  return (
                    <motion.button
                      key={session.key}
                      type="button"
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setSelectedSession(session.key);
                        const slots = TIME_SLOTS[session.key];
                        if (!slots.includes(selectedSlot)) {
                          setSelectedSlot(slots[0]);
                        }
                      }}
                      className={`relative flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-chip text-[12px] font-bold transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'bg-white text-brand shadow-sm border border-black/5'
                          : 'text-ink-muted hover:text-ink hover:bg-white/50'
                      }`}
                    >
                      <span className="text-[13px]">{session.icon}</span>
                      <span>{session.label}</span>
                      <span className={`text-[10px] px-1 py-0.2 rounded-full font-semibold ${
                        isSelected ? 'bg-orange-100 text-brand-dark' : 'bg-black/5 text-ink-subtle'
                      }`}>
                        {session.count}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5">
                {TIME_SLOTS[selectedSession].map((slot) => {
                  const isSelected = selectedSlot === slot;
                  const isFast = FAST_FILLING.has(slot);

                  return (
                    <motion.button
                      key={slot}
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setSelectedSlot(slot)}
                      className={`relative flex flex-col items-center justify-center py-2 px-1 rounded-control text-[12px] font-bold border transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'bg-gradient-to-r from-[#F85B01] to-[#E76F26] text-white border-brand-warm shadow-sm shadow-brand/20'
                          : 'bg-white border-outline/80 text-ink hover:border-brand-warm/60 hover:bg-orange-50/30'
                      }`}
                    >
                      <span>{slot}</span>
                      {isFast && !isSelected && (
                        <span className="text-[9px] font-semibold text-amber-700 tracking-tight">
                          Fast filling
                        </span>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center justify-between px-3 py-1.5 rounded-control bg-amber-50/50 border border-amber-100/70 text-[11px] text-amber-950 font-medium">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
                <span>Selected:</span>
                <strong className="font-bold text-ink">{currentDateObj.fullDate}</strong>
                <span>at</span>
                <strong className="font-bold text-brand-warm">{selectedSlot || 'None'}</strong>
              </span>
              <span className="text-[10px] uppercase font-bold text-brand tracking-wider">
                {isOnline ? 'Online' : 'Site Visit'}
              </span>
            </div>

            <div className="flex justify-center items-center pt-1 pb-1">
              <motion.button
                type="button"
                whileHover={selectedSlot ? { scale: 1.03, y: -1 } : undefined}
                whileTap={selectedSlot ? { scale: 0.97 } : undefined}
                onClick={handleConfirm}
                disabled={!selectedSlot}
                className={`relative flex items-center justify-center gap-2 w-auto min-w-[210px] max-w-[260px] px-8 py-2.5 rounded-full font-bold text-[13px] tracking-wide transition-all duration-200 shadow-md ${
                  selectedSlot
                    ? 'bg-gradient-to-r from-[#F85B01] via-[#FF7A1A] to-[#E76F26] text-white shadow-brand/25 hover:shadow-brand/40 cursor-pointer'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                }`}
              >
                <EventAvailableRounded style={{ fontSize: 18 }} />
                <span>Confirm Booking</span>
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="booking-success"
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: -12 }}
            transition={{ type: 'spring', stiffness: 320, damping: 24 }}
            className="flex flex-col items-center p-3 sm:p-4 rounded-control bg-gradient-to-b from-white via-orange-50/30 to-white border border-brand-warm/30 shadow-lg shadow-black/5"
          >
            <div className="relative mb-3 flex items-center justify-center">
              <span className="absolute -inset-2 rounded-full bg-emerald-500/20 pulse-ring pointer-events-none" />
              <motion.div
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.1 }}
                className="w-13 h-13 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/30"
              >
                <CheckCircleRounded style={{ fontSize: 36 }} />
              </motion.div>
            </div>

            <motion.h4
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="font-extrabold text-[18px] text-ink text-center tracking-tight"
            >
              Visit Slot Reserved! 🎉
            </motion.h4>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-[12px] text-ink-muted text-center max-w-xs mt-0.5 mb-3"
            >
              Instant confirmation has been sent to your WhatsApp and registered email.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="w-full max-w-sm rounded-control bg-white border border-outline/80 p-3.5 shadow-sm relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand via-brand-warm to-amber-500" />

              <div className="flex items-center justify-between border-b border-outline/50 pb-2 mb-2.5">
                <div>
                  <span className="text-[10px] font-bold text-ink-subtle uppercase tracking-wider block">
                    Pass Reference
                  </span>
                  <span className="text-[13px] font-mono font-bold text-ink">
                    #VSK-2026-{selectedDay}M
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  CONFIRMED
                </span>
              </div>

              <div className="space-y-2 text-[12px]">
                <div className="flex items-start gap-2">
                  <span className="text-brand flex-shrink-0 mt-0.5">
                    {isOnline ? <VideocamOutlined style={{ fontSize: 16 }} /> : <LocationOnRounded style={{ fontSize: 16 }} />}
                  </span>
                  <div className="flex-1">
                    <span className="font-semibold text-ink block leading-tight">
                      {isOnline ? 'Online 1-on-1 Virtual Meet' : 'Vasavi Skyla · Site Visit & Sample Flat'}
                    </span>
                    <span className="text-[11px] text-ink-subtle">
                      {isOnline ? 'Google Meet link sent via WhatsApp' : 'Financial District, Nanakramguda, Hyderabad'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1 border-t border-outline/40">
                  <CalendarMonthRounded className="text-brand-warm flex-shrink-0" style={{ fontSize: 16 }} />
                  <span className="font-semibold text-ink">{currentDateObj.fullDate}</span>
                  <span className="text-ink-subtle">·</span>
                  <span className="font-extrabold text-brand-dark">{selectedSlot}</span>
                </div>

                <div className="flex items-center gap-2 pt-1 border-t border-outline/40">
                  {isOnline ? (
                    <VideocamOutlined className="text-blue-600 flex-shrink-0" style={{ fontSize: 16 }} />
                  ) : (
                    <DirectionsCarOutlined className="text-amber-600 flex-shrink-0" style={{ fontSize: 16 }} />
                  )}
                  <span className="text-[11px] text-ink-muted">
                    {isOnline
                      ? 'Meeting coordinator: Senior Architect Ananya Sharma'
                      : 'Free chauffeur pickup & drop scheduled'}
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="flex items-center gap-2.5 mt-3.5"
            >
              <button
                type="button"
                onClick={() => setCalendarAdded(true)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[12px] font-bold border transition-all duration-200 cursor-pointer ${
                  calendarAdded
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                    : 'bg-white text-ink border-outline hover:border-brand-warm hover:text-brand'
                }`}
              >
                <CalendarMonthRounded style={{ fontSize: 16 }} />
                <span>{calendarAdded ? 'Added to Calendar ✓' : 'Add to Calendar'}</span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-[12px] font-bold bg-surface-muted text-ink-muted border border-outline/60 hover:text-ink hover:bg-white transition-all duration-200 cursor-pointer"
              >
                <RestartAltRounded style={{ fontSize: 16 }} />
                <span>Change Slot</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SlotBooking;