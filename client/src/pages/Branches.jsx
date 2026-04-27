import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { MapPin, Gamepad2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const Branches = () => {
  const { theme } = useTheme();

  const branches = [
    { id: 1, name: "Downtown Arena", location: "123 Cyber St, Neon City", consoles: 7, img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800" },
    { id: 2, name: "Uptown Station", location: "789 Skyline Blvd", consoles: 7, img: "https://images.unsplash.com/photo-1598550476439-6847785fce6b?auto=format&fit=crop&q=80&w=800" },
  ];

  return (
    <div className="pt-32 pb-20 container mx-auto px-6">
      <div className="max-w-2xl mb-16">
        <h1 className="text-5xl font-black mb-6">SELECT <span className="text-cyan-400">LOCATION</span></h1>
        <p className="text-neutral-500 text-lg">Choose a branch to view real-time console availability and secure your spot.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {branches.map((branch, i) => (
          <motion.div
            key={branch.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group relative rounded-[2.5rem] overflow-hidden border border-white/5 glass-panel h-[500px]"
          >
            <div className="absolute inset-0 z-0">
              <img src={branch.img} alt={branch.name} className="w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            </div>

            <div className="relative z-10 h-full p-12 flex flex-col justify-end">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-sm mb-4">
                <MapPin className="w-4 h-4" />
                <span>{branch.location}</span>
              </div>
              <h2 className="text-4xl font-black mb-4">{branch.name}</h2>
              <div className="flex items-center gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <Gamepad2 className="w-5 h-5 text-neutral-400" />
                  <span className="font-bold">{branch.consoles} Consoles</span>
                </div>
                <div className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold uppercase tracking-widest">
                  Active
                </div>
              </div>

              <Link
                to={`/branch/${branch.id}`}
                className="w-full py-4 rounded-2xl bg-white text-black font-bold flex items-center justify-center gap-2 group-hover:bg-cyan-400 transition-colors"
              >
                SELECT BRANCH
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Branches;
