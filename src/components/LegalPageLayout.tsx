import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";

interface LegalPageLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export function LegalPageLayout({ title, subtitle, children }: LegalPageLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-[#050505]">
      <Header />
      <main className="flex-1 py-20 sm:py-28 px-6 sm:px-10">
        <section className="max-w-5xl mx-auto">
          <div className="mb-12 space-y-4">
            <h1 className="font-display text-3xl sm:text-5xl font-black tracking-tighter text-white uppercase leading-[0.9]">
              {title}
            </h1>
            <p className="text-sm sm:text-base text-white/50 max-w-3xl leading-relaxed">{subtitle}</p>
            <div className="flex flex-wrap gap-3 pt-3">
              <Link to="/privacy-policy" className="rounded-full border border-white/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/60 hover:text-accent hover:border-accent/40 transition-colors">
                Privacy
              </Link>
              <Link to="/terms-and-conditions" className="rounded-full border border-white/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/60 hover:text-accent hover:border-accent/40 transition-colors">
                Terms
              </Link>
              <Link to="/cookie-policy" className="rounded-full border border-white/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/60 hover:text-accent hover:border-accent/40 transition-colors">
                Cookies
              </Link>
              <Link to="/refund-policy" className="rounded-full border border-white/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/60 hover:text-accent hover:border-accent/40 transition-colors">
                Refunds
              </Link>
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 sm:p-10 space-y-8 text-white/60 text-sm leading-relaxed">
            {children}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

