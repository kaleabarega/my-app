import { useParams, Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { Gamepad2, Timer, Monitor, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const BranchDetail = () => {
  const { id } = useParams();
  const { theme } = useTheme();

  const consoles = Array.from({ length: 7 }, (_, i) => ({
    id: i + 1,
    name: `PS5 Station ${i + 1}`,
    status: i % 3 === 0 ? "occupied" : "available",
    specs: "4K 120Hz OLED",
  }));

  return (
    <div className="pt-32 pb-20 container mx-auto px-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
          <Link to="/branches" className="text-cyan-400 text-sm font-bold tracking-widest uppercase mb-4 block hover:opacity-70 transition-opacity">
            ← BACK TO BRANCHES
          </Link>
          <h1 className="text-5xl font-black italic">DOWNTOWN <span className="text-cyan-400">ARENA</span></h1>
        </div>
        <div className="flex gap-4">
          <div className="glass-panel px-6 py-3 rounded-2xl flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold text-sm">4 Available</span>
          </div>
          <div className="glass-panel px-6 py-3 rounded-2xl flex items-center gap-3 opacity-50">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <span className="font-bold text-sm">3 Occupied</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {consoles.map((console, i) => (
          <motion.div
            key={console.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className={`p-8 rounded-3xl border ${console.status === 'available' ? 'border-white/5 bg-white/[0.02] hover:border-cyan-500/30' : 'border-red-500/10 bg-red-500/[0.02] opacity-60 pointer-events-none'} transition-all group`}
          >
            <div className="flex justify-between items-start mb-12">
              <div className={`p-4 rounded-2xl ${console.status === 'available' ? 'bg-cyan-500/10 text-cyan-400' : 'bg-red-500/10 text-red-500'}`}>
                <Gamepad2 className="w-6 h-6" />
              </div>
              <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full ${console.status === 'available' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                {console.status}
              </span>
            </div>

            <h3 className="text-2xl font-bold mb-2">{console.name}</h3>
            <div className="flex items-center gap-2 text-neutral-500 text-sm mb-8">
              <Monitor className="w-4 h-4" />
              <span>{console.specs}</span>
            </div>

            {console.status === 'available' && (
              <Link
                to={`/booking/${id}/${console.id}`}
                className="w-full py-4 rounded-xl bg-cyan-500 text-black font-bold flex items-center justify-center gap-2 group-hover:scale-[1.02] transition-transform"
              >
                BOOK NOW
              </Link>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BranchDetail;
