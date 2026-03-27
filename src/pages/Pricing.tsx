import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sparkles, TrendingUp, ShieldCheck } from "lucide-react";

export default function Pricing() {
  return (
    <div className="flex min-h-screen flex-col bg-[#050505]">
      <Header />
      <main className="flex-1 py-20 sm:py-28 px-6 sm:px-10">
        <section className="max-w-5xl mx-auto">
          <div className="mb-10 sm:mb-16 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 border border-accent/20">
              <TrendingUp className="h-4 w-4 text-accent" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent">Transparent Rates</span>
            </div>
            <h1 className="mt-6 font-display text-4xl sm:text-6xl lg:text-7xl font-black tracking-tighter text-white uppercase leading-[0.9]">
              Showcase <span className="text-accent italic">Pricing</span>
            </h1>
            <p className="mt-6 text-sm sm:text-base font-medium text-white/40 max-w-xl mx-auto leading-relaxed">
              Simple, production-first pricing. No hidden fees. You keep more of every ticket.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 flex flex-col gap-6">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">Standard Shows</p>
              <h2 className="font-display text-3xl font-black text-white">5% per ticket</h2>
              <ul className="space-y-2 text-sm text-white/60">
                <li>• Full QR ticketing engine</li>
                <li>• Basic analytics dashboard</li>
                <li>• Mobile-first guest experience</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-accent/40 bg-accent/10 p-8 flex flex-col gap-6 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent/30 blur-3xl rounded-full" />
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-accent">Premier Concerts</p>
              <h2 className="font-display text-3xl font-black text-white">3.5% per ticket</h2>
              <ul className="space-y-2 text-sm text-white/70">
                <li>• Dedicated performance tuning</li>
                <li>• Priority support for gate teams</li>
                <li>• Custom landing layouts</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 flex flex-col gap-6">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">Travel & Staycations</p>
              <h2 className="font-display text-3xl font-black text-white">Custom retainers</h2>
              <ul className="space-y-2 text-sm text-white/60">
                <li>• Bundled trip / stay management</li>
                <li>• White-label confirmations</li>
                <li>• API access for partners</li>
              </ul>
            </div>
          </div>

          <div className="mt-16 rounded-[2.5rem] border border-white/10 bg-white/[0.02] p-8 sm:p-12 flex flex-col sm:flex-row gap-8 items-center justify-between">
            <div className="space-y-4 max-w-xl">
              <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-white/30">
                <ShieldCheck className="h-4 w-4 text-emerald-400" /> Settlement & Security
              </div>
              <p className="text-sm sm:text-base text-white/60 leading-relaxed">
                Settlement flows, payouts and contracts are handled directly with our team. Talk to us and we’ll tailor
                a rate for your brand, capacity and calendar.
              </p>
            </div>
            <Button
              asChild
              size="lg"
              className="h-16 sm:h-20 rounded-2xl bg-accent text-accent-foreground font-black uppercase tracking-[0.3em] text-[10px] px-10"
            >
              <a href="mailto:iombookings@gmail.com?subject=Pricing%20Enquiry">Talk To Sales</a>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

