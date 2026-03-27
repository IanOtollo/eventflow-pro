import { LegalPageLayout } from "@/components/LegalPageLayout";

export default function PrivacyPolicy() {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      subtitle="How IOMBookings collects, stores, and protects your personal data."
    >
      <section className="space-y-3">
        <h2 className="font-display text-xl font-black text-white uppercase tracking-tight">1. Information We Collect</h2>
        <p>We collect account information (name, email), booking details, and transaction metadata required for ticketing, travel, and staycation services.</p>
      </section>
      <section className="space-y-3">
        <h2 className="font-display text-xl font-black text-white uppercase tracking-tight">2. Why We Use Your Data</h2>
        <p>Data is used to process bookings, issue QR tickets, provide support, detect fraud, and improve platform performance.</p>
      </section>
      <section className="space-y-3">
        <h2 className="font-display text-xl font-black text-white uppercase tracking-tight">3. Storage and Security</h2>
        <p>We use Supabase infrastructure and role-based access controls. Sensitive operations are protected using authentication, row-level security, and encrypted transport.</p>
      </section>
      <section className="space-y-3">
        <h2 className="font-display text-xl font-black text-white uppercase tracking-tight">4. Data Sharing</h2>
        <p>We do not sell personal data. We only share limited details with event/travel/stay partners when needed to fulfill your booking.</p>
      </section>
      <section className="space-y-3">
        <h2 className="font-display text-xl font-black text-white uppercase tracking-tight">5. Contact and Requests</h2>
        <p>For deletion, correction, or privacy requests, contact <a href="mailto:iombookings@gmail.com" className="text-accent underline underline-offset-4">iombookings@gmail.com</a>.</p>
      </section>
    </LegalPageLayout>
  );
}

