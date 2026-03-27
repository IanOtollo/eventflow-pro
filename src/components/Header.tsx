import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut, LayoutDashboard, Menu, X, Ticket, Shield } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const { user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();
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
            className="md:hidden h-14 w-14 sm:h-16 sm:w-16 flex items-center justify-center rounded-2xl bg-white/10 border-2 border-white/20 text-white hover:bg-white/20 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <X className="h-8 w-8 sm:h-10 sm:w-10" /> : <Menu className="h-8 w-8 sm:h-10 sm:w-10" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <AnimatePresence>
      {mobileOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex flex-col bg-[#050505]/95 backdrop-blur-[50px] md:hidden overflow-y-auto pt-16 sm:pt-20"
        >
          {/* Animated Background Orbs */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/10 blur-[150px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 blur-[150px] rounded-full pointer-events-none" />

          <div className="relative z-10 flex flex-col w-full mx-auto min-h-full max-w-7xl px-6 py-10">
            <div className="flex items-center justify-between mb-12 sm:mb-20">
               <Link to="/" onClick={() => setMobileOpen(false)} className="font-display text-2xl font-black text-white uppercase tracking-tighter">
                 IOM<span className="text-accent underline decoration-accent/20 underline-offset-8 font-black uppercase">Bookings</span>
               </Link>
               <button 
                 onClick={() => setMobileOpen(false)} 
                 className="h-14 w-14 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-white shadow-2xl transition-transform active:scale-95"
               >
                  <X className="h-7 w-7" />
               </button>
            </div>

            <nav className="flex flex-col gap-5 sm:gap-6 mb-16">
              {[
                { label: "Shows", path: "/" },
                { label: "Travel", path: "/travel" },
                { label: "Staycations", path: "/staycations" },
                { label: "Advertise", path: "/advertise" }
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
                >
                  <Link 
                    to={item.path} 
                    onClick={() => setMobileOpen(false)} 
                    className="group relative w-full rounded-full"
                  >
                    <span className="block text-center font-display text-[12px] sm:text-[13px] font-black text-white/70 uppercase tracking-[0.4em] transition-all group-hover:text-accent py-4">
                       {item.label}
                       <motion.div 
                         initial={{ scaleX: 0 }}
                         whileHover={{ scaleX: 1 }}
                        className="h-0.5 w-2/3 bg-accent absolute bottom-[10px] left-1/2 -translate-x-1/2 origin-left"
                       />
                    </span>
                  </Link>
                </motion.div>
              ))}
              
              {isAdmin && (
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <Link 
                    to="/admin" 
                    onClick={() => setMobileOpen(false)} 
                    className="group relative w-full rounded-full"
                  >
                    <span className="block text-center font-display text-[12px] sm:text-[13px] font-black text-white/70 uppercase tracking-[0.4em] italic hover:text-accent py-4">
                      Insights
                      <motion.div
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        className="h-0.5 w-2/3 bg-accent absolute bottom-[10px] left-1/2 -translate-x-1/2 origin-left"
                      />
                    </span>
                  </Link>
                </motion.div>
              )}
            </nav>

            <div className="mt-auto space-y-10 border-t border-white/5 pt-12 pb-10">
               <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
                  <div className="space-y-4">
                     <p className="text-[10px] font-black uppercase tracking-[0.4em] text-accent">Experience Fun</p>
                     <p className="text-sm font-medium text-white/40 leading-relaxed max-w-[250px]">
                        Join the premier destination for world-class live entertainment.
                     </p>
                  </div>
                  <div className="space-y-4">
                     <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Official Enquiries</p>
                     <a href="mailto:iombookings@gmail.com" className="text-sm font-bold text-white hover:text-accent transition-colors block italic">iombookings@gmail.com</a>
                     <a href="tel:+254700399641" className="text-sm font-bold text-white hover:text-accent transition-colors block">+254 700 399 641</a>
                  </div>
               </div>

               <Button className="h-20 w-full rounded-2xl bg-accent text-accent-foreground font-black uppercase tracking-[0.3em] text-[11px] shadow-2xl shadow-accent/20 active:scale-[0.98] transition-all" asChild onClick={() => setMobileOpen(false)}>
                 <Link to="/advertise">Register New Production</Link>
               </Button>
            </div>
          </div>
        </motion.div>
      )}
      </AnimatePresence>
    </motion.header>
  );
}
