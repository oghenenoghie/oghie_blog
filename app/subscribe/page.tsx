import NewsletterForm from "@/components/marketing/NewsletterForm";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, TrendingUp, Zap, Shield } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Subscribe | Oghie Blog — Free Weekly Marketing Digest",
  description: "Join 10,000+ marketers. Get AI-curated digital marketing insights, affiliate deal alerts, and SEO strategies every week — free.",
};

const PERKS = [
  { icon: TrendingUp, title: "Growth Strategies",   desc: "Proven tactics for scaling your affiliate income and organic traffic." },
  { icon: Zap,        title: "AI-Curated News",     desc: "The week's most important marketing news, filtered for relevance." },
  { icon: Shield,     title: "Honest Reviews",      desc: "Unbiased tools and program reviews with real affiliate data." },
  { icon: CheckCircle2, title: "Exclusive Deals",   desc: "Early access to affiliate program launches and limited promotions." },
];

export default function SubscribePage() {
  return (
    <>
      <Navbar />
      <main>
        <div style={{ background: "linear-gradient(135deg, var(--color-navy-950) 0%, #1E3A5F 100%)", padding: "5rem 0" }}>
          <div className="container-blog" style={{ maxWidth: "680px", textAlign: "center" }}>
            <Badge variant="gold" style={{ marginBottom: "1.25rem" }}>Free Newsletter</Badge>
            <h1 style={{ fontFamily: "var(--font-display), Georgia, serif", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 900, color: "#fff", lineHeight: 1.15, marginBottom: "1.25rem" }}>
              Level Up Your Marketing — Every Week
            </h1>
            <p style={{ fontSize: "1.0625rem", color: "var(--color-navy-300)", lineHeight: 1.7, marginBottom: "3rem", maxWidth: "46ch", margin: "0 auto 3rem" }}>
              Join 10,000+ digital marketers who get actionable insights, honest reviews, and affiliate deal alerts every Thursday.
            </p>

            <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "1rem", padding: "2.5rem", backdropFilter: "blur(8px)" }}>
              <NewsletterForm />
            </div>

            <p style={{ marginTop: "1.5rem", fontSize: "0.8125rem", color: "var(--color-navy-500)" }}>
              No spam. Unsubscribe in one click anytime.
            </p>
          </div>
        </div>

        {/* Perks */}
        <section style={{ padding: "5rem 0" }}>
          <div className="container-blog">
            <h2 style={{ fontFamily: "var(--font-display), Georgia, serif", fontSize: "1.75rem", fontWeight: 900, color: "var(--color-navy-900)", textAlign: "center", marginBottom: "3rem" }}>
              What You&apos;ll Get
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }}>
              {PERKS.map(({ icon: Icon, title, desc }) => (
                <div key={title} style={{ padding: "1.75rem", border: "1px solid var(--color-navy-100)", borderRadius: "0.875rem", backgroundColor: "#fff" }}>
                  <div style={{ width: "44px", height: "44px", borderRadius: "0.625rem", backgroundColor: "rgba(24,95,165,0.08)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                    <Icon size={22} style={{ color: "var(--color-signal-700)" }} aria-hidden="true" />
                  </div>
                  <h3 style={{ fontFamily: "var(--font-display), Georgia, serif", fontSize: "1.125rem", fontWeight: 700, color: "var(--color-navy-900)", marginBottom: "0.5rem" }}>{title}</h3>
                  <p style={{ fontSize: "0.9375rem", color: "var(--color-navy-500)", lineHeight: 1.65 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
