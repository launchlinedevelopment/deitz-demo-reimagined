import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, Building2, Calculator, FileText, Landmark, Quote } from "lucide-react";
import heroImage from "@/assets/hero.jpg";
import kenPhoto from "@/assets/ken-deitz.png";
import { credentials, firm, services, testimonials } from "@/lib/firm";
import { Reveal } from "@/components/site/Reveal";
import { ConsultationCta } from "@/components/site/ConsultationCta";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Simon & Deitz LLC | CPA, Accounting & Tax Services in Freehold, NJ" },
      {
        name: "description",
        content:
          "Simon & Deitz LLC provides accounting, taxation, financial planning and business advisory services in Freehold, New Jersey.",
      },
      { property: "og:title", content: "Simon & Deitz LLC | CPA, Accounting & Tax Services" },
      {
        property: "og:description",
        content:
          "Accounting, taxation and financial services for individuals, families and businesses in Freehold, New Jersey.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "Simon & Deitz LLC",
          alternateName: "Kenneth R. Deitz, CPA",
          telephone: firm.phone,
          faxNumber: firm.fax,
          address: {
            "@type": "PostalAddress",
            streetAddress: firm.address.street,
            addressLocality: firm.address.city,
            addressRegion: firm.address.state,
            postalCode: firm.address.zip,
            addressCountry: "US",
          },
        }),
      },
    ],
  }),
  component: HomePage,
});

const trustPoints = [
  "25+ Years of Experience",
  "Certified Public Accountant",
  "M.S. in Taxation",
  "QuickBooks Advisor",
  "NJ Society of CPAs Member",
];

const stats = [
  { value: "25+", label: "Years of Experience" },
  { value: "CPA", label: "Certified Public Accountant" },
  { value: "3", label: "Core Service Areas" },
  { value: "LOCAL", label: "Freehold, New Jersey" },
];

const resourceCards = [
  {
    icon: FileText,
    title: "Tax Tips",
    copy: "Practical guidance on being an informed taxpayer, drawn from the firm's client letters.",
  },
  {
    icon: Landmark,
    title: "Treasury Links",
    copy: "Direct links to the IRS and the New Jersey, New York and Pennsylvania treasury departments.",
  },
  {
    icon: Calculator,
    title: "Financial Calculators",
    copy: "Mortgage comparison, payoff, points and qualifier calculators for everyday planning.",
  },
  {
    icon: Building2,
    title: "Financial Newsletters",
    copy: "Periodic updates covering tax law changes and planning opportunities.",
  },
];

