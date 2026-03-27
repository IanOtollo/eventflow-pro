import { Ticket, LayoutDashboard, Mail, Phone, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export function Footer() {
  const { isAdmin } = useAuth();
  return (
    <footer className="border-t border-white/5 bg-[#050505] py-32 relative overflow-hidden">
      {/* Dynamic background glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container relative z-10 px-6 sm:px-10">
        <div className="grid gap-20 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-10">
            <Link to="/" className="font-display text-4xl font-black tracking-tighter uppercase text-white group">
              IOM<span className="text-accent italic group-hover:text-accent-cyan transition-colors">Bookings</span>
            </Link>
            <p className="text-lg font-medium leading-relaxed text-white/40 max-w-xs">
              Direct booking, instant verification, and zero filler. The premier destination for large-scale concerts and exclusive gigs.
            </p>
            <div className="flex flex-col gap-6">
               <div className="space-y-2">
                 <p className="text-[10px] font-black uppercase tracking-[0.4em] text-accent">Strategic Contact</p>
                 <a href="mailto:iombookings@gmail.com" className="text-sm font-bold text-white hover:text-accent transition-colors flex items-center gap-3">
                   <Mail className="h-5 w-5" />
                   iombookings@gmail.com
                 </a>
               </div>
               <div className="space-y-2">
                 <p className="text-[10px] font-black uppercase tracking-[0.4em] text-purple-500">Official Line</p>
                 <a href="tel:+254700399641" className="text-sm font-bold text-white hover:text-purple-400 transition-colors flex items-center gap-3">
                   <Phone className="h-5 w-5" />
                   +254 700 399 641
                 </a>
               </div>
            </div>
          </div>

          <div>
            <h4 className="mb-10 font-display text-xs font-black uppercase tracking-[0.3em] text-white">Marketplace</h4>
            <ul className="space-y-6 text-xs font-black uppercase tracking-[0.2em] text-white/30">
              <li><Link to="/events" className="transition-all hover:text-accent hover:translate-x-1 inline-block flex items-center gap-2">Browse Gigs <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100" /></Link></li>
              <li><Link to="#" className="transition-all hover:text-accent hover:translate-x-1 inline-block">Featured Pass</Link></li>
              <li><Link to="#" className="transition-all hover:text-accent hover:translate-x-1 inline-block">Trending Now</Link></li>
              <li><Link to="#" className="transition-all hover:text-accent hover:translate-x-1 inline-block">Partner Events</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-10 font-display text-xs font-black uppercase tracking-[0.3em] text-white">Solutions</h4>
            <ul className="space-y-6 text-xs font-black uppercase tracking-[0.2em] text-white/30">
              <li><Link to="/signup" className="transition-all hover:text-purple-400 hover:translate-x-1 inline-block">Start Advertising</Link></li>
              <li><Link to="/admin" className="transition-all hover:text-purple-400 hover:translate-x-1 inline-block">Live Analytics</Link></li>
              <li><Link to="#" className="transition-all hover:text-purple-400 hover:translate-x-1 inline-block">POS Systems</Link></li>
              <li><Link to="#" className="transition-all hover:text-purple-400 hover:translate-x-1 inline-block">Privacy & Terms</Link></li>
            </ul>
          </div>

          <div className="lg:text-right">
            <div className="h-full flex flex-col justify-between">
              <div>
                <h4 className="mb-10 font-display text-xs font-black uppercase tracking-[0.3em] text-white">Paladium Empire</h4>
                <div className="inline-flex h-20 w-48 items-center justify-center rounded-3xl border border-white/10 bg-white/5 text-white/40 lg:ml-auto">
                   <Ticket className="h-6 w-6 mr-3 opacity-20" />
                   <span className="text-[10px] font-black uppercase tracking-[0.3em]">Direct Ticketing</span>
                </div>
              </div>
              <p className="mt-16 text-[10px] font-black uppercase tracking-[0.3em] text-white/20 leading-relaxed">
                © 2026 IOMBookings. <Link to={isAdmin ? "/admin" : "/login"} className="hover:text-accent transition-colors underline decoration-white/5 underline-offset-4">Command Center</Link><br/>
                All rights reserved. Powered by IOMTechs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
