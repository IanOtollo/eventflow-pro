import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, DollarSign, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function generateTicketCode() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "IOM-";
  for (let i = 0; i < 8; i++) code += chars.charAt(Math.floor(Math.random() * chars.length));
  return code;
}

export default function EventDetail() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [quantity, setQuantity] = useState(1);

  const { data: event, isLoading } = useQuery({
    queryKey: ["event", id],
    queryFn: async () => {
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
      if (!user || !event) throw new Error("Not authenticated");
      const ticketCode = generateTicketCode();
      const totalPrice = Number(event.price) * quantity;
      const { error } = await supabase.from("bookings").insert({
        user_id: user.id,
        event_id: event.id,
        ticket_code: ticketCode,
        quantity,
        total_price: totalPrice,
      });
      if (error) throw error;
      return ticketCode;
    },
    onSuccess: (ticketCode) => {
      toast.success(`Ticket booked! Code: ${ticketCode}`);
      queryClient.invalidateQueries({ queryKey: ["event-bookings-count", id] });
      navigate("/dashboard");
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
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

  if (!event) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="flex flex-1 items-center justify-center">
          <p className="text-muted-foreground">Event not found.</p>
        </div>
      </div>
    );
  }

  const spotsLeft = event.capacity - (bookingCount ?? 0);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex-1 py-8">
        <div className="container max-w-4xl">
          <Button variant="ghost" size="sm" className="mb-6" onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-1.5 h-4 w-4" /> Back
          </Button>

          <div className="grid gap-8 md:grid-cols-5">
            {/* Left: details */}
            <div className="md:col-span-3">
              <div className="mb-6 aspect-[16/9] overflow-hidden rounded-xl bg-muted">
                {event.image_url ? (
                  <img src={event.image_url} alt={event.title} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-primary/5">
                    <Calendar className="h-16 w-16 text-muted-foreground/30" />
                  </div>
                )}
              </div>
              {event.category && (
                <span className="mb-3 inline-block rounded-full bg-accent/10 px-3 py-0.5 text-xs font-medium text-accent">
                  {event.category}
                </span>
              )}
              <h1 className="mb-4 font-display text-3xl font-bold">{event.title}</h1>
              <p className="whitespace-pre-wrap text-muted-foreground">{event.description || "No description provided."}</p>
            </div>

            {/* Right: booking card */}
            <div className="md:col-span-2">
              <div className="sticky top-24 rounded-xl border bg-card p-6 shadow-card">
                <div className="mb-6 space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="h-4 w-4 text-accent" />
                    <span>{format(new Date(event.date), "EEEE, MMM dd, yyyy · h:mm a")}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="h-4 w-4 text-accent" />
                    <span>{event.venue ? `${event.venue}, ` : ""}{event.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Users className="h-4 w-4 text-accent" />
                    <span>{spotsLeft > 0 ? `${spotsLeft} spots left` : "Sold out"}</span>
                  </div>
                </div>

                <div className="mb-4 rounded-lg bg-muted p-4 text-center">
                  <p className="text-sm text-muted-foreground">Price per ticket</p>
                  <p className="font-display text-3xl font-bold">
                    {Number(event.price) === 0 ? "Free" : `$${Number(event.price).toFixed(2)}`}
                  </p>
                </div>

                {user ? (
                  spotsLeft > 0 ? (
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="qty" className="text-sm">Quantity</Label>
                        <Input
                          id="qty"
                          type="number"
                          min={1}
                          max={Math.min(spotsLeft, 10)}
                          value={quantity}
                          onChange={(e) => setQuantity(Math.max(1, Math.min(Math.min(spotsLeft, 10), parseInt(e.target.value) || 1)))}
                          className="mt-1"
                        />
                      </div>
                      {Number(event.price) > 0 && (
                        <p className="text-sm text-muted-foreground">
                          Total: <span className="font-semibold text-foreground">${(Number(event.price) * quantity).toFixed(2)}</span>
                        </p>
                      )}
                      <Button
                        className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                        onClick={() => bookMutation.mutate()}
                        disabled={bookMutation.isPending}
                      >
                        {bookMutation.isPending ? "Booking..." : "Book Now"}
                      </Button>
                    </div>
                  ) : (
                    <Button disabled className="w-full">Sold Out</Button>
                  )
                ) : (
                  <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90" onClick={() => navigate("/login")}>
                    Sign in to Book
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
