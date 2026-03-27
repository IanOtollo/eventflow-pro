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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex flex-col bg-[#050505]/95 backdrop-blur-[50px] lg:hidden overflow-y-auto pt-safe-top"
        >
          {/* Animated Background Orbs */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/10 blur-[150px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 blur-[150px] rounded-full pointer-events-none" />

          <div className="container relative z-10 flex flex-col min-h-full px-6 py-10">
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

            <nav className="flex flex-col gap-6 sm:gap-8 mb-20">
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
                    className="group relative inline-block"
                  >
                    <span className="font-display text-4xl xs:text-5xl sm:text-7xl font-black text-white uppercase tracking-tighter transition-all group-hover:text-accent flex items-center gap-4">
                       {item.label}
                       <motion.div 
                         initial={{ scaleX: 0 }}
                         whileHover={{ scaleX: 1 }}
                         className="h-0.5 w-full bg-accent absolute bottom-0 left-0 origin-left"
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
                    className="font-display text-4xl xs:text-5xl sm:text-7xl font-black text-white/20 uppercase tracking-tighter italic hover:text-accent transition-colors"
                  >
                    Insights
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
