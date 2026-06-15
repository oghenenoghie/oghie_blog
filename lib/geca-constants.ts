// ── GECA Pro constants — imported from geca_pro project ──────────────────────
// These power the GECA advisory site sections. Import what you need.

export const SITE_CONFIG = {
  name: "GECA",
  tagline: "Financial · Legal · Advisory",
  description: "Transforming complex challenges into strategic advantage.",
  url: "https://geca.com",
  email: "hello@geca.com",
  phone: "+234 703 495 3399",
  phone2: "+234 0987 047 53",
  address: "Suite A20, Discovery Mall Plot 215, Konoko Crescent off Adetokunbo Ademola Street, Wuse II, Abuja, Nigeria",
};

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Insights", href: "/insights" },
  { label: "Team", href: "/team" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const TRUST_BAR_STATS = [
  { number: "200+", label: "Transactions Advised" },
  { number: "$2B+", label: "Deal Value" },
  { number: "15+", label: "Jurisdictions" },
  { number: "Decades", label: "Combined Experience" },
];

export const DIFFERENTIATORS = [
  { number: "01", title: "Multidisciplinary Expertise", description: "Financial, legal, and tax experts working seamlessly together" },
  { number: "02", title: "Proven Track Record",         description: "200+ transactions advised, $2B+ in deal value closed" },
  { number: "03", title: "Global Reach",                description: "Presence across 15+ jurisdictions with local market knowledge" },
  { number: "04", title: "Bespoke Solutions",           description: "Tailored strategies, never one-size-fits-all approaches" },
  { number: "05", title: "Strategic Partnership",       description: "We are partners in your success, not just advisors" },
];

export const INDUSTRIES = [
  "Technology", "Healthcare", "Real Estate", "Manufacturing",
  "Financial Services", "Energy", "Consumer", "Telecommunications",
];

export const HERO_COPY = {
  eyebrow:    "FINANCIAL · LEGAL · ADVISORY",
  heading:    "Transforming Complex Challenges Into Strategic Advantage",
  subheading: "We are more than advisors; we are partners in your success.",
  cta1:       "Explore Our Services",
  cta2:       "Contact Us",
};

export const TESTIMONIALS = [
  {
    quote: "GECA navigated a complex cross-border transaction for us with precision and speed. Their integrated approach saved us months of back-and-forth with separate advisors.",
    name: "Tunde Adeyemi", title: "CEO, Meridian Capital Group", initials: "TA",
  },
  {
    quote: "What sets GECA apart is that they actually understand the African market — not just the legal framework, but the on-the-ground commercial reality. That context made all the difference.",
    name: "Ngozi Okonkwo", title: "Managing Director, Silverleaf Investments", initials: "NO",
  },
  {
    quote: "Our estate plan spans three jurisdictions. GECA handled every layer — wills, trusts, succession — with the kind of clarity and care I didn't think I would find in one firm.",
    name: "Emeka Nwachukwu", title: "Founder, Crestfield Holdings", initials: "EN",
  },
  {
    quote: "From due diligence through post-merger integration, the GECA team was relentlessly thorough. They identified risks our previous advisors had missed entirely.",
    name: "Adaeze Obiechina", title: "CFO, Pinnacle Agribusiness", initials: "AO",
  },
  {
    quote: "As a first-generation business owner planning succession, I needed advisors who understood both the financial and human dimensions. GECA delivered on both.",
    name: "Chukwudi Eze", title: "Chairman, Eze Family Office", initials: "CE",
  },
];

export const VALUES = [
  { title: "Integrity",       description: "Uncompromising honesty and transparency in every engagement" },
  { title: "Excellence",      description: "Relentless pursuit of the highest standards in our work" },
  { title: "Client-Centric",  description: "Your success is our only measure of achievement" },
  { title: "Collaboration",   description: "Partnerships built on trust and mutual respect" },
  { title: "Innovation",      description: "Forward-thinking solutions to evolving challenges" },
];

export const PHILOSOPHY = {
  quote: "We are more than advisors; we are partners in your success.",
  description: "At GECA, we believe that financial and legal complexity should never be a barrier to growth. Our approach combines decades of institutional knowledge with a commitment to understanding your unique circumstances.",
};

export const PROCESS_STEPS = [
  { title: "Understand", description: "Deep dive into your situation" },
  { title: "Analyze",    description: "Strategic assessment and planning" },
  { title: "Plan",       description: "Comprehensive solution design" },
  { title: "Execute",    description: "Precise implementation" },
  { title: "Partner",    description: "Ongoing support and guidance" },
];

export const VISION_MISSION = {
  vision:  { label: "Our Vision",  text: "To be the trusted global partner for businesses and investors, delivering transformative financial solutions and regulatory compliance that drive sustainable success." },
  mission: { label: "Our Mission", text: "To empower businesses and investors with innovative strategies, actionable insights, and expert guidance, enabling them to unlock their full potential in a competitive global economy." },
};

export const TEAM_MEMBERS = [
  { id: "ceo",         name: "Adebayo Okafor",   role: "Founder & CEO",               bio: "Former partner at a Big Four firm with over 25 years advising multinationals across Sub-Saharan Africa and the UK.", expertise: ["M&A Advisory", "Tax Strategy", "Cross-border Structuring"],   image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80" },
  { id: "coo",         name: "Chisom Eze",        role: "Managing Director, Legal",     bio: "Barrister and solicitor called to the bar in England & Wales and Nigeria. Leads GECA's legal practice.",         expertise: ["Estate Planning", "Corporate Law", "Regulatory Compliance"],   image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80" },
  { id: "head-pe",     name: "Emeka Nwosu",       role: "Head of Private Equity",       bio: "With a decade at leading PE houses in London, brings deep deal-making instinct and portfolio management expertise.", expertise: ["Private Equity", "Venture Capital", "Portfolio Management"],   image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80" },
  { id: "head-tax",    name: "Folake Adeyemi",    role: "Head of Tax Advisory",         bio: "Dual-qualified tax specialist with extensive experience in international tax planning and wealth structuring.",       expertise: ["International Tax", "Transfer Pricing", "Wealth Structuring"],  image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80" },
  { id: "head-ma",     name: "Kingsley Obiora",   role: "Head of M&A",                  bio: "Former investment banker who has advised on transactions totalling over $1.5B in deal value.",                       expertise: ["M&A", "Due Diligence", "Transaction Structuring"],              image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80" },
  { id: "head-estate", name: "Amaka Obi",         role: "Head of Legacy & Estate Planning", bio: "Specialist in multigenerational wealth preservation. Helped over 100 families secure their legacies.",          expertise: ["Trusts", "Family Governance", "Succession Planning"],      image: "https://images.unsplash.com/photo-1598550874175-4d0ef436c909?auto=format&fit=crop&w=600&q=80" },
];

// ── SERVICES ──────────────────────────────────────────────────────────────────

export const SERVICES = [
  {
    id: "financial-tax",
    title: "Financial & Tax Advisory",
    slug: "financial-tax",
    description: "Turning financial complexity into strategic clarity",
    icon: "TrendingUp",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1920&q=80",
    overview: "Tax and financial complexity should never be a barrier to growth. Our advisory practice combines deep technical expertise with genuine commercial understanding, helping high-growth businesses, family offices, and multinationals navigate the full spectrum of financial and tax challenges.",
    approach: "We begin with a comprehensive understanding of your business, ownership structure, and goals. From there, our multidisciplinary team develops integrated strategies that address both immediate compliance needs and long-term optimisation opportunities.",
    pillars: [
      { title: "Tax Planning & Compliance", body: "End-to-end tax compliance across Nigerian and UK jurisdictions, combined with proactive planning that minimises effective tax rates within applicable law." },
      { title: "Financial Analysis", body: "Rigorous financial modelling, forecasting, and performance analysis that gives leadership teams the visibility they need to make confident strategic decisions." },
      { title: "Corporate Restructuring", body: "Group restructuring advisory — from holding company reorganisations and debt restructurings to the tax-efficient separation of business divisions." },
      { title: "Risk Management", body: "Identification, assessment, and mitigation of financial and regulatory risk. We work with boards and audit committees to build robust risk frameworks." },
      { title: "Cross-border Advisory", body: "Specialised guidance for businesses operating across African and international jurisdictions — covering transfer pricing, permanent establishment risk, and treaty planning." },
      { title: "Transaction Tax", body: "Tax structuring and due diligence for M&A transactions, joint ventures, and fundraising rounds." },
      { title: "Wealth Management & Estate Planning", body: "Integrated tax and financial planning for high-net-worth individuals, founders, and family offices." },
      { title: "Payroll Outsourcing", body: "Flexible and streamlined payroll outsourcing services covering payroll management, employment-related advisory, and compliance." },
    ],
  },
  {
    id: "estate-planning",
    title: "Legacy & Estate Planning",
    slug: "estate-planning",
    description: "Securing your legacy across generations",
    icon: "Shield",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1920&q=80",
    overview: "Building wealth across a lifetime is only the first chapter. At GECA, we help families — particularly those with assets and interests in both Africa and the UK — structure their affairs so that wealth transfers smoothly, efficiently, and in accordance with their wishes across generations.",
    approach: "Our approach to estate planning is holistic and deeply personal. We take time to understand your family's dynamics, values, and goals before designing structures.",
    pillars: [
      { title: "Estate Planning & Wills", body: "Comprehensive will-drafting for UK and Nigerian sited assets, including coordinated dual-jurisdiction wills for diaspora clients." },
      { title: "Trusts & Asset Protection", body: "Discretionary and fixed interest trusts structured under English law for multigenerational wealth transfer and probate avoidance." },
      { title: "Business Succession", body: "Structured succession planning for family-owned businesses — including share restructuring, management transition frameworks, and buy-sell agreements." },
      { title: "Probate Management", body: "End-to-end probate administration in the UK and, through our partner network, in Nigeria." },
      { title: "Family Governance", body: "Facilitation of family governance processes including family constitutions, family councils, and distribution policies." },
      { title: "Fiduciary Services", body: "Acting as professional trustees, executors, or powers of attorney where families require independent, experienced fiduciaries." },
    ],
    clients: [
      "High-net-worth individuals and families",
      "Corporate executives and entrepreneurs",
      "Family-owned businesses",
      "Charitable foundations and NGOs",
      "Diaspora Nigerians seeking asset protection at home",
    ],
  },
  {
    id: "mergers",
    title: "Mergers & Acquisitions",
    slug: "mergers",
    description: "Navigating every stage of the transaction lifecycle",
    icon: "Briefcase",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1920&q=80",
    overview: "GECA's M&A practice has advised on over $1.5 billion in African cross-border transaction value. We act for buyers, sellers, and management teams across sectors — bringing the analytical rigour of an investment bank with integrated legal and tax capability.",
    approach: "Every transaction is different. We invest time upfront understanding your strategic objectives, your counterpart, and the market context. We then build a bespoke advisory team calibrated to the specific demands of the deal.",
    pillars: [
      { title: "Deal Origination", body: "Proactive identification of acquisition targets and strategic partners through our pan-African and international network." },
      { title: "Due Diligence", body: "Comprehensive financial, tax, legal, and commercial due diligence — coordinated as a single workstream rather than disconnected reports." },
      { title: "Valuation", body: "Independent, defensible valuations across a range of methodologies — DCF, precedent transactions, trading comparables, and asset-based approaches." },
      { title: "Transaction Structuring", body: "Deal structuring that optimises the balance between commercial risk allocation, tax efficiency, and regulatory compliance." },
      { title: "Post-Merger Integration", body: "Practical support through the integration phase — financial systems harmonisation, tax group consolidation, and governance restructuring." },
      { title: "Divestitures", body: "Full divestiture advisory from strategic review through to completion — including buyer identification, process management, and negotiation support." },
      { title: "Cross-Border M&A", body: "Specialised advisory for transactions spanning African and international jurisdictions — covering multi-jurisdictional regulatory approvals and cross-border tax efficiency." },
    ],
  },
  {
    id: "private-equity",
    title: "Private Equity",
    slug: "private-equity",
    description: "Maximizing returns at every stage of the investment cycle",
    icon: "Zap",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1920&q=80",
    overview: "African private equity is at an inflection point. GECA's PE practice advises fund managers, institutional LPs, and growth-stage companies through every stage of the investment cycle.",
    approach: "We combine deep deal-making experience with integrated legal and tax capability. Whether you are a fund manager preparing for a capital raise or a portfolio company seeking to accelerate growth, we bring genuine African market experience.",
    pillars: [
      { title: "Investment Strategy", body: "Strategic advisory to PE managers and family offices on portfolio construction, sector allocation, and the development of differentiated investment theses for African markets." },
      { title: "Fundraising & Capital Sourcing", body: "Support for fund managers through the capital raise cycle — including LP targeting, fund structuring, term sheet negotiation, and regulatory compliance." },
      { title: "Deal Origination", body: "Proprietary deal sourcing through our pan-African network of corporates, founder communities, and investment banks." },
      { title: "Portfolio Management", body: "Ongoing advisory support for portfolio companies — including financial planning and analysis, tax structuring, and governance frameworks." },
      { title: "Exit Planning", body: "Exit architecture designed into deals from day one. We advise on exit structuring, buyer identification, and trade sale negotiations." },
      { title: "Distressed Investing", body: "Advisory to investors targeting distressed and special-situation opportunities in African markets." },
    ],
  },
];

// ── INSIGHTS ──────────────────────────────────────────────────────────────────

export const INSIGHTS = [
  {
    id: "navigating-cross-border-tax",
    slug: "navigating-cross-border-tax",
    category: "Tax Advisory",
    title: "Navigating Cross-Border Tax in a Shifting Global Landscape",
    excerpt: "The OECD's Pillar Two framework is reshaping how multinationals approach global tax planning. Here's what high-growth African businesses need to know.",
    date: "2024-11-15",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80",
    author: "Folake Adeyemi",
    authorRole: "Head of Tax Advisory",
  },
  {
    id: "estate-planning-diaspora",
    slug: "estate-planning-diaspora",
    category: "Legacy Planning",
    title: "Estate Planning for the African Diaspora: A Dual-Jurisdiction Guide",
    excerpt: "Holding assets across the UK and Nigeria introduces unique legal complexity. Understanding how both jurisdictions interact is the first step to protecting your legacy.",
    date: "2024-10-28",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80",
    author: "Chisom Eze",
    authorRole: "Managing Director, Legal",
  },
  {
    id: "pe-africa-opportunity",
    slug: "pe-africa-opportunity",
    category: "Private Equity",
    title: "The African PE Opportunity: Beyond the Narrative",
    excerpt: "Institutional capital is flowing into African private equity at record pace. We break down the structural tailwinds, and the risks that sophisticated investors must price in.",
    date: "2024-10-05",
    readTime: "11 min read",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80",
    author: "Emeka Nwosu",
    authorRole: "Head of Private Equity",
  },
  {
    id: "ma-due-diligence-pitfalls",
    slug: "ma-due-diligence-pitfalls",
    category: "M&A",
    title: "Five Due Diligence Pitfalls That Kill Deals — and How to Avoid Them",
    excerpt: "Most M&A failures are predictable. Our transaction team shares the five due diligence gaps they see most often in African cross-border deals.",
    date: "2024-09-18",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
    author: "Kingsley Obiora",
    authorRole: "Head of M&A",
  },
  {
    id: "family-office-structuring",
    slug: "family-office-structuring",
    category: "Wealth Management",
    title: "Structuring a Family Office for African Ultra-HNW Families",
    excerpt: "A single-family office can be the most effective vehicle for preserving and growing multigenerational wealth — if structured correctly from the outset.",
    date: "2024-08-30",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1560472355-536de3962603?auto=format&fit=crop&w=800&q=80",
    author: "Adebayo Okafor",
    authorRole: "Founder & CEO",
  },
  {
    id: "succession-planning-smes",
    slug: "succession-planning-smes",
    category: "Legacy Planning",
    title: "Succession Planning for Nigerian Family Businesses",
    excerpt: "First-generation entrepreneurs rarely plan for what comes next. Here's a framework for business succession that protects value and preserves family harmony.",
    date: "2024-08-12",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&w=800&q=80",
    author: "Amaka Obi",
    authorRole: "Head of Legacy & Estate Planning",
  },
];
