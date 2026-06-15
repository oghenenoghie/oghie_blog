"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

const SUBJECTS = [
  "General Inquiry",
  "Guest Post Submission",
  "Advertising & Sponsorship",
  "Affiliate Partnership",
  "Content Correction",
  "Technical Issue",
  "Other",
];

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.625rem 0.875rem",
  border: "1px solid var(--color-navy-200)",
  borderRadius: "0.375rem",
  fontSize: "0.9375rem",
  color: "var(--color-navy-900)",
  backgroundColor: "#fff",
  outline: "none",
  boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.8125rem",
  fontWeight: 600,
  color: "var(--color-navy-700)",
  marginBottom: "0.375rem",
};

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: SUBJECTS[0],
    message: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", subject: SUBJECTS[0], message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
        <CheckCircle
          size={48}
          style={{ color: "var(--color-signal-700)", margin: "0 auto 1rem" }}
        />
        <h2
          style={{
            fontFamily: "var(--font-display), Georgia, serif",
            fontSize: "1.375rem",
            fontWeight: 800,
            color: "var(--color-navy-900)",
            marginBottom: "0.625rem",
          }}
        >
          Message Sent!
        </h2>
        <p
          style={{
            fontSize: "0.9375rem",
            color: "var(--color-navy-600)",
            marginBottom: "1.5rem",
          }}
        >
          Thanks for reaching out. We&apos;ll get back to you within 2 business days.
        </p>
        <button
          onClick={() => setStatus("idle")}
          style={{
            padding: "0.625rem 1.25rem",
            borderRadius: "0.375rem",
            border: "1px solid var(--color-navy-200)",
            fontSize: "0.875rem",
            cursor: "pointer",
            color: "var(--color-navy-700)",
            backgroundColor: "#fff",
          }}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        <div style={{ display: "grid", gap: "1.25rem", gridTemplateColumns: "1fr 1fr" }}>
          <div>
            <label style={labelStyle} htmlFor="name">Name *</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle} htmlFor="email">Email *</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
        </div>

        <div>
          <label style={labelStyle} htmlFor="subject">Subject</label>
          <select
            id="subject"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            style={inputStyle}
          >
            {SUBJECTS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div>
          <label style={labelStyle} htmlFor="message">Message *</label>
          <textarea
            id="message"
            name="message"
            required
            rows={7}
            placeholder="Tell us what's on your mind..."
            value={form.message}
            onChange={handleChange}
            style={{ ...inputStyle, resize: "vertical" }}
          />
        </div>

        {status === "error" && (
          <p
            style={{
              fontSize: "0.875rem",
              color: "#dc2626",
              padding: "0.625rem 0.875rem",
              backgroundColor: "#fef2f2",
              borderRadius: "0.375rem",
              border: "1px solid #fecaca",
            }}
          >
            Something went wrong. Please try again or email us directly.
          </p>
        )}

        <button
          type="submit"
          disabled={status === "sending"}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            padding: "0.75rem 1.5rem",
            borderRadius: "0.375rem",
            backgroundColor: "var(--color-navy-900)",
            color: "#fff",
            fontWeight: 700,
            fontSize: "0.9375rem",
            border: "none",
            cursor: status === "sending" ? "not-allowed" : "pointer",
            opacity: status === "sending" ? 0.7 : 1,
          }}
        >
          <Send size={16} />
          {status === "sending" ? "Sending…" : "Send Message"}
        </button>
      </div>
    </form>
  );
}
