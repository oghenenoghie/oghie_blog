import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, TrendingUp, Building2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Project Finance — Private Equity & Project Finance Guides",
  description:
    "In-depth guides on Private Equity investing and Project Finance structuring — deal mechanics, capital strategies, and real-world frameworks.",
  alternates: { canonical: "/project-finance" },
  openGraph: {
    title: "Project Finance — Oghie Blog",
    description:
      "In-depth guides on Private Equity investing and Project Finance structuring.",
    url: "/project-finance",
    type: "website",
  },
};

const SERIF = "var(--font-display), 'Libre Baskerville', Georgia, serif";
const BODY  = "var(--font-body), Georgia, 'Times New Roman', serif";
const SANS  = "var(--font-sans), system-ui, sans-serif";

const OPTIONS = [
  {
    label: "Private Equity",
    href: "/project-finance/private-equity",
    icon: TrendingUp,
    caption:
      "Private equity transforms growth-stage companies into market leaders through disciplined capital allocation, operational improvement, and strategic exit planning. Explore how PE funds source deals, structure investments, and generate returns across the full investment cycle.",
  },
  {
    label: "Project Finance",
    href: "/project-finance/project-finance",
    icon: Building2,
    caption:
      "Project finance enables large-scale infrastructure, energy, and industrial ventures by structuring debt repayment around a project's own cash flows rather than sponsor balance sheets. Understand how lenders, governments, and developers collaborate to bring billion-dollar projects to financial close.",
  },
];

export default function ProjectFinanceHubPage() {
  return (
    <>
      {/* ── Header ───────────────────────────────────────── */}
      <div
        style={{
          backgroundColor: "var(--color-navy-900)",
          paddingTop: "3.5rem",
          paddingBottom: "3.5rem",
          borderBottom: "3px solid var(--color-gold-500)",
        }}
      >
        <div className="container-blog">
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.375rem",
              fontSize: "0.875rem",
              color: "var(--color-navy-400)",
              textDecoration: "none",
              marginBottom: "1.5rem",
            }}
            className="hover:text-white"
          >
            ← Home
          </Link>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "0.875rem",
            }}
          >
            <div
              style={{
                width: "3px",
                height: "24px",
                backgroundColor: "var(--color-gold-500)",
                borderRadius: "1px",
              }}
            />
            <span
              style={{
                fontSize: "0.6875rem",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--color-gold-500)",
                fontFamily: SANS,
              }}
            >
              Finance Guides
            </span>
          </div>

          <h1
            style={{
              fontFamily: SERIF,
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 900,
              color: "#ffffff",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              marginBottom: "0.875rem",
            }}
          >
            Project Finance
          </h1>
          <p
            style={{
              fontFamily: BODY,
              fontSize: "1.0625rem",
              fontStyle: "italic",
              color: "var(--color-navy-400)",
              maxWidth: "60ch",
              lineHeight: 1.65,
            }}
          >
            Choose a topic below to explore in-depth guides on deal structuring,
            capital strategies, and financial frameworks used by professionals
            around the world.
          </p>
        </div>
      </div>

      {/* ── Option cards ─────────────────────────────────── */}
      <div
        style={{
          backgroundColor: "var(--color-navy-50)",
          padding: "4rem 0 5rem",
        }}
      >
        <div className="container-blog">
          <div
            style={{ display: "grid", gap: "2rem" }}
            className="md:grid-cols-2"
          >
            {OPTIONS.map(({ label, href, icon: Icon, caption }) => (
              <div
                key={href}
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid var(--color-navy-200)",
                  borderTop: "4px solid var(--color-gold-500)",
                  padding: "2.5rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.25rem",
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    backgroundColor: "var(--color-navy-900)",
                    borderRadius: "4px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon size={22} color="var(--color-gold-500)" />
                </div>

                {/* Label */}
                <h2
                  style={{
                    fontFamily: SANS,
                    fontSize: "0.6875rem",
                    fontWeight: 700,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "var(--color-navy-700)",
                    marginBottom: "0",
                  }}
                >
                  {label}
                </h2>

                {/* Caption */}
                <p
                  style={{
                    fontFamily: BODY,
                    fontSize: "1rem",
                    fontStyle: "italic",
                    color: "#555555",
                    lineHeight: 1.7,
                    flex: 1,
                  }}
                >
                  {caption}
                </p>

                {/* CTA */}
                <Link
                  href={href}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.75rem 1.5rem",
                    backgroundColor: "var(--color-navy-900)",
                    color: "#ffffff",
                    fontFamily: SANS,
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    alignSelf: "flex-start",
                    transition: "background-color 0.15s",
                  }}
                  className="hover:bg-gray-800"
                >
                  Read More <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