function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-deep text-white">
        <img
          src={heroImage}
          alt=""
          width={1600}
          height={1200}
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-navy-deep/70" />
        <div className="container-page relative py-20 md:py-28 lg:py-32">
          <div className="max-w-3xl">
            <p className="eyebrow text-gold-soft">Freehold, New Jersey</p>
            <h1 className="mt-6 text-[2.6rem] leading-[1.08] text-white sm:text-5xl lg:text-[4rem]">
              Accounting Expertise.
              <br />
              Personal Attention.
            </h1>
            <p className="mt-7 max-w-2xl text-lg text-white/80 md:text-xl">
              Helping individuals, families, and businesses make smarter financial decisions with
              experienced accounting, taxation, and financial services.
            </p>
            <p className="mt-4 max-w-2xl text-white/65">
              With more than 25 years of experience, Simon &amp; Deitz LLC provides customized
              financial strategies built around each client's unique needs.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link to="/contact" className="btn-gold w-full sm:w-auto">
                Schedule a Consultation
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
              <Link to="/services" className="btn-onnavy w-full sm:w-auto">
                Explore Our Services
              </Link>
            </div>
          </div>

          <ul className="mt-14 grid gap-x-8 gap-y-3 border-t border-white/15 pt-8 sm:grid-cols-2 lg:grid-cols-5">
            {trustPoints.map((point) => (
              <li key={point} className="flex items-start gap-2 text-sm text-white/80">
                <BadgeCheck aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Services */}
      <section className="section-y">
        <div className="container-page">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Services</p>
            <h2 className="mt-5 text-3xl md:text-[2.6rem]">Financial Expertise for Every Stage</h2>
            <p className="mt-5 text-lg text-muted-foreground">
              Simon &amp; Deitz LLC provides accounting, tax, and financial services tailored to
              individuals, families and businesses — from a first tax return to a business
              succession plan.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {services.map((service, index) => (
              <Reveal key={service.key} delay={index * 90}>
                <article className="card-hover flex h-full flex-col p-7 lg:p-8">
                  <p className="text-xs font-semibold tracking-[0.16em] text-navy-soft uppercase">
                    {service.title}
                  </p>
                  <h3 className="mt-3 font-serif text-2xl">{service.tagline}</h3>
                  <ul className="mt-6 flex-1 space-y-2.5 text-[0.95rem] text-muted-foreground">
                    {service.items.slice(0, 7).map((item) => (
                      <li key={item} className="flex gap-2.5">
                        <span aria-hidden="true" className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-gold" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={service.path}
                    className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-navy-deep"
                  >
                    {service.cta}
                    <ArrowRight
                      aria-hidden="true"
                      className="h-4 w-4 text-gold transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Simon & Deitz */}
      <section className="bg-surface section-y">
        <div className="container-page grid gap-14 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="eyebrow">Why Simon &amp; Deitz</p>
            <h2 className="mt-5 text-3xl md:text-[2.6rem]">Experience You Can Rely On</h2>
            <p className="mt-6 text-lg text-muted-foreground">
              More than 25 years in public accounting, devoted exclusively to individual and small
              business accounting and tax issues, from an office on East Main Street in Freehold.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                "Personalized financial strategies rather than one-size-fits-all filings",
                "Tax and accounting expertise under a single relationship",
                "Services for individuals, families and businesses alike",
                "A local Freehold, New Jersey presence you can visit",
                "Long-term client relationships measured in decades",
                "Personal attention on every engagement",
              ].map((point) => (
                <li key={point} className="flex gap-3 text-[1.02rem]">
                  <BadgeCheck aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-gold" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120} className="grid grid-cols-2 gap-5">
            {stats.map((stat) => (
              <div key={stat.label} className="card-surface p-6 text-center lg:p-8">
                <p className="font-serif text-3xl font-semibold text-navy-deep lg:text-[2.4rem]">
                  {stat.value}
                </p>
                <div className="rule-gold mx-auto my-4" />
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* About */}
      <section className="section-y">
        <div className="container-page grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <Reveal className="order-2 lg:order-1">
            <div className="card-surface overflow-hidden p-6">
              <img
                src={kenPhoto}
                alt="Kenneth R. Deitz, CPA"
                width={242}
                height={303}
                loading="lazy"
                className="mx-auto w-full max-w-[18rem] rounded-md object-cover"
              />
              <p className="mt-5 text-center font-serif text-xl">{firm.principal}</p>
              <p className="mt-1 text-center text-sm text-muted-foreground">{firm.name}</p>
            </div>
          </Reveal>

          <Reveal delay={100} className="order-1 lg:order-2">
            <p className="eyebrow">About</p>
            <h2 className="mt-5 text-3xl md:text-[2.6rem]">
              Experienced Guidance. Personalized Service.
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Kenneth R. Deitz, CPA lets you tap from 25 years in public accounting, all exclusively
              devoted to individual and small business accounting and tax issues.
            </p>
            <p className="mt-4 text-muted-foreground">{firm.relationships}</p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {credentials.map((credential) => (
                <li
                  key={credential}
                  className="rounded-md border border-border bg-card px-3 py-1.5 text-sm text-navy-deep"
                >
                  {credential}
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/about" className="btn-primary">
                More About the Firm
              </Link>
              <Link to="/qualifications" className="btn-outline">
                View Qualifications
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-navy-deep text-white section-y">
        <div className="container-page">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-gold-soft">Testimonials</p>
            <h2 className="mt-5 text-3xl text-white md:text-[2.6rem]">Relationships Built on Trust</h2>
            <p className="mt-5 text-lg text-white/70">
              Client comments published on the firm's website. Additional verified testimonials can
              be added here at any time.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {testimonials.slice(0, 2).map((testimonial, index) => (
              <Reveal key={testimonial.initials} delay={index * 100}>
                <figure className="h-full rounded-[calc(var(--radius)+4px)] border border-white/12 bg-white/[0.04] p-7 lg:p-8">
                  <Quote aria-hidden="true" className="h-6 w-6 text-gold" />
                  <blockquote className="mt-5 text-white/85">{testimonial.quote}</blockquote>
                  <figcaption className="mt-6 text-sm text-white/60">
                    <span className="font-semibold text-white">{testimonial.initials}</span> —{" "}
                    {testimonial.location}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>

          <div className="mt-10">
            <Link to="/testimonials" className="btn-onnavy">
              Read All Testimonials
            </Link>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="section-y">
        <div className="container-page">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Resources</p>
            <h2 className="mt-5 text-3xl md:text-[2.6rem]">Resources to Help You Stay Informed</h2>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {resourceCards.map((card, index) => (
              <Reveal key={card.title} delay={index * 80}>
                <Link
                  to="/resources"
                  className="card-hover flex h-full flex-col p-6 focus-visible:outline-offset-4"
                >
                  <card.icon aria-hidden="true" className="h-6 w-6 text-gold" />
                  <h3 className="mt-4 font-serif text-xl">{card.title}</h3>
                  <p className="mt-3 flex-1 text-sm text-muted-foreground">{card.copy}</p>
                  <span className="mt-5 text-sm font-semibold text-navy-deep">View resource</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ConsultationCta />
    </>
  );
}
