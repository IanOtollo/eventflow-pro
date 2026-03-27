import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, Ticket, Eye } from "lucide-react";
import { format } from "date-fns";

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

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex-1 py-8">
        <div className="container max-w-4xl">
          <h1 className="mb-2 font-display text-3xl font-bold">My Dashboard</h1>
          <p className="mb-8 text-muted-foreground">View your booked events and tickets</p>

          {isLoading ? (
            <div className="space-y-4">
              {[1, 2].map((i) => <div key={i} className="h-24 animate-pulse rounded-xl bg-muted" />)}
            </div>
          ) : bookings && bookings.length > 0 ? (
            <div className="space-y-4">
              {bookings.map((booking) => {
                const event = booking.events as any;
                return (
                  <div key={booking.id} className="flex flex-col gap-4 rounded-xl border bg-card p-5 shadow-card sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex-1">
                      <h3 className="font-display text-lg font-semibold">{event?.title ?? "Unknown Event"}</h3>
                      <div className="mt-1 flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" />
                          {event?.date ? format(new Date(event.date), "MMM dd, yyyy") : "N/A"}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Ticket className="h-3.5 w-3.5" />
                          {booking.ticket_code}
                        </span>
                      </div>
                      <div className="mt-2 flex gap-2">
                        <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${booking.is_used ? "bg-muted text-muted-foreground" : "bg-accent/10 text-accent"}`}>
                          {booking.is_used ? "Used" : "Valid"}
                        </span>
                        <span className="inline-block rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
                          Qty: {booking.quantity}
                        </span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/ticket/${booking.id}`}>
                        <Eye className="mr-1.5 h-4 w-4" />
                        View Ticket
                      </Link>
                    </Button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="rounded-xl border bg-card p-12 text-center shadow-card">
              <Ticket className="mx-auto mb-4 h-12 w-12 text-muted-foreground/40" />
              <h3 className="mb-2 font-display text-lg font-semibold">No bookings yet</h3>
              <p className="mb-4 text-sm text-muted-foreground">Browse events and book your first ticket!</p>
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                <Link to="/">Browse Events</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
