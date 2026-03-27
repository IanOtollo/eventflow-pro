import { Link } from "react-router-dom";
import { Calendar, MapPin, Ticket, Star, Flame } from "lucide-react";
import { format } from "date-fns";
import type { Tables } from "@/integrations/supabase/types";
import { motion } from "framer-motion";

interface EventCardProps {
  event: Tables<"events">;
  index?: number;
}

export function EventCard({ event, index = 0 }: EventCardProps) {
  const price = Number(event.price);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Link
        to={`/events/${event.id}`}
        className="group relative block aspect-[16/20] overflow-hidden rounded-[2rem] sm:rounded-[3.5rem] bg-[#0A0A0A] border border-white/5 shadow-2xl transition-all duration-700 hover:border-accent/40 hover:shadow-accent/20 hover:-translate-y-2"
      >
        {/* Dynamic Background Image */}
        <div className="absolute inset-0 z-0">
          {event.image_url ? (
            <img
              src={event.image_url}
              alt={event.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-accent/5">
              <Ticket className="h-16 w-16 text-accent/20" />
            </div>
          )}
          {/* Glassmorphic Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-80 transition-opacity group-hover:opacity-90" />
        </div>

        {/* Top Badges */}
        <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 z-10 flex items-start justify-between">
          <div className="flex flex-col gap-2">
            {event.category && (
              <span className="inline-flex rounded-full bg-accent px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-accent-foreground shadow-lg">
                {event.category}
              </span>
            )}
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur-md px-3 py-1 text-[9px] font-black uppercase tracking-widest text-white/80 border border-white/5">
               <Star className="h-3 w-3 text-amber-400 fill-amber-400" /> Platinum Showcase
            </div>
            {index % 2 === 0 && (
              <div className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/20 backdrop-blur-md px-3 py-1 text-[9px] font-black uppercase tracking-widest text-rose-400 border border-rose-500/20">
                 <Flame className="h-3 w-3 animate-pulse" /> Selling Fast
              </div>
            )}
          </div>
          <div className="flex flex-col items-end">
             <div className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 p-3 text-center min-w-[70px] shadow-2xl">
                <span className="block text-[10px] font-black uppercase text-accent-cyan tracking-tighter">from</span>
                <span className="font-display text-xl font-black text-white leading-none">
                   {price === 0 ? "Free" : `KSH ${price.toLocaleString()}`}
                </span>
             </div>
          </div>
        </div>

        {/* Content Area - Bottom Aligned */}
        <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-6 pt-12 bg-gradient-to-t from-black via-black/80 to-transparent">
          <motion.div 
            className="transition-all duration-500 group-hover:-translate-y-1"
          >
            <h3 className="font-display text-xl font-bold leading-tight tracking-tight text-white uppercase group-hover:text-accent transition-colors">
              {event.title}
            </h3>
            
            <div className="mt-4 flex flex-col gap-2 text-[9px] font-bold uppercase tracking-[0.2em] text-white/40">
              <div className="flex items-center gap-2">
                <Calendar className="h-3 w-3 text-accent/60" />
                {format(new Date(event.date), "MMM dd, yyyy")}
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-3 w-3 text-accent/60" />
                {event.location}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
               <span className="text-[8px] font-black uppercase tracking-[0.3em] text-accent/40 group-hover:text-accent transition-colors">View Showcase</span>
               <div className="h-6 w-6 rounded-full bg-white/5 flex items-center justify-center text-white/20 group-hover:bg-accent group-hover:text-accent-foreground transition-all">
                  <Star className="h-3 w-3" />
               </div>
            </div>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
}
