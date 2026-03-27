import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { EventCard } from "@/components/EventCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { CalendarDays, Ticket, Shield, ArrowRight } from "lucide-react";

export default function Index() {
  const { user } = useAuth();

  const { data: events, isLoading } = useQuery({
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

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* Hero */}
      <section className="bg-hero px-4 py-20 text-center md:py-28">
        <div className="container max-w-3xl">
          <h1 className="mb-4 font-display text-4xl font-extrabold tracking-tight text-primary-foreground md:text-5xl lg:text-6xl">
            Discover & Book
            <br />
            <span className="text-gradient">Amazing Events</span>
          </h1>
          <p className="mb-8 text-lg text-primary-foreground/70">
            Find upcoming events, secure your tickets, and get instant QR-coded digital passes — all in one place.
          </p>
          {!user && (
            <div className="flex flex-wrap justify-center gap-3">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                <Link to="/signup">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                <Link to="/login">Sign In</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="border-b bg-card py-16">
        <div className="container grid gap-8 md:grid-cols-3">
          {[
            { icon: CalendarDays, title: "Browse Events", desc: "Explore curated events with detailed information and easy filtering." },
            { icon: Ticket, title: "Instant Tickets", desc: "Book seamlessly and receive QR-coded digital tickets instantly." },
            { icon: Shield, title: "Secure & Verified", desc: "Every ticket is unique, verified, and protected against reuse." },
          ].map((f) => (
            <div key={f.title} className="flex flex-col items-center rounded-xl border bg-background p-6 text-center shadow-card">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                <f.icon className="h-6 w-6 text-accent" />
              </div>
              <h3 className="mb-2 font-display text-lg font-semibold">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Events Grid */}
      <section className="flex-1 py-16">
        <div className="container">
          <div className="mb-10 text-center">
            <h2 className="mb-2 font-display text-3xl font-bold">Upcoming Events</h2>
            <p className="text-muted-foreground">Don't miss out on these upcoming experiences</p>
          </div>

          {isLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-80 animate-pulse rounded-xl bg-muted" />
              ))}
            </div>
          ) : events && events.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border bg-card p-12 text-center shadow-card">
              <CalendarDays className="mx-auto mb-4 h-12 w-12 text-muted-foreground/40" />
              <h3 className="mb-2 font-display text-lg font-semibold">No upcoming events</h3>
              <p className="text-sm text-muted-foreground">Check back soon for new events!</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
