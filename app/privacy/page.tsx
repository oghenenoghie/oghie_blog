import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Oghie Blog",
  description:
    "Privacy Policy for Oghie Blog — how we collect, use, and protect your personal information.",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: "2.5rem" }}>
      <h2
        style={{
          fontFamily: "var(--font-display), Georgia, serif",
          fontSize: "1.25rem",
          fontWeight: 800,
          color: "var(--color-navy-900)",
          marginBottom: "1rem",
          paddingBottom: "0.5rem",
          borderBottom: "2px solid var(--color-navy-100)",
        }}
      >
        {title}
      </h2>
      <div
        style={{
          fontSize: "0.9375rem",
          lineHeight: 1.8,
          color: "var(--color-navy-700)",
        }}
      >
        {children}
      </div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <>
      <Navbar />

      <main>
        {/* Header */}
        <div
          style={{
            backgroundColor: "var(--color-navy-950)",
            padding: "3.5rem 0 3rem",
            borderBottom: "3px solid var(--color-gold-500)",
          }}
        >
          <div className="container-blog" style={{ maxWidth: "720px" }}>
            <span
              style={{
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--color-gold-500)",
                display: "block",
                marginBottom: "0.875rem",
              }}
            >
              Legal
            </span>
            <h1
              style={{
                fontFamily: "var(--font-display), Georgia, serif",
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                fontWeight: 900,
                color: "#fff",
                marginBottom: "0.75rem",
              }}
            >
              Privacy Policy
            </h1>
            <p style={{ color: "var(--color-navy-400)", fontSize: "0.875rem" }}>
              Last updated: June 2025
            </p>
          </div>
        </div>

        {/* Body */}
        <div style={{ backgroundColor: "#fff", padding: "4rem 0" }}>
          <div className="container-blog" style={{ maxWidth: "720px" }}>
            <Section title="1. Introduction">
              <p>
                Oghie Blog (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting your
                privacy. This Privacy Policy explains how we collect, use,
                disclose, and safeguard your information when you visit our
                website at oghieblog.com (the &quot;Site&quot;) or subscribe to our
                newsletter.
              </p>
              <p style={{ marginTop: "0.75rem" }}>
                Please read this policy carefully. If you disagree with its terms,
                please discontinue use of the Site.
              </p>
            </Section>

            <Section title="2. Information We Collect">
              <p><strong>Information you provide directly:</strong></p>
              <ul style={{ paddingLeft: "1.25rem", marginTop: "0.5rem", display: "flex", flexDirection: "column", gap: "0.375rem" }}>
                <li>Email address and name when subscribing to our newsletter</li>
                <li>Contact form submissions (name, email, message)</li>
              </ul>
              <p style={{ marginTop: "1rem" }}><strong>Information collected automatically:</strong></p>
              <ul style={{ paddingLeft: "1.25rem", marginTop: "0.5rem", display: "flex", flexDirection: "column", gap: "0.375rem" }}>
                <li>IP address and general geographic location</li>
                <li>Browser type and operating system</li>
                <li>Pages visited, time spent, and referral sources</li>
                <li>Device identifiers and cookie data</li>
              </ul>
            </Section>

            <Section title="3. How We Use Your Information">
              <p>We use the information we collect to:</p>
              <ul style={{ paddingLeft: "1.25rem", marginTop: "0.5rem", display: "flex", flexDirection: "column", gap: "0.375rem" }}>
                <li>Deliver our newsletter and respond to inquiries</li>
                <li>Analyze site traffic and improve content</li>
                <li>Comply with legal obligations</li>
                <li>Detect and prevent fraud or abuse</li>
              </ul>
              <p style={{ marginTop: "0.75rem" }}>
                We do not sell, trade, or rent your personal information to third
                parties for their marketing purposes.
              </p>
            </Section>

            <Section title="4. Cookies and Tracking">
              <p>
                We use cookies and similar technologies to enhance your
                experience, analyze usage, and serve relevant content. You can
                control cookie settings through your browser preferences. Disabling
                cookies may affect certain site functionality.
              </p>
              <p style={{ marginTop: "0.75rem" }}>
                We may use third-party analytics services (such as Google
                Analytics) that use their own cookies to collect usage data.
                These services are governed by their own privacy policies.
              </p>
            </Section>

            <Section title="5. Affiliate Links and Third Parties">
              <p>
                Our Site contains affiliate links to third-party websites and
                services. When you click these links, the third-party site may
                collect data about you according to their own privacy policies.
                We are not responsible for the privacy practices of third-party
                sites.
              </p>
              <p style={{ marginTop: "0.75rem" }}>
                See our <a href="/disclosure" style={{ color: "var(--color-signal-700)", textDecoration: "underline" }}>Affiliate Disclosure</a> for more
                details on how we handle affiliate relationships.
              </p>
            </Section>

            <Section title="6. Email Newsletter">
              <p>
                If you subscribe to our newsletter, we store your email address
                and subscription preferences via Resend (our email service
                provider) and Supabase (our database provider). You may
                unsubscribe at any time by clicking the unsubscribe link in any
                newsletter email.
              </p>
            </Section>

            <Section title="7. Data Retention">
              <p>
                We retain your personal information for as long as necessary to
                fulfill the purposes outlined in this policy, or as required by
                law. Newsletter subscribers&apos; data is retained until
                unsubscription. Contact form submissions are retained for up to
                12 months.
              </p>
            </Section>

            <Section title="8. Your Rights">
              <p>Depending on your location, you may have the right to:</p>
              <ul style={{ paddingLeft: "1.25rem", marginTop: "0.5rem", display: "flex", flexDirection: "column", gap: "0.375rem" }}>
                <li>Access the personal data we hold about you</li>
                <li>Request correction or deletion of your data</li>
                <li>Object to or restrict processing</li>
                <li>Data portability</li>
              </ul>
              <p style={{ marginTop: "0.75rem" }}>
                To exercise any of these rights, contact us at{" "}
                <a href="mailto:privacy@oghieblog.com" style={{ color: "var(--color-signal-700)" }}>
                  privacy@oghieblog.com
                </a>.
              </p>
            </Section>

            <Section title="9. Security">
              <p>
                We implement industry-standard security measures to protect your
                information. However, no transmission over the internet is
                completely secure. We cannot guarantee the absolute security of
                your data.
              </p>
            </Section>

            <Section title="10. Children's Privacy">
              <p>
                Our Site is not directed to children under the age of 13. We do
                not knowingly collect personal information from children. If you
                believe we have inadvertently collected such information, please
                contact us immediately.
              </p>
            </Section>

            <Section title="11. Changes to This Policy">
              <p>
                We may update this Privacy Policy from time to time. Changes
                will be posted on this page with an updated revision date. Your
                continued use of the Site after any changes constitutes
                acceptance of the updated policy.
              </p>
            </Section>

            <Section title="12. Contact">
              <p>
                For privacy-related questions or to exercise your rights, contact
                us at:{" "}
                <a href="mailto:privacy@oghieblog.com" style={{ color: "var(--color-signal-700)" }}>
                  privacy@oghieblog.com
                </a>{" "}
                or via our{" "}
                <a href="/contact" style={{ color: "var(--color-signal-700)" }}>
                  contact form
                </a>.
              </p>
            </Section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
