import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { LogIn, LogOut, User, LayoutDashboard, ShieldCheck, Palette, Menu } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const { user, loginWithGoogle, logout } = useAuth();
  const { themeName, setThemeName, theme } = useTheme();
  const [showThemes, setShowThemes] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] h-20 border-b border-white/5 backdrop-blur-xl bg-black/20">
      <div className="container mx-auto px-6 h-full flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 group-hover:scale-110 transition-transform">
            <span className="text-xl font-black text-cyan-400 italic">G</span>
          </div>
          <span className="text-xl font-black tracking-tighter text-white">GAMERS <span className="text-cyan-400">DAN</span></span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-medium hover:text-cyan-400 transition-colors">Home</Link>
          <Link to="/branches" className="text-sm font-medium hover:text-cyan-400 transition-colors">Branches</Link>
          {user && <Link to="/my-bookings" className="text-sm font-medium hover:text-cyan-400 transition-colors text-white">Dashboard</Link>}
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <button 
              onClick={() => setShowThemes(!showThemes)}
              className="p-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
            >
              <Palette className="w-5 h-5" />
            </button>
            {showThemes && (
              <div className="absolute top-14 right-0 w-48 glass-panel p-2 rounded-2xl animate-in fade-in slide-in-from-top-2">
                {["cyberpunk", "minimal", "premium"].map((t) => (
                  <button
                    key={t}
                    onClick={() => { setThemeName(t); setShowThemes(false); }}
                    className={`w-full p-3 rounded-xl text-left text-sm font-bold capitalize ${themeName === t ? 'bg-cyan-500 text-black' : 'hover:bg-white/5'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            )}
          </div>

          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/admin" className="p-2 rounded-xl border border-white/10 hover:bg-white/5 transition-colors">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
              </Link>
              <div className="flex items-center gap-3 pl-4 border-l border-white/10">
                <img src={user.photoURL} alt={user.displayName} className="w-8 h-8 rounded-full border border-cyan-500/50" />
                <button onClick={logout} className="p-2 rounded-xl text-neutral-400 hover:text-white transition-colors">
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          ) : (
            <button 
              onClick={loginWithGoogle}
              className="px-6 py-2.5 rounded-xl bg-white text-black font-bold text-sm flex items-center gap-2 hover:bg-neutral-200 transition-colors"
            >
              <LogIn className="w-4 h-4" />
              SIGN IN
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
