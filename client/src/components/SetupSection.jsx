import React, { useState } from 'react';
import { motion, useTransform } from 'framer-motion';
import { Monitor, Gamepad2 } from 'lucide-react';

const setups = [
  { id: 'pc-basic', name: 'PC Basic Setup', icon: Monitor, color: 'border-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.4)] text-purple-400' },
  { id: 'console', name: 'Console Station', icon: Gamepad2, color: 'border-green-500 shadow-[0_0_30px_rgba(34,197,94,0.4)] text-green-400' },
];

export default function SetupSection({ scrollYProgress }) {
  const [selected, setSelected] = useState(null);

  const opacity = useTransform(scrollYProgress, [0.26, 0.33, 0.43, 0.50], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0.26, 0.33], [100, 0]);
  const scale = useTransform(scrollYProgress, [0.43, 0.50], [1, 0.95]);
  const pointerEvents = useTransform(scrollYProgress, v => v > 0.28 && v < 0.48 ? "auto" : "none");

  return (
    <motion.section 
      style={{ opacity, y, scale, pointerEvents }}
      className="absolute inset-0 z-30 bg-[#05050a] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-12 py-20 sm:py-24"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,_rgba(168,85,247,0.05)_0%,_transparent_70%)] z-0 pointer-events-none"></div>

      <div className="relative z-10 text-center mb-10 sm:mb-16 mt-4 sm:mt-8">
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight uppercase text-white mb-2 sm:mb-4">
          Pick Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]">Setup</span>
        </h2>
        <p className="text-gray-400 text-base sm:text-lg lg:text-xl font-light">Choose your battle station</p>
      </div>

      <div className="relative z-10 flex flex-col sm:flex-row justify-center gap-6 sm:gap-12 w-full max-w-4xl px-4 sm:px-0">
        {setups.map((setup) => {
          const isSelected = selected === setup.id;
          const Icon = setup.icon;
          return (
            <motion.div 
              key={setup.id}
              whileHover={{ scale: 1.05, rotate: 1 }}
              onClick={() => setSelected(setup.id)}
              className={`relative cursor-pointer p-8 sm:p-10 rounded-3xl border transition-all duration-300 flex flex-col items-center w-full sm:w-[280px] h-[220px] sm:h-[280px] justify-center bg-[#05050a]/80 backdrop-blur-md 
                ${isSelected ? `${setup.color} bg-white/10` : 'border-white/10 hover:border-white/30 hover:bg-white/5 shadow-none'}`}
            >
              <Icon className={`w-16 h-16 sm:w-20 sm:h-20 mb-6 transition-colors duration-300 ${isSelected ? setup.color.split(' ').pop() : 'text-gray-400'}`} />
              <span className={`text-xl sm:text-2xl text-center font-bold ${isSelected ? 'text-white' : 'text-gray-300'}`}>{setup.name}</span>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
