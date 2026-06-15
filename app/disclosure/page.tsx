import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Affiliate Disclosure | Oghie Blog",
  description:
    "Oghie Blog's affiliate disclosure — how we earn commissions and our commitment to honest, unbiased recommendations.",
};

export default function DisclosurePage() {
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
              Transparency
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
              Affiliate Disclosure
            </h1>
            <p style={{ color: "var(--color-navy-400)", fontSize: "0.875rem" }}>
              Last updated: June 2025
            </p>
          </div>
        </div>

        {/* Body */}
        <div style={{ backgroundColor: "#fff", padding: "4rem 0" }}>
          <div className="container-blog" style={{ maxWidth: "720px" }}>
            {/* Callout */}
            <div
              style={{
                display: "flex",
                gap: "1rem",
                alignItems: "flex-start",
                backgroundColor: "var(--color-navy-50)",
                border: "1px solid var(--color-navy-200)",
                borderLeft: "4px solid var(--color-gold-500)",
                borderRadius: "0.5rem",
                padding: "1.25rem 1.5rem",
                marginBottom: "2.5rem",
              }}
            >
              <ShieldCheck
                size={22}
                style={{
                  color: "var(--color-gold-500)",
                  flexShrink: 0,
                  marginTop: "2px",
                }}
              />
              <p
                style={{
                  fontSize: "0.9375rem",
                  lineHeight: 1.7,
                  color: "var(--color-navy-700)",
                  margin: 0,
                }}
              >
                <strong>Short version:</strong> Some links on Oghie Blog are
                affiliate links. If you click one and make a purchase, we may
                earn a commission — at no extra cost to you. We only recommend
                things we genuinely believe in.
              </p>
            </div>

            <div
              style={{
                fontSize: "0.9375rem",
                lineHeight: 1.85,
                color: "var(--color-navy-700)",
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              <section>
                <h2
                  style={{
                    fontFamily: "var(--font-display), Georgia, serif",
                    fontSize: "1.25rem",
                    fontWeight: 800,
                    color: "var(--color-navy-900)",
                    marginBottom: "0.75rem",
                  }}
                >
                  What Are Affiliate Links?
                </h2>
                <p>
                  An affiliate link is a special URL that includes a tracking
                  code identifying Oghie Blog as the referrer. When you click
                  an affiliate link and complete a qualifying action (usually a
                  purchase or sign-up), we earn a small commission from the
                  company. This commission is paid by the company, not added
                  to your price.
                </p>
              </section>

              <section>
                <h2
                  style={{
                    fontFamily: "var(--font-display), Georgia, serif",
                    fontSize: "1.25rem",
                    fontWeight: 800,
                    color: "var(--color-navy-900)",
                    marginBottom: "0.75rem",
                  }}
                >
                  FTC Compliance
                </h2>
                <p>
                  In accordance with the Federal Trade Commission&apos;s guidelines
                  on endorsements and testimonials (16 C.F.R. Part 255), we
                  disclose that Oghie Blog participates in affiliate programs
                  with various companies in the digital marketing, software,
                  and e-commerce space.
                </p>
                <p style={{ marginTop: "0.75rem" }}>
                  This disclosure page, combined with in-article disclosures
                  and our site-wide footer notice, constitutes our material
                  connection disclosure as required by the FTC.
                </p>
              </section>

              <section>
                <h2
                  style={{
                    fontFamily: "var(--font-display), Georgia, serif",
                    fontSize: "1.25rem",
                    fontWeight: 800,
                    color: "var(--color-navy-900)",
                    marginBottom: "0.75rem",
                  }}
                >
                  Affiliate Programs We Participate In
                </h2>
                <p>
                  We may earn commissions through affiliate relationships with
                  (but not limited to):
                </p>
                <ul
                  style={{
                    paddingLeft: "1.25rem",
                    marginTop: "0.625rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.375rem",
                  }}
                >
                  <li>Amazon Associates Program</li>
                  <li>
                    Software and SaaS platforms (email marketing tools, SEO
                    tools, hosting providers, page builders, CRMs)
                  </li>
                  <li>Online course and education platforms</li>
                  <li>
                    Digital marketing agencies and service providers
                  </li>
                  <li>ShareASale, CJ Affiliate, Impact, PartnerStack networks</li>
                </ul>
                <p style={{ marginTop: "0.75rem" }}>
                  This list is not exhaustive. Any link on this site that leads
                  to a product or service could be an affiliate link.
                </p>
              </section>

              <section>
                <h2
                  style={{
                    fontFamily: "var(--font-display), Georgia, serif",
                    fontSize: "1.25rem",
                    fontWeight: 800,
                    color: "var(--color-navy-900)",
                    marginBottom: "0.75rem",
                  }}
                >
                  Our Editorial Standards
                </h2>
                <p>
                  Affiliate income does not influence our editorial decisions.
                  Our commitment is to our readers, not to the brands we
                  link to:
                </p>
                <ul
                  style={{
                    paddingLeft: "1.25rem",
                    marginTop: "0.625rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                  }}
                >
                  <li>
                    <strong>We only recommend products we use or have
                    thoroughly evaluated.</strong> If we wouldn&apos;t use it
                    ourselves, we won&apos;t recommend it.
                  </li>
                  <li>
                    <strong>We publish negative reviews.</strong> If a product
                    is mediocre or has significant drawbacks, we say so —
                    even if it has an affiliate program.
                  </li>
                  <li>
                    <strong>Affiliate availability doesn&apos;t determine coverage.</strong>{" "}
                    We cover tools and strategies because they&apos;re useful,
                    not because they pay us.
                  </li>
                  <li>
                    <strong>Prices and commissions change.</strong> Affiliate
                    rates fluctuate and products evolve. We do our best to
                    keep information current.
                  </li>
                </ul>
              </section>

              <section>
                <h2
                  style={{
                    fontFamily: "var(--font-display), Georgia, serif",
                    fontSize: "1.25rem",
                    fontWeight: 800,
                    color: "var(--color-navy-900)",
                    marginBottom: "0.75rem",
                  }}
                >
                  Questions?
                </h2>
                <p>
                  If you have questions about our affiliate relationships or
                  want to know whether a specific link is an affiliate link,
                  please{" "}
                  <a
                    href="/contact"
                    style={{ color: "var(--color-signal-700)", textDecoration: "underline" }}
                  >
                    contact us
                  </a>
                  . We&apos;re happy to clarify.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
