import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { MOCK_EVENTS, MOCK_FEATURED } from "./Index";
import { useAuth } from "@/contexts/AuthContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Ticket, ArrowLeft, Sparkles, ShieldCheck } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { CinematicLoading } from "@/components/CinematicLoading";

function generateTicketCode() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "IOM-";
  for (let i = 0; i < 8; i++) code += chars.charAt(Math.floor(Math.random() * chars.length));
  return code;
}

export default function EventDetail() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [guestEmail, setGuestEmail] = useState("");
  const [guestName, setGuestName] = useState("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: event, isLoading } = useQuery({
    queryKey: ["event", id],
    queryFn: async () => {
      // Check for mock events first
      const allMocks = [...MOCK_EVENTS, MOCK_FEATURED];
      const mock = allMocks.find(m => m.id === id);
      if (mock) return mock;

      const { data, error } = await supabase.from("events").select("*").eq("id", id!).single();
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  const { data: bookingCount } = useQuery({
    queryKey: ["event-bookings-count", id],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("bookings")
        .select("*", { count: "exact", head: true })
        .eq("event_id", id!);
      if (error) return 0;
      return count ?? 0;
    },
    enabled: !!id,
  });

  const bookMutation = useMutation({
    mutationFn: async () => {
      if (!event) throw new Error("Showcase data missing");
      if (!guestEmail || !guestName) throw new Error("Please provide your name and contact email.");
      
      const ticketCode = generateTicketCode();
      const totalPrice = Number(event.price) * quantity;
      
      // Since global auth is removed, we use a guest identifier
      // In a real prod env, we'd store guest details in a separate table or metadata
      const { error } = await supabase.from("bookings").insert({
        user_id: user?.id || "00000000-0000-0000-0000-000000000000", // Fallback for guest
        event_id: event.id,
        ticket_code: ticketCode,
        quantity,
        total_price: totalPrice,
      });
      if (error) throw error;
      return { ticketCode, bookingId: null }; // Pass through
    },
    onSuccess: ({ ticketCode }) => {
      toast.success(`Ticket Secured! Code: ${ticketCode}`);
      queryClient.invalidateQueries({ queryKey: ["event-bookings-count", id] });
      // Redirect to a success/view ticket page (guest version)
      navigate("/");
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  if (isLoading) return <CinematicLoading />;

  if (!event) {
    return (
      <div className="flex min-h-screen flex-col bg-[#050505]">
        <Header />
        <div className="flex flex-1 items-center justify-center">
          <p className="text-white/20 uppercase font-black tracking-widest">Showcase not found.</p>
        </div>
      </div>
    );
  }

  const spotsLeft = event.capacity - (bookingCount ?? 0);

  return (
    <div className="flex min-h-screen flex-col bg-[#050505]">
      <Header />
      
      <main className="flex-1 py-16 sm:py-24 px-6 sm:px-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container max-w-7xl"
        >
          <Button variant="ghost" size="sm" className="mb-12 text-white/40 hover:text-white uppercase font-black tracking-widest" onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Showcase
          </Button>

          <div className="grid gap-16 lg:grid-cols-12">
            {/* Immersive Left Content */}
            <div className="lg:col-span-7 space-y-12">
              <div className="relative aspect-[16/9] overflow-hidden rounded-[2rem] sm:rounded-[3rem] border border-white/5 bg-[#0A0A0A] shadow-2xl">
                {event.image_url ? (
                  <img src={event.image_url} alt={event.title} className="h-full w-full object-cover opacity-80" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <Ticket className="h-20 w-20 text-white/5" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-3">
                   <span className="rounded-full bg-accent/20 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-accent border border-accent/20">
                     {event.category || "Premier Showcase"}
                   </span>
                   <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
                     <ShieldCheck className="h-4 w-4 text-purple-500" /> Verified Experience
                   </div>
                </div>
                <h1 className="font-display text-4xl sm:text-7xl lg:text-8xl font-black tracking-tighter text-white uppercase">
                  {event.title}
                </h1>
                <p className="text-xl font-medium text-white/40 leading-relaxed whitespace-pre-wrap max-w-3xl">
                  {event.description || "No specific details provided for this showcase walkthrough."}
                </p>
              </div>
            </div>

            {/* Premium Booking Card */}
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-32 rounded-[2.5rem] sm:rounded-[4.5rem] border border-white/10 bg-[#0A0A0A]/40 p-5 sm:p-10 backdrop-blur-3xl shadow-[0_40px_100px_rgba(0,0,0,0.5)]">
                <div className="mb-10 space-y-6">
                  <div className="flex items-center gap-4 text-sm font-bold text-white/60">
                    <div className="h-10 w-10 flex items-center justify-center rounded-2xl bg-white/5 border border-white/5">
                      <Calendar className="h-5 w-5 text-accent" />
                    </div>
                    <span>{format(new Date(event.date), "EEEE, MMM dd, yyyy · h:mm a")}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm font-bold text-white/60">
                    <div className="h-10 w-10 flex items-center justify-center rounded-2xl bg-white/5 border border-white/5">
                      <MapPin className="h-5 w-5 text-rose-500" />
                    </div>
                    <span>{event.venue ? `${event.venue}, ` : ""}{event.location}</span>
                  </div>
                </div>

                <div className="mb-10 rounded-[2rem] border border-white/5 bg-white/5 p-8 text-center">
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 mb-2">Price Per Pass</p>
                  <p className="font-display text-5xl font-black text-white">
                    {Number(event.price) === 0 ? "Complimentary" : `KSH ${Number(event.price).toLocaleString()}`}
                  </p>
                </div>

                {spotsLeft > 0 ? (
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 gap-6">
                      <div>
                        <Label htmlFor="guestName" className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-3 block">Full Name</Label>
                        <Input
                          id="guestName"
                          placeholder="Your Name"
                          value={guestName}
                          onChange={(e) => setGuestName(e.target.value)}
                          className="h-16 rounded-2xl border-white/5 bg-white/5 font-bold text-white focus-visible:ring-accent"
                        />
                      </div>
                      <div>
                        <Label htmlFor="guestEmail" className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-3 block">Email Address</Label>
                        <Input
                          id="guestEmail"
                          type="email"
                          placeholder="your@email.com"
                          value={guestEmail}
                          onChange={(e) => setGuestEmail(e.target.value)}
                          className="h-16 rounded-2xl border-white/5 bg-white/5 font-bold text-white focus-visible:ring-accent"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="qty" className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-3 block">Quantity</Label>
                      <Input
                        id="qty"
                        type="number"
                        min={1}
                        max={Math.min(spotsLeft, 10)}
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, Math.min(Math.min(spotsLeft, 10), parseInt(e.target.value) || 1)))}
                        className="h-16 rounded-2xl border-white/5 bg-white/5 text-lg font-bold text-white focus-visible:ring-accent"
                      />
                    </div>
                    
                    <Button
                      size="lg"
                      className="h-20 w-full rounded-2xl bg-white text-black font-black uppercase tracking-[0.4em] text-xs hover:bg-accent hover:scale-[1.02] transition-all shadow-2xl"
                      onClick={() => bookMutation.mutate()}
                      disabled={bookMutation.isPending}
                    >
                      {bookMutation.isPending ? "Confirming..." : "Get Tickets Now"}
                    </Button>
                    
                    <p className="text-[10px] text-center font-black uppercase tracking-[0.2em] text-white/20">
                       Zero Signup. Instant Booking.
                    </p>
                  </div>
                ) : (
                  <Button disabled className="h-20 w-full rounded-2xl border border-white/5 bg-white/5 text-xs font-black uppercase tracking-[0.3em] text-white/20">Sold Out</Button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
