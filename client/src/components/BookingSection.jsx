import React, { useState } from 'react';
import { motion, useTransform } from 'framer-motion';
import { Clock, Gamepad2, CalendarDays, CheckCircle2 } from 'lucide-react';

export default function BookingSection({ scrollYProgress }) {
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedStartTime, setSelectedStartTime] = useState('');
  const [selectedEndTime, setSelectedEndTime] = useState('');

  const opacity = useTransform(scrollYProgress, [0.43, 0.50, 0.60, 0.66], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0.43, 0.50], [80, 0]);
  const scale = useTransform(scrollYProgress, [0.60, 0.66], [1, 0.95]);
  const pointerEvents = useTransform(scrollYProgress, v => v > 0.45 && v < 0.64 ? "auto" : "none");

  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  const calculateDuration = () => {
    if (!selectedStartTime || !selectedEndTime) return null;
    const start = new Date(`1970-01-01T${selectedStartTime}:00`);
    const end = new Date(`1970-01-01T${selectedEndTime}:00`);
    const diffMs = end - start;
    const diffHours = diffMs / (1000 * 60 * 60);
    return diffHours > 0 ? diffHours : null;
  };

  const duration = calculateDuration();
  const isValidRange = duration && duration > 0;
  const totalPrice = duration ? (duration * 8).toFixed(0) : null; // $8/hr PS5

  const isComplete = selectedDay && selectedStartTime && selectedEndTime && isValidRange;

  return (
    <motion.section
      style={{ opacity, y, scale, pointerEvents }}
      className="absolute inset-0 z-40 bg-[#05050a] flex items-start justify-center px-3 sm:px-6 lg:px-12 pt-20 sm:pt-24 pb-32 sm:pb-40 overflow-y-auto"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,_rgba(168,85,247,0.05)_0%,_transparent_70%)] pointer-events-none" />

      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 w-full max-w-5xl">

        {/* Left Column */}
        <div className="flex-1 flex flex-col gap-4 sm:gap-5">

          {/* Section Header */}
          <div className="flex items-center gap-3 px-1">
            <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
              <Gamepad2 className="w-4 h-4 text-purple-400" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">Book a Station</h2>
              <p className="text-xs text-gray-500 font-medium">PS5 Console · $8/hr</p>
            </div>
          </div>

          {/* Calendar */}
          <div className="bg-white/[0.02] backdrop-blur-md border border-white/10 p-4 sm:p-6 rounded-2xl">
            <h3 className="text-sm sm:text-base font-bold text-white mb-4 flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-purple-400" />
              Select Date
            </h3>
            <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                <div key={d} className="text-center text-[9px] sm:text-xs font-bold text-gray-600 uppercase pb-1.5">{d}</div>
              ))}
              {days.map(d => {
                const isAvailable = d % 3 !== 0;
                const isSelected = selectedDay === d;
                return (
                  <button
                    key={d}
                    disabled={!isAvailable}
                    onClick={() => setSelectedDay(d)}
                    className={`aspect-square flex items-center justify-center rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200
                      ${!isAvailable
                        ? 'text-gray-700 cursor-not-allowed opacity-40 bg-white/[0.015]'
                        : isSelected
                          ? 'bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)] scale-105'
                          : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white hover:scale-105 cursor-pointer'
                      }`}
                  >
                    {d}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time Range */}
          <div className="bg-white/[0.02] backdrop-blur-md border border-white/10 p-4 sm:p-6 rounded-2xl">
            <h3 className="text-sm sm:text-base font-bold text-white mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-400" />
              Select Time Range
            </h3>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="flex-1">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Start</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-600 pointer-events-none" />
                  <input
                    type="time"
                    value={selectedStartTime}
                    onChange={(e) => setSelectedStartTime(e.target.value)}
                    className="w-full pl-9 pr-3 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40 transition-all [color-scheme:dark]"
                  />
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">End</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-600 pointer-events-none" />
                  <input
                    type="time"
                    value={selectedEndTime}
                    onChange={(e) => setSelectedEndTime(e.target.value)}
                    className="w-full pl-9 pr-3 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40 transition-all [color-scheme:dark]"
                  />
                </div>
              </div>
            </div>
            {selectedStartTime && selectedEndTime && !isValidRange && (
              <p className="text-red-400 text-xs font-medium mt-3 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                End time must be after start time.
              </p>
            )}
            {isValidRange && (
              <p className="text-cyan-400 text-xs font-medium mt-3 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                {duration} hour{duration !== 1 ? 's' : ''} selected
              </p>
            )}
          </div>
        </div>

        {/* Right: Summary Panel */}
        <div className="w-full lg:w-[340px] shrink-0">
          {/* Mobile: fixed bottom strip — Desktop: sticky card */}
          <div className="fixed bottom-0 left-0 w-full lg:relative lg:w-full lg:sticky lg:top-24 bg-[#0a0a14]/95 lg:bg-white/[0.02] backdrop-blur-xl border-t lg:border border-white/10 rounded-t-2xl lg:rounded-2xl p-4 sm:p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.7)] lg:shadow-none z-50 lg:z-auto">

            <h3 className="hidden lg:block text-sm font-black text-gray-400 uppercase tracking-widest mb-6 pb-4 border-b border-white/10">
              Booking Summary
            </h3>

            {/* Summary rows */}
            <div className="flex flex-row lg:flex-col gap-3 sm:gap-4 lg:gap-5 mb-4 lg:mb-6">
              <div className="hidden lg:flex justify-between items-center">
                <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Setup</span>
                <span className="text-sm font-bold text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">PS5 Console</span>
              </div>

              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-0.5 lg:gap-0">
                <span className="text-[10px] sm:text-xs text-gray-500 font-semibold uppercase tracking-wider">Date</span>
                <span className="text-sm font-bold text-white">{selectedDay ? `Nov ${selectedDay}` : <span className="text-gray-600">—</span>}</span>
              </div>

              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-0.5 lg:gap-0">
                <span className="text-[10px] sm:text-xs text-gray-500 font-semibold uppercase tracking-wider">Time</span>
                <span className="text-sm font-bold text-white">
                  {selectedStartTime && selectedEndTime && isValidRange
                    ? `${selectedStartTime} – ${selectedEndTime}`
                    : <span className="text-gray-600">—</span>}
                </span>
              </div>

              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-0.5 lg:gap-0 lg:pt-5 lg:mt-2 lg:border-t lg:border-white/10">
                <span className="text-[10px] sm:text-xs text-gray-500 font-semibold uppercase tracking-wider lg:mt-0">Total</span>
                <span className="text-xl sm:text-2xl lg:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                  {totalPrice ? `$${totalPrice}` : '$—'}
                </span>
              </div>
            </div>

            <button
              disabled={!isComplete}
              className={`w-full py-3 sm:py-4 rounded-xl font-black text-sm sm:text-base tracking-wide transition-all duration-300
                ${isComplete
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-[0_0_25px_rgba(168,85,247,0.4)] hover:shadow-[0_0_35px_rgba(168,85,247,0.6)] hover:scale-[1.02] active:scale-[0.98]'
                  : 'bg-white/5 border border-white/10 text-gray-600 cursor-not-allowed'
                }`}
            >
              {isComplete ? 'Confirm Booking' : 'Fill all details'}
            </button>
          </div>
        </div>

      </div>
    </motion.section>
  );
}
