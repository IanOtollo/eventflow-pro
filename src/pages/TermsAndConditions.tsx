import { LegalPageLayout } from "@/components/LegalPageLayout";

export default function TermsAndConditions() {
  return (
    <LegalPageLayout
      title="Terms & Conditions"
      subtitle="Rules and responsibilities when using IOMBookings services."
    >
      <section className="space-y-3">
        <h2 className="font-display text-xl font-black text-white uppercase tracking-tight">1. Platform Usage</h2>
        <p>By using IOMBookings, you agree to provide accurate details and not misuse ticketing, account, or payment systems.</p>
      </section>
      <section className="space-y-3">
        <h2 className="font-display text-xl font-black text-white uppercase tracking-tight">2. Bookings and Payments</h2>
        <p>All bookings are confirmed only after successful payment and ticket generation. Prices and availability can change until confirmation.</p>
      </section>
      <section className="space-y-3">
        <h2 className="font-display text-xl font-black text-white uppercase tracking-tight">3. Access and Verification</h2>
        <p>Entry is subject to valid QR verification. Lost account access or suspicious activity may require identity verification before ticket recovery.</p>
      </section>
      <section className="space-y-3">
        <h2 className="font-display text-xl font-black text-white uppercase tracking-tight">4. Organizer and Venue Policies</h2>
        <p>Events and stays may have additional venue or partner rules (age limits, check-in policies, prohibited items). Those policies also apply.</p>
      </section>
      <section className="space-y-3">
        <h2 className="font-display text-xl font-black text-white uppercase tracking-tight">5. Contact</h2>
        <p>Questions about these terms can be sent to <a href="mailto:iombookings@gmail.com" className="text-accent underline underline-offset-4">iombookings@gmail.com</a>.</p>
      </section>
    </LegalPageLayout>
  );
}

