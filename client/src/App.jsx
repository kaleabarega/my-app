import React, { useRef } from 'react';
import { ChevronRight, Monitor, Gamepad, Headset, Gamepad2 } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

import SetupSection from './components/SetupSection';
import BookingSection from './components/BookingSection';
import DashboardSection from './components/DashboardSection';
import TournamentSection from './components/TournamentSection';

function App() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Hero Animations
  const heroOpacity = useTransform(scrollYProgress, [0, 0.1, 0.16], [1, 1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.1, 0.16], [1, 1, 0.95]);
  const heroPointerEvents = useTransform(scrollYProgress, (v) => v < 0.14 ? "auto" : "none");

  // Experience Section Animations
  const experienceOpacity = useTransform(scrollYProgress, [0.10, 0.16, 0.26, 0.33], [0, 1, 1, 0]);
  const experienceY = useTransform(scrollYProgress, [0.10, 0.16], [100, 0]);
  const experiencePointerEvents = useTransform(scrollYProgress, (v) => v > 0.14 && v < 0.31 ? "auto" : "none");

  return (
    <div ref={containerRef} className="relative h-[600vh] bg-[#05050a] text-white font-sans selection:bg-purple-500/30">
      
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center bg-[#05050a]">

        {/* --- HERO SECTION --- */}
        <motion.section 
          style={{ opacity: heroOpacity, scale: heroScale, pointerEvents: heroPointerEvents }}
          className="absolute inset-0 flex flex-col z-10 py-20 sm:py-24"
        >
          {/* Background Effects */}
          <div className="absolute inset-0 z-0">
            <img src="/gaming_cafe_bg.png" alt="Gaming Cafe" className="object-cover w-full h-full opacity-60" />
            <div className="absolute inset-0 bg-black/60 z-10"></div>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-[size:64px_64px] z-10 pointer-events-none"></div>
          </div>

          {/* Logo */}
          <div className="absolute top-6 sm:top-8 left-6 sm:left-8 z-50 flex items-center gap-3">
            <div className="relative flex items-center justify-center">
              <Gamepad2 className="w-10 h-10 sm:w-12 sm:h-12 stroke-[1.5]" style={{ stroke: 'url(#neonGradient)', fill: 'none', filter: 'drop-shadow(0 0 8px rgba(56,189,248,0.8))' }} />
              <svg width="0" height="0">
                <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop stopColor="#38bdf8" offset="0%" />
                  <stop stopColor="#c084fc" offset="100%" />
                </linearGradient>
              </svg>
            </div>
            <div className="flex flex-col text-white font-medium leading-tight hidden sm:flex">
              <span className="text-xl tracking-wide">The Gamers</span>
              <span className="text-xl tracking-wide">DAN</span>
            </div>
          </div>

          {/* Navbar */}
          <nav className="absolute top-6 sm:top-8 right-6 sm:right-8 z-50 flex items-center justify-end w-full shrink-0">
            <button className="px-5 py-2 sm:px-6 sm:py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors duration-300 text-xs sm:text-sm font-semibold tracking-wide text-white shadow-[0_0_15px_rgba(255,255,255,0.05)]">
              Login / Sign Up
            </button>
          </nav>

          {/* Hero Content */}
          <main className="relative z-20 flex-1 flex px-4 sm:px-6 lg:px-12 pt-16 sm:pt-20 max-w-[1600px] w-full mx-auto items-center pb-6 min-h-0">
            <div className="w-full lg:w-[60%] xl:w-[55%] flex flex-col justify-center h-full gap-5 lg:gap-6 mt-12 sm:mt-0">
              
              <div className="flex flex-col gap-2 sm:gap-3 relative shrink-0">
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-[200%] bg-[radial-gradient(ellipse_at_left,_rgba(168,85,247,0.15)_0%,_rgba(59,130,246,0.1)_40%,_transparent_70%)] -z-10 pointer-events-none"></div>
                <h1 className="text-5xl sm:text-6xl xl:text-7xl font-black tracking-tight leading-[1.05] uppercase">
                  <span className="block text-white">CHUPAPI</span>
                  <span className="block mt-1 sm:mt-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-300 drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                    MUGNAGNO
                  </span>
                </h1>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 shrink-0 w-full sm:w-auto">
                <button className="group relative px-6 py-4 bg-white text-black font-bold rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)] w-full sm:w-auto flex justify-center">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-blue-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <span className="relative flex items-center gap-2 text-sm sm:text-base">
                    Explore Experiences
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
                  </span>
                </button>
                <button className="px-6 py-4 rounded-full font-semibold text-white/80 hover:text-white border border-white/10 hover:border-white/30 hover:bg-white/5 transition-colors w-full sm:w-auto text-sm sm:text-base text-center flex justify-center">
                  View Tournaments
                </button>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 sm:gap-8 pt-4 w-full justify-between sm:justify-start sm:w-max shrink-0">
                <div className="flex flex-col">
                  <span className="text-2xl sm:text-3xl font-bold text-white">50+</span>
                  <span className="text-[10px] sm:text-xs text-gray-500 font-medium uppercase tracking-wider mt-0.5">Stations</span>
                </div>
                <div className="w-px h-10 bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
                <div className="flex flex-col">
                  <span className="text-2xl sm:text-3xl font-bold text-white">1000+</span>
                  <span className="text-[10px] sm:text-xs text-gray-500 font-medium uppercase tracking-wider mt-0.5">Players</span>
                </div>
                <div className="w-px h-10 bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
                <div className="flex flex-col">
                  <span className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Top</span>
                  <span className="text-[10px] sm:text-xs text-gray-500 font-medium uppercase tracking-wider mt-0.5">Rated</span>
                </div>
              </div>

              {/* Feature Cards */}
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-3 pt-6 mt-auto border-t border-white/5 w-full shrink-0">
                <div className="px-4 py-3 sm:px-4 sm:py-2.5 rounded-xl border border-purple-500/20 bg-purple-500/5 text-sm font-medium text-purple-200 flex items-center justify-center sm:justify-start gap-2">
                  <Monitor className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" /> High-End PCs (RTX 40 Series)
                </div>
                <div className="px-4 py-3 sm:px-4 sm:py-2.5 rounded-xl border border-blue-500/20 bg-blue-500/5 text-sm font-medium text-blue-200 flex items-center justify-center sm:justify-start gap-2">
                  <Gamepad className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" /> PS5 Lounge (Next-Gen Games)
                </div>
                <div className="px-4 py-3 sm:px-4 sm:py-2.5 rounded-xl border border-indigo-500/20 bg-indigo-500/5 text-sm font-medium text-indigo-200 flex items-center justify-center sm:justify-start gap-2">
                  <Headset className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400" /> VR Experience (Meta Quest 3)
                </div>
              </div>
            </div>
          </main>
        </motion.section>

        {/* --- EXPERIENCE SECTION --- */}
        <motion.section 
          style={{ opacity: experienceOpacity, y: experienceY, pointerEvents: experiencePointerEvents }}
          className="absolute inset-0 z-20 bg-[#05050a] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-12 py-20 sm:py-24"
        >
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,_rgba(168,85,247,0.1)_0%,_transparent_70%)] z-0 pointer-events-none"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.1)_0%,_transparent_70%)] z-0 pointer-events-none"></div>

          <div className="relative z-10 text-center mb-8 sm:mb-16 mt-4 sm:mt-8">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight uppercase text-white mb-2 sm:mb-4">
              Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]">Experience</span>
            </h2>
            <p className="text-gray-400 text-base sm:text-lg lg:text-xl font-light">Pick your setup and start your session</p>
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 w-full max-w-6xl overflow-y-auto sm:overflow-visible pr-2 sm:pr-0 max-h-[60vh] sm:max-h-none">
            
            {/* Card 1 */}
            <div className="group relative rounded-2xl bg-[#05050a]/80 backdrop-blur-md border border-white/10 p-6 sm:p-8 hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] cursor-pointer flex flex-col">
              <div className="w-14 h-14 rounded-full bg-purple-500/10 flex items-center justify-center mb-6 border border-purple-500/20 group-hover:bg-purple-500/20 group-hover:scale-110 transition-all duration-300">
                <Monitor className="w-7 h-7 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">PC Arena</h3>
              <p className="text-gray-400 text-sm mb-6 flex-1">High-performance RTX 40-series rigs built for competitive gaming.</p>
              <div className="flex items-center justify-between mb-6">
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Rate</span>
                  <span className="text-xl font-bold text-white">$5<span className="text-sm font-normal text-gray-400">/hr</span></span>
                </div>
                <div className="flex flex-col text-right">
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Capacity</span>
                  <span className="text-sm font-medium text-white">1 Player</span>
                </div>
              </div>
              <button className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white font-semibold group-hover:bg-purple-500 group-hover:border-purple-400 transition-all duration-300">Select</button>
            </div>

            {/* Card 2 */}
            <div className="group relative rounded-2xl bg-[#05050a]/80 backdrop-blur-md border border-white/10 p-6 sm:p-8 hover:bg-white/10 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] cursor-pointer flex flex-col">
              <div className="w-14 h-14 rounded-full bg-blue-500/10 flex items-center justify-center mb-6 border border-blue-500/20 group-hover:bg-blue-500/20 group-hover:scale-110 transition-all duration-300">
                <Gamepad className="w-7 h-7 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">PS5 Lounge</h3>
              <p className="text-gray-400 text-sm mb-6 flex-1">Comfortable couches and huge 4K screens for next-gen console titles.</p>
              <div className="flex items-center justify-between mb-6">
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Rate</span>
                  <span className="text-xl font-bold text-white">$8<span className="text-sm font-normal text-gray-400">/hr</span></span>
                </div>
                <div className="flex flex-col text-right">
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Capacity</span>
                  <span className="text-sm font-medium text-white">Up to 4</span>
                </div>
              </div>
              <button className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white font-semibold group-hover:bg-blue-500 group-hover:border-blue-400 transition-all duration-300">Select</button>
            </div>

            {/* Card 3 */}
            <div className="group relative rounded-2xl bg-[#05050a]/80 backdrop-blur-md border border-white/10 p-6 sm:p-8 hover:bg-white/10 hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] cursor-pointer flex flex-col">
              <div className="w-14 h-14 rounded-full bg-cyan-500/10 flex items-center justify-center mb-6 border border-cyan-500/20 group-hover:bg-cyan-500/20 group-hover:scale-110 transition-all duration-300">
                <Headset className="w-7 h-7 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">VR Experience</h3>
              <p className="text-gray-400 text-sm mb-6 flex-1">Fully immersive Meta Quest 3 setups with plenty of room to move.</p>
              <div className="flex items-center justify-between mb-6">
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Rate</span>
                  <span className="text-xl font-bold text-white">$12<span className="text-sm font-normal text-gray-400">/hr</span></span>
                </div>
                <div className="flex flex-col text-right">
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Capacity</span>
                  <span className="text-sm font-medium text-white">1 Player</span>
                </div>
              </div>
              <button className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white font-semibold group-hover:bg-cyan-500 group-hover:border-cyan-400 transition-colors duration-300">Select</button>
            </div>
          </div>
        </motion.section>

        {/* --- NEW SECTIONS --- */}
        <SetupSection scrollYProgress={scrollYProgress} />
        <BookingSection scrollYProgress={scrollYProgress} />
        <DashboardSection scrollYProgress={scrollYProgress} />
        <TournamentSection scrollYProgress={scrollYProgress} />

      </div>
    </div>
  );
}

export default App;
