import React, { useState } from 'react';
import { motion, useTransform } from 'framer-motion';
import { Clock } from 'lucide-react';

export default function BookingSection({ scrollYProgress }) {
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedStartTime, setSelectedStartTime] = useState('');
  const [selectedEndTime, setSelectedEndTime] = useState('');

  const opacity = useTransform(scrollYProgress, [0.43, 0.50, 0.60, 0.66], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0.43, 0.50], [100, 0]);
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

  return (
    <motion.section 
      style={{ opacity, y, scale, pointerEvents }}
      className="absolute inset-0 z-40 bg-[#05050a] flex items-start justify-center px-4 sm:px-6 lg:px-12 py-16 sm:py-24 overflow-y-auto"
    >
       {/* 2-Column Split Layout */}
       <div className="flex flex-col lg:flex-row gap-4 sm:gap-8 w-full max-w-5xl h-auto overflow-y-auto lg:overflow-visible scrollbar-thin pb-32 lg:pb-0">
          
          {/* Left: Booking Flow */}
          <div className="flex-1 flex flex-col gap-4 sm:gap-6 mt-4 lg:mt-0 px-2 sm:px-0">
             {/* Calendar */}
             <div className="bg-[#05050a]/80 backdrop-blur-md border border-white/10 p-4 sm:p-6 lg:p-8 rounded-2xl w-full">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2">
                  <span className="w-2 h-5 sm:h-6 bg-purple-500 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]"></span>
                  Select Date
                </h3>
                <div className="grid grid-cols-7 gap-1 sm:gap-2">
                   {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                     <div key={d} className="text-center text-[10px] sm:text-xs font-semibold text-gray-500 uppercase pb-1 sm:pb-2">{d}</div>
                   ))}
                   {days.map(d => {
                     const isAvailable = d % 3 !== 0;
                     const isSelected = selectedDay === d;
                     return (
                       <button 
                         key={d}
                         disabled={!isAvailable}
                         onClick={() => setSelectedDay(d)}
                         className={`p-1.5 sm:p-3 rounded-md sm:rounded-lg text-xs sm:text-sm font-medium transition-all duration-300
                           ${!isAvailable ? 'text-gray-600 cursor-not-allowed opacity-30 bg-white/5' : 
                             isSelected ? 'bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)] border-purple-400' : 
                             'bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-purple-500/50'}`}
                       >
                         {d}
                       </button>
                     )
                   })}
                </div>
             </div>

             {/* Time Range Selector */}
             <div className="bg-[#05050a]/80 backdrop-blur-md border border-white/10 p-4 sm:p-6 lg:p-8 rounded-2xl w-full">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2">
                  <span className="w-2 h-5 sm:h-6 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"></span>
                  Select Time Range
                </h3>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Start Time</label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="time"
                        value={selectedStartTime}
                        onChange={(e) => setSelectedStartTime(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
                      />
                    </div>
                  </div>
                  <div className="flex-1 relative">
                    <label className="block text-sm font-medium text-gray-300 mb-2">End Time</label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="time"
                        value={selectedEndTime}
                        onChange={(e) => setSelectedEndTime(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
                      />
                    </div>
                  </div>
                </div>
                {selectedStartTime && selectedEndTime && !isValidRange && (
                  <p className="text-red-400 text-sm mt-2">End time must be after start time.</p>
                )}
                {duration && isValidRange && (
                  <p className="text-blue-400 text-sm mt-2">{duration} hour{duration !== 1 ? 's' : ''} selected</p>
                )}
             </div>
          </div>

          {/* Right: Summary Sticky Panel */}
          <div className="fixed bottom-0 left-0 w-full lg:relative lg:w-[380px] shrink-0 z-50 lg:z-auto">
             <div className="bg-[#05050a]/95 lg:bg-[#05050a]/90 backdrop-blur-xl border-t lg:border border-white/10 p-4 sm:p-6 lg:p-8 rounded-t-2xl lg:rounded-2xl lg:sticky lg:top-1/2 lg:-translate-y-1/2 shadow-[0_-10px_40px_rgba(0,0,0,0.8)] lg:shadow-[0_0_40px_rgba(0,0,0,0.5)] flex flex-col">
               <h3 className="text-base sm:text-xl font-bold text-white mb-3 sm:mb-6 border-b border-white/10 pb-2 sm:pb-4 uppercase tracking-wider hidden lg:block">Booking Summary</h3>
               
               <div className="flex flex-row lg:flex-col gap-2 lg:gap-5 mb-4 lg:mb-8 text-xs sm:text-sm lg:text-base justify-between lg:justify-start">
                 <div className="hidden lg:flex justify-between items-center">
                   <span className="text-gray-400">Experience</span>
                   <span className="font-semibold text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full">PC Arena</span>
                 </div>
                 <div className="hidden lg:flex justify-between items-center">
                   <span className="text-gray-400">Setup</span>
                   <span className="font-semibold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full">Pro Setup</span>
                 </div>
                 <div className="flex flex-col lg:flex-row lg:justify-between items-start lg:items-center">
                   <span className="text-gray-400 hidden lg:block">Date</span>
                   <span className="font-semibold text-white">{selectedDay ? `Oct ${selectedDay}` : 'No date'}</span>
                 </div>
                 <div className="flex flex-col lg:flex-row lg:justify-between items-start lg:items-center">
                   <span className="text-gray-400 hidden lg:block">Time</span>
                   <span className="font-semibold text-white">
                     {selectedStartTime && selectedEndTime ? `${selectedStartTime} - ${selectedEndTime}` : 'No time range'}
                   </span>
                 </div>
                 <div className="lg:border-t border-white/10 lg:pt-6 lg:mt-2 flex flex-col lg:flex-row lg:justify-between items-end">
                   <span className="text-gray-400 font-medium hidden lg:block">Total Price</span>
                   <span className="text-xl sm:text-2xl lg:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">$15</span>
                 </div>
               </div>

               <button 
                 disabled={!selectedDay || !selectedStartTime || !selectedEndTime || !isValidRange}
                 className={`w-full py-3 sm:py-4 rounded-xl font-bold text-white transition-all duration-300 tracking-wide text-sm sm:text-base
                   ${selectedDay && selectedStartTime && selectedEndTime && isValidRange
                     ? 'bg-gradient-to-r from-purple-500 to-blue-500 shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)]' 
                     : 'bg-white/5 border border-white/10 text-gray-500 cursor-not-allowed'}`}
               >
                 Confirm Booking
               </button>
             </div>
          </div>

       </div>
    </motion.section>
  );
}
