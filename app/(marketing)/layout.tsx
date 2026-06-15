// Passthrough layout — Navbar and Footer are embedded directly in app/page.tsx.
// This layout exists only to satisfy Next.js route-group structure.
export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
