import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, Ticket, Eye, Sparkles, LayoutDashboard } from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { CinematicLoading } from "@/components/CinematicLoading";

export default function Dashboard() {
  const { user } = useAuth();

  const { data: bookings, isLoading } = useQuery({
    queryKey: ["my-bookings", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("bookings")
        .select("*, events(*)")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  if (isLoading) return <CinematicLoading />;

  return (
    <div className="flex min-h-screen flex-col bg-[#050505]">
      <Header />
      
      <main className="flex-1 py-24 px-6 sm:px-10">
        <div className="container max-w-6xl">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end"
          >
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-4 py-2 backdrop-blur-md">
                <LayoutDashboard className="h-4 w-4 text-accent" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60">Member Portal</span>
              </div>
              <h1 className="font-display text-5xl font-black tracking-tighter text-white uppercase sm:text-7xl">
                My <span className="text-white/20 italic">Dashboard</span>
              </h1>
            </div>
            <p className="max-w-xs text-sm font-medium text-white/30 leading-relaxed uppercase tracking-widest border-l border-white/10 pl-8">
              Your personal collection of digital passes and live event history.
            </p>
          </motion.div>

          {!isLoading && bookings && bookings.length > 0 ? (
            <div className="grid gap-8 lg:grid-cols-1">
              {bookings.map((booking, i) => {
                const event = booking.events as any;
                return (
                  <motion.div 
                    key={booking.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="group relative flex flex-col gap-8 rounded-[3rem] border border-white/5 bg-[#0A0A0A]/60 p-10 backdrop-blur-3xl transition-all hover:bg-white/[0.02] hover:border-accent/20 sm:flex-row sm:items-center sm:justify-between overflow-hidden"
                  >
                    {/* Inner Accent Glow */}
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent/5 blur-[80px] rounded-full group-hover:bg-accent/10 transition-colors" />
                    
                    <div className="flex-1 space-y-6 relative z-10">
                      <div className="flex items-center gap-3">
                         <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent/60">Ticket ID</span>
                         <span className="font-mono text-xs text-white/40 tracking-widest">{booking.ticket_code}</span>
                      </div>
                      <h3 className="font-display text-3xl font-bold text-white uppercase tracking-tight sm:text-4xl">{event?.title ?? "Unknown Event"}</h3>
                      
                      <div className="flex flex-wrap gap-8 text-[11px] font-black uppercase tracking-[0.2em] text-white/30">
                        <span className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-accent" />
                          {event?.date ? format(new Date(event.date), "MMM dd, yyyy") : "N/A"}
                        </span>
                        <span className="flex items-center gap-2">
                          <Sparkles className="h-4 w-4 text-purple-500" />
                          {booking.quantity} {booking.quantity > 1 ? 'Tickets' : 'Ticket'}
                        </span>
                      </div>

                      <div className="flex gap-4">
                        <span className={`inline-flex items-center rounded-2xl px-6 py-2 text-[10px] font-black uppercase tracking-[0.4em] ${booking.is_used ? "bg-white/5 text-white/20" : "bg-accent/10 text-accent border border-accent/20"}`}>
                          {booking.is_used ? "Redeemed" : "Active Pass"}
                        </span>
                        {!booking.is_used && (
                          <div className="h-2 w-2 rounded-full bg-accent animate-pulse mt-3" />
                        )}
                      </div>
                    </div>

                    <Button size="lg" className="h-20 px-12 rounded-2xl border border-white/5 bg-white/5 hover:bg-white hover:text-black font-black uppercase tracking-[0.4em] text-[10px] transition-all relative z-10" asChild>
                      <Link to={`/ticket/${booking.id}`}>
                        <Eye className="mr-3 h-4 w-4" />
                        Explore Pass
                      </Link>
                    </Button>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="rounded-[4rem] border border-white/5 bg-white/[0.02] py-40 text-center backdrop-blur-3xl">
              <Ticket className="mx-auto mb-10 h-24 w-24 text-white/5" />
              <h3 className="mb-4 font-display text-4xl font-black uppercase text-white/20 tracking-tighter">No Active Passes</h3>
              <p className="mb-12 text-sm font-black uppercase tracking-[0.2em] text-white/10">Browse the showcase to get your first ticket</p>
              <Button size="lg" className="h-20 rounded-2xl bg-accent px-12 text-[10px] font-black uppercase tracking-[0.4em] text-accent-foreground" asChild>
                <Link to="/">Browse Showcases</Link>
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
