import type { Metadata } from "next";
import { allFontVariables } from "@/lib/fonts";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Oghie Blog — Affiliate Marketing Guides & Program Reviews",
    template: "%s | Oghie Blog",
  },
  description:
    "Honest guides to finding affiliate programs, getting approved, driving traffic, and earning commissions. For beginners and experienced affiliates.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Oghie Blog",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={allFontVariables()}>
      <body className="min-h-screen antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
