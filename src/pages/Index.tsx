import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { CinematicLoading } from "@/components/CinematicLoading";
import { Footer } from "@/components/Footer";
import { EventCard } from "@/components/EventCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Ticket, Sparkles, Zap, Flame, CalendarDays } from "lucide-react";
import { motion } from "framer-motion";

// High-fidelity fallback/mock event if DB is empty - Focus on "Advertising Clients"
export const MOCK_FEATURED = {
  id: "featured-1",
  title: "NEON ECHO: THE STADIUM TOUR",
  description: "Xperience Fun. Book the Moment. Live at the Kasarani Stadium for one night only of pure adrenaline.",
  image_url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop",
  date: "2026-08-15T20:00:00",
  location: "Nairobi, Kenya",
  venue: "Kasarani Stadium",
  price: 2500,
  capacity: 60000,
  category: "Concert",
  is_published: true
};

export const MOCK_EVENTS = [
  {
    id: "m1",
    title: "NAIROBI TECH SUMMIT 2026",
    description: "The biggest tech gathering in East Africa. Innovation meets opportunity.",
    date: "2026-06-12T09:00:00",
    location: "Nairobi, Kenya",
    venue: "KICC",
    price: 1500,
    capacity: 5000,
    category: "Tech & Business",
    image_url: "https://images.unsplash.com/photo-1540575861501-7ad060e29ad3?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "m2",
    title: "MOMBASA ARTS EXPO",
    description: "Celebrating the vibrant culture of the coast through art, dance, and food.",
    date: "2026-05-20T10:00:00",
    location: "Mombasa, Kenya",
    venue: "Fort Jesus",
    price: 0,
    capacity: 2000,
    category: "Culture",
    image_url: "https://images.unsplash.com/photo-1460518451285-cd7bc829857b?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "m3",
    title: "RIFT VALLEY BEATS",
    description: "An outdoor music festival by the lake. Pure vibes under the stars.",
    date: "2026-07-04T18:00:00",
    location: "Naivasha, Kenya",
    venue: "Lake Park",
    price: 3500,
    capacity: 3000,
    category: "Music",
    image_url: "https://images.unsplash.com/photo-1514525253361-bee8a48790c3?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "m4",
    title: "ELITE BFA SHOWCASE",
    description: "A high-fashion runway event showcasing the best of Kenyan designers.",
    date: "2026-09-10T11:00:00",
    location: "Nairobi, Kenya",
    venue: "Villa Rosa Kempinski",
    price: 5000,
    capacity: 500,
    category: "Fashion",
    image_url: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=2070&auto=format&fit=crop"
  }
];

