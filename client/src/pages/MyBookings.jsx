import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { Calendar, Clock, MapPin, Trash2, LayoutDashboard, History, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MyBookings = () => {
  const { user } = useAuth();
  const { theme } = useTheme();

  const [bookings, setBookings] = useState([
    { id: 1, branch: "Downtown Arena", console: "PS5-04", date: "2024-04-28", time: "14:00 - 16:00", status: "upcoming", price: "$30" },
    { id: 2, branch: "Uptown Station", console: "PS5-01", date: "2024-04-25", time: "18:00 - 19:00", status: "completed", price: "$15" },
    { id: 3, branch: "Downtown Arena", console: "PS5-07", date: "2024-04-20", time: "20:00 - 22:00", status: "completed", price: "$30" },
  ]);

  const cancelBooking = (id) => {
    if (confirm("Are you sure you want to cancel this booking?")) {
      setBookings(bookings.filter(b => b.id !== id));
    }
  };

  return (
    <div className="pt-32 pb-20 container mx-auto px-6 max-w-6xl h-screen flex flex-col">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 flex-shrink-0">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 shadow-[0_0_20px_rgba(34,211,238,0.1)]">
            <LayoutDashboard className="w-8 h-8 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-5xl font-black italic tracking-tighter">MY <span className="text-cyan-400">RESERVATIONS</span></h1>
            <p className="text-neutral-500 font-mono text-sm uppercase tracking-widest mt-1">Status: {user?.displayName} Logged In</p>
          </div>
        </div>
        
        <div className="flex gap-4">
          <div className="glass-panel px-6 py-3 rounded-2xl flex items-center gap-3">
            <span className="text-sm font-bold text-neutral-400 uppercase tracking-widest">Active: 1</span>
          </div>
        </div>
      </div>

      {/* Internal Scrollable Container */}
      <div className="flex-1 glass-panel rounded-[2.5rem] border border-white/5 bg-white/[0.01] overflow-hidden flex flex-col mb-6">
        <div className="px-10 py-6 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-neutral-500">Live Booking Feed</h2>
          <History className="w-4 h-4 text-neutral-700" />
        </div>
        
        <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
          <AnimatePresence mode="popLayout">
            {bookings.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 0.3 }}
                className="h-full flex flex-col items-center justify-center text-center py-20"
              >
                <LayoutDashboard className="w-20 h-20 mb-4 opacity-20" />
                <p className="text-xl font-bold uppercase tracking-widest italic">The arena is empty</p>
              </motion.div>
            ) : (
              bookings.map((booking) => (
                <motion.div
                  key={booking.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="p-8 rounded-[2rem] border border-white/5 bg-black/40 hover:border-cyan-500/20 transition-all flex flex-col lg:flex-row items-center justify-between gap-8 group"
                >
                  <div className="flex flex-col lg:flex-row items-center gap-10">
                    <div className="text-center lg:text-left space-y-2">
                      <div className="flex items-center justify-center lg:justify-start gap-2">
                        <span className={`w-2 h-2 rounded-full ${booking.status === 'upcoming' ? 'bg-cyan-500 animate-pulse' : 'bg-neutral-600'}`} />
                        <span className={`text-[10px] font-black uppercase tracking-widest ${booking.status === 'upcoming' ? 'text-cyan-400' : 'text-neutral-500'}`}>
                          {booking.status}
                        </span>
                      </div>
                      <h3 className="text-3xl font-black italic">{booking.branch}</h3>
                      <div className="flex items-center justify-center lg:justify-start gap-2 text-neutral-500 font-mono text-xs uppercase">
                        <MapPin className="w-3 h-3" />
                        <span>Station: {booking.console}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-8 py-4 px-10 rounded-2xl bg-white/[0.02] border border-white/5 font-mono">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-[10px] font-black text-neutral-600 uppercase">
                          <Calendar className="w-3 h-3" /> Date
                        </div>
                        <div className="text-white text-sm">{booking.date}</div>
                      </div>
                      <div className="w-[1px] h-10 bg-white/5" />
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-[10px] font-black text-neutral-600 uppercase">
                          <Clock className="w-3 h-3" /> Slot
                        </div>
                        <div className="text-white text-sm">{booking.time}</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 w-full lg:w-auto justify-between lg:justify-end">
                    <div className="text-right">
                      <div className="text-[10px] font-black text-neutral-600 uppercase tracking-widest mb-1">Paid Amount</div>
                      <div className="text-2xl font-black text-white italic">{booking.price}</div>
                    </div>
                    {booking.status === 'upcoming' ? (
                      <button
                        onClick={() => cancelBooking(booking.id)}
                        className="w-14 h-14 rounded-2xl bg-red-500/10 text-red-500 border border-red-500/10 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-lg shadow-red-500/10"
                      >
                        <Trash2 className="w-6 h-6" />
                      </button>
                    ) : (
                      <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/10">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                    )}
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
