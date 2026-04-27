import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { Users, Gamepad2, ShieldCheck, CheckCircle2, XCircle, MoreVertical } from "lucide-react";

const Admin = () => {
  const { theme } = useTheme();

  const [activeTab, setActiveTab] = useState("bookings");

  const mockBookings = [
    { id: 101, user: "John Doe", branch: "Downtown", console: "PS5-04", time: "14:00 - 16:00", status: "confirmed" },
    { id: 102, user: "Jane Smith", branch: "Uptown", console: "PS5-01", time: "15:30 - 17:30", status: "confirmed" },
  ];

  return (
    <div className="pt-32 pb-20 container mx-auto px-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-black uppercase tracking-widest mb-4">
            <ShieldCheck className="w-3 h-3" /> Admin Mode
          </div>
          <h1 className="text-5xl font-black italic tracking-tighter">MANAGEMENT <span className="text-cyan-400">CENTER</span></h1>
        </div>
        
        <div className="flex bg-black/40 p-1 rounded-2xl border border-white/5">
          {["bookings", "consoles", "users"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-3 rounded-xl text-sm font-bold uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20' : 'text-neutral-500 hover:text-white'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="glass-panel rounded-[2.5rem] overflow-hidden border border-white/5">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500">Booking ID</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500">User</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500">Branch</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500">Station</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500">Schedule</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockBookings.map((b) => (
                <tr key={b.id} className="border-b border-white/5 hover:bg-white/[0.01] transition-colors group">
                  <td className="px-8 py-6 font-mono text-cyan-400">#{b.id}</td>
                  <td className="px-8 py-6 font-bold">{b.user}</td>
                  <td className="px-8 py-6 text-neutral-400">{b.branch}</td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-bold">{b.console}</span>
                  </td>
                  <td className="px-8 py-6 text-sm text-neutral-300">{b.time}</td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all"><CheckCircle2 className="w-4 h-4" /></button>
                      <button className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all"><XCircle className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;
