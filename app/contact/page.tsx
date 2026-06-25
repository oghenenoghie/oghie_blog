import ContactForm from "@/components/contact/ContactForm";
import type { Metadata } from "next";
import { Mail, MessageSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact | Oghie Blog",
  description:
    "Get in touch with Oghie Blog — for inquiries, guest posts, sponsorships, affiliate partnerships, or content corrections.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Oghie Blog",
    description:
      "Get in touch with Oghie Blog — for inquiries, guest posts, sponsorships, affiliate partnerships, or content corrections.",
    url: "/contact",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <main>
        {/* Header */}
        <div
          style={{
            background:
              "linear-gradient(135deg, var(--color-navy-950) 0%, #1E3A5F 100%)",
            padding: "4rem 0 3.5rem",
            borderBottom: "3px solid var(--color-gold-500)",
          }}
        >
          <div className="container-blog" style={{ maxWidth: "640px" }}>
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
                Get in Touch
              </span>
            </div>
            <h1
              style={{
                fontFamily: "var(--font-display), Georgia, serif",
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                fontWeight: 900,
                color: "#fff",
                lineHeight: 1.2,
                marginBottom: "0.875rem",
              }}
            >
              Contact Us
            </h1>
            <p
              style={{
                fontSize: "1rem",
                color: "var(--color-navy-300)",
                lineHeight: 1.7,
              }}
            >
              Questions, partnerships, corrections, or pitches — we read every
              message. Expect a reply within 2 business days.
            </p>
          </div>
        </div>

        {/* Content */}
        <div style={{ backgroundColor: "var(--color-navy-50)", padding: "4rem 0" }}>
          <div
            className="container-blog"
            style={{ maxWidth: "960px" }}
          >
            <div
              style={{ display: "grid", gap: "2.5rem" }}
              className="md:grid-cols-[1fr_280px]"
            >
              {/* Form card */}
              <div
                style={{
                  backgroundColor: "#fff",
                  border: "1px solid var(--color-navy-100)",
                  borderRadius: "0.75rem",
                  padding: "2rem",
                }}
              >
                <ContactForm />
              </div>

              {/* Sidebar info */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <div
                  style={{
                    backgroundColor: "#fff",
                    border: "1px solid var(--color-navy-100)",
                    borderRadius: "0.75rem",
                    padding: "1.5rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.625rem",
                      marginBottom: "0.875rem",
                    }}
                  >
                    <Mail size={16} style={{ color: "var(--color-gold-500)" }} />
                    <span
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "var(--color-navy-700)",
                      }}
                    >
                      Direct Email
                    </span>
                  </div>
                  <a
                    href="mailto:hello@oghieblog.com"
                    style={{
                      fontSize: "0.9375rem",
                      color: "var(--color-signal-700)",
                      textDecoration: "none",
                      fontWeight: 500,
                    }}
                  >
                    hello@oghieblog.com
                  </a>
                  <p
                    style={{
                      fontSize: "0.8125rem",
                      color: "var(--color-navy-500)",
                      marginTop: "0.5rem",
                      lineHeight: 1.6,
                    }}
                  >
                    Response within 2 business days
                  </p>
                </div>

                <div
                  style={{
                    backgroundColor: "#fff",
                    border: "1px solid var(--color-navy-100)",
                    borderRadius: "0.75rem",
                    padding: "1.5rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.625rem",
                      marginBottom: "0.875rem",
                    }}
                  >
                    <MessageSquare
                      size={16}
                      style={{ color: "var(--color-gold-500)" }}
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
                      Common Requests
                    </span>
                  </div>
                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: 0,
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.625rem",
                    }}
                  >
                    {[
                      "Guest post pitches",
                      "Sponsored content",
                      "Affiliate partnerships",
                      "Content corrections",
                      "Press & media",
                    ].map((item) => (
                      <li
                        key={item}
                        style={{
                          fontSize: "0.875rem",
                          color: "var(--color-navy-600)",
                          paddingLeft: "1rem",
                          position: "relative",
                        }}
                      >
                        <span
                          style={{
                            position: "absolute",
                            left: 0,
                            color: "var(--color-gold-500)",
                          }}
                        >
                          ›
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
    </main>
  );
}
