import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut, LayoutDashboard, Menu, X, Ticket, Shield } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const { user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Prevent background scroll while the mobile menu is open.
  useEffect(() => {
    if (!mobileOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 glass-panel border-b-0">
      <div className="mx-auto flex w-full max-w-7xl h-16 sm:h-20 lg:h-32 items-center justify-between px-4 sm:px-6 lg:px-10">
        <Link to="/" className="flex items-center gap-4 font-display text-2xl sm:text-3xl lg:text-4xl font-black text-white group">
          <div className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 flex items-center justify-center rounded-xl sm:rounded-2xl bg-accent text-accent-foreground shadow-[0_0_30px_rgba(16,185,129,0.4)] transform group-hover:scale-110 transition-transform">
             <Ticket className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />
          </div>
          <span className="tracking-tighter uppercase sm:block hidden">IOM<span className="text-accent underline decoration-accent/20 underline-offset-8">Bookings</span></span>
          <span className="tracking-tighter uppercase sm:hidden text-2xl">IOM<span className="text-accent underline decoration-accent/20 underline-offset-4">B.</span></span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex flex-1 items-center justify-center gap-2">
          <Link to="/" className="px-6 py-3 text-[12px] font-black uppercase tracking-[0.4em] text-white/70 transition-all hover:text-accent hover:bg-white/5 rounded-full">
            Shows
          </Link>
          <Link to="/travel" className="px-6 py-3 text-[12px] font-black uppercase tracking-[0.4em] text-white/70 transition-all hover:text-accent hover:bg-white/5 rounded-full">
            Travel
          </Link>
          <Link to="/staycations" className="px-6 py-3 text-[12px] font-black uppercase tracking-[0.4em] text-white/70 transition-all hover:text-accent hover:bg-white/5 rounded-full">
            Staycations
          </Link>
          <Link to="/advertise" className="px-6 py-3 text-[12px] font-black uppercase tracking-[0.4em] text-white/70 transition-all hover:text-accent hover:bg-white/5 rounded-full">
            Advertise
          </Link>
          {isAdmin && (
            <Link to="/admin" className="px-6 py-3 text-[12px] font-black uppercase tracking-[0.4em] text-white/70 transition-all hover:text-accent hover:bg-white/5 rounded-full">
              Insights
            </Link>
          )}
        </nav>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:block h-6 w-px bg-white/10 mx-4" />
          <Button size="lg" className="hidden sm:inline-flex bg-accent text-accent-foreground font-black uppercase tracking-widest hover:scale-105 transition-transform rounded-full px-10 shadow-2xl shadow-accent/20 h-14 text-[11px]" asChild>
            <Link to="/advertise">Go Live</Link>
          </Button>
          
          {/* High-Impact Mobile Menu Toggle */}
          <button
            className="md:hidden h-12 w-12 sm:h-14 sm:w-14 flex items-center justify-center rounded-xl bg-accent text-accent-foreground border border-accent/60 hover:brightness-110 active:scale-95 transition-all shadow-[0_0_25px_rgba(16,185,129,0.5)]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-6 w-6 sm:h-7 sm:w-7" /> : <Menu className="h-6 w-6 sm:h-7 sm:w-7" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <AnimatePresence>
      {mobileOpen && (
        <>
          <motion.button
            type="button"
            aria-label="Close menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[98] bg-black/50 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed top-16 sm:top-20 inset-x-0 z-[100] px-4 md:hidden"
          >
            <div className="mx-auto max-w-2xl rounded-2xl border border-white/10 bg-[#0A0A0A]/95 backdrop-blur-xl shadow-2xl p-3">
              <nav className="flex flex-col gap-2">
                {[
                  { label: "Shows", path: "/" },
                  { label: "Travel", path: "/travel" },
                  { label: "Staycations", path: "/staycations" },
                  { label: "Advertise", path: "/advertise" },
                ].map((item) => (
                  <Link
                    key={item.label}
                    to={item.path}
                    className="rounded-xl border border-white/5 px-4 py-3 text-center text-[11px] font-black uppercase tracking-[0.28em] text-white/80 hover:text-accent hover:border-accent/40 transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="rounded-xl border border-accent/30 px-4 py-3 text-center text-[11px] font-black uppercase tracking-[0.28em] text-accent hover:bg-accent/10 transition-colors"
                  >
                    Insights
                  </Link>
                )}
                <Button className="mt-1 h-12 rounded-xl bg-accent text-accent-foreground font-black uppercase tracking-[0.24em] text-[10px]" asChild>
                  <Link to="/advertise">Go Live</Link>
                </Button>
              </nav>
            </div>
          </motion.div>
        </>
      )}
      </AnimatePresence>
    </header>
  );
}
