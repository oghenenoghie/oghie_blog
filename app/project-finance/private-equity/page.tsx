import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Private Equity — How PE Funds Work, Deal Mechanics & Returns",
  description:
    "A comprehensive guide to private equity: fund structures, deal sourcing, due diligence, value creation, and exit strategies explained for investors and operators.",
  alternates: { canonical: "/project-finance/private-equity" },
  openGraph: {
    title: "Private Equity Guide — Oghie Blog",
    description:
      "How PE funds source deals, create value, and generate returns across the full investment cycle.",
    url: "/project-finance/private-equity",
    type: "article",
  },
};

const SERIF = "var(--font-display), 'Libre Baskerville', Georgia, serif";
const BODY  = "var(--font-body), Georgia, 'Times New Roman', serif";
const SANS  = "var(--font-sans), system-ui, sans-serif";

const SECTIONS = [
  {
    heading: "What Is Private Equity?",
    body: `Private equity (PE) refers to capital invested directly into private companies — businesses not listed on a public stock exchange. PE firms raise pools of capital (funds) from institutional investors such as pension funds, sovereign wealth funds, endowments, and family offices, then deploy that capital by acquiring stakes in companies, growing them, and eventually selling those stakes at a profit.\n\nUnlike public market investing, PE is illiquid by design. Investors commit capital for seven to twelve years, accepting the illiquidity premium in exchange for potentially superior returns — historically 200 to 400 basis points above public equities over long periods.`,
  },
  {
    heading: "Fund Structure & the GP/LP Relationship",
    body: `A PE fund is structured as a limited partnership. The General Partner (GP) — the PE firm itself — manages the fund and makes all investment decisions. Limited Partners (LPs) provide the capital but have no role in day-to-day management and bear limited liability.\n\nThe standard economics are the "2 and 20" model: the GP charges a 2% annual management fee on committed capital (to cover operational costs) and retains 20% of profits above a preferred return hurdle — typically 8% per annum — known as carried interest or "carry." This performance-based structure aligns GP incentives with LP outcomes.\n\nFunds have defined lives: a five-to-six-year investment period followed by a five-to-six-year harvesting period, totaling roughly a decade.`,
  },
  {
    heading: "Deal Sourcing & Origination",
    body: `The best PE transactions are rarely found through competitive auctions. Top-performing funds invest heavily in proprietary deal flow — cultivating relationships with management teams, industry executives, investment bankers, and advisors over years before a transaction materialises.\n\nCommon sourcing channels include: direct outreach to founder-owned businesses approaching a liquidity event; banker-run processes (sell-side mandates); secondary buyouts (acquiring portfolio companies from other PE funds); and carve-outs of non-core divisions from large corporations.\n\nSector focus has become a key differentiator. Generalist mega-funds compete on relationships and capital, while specialist mid-market funds compete on deep sector expertise and the operational value they can credibly add post-acquisition.`,
  },
  {
    heading: "Due Diligence & Valuation",
    body: `PE due diligence is exhaustive and multi-disciplinary. Financial due diligence validates the quality of earnings — stripping out one-time items, normalising working capital, and stress-testing revenue sustainability. Commercial due diligence interrogates market size, competitive position, customer concentration, and growth assumptions. Legal due diligence uncovers contractual risks, IP ownership, employment liabilities, and regulatory exposure.\n\nValuation is typically anchored on EBITDA (earnings before interest, tax, depreciation, and amortisation) multiples drawn from comparable transactions and public company trading comparables, supplemented by a discounted cash flow analysis. Entry multiples in competitive processes have risen sharply — deals in many sectors now price at 10–15× EBITDA or higher — putting pressure on deal teams to identify non-consensus upside.`,
  },
  {
    heading: "Leverage & Capital Structure",
    body: `The defining characteristic of a leveraged buyout (LBO) — the dominant PE transaction type — is the use of significant debt to finance the acquisition. A typical LBO might be funded 50–70% with debt (senior term loans, revolving credit facilities, and sometimes subordinated or mezzanine debt) and 30–50% with equity from the PE fund.\n\nDebt amplifies equity returns when the business grows in value, but also amplifies losses if performance disappoints. The interest burden requires strong and stable free cash flow, which is why PE favours businesses with predictable revenues, high margins, and modest capital expenditure needs.\n\nOver the hold period, debt is progressively repaid from operating cash flows — a process called deleveraging — which mechanically increases the equity value even before any operational improvement.`,
  },
  {
    heading: "Value Creation Levers",
    body: `PE firms create value through three primary mechanisms. First, multiple expansion — buying at one EBITDA multiple and selling at a higher one — which depends heavily on market conditions and sector sentiment. Second, earnings growth — increasing EBITDA through revenue growth, margin improvement, add-on acquisitions, and operational efficiency. Third, deleveraging — the debt paydown that accrues to equity holders.\n\nOperational value creation has grown in importance as buyout multiples have risen. Sophisticated PE funds deploy Operating Partners — experienced industry executives embedded in portfolio companies — to drive revenue initiatives, procurement savings, technology upgrades, and management team strengthening. The era of financial engineering alone producing strong returns has largely passed.`,
  },
  {
    heading: "Exit Strategies",
    body: `Every PE investment is made with a specific exit thesis in mind. The four primary exit routes are:\n\n1. Trade sale — selling to a strategic acquirer (typically another company in the same sector) who values the business for synergies and pays a premium accordingly.\n2. Secondary buyout — selling to another PE fund; common in mature PE markets and often criticised for simply transferring, rather than creating, value.\n3. IPO (Initial Public Offering) — listing the company on a public exchange; preferred when public market valuations are elevated relative to private market comps.\n4. Recapitalisation — replacing equity with cheap debt and paying a dividend to the fund, partially monetising the investment while retaining ownership.\n\nThe exit environment is the single biggest variable in PE returns. Timing the market cycle matters enormously.`,
  },
  {
    heading: "Measuring Returns: IRR & MOIC",
    body: `PE performance is measured by two complementary metrics. The Internal Rate of Return (IRR) measures the annualised time-weighted return on invested capital — it rewards speed and penalises slow deployment. A "good" buyout fund targets 20–25%+ net IRR.\n\nThe Multiple on Invested Capital (MOIC) — also called the multiple of money (MoM) — measures total value returned divided by total capital invested, ignoring timing. A 3.0× MOIC means the fund returned three dollars for every dollar invested. Top-quartile funds typically target 2.5–3.5× gross MOIC over a fund life.\n\nThe tension between these two metrics matters: a 3× MOIC achieved in eight years produces a much lower IRR than one achieved in four years. Understanding both gives a fuller picture of fund performance.`,
  },
];

