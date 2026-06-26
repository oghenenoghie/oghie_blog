import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use | Oghie Blog",
  description:
    "Terms and conditions governing your use of Oghie Blog and its content.",
  alternates: { canonical: "/terms" },
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

export default function TermsPage() {
  return (
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
              Terms of Use
            </h1>
            <p style={{ color: "var(--color-navy-400)", fontSize: "0.875rem" }}>
              Last updated: June 2025
            </p>
          </div>
        </div>

        {/* Body */}
        <div style={{ backgroundColor: "#fff", padding: "4rem 0" }}>
          <div className="container-blog" style={{ maxWidth: "720px" }}>
            <Section title="1. Acceptance of Terms">
              <p>
                By accessing or using oghieblog.com (the &quot;Site&quot;), you agree to
                be bound by these Terms of Use (&quot;Terms&quot;). If you do not agree
                to these Terms, please do not use the Site. These Terms apply to
                all visitors, subscribers, and others who access or use the Site.
              </p>
            </Section>

            <Section title="2. Use of the Site">
              <p>You may use the Site for lawful purposes only. You agree not to:</p>
              <ul style={{ paddingLeft: "1.25rem", marginTop: "0.5rem", display: "flex", flexDirection: "column", gap: "0.375rem" }}>
                <li>Reproduce, distribute, or republish our content without permission</li>
                <li>Scrape, crawl, or use automated tools to extract data</li>
                <li>Attempt to gain unauthorized access to any part of the Site</li>
                <li>Use the Site in any way that could disable or impair it</li>
                <li>Post or transmit any harmful, offensive, or illegal content</li>
              </ul>
            </Section>

            <Section title="3. Intellectual Property">
              <p>
                All content on this Site — including articles, images, graphics,
                logos, and code — is owned by or licensed to Oghie Blog and is
                protected by copyright and other intellectual property laws.
              </p>
              <p style={{ marginTop: "0.75rem" }}>
                You may share links to our content or quote brief excerpts (under
                150 words) with proper attribution and a link back to the original
                article. Any other use requires written permission.
              </p>
            </Section>

            <Section title="4. Disclaimer of Warranties">
              <p>
                The Site and its content are provided on an &quot;as is&quot; and &quot;as
                available&quot; basis without warranties of any kind, express or
                implied. We do not warrant that the Site will be uninterrupted,
                error-free, or free of viruses or other harmful components.
              </p>
              <p style={{ marginTop: "0.75rem" }}>
                Content on this Site is for informational and educational
                purposes only. Nothing on this Site constitutes professional
                financial, legal, or business advice. Always seek qualified
                professional advice for your specific situation.
              </p>
            </Section>

            <Section title="5. Limitation of Liability">
              <p>
                To the fullest extent permitted by law, Oghie Blog and its
                operators shall not be liable for any indirect, incidental,
                special, consequential, or punitive damages arising from your
                use of or inability to use the Site, even if we have been advised
                of the possibility of such damages.
              </p>
            </Section>

            <Section title="6. Affiliate Links and Earnings Disclaimer">
              <p>
                This Site contains affiliate links. When you click and purchase
                through certain links, we may earn a commission at no extra cost
                to you. This helps support the Site. We only recommend products
                and services we genuinely believe in.
              </p>
              <p style={{ marginTop: "0.75rem" }}>
                See our{" "}
                <a href="/disclosure" style={{ color: "var(--color-signal-700)", textDecoration: "underline" }}>
                  Affiliate Disclosure
                </a>{" "}
                for full details.
              </p>
            </Section>

            <Section title="7. Third-Party Links">
              <p>
                The Site may contain links to third-party websites. These links
                are provided for convenience only. We have no control over the
                content, privacy policies, or practices of any third-party sites
                and assume no responsibility for them.
              </p>
            </Section>

            <Section title="8. Newsletter and Communications">
              <p>
                By subscribing to our newsletter, you consent to receive
                periodic emails from us. You may unsubscribe at any time via the
                link in any email. We reserve the right to modify or discontinue
                the newsletter at any time.
              </p>
            </Section>

            <Section title="9. User-Submitted Content">
              <p>
                If you submit content to us (e.g., guest posts, comments, or
                pitches), you grant us a non-exclusive, royalty-free, worldwide
                license to use, modify, and publish that content. You represent
                that you have the right to submit such content.
              </p>
            </Section>

            <Section title="10. AI-Generated Content">
              <p>
                Some articles on this Site are written or assisted by artificial
                intelligence. AI-generated posts are labeled accordingly. While
                we review all published content for accuracy, AI-generated
                content may contain errors. We encourage you to verify critical
                information from primary sources.
              </p>
            </Section>

            <Section title="11. Changes to Terms">
              <p>
                We reserve the right to update these Terms at any time. Changes
                will be posted on this page with an updated date. Your continued
                use of the Site after any changes constitutes acceptance of the
                updated Terms.
              </p>
            </Section>

            <Section title="12. Governing Law">
              <p>
                These Terms are governed by and construed in accordance with
                applicable law. Any disputes arising from these Terms or your
                use of the Site shall be resolved through good-faith negotiation,
                followed by binding arbitration if necessary.
              </p>
            </Section>

            <Section title="13. Contact">
              <p>
                For questions about these Terms, contact us at{" "}
                <a
                  href="mailto:legal@oghieblog.com"
                  style={{ color: "var(--color-signal-700)" }}
                >
                  legal@oghieblog.com
                </a>{" "}
                or via our{" "}
                <a href="/contact" style={{ color: "var(--color-signal-700)" }}>
                  contact page
                </a>.
              </p>
            </Section>
          </div>
        </div>
    </main>
  );
}
