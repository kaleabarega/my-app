import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { Calendar, Clock, ArrowRight, ShieldCheck, MapPin, Zap, Monitor, Info } from "lucide-react";
import { motion } from "framer-motion";

const Booking = () => {
  const { branchId, consoleId } = useParams();
  const { theme } = useTheme();
  const { user, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Booking confirmed! Welcome to the Arena.");
    navigate("/my-bookings");
  };

  return (
    <div className="pt-32 pb-32 container mx-auto px-6 max-w-7xl">
      <div className="flex flex-col lg:flex-row gap-12 items-start">
        {/* Left Side: Form */}
        <div className="flex-1 w-full space-y-12">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-[2rem] bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shadow-[0_0_30px_rgba(34,211,238,0.1)]">
              <Zap className="w-10 h-10 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-5xl font-black italic uppercase tracking-tighter">SECURE <span className="text-cyan-400">STATION</span></h1>
              <div className="flex items-center gap-2 text-neutral-500 font-mono text-xs uppercase mt-1">
                <MapPin className="w-3 h-3" /> Branch #{branchId} • <Monitor className="w-3 h-3" /> Station {consoleId}
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-[3rem] p-10 lg:p-16 border border-white/5 relative overflow-hidden bg-white/[0.01]">
            {!user ? (
              <div className="text-center py-12 space-y-8">
                <div className="mx-auto w-20 h-20 rounded-full bg-amber-500/10 flex items-center justify-center">
                  <Info className="w-10 h-10 text-amber-500" />
                </div>
                <div className="space-y-4">
                  <h2 className="text-3xl font-black italic">AUTHENTICATION REQUIRED</h2>
                  <p className="text-neutral-500 max-w-sm mx-auto">Please sign in to your Gamers Dan account to complete this reservation.</p>
                </div>
                <button 
                  onClick={loginWithGoogle}
                  className="px-10 py-4 rounded-2xl bg-white text-black font-black hover:bg-cyan-400 transition-all"
                >
                  SIGN IN WITH GOOGLE
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-12">
                <div className="grid md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.3em] flex items-center gap-2 ml-2">
                      <Calendar className="w-3 h-3" /> Select Day
                    </label>
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full p-6 rounded-3xl bg-black/60 border border-white/10 focus:border-cyan-500/50 outline-none transition-all font-mono text-white text-lg"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.3em] flex items-center gap-2 ml-2">
                        <Clock className="w-3 h-3" /> From
                      </label>
                      <input
                        type="time"
                        required
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="w-full p-6 rounded-3xl bg-black/60 border border-white/10 focus:border-cyan-500/50 outline-none transition-all font-mono text-white text-lg"
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.3em] flex items-center gap-2 ml-2">
                        <Clock className="w-3 h-3" /> To
                      </label>
                      <input
                        type="time"
                        required
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        className="w-full p-6 rounded-3xl bg-black/60 border border-white/10 focus:border-cyan-500/50 outline-none transition-all font-mono text-white text-lg"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-8 rounded-[2rem] bg-cyan-500/5 border border-cyan-500/10 flex items-start gap-6">
                  <ShieldCheck className="w-8 h-8 text-cyan-400 mt-1" />
                  <div className="space-y-2">
                    <h4 className="font-black italic uppercase text-lg text-white">Station Policy</h4>
                    <p className="text-neutral-500 text-sm leading-relaxed">Your station includes a DualSense Edge controller and a 27" 4K OLED monitor. Please arrive 5 minutes early for check-in.</p>
                  </div>
                </div>

                <button type="submit" className="hidden lg:flex w-full py-6 rounded-[2rem] bg-cyan-500 text-black font-black text-xl items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_50px_rgba(34,211,238,0.3)]">
                  CONFIRM RESERVATION <ArrowRight className="w-6 h-6" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Right Side: Sticky Summary */}
        <aside className="hidden lg:block w-[400px] sticky top-32">
          <div className="glass-panel rounded-[3rem] p-10 border border-white/10 space-y-8 bg-black/60 backdrop-blur-3xl">
            <h3 className="text-2xl font-black italic tracking-tighter border-b border-white/5 pb-6">SUMMARY</h3>
            <div className="space-y-6 font-mono text-sm uppercase">
              <div className="flex justify-between">
                <span className="text-neutral-500">Rate</span>
                <span className="text-white">$15.00/hr</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Duration</span>
                <span className="text-white">{startTime && endTime ? '2 Hours' : '--'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Tax</span>
                <span className="text-white">$1.20</span>
              </div>
              <div className="h-[1px] bg-white/5" />
              <div className="flex justify-between items-baseline pt-4">
                <span className="text-neutral-500 font-sans font-black italic text-xl">TOTAL</span>
                <span className="text-4xl font-black text-cyan-400 italic">$31.20</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile Sticky Footer Summary */}
        <div className="lg:hidden fixed bottom-0 left-0 w-full p-6 z-[200] backdrop-blur-2xl bg-black/80 border-t border-white/10">
          <div className="flex items-center justify-between gap-6">
            <div>
              <div className="text-[10px] font-black text-neutral-500 uppercase tracking-widest mb-1">Total Est.</div>
              <div className="text-3xl font-black text-cyan-400 italic">$31.20</div>
            </div>
            <button 
              onClick={() => document.querySelector('form')?.requestSubmit()}
              className="flex-1 py-5 rounded-2xl bg-cyan-500 text-black font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2"
            >
              Confirm <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
