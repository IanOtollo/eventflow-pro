import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { QRCodeSVG } from "qrcode.react";
import { Calendar, MapPin, Ticket, CheckCircle2, XCircle } from "lucide-react";
import { format } from "date-fns";

export default function TicketView() {
  const { bookingId } = useParams<{ bookingId: string }>();
  const { user } = useAuth();

  const { data: booking, isLoading } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("bookings")
        .select("*, events(*)")
        .eq("id", bookingId!)
        .eq("user_id", user!.id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!bookingId && !!user,
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

  if (!booking) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="flex flex-1 items-center justify-center">
          <p className="text-muted-foreground">Ticket not found.</p>
        </div>
      </div>
    );
  }

  const event = booking.events as any;

  return (
    <div className="flex min-h-screen flex-col bg-muted">
      <Header />
      <div className="flex flex-1 items-center justify-center py-12 px-4">
        <div className="w-full max-w-md overflow-hidden rounded-2xl border bg-card shadow-elevated">
          {/* Ticket header */}
          <div className="bg-hero p-6 text-center text-primary-foreground">
            <p className="mb-1 text-xs font-medium uppercase tracking-widest opacity-70">IOMBookings</p>
            <h2 className="font-display text-xl font-bold">{event?.title ?? "Event"}</h2>
          </div>

          {/* Perforated divider */}
          <div className="relative">
            <div className="absolute -left-3 -top-3 h-6 w-6 rounded-full bg-muted" />
            <div className="absolute -right-3 -top-3 h-6 w-6 rounded-full bg-muted" />
            <div className="border-t border-dashed" />
          </div>

          {/* Ticket body */}
          <div className="p-6">
            <div className="mb-6 space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-accent" />
                <span>{event?.date ? format(new Date(event.date), "EEEE, MMM dd, yyyy · h:mm a") : "N/A"}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-accent" />
                <span>{event?.venue ? `${event.venue}, ` : ""}{event?.location ?? ""}</span>
              </div>
              <div className="flex items-center gap-3">
                <Ticket className="h-4 w-4 text-accent" />
                <span className="font-mono font-semibold">{booking.ticket_code}</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 mb-6">
              {booking.is_used ? (
                <span className="flex items-center gap-1.5 rounded-full bg-destructive/10 px-3 py-1 text-sm font-medium text-destructive">
                  <XCircle className="h-4 w-4" /> Used
                </span>
              ) : (
                <span className="flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-accent">
                  <CheckCircle2 className="h-4 w-4" /> Valid
                </span>
              )}
              <span className="rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">
                Qty: {booking.quantity}
              </span>
            </div>

            {/* QR Code */}
            <div className="flex flex-col items-center rounded-xl bg-muted p-6">
              <QRCodeSVG
                value={booking.ticket_code}
                size={180}
                level="H"
                includeMargin
                bgColor="transparent"
              />
              <p className="mt-3 text-xs text-muted-foreground">Scan to verify ticket</p>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4 text-center text-sm">
              <div className="rounded-lg bg-muted p-3">
                <p className="text-xs text-muted-foreground">Total Paid</p>
                <p className="font-display font-bold">${Number(booking.total_price).toFixed(2)}</p>
              </div>
              <div className="rounded-lg bg-muted p-3">
                <p className="text-xs text-muted-foreground">Booked On</p>
                <p className="font-display font-bold">{format(new Date(booking.created_at), "MMM dd")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
