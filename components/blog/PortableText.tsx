import { PortableText as PT } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

const components = {
  types: {
    image: ({ value }: { value: { asset: unknown; alt?: string; caption?: string } }) => {
      const url = urlFor(value).width(900).url();
      return (
        <figure style={{ margin: "2.5rem 0", textAlign: "center" }}>
          <Image
            src={url}
            alt={value.alt ?? "Blog image"}
            width={900}
            height={500}
            style={{ borderRadius: "0.75rem", width: "100%", height: "auto" }}
          />
          {value.caption && (
            <figcaption style={{ fontSize: "0.8125rem", color: "var(--color-navy-400)", marginTop: "0.625rem", fontStyle: "italic" }}>
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    callout: ({ value }: { value: { text: string; tone?: "info" | "warning" | "success" } }) => {
      const toneStyles: Record<string, { bg: string; border: string; color: string }> = {
        info:    { bg: "rgba(24,95,165,0.07)", border: "var(--color-signal-700)", color: "var(--color-navy-800)" },
        warning: { bg: "rgba(239,159,39,0.1)",  border: "var(--color-gold-500)",   color: "var(--color-navy-800)" },
        success: { bg: "rgba(29,158,117,0.08)", border: "var(--color-teal-500)",   color: "var(--color-navy-800)" },
      };
      const tone = value.tone ?? "info";
      const s = toneStyles[tone];
      return (
        <aside style={{
          backgroundColor: s.bg,
          borderLeft: `4px solid ${s.border}`,
          padding: "1rem 1.25rem",
          borderRadius: "0 0.5rem 0.5rem 0",
          margin: "1.5rem 0",
          color: s.color,
          fontSize: "0.9375rem",
          lineHeight: 1.7,
        }}>
          {value.text}
        </aside>
      );
    },
  },
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 style={{ fontFamily: "var(--font-display), Georgia, serif", fontSize: "1.625rem", fontWeight: 700, color: "var(--color-navy-900)", marginTop: "2.5rem", marginBottom: "0.875rem", lineHeight: 1.25 }}>
        {children}
      </h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 style={{ fontFamily: "var(--font-display), Georgia, serif", fontSize: "1.25rem", fontWeight: 700, color: "var(--color-navy-900)", marginTop: "2rem", marginBottom: "0.625rem", lineHeight: 1.3 }}>
        {children}
      </h3>
    ),
    h4: ({ children }: { children?: React.ReactNode }) => (
      <h4 style={{ fontFamily: "var(--font-display), Georgia, serif", fontSize: "1.0625rem", fontWeight: 700, color: "var(--color-navy-800)", marginTop: "1.5rem", marginBottom: "0.5rem" }}>
        {children}
      </h4>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote style={{
        borderLeft: "4px solid var(--color-signal-700)",
        paddingLeft: "1.25rem",
        margin: "1.75rem 0",
        color: "var(--color-navy-600)",
        fontStyle: "italic",
        fontSize: "1.0625rem",
        lineHeight: 1.75,
      }}>
        {children}
      </blockquote>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p style={{ margin: "1.25rem 0", lineHeight: 1.8, color: "var(--color-navy-700)", fontSize: "1rem" }}>
        {children}
      </p>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul style={{ paddingLeft: "1.5rem", margin: "1.25rem 0", color: "var(--color-navy-700)", lineHeight: 1.8, listStyleType: "disc" }}>
        {children}
      </ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol style={{ paddingLeft: "1.5rem", margin: "1.25rem 0", color: "var(--color-navy-700)", lineHeight: 1.8 }}>
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <li style={{ marginBottom: "0.375rem" }}>{children}</li>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <li style={{ marginBottom: "0.375rem" }}>{children}</li>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong style={{ fontWeight: 700, color: "var(--color-navy-900)" }}>{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => <em>{children}</em>,
    code: ({ children }: { children?: React.ReactNode }) => (
      <code style={{
        background: "var(--color-navy-100)",
        color: "var(--color-signal-700)",
        padding: "0.125rem 0.375rem",
        borderRadius: "0.3rem",
        fontFamily: "ui-monospace, 'Cascadia Code', monospace",
        fontSize: "0.875em",
      }}>
        {children}
      </code>
    ),
    link: ({ value, children }: { value?: { href?: string; blank?: boolean }; children?: React.ReactNode }) => {
      const href = value?.href ?? "#";
      const isExternal = href.startsWith("http");
      return (
        <a
          href={href}
          target={isExternal || value?.blank ? "_blank" : undefined}
          rel={isExternal || value?.blank ? "noopener noreferrer" : undefined}
          style={{ color: "var(--color-signal-700)", textDecoration: "underline", textDecorationColor: "rgba(24,95,165,0.35)", textUnderlineOffset: "3px" }}
          className="hover:text-signal-800"
        >
          {children}
        </a>
      );
    },
    highlight: ({ children }: { children?: React.ReactNode }) => (
      <mark style={{ background: "rgba(239,159,39,0.25)", padding: "0 0.125rem", borderRadius: "0.2rem" }}>{children}</mark>
    ),
    affiliateLink: ({ value, children }: { value?: { href?: string; disclosure?: string }; children?: React.ReactNode }) => (
      <a
        href={value?.href ?? "#"}
        target="_blank"
        rel="noopener noreferrer nofollow"
        style={{ color: "var(--color-gold-600)", textDecoration: "underline", textDecorationColor: "rgba(239,159,39,0.4)", textUnderlineOffset: "3px" }}
        title={value?.disclosure ?? "Affiliate link — we may earn a commission"}
      >
        {children}
      </a>
    ),
  },
};

interface Props {
  value: unknown[];
}

export default function PortableText({ value }: Props) {
  return <PT value={value as Parameters<typeof PT>[0]["value"]} components={components} />;
}
