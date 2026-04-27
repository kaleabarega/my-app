import React, { useRef, useState, useCallback } from 'react';
import { ChevronRight, Gamepad, Headset, Gamepad2, Lock } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Routes, Route } from 'react-router-dom';

import SetupSection from './components/SetupSection';
import BookingSection from './components/BookingSection';
import DashboardSection from './components/DashboardSection';
import TournamentSection from './components/TournamentSection';
import Navbar from './components/Navbar';
import AuthModal from './components/AuthModal';

import Landing from './pages/Landing';
import Branches from './pages/Branches';
import BranchDetail from './pages/BranchDetail';
import Booking from './pages/Booking';
import MyBookings from './pages/MyBookings';
import Admin from './pages/Admin';

// ─────────────────────────────────────────────
// Main scrolling experience (home page "/" route)
// ─────────────────────────────────────────────
function HomeExperience() {
  const containerRef = useRef(null);
  const [authOpen, setAuthOpen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Hero Animations
  const heroOpacity = useTransform(scrollYProgress, [0, 0.10, 0.16], [1, 1, 0]);
  const heroScale  = useTransform(scrollYProgress, [0, 0.10, 0.16], [1, 1, 0.95]);
  const heroPointerEvents = useTransform(scrollYProgress, v => v < 0.14 ? 'auto' : 'none');

  // Experience Section Animations
  const expOpacity = useTransform(scrollYProgress, [0.10, 0.16, 0.26, 0.33], [0, 1, 1, 0]);
  const expY       = useTransform(scrollYProgress, [0.10, 0.16], [80, 0]);
  const expPointerEvents = useTransform(scrollYProgress, v => v > 0.14 && v < 0.31 ? 'auto' : 'none');

  // Smooth scroll helpers — container is 600vh
  const scrollToProgress = useCallback((progress) => {
    if (!containerRef.current) return;
    const totalHeight = containerRef.current.scrollHeight - window.innerHeight;
    window.scrollTo({ top: totalHeight * progress, behavior: 'smooth' });
  }, []);

  return (
    <div ref={containerRef} className="relative h-[600vh] bg-[#05050a] text-white font-sans selection:bg-purple-500/30">

      {/* Global Navbar */}
      <Navbar onOpenAuth={() => setAuthOpen(true)} />

      {/* Auth Modal */}
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />

      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden bg-[#05050a]">

        {/* ── HERO SECTION ─────────────────────────── */}
        <motion.section
          style={{ opacity: heroOpacity, scale: heroScale, pointerEvents: heroPointerEvents }}
          className="absolute inset-0 flex flex-col z-10 pt-16 sm:pt-20"
        >
          {/* Background */}
          <div className="absolute inset-0 z-0">
            <img src="/gaming_cafe_bg.png" alt="Gaming Cafe" className="object-cover w-full h-full opacity-50" />
            <div className="absolute inset-0 bg-black/65 z-10" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0d_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0d_1px,transparent_1px)] bg-[size:64px_64px] z-10 pointer-events-none" />
          </div>

          {/* Hero Content */}
          <main className="relative z-20 flex-1 flex px-4 sm:px-6 lg:px-12 pt-6 sm:pt-10 max-w-[1400px] w-full mx-auto items-center pb-4 min-h-0">
            <div className="w-full lg:w-[58%] flex flex-col justify-center h-full gap-4 sm:gap-5">

              {/* Heading */}
              <div className="flex flex-col gap-2 sm:gap-3">
                <div className="flex flex-col gap-1">
                  <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black tracking-tight leading-[1.02] uppercase">
                    <span className="block text-white">CHUPAPI</span>
                    <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-300 drop-shadow-[0_0_20px_rgba(168,85,247,0.35)]">
                      MUGNAGNO
                    </span>
                  </h1>
                  <p className="text-sm sm:text-base text-gray-400 font-medium max-w-sm mt-2 leading-relaxed">
                    Premium PS5 gaming lounge. Book your station, dominate the arena.
                  </p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
                <button
                  onClick={() => scrollToProgress(0.28)}
                  className="group relative px-6 py-3.5 bg-white text-black font-bold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_25px_rgba(255,255,255,0.12)] text-sm sm:text-base flex items-center justify-center gap-2"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-blue-100 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                  <span className="relative flex items-center gap-2">
                    Explore Experiences
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                  </span>
                </button>
                <button
                  onClick={() => scrollToProgress(0.80)}
                  className="px-6 py-3.5 rounded-full font-semibold text-gray-300 hover:text-white border border-white/15 hover:border-white/35 hover:bg-white/5 transition-all text-sm sm:text-base flex items-center justify-center gap-2"
                >
                  View Tournaments
                </button>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-5 sm:gap-8 pt-2 w-full justify-between sm:justify-start sm:w-max">
                {[
                  { value: '50+', label: 'Stations' },
                  { value: '1000+', label: 'Players' },
                  { value: 'Top', label: 'Rated' },
                ].map((stat, i) => (
                  <React.Fragment key={stat.label}>
                    {i > 0 && <div className="w-px h-8 bg-gradient-to-b from-transparent via-white/20 to-transparent" />}
                    <div className="flex flex-col">
                      <span className={`text-xl sm:text-2xl font-bold ${i === 2 ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400' : 'text-white'}`}>
                        {stat.value}
                      </span>
                      <span className="text-[9px] sm:text-[10px] text-gray-600 font-semibold uppercase tracking-wider mt-0.5">{stat.label}</span>
                    </div>
                  </React.Fragment>
                ))}
              </div>

              {/* Feature Pills */}
              <div className="flex flex-wrap gap-2 pt-3 mt-auto border-t border-white/[0.06]">
                <div className="px-3 py-2 rounded-xl border border-blue-500/20 bg-blue-500/5 text-xs font-semibold text-blue-300 flex items-center gap-2">
                  <Gamepad className="w-3.5 h-3.5 text-blue-400" /> PS5 Lounge (Next-Gen Games)
                </div>
                <div className="px-3 py-2 rounded-xl border border-white/10 bg-white/[0.02] text-xs font-semibold text-gray-600 flex items-center gap-2">
                  <Lock className="w-3 h-3" />
                  <span>PC Arena · <span className="text-gray-700">Coming Soon</span></span>
                </div>
                <div className="px-3 py-2 rounded-xl border border-white/10 bg-white/[0.02] text-xs font-semibold text-gray-600 flex items-center gap-2">
                  <Lock className="w-3 h-3" />
                  <span>VR · <span className="text-gray-700">Coming Soon</span></span>
                </div>
              </div>
            </div>
          </main>
        </motion.section>

        {/* ── EXPERIENCE SECTION ───────────────────── */}
        <motion.section
          style={{ opacity: expOpacity, y: expY, pointerEvents: expPointerEvents }}
          className="absolute inset-0 z-20 bg-[#05050a] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-12 pt-20 sm:pt-24 pb-6"
        >
          <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[radial-gradient(circle_at_center,_rgba(168,85,247,0.07)_0%,_transparent_70%)] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.07)_0%,_transparent_70%)] pointer-events-none" />

          <div className="relative z-10 text-center mb-6 sm:mb-10">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight uppercase text-white mb-3">
              Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Experience</span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base font-light">Select your setup and start your session</p>
          </div>

          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 w-full max-w-4xl">

            {/* PS5 Lounge — ACTIVE */}
            <div className="group relative rounded-2xl bg-[#05050a]/80 backdrop-blur-md border border-blue-500/30 p-5 sm:p-7 hover:bg-blue-500/5 hover:border-blue-500/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] cursor-pointer flex flex-col">
              <div className="absolute top-3 right-3 px-2 py-0.5 bg-blue-500/10 border border-blue-500/20 rounded-full">
                <span className="text-[9px] font-black text-blue-400 uppercase tracking-wider">Available</span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-5 border border-blue-500/20 group-hover:bg-blue-500/20 group-hover:scale-110 transition-all duration-300">
                <Gamepad className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-black text-white mb-2">PS5 Lounge</h3>
              <p className="text-gray-400 text-xs sm:text-sm mb-5 flex-1 leading-relaxed">Next-gen console gaming on huge 4K screens with comfortable couches.</p>
              <div className="flex items-center justify-between mb-5">
                <div>
                  <span className="text-[9px] text-gray-600 uppercase tracking-wider font-bold block">Rate</span>
                  <span className="text-lg font-black text-white">$8<span className="text-xs font-normal text-gray-500">/hr</span></span>
                </div>
                <div className="text-right">
                  <span className="text-[9px] text-gray-600 uppercase tracking-wider font-bold block">Capacity</span>
                  <span className="text-sm font-semibold text-gray-300">Up to 4</span>
                </div>
              </div>
              <button
                onClick={() => scrollToProgress(0.47)}
                className="w-full py-2.5 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-300 font-bold text-sm group-hover:bg-blue-500 group-hover:border-blue-400 group-hover:text-white transition-all duration-300"
              >
                Book Now
              </button>
            </div>

            {/* PC Arena — COMING SOON */}
            <ComingSoonCard
              icon={<Lock className="w-6 h-6 text-gray-700" />}
              title="PC Arena"
              desc="High-performance RTX 40-series rigs built for competitive FPS gaming."
              price="$5/hr"
              capacity="1 Player"
            />

            {/* VR — COMING SOON */}
            <ComingSoonCard
              icon={<Headset className="w-6 h-6 text-gray-700" />}
              title="VR Experience"
              desc="Fully immersive Meta Quest 3 setups with room-scale play areas."
              price="$12/hr"
              capacity="1 Player"
            />
          </div>
        </motion.section>

        {/* ── SCROLL-BASED SECTIONS ─────────────────── */}
        <SetupSection scrollYProgress={scrollYProgress} />
        <BookingSection scrollYProgress={scrollYProgress} />
        <DashboardSection scrollYProgress={scrollYProgress} />
        <TournamentSection scrollYProgress={scrollYProgress} />

      </div>
    </div>
  );
}

