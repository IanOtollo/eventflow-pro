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
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
    >
      <Link
        to={`/events/${event.id}`}
        className="group relative block min-h-[430px] sm:min-h-0 aspect-[16/20] overflow-hidden rounded-[2rem] sm:rounded-[3.5rem] bg-[#0A0A0A] border border-white/5 shadow-2xl transition-all duration-700 hover:border-accent/40 hover:shadow-accent/20 hover:-translate-y-2"
      >
        {/* Dynamic Background Image */}
        <div className="absolute inset-0 z-0">
          {event.image_url ? (
            <img
              src={event.image_url}
              alt={event.title}
              loading="lazy"
              decoding="async"
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
        <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 z-10 flex items-start justify-between gap-2">
          <div className="flex flex-col gap-1.5 sm:gap-2 max-w-[60%]">
            {event.category && (
              <span className="inline-flex w-fit rounded-full bg-accent px-3 sm:px-5 py-1.5 sm:py-2 text-[9px] sm:text-[11px] font-black uppercase tracking-[0.14em] sm:tracking-[0.2em] text-accent-foreground shadow-lg truncate max-w-full">
                {event.category}
              </span>
            )}
            <div className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur-md px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-white border border-white/5">
               <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" /> Platinum Showcase
            </div>
            {index % 2 === 0 && (
              <div className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-rose-500/20 backdrop-blur-md px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-rose-400 border border-rose-500/20">
                 <Flame className="h-3.5 w-3.5 animate-pulse" /> Selling Fast
              </div>
            )}
          </div>
          <div className="flex flex-col items-end">
             <div className="rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 p-2.5 sm:p-4 text-center min-w-[78px] sm:min-w-[90px] shadow-2xl">
                <span className="block text-[8px] sm:text-[10px] font-black uppercase text-accent-cyan tracking-tighter mb-0.5">from</span>
                <span className="font-display text-base sm:text-2xl font-black text-white leading-none">
                   {price === 0 ? "Free" : `KSH ${price.toLocaleString()}`}
                </span>
             </div>
          </div>
        </div>

        {/* Content Area - Bottom Aligned */}
        <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-8 pt-14 sm:pt-16 bg-gradient-to-t from-black via-black/90 to-transparent">
          <motion.div 
            className="transition-all duration-500 group-hover:-translate-y-1"
          >
            <h3 className="font-display text-xl sm:text-2xl font-black leading-tight tracking-tight text-white uppercase group-hover:text-accent transition-colors line-clamp-2 text-balance lg:text-3xl">
              {event.title}
            </h3>
            
            <div className="mt-4 sm:mt-6 flex flex-col gap-2.5 sm:gap-3 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.12em] sm:tracking-[0.2em] text-white/50 group-hover:text-white/80 transition-colors">
              <div className="flex items-center gap-2 sm:gap-3">
                <Calendar className="h-4 w-4 sm:h-4.5 sm:w-4.5 text-accent shrink-0" />
                {format(new Date(event.date), "MMM dd, yyyy")}
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <MapPin className="h-4 w-4 sm:h-4.5 sm:w-4.5 text-accent shrink-0" />
                <span className="line-clamp-1">{event.location}</span>
              </div>
            </div>

            <div className="mt-6 sm:mt-10 flex items-center justify-between border-t border-white/5 pt-5 sm:pt-8 pb-1 sm:pb-2">
               <span className="text-[9px] sm:text-[11px] font-black uppercase tracking-[0.2em] sm:tracking-[0.4em] text-accent group-hover:text-accent transition-colors">Experience Now</span>
               <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl sm:rounded-2xl bg-white/5 flex items-center justify-center text-white/20 group-hover:bg-accent group-hover:text-accent-foreground transition-all shadow-xl shadow-black/40">
                  <Ticket className="h-5 w-5 sm:h-6 sm:w-6" />
               </div>
            </div>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
}
