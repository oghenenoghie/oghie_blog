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
    <header style={{ position: "sticky", top: 0, zIndex: 50, backgroundColor: "#ffffff", borderBottom: "1px solid #dfdfdf" }}>

      {/* ── Main bar ─────────────────────────────────────────── */}
      <div style={{ borderBottom: "2px solid #121212" }}>
        <div className="container-blog">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px" }}>

            {/* Logo */}
            <Link href="/" style={{ textDecoration: "none", flexShrink: 0 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "2px" }}>
                <span style={{
                  fontFamily: "var(--font-display), 'Libre Baskerville', Georgia, serif",
                  fontSize: "1.625rem",
                  fontWeight: 700,
                  color: "#121212",
                  letterSpacing: "-0.02em",
                }}>
                  Oghie
                </span>
                <span style={{
                  fontFamily: "var(--font-display), 'Libre Baskerville', Georgia, serif",
                  fontSize: "1.625rem",
                  fontWeight: 700,
                  color: "var(--color-gold-600)",
                  letterSpacing: "-0.02em",
                }}>
                  Blog
                </span>
                <span style={{
                  marginLeft: "0.625rem",
                  fontSize: "0.5625rem",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#aaaaaa",
                  alignSelf: "center",
                  fontFamily: "var(--font-sans), system-ui, sans-serif",
                }}>
                  Affiliate Marketing
                </span>
              </div>
            </Link>

            {/* Desktop right: search + subscribe */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }} className="hidden md:flex">
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
                        background: "#f5f5f5",
                        border: "1px solid #dfdfdf",
                        borderRadius: "2px",
                        padding: "0.375rem 0.75rem",
                        color: "#121212",
                        fontSize: "0.875rem",
                        fontFamily: "var(--font-sans), system-ui, sans-serif",
                        outline: "none",
                        width: "220px",
                      }}
                    />
                    <button
                      onClick={() => navigateSearch(desktopQuery)}
                      aria-label="Go"
                      style={{ color: "#121212", background: "none", border: "none", cursor: "pointer", display: "flex" }}
                    >
                      <Search size={16} />
                    </button>
                    <button
                      onClick={() => { setSearchOpen(false); setDesktopQuery(""); }}
                      style={{ color: "#888", background: "none", border: "none", cursor: "pointer" }}
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
                      width: "36px", height: "36px",
                      color: "#333", background: "none", border: "none", cursor: "pointer",
                      transition: "color 0.15s",
                    }}
                    className="hover:text-black"
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
                  border: "1px solid #121212",
                  borderRadius: "2px",
                  backgroundColor: "#121212",
                  color: "#ffffff",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  textDecoration: "none",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  fontFamily: "var(--font-sans), system-ui, sans-serif",
                  transition: "background-color 0.15s",
                }}
                className="hover:bg-gray-800"
              >
                <Rss size={13} />
                Subscribe
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              className="md:hidden"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              style={{ color: "#333", background: "none", border: "none", cursor: "pointer", padding: "0.5rem" }}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Category strip ───────────────────────────────────── */}
      <nav
        style={{
          backgroundColor: "#ffffff",
          overflowX: "auto",
        }}
        className="hidden md:block"
        aria-label="Content categories"
      >
        <div className="container-blog">
          <div style={{ display: "flex", alignItems: "center", height: "38px", whiteSpace: "nowrap" }}>
            {CATEGORIES.map((cat, i) => (
              <Link
                key={cat.href}
                href={cat.href}
                style={{
                  padding: "0 0.875rem",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  fontSize: "0.6875rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: "#333333",
                  textDecoration: "none",
                  borderRight: i < CATEGORIES.length - 1 ? "1px solid #dfdfdf" : "none",
                  fontFamily: "var(--font-sans), system-ui, sans-serif",
                  transition: "color 0.15s",
                }}
                className="hover:text-black"
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* ── Mobile menu ──────────────────────────────────────── */}
      {open && (
        <div style={{ backgroundColor: "#ffffff", borderTop: "1px solid #dfdfdf" }} className="md:hidden">
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
                  background: "#f5f5f5",
                  border: "1px solid #dfdfdf",
                  borderRadius: "2px",
                  padding: "0.625rem 0.875rem",
                  color: "#121212",
                  fontSize: "0.9375rem",
                  fontFamily: "var(--font-sans), system-ui, sans-serif",
                  outline: "none",
                }}
              />
              <button
                onClick={() => navigateSearch(mobileQuery)}
                aria-label="Search"
                style={{
                  padding: "0 0.875rem",
                  backgroundColor: "#121212",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "2px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Search size={16} />
              </button>
            </div>
            {/* Categories */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.href}
                  href={cat.href}
                  onClick={() => setOpen(false)}
                  style={{
                    display: "block",
                    padding: "0.75rem 0",
                    borderBottom: "1px solid #f0f0f0",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    color: "#333333",
                    textDecoration: "none",
                    fontFamily: "var(--font-sans), system-ui, sans-serif",
                    letterSpacing: "0.01em",
                  }}
                  className="hover:text-black"
                >
                  {cat.label}
                </Link>
              ))}
            </div>
            <div style={{ paddingTop: "1.25rem" }}>
              <Link
                href="/subscribe"
                onClick={() => setOpen(false)}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
                  padding: "0.875rem",
                  border: "1px solid #121212",
                  backgroundColor: "#121212",
                  color: "#ffffff",
                  fontWeight: 700,
                  fontSize: "0.8125rem",
                  textDecoration: "none",
                  fontFamily: "var(--font-sans), system-ui, sans-serif",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
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