// Reusable Coming Soon card
function ComingSoonCard({ icon, title, desc, price, capacity }) {
  return (
    <div className="relative rounded-2xl bg-[#05050a]/40 border border-white/5 p-5 sm:p-7 flex flex-col opacity-50 cursor-not-allowed">
      <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 bg-white/[0.03] border border-white/10 rounded-full">
        <Lock className="w-2.5 h-2.5 text-gray-600" />
        <span className="text-[9px] font-black text-gray-600 uppercase tracking-wider">Coming Soon</span>
      </div>
      <div className="w-12 h-12 rounded-2xl bg-white/[0.03] flex items-center justify-center mb-5 border border-white/5">
        {icon}
      </div>
      <h3 className="text-lg sm:text-xl font-black text-gray-600 mb-2">{title}</h3>
      <p className="text-gray-700 text-xs sm:text-sm mb-5 flex-1 leading-relaxed">{desc}</p>
      <div className="flex items-center justify-between mb-5">
        <div>
          <span className="text-[9px] text-gray-700 uppercase tracking-wider font-bold block">Rate</span>
          <span className="text-lg font-black text-gray-600">{price}</span>
        </div>
        <div className="text-right">
          <span className="text-[9px] text-gray-700 uppercase tracking-wider font-bold block">Capacity</span>
          <span className="text-sm font-semibold text-gray-700">{capacity}</span>
        </div>
      </div>
      <div className="w-full py-2.5 rounded-xl bg-white/[0.02] border border-white/5 text-gray-700 font-bold text-sm text-center">
        Coming Soon
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// App with router
// ─────────────────────────────────────────────
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeExperience />} />
      <Route path="/branches" element={<Branches />} />
      <Route path="/branches/:id" element={<BranchDetail />} />
      <Route path="/booking/:id" element={<Booking />} />
      <Route path="/my-bookings" element={<MyBookings />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default App;
