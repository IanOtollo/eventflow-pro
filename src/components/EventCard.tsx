import { Link } from "react-router-dom";
import { Calendar, MapPin, DollarSign } from "lucide-react";
import { format } from "date-fns";
import type { Tables } from "@/integrations/supabase/types";

interface EventCardProps {
  event: Tables<"events">;
}

export function EventCard({ event }: EventCardProps) {
  return (
    <Link
      to={`/events/${event.id}`}
      className="group block overflow-hidden rounded-xl border bg-card shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1"
    >
      <div className="aspect-[16/9] overflow-hidden bg-muted">
        {event.image_url ? (
          <img
            src={event.image_url}
            alt={event.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-primary/5">
            <Calendar className="h-12 w-12 text-muted-foreground/40" />
          </div>
        )}
      </div>
      <div className="p-5">
        {event.category && (
          <span className="mb-2 inline-block rounded-full bg-accent/10 px-3 py-0.5 text-xs font-medium text-accent">
            {event.category}
          </span>
        )}
        <h3 className="mb-2 font-display text-lg font-semibold text-foreground line-clamp-2 group-hover:text-accent transition-colors">
          {event.title}
        </h3>
        <div className="space-y-1.5 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-3.5 w-3.5" />
            {format(new Date(event.date), "MMM dd, yyyy · h:mm a")}
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5" />
            {event.location}
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="font-display text-lg font-bold text-foreground">
            {Number(event.price) === 0 ? "Free" : `$${Number(event.price).toFixed(2)}`}
          </span>
          <span className="text-xs font-medium text-accent group-hover:underline">
            View Details →
          </span>
        </div>
      </div>
    </Link>
  );
}
