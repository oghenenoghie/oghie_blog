import Link from "next/link";
import { Rss, Mail } from "lucide-react";

const TOPICS = [
  { label: "Getting Approved",  href: "/blog/categories/getting-approved" },
  { label: "Best Programs",     href: "/blog/categories/programs" },
  { label: "Traffic Strategies",href: "/blog/categories/traffic" },
  { label: "SEO for Affiliates",href: "/blog/categories/seo" },
  { label: "Tools & Reviews",   href: "/blog/categories/tools" },
  { label: "Passive Income",    href: "/blog/categories/passive-income" },
];

const PAGES = [
  { label: "All Articles", href: "/blog" },
  { label: "Trending News", href: "/news" },
  { label: "Newsletter",   href: "/subscribe" },
  { label: "About",        href: "/about" },
  { label: "Contact",      href: "/contact" },
];

const LEGAL = [
  { label: "Privacy Policy",      href: "/privacy" },
  { label: "Terms of Use",        href: "/terms" },
  { label: "Affiliate Disclosure", href: "/disclosure" },
];

const SANS  = "var(--font-sans), system-ui, sans-serif";
const SERIF = "var(--font-display), 'Libre Baskerville', Georgia, serif";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#111111", color: "#999999" }}>

      {/* ── Top rule ─────────────────────────────────────────── */}
      <div style={{ height: "3px", backgroundColor: "#ffffff" }} />

      {/* ── Top section ─────────────────────────────────────── */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "3rem 0" }}>
        <div className="container-blog">
          <div style={{ display: "grid", gap: "2.5rem" }} className="md:grid-cols-[2fr_1fr_1fr_1fr]">

            {/* Brand + newsletter */}
            <div>
              <Link href="/" style={{ textDecoration: "none", display: "inline-block", marginBottom: "1rem" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "2px" }}>
                  <span style={{ fontFamily: SERIF, fontSize: "1.5rem", fontWeight: 700, color: "#ffffff", letterSpacing: "-0.02em" }}>
                    Oghie
                  </span>
                  <span style={{ fontFamily: SERIF, fontSize: "1.5rem", fontWeight: 700, color: "var(--color-gold-400)", letterSpacing: "-0.02em" }}>
                    Blog
                  </span>
                </div>
              </Link>
              <p style={{ fontFamily: SANS, fontSize: "0.875rem", lineHeight: 1.75, color: "#888", maxWidth: "28ch", marginBottom: "1.5rem" }}>
                Honest guides to finding, joining, and earning from affiliate programs — written for beginners and experienced marketers alike.
              </p>
              <Link
                href="/subscribe"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  padding: "0.5rem 1.125rem",
                  border: "1px solid rgba(255,255,255,0.25)",
                  color: "#ffffff",
                  fontFamily: SANS,
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  textDecoration: "none",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  transition: "border-color 0.15s, color 0.15s",
                }}
                className="hover:border-white hover:text-white"
              >
                <Mail size={14} />
                Get free insights
              </Link>
            </div>

            {/* Topics */}
            <div>
              <p style={{ fontFamily: SANS, fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#555", marginBottom: "1rem" }}>
                Topics
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                {TOPICS.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} style={{ fontFamily: SANS, fontSize: "0.875rem", color: "#888", textDecoration: "none", transition: "color 0.15s" }} className="hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pages */}
            <div>
              <p style={{ fontFamily: SANS, fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#555", marginBottom: "1rem" }}>
                Site
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                {PAGES.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} style={{ fontFamily: SANS, fontSize: "0.875rem", color: "#888", textDecoration: "none", transition: "color 0.15s" }} className="hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* RSS + social */}
            <div>
              <p style={{ fontFamily: SANS, fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#555", marginBottom: "1rem" }}>
                Follow
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                <li>
                  <Link href="/rss.xml" style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontFamily: SANS, fontSize: "0.875rem", color: "#888", textDecoration: "none" }} className="hover:text-white">
                    <Rss size={14} /> RSS Feed
                  </Link>
                </li>
                <li>
                  <Link href="https://twitter.com" target="_blank" rel="noopener" style={{ fontFamily: SANS, fontSize: "0.875rem", color: "#888", textDecoration: "none" }} className="hover:text-white">
                    X / Twitter
                  </Link>
                </li>
                <li>
                  <Link href="https://linkedin.com" target="_blank" rel="noopener" style={{ fontFamily: SANS, fontSize: "0.875rem", color: "#888", textDecoration: "none" }} className="hover:text-white">
                    LinkedIn
                  </Link>
                </li>
                <li>
                  <Link href="https://youtube.com" target="_blank" rel="noopener" style={{ fontFamily: SANS, fontSize: "0.875rem", color: "#888", textDecoration: "none" }} className="hover:text-white">
                    YouTube
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ───────────────────────────────────────── */}
      <div style={{ padding: "1.25rem 0" }}>
        <div className="container-blog" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem" }}>
          <p style={{ fontFamily: SANS, fontSize: "0.8125rem", color: "#555" }}>
            © {new Date().getFullYear()} Oghie Blog. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
            {LEGAL.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{ fontFamily: SANS, fontSize: "0.8125rem", color: "#555", textDecoration: "none" }}
                className="hover:text-gray-400"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
