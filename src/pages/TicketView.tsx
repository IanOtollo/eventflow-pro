import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { QRCodeSVG } from "qrcode.react";
import { Calendar, MapPin, Ticket, CheckCircle2, XCircle } from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";

export default function TicketView() {
  const { bookingId } = useParams<{ bookingId: string }>();
  const { user } = useAuth();

  const { data: booking, isLoading } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("bookings")
        .select("*, events(*)")
        .eq("id", bookingId!)
        .eq("user_id", user!.id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!bookingId && !!user,
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="flex flex-1 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="flex flex-1 items-center justify-center">
          <p className="text-muted-foreground">Ticket not found.</p>
        </div>
      </div>
    );
  }

  const event = booking.events as any;

  return (
    <div className="flex min-h-screen flex-col bg-[#050505]">
      <Header />
      <div className="flex flex-1 items-center justify-center py-20 px-4 relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/20 blur-[120px] rounded-full pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md relative z-10"
        >
          <div className="overflow-hidden rounded-[2.5rem] border border-white/10 glass-panel shadow-2xl">
            {/* Ticket header */}
            <div className="bg-accent/10 px-8 py-10 text-center border-b border-white/5">
              <motion.p 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 0.6 }} 
                className="mb-3 text-[10px] font-black uppercase tracking-[0.3em] text-accent"
              >
                Official Digital Pass
              </motion.p>
              <h2 className="font-display text-3xl font-black text-foreground uppercase tracking-tight leading-tight">
                {event?.title ?? "Event"}
              </h2>
            </div>
  
            {/* Perforated divider with high-fidelity look */}
            <div className="relative h-12 flex items-center px-8">
              <div className="absolute -left-6 w-12 h-12 rounded-full bg-[#050505] border border-white/5" />
              <div className="absolute -right-6 w-12 h-12 rounded-full bg-[#050505] border border-white/5" />
              <div className="w-full border-t-2 border-dashed border-white/10" />
            </div>
  
            {/* Ticket body */}
            <div className="px-8 pb-10 pt-4">
              <div className="mb-10 grid grid-cols-2 gap-8 text-sm">
                <div className="space-y-1.5">
                  <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Date & Time</p>
                  <p className="font-semibold text-foreground leading-tight">
                    {event?.date ? format(new Date(event.date), "MMM dd, yyyy") : "N/A"}
                    <br />
                    <span className="text-muted-foreground font-normal">{event?.date ? format(new Date(event.date), "h:mm a") : ""}</span>
                  </p>
                </div>
                <div className="space-y-1.5">
                  <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Venue</p>
                  <p className="font-semibold text-foreground leading-tight">
                    {event?.venue ?? "TBA"}
                    <br />
                    <span className="text-muted-foreground font-normal">{event?.location ?? ""}</span>
                  </p>
                </div>
              </div>
  
              {/* QR Code Section - Apple Wallet Style */}
              <div className="flex flex-col items-center rounded-3xl bg-white/5 border border-white/5 p-8 mb-8 backdrop-blur-sm group transition-colors hover:bg-white/10">
                <div className="bg-white p-4 rounded-2xl shadow-inner group-hover:scale-105 transition-transform duration-500">
                  <QRCodeSVG
                    value={booking.ticket_code}
                    size={160}
                    level="H"
                    includeMargin={false}
                    bgColor="transparent"
                    fgColor="#000000"
                  />
                </div>
                <div className="mt-6 text-center">
                  <p className="font-mono text-lg font-black tracking-widest text-foreground/90 uppercase">{booking.ticket_code}</p>
                  <p className="mt-1 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Digital Signature Verified</p>
                </div>
              </div>
  
              <div className="flex items-center justify-between pt-6 border-t border-white/5">
                <div className="space-y-1">
                  <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Quantity</p>
                  <p className="font-display font-black text-xl text-foreground">{booking.quantity} Pass{booking.quantity > 1 ? 'es' : ''}</p>
                </div>
                <div className="text-right space-y-1">
                  <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Total Value</p>
                  <p className="font-display font-black text-xl text-accent">KSH {Number(booking.total_price).toLocaleString()}</p>
                </div>
              </div>
  
              {booking.is_used && (
                <div className="mt-8 rounded-xl bg-destructive/10 p-3 text-center border border-destructive/20">
                  <p className="text-xs font-bold text-destructive uppercase tracking-widest flex items-center justify-center gap-2">
                    <XCircle className="h-4 w-4" /> This ticket has been redeemed
                  </p>
                </div>
              )}
            </div>
          </div>
          
          <p className="mt-8 text-center text-xs text-muted-foreground/60 font-medium px-8 leading-relaxed">
            This is a premium digital asset of IOMBookings. Present this QR code at the entrance for instant verification.
          </p>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
