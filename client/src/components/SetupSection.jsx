import React, { useState } from 'react';
import { motion, useTransform } from 'framer-motion';
import { Gamepad2, Monitor, Headset, Lock } from 'lucide-react';

const setups = [
  {
    id: 'ps5',
    name: 'PS5 Console',
    subtitle: 'Next-Gen Gaming',
    icon: Gamepad2,
    price: '$8/hr',
    color: 'border-cyan-500 shadow-[0_0_30px_rgba(6,182,212,0.35)]',
    iconColor: 'text-cyan-400',
    glowBg: 'bg-cyan-500/10',
    active: true,
  },
  {
    id: 'pc',
    name: 'PC Arena',
    subtitle: 'RTX 40-Series',
    icon: Monitor,
    price: '$5/hr',
    color: 'border-purple-500/30',
    iconColor: 'text-purple-400/50',
    glowBg: 'bg-purple-500/5',
    active: false,
  },
  {
    id: 'vr',
    name: 'VR Experience',
    subtitle: 'Meta Quest 3',
    icon: Headset,
    price: '$12/hr',
    color: 'border-blue-500/30',
    iconColor: 'text-blue-400/50',
    glowBg: 'bg-blue-500/5',
    active: false,
  },
];

export default function SetupSection({ scrollYProgress }) {
  const [selected, setSelected] = useState('ps5');

  const opacity = useTransform(scrollYProgress, [0.26, 0.33, 0.43, 0.50], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0.26, 0.33], [100, 0]);
  const scale = useTransform(scrollYProgress, [0.43, 0.50], [1, 0.95]);
  const pointerEvents = useTransform(scrollYProgress, v => v > 0.28 && v < 0.48 ? "auto" : "none");

  return (
    <motion.section
      style={{ opacity, y, scale, pointerEvents }}
      className="absolute inset-0 z-30 bg-[#05050a] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-12 py-20 sm:py-24"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,_rgba(6,182,212,0.06)_0%,_transparent_70%)] z-0 pointer-events-none" />

      <div className="relative z-10 text-center mb-10 sm:mb-16 mt-4 sm:mt-8 px-4">
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight uppercase text-white mb-3">
          Pick Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 drop-shadow-[0_0_15px_rgba(6,182,212,0.4)]">Setup</span>
        </h2>
        <p className="text-gray-400 text-sm sm:text-base lg:text-lg font-light max-w-md mx-auto">
          Currently only <span className="text-cyan-400 font-semibold">PS5 Console</span> stations are available. More setups coming soon.
        </p>
      </div>

      <div className="relative z-10 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 lg:gap-8 w-full max-w-4xl px-2 sm:px-0">
        {setups.map((setup) => {
          const isSelected = selected === setup.id;
          const Icon = setup.icon;
          return (
            <div
              key={setup.id}
              onClick={() => setup.active && setSelected(setup.id)}
              className={`relative rounded-3xl border transition-all duration-300 flex flex-col items-center w-full sm:w-[260px] lg:w-[280px] h-[200px] sm:h-[260px] justify-center p-6 sm:p-8 
                ${setup.active
                  ? `cursor-pointer ${isSelected ? `${setup.color} bg-white/10` : 'border-white/10 hover:border-white/25 hover:bg-white/5'}`
                  : 'border-white/5 bg-white/[0.015] cursor-not-allowed opacity-45'
                }`}
            >
              {/* Coming Soon badge */}
              {!setup.active && (
                <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 bg-white/5 border border-white/10 rounded-full">
                  <Lock className="w-2.5 h-2.5 text-gray-500" />
                  <span className="text-[9px] sm:text-[10px] font-black text-gray-500 uppercase tracking-wider">Coming Soon</span>
                </div>
              )}

              {/* Active glow dot */}
              {setup.active && isSelected && (
                <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
              )}

              <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl ${setup.glowBg} flex items-center justify-center mb-4 border ${isSelected && setup.active ? 'border-cyan-500/30' : 'border-white/5'} transition-all duration-300`}>
                <Icon className={`w-7 h-7 sm:w-8 sm:h-8 transition-colors duration-300 ${setup.active ? (isSelected ? setup.iconColor : 'text-gray-500') : setup.iconColor}`} />
              </div>
              <span className={`text-lg sm:text-xl font-black text-center transition-colors duration-300 ${setup.active ? (isSelected ? 'text-white' : 'text-gray-400') : 'text-gray-600'}`}>
                {setup.name}
              </span>
              <span className={`text-xs font-medium mt-1 transition-colors duration-300 ${setup.active ? (isSelected ? 'text-cyan-400' : 'text-gray-600') : 'text-gray-700'}`}>
                {setup.active ? `${setup.price} · ${setup.subtitle}` : setup.subtitle}
              </span>
            </div>
          );
        })}
      </div>
    </motion.section>
  );
}