export default function PrivateEquityPage() {
  return (
    <>
      {/* ── Header ───────────────────────────────────────── */}
      <div
        style={{
          backgroundColor: "var(--color-navy-900)",
          paddingTop: "3.5rem",
          paddingBottom: "3.5rem",
          borderBottom: "3px solid var(--color-gold-500)",
        }}
      >
        <div className="container-blog">
          <Link
            href="/project-finance"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.375rem",
              fontSize: "0.875rem",
              color: "var(--color-navy-400)",
              textDecoration: "none",
              marginBottom: "1.5rem",
            }}
            className="hover:text-white"
          >
            <ArrowLeft size={14} /> Project Finance
          </Link>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "0.875rem",
            }}
          >
            <div
              style={{
                width: "3px",
                height: "24px",
                backgroundColor: "var(--color-gold-500)",
                borderRadius: "1px",
              }}
            />
            <span
              style={{
                fontSize: "0.6875rem",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--color-gold-500)",
                fontFamily: SANS,
              }}
            >
              Project Finance
            </span>
          </div>

          <h1
            style={{
              fontFamily: SERIF,
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 900,
              color: "#ffffff",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              marginBottom: "0.875rem",
            }}
          >
            Private Equity
          </h1>
          <p
            style={{
              fontFamily: BODY,
              fontSize: "1.0625rem",
              fontStyle: "italic",
              color: "var(--color-navy-400)",
              maxWidth: "68ch",
              lineHeight: 1.65,
            }}
          >
            How PE funds source deals, structure leveraged buyouts, create
            operational value, and generate returns for investors — a complete
            guide from fund mechanics to exit strategy.
          </p>
        </div>
      </div>

      {/* ── Article body ─────────────────────────────────── */}
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "4rem 0 5rem",
        }}
      >
        <div className="container-blog">
          <div style={{ display: "grid", gap: "0" }} className="md:grid-cols-[1fr_280px]">

            {/* Main content */}
            <article style={{ maxWidth: "72ch" }}>
              {SECTIONS.map((section, i) => (
                <section
                  key={i}
                  style={{
                    borderTop: i === 0 ? "3px solid #121212" : "1px solid #dfdfdf",
                    paddingTop: "2rem",
                    paddingBottom: "2rem",
                  }}
                >
                  <h2
                    style={{
                      fontFamily: SERIF,
                      fontSize: "clamp(1.25rem, 2.5vw, 1.5rem)",
                      fontWeight: 700,
                      color: "#121212",
                      lineHeight: 1.2,
                      marginBottom: "1rem",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {section.heading}
                  </h2>
                  {section.body.split("\n\n").map((para, j) => (
                    <p
                      key={j}
                      style={{
                        fontFamily: BODY,
                        fontSize: "1.0625rem",
                        color: "#333333",
                        lineHeight: 1.75,
                        marginBottom: j < section.body.split("\n\n").length - 1 ? "1rem" : 0,
                      }}
                    >
                      {para}
                    </p>
                  ))}
                </section>
              ))}
            </article>

            {/* Sidebar */}
            <aside
              style={{ paddingLeft: "3rem", paddingTop: "2rem" }}
              className="hidden md:block"
            >
              <div
                style={{
                  position: "sticky",
                  top: "80px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "2rem",
                }}
              >
                {/* Contents */}
                <div style={{ borderTop: "3px solid #121212", paddingTop: "1.25rem" }}>
                  <p
                    style={{
                      fontFamily: SANS,
                      fontSize: "0.625rem",
                      fontWeight: 700,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "#888",
                      marginBottom: "0.875rem",
                    }}
                  >
                    In This Guide
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                    {SECTIONS.map((s, i) => (
                      <p
                        key={i}
                        style={{
                          fontFamily: SANS,
                          fontSize: "0.8125rem",
                          color: "#555",
                          lineHeight: 1.5,
                          padding: "0.5rem 0",
                          borderBottom: "1px solid #f0f0f0",
                        }}
                      >
                        {s.heading}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Also see */}
                <div style={{ borderTop: "3px solid #121212", paddingTop: "1.25rem" }}>
                  <p
                    style={{
                      fontFamily: SANS,
                      fontSize: "0.625rem",
                      fontWeight: 700,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "#888",
                      marginBottom: "0.875rem",
                    }}
                  >
                    Also In Project Finance
                  </p>
                  <Link
                    href="/project-finance/project-finance"
                    style={{
                      display: "block",
                      fontFamily: SERIF,
                      fontSize: "0.9375rem",
                      fontWeight: 700,
                      color: "#121212",
                      textDecoration: "none",
                      lineHeight: 1.3,
                      marginBottom: "0.375rem",
                    }}
                    className="hover:text-gray-600"
                  >
                    Project Finance →
                  </Link>
                  <p
                    style={{
                      fontFamily: BODY,
                      fontSize: "0.875rem",
                      fontStyle: "italic",
                      color: "#888",
                      lineHeight: 1.55,
                    }}
                  >
                    Infrastructure debt, SPVs, and how large-scale projects reach financial close.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
