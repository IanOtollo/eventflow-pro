import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Plane, MapPin, Star, Sparkles } from "lucide-react";

const TRAVEL_PACKAGES = [
  {
    id: "t1",
    title: "Malindi Coastal Escape",
    desc: "Premium seaside retreat. Round-trip SGR/Flight transfers included with 4 nights of luxury.",
    price: 35000,
    hotel: "Whitehaven Resort, Watamu",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "t2",
    title: "Maasai Mara Sky Safari",
    desc: "Fly directly into the wild. Experience the majesty of the Mara with elite guides.",
    price: 85000,
    hotel: "Mara Elite Camp",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2068&auto=format&fit=crop"
  },
  {
    id: "t3",
    title: "Lamu Heritage Tour",
    desc: "Discover the soul of the Swahili coast. A private cultural immersion in the heart of Lamu.",
    price: 45000,
    hotel: "Majlis Resort",
    image: "https://images.unsplash.com/photo-1561037404-61cd46aa615b?q=80&w=2070&auto=format&fit=crop"
  }
];

export default function Travel() {
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
             {TRAVEL_PACKAGES.map((pkg, i) => (
               <motion.div 
                 key={pkg.id}
                 initial={{ opacity: 0, y: 30 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: i * 0.1 }}
                 className="group relative h-[500px] sm:h-[600px] overflow-hidden rounded-[2rem] sm:rounded-[3rem] border border-white/5 bg-[#080808]"
               >
                 <img src={pkg.image} alt={pkg.title} className="h-full w-full object-cover opacity-60 transition-transform duration-1000 group-hover:scale-110" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                 <div className="absolute inset-x-0 bottom-0 p-10">
                    <div className="flex items-center gap-3 mb-6">
                       <MapPin className="h-4 w-4 text-accent" />
                       <span className="text-[10px] font-black uppercase tracking-widest text-white/60">{pkg.hotel}</span>
                    </div>
                    <h3 className="font-display text-4xl font-black text-white uppercase tracking-tighter mb-4">{pkg.title}</h3>
                    <p className="text-sm text-white/40 mb-8 font-medium leading-relaxed">{pkg.desc}</p>
                    <div className="flex items-center justify-between pt-8 border-t border-white/5">
                       <div className="flex flex-col">
                          <span className="text-[8px] font-black uppercase tracking-widest text-accent mb-1">Total Package</span>
                          <span className="font-display text-3xl font-black text-white">KSH {pkg.price.toLocaleString()}</span>
                       </div>
                       <Button size="lg" className="h-16 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-[10px] hover:bg-accent transition-all">Book Package</Button>
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
