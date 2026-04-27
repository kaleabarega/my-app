import React, { useRef } from 'react';
import { motion, useTransform } from 'framer-motion';

export default function TournamentSection({ scrollYProgress }) {
  const ref = useRef(null);

  const opacity = useTransform(scrollYProgress, [0.76, 0.83], [0, 1]);
  const y = useTransform(scrollYProgress, [0.76, 0.83], [100, 0]);
  const pointerEvents = useTransform(scrollYProgress, v => v > 0.8 ? "auto" : "none");

  const leftCardVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };
  const rightCardVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };
  const bottomCardVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const card1X = useTransform(scrollYProgress, [0.83, 1], [-20, -70]);
  const card1Y = useTransform(scrollYProgress, [0.83, 1], [15, 40]);
  const card1Rotate = useTransform(scrollYProgress, [0.83, 1], [-5, -12]);
  const card2Y = useTransform(scrollYProgress, [0.83, 1], [0, -15]);
  const card3X = useTransform(scrollYProgress, [0.83, 1], [20, 70]);
  const card3Y = useTransform(scrollYProgress, [0.83, 1], [15, 40]);
  const card3Rotate = useTransform(scrollYProgress, [0.83, 1], [5, 12]);

  return (
    <motion.section
      ref={ref}
      style={{ opacity, y, pointerEvents }}
      className="absolute inset-0 z-60 bg-[#05050a] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-12 overflow-hidden py-24 sm:py-32"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] sm:w-[1000px] h-[800px] sm:h-[1000px] bg-[radial-gradient(circle_at_center,_rgba(239,68,68,0.1)_0%,_transparent_60%)] z-0 pointer-events-none"></div>

      <div className="relative z-20 text-center mb-12 sm:mb-20 mt-4 sm:mt-8">
        <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white mb-3">
          Tournament
        </h2>
        <p className="text-base sm:text-lg text-gray-300 font-bold tracking-widest uppercase bg-black/20 inline-block px-4 py-1 rounded-full border border-white/5 backdrop-blur-sm">
          Coming Soon
        </p>
      </div>

      <motion.div
        className="relative w-full max-w-3xl h-[350px] sm:h-[450px] flex items-center justify-center mt-8 sm:mt-12 z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 1 }}
        variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
      >
        {/* Left Card - FIFA */}
        <motion.div
          style={{ x: card1X, y: card1Y, rotate: card1Rotate }}
          variants={leftCardVariants}
          whileHover={{ scale: 1.05, z: 50 }}
          className="absolute w-[160px] sm:w-[220px] h-[220px] sm:h-[300px] rounded-2xl overflow-hidden border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-[#1a1a2e] z-10 backdrop-blur-sm hover:shadow-[0_25px_60px_rgba(0,0,0,0.7)] transition-shadow duration-300"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10"></div>
          <div className="absolute inset-0 bg-blue-900/40"></div>
          <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 z-20">
            <h3 className="text-xl sm:text-2xl font-black text-white italic">FIFA</h3>
          </div>
        </motion.div>

        {/* Right Card - PUBG */}
        <motion.div
          style={{ x: card3X, y: card3Y, rotate: card3Rotate }}
          variants={rightCardVariants}
          whileHover={{ scale: 1.05, z: 50 }}
          className="absolute w-[160px] sm:w-[220px] h-[220px] sm:h-[300px] rounded-2xl overflow-hidden border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-[#2e2b1a] z-20 backdrop-blur-sm hover:shadow-[0_25px_60px_rgba(0,0,0,0.7)] transition-shadow duration-300"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10"></div>
          <div className="absolute inset-0 bg-yellow-900/40"></div>
          <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 z-20">
            <h3 className="text-xl sm:text-2xl font-black text-white italic tracking-wider">PUBG</h3>
          </div>
        </motion.div>

        {/* Center Card - WARZONE */}
        <motion.div
          style={{ y: card2Y }}
          variants={bottomCardVariants}
          whileHover={{ scale: 1.05, z: 50 }}
          className="absolute w-[180px] sm:w-[240px] h-[250px] sm:h-[340px] rounded-2xl overflow-hidden border-2 border-red-500/50 shadow-[0_0_40px_rgba(239,68,68,0.3)] bg-[#2a0808] z-30 backdrop-blur-sm hover:shadow-[0_30px_70px_rgba(239,68,68,0.5)] transition-shadow duration-300"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10"></div>
          <div className="absolute inset-0 bg-red-900/30"></div>
          <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 z-20">
            <h3 className="text-2xl sm:text-3xl font-black text-white italic tracking-wider">WARZONE</h3>
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
