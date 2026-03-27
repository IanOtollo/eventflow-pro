import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut, LayoutDashboard, Menu, X, Ticket, Shield } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const { user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="sticky top-0 z-50 glass-panel border-b-0"
    >
      <div className="container flex h-24 items-center justify-between">
        <Link to="/" className="flex items-center gap-4 font-display text-2xl font-black text-white group">
          <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-accent text-accent-foreground shadow-[0_0_20px_rgba(16,185,129,0.3)]">
             <Ticket className="h-5 w-5" />
          </div>
          <span className="tracking-tighter uppercase">IOM<span className="text-accent underline decoration-accent/20 underline-offset-8">Bookings</span></span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex flex-1 items-center justify-center gap-1">
          <Link to="/" className="px-5 py-2 text-[11px] font-black uppercase tracking-[0.4em] text-white/70 transition-all hover:text-accent hover:bg-white/5 rounded-full">
            Shows
          </Link>
          <Link to="/travel" className="px-5 py-2 text-[11px] font-black uppercase tracking-[0.4em] text-white/70 transition-all hover:text-accent hover:bg-white/5 rounded-full">
            Travel
          </Link>
          <Link to="/staycations" className="px-5 py-2 text-[11px] font-black uppercase tracking-[0.4em] text-white/70 transition-all hover:text-accent hover:bg-white/5 rounded-full">
            Staycations
          </Link>
          <Link to="/advertise" className="px-5 py-2 text-[11px] font-black uppercase tracking-[0.4em] text-white/70 transition-all hover:text-accent hover:bg-white/5 rounded-full">
            Advertise
          </Link>
          {isAdmin && (
            <Link to="/admin" className="px-5 py-2 text-[11px] font-black uppercase tracking-[0.4em] text-white/70 transition-all hover:text-accent hover:bg-white/5 rounded-full">
              Insights
            </Link>
          )}
        </nav>
        
        <div className="flex items-center gap-3">
          <div className="hidden lg:block h-4 w-px bg-white/10 mx-2" />
          <Button size="sm" className="bg-accent text-accent-foreground font-black uppercase tracking-widest hover:scale-105 transition-transform rounded-full px-6 sm:px-8 shadow-xl shadow-accent/20 h-10 sm:h-11 text-[9px] sm:text-[10px]" asChild>
            <Link to="/advertise">Go Live</Link>
          </Button>
          
          {/* Mobile toggle */}
          <button className="lg:hidden h-12 w-12 flex items-center justify-center rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <AnimatePresence>
      {mobileOpen && (
        <motion.div 
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed inset-0 z-[100] flex flex-col bg-[#050505] p-10 lg:hidden"
        >
          <div className="flex items-center justify-between mb-20">
             <Link to="/" onClick={() => setMobileOpen(false)} className="font-display text-2xl font-black text-white uppercase tracking-tighter">
               IOM<span className="text-accent underline decoration-accent/20 underline-offset-8">Bookings</span>
             </Link>
             <button onClick={() => setMobileOpen(false)} className="h-12 w-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white">
                <X className="h-6 w-6" />
             </button>
          </div>

          <nav className="flex flex-col gap-6 sm:gap-8">
            <Link to="/" onClick={() => setMobileOpen(false)} className="font-display text-3xl sm:text-5xl font-black text-white uppercase tracking-tighter hover:text-accent transition-colors">Shows</Link>
            <Link to="/travel" onClick={() => setMobileOpen(false)} className="font-display text-3xl sm:text-5xl font-black text-white uppercase tracking-tighter hover:text-accent transition-colors">Travel</Link>
            <Link to="/staycations" onClick={() => setMobileOpen(false)} className="font-display text-3xl sm:text-5xl font-black text-white uppercase tracking-tighter hover:text-accent transition-colors">Staycations</Link>
            <Link to="/advertise" onClick={() => setMobileOpen(false)} className="font-display text-3xl sm:text-5xl font-black text-white uppercase tracking-tighter hover:text-accent transition-colors">Advertise</Link>
            {isAdmin && <Link to="/admin" onClick={() => setMobileOpen(false)} className="font-display text-3xl sm:text-5xl font-black text-white uppercase tracking-tighter hover:text-accent transition-colors italic">Insights</Link>}
          </nav>

          <div className="mt-auto pt-10 border-t border-white/5 space-y-6 text-center">
             <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-8">Premium Event Marketplace</p>
             <Button className="h-20 w-full rounded-2xl bg-accent text-accent-foreground font-black uppercase tracking-widest text-[10px]" asChild onClick={() => setMobileOpen(false)}>
               <Link to="/advertise">Partner with Us</Link>
             </Button>
          </div>
        </motion.div>
      )}
      </AnimatePresence>
    </motion.header>
  );
}
