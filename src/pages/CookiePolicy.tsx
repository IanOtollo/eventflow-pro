import { LegalPageLayout } from "@/components/LegalPageLayout";

export default function CookiePolicy() {
  return (
    <LegalPageLayout
      title="Cookie Policy"
      subtitle="How cookies and local storage are used to improve your experience."
    >
      <section className="space-y-3">
        <h2 className="font-display text-xl font-black text-white uppercase tracking-tight">1. Essential Cookies</h2>
        <p>We use essential cookies/local storage for session persistence, authentication, and secure browsing.</p>
      </section>
      <section className="space-y-3">
        <h2 className="font-display text-xl font-black text-white uppercase tracking-tight">2. Performance Data</h2>
        <p>Performance and error diagnostics may be captured to improve speed, reliability, and mobile responsiveness.</p>
      </section>
      <section className="space-y-3">
        <h2 className="font-display text-xl font-black text-white uppercase tracking-tight">3. Your Choices</h2>
        <p>You can clear cookies and local storage through browser settings, but some core features (logins, dashboards, bookings) may stop working.</p>
      </section>
    </LegalPageLayout>
  );
}

