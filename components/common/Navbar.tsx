"use client";
import Link from "next/link";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Menu, X, Search, Rss } from "lucide-react";

const CATEGORIES = [
  { label: "Getting Approved",   href: "/blog/categories/getting-approved" },
  { label: "Best Programs",      href: "/blog/categories/programs"         },
  { label: "Traffic Strategies", href: "/blog/categories/traffic"          },
  { label: "SEO",                href: "/blog/categories/seo"              },
  { label: "Tools & Reviews",    href: "/blog/categories/tools"            },
  { label: "Passive Income",     href: "/blog/categories/passive-income"   },
  { label: "Trending News",      href: "/news"                             },
];

export default function Navbar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [desktopQuery, setDesktopQuery] = useState("");
  const [mobileQuery, setMobileQuery] = useState("");
  const desktopInputRef = useRef<HTMLInputElement>(null);

  function navigateSearch(q: string) {
    const trimmed = q.trim();
    if (!trimmed) return;
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    setSearchOpen(false);
    setOpen(false);
    setDesktopQuery("");
    setMobileQuery("");
  }

  return (
    <header style={{ position: "sticky", top: 0, zIndex: 50 }}>

      {/* ── Top bar ─────────────────────────────────────────── */}
      <div style={{
        backgroundColor: "var(--color-navy-950)",
      }}>
        <div className="container-blog">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "60px" }}>

            {/* Logo */}
            <Link href="/" style={{ textDecoration: "none", flexShrink: 0 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "2px" }}>
                <span style={{
                  fontFamily: "var(--font-display), Georgia, serif",
                  fontSize: "1.5rem",
                  fontWeight: 900,
                  color: "#fff",
                  letterSpacing: "-0.03em",
                }}>
                  Oghie
                </span>
                <span style={{
                  fontFamily: "var(--font-display), Georgia, serif",
                  fontSize: "1.5rem",
                  fontWeight: 900,
                  color: "var(--color-gold-500)",
                  letterSpacing: "-0.03em",
                }}>
                  Blog
                </span>
                <span style={{
                  marginLeft: "0.5rem",
                  fontSize: "0.625rem",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--color-navy-500)",
                  alignSelf: "center",
                }}>
                  Affiliate Marketing
                </span>
              </div>
            </Link>

            {/* Desktop right: search + subscribe */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }} className="hidden md:flex">
              {/* Search */}
              <div style={{ position: "relative" }}>
                {searchOpen ? (
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <input
                      ref={desktopInputRef}
                      autoFocus
                      type="search"
                      placeholder="Search articles…"
                      value={desktopQuery}
                      onChange={(e) => setDesktopQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") navigateSearch(desktopQuery);
                        if (e.key === "Escape") { setSearchOpen(false); setDesktopQuery(""); }
                      }}
                      style={{
                        background: "rgba(255,255,255,0.08)",
                        border: "1px solid rgba(255,255,255,0.15)",
                        borderRadius: "0.5rem",
                        padding: "0.375rem 0.75rem",
                        color: "#fff",
                        fontSize: "0.875rem",
                        outline: "none",
                        width: "220px",
                      }}
                    />
                    <button
                      onClick={() => navigateSearch(desktopQuery)}
                      aria-label="Go"
                      style={{ color: "var(--color-gold-500)", background: "none", border: "none", cursor: "pointer", display: "flex" }}
                    >
                      <Search size={16} />
                    </button>
                    <button
                      onClick={() => { setSearchOpen(false); setDesktopQuery(""); }}
                      style={{ color: "var(--color-navy-400)", background: "none", border: "none", cursor: "pointer" }}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setSearchOpen(true)}
                    aria-label="Search"
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "center",
                      width: "36px", height: "36px", borderRadius: "0.5rem",
                      color: "var(--color-navy-400)", background: "none", border: "none", cursor: "pointer",
                      transition: "color 0.15s, background-color 0.15s",
                    }}
                    className="hover:text-white hover:bg-white/10"
                  >
                    <Search size={18} />
                  </button>
                )}
              </div>

              <Link
                href="/subscribe"
                style={{
                  display: "flex", alignItems: "center", gap: "0.4rem",
                  padding: "0.4rem 1rem",
                  borderRadius: "0.375rem",
                  backgroundColor: "var(--color-gold-500)",
                  color: "var(--color-navy-950)",
                  fontSize: "0.8125rem",
                  fontWeight: 700,
                  textDecoration: "none",
                  letterSpacing: "0.01em",
                  transition: "background-color 0.15s",
                }}
                className="hover:bg-gold-400"
              >
                <Rss size={14} />
                Subscribe
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              className="md:hidden"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              style={{ color: "var(--color-navy-300)", background: "none", border: "none", cursor: "pointer", padding: "0.5rem" }}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Category strip ───────────────────────────────────── */}
      <nav
        style={{
          backgroundColor: "var(--color-navy-950)",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          borderBottom: "2px solid var(--color-gold-500)",
          overflowX: "auto",
        }}
        className="hidden md:block"
        aria-label="Content categories"
      >
        <div className="container-blog">
          <div style={{ display: "flex", alignItems: "center", gap: "0", height: "40px", whiteSpace: "nowrap" }}>
            {CATEGORIES.map((cat, i) => (
              <Link
                key={cat.href}
                href={cat.href}
                style={{
                  padding: "0 0.875rem",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  color: "var(--color-navy-400)",
                  textDecoration: "none",
                  letterSpacing: "0.01em",
                  borderRight: i < CATEGORIES.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                  transition: "color 0.15s, background-color 0.15s",
                }}
                className="hover:text-white hover:bg-white/8"
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* ── Mobile menu ──────────────────────────────────────── */}
      {open && (
        <div style={{ backgroundColor: "var(--color-navy-950)", borderBottom: "1px solid rgba(255,255,255,0.08)" }} className="md:hidden">
          <div className="container-blog" style={{ padding: "1rem 0 1.25rem" }}>
            {/* Search */}
            <div style={{ marginBottom: "1rem", display: "flex", gap: "0.5rem" }}>
              <input
                type="search"
                placeholder="Search articles…"
                value={mobileQuery}
                onChange={(e) => setMobileQuery(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") navigateSearch(mobileQuery); }}
                style={{
                  flex: 1,
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "0.5rem",
                  padding: "0.625rem 0.875rem",
                  color: "#fff",
                  fontSize: "0.9375rem",
                  outline: "none",
                }}
              />
              <button
                onClick={() => navigateSearch(mobileQuery)}
                aria-label="Search"
                style={{
                  padding: "0 0.875rem",
                  backgroundColor: "var(--color-gold-500)",
                  color: "var(--color-navy-950)",
                  border: "none",
                  borderRadius: "0.5rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Search size={16} />
              </button>
            </div>
            {/* Categories */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.125rem" }}>
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.href}
                  href={cat.href}
                  onClick={() => setOpen(false)}
                  style={{
                    display: "block",
                    padding: "0.625rem 0.75rem",
                    borderRadius: "0.375rem",
                    fontSize: "0.9375rem",
                    fontWeight: 500,
                    color: "var(--color-navy-300)",
                    textDecoration: "none",
                  }}
                  className="hover:bg-white/10 hover:text-white"
                >
                  {cat.label}
                </Link>
              ))}
            </div>
            <div style={{ paddingTop: "1rem", borderTop: "1px solid rgba(255,255,255,0.06)", marginTop: "0.75rem" }}>
              <Link
                href="/subscribe"
                onClick={() => setOpen(false)}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
                  padding: "0.75rem",
                  borderRadius: "0.5rem",
                  backgroundColor: "var(--color-gold-500)",
                  color: "var(--color-navy-950)",
                  fontWeight: 700,
                  fontSize: "0.9375rem",
                  textDecoration: "none",
                }}
              >
                <Rss size={16} />
                Subscribe — It&apos;s Free
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
