import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function ConfirmedPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "4rem 1rem" }}>
        <div style={{ maxWidth: "480px", textAlign: "center" }}>
          <CheckCircle size={56} style={{ color: "var(--color-teal-500)", margin: "0 auto 1.5rem" }} aria-hidden="true" />
          <h1 style={{ fontFamily: "var(--font-display), Georgia, serif", fontSize: "2rem", fontWeight: 900, color: "var(--color-navy-900)", marginBottom: "0.875rem" }}>
            You&apos;re confirmed! 🎉
          </h1>
          <p style={{ fontSize: "1rem", color: "var(--color-navy-500)", lineHeight: 1.7, marginBottom: "2rem" }}>
            Welcome to the Oghie Blog community. Your first digest will land in your inbox this Thursday.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Button variant="cta" asChild>
              <Link href="/blog">Explore the blog</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/news">Browse news</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
