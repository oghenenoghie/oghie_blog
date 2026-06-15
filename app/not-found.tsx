import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Link from "next/link";
import { ArrowLeft, Search, BookOpen, Rss } from "lucide-react";

export default function NotFound() {
  return (
    <>
      <Navbar />

      <main
        style={{
          backgroundColor: "var(--color-navy-50)",
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          className="container-blog"
          style={{
            padding: "5rem 1rem",
            textAlign: "center",
            maxWidth: "640px",
            margin: "0 auto",
          }}
        >
          {/* 404 number */}
          <div
            style={{
              fontFamily: "var(--font-display), Georgia, serif",
              fontSize: "clamp(5rem, 15vw, 9rem)",
              fontWeight: 900,
              color: "var(--color-navy-100)",
              lineHeight: 1,
              marginBottom: "0.5rem",
              userSelect: "none",
            }}
          >
            404
          </div>

          {/* Gold accent */}
          <div
            style={{
              width: "48px",
              height: "3px",
              backgroundColor: "var(--color-gold-500)",
              borderRadius: "2px",
              margin: "0 auto 1.5rem",
            }}
          />

          <h1
            style={{
              fontFamily: "var(--font-display), Georgia, serif",
              fontSize: "clamp(1.375rem, 3vw, 1.875rem)",
              fontWeight: 800,
              color: "var(--color-navy-900)",
              marginBottom: "1rem",
              lineHeight: 1.3,
            }}
          >
            Page Not Found
          </h1>

          <p
            style={{
              fontSize: "1rem",
              color: "var(--color-navy-600)",
              lineHeight: 1.75,
              marginBottom: "2.5rem",
            }}
          >
            The page you&apos;re looking for may have been moved, renamed, or
            removed. Let&apos;s get you back on track.
          </p>

          {/* Primary actions */}
          <div
            style={{
              display: "flex",
              gap: "0.75rem",
              justifyContent: "center",
              flexWrap: "wrap",
              marginBottom: "3rem",
            }}
          >
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.75rem 1.5rem",
                borderRadius: "0.375rem",
                backgroundColor: "var(--color-navy-900)",
                color: "#fff",
                fontWeight: 700,
                fontSize: "0.9375rem",
                textDecoration: "none",
              }}
            >
              <ArrowLeft size={16} /> Back to Home
            </Link>
            <Link
              href="/blog"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.75rem 1.5rem",
                borderRadius: "0.375rem",
                border: "1px solid var(--color-navy-200)",
                color: "var(--color-navy-700)",
                fontWeight: 600,
                fontSize: "0.9375rem",
                textDecoration: "none",
                backgroundColor: "#fff",
              }}
            >
              <BookOpen size={16} /> Browse Articles
            </Link>
          </div>

          {/* Suggestions */}
          <div
            style={{
              backgroundColor: "#fff",
              border: "1px solid var(--color-navy-100)",
              borderRadius: "0.75rem",
              padding: "1.5rem",
              textAlign: "left",
            }}
          >
            <p
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--color-navy-500)",
                marginBottom: "1rem",
              }}
            >
              You might be looking for
            </p>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}
            >
              {[
                { href: "/blog", icon: BookOpen, label: "All blog articles" },
                { href: "/news", icon: Rss, label: "Digital marketing news" },
                { href: "/blog/categories/seo", icon: Search, label: "SEO guides" },
                { href: "/subscribe", icon: Rss, label: "Free newsletter" },
              ].map(({ href, icon: Icon, label }) => (
                <Link
                  key={href}
                  href={href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "0.625rem 0.875rem",
                    borderRadius: "0.375rem",
                    textDecoration: "none",
                    color: "var(--color-navy-700)",
                    fontSize: "0.9375rem",
                    fontWeight: 500,
                    transition: "background 0.15s",
                  }}
                  className="hover:bg-navy-50"
                >
                  <Icon
                    size={16}
                    style={{ color: "var(--color-signal-700)", flexShrink: 0 }}
                  />
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
