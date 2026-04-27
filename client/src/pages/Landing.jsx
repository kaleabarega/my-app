import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Controller3D from "../components/3d/Controller3D";
import { useTheme } from "../context/ThemeContext";
import { ChevronDown, Gamepad2, Users, ShieldCheck, Zap, Monitor, Cpu, Trophy, Clock } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const TournamentCard = ({ title, date, prize, img, index }) => {
  const rotation = index === 0 ? -15 : index === 2 ? 15 : 0;
  const xOffset = index === 0 ? -100 : index === 2 ? 100 : 0;

  return (
    <motion.div
      whileHover={{ y: -20, scale: 1.05, zIndex: 50 }}
      className="relative w-[280px] h-[380px] rounded-[2rem] overflow-hidden border border-white/10 glass-panel group cursor-pointer"
      style={{ rotate: `${rotation}deg`, x: xOffset }}
    >
      <img src={img} alt={title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full p-8">
        <div className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.2em] mb-2">{date}</div>
        <h4 className="text-xl font-bold text-white mb-2">{title}</h4>
        <div className="text-sm font-bold text-neutral-400">Prize Pool: {prize}</div>
      </div>
    </motion.div>
  );
};

const Landing = () => {
  const { theme } = useTheme();
  const mainRef = useRef();
  const { scrollYProgress } = useScroll({ target: mainRef });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax for sections
      gsap.utils.toArray("section").forEach((section, i) => {
        if (i === 0) return;
        gsap.from(section.querySelectorAll(".reveal"), {
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
          },
          opacity: 0,
          y: 60,
          stagger: 0.2,
          duration: 1.2,
          ease: "power3.out",
        });
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="relative">
      {/* Hero Section */}
      <section className="min-h-screen relative flex items-center pt-24 overflow-hidden">
        <div className="container mx-auto px-8 grid lg:grid-cols-2 gap-20 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-10"
          >
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-300">New Gen Gaming Hub</span>
            </div>

            <h1 className="text-7xl lg:text-9xl font-black tracking-tighter leading-[0.85] italic">
              OWN THE <br />
              <span className="text-cyan-400 drop-shadow-[0_0_30px_rgba(34,211,238,0.4)]">VIRTUAL</span> <br />
              WORLD
            </h1>

            <p className="text-xl text-neutral-500 max-w-lg leading-relaxed font-medium">
              Experience gaming like never before. High-end PS5 stations, ultra-fast networks, and a community of elite players.
            </p>

            <div className="flex flex-wrap gap-6 pt-4">
              <Link
                to="/branches"
                className="px-10 py-5 rounded-2xl bg-cyan-500 text-black font-black flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(34,211,238,0.3)]"
              >
                <Zap className="w-5 h-5 fill-current" />
                RESERVE NOW
              </Link>
              <button className="px-10 py-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl font-bold hover:bg-white/10 transition-all">
                EXPLORE ARENAS
              </button>
            </div>
          </motion.div>

          <div className="relative h-[600px] lg:h-[800px]">
            <Canvas shadows dpr={[1, 2]} className="pointer-events-none">
              <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
              <Environment preset="city" />
              <ambientLight intensity={0.5} />
              <Controller3D />
              <ContactShadows opacity={0.4} scale={10} blur={2} far={4.5} />
            </Canvas>
          </div>
        </div>
      </section>

      {/* Feature Grid - The Vibe Check */}
      <section className="py-40 relative">
        <div className="container mx-auto px-8">
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { icon: Cpu, title: "PS5 Pro Hardware", desc: "Latest console revisions with liquid metal cooling for zero thermal throttling." },
              { icon: Monitor, title: "4K 120Hz OLED", desc: "Ultra-responsive LG C-series displays for the lowest input lag in the city." },
              { icon: Clock, title: "24/7 Gaming", desc: "Our Downtown branch never sleeps. Grind while the world rests." },
            ].map((f, i) => (
              <div key={i} className="reveal glass-panel p-10 rounded-[2.5rem] border border-white/5 hover:border-cyan-500/30 transition-all group">
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all">
                  <f.icon className="w-7 h-7 text-cyan-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{f.title}</h3>
                <p className="text-neutral-500 leading-relaxed font-medium">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pick Your Setup Section */}
      <section className="py-40 bg-white/[0.01]">
        <div className="container mx-auto px-8 text-center mb-24">
          <h2 className="reveal text-5xl lg:text-7xl font-black italic mb-6">PICK YOUR <span className="text-cyan-400">SETUP</span></h2>
          <p className="reveal text-neutral-500 text-lg font-medium">Choose the environment that fits your playstyle.</p>
        </div>

        <div className="container mx-auto px-8 grid md:grid-cols-2 gap-12 max-w-5xl">
          {[
            { title: "PC BASIC SETUP", price: "$5/hr", icon: Monitor, color: "from-blue-500" },
            { title: "CONSOLE STATION", price: "$8/hr", icon: Gamepad2, color: "from-cyan-400" },
          ].map((setup, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02 }}
              className="reveal relative p-12 rounded-[3rem] border border-white/10 glass-panel overflow-hidden group cursor-pointer h-[320px] flex flex-col justify-center items-center gap-6"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${setup.color} to-transparent opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
              <setup.icon className="w-16 h-16 text-cyan-400 mb-2" />
              <h3 className="text-3xl font-black tracking-tight italic">{setup.title}</h3>
              <div className="text-xl font-bold text-neutral-400">{setup.price}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tournament Section - The Fanned Deck */}
      <section className="py-40 relative min-h-screen flex flex-col items-center justify-center">
        <div className="absolute inset-0 bg-cyan-500/[0.02] pointer-events-none" />
        
        <div className="text-center mb-32 z-10">
          <div className="flex justify-center mb-6">
            <Trophy className="w-12 h-12 text-cyan-400 animate-pulse" />
          </div>
          <h2 className="reveal text-6xl lg:text-8xl font-black italic">PRO <span className="text-cyan-400">TOURNAMENTS</span></h2>
          <p className="reveal text-neutral-500 text-xl font-bold uppercase tracking-[0.3em] mt-4">Coming Soon</p>
        </div>

        <div className="relative flex items-center justify-center h-[500px] w-full max-w-6xl px-12">
          {[
            { title: "FC 24 OPEN", date: "MAY 15", prize: "$2,500", img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800" },
            { title: "TEKKEN 8 ARENA", date: "JUNE 02", prize: "$5,000", img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800" },
            { title: "STREET FIGHTER VI", date: "JUNE 20", prize: "$3,000", img: "https://images.unsplash.com/photo-1598550476439-6847785fce6b?auto=format&fit=crop&q=80&w=800" },
          ].map((t, i) => (
            <TournamentCard key={i} {...t} index={i} />
          ))}
        </div>
      </section>

      {/* Footer / Final CTA */}
      <section className="py-40 border-t border-white/5">
        <div className="container mx-auto px-8 text-center space-y-12">
          <h2 className="text-4xl lg:text-6xl font-black italic leading-tight">READY TO <br />JOIN THE ARENA?</h2>
          <Link
            to="/branches"
            className="inline-flex px-12 py-6 rounded-3xl bg-white text-black font-black text-xl hover:bg-cyan-400 transition-colors"
          >
            GET STARTED
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Landing;
