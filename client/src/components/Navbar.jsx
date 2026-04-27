import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { LogOut, ShieldCheck, Palette, Menu, X, Gamepad2 } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = ({ onOpenAuth }) => {
  const { user, logout } = useAuth();
  const { themeName, setThemeName } = useTheme();
  const [showThemes, setShowThemes] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const getInitials = (u) => {
    if (!u) return "?";
    if (u.displayName) return u.displayName.charAt(0).toUpperCase();
    if (u.email) return u.email.charAt(0).toUpperCase();
    return "?";
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[100] h-16 sm:h-20 border-b border-white/5 backdrop-blur-xl bg-black/30">
        <div className="container mx-auto px-4 sm:px-6 h-full flex items-center justify-between gap-4">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 group-hover:scale-110 transition-transform">
              <Gamepad2 className="w-5 h-5 text-cyan-400" />
            </div>
            <span className="text-base sm:text-xl font-black tracking-tighter text-white">
              GAMERS <span className="text-cyan-400">DAN</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <Link to="/" className="text-sm font-semibold text-gray-400 hover:text-white transition-colors">Home</Link>
            <Link to="/branches" className="text-sm font-semibold text-gray-400 hover:text-white transition-colors">Branches</Link>
            {user && (
              <Link to="/my-bookings" className="text-sm font-semibold text-gray-400 hover:text-white transition-colors">
                My Bookings
              </Link>
            )}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Picker */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => setShowThemes(!showThemes)}
                className="p-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
                aria-label="Theme"
              >
                <Palette className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <AnimatePresence>
                {showThemes && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    className="absolute top-12 right-0 w-44 bg-[#0d0d1a] border border-white/10 p-2 rounded-2xl shadow-xl z-50"
                  >
                    {["cyberpunk", "minimal", "premium"].map((t) => (
                      <button
                        key={t}
                        onClick={() => { setThemeName(t); setShowThemes(false); }}
                        className={`w-full p-2.5 rounded-xl text-left text-sm font-bold capitalize transition-colors ${
                          themeName === t ? "bg-cyan-500 text-black" : "text-gray-300 hover:bg-white/5"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {user ? (
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Admin */}
                <Link to="/admin" className="hidden sm:flex p-2 rounded-xl border border-white/10 hover:bg-white/5 transition-colors">
                  <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
                </Link>
                {/* Avatar */}
                <div className="flex items-center gap-2 pl-2 sm:pl-3 border-l border-white/10">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || "User"}
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-cyan-500/50 object-cover"
                    />
                  ) : (
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-purple-500/50 bg-purple-500/20 flex items-center justify-center">
                      <span className="text-xs font-black text-purple-300">{getInitials(user)}</span>
                    </div>
                  )}
                  <span className="hidden lg:block text-xs text-gray-400 max-w-[100px] truncate font-medium">
                    {user.displayName || user.email}
                  </span>
                  <button
                    onClick={logout}
                    className="p-1.5 sm:p-2 rounded-xl text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                    aria-label="Sign out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="px-4 py-2 sm:px-6 sm:py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-xs sm:text-sm flex items-center gap-2 hover:from-purple-500 hover:to-blue-500 transition-all shadow-[0_0_20px_rgba(168,85,247,0.25)] hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] active:scale-95"
              >
                SIGN IN
              </button>
            )}

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="fixed top-16 left-0 w-full z-[99] bg-[#0a0a14]/95 backdrop-blur-xl border-b border-white/10 md:hidden"
          >
            <div className="flex flex-col p-4 gap-1">
              <Link to="/" onClick={() => setMobileOpen(false)} className="px-4 py-3 rounded-xl text-sm font-semibold text-gray-300 hover:text-white hover:bg-white/5 transition-colors">Home</Link>
              <Link to="/branches" onClick={() => setMobileOpen(false)} className="px-4 py-3 rounded-xl text-sm font-semibold text-gray-300 hover:text-white hover:bg-white/5 transition-colors">Branches</Link>
              {user && <Link to="/my-bookings" onClick={() => setMobileOpen(false)} className="px-4 py-3 rounded-xl text-sm font-semibold text-gray-300 hover:text-white hover:bg-white/5 transition-colors">My Bookings</Link>}
              {user && <Link to="/admin" onClick={() => setMobileOpen(false)} className="px-4 py-3 rounded-xl text-sm font-semibold text-amber-400 hover:bg-amber-500/10 transition-colors">Admin Panel</Link>}
              <div className="pt-2 border-t border-white/10 mt-1">
                <p className="px-4 py-1 text-xs text-gray-600 uppercase tracking-wider font-semibold">Theme</p>
                <div className="flex gap-2 px-4 pt-2">
                  {["cyberpunk", "minimal", "premium"].map((t) => (
                    <button
                      key={t}
                      onClick={() => { setThemeName(t); setMobileOpen(false); }}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold capitalize transition-colors ${
                        themeName === t ? "bg-cyan-500 text-black" : "bg-white/5 text-gray-400"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
