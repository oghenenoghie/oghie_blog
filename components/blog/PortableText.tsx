import { PortableText as PT } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

const SERIF = "var(--font-display), 'Libre Baskerville', Georgia, serif";
const BODY  = "var(--font-body), Georgia, 'Times New Roman', serif";
const SANS  = "var(--font-sans), system-ui, sans-serif";

const components = {
  types: {
    image: ({ value }: { value: { asset: unknown; alt?: string; caption?: string } }) => {
      const url = urlFor(value).width(900).url();
      return (
        <figure style={{ margin: "2.5rem 0" }}>
          <Image
            src={url}
            alt={value.alt ?? "Blog image"}
            width={900}
            height={500}
            style={{ width: "100%", height: "auto" }}
          />
          {value.caption && (
            <figcaption style={{
              fontFamily: SANS,
              fontSize: "0.8125rem",
              color: "#6e6e6e",
              marginTop: "0.625rem",
              fontStyle: "italic",
              lineHeight: 1.5,
            }}>
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    callout: ({ value }: { value: { text: string; tone?: "info" | "warning" | "success" } }) => {
      const toneStyles: Record<string, { bg: string; border: string; color: string }> = {
        info:    { bg: "rgba(50,104,145,0.06)",  border: "#326891", color: "#121212" },
        warning: { bg: "rgba(208,2,27,0.04)",    border: "#d0021b", color: "#121212" },
        success: { bg: "rgba(29,158,117,0.06)",  border: "#1d9e75", color: "#121212" },
      };
      const tone = value.tone ?? "info";
      const s = toneStyles[tone];
      return (
        <aside style={{
          backgroundColor: s.bg,
          borderLeft: `3px solid ${s.border}`,
          padding: "1rem 1.25rem",
          margin: "1.75rem 0",
          color: s.color,
          fontFamily: BODY,
          fontSize: "1rem",
          lineHeight: 1.75,
        }}>
          {value.text}
        </aside>
      );
    },
  },
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 style={{
        fontFamily: SERIF,
        fontSize: "1.5rem",
        fontWeight: 700,
        color: "#121212",
        marginTop: "2.5rem",
        marginBottom: "0.875rem",
        lineHeight: 1.2,
        letterSpacing: "-0.01em",
      }}>
        {children}
      </h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 style={{
        fontFamily: SERIF,
        fontSize: "1.25rem",
        fontWeight: 700,
        color: "#121212",
        marginTop: "2rem",
        marginBottom: "0.625rem",
        lineHeight: 1.25,
      }}>
        {children}
      </h3>
    ),
    h4: ({ children }: { children?: React.ReactNode }) => (
      <h4 style={{
        fontFamily: SERIF,
        fontSize: "1.0625rem",
        fontWeight: 700,
        color: "#121212",
        marginTop: "1.5rem",
        marginBottom: "0.5rem",
      }}>
        {children}
      </h4>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote style={{
        borderLeft: "3px solid #121212",
        paddingLeft: "1.5rem",
        margin: "2rem 0",
        color: "#6e6e6e",
        fontStyle: "italic",
        fontFamily: BODY,
        fontSize: "1.1875rem",
        lineHeight: 1.6,
      }}>
        {children}
      </blockquote>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p style={{
        fontFamily: BODY,
        margin: "1.5rem 0",
        lineHeight: 1.875,
        color: "#121212",
        fontSize: "1.125rem",
      }}>
        {children}
      </p>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul style={{ paddingLeft: "1.5rem", margin: "1.5rem 0", color: "#121212", lineHeight: 1.875, listStyleType: "disc", fontFamily: BODY, fontSize: "1.125rem" }}>
        {children}
      </ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol style={{ paddingLeft: "1.5rem", margin: "1.5rem 0", color: "#121212", lineHeight: 1.875, fontFamily: BODY, fontSize: "1.125rem" }}>
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <li style={{ marginBottom: "0.5rem" }}>{children}</li>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <li style={{ marginBottom: "0.5rem" }}>{children}</li>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong style={{ fontWeight: 700, color: "#121212" }}>{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => <em>{children}</em>,
    code: ({ children }: { children?: React.ReactNode }) => (
      <code style={{
        background: "#f5f5f5",
        color: "#326891",
        padding: "0.125rem 0.375rem",
        fontFamily: "ui-monospace, 'Cascadia Code', monospace",
        fontSize: "0.875em",
        border: "1px solid #e8e8e8",
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
          style={{
            color: "#326891",
            textDecoration: "underline",
            textDecorationColor: "rgba(50,104,145,0.4)",
            textUnderlineOffset: "3px",
          }}
          className="hover:text-blue-900"
        >
          {children}
        </a>
      );
    },
    highlight: ({ children }: { children?: React.ReactNode }) => (
      <mark style={{ background: "rgba(208,2,27,0.1)", padding: "0 0.125rem" }}>{children}</mark>
    ),
    affiliateLink: ({ value, children }: { value?: { href?: string; disclosure?: string }; children?: React.ReactNode }) => (
      <a
        href={value?.href ?? "#"}
        target="_blank"
        rel="noopener noreferrer nofollow"
        style={{
          color: "var(--color-gold-700)",
          textDecoration: "underline",
          textDecorationColor: "rgba(186,117,23,0.4)",
          textUnderlineOffset: "3px",
        }}
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
