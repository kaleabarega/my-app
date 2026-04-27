import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

const themes = {
  cyberpunk: {
    name: "Neon Cyberpunk",
    bg: "bg-[#0a0a0a]",
    text: "text-white",
    accent: "text-cyan-400",
    border: "border-cyan-500/30",
    glow: "shadow-[0_0_20px_rgba(34,211,238,0.2)]",
    primary: "bg-cyan-500",
    secondary: "bg-fuchsia-600"
  },
  minimal: {
    name: "Minimal Dark",
    bg: "bg-[#111]",
    text: "text-neutral-200",
    accent: "text-white",
    border: "border-white/10",
    glow: "shadow-none",
    primary: "bg-white",
    secondary: "bg-neutral-800"
  },
  premium: {
    name: "Glass Premium",
    bg: "bg-[#0c0e1a]",
    text: "text-indigo-100",
    accent: "text-indigo-400",
    border: "border-indigo-500/20",
    glow: "shadow-[0_0_30px_rgba(99,102,241,0.15)]",
    primary: "bg-indigo-600",
    secondary: "bg-slate-800"
  }
};

export const ThemeProvider = ({ children }) => {
  const [themeName, setThemeName] = useState("cyberpunk");
  const theme = themes[themeName];

  return (
    <ThemeContext.Provider value={{ themeName, setThemeName, theme }}>
      <div className={`${theme.bg} ${theme.text} min-h-screen transition-colors duration-500`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
