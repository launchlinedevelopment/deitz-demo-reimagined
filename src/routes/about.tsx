import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Phone, Printer } from "lucide-react";
import kenPhoto from "@/assets/ken-deitz.png";
import officeImage from "@/assets/office.jpg";
import { credentials, firm } from "@/lib/firm";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { ConsultationCta } from "@/components/site/ConsultationCta";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Kenneth R. Deitz, CPA | Simon & Deitz LLC, Freehold NJ" },
      {
        name: "description",
        content:
          "Kenneth R. Deitz, CPA brings 25 years in public accounting devoted to individual and small business accounting and tax issues in Freehold, New Jersey.",
      },
      { property: "og:title", content: "About — Simon & Deitz LLC" },
      {
        property: "og:description",
        content: "Experienced guidance and personalized service from Kenneth R. Deitz, CPA.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About the Firm"
        title="Experienced Guidance. Personalized Service."
        intro="Simon & Deitz LLC is a peer reviewed accounting firm on East Main Street in Freehold, New Jersey, led by Kenneth R. Deitz, CPA."
      />

      <section className="section-y">
        <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <Reveal className="card-surface p-6 lg:sticky lg:top-28">
            <img
              src={kenPhoto}
              alt="Kenneth R. Deitz, CPA"
              width={242}
              height={303}
              loading="lazy"
              className="mx-auto w-full max-w-[18rem] rounded-md object-cover"
            />
            <p className="mt-5 text-center font-serif text-xl">{firm.principal}</p>
            <p className="mt-1 text-center text-sm text-muted-foreground">Principal, {firm.name}</p>
            <ul className="mt-6 space-y-2 border-t border-border pt-6 text-sm text-muted-foreground">
              {credentials.map((credential) => (
                <li key={credential} className="flex gap-2.5">
                  <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" />
                  {credential}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="text-2xl md:text-3xl">A practice built around the client</h2>
            <div className="mt-6 space-y-5 text-lg text-muted-foreground">
              <p>
                Kenneth R. Deitz, CPA lets you tap from 25 years in public accounting, all
                exclusively devoted to individual and small business accounting and tax issues.
                His work spans accounting, taxation, business management and financial services.
              </p>
              <p>{firm.relationships}</p>
              <p>
                He is a graduate of Baruch College in New York with a degree in Accounting, having
                won various educational awards, and holds a Master of Science in Taxation from Pace
                University in New York. Ken is a Certified QuickBooks Advisor and a member of the
                New Jersey Society of Certified Public Accountants.
              </p>
              <p className="text-base">{firm.peerReview}</p>
            </div>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/qualifications" className="btn-primary">
                View Qualifications
              </Link>
              <Link to="/services" className="btn-outline">
                Explore Our Services
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Location */}
      <section className="bg-surface section-y">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="eyebrow">Visit the office</p>
            <h2 className="mt-5 text-3xl">Freehold, New Jersey</h2>
            <ul className="mt-7 space-y-4 text-[1.02rem]">
              <li className="flex gap-3">
                <MapPin aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-gold" />
                <a href={firm.mapsUrl} target="_blank" rel="noreferrer" className="link-quiet">
                  {firm.address.street}, {firm.address.city}, {firm.address.state} {firm.address.zip}
                </a>
              </li>
              <li className="flex gap-3">
                <Phone aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-gold" />
                <a href={firm.phoneHref} className="font-semibold text-navy-deep">
                  {firm.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Printer aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-gold" />
                <span className="text-muted-foreground">Fax: {firm.fax}</span>
              </li>
            </ul>
            <a href={firm.mapsUrl} target="_blank" rel="noreferrer" className="btn-outline mt-8">
              Open in Google Maps
            </a>
          </Reveal>

          <Reveal delay={100} className="overflow-hidden rounded-[calc(var(--radius)+4px)] border border-border shadow-card">
            <img
              src={officeImage}
              alt="Main Street storefront office building, representative of the Freehold office location"
              width={1408}
              height={1008}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </Reveal>
        </div>
      </section>

      <ConsultationCta />
    </>
  );
}