const MOCK_TRAVEL = [
  { id: "t1", title: "Malindi Coastal Escape", price: 15500, image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2070&auto=format&fit=crop", tags: ["SGR", "Resort"] },
  { id: "t2", title: "Maasai Mara Safari", price: 45000, image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2068&auto=format&fit=crop", tags: ["Wilderness", "Luxury"] }
];

const MOCK_STAYCATIONS = [
  { id: "s1", title: "Watamu Beach Villa", price: 12500, image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2070&auto=format&fit=crop", tags: ["Boutique"] },
  { id: "s2", title: "Nairobi Sky Penthouse", price: 18500, image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop", tags: ["Urban"] }
];

export default function Index() {
  const { user } = useAuth();

  const { data: dbEvents, isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("is_published", true)
        .gte("date", new Date().toISOString())
        .order("date", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  const events = dbEvents && dbEvents.length > 0 ? dbEvents : MOCK_EVENTS;
  const featured = dbEvents && dbEvents.length > 0 ? dbEvents[0] : MOCK_FEATURED;

  // Daily Rotating Strategy: 3 Featured Events every 24 hours
  const dailySpotlight = useMemo(() => {
    const daySeed = Math.floor(new Date().setHours(0,0,0,0) / (1000 * 60 * 60 * 24));
    const all = [...events, ...events]; // Ensure we have enough for a slice
    const startIndex = daySeed % events.length;
    return all.slice(startIndex, startIndex + 3);
  }, [events]);

  if (isLoading) return <CinematicLoading />;

  return (
    <div className="flex min-h-screen flex-col bg-[#050505]">
      <Header />

      {/* Hero: Direct Event Advertisement (Madfun Style) */}
      <section className="relative w-full h-auto min-h-[950px] flex items-center pt-48 pb-32 overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <motion.img 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.8 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            src={featured.image_url || MOCK_FEATURED.image_url} 
            alt={featured.title} 
            className="w-full h-full object-cover"
          />
          {/* Intense cinematic gradient and light leaks */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/90 via-transparent to-transparent pointer-events-none" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/10 blur-[150px] rounded-full mix-blend-screen opacity-50" />
        </div>

        <div className="container relative z-10 w-full px-4 sm:px-10 pt-16 pb-12 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-3 rounded-full bg-accent/20 border border-accent/20 px-6 py-2 backdrop-blur-2xl mb-4">
               <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
               <span className="text-[9px] font-black uppercase tracking-[0.5em] text-white">XPERIENCE FUN THE FUN WAY</span>
            </div>
            <h1 className="font-display text-4xl font-black tracking-tighter text-white uppercase sm:text-6xl lg:text-7xl max-w-4xl mx-auto leading-[0.9]">
               Discover <span className="text-accent italic">Elite</span> Events
            </h1>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto"
          >
            {dailySpotlight.map((event, i) => (
              <div key={`${event.id}-${i}`} className="relative group perspective-1000">
                 <div className="absolute -top-3 -right-3 z-30 px-5 py-2.5 bg-accent rounded-full text-[9px] font-black text-black uppercase tracking-widest shadow-[0_10px_30px_rgba(16,185,129,0.5)] border border-black/10 transition-transform group-hover:scale-110">
                    Featured Spotlight
                 </div>
                 <EventCard event={event as any} index={i} />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Discovery Feed: Gigs & Events */}
      <section className="relative z-10 py-32 px-6 sm:px-10">
        <div className="container">
          <div className="mb-20 flex flex-col justify-between gap-12 lg:flex-row lg:items-end">
            <div>
              <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/5 bg-white/5 px-4 py-2 backdrop-blur-md">
                <Flame className="h-4 w-4 text-rose-500" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60">The Live Feed</span>
              </div>
              <h2 className="font-display text-6xl font-black tracking-tighter text-white uppercase sm:text-9xl">
                Upcoming <span className="text-white/10 italic">Gigs</span>
              </h2>
            </div>
            <div className="max-w-md space-y-4">
              <p className="text-lg font-medium text-white/40 leading-relaxed">
                Explore premier events across the spectrum. Direct booking, instant verification, and zero filler.
              </p>
              <div className="h-px w-full bg-gradient-to-r from-white/10 to-transparent" />
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {events.map((event, i) => (
              <EventCard key={event.id} event={event as any} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Travel Section */}
      <section className="relative z-10 py-32 px-6 sm:px-10 bg-[#080808]">
        <div className="container flex flex-col items-end text-right">
          <div className="mb-20">
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/5 bg-white/5 px-4 py-2 backdrop-blur-md">
              <Sparkles className="h-4 w-4 text-accent" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60">Global Voyages</span>
            </div>
            <h2 className="font-display text-6xl font-black tracking-tighter text-white uppercase sm:text-9xl">
              Premier <span className="text-white/10 italic">Travel</span>
            </h2>
          </div>

          <div className="grid w-full gap-8 sm:grid-cols-2">
            {MOCK_TRAVEL.map((item, i) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="group relative h-[400px] overflow-hidden rounded-[3rem] border border-white/5 bg-black"
              >
                <img src={item.image} alt={item.title} className="h-full w-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-10 text-left">
                  <div className="flex gap-2 mb-4">
                    {item.tags.map(tag => (
                      <span key={tag} className="text-[8px] font-black uppercase tracking-widest text-accent/60 px-2 py-1 rounded-full border border-accent/20">{tag}</span>
                    ))}
                  </div>
                  <h3 className="font-display text-3xl font-black text-white uppercase tracking-tighter mb-2">{item.title}</h3>
                  <div className="flex items-center justify-between mt-6">
                    <p className="font-display text-2xl font-black text-white/40 group-hover:text-white transition-colors">From KSH {item.price.toLocaleString()}</p>
                    <Button variant="ghost" className="rounded-full border border-white/10 text-[10px] font-black uppercase tracking-[0.3em] text-white/60 hover:bg-white hover:text-black">Book Trip</Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Staycations Section */}
      <section className="relative z-10 py-32 px-6 sm:px-10 bg-[#050505]">
        <div className="container">
           <div className="mb-20">
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/5 bg-white/5 px-4 py-2 backdrop-blur-md">
              <Zap className="h-4 w-4 text-purple-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60">Elite Retreats</span>
            </div>
            <h2 className="font-display text-6xl font-black tracking-tighter text-white uppercase sm:text-9xl">
              Luxury <span className="text-white/10 italic">Staycations</span>
            </h2>
          </div>

          <div className="grid gap-12 sm:grid-cols-2">
            {MOCK_STAYCATIONS.map((stay, i) => (
              <motion.div 
                key={stay.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="group relative h-[500px] overflow-hidden rounded-[4rem] border border-white/5"
              >
                <img src={stay.image} alt={stay.title} className="h-full w-full object-cover opacity-50 transition-all duration-1000 group-hover:scale-105 group-hover:opacity-70" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black" />
                <div className="absolute inset-x-0 bottom-0 p-12">
                   <p className="text-[10px] font-black uppercase tracking-[0.5em] text-accent mb-4">Elite Staycation</p>
                   <h3 className="font-display text-4xl font-black text-white uppercase tracking-tighter mb-8">{stay.title}</h3>
                   <div className="flex items-center justify-between pt-8 border-t border-white/5">
                     <span className="font-display text-3xl font-black text-white">KSH {stay.price.toLocaleString()} <span className="text-xs uppercase text-white/20 tracking-widest font-sans">/ Night</span></span>
                     <Button className="h-16 px-10 rounded-2xl bg-white text-black font-black uppercase tracking-[0.3em] text-[10px] hover:bg-accent transition-all">Secure Spot</Button>
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Organizer Pathway (Subtle) */}
      <section className="relative overflow-hidden py-40 px-6 sm:px-10 border-t border-white/5">
        <div className="container relative z-10">
          <div className="mx-auto max-w-6xl rounded-[4rem] border border-white/5 bg-[#080808] p-16 backdrop-blur-3xl md:p-32 text-center relative overflow-hidden group shadow-2xl">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/5 blur-[150px] rounded-full" />
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-5xl font-black leading-[0.9] tracking-tighter text-white uppercase sm:text-[7.5rem]">
                Elevate Your <span className="text-accent italic">Brand.</span>
              </h2>
              <p className="mt-12 text-xl font-medium text-white/40 max-w-3xl mx-auto leading-relaxed">
                Madfun competitors are redefined. Advertise your next gig on IOMBookings and reach the elite audience.
              </p>
              <div className="mt-20 flex flex-wrap justify-center gap-8">
                <Button size="lg" className="h-24 rounded-2xl bg-accent px-16 text-[10px] font-black uppercase tracking-[0.4em] text-accent-foreground hover:scale-105 transition-transform" asChild>
                   <Link to="/signup">Start Advertising</Link>
                </Button>
                <Link to="/pricing" className="flex h-24 items-center justify-center rounded-2xl border border-white/10 px-12 text-[10px] font-black uppercase tracking-[0.4em] text-white/40 hover:text-white transition-all bg-white/5 backdrop-blur-xl">
                  View Rates
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
