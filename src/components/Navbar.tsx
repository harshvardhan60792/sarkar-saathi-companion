import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import LanguageSelector from "./LanguageSelector";
import { Home, Grid3X3, MessageCircle, LayoutDashboard, Menu, X, LogIn, LogOut, User, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { tr } = useLanguage();
  const { user, signOut } = useAuth();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { to: "/", label: tr("home"), icon: Home },
    { to: "/schemes", label: tr("schemes"), icon: Grid3X3 },
    { to: "/assistant", label: tr("assistant"), icon: MessageCircle },
    { to: "/dashboard", label: tr("dashboard"), icon: LayoutDashboard },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass border-b border-glass shadow-lg"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      {/* Tricolor accent line */}
      <div className="tricolor-stripe w-full" />

      <div className="container max-w-7xl mx-auto flex items-center justify-between h-16 px-4 md:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="relative w-9 h-9 rounded-xl gradient-brand flex items-center justify-center shadow-brand pulse-ring">
            <span className="text-white font-bold text-lg font-['Space_Grotesk']">स</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-['Space_Grotesk'] font-bold text-lg text-white tracking-tight">
              Sarkar<span className="text-gradient-brand ml-1">Saathi</span>
            </span>
            <span className="text-[10px] text-muted-foreground tracking-widest uppercase">AI Companion</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => {
            const isActive = location.pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`relative flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "text-white"
                    : "text-muted-foreground hover:text-white hover:bg-white/5"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 gradient-brand rounded-xl opacity-20"
                    transition={{ type: "spring", duration: 0.4 }}
                  />
                )}
                {isActive && (
                  <div className="absolute inset-0 rounded-xl border border-[hsl(28_100%_54%/0.4)]" />
                )}
                <l.icon className={`h-4 w-4 ${isActive ? "text-[hsl(28,100%,64%)]" : ""}`} />
                <span className="relative">{l.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Right Controls */}
        <div className="hidden md:flex items-center gap-3">
          <LanguageSelector />
          {user ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl glass-light border border-glass text-sm text-muted-foreground">
                <div className="w-6 h-6 rounded-full gradient-brand flex items-center justify-center">
                  <User className="h-3.5 w-3.5 text-white" />
                </div>
                <span className="font-medium text-foreground">
                  {user.user_metadata?.full_name?.split(" ")[0] || user.email?.split("@")[0]}
                </span>
              </div>
              <button
                onClick={signOut}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:text-red-400 hover:bg-red-400/10 transition-all duration-200"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <Link
              to="/auth"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl gradient-brand text-white text-sm font-semibold shadow-brand hover:opacity-90 transition-all duration-200 group"
            >
              <Sparkles className="h-4 w-4 group-hover:rotate-12 transition-transform" />
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg glass-light border border-glass"
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <X className="h-5 w-5" />
              </motion.div>
            ) : (
              <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <Menu className="h-5 w-5" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden glass border-t border-glass"
          >
            <div className="p-4 space-y-1">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    location.pathname === l.to
                      ? "gradient-brand text-white shadow-brand"
                      : "text-muted-foreground hover:text-white hover:bg-white/5"
                  }`}
                >
                  <l.icon className="h-5 w-5" />
                  {l.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-glass">
                <LanguageSelector />
                {user ? (
                  <button
                    onClick={() => { signOut(); setOpen(false); }}
                    className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-400/10 w-full transition-all mt-2"
                  >
                    <LogOut className="h-5 w-5" />
                    Sign Out
                  </button>
                ) : (
                  <Link
                    to="/auth"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold gradient-brand text-white mt-2 shadow-brand"
                  >
                    <Sparkles className="h-5 w-5" />
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
