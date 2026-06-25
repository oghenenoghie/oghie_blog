import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search Articles",
  description:
    "Search Oghie Blog for affiliate marketing guides, program reviews, and traffic strategies.",
  alternates: { canonical: "/search" },
};

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
