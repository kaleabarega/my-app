import React from 'react';
import { motion, useTransform } from 'framer-motion';
import { CalendarClock, CheckCircle } from 'lucide-react';

export default function DashboardSection({ scrollYProgress }) {
  const opacity = useTransform(scrollYProgress, [0.60, 0.66, 0.76, 0.83], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0.60, 0.66], [100, 0]);
  const scale = useTransform(scrollYProgress, [0.76, 0.83], [1, 0.95]);
  const pointerEvents = useTransform(scrollYProgress, v => v > 0.62 && v < 0.81 ? "auto" : "none");

  const bookings = [
    { id: 1, title: 'PS5 Console - Pro Session', date: 'Nov 24, 2026', time: '02:00 PM', status: 'Upcoming', active: true },
    { id: 2, title: 'PS5 Console - Standard', date: 'Nov 15, 2026', time: '06:00 PM', status: 'Completed', active: false },
    { id: 3, title: 'PS5 Console - Group (4)', date: 'Nov 10, 2026', time: '08:00 PM', status: 'Completed', active: false }
  ];

  return (
    <motion.section
      style={{ opacity, y, scale, pointerEvents }}
      className="absolute inset-0 z-50 bg-[#05050a] flex flex-col items-center justify-center px-6 lg:px-12 w-full"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.05)_0%,_transparent_70%)] z-0 pointer-events-none"></div>
      <div className="relative z-10 w-full max-w-4xl h-full flex flex-col pt-24 sm:pt-32 pb-20 sm:pb-24">
        <div className="mb-6 sm:mb-10 text-center sm:text-left border-b border-white/10 pb-4 sm:pb-6 shrink-0">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight uppercase text-white mb-2">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.4)]">Bookings</span>
          </h2>
          <p className="text-gray-400">Manage your upcoming sessions and history</p>
        </div>
        <div className="flex flex-col gap-3 sm:gap-4 overflow-y-auto pr-2 sm:pr-4 max-h-[50vh] sm:max-h-[60vh]">
          {bookings.map(booking => (
            <div key={booking.id} className="group relative bg-[#05050a]/80 backdrop-blur-md border border-white/10 p-5 sm:p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all duration-300 hover:bg-white/5 hover:border-white/20 hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(59,130,246,0.2)] shrink-0">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${booking.active ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.2)]' : 'bg-white/5 text-gray-500 border border-white/10'}`}>
                  {booking.active ? <CalendarClock className="w-6 h-6" /> : <CheckCircle className="w-6 h-6" />}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">{booking.title}</h4>
                  <div className="text-sm text-gray-400 flex items-center gap-2 mt-1">
                    <span>{booking.date}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                    <span>{booking.time}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${booking.active ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-gray-500/10 text-gray-500 border border-gray-500/20'}`}>
                  {booking.status}
                </span>
                {booking.active && (
                  <button className="px-4 py-2 text-sm font-semibold text-white bg-white/10 rounded-lg hover:bg-white/20 transition-colors border border-white/10">Manage</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
