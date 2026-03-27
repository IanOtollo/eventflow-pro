import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Sparkles, Star, Zap } from "lucide-react";

const STAYCATIONS = [
  {
    id: "s1",
    title: "The Glass House",
    location: "Nanyuki, Kenya",
    price: 25000,
    tags: ["Modern", "Mountain View"],
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "s2",
    title: "Coastal Zen Sanctuary",
    location: "Kipini, Kenya",
    price: 18000,
    tags: ["Beachfront", "Eco-Friendly"],
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "s3",
    title: "The Urban Zenith",
    location: "Nairobi, Westlands",
    price: 12000,
    tags: ["City Lights", "Pool"],
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop"
  }
];

export default function Staycations() {
  return (
    <div className="flex min-h-screen flex-col bg-[#050505]">
      <Header />
      
      <main className="flex-1">
        <section className="relative overflow-hidden pt-24 sm:pt-40 pb-16 px-6">
          <div className="container relative z-10 text-center">
            <div className="mb-8 inline-flex items-center gap-3 rounded-full bg-accent/20 border border-accent/20 px-5 py-2 backdrop-blur-2xl">
               <Home className="h-4 w-4 text-accent animate-pulse" />
               <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white">Elite Retreats</span>
            </div>
            <h1 className="font-display text-4xl font-black leading-[0.8] tracking-tighter text-white uppercase sm:text-9xl mb-8">
               Luxury <span className="text-accent italic">Staycations</span>
            </h1>
            <p className="mt-8 text-[11px] sm:text-xl font-medium text-white/40 max-w-2xl mx-auto leading-relaxed uppercase tracking-widest">
               Escape the mundane. Discover Kenya's most architectural and hidden gems for the perfect weekend reset.
            </p>
          </div>
        </section>

        <section className="py-16 px-6">
          <div className="container grid gap-10 md:grid-cols-2">
             {STAYCATIONS.map((stay, i) => (
               <motion.div 
                 key={stay.id}
                 initial={{ opacity: 0, scale: 0.98 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ delay: i * 0.1 }}
                 className="group relative h-[450px] sm:h-[500px] overflow-hidden rounded-[2rem] sm:rounded-[4rem] border border-white/5 bg-[#080808]"
               >
                 <img src={stay.image} alt={stay.title} className="h-full w-full object-cover opacity-50 transition-all duration-1000 group-hover:scale-105 group-hover:opacity-75" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                 <div className="absolute inset-x-0 bottom-0 p-6 sm:p-12">
                    <div className="flex gap-2 mb-6">
                       {stay.tags.map(tag => (
                         <span key={tag} className="text-[8px] font-black uppercase tracking-widest text-accent/60 px-3 py-1 rounded-full border border-accent/20">{tag}</span>
                       ))}
                    </div>
                    <h3 className="font-display text-5xl font-black text-white uppercase tracking-tighter mb-2">{stay.title}</h3>
                    <p className="text-sm font-bold text-white/40 uppercase tracking-widest mb-10">{stay.location}</p>
                    <div className="flex items-center justify-between pt-10 border-t border-white/5">
                       <span className="font-display text-4xl font-black text-white">KSH {stay.price.toLocaleString()} <span className="text-xs uppercase text-white/20 tracking-widest font-sans">/ Night</span></span>
                       <Button size="lg" className="h-16 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-[10px] hover:bg-accent hover:scale-105 transition-all">Secure Spot</Button>
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
