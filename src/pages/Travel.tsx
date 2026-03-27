import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Plane, MapPin } from "lucide-react";
import { CinematicLoading } from "@/components/CinematicLoading";

const FALLBACK_TRAVEL_PACKAGES = [
  {
    id: "t1",
    title: "Malindi Coastal Escape",
    desc: "Premium seaside retreat. Round-trip SGR/Flight transfers included with 4 nights of luxury.",
    price: 35000,
    hotel: "Whitehaven Resort, Watamu",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "t2",
    title: "Maasai Mara Sky Safari",
    desc: "Fly directly into the wild. Experience the majesty of the Mara with elite guides.",
    price: 85000,
    hotel: "Mara Elite Camp",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2068&auto=format&fit=crop",
  },
  {
    id: "t3",
    title: "Lamu Heritage Tour",
    desc: "Discover the soul of the Swahili coast. A private cultural immersion in the heart of Lamu.",
    price: 45000,
    hotel: "Majlis Resort",
    image: "https://images.unsplash.com/photo-1561037404-61cd46aa615b?q=80&w=2070&auto=format&fit=crop",
  },
];

export default function Travel() {
  const { data: travelEvents, isLoading } = useQuery({
    queryKey: ["travel-events"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("is_published", true)
        .ilike("category", "travel%");
      if (error) throw error;
      return data;
    },
  });

  const hasDynamicTravel = travelEvents && travelEvents.length > 0;

  if (isLoading) return <CinematicLoading />;

  return (
    <div className="flex min-h-screen flex-col bg-[#050505]">
      <Header />
      
      <main className="flex-1">
        <section className="relative overflow-hidden pt-24 sm:pt-40 pb-16 px-6">
          <div className="container relative z-10 text-center">
            <div className="mb-8 inline-flex items-center gap-3 rounded-full bg-accent/20 border border-accent/20 px-5 py-2 backdrop-blur-2xl">
               <Plane className="h-4 w-4 text-accent animate-bounce" />
               <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white">Global Voyages</span>
            </div>
            <h1 className="font-display text-4xl font-black leading-[0.8] tracking-tighter text-white uppercase sm:text-9xl mb-8">
               Premier <span className="text-accent italic">Travel</span>
            </h1>
            <p className="mt-8 text-[11px] sm:text-xl font-medium text-white/40 max-w-2xl mx-auto leading-relaxed uppercase tracking-widest">
               The sky is no longer the limit. Exclusive flight and luxury accommodation bundles curated for the elite explorer.
            </p>
          </div>
        </section>

        <section className="py-16 px-6">
          <div className="container grid gap-10 sm:gap-12 lg:grid-cols-3">
             {hasDynamicTravel
               ? travelEvents!.map((event, i) => (
               <motion.div 
                 key={event.id}
                 initial={{ opacity: 0, y: 30 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: i * 0.1 }}
                 className="group relative h-[500px] sm:h-[600px] overflow-hidden rounded-[2rem] sm:rounded-[3rem] border border-white/5 bg-[#080808]"
               >
                 <Link to={`/events/${event.id}`} className="absolute inset-0">
                   <img
                     src={event.image_url || "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2070&auto=format&fit=crop"}
                     alt={event.title}
                     className="h-full w-full object-cover opacity-60 transition-transform duration-1000 group-hover:scale-110"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
                      <div className="flex items-center gap-3 mb-6">
                         <MapPin className="h-4 w-4 text-accent" />
                         <span className="text-[10px] font-black uppercase tracking-widest text-white/60">
                           {event.venue || event.location}
                         </span>
                      </div>
                      <h3 className="font-display text-2xl sm:text-4xl font-black text-white uppercase tracking-tighter mb-3 sm:mb-4 line-clamp-2">
                        {event.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-white/40 mb-5 sm:mb-8 font-medium leading-relaxed line-clamp-3">
                        {event.description || "Curated premium travel experience powered by IOMBookings."}
                      </p>
                      <div className="flex flex-wrap items-end justify-between gap-4 pt-5 sm:pt-8 border-t border-white/5">
                         <div className="flex flex-col">
                            <span className="text-[8px] font-black uppercase tracking-widest text-accent mb-1">Total Package</span>
                            <span className="font-display text-2xl sm:text-3xl font-black text-white">
                              KSH {Number(event.price).toLocaleString()}
                            </span>
                         </div>
                         <Button
                           size="lg"
                           className="h-12 sm:h-16 rounded-2xl bg-white text-black font-black uppercase tracking-[0.2em] sm:tracking-widest text-[9px] sm:text-[10px] hover:bg-accent transition-all"
                         >
                           View & Book
                         </Button>
                      </div>
                   </div>
                 </Link>
               </motion.div>
             ))
             : FALLBACK_TRAVEL_PACKAGES.map((pkg, i) => (
               <motion.div 
                 key={pkg.id}
                 initial={{ opacity: 0, y: 30 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: i * 0.1 }}
                 className="group relative h-[500px] sm:h-[600px] overflow-hidden rounded-[2rem] sm:rounded-[3rem] border border-white/5 bg-[#080808]"
               >
                 <img src={pkg.image} alt={pkg.title} className="h-full w-full object-cover opacity-60 transition-transform duration-1000 group-hover:scale-110" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                 <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
                    <div className="flex items-center gap-3 mb-6">
                       <MapPin className="h-4 w-4 text-accent" />
                       <span className="text-[10px] font-black uppercase tracking-widest text-white/60">{pkg.hotel}</span>
                    </div>
                    <h3 className="font-display text-2xl sm:text-4xl font-black text-white uppercase tracking-tighter mb-3 sm:mb-4 line-clamp-2">{pkg.title}</h3>
                    <p className="text-xs sm:text-sm text-white/40 mb-5 sm:mb-8 font-medium leading-relaxed line-clamp-3">{pkg.desc}</p>
                    <div className="flex flex-wrap items-end justify-between gap-4 pt-5 sm:pt-8 border-t border-white/5">
                       <div className="flex flex-col">
                          <span className="text-[8px] font-black uppercase tracking-widest text-accent mb-1">Total Package</span>
                          <span className="font-display text-2xl sm:text-3xl font-black text-white">KSH {pkg.price.toLocaleString()}</span>
                       </div>
                       <Button
                         asChild
                         size="lg"
                         className="h-12 sm:h-16 rounded-2xl bg-white text-black font-black uppercase tracking-[0.2em] sm:tracking-widest text-[9px] sm:text-[10px] hover:bg-accent transition-all"
                       >
                         <a
                           href={`mailto:iombookings@gmail.com?subject=Travel%20Enquiry:%20${encodeURIComponent(
                             pkg.title,
                           )}&body=Hi%20IOMBookings,%0D%0A%0D%0AI'd%20like%20to%20book%20the%20${encodeURIComponent(
                             pkg.title,
                           )}%20package.%0D%0A%0D%0ARegards,%0D%0A`}
                         >
                           Book Package
                         </a>
                       </Button>
                    </div>
                 </div>
               </motion.div>
             ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
