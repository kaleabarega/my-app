import React, { useRef } from 'react';
import { motion, useTransform } from 'framer-motion';
import { Trophy } from 'lucide-react';

export default function TournamentSection({ scrollYProgress }) {
  const ref = useRef(null);

  const opacity = useTransform(scrollYProgress, [0.76, 0.83], [0, 1]);
  const y = useTransform(scrollYProgress, [0.76, 0.83], [80, 0]);
  const pointerEvents = useTransform(scrollYProgress, v => v > 0.8 ? "auto" : "none");

  const card1X = useTransform(scrollYProgress, [0.83, 1], [-20, -70]);
  const card1Y = useTransform(scrollYProgress, [0.83, 1], [15, 40]);
  const card1Rotate = useTransform(scrollYProgress, [0.83, 1], [-5, -12]);
  const card2Y = useTransform(scrollYProgress, [0.83, 1], [0, -15]);
  const card3X = useTransform(scrollYProgress, [0.83, 1], [20, 70]);
  const card3Y = useTransform(scrollYProgress, [0.83, 1], [15, 40]);
  const card3Rotate = useTransform(scrollYProgress, [0.83, 1], [5, 12]);

  const cardVariants = {
    left:   { hidden: { opacity: 0, x: -80 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } } },
    right:  { hidden: { opacity: 0, x: 80  }, visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } } },
    center: { hidden: { opacity: 0, y: 80  }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } } },
  };

  return (
    <motion.section
      ref={ref}
      style={{ opacity, y, pointerEvents }}
      className="absolute inset-0 z-[60] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-12 overflow-hidden py-20 sm:py-24"
    >
      {/* Solid background to prevent hero bleed-through */}
      <div className="absolute inset-0 bg-[#05050a]" style={{ isolation: 'isolate' }} />

      {/* Red glow orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[600px] sm:h-[900px] bg-[radial-gradient(circle_at_center,_rgba(239,68,68,0.08)_0%,_transparent_60%)] z-[1] pointer-events-none" />

      {/* Header */}
      <div className="relative z-[2] text-center mb-10 sm:mb-16 mt-4 sm:mt-8 px-4">
        <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-red-500/10 border border-red-500/20 mb-6">
          <Trophy className="w-6 h-6 sm:w-7 sm:h-7 text-red-400" />
        </div>
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white mb-4">
          Tournament
        </h2>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-black/30 border border-white/10 rounded-full backdrop-blur-sm">
          <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
          <p className="text-xs sm:text-sm text-gray-300 font-bold tracking-widest uppercase">
            Coming Soon
          </p>
        </div>
      </div>

      {/* Cards Deck */}
      <motion.div
        className="relative w-full max-w-xs sm:max-w-2xl h-[280px] sm:h-[420px] flex items-center justify-center z-[2]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.8 }}
        variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
      >
        {/* Left Card - FIFA */}
        <motion.div
          style={{ x: card1X, y: card1Y, rotate: card1Rotate }}
          variants={cardVariants.left}
          whileHover={{ scale: 1.06, zIndex: 50 }}
          className="absolute w-[130px] sm:w-[200px] h-[180px] sm:h-[280px] rounded-2xl overflow-hidden border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.6)] z-10"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-[#0a0a1a]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent z-10" />
          <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-5 z-20">
            <p className="text-[9px] sm:text-[10px] font-bold text-blue-400 uppercase tracking-wider mb-1">Sports</p>
            <h3 className="text-lg sm:text-2xl font-black text-white italic">FIFA</h3>
          </div>
        </motion.div>

        {/* Right Card - PUBG */}
        <motion.div
          style={{ x: card3X, y: card3Y, rotate: card3Rotate }}
          variants={cardVariants.right}
          whileHover={{ scale: 1.06, zIndex: 50 }}
          className="absolute w-[130px] sm:w-[200px] h-[180px] sm:h-[280px] rounded-2xl overflow-hidden border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.6)] z-20"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/80 to-[#0a0a1a]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent z-10" />
          <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-5 z-20">
            <p className="text-[9px] sm:text-[10px] font-bold text-yellow-400 uppercase tracking-wider mb-1">Battle Royale</p>
            <h3 className="text-lg sm:text-2xl font-black text-white italic">PUBG</h3>
          </div>
        </motion.div>

        {/* Center Card - WARZONE */}
        <motion.div
          style={{ y: card2Y }}
          variants={cardVariants.center}
          whileHover={{ scale: 1.06, zIndex: 50 }}
          className="absolute w-[145px] sm:w-[220px] h-[200px] sm:h-[320px] rounded-2xl overflow-hidden border-2 border-red-500/60 shadow-[0_0_50px_rgba(239,68,68,0.25)] z-30"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/60 to-[#0a0a1a]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/60 to-transparent" />
          <div className="absolute bottom-5 sm:bottom-7 left-4 sm:left-6 z-20">
            <p className="text-[9px] sm:text-[10px] font-bold text-red-400 uppercase tracking-wider mb-1">Featured</p>
            <h3 className="text-xl sm:text-3xl font-black text-white italic tracking-wide">WARZONE</h3>
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
