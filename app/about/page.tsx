import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Mail, BookOpen, Zap, Globe, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "About | Oghie Blog — Affiliate Marketing Guides",
  description:
    "Oghie Blog publishes honest guides on finding affiliate programs, getting approved, driving traffic, and earning consistent commissions online.",
};

const PILLARS = [
  {
    icon: BookOpen,
    title: "Getting Approved",
    body: "Step-by-step guides on applying to affiliate programs — what merchants look for, how to position your site, and how to get approved even when you're just starting out.",
  },
  {
    icon: Award,
    title: "Program Reviews",
    body: "We evaluate affiliate programs on commission rates, cookie windows, payout reliability, and real earning potential so you don't waste time on low-quality partners.",
  },
  {
    icon: Zap,
    title: "Traffic Strategies",
    body: "SEO, email, and content strategies specifically for affiliate sites — how to rank, build an audience, and convert that audience into consistent commissions.",
  },
  {
    icon: Globe,
    title: "Affiliate News",
    body: "A live feed of affiliate marketing industry news — new programs, commission changes, network updates, and policy shifts you need to know about.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main>
        {/* Hero */}
        <div
          style={{
            background:
              "linear-gradient(135deg, var(--color-navy-950) 0%, #1E3A5F 100%)",
            padding: "5rem 0 4rem",
            borderBottom: "3px solid var(--color-gold-500)",
          }}
        >
          <div className="container-blog" style={{ maxWidth: "720px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.625rem",
                marginBottom: "1.25rem",
              }}
            >
              <div
                style={{
                  width: "3px",
                  height: "18px",
                  backgroundColor: "var(--color-gold-500)",
                  borderRadius: "1px",
                }}
              />
              <span
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--color-gold-500)",
                }}
              >
                About
              </span>
            </div>
            <h1
              style={{
                fontFamily: "var(--font-display), Georgia, serif",
                fontSize: "clamp(2rem, 5vw, 3rem)",
                fontWeight: 900,
                color: "#fff",
                lineHeight: 1.2,
                marginBottom: "1.25rem",
              }}
            >
              Affiliate Marketing Guides<br />
              <span style={{ color: "var(--color-gold-400)" }}>
                That Actually Help You Qualify
              </span>
            </h1>
            <p
              style={{
                fontSize: "1.0625rem",
                color: "var(--color-navy-300)",
                lineHeight: 1.75,
                maxWidth: "600px",
              }}
            >
              Oghie Blog exists to help you find legitimate affiliate programs, get approved, and build income online — with honest guides that don't oversell the dream.
            </p>
          </div>
        </div>

        {/* Mission */}
        <section
          style={{
            backgroundColor: "#fff",
            padding: "4rem 0",
            borderBottom: "1px solid var(--color-navy-100)",
          }}
        >
          <div className="container-blog" style={{ maxWidth: "720px" }}>
            <h2
              style={{
                fontFamily: "var(--font-display), Georgia, serif",
                fontSize: "1.625rem",
                fontWeight: 800,
                color: "var(--color-navy-900)",
                marginBottom: "1.25rem",
              }}
            >
              Why This Blog Exists
            </h2>
            <div
              style={{
                fontSize: "1rem",
                lineHeight: 1.85,
                color: "var(--color-navy-700)",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <p>
                Affiliate marketing is one of the most accessible ways to earn online — but finding the right programs, getting approved, and actually generating traffic is harder than most guides admit.
              </p>
              <p>
                Oghie Blog was built to close that gap. Every guide here covers what real affiliate marketers need: how to qualify for programs, which networks are worth your time, how to build content that ranks and converts, and what to do when an application gets rejected.
              </p>
              <p>
                Everything published here is held to one standard: <strong>does this help someone earn their first — or next — affiliate commission?</strong> If not, it doesn&apos;t go live.
              </p>
            </div>
          </div>
        </section>

        {/* Pillars */}
        <section
          style={{
            backgroundColor: "var(--color-navy-50)",
            padding: "4rem 0",
          }}
        >
          <div className="container-blog">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.625rem",
                marginBottom: "2.5rem",
              }}
            >
              <div
                style={{
                  width: "3px",
                  height: "18px",
                  backgroundColor: "var(--color-gold-500)",
                  borderRadius: "1px",
                }}
              />
              <span
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--color-navy-700)",
                }}
              >
                What We Offer
              </span>
            </div>
            <div
              style={{
                display: "grid",
                gap: "1.5rem",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              }}
            >
              {PILLARS.map(({ icon: Icon, title, body }) => (
                <div
                  key={title}
                  style={{
                    backgroundColor: "#fff",
                    border: "1px solid var(--color-navy-100)",
                    borderRadius: "0.75rem",
                    padding: "1.75rem",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "0.5rem",
                      backgroundColor: "var(--color-navy-900)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "1rem",
                    }}
                  >
                    <Icon size={18} style={{ color: "var(--color-gold-400)" }} />
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-display), Georgia, serif",
                      fontSize: "1.0625rem",
                      fontWeight: 800,
                      color: "var(--color-navy-900)",
                      marginBottom: "0.625rem",
                    }}
                  >
                    {title}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      lineHeight: 1.7,
                      color: "var(--color-navy-600)",
                    }}
                  >
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Topics */}
        <section
          style={{
            backgroundColor: "#fff",
            padding: "4rem 0",
            borderTop: "1px solid var(--color-navy-100)",
          }}
        >
          <div className="container-blog" style={{ maxWidth: "720px" }}>
            <h2
              style={{
                fontFamily: "var(--font-display), Georgia, serif",
                fontSize: "1.5rem",
                fontWeight: 800,
                color: "var(--color-navy-900)",
                marginBottom: "1.25rem",
              }}
            >
              Topics We Cover
            </h2>
            <div
              style={{ display: "flex", flexWrap: "wrap", gap: "0.625rem", marginBottom: "2.5rem" }}
            >
              {[
                "Affiliate Marketing Strategy",
                "Affiliate Marketing",
                "SEO & Content",
                "Social Media",
                "Email Marketing",
                "Analytics & Data",
                "Tools & Software",
                "Industry News",
                "AI in Marketing",
              ].map((topic) => (
                <span
                  key={topic}
                  style={{
                    padding: "0.375rem 0.875rem",
                    borderRadius: "9999px",
                    fontSize: "0.8125rem",
                    fontWeight: 500,
                    color: "var(--color-navy-700)",
                    backgroundColor: "var(--color-navy-100)",
                    border: "1px solid var(--color-navy-200)",
                  }}
                >
                  {topic}
                </span>
              ))}
            </div>
            <Link
              href="/blog"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.75rem 1.5rem",
                borderRadius: "0.375rem",
                backgroundColor: "var(--color-navy-900)",
                color: "#fff",
                fontWeight: 600,
                fontSize: "0.9375rem",
                textDecoration: "none",
              }}
            >
              Browse the Blog <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section
          style={{
            background:
              "linear-gradient(135deg, var(--color-navy-900) 0%, #1E3A5F 100%)",
            padding: "3.5rem 0",
            borderTop: "3px solid var(--color-gold-500)",
          }}
        >
          <div
            className="container-blog"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "2rem",
              flexWrap: "wrap",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--color-gold-500)",
                  marginBottom: "0.5rem",
                }}
              >
                Get the Weekly Digest
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-display), Georgia, serif",
                  fontSize: "1.5rem",
                  fontWeight: 900,
                  color: "#fff",
                  lineHeight: 1.25,
                }}
              >
                Stay ahead of the curve — free.
              </h2>
            </div>
            <Link
              href="/subscribe"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.75rem 1.75rem",
                borderRadius: "0.375rem",
                backgroundColor: "var(--color-gold-500)",
                color: "var(--color-navy-950)",
                fontWeight: 700,
                fontSize: "0.9375rem",
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              <Mail size={16} /> Subscribe Free →
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
