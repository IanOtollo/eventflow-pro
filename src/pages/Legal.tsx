import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function Legal() {
  return (
    <div className="flex min-h-screen flex-col bg-[#050505]">
      <Header />
      <main className="flex-1 py-20 sm:py-28 px-6 sm:px-10">
        <section className="max-w-4xl mx-auto space-y-10">
          <div>
            <h1 className="font-display text-3xl sm:text-5xl font-black tracking-tighter text-white uppercase leading-[0.9] mb-4">
              Privacy & Terms
            </h1>
            <p className="text-sm sm:text-base font-medium text-white/40 leading-relaxed">
              IOMBookings is built for premium, invite-first productions. This page summarizes how we handle data and
              what you agree to when you use the platform.
            </p>
          </div>

          <div className="space-y-6 text-sm text-white/50 leading-relaxed">
            <div>
              <h2 className="mb-2 font-display text-lg font-bold text-white">Data & Tickets</h2>
              <p>
                We store only the information required to issue, verify and manage digital passes. Ticket codes are
                encrypted at rest and verified at the gate using QR technology.
              </p>
            </div>

            <div>
              <h2 className="mb-2 font-display text-lg font-bold text-white">Supabase & Security</h2>
              <p>
                Authentication and data storage are powered by Supabase. Role-based access and row-level security ensure
                guests can only see their own bookings while organizers retain full control of their showcases.
              </p>
            </div>

            <div>
              <h2 className="mb-2 font-display text-lg font-bold text-white">Contact</h2>
              <p>
                For takedown, privacy or partnership requests, email{" "}
                <a href="mailto:iombookings@gmail.com" className="underline underline-offset-4 text-accent">
                  iombookings@gmail.com
                </a>
                .
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

