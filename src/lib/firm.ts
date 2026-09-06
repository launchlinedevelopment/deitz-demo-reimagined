/**
 * Factual content sourced from the firm's existing website (kendeitzcpa.com).
 * Nothing here is invented — omit rather than fabricate.
 */

export const firm = {
  name: "Simon & Deitz LLC",
  principal: "Kenneth R. Deitz, CPA",
  address: {
    street: "42 East Main Street",
    city: "Freehold",
    state: "NJ",
    zip: "07728",
  },
  phone: "732-780-3665",
  phoneHref: "tel:+17327803665",
  fax: "732-780-4402",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=42+East+Main+Street+Freehold+NJ+07728",
  mapEmbed:
    "https://www.google.com/maps?q=42+East+Main+Street,+Freehold,+NJ+07728&output=embed",
  peerReview:
    "We are a peer reviewed firm and a copy of our peer review is available upon request.",
  relationships:
    "We believe in the value of relationships. We view every client relationship like a partnership, and truly believe that our success is a result of your success. We are committed to providing close, personal attention to our clients. We take pride in giving you the assurance that the personal assistance you receive comes from years of advanced training, technical experience and financial acumen.",
} as const;

export const credentials = [
  "Certified Public Accountant",
  "Registered Investment Advisor",
  "Certified QuickBooks Advisor",
  "New Jersey Society of CPAs Member",
  "M.S. in Taxation",
  "B.A. in Accounting",
] as const;

export type ServiceKey = "accounting" | "taxation" | "financial-services";

export type Service = {
  key: ServiceKey;
  title: string;
  path: string;
  tagline: string;
  summary: string;
  items: string[];
  cta: string;
  detail: string[];
};

export const services: Service[] = [
  {
    key: "accounting",
    title: "Accounting",
    path: "/services/accounting",
    tagline: "Clear financials you can act on",
    summary:
      "Financial statements, compilations, reviews and reporting prepared with the detail lenders, partners and owners expect.",
    items: [
      "Financial Statements",
      "Preparation & Compilation",
      "Reviews and Audits",
      "Special Reports & Projections",
      "Applications for Bank Loans",
      "College Scholarships",
      "Accounting Software Support",
      "Bookkeeping / Write Up",
    ],
    cta: "Explore Accounting Services",
    detail: [
      "Accurate books are the foundation of every good financial decision. Simon & Deitz LLC prepares and compiles financial statements, performs reviews and audits, and produces the special reports and projections that support bank loan applications and college scholarship filings.",
      "Support extends to the software you use day to day, including QuickBooks setup and guidance from a Certified QuickBooks Advisor, along with ongoing bookkeeping and write-up work.",
    ],
  },
  {
    key: "taxation",
    title: "Taxation",
    path: "/services/taxation",
    tagline: "Planning ahead, not just filing",
    summary:
      "Individual and corporate return preparation, payroll tax records, IRS practice and procedure, and year-end planning.",
    items: [
      "Tax Return Preparation",
      "Corporate Tax Returns",
      "Payroll Tax Record Maintenance",
      "IRS Practices & Procedure",
      "Year-End Projections",
      "Estate Planning",
      "Family Income Planning",
    ],
    cta: "Explore Tax Services",
    detail: [
      "Twenty-five years in public accounting, devoted exclusively to individual and small business accounting and tax issues, informs every return this firm prepares — personal, corporate, and everything in between.",
      "Year-end projections, payroll tax record maintenance, estate planning and family income planning are handled with the same attention, so the filing itself is the last step rather than the whole conversation.",
    ],
  },
  {
    key: "financial-services",
    title: "Financial Services",
    path: "/services/financial-services",
    tagline: "Strategy for the long term",
    summary:
      "Retirement and tax planning, entity selection, succession planning, trust preparation and IRS representation.",
    items: [
      "Tax & Retirement Planning",
      "Business Entity Selection",
      "Business Succession Planning",
      "Estate, Tax & Trust Preparation",
      "Estate Planning & Financial Services",
      "IRS Representation & Payroll",
      "Sales Tax Services",
    ],
    cta: "Explore Financial Services",
    detail: [
      "Choosing an entity, planning a succession, preparing an estate or trust: these are decisions made once and lived with for years. As a Certified Public Accountant and Registered Investment Advisor, Kenneth R. Deitz advises on them with the full tax picture in view.",
      "The firm also represents clients before the IRS and assists with payroll and sales tax obligations.",
    ],
  },
];

export const testimonials = [
  {
    initials: "P.Z.",
    location: "Bergenfield, NJ",
    quote:
      "Ken Deitz, CPA is the most intelligent, well read, and knowledgeable accountant I have ever been associated with. He is very thorough in his work and I have recommended him to my family, friends, co-workers and business associates. He has prepared my personal tax returns for eight years and has always had my best interests in the forefront. I will continue to use his services and recommend him in the future. I consider him to be a truly valuable financial resource.",
  },
  {
    initials: "R.R.",
    location: "Marlboro, NJ",
    quote:
      "Kenneth R. Deitz, CPA has been the accountant for my businesses and personal taxes for ten years. Over the years, he has kept me out of sales tax problems, prepared financial statements and projections that enabled me to obtain bank loans, and always treated me with the most personal of service. Ken is by far the most brilliant accounting and tax mind I have ever had the pleasure of experiencing first-hand. I will always count on him for my financial and tax requirements and I know he will always come through.",
  },
  {
    initials: "S.O.",
    location: "Pembroke Pines, FL",
    quote:
      "Kenneth R. Deitz, CPA has been my family's accountant for the past ten years. During that time, he has wisely advised us in estate planning and family wealth preservation. He has worked hand-in-hand with our family attorney in addressing tough issues and providing us with valuable insights. We will always call on Ken for whatever tax problems we encounter.",
  },
  {
    initials: "M.P.",
    location: "Linden, NJ",
    quote:
      "I have been associated with Kenneth R. Deitz, CPA for close to ten years. He handled all the accounting and tax aspects of my trucking and real estate businesses in the most professional manner throughout. The trust and goodwill he has built up not only with my business but with my family is invaluable to me. I have recommended Ken to many of my friends and business associates, and from what they tell me, he has constantly given them the same level of service I have always received. Without a doubt, Ken is the most professional, knowledgeable and honest accountant I have ever been associated with.",
  },
] as const;

export const treasuryLinks = [
  { label: "Internal Revenue Service", href: "https://www.irs.gov/" },
  {
    label: "New Jersey Treasury",
    href: "https://www.nj.gov/treasury/public_finance/index.shtml",
  },
  {
    label: "New York Department of Taxation and Finance",
    href: "https://www.tax.ny.gov/",
  },
  { label: "Pennsylvania Treasury", href: "https://www.patreasury.gov/" },
] as const;

export const calculatorTopics = [
  "15 vs 30 Year Mortgage Calculator",
  "Mortgage Payoff",
  "Mortgage Points Calculator",
  "Mortgage Qualifier",
] as const;

export const navLinks = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "About", to: "/about" },
  { label: "Qualifications", to: "/qualifications" },
  { label: "Resources", to: "/resources" },
  { label: "Testimonials", to: "/testimonials" },
  { label: "Contact", to: "/contact" },
] as const;
