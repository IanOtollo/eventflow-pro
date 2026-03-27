import { Link } from "react-router-dom";
import { LegalPageLayout } from "@/components/LegalPageLayout";

export default function Legal() {
  return (
    <LegalPageLayout
      title="Legal Center"
      subtitle="All legal and policy documents for IOMBookings in one place."
    >
      <section className="space-y-3">
        <h2 className="font-display text-xl font-black text-white uppercase tracking-tight">Choose a policy</h2>
        <p>Use the links below to access complete documents for privacy, terms, cookies, and refunds.</p>
      </section>
      <div className="grid gap-4 sm:grid-cols-2">
        <Link to="/privacy-policy" className="rounded-2xl border border-white/10 bg-black/40 p-5 hover:border-accent/40 transition-colors">
          <p className="text-[11px] font-black uppercase tracking-[0.3em] text-accent">Privacy Policy</p>
          <p className="mt-2 text-sm text-white/60">How we collect, process, and protect user data.</p>
        </Link>
        <Link to="/terms-and-conditions" className="rounded-2xl border border-white/10 bg-black/40 p-5 hover:border-accent/40 transition-colors">
          <p className="text-[11px] font-black uppercase tracking-[0.3em] text-accent">Terms & Conditions</p>
          <p className="mt-2 text-sm text-white/60">Rules governing platform access, bookings, and usage.</p>
        </Link>
        <Link to="/cookie-policy" className="rounded-2xl border border-white/10 bg-black/40 p-5 hover:border-accent/40 transition-colors">
          <p className="text-[11px] font-black uppercase tracking-[0.3em] text-accent">Cookie Policy</p>
          <p className="mt-2 text-sm text-white/60">What browser storage we use and why.</p>
        </Link>
        <Link to="/refund-policy" className="rounded-2xl border border-white/10 bg-black/40 p-5 hover:border-accent/40 transition-colors">
          <p className="text-[11px] font-black uppercase tracking-[0.3em] text-accent">Refund Policy</p>
          <p className="mt-2 text-sm text-white/60">How refunds and cancellations are handled.</p>
        </Link>
      </div>
    </LegalPageLayout>
  );
}

