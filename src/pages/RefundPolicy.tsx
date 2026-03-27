import { LegalPageLayout } from "@/components/LegalPageLayout";

export default function RefundPolicy() {
  return (
    <LegalPageLayout
      title="Refund Policy"
      subtitle="How refunds are handled for events, travel packages, and staycations."
    >
      <section className="space-y-3">
        <h2 className="font-display text-xl font-black text-white uppercase tracking-tight">1. Events</h2>
        <p>Event tickets are generally non-refundable unless an event is canceled, materially changed, or duplicated due to system error.</p>
      </section>
      <section className="space-y-3">
        <h2 className="font-display text-xl font-black text-white uppercase tracking-tight">2. Travel and Staycations</h2>
        <p>Refundability depends on partner terms, check-in windows, and package type. Applicable terms are shared at booking confirmation.</p>
      </section>
      <section className="space-y-3">
        <h2 className="font-display text-xl font-black text-white uppercase tracking-tight">3. Request Window</h2>
        <p>To request review, contact us within 7 days of purchase (or before check-in/event start, whichever comes first).</p>
      </section>
      <section className="space-y-3">
        <h2 className="font-display text-xl font-black text-white uppercase tracking-tight">4. Support Contact</h2>
        <p>Submit refund requests through <a href="mailto:iombookings@gmail.com" className="text-accent underline underline-offset-4">iombookings@gmail.com</a> with your booking code and reason.</p>
      </section>
    </LegalPageLayout>
  );
}

