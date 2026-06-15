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
  { label: "Privacy Policy",     href: "/privacy" },
  { label: "Terms of Use",       href: "/terms" },
  { label: "Affiliate Disclosure", href: "/disclosure" },
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "var(--color-navy-950)", color: "var(--color-navy-400)" }}>

      {/* ── Top section ─────────────────────────────────────── */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", padding: "3rem 0" }}>
        <div className="container-blog">
          <div style={{ display: "grid", gap: "2.5rem" }} className="md:grid-cols-[2fr_1fr_1fr_1fr]">

            {/* Brand + newsletter */}
            <div>
              <Link href="/" style={{ textDecoration: "none", display: "inline-block", marginBottom: "1rem" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "2px" }}>
                  <span style={{ fontFamily: "var(--font-display), Georgia, serif", fontSize: "1.5rem", fontWeight: 900, color: "#fff", letterSpacing: "-0.03em" }}>
                    Oghie
                  </span>
                  <span style={{ fontFamily: "var(--font-display), Georgia, serif", fontSize: "1.5rem", fontWeight: 900, color: "var(--color-gold-500)", letterSpacing: "-0.03em" }}>
                    Blog
                  </span>
                </div>
              </Link>
              <p style={{ fontSize: "0.875rem", lineHeight: 1.75, color: "var(--color-navy-400)", maxWidth: "28ch", marginBottom: "1.25rem" }}>
                Honest guides to finding, joining, and earning from affiliate programs — written for beginners and experienced marketers alike.
              </p>
              <Link
                href="/subscribe"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  padding: "0.5rem 1.125rem",
                  borderRadius: "0.375rem",
                  backgroundColor: "var(--color-gold-500)",
                  color: "var(--color-navy-950)",
                  fontWeight: 700,
                  fontSize: "0.8125rem",
                  textDecoration: "none",
                }}
              >
                <Mail size={14} />
                Get free insights
              </Link>
            </div>

            {/* Topics */}
            <div>
              <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-navy-500)", marginBottom: "1rem" }}>
                Topics
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                {TOPICS.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} style={{ fontSize: "0.875rem", color: "var(--color-navy-400)", textDecoration: "none", transition: "color 0.15s" }} className="hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pages */}
            <div>
              <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-navy-500)", marginBottom: "1rem" }}>
                Site
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                {PAGES.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} style={{ fontSize: "0.875rem", color: "var(--color-navy-400)", textDecoration: "none", transition: "color 0.15s" }} className="hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* RSS + social */}
            <div>
              <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-navy-500)", marginBottom: "1rem" }}>
                Follow
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                <li>
                  <Link href="/rss.xml" style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.875rem", color: "var(--color-navy-400)", textDecoration: "none" }} className="hover:text-white">
                    <Rss size={14} /> RSS Feed
                  </Link>
                </li>
                <li>
                  <Link href="https://twitter.com" target="_blank" rel="noopener" style={{ fontSize: "0.875rem", color: "var(--color-navy-400)", textDecoration: "none" }} className="hover:text-white">
                    X / Twitter
                  </Link>
                </li>
                <li>
                  <Link href="https://linkedin.com" target="_blank" rel="noopener" style={{ fontSize: "0.875rem", color: "var(--color-navy-400)", textDecoration: "none" }} className="hover:text-white">
                    LinkedIn
                  </Link>
                </li>
                <li>
                  <Link href="https://youtube.com" target="_blank" rel="noopener" style={{ fontSize: "0.875rem", color: "var(--color-navy-400)", textDecoration: "none" }} className="hover:text-white">
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
          <p style={{ fontSize: "0.8125rem", color: "var(--color-navy-600)" }}>
            © {new Date().getFullYear()} Oghie Blog. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
            {LEGAL.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{ fontSize: "0.8125rem", color: "var(--color-navy-600)", textDecoration: "none" }}
                className="hover:text-navy-400"
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
