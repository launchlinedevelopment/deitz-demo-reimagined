import { createFileRoute, Link } from "@tanstack/react-router";
import { Calculator, ExternalLink, FileText, Landmark, Mail } from "lucide-react";
import { calculatorTopics, treasuryLinks } from "@/lib/firm";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { ConsultationCta } from "@/components/site/ConsultationCta";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Resources | Tax Tips, Treasury Links & Calculators — Simon & Deitz LLC" },
      {
        name: "description",
        content:
          "Tax tips, treasury links, financial calculators and newsletters from Simon & Deitz LLC in Freehold, New Jersey.",
      },
      { property: "og:title", content: "Resources — Simon & Deitz LLC" },
      {
        property: "og:description",
        content: "Tax tips, treasury links, financial calculators and firm newsletters.",
      },
      { property: "og:url", content: "/resources" },
    ],
    links: [{ rel: "canonical", href: "/resources" }],
  }),
  component: ResourcesPage,
});

function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Resources to Help You Stay Informed"
        intro="Reference material the firm shares with clients, gathered in one place."
      />

      <section className="section-y">
        <div className="container-page grid gap-6 lg:grid-cols-2">
          <Reveal>
            <article id="tax-tips" className="card-surface h-full p-7 lg:p-8">
              <FileText aria-hidden="true" className="h-6 w-6 text-gold" />
              <h2 className="mt-4 font-serif text-2xl">Tax Tips — Be an informed taxpayer</h2>
              <p className="mt-4 text-muted-foreground">
                From the firm's client letter: "At Simon &amp; Deitz, we take great pride in
                providing our clients with personal services that are second to none. Most people
                today seek assistance in financial matters from one who is professional,
                knowledgeable, honest, and sincere. We believe we offer these qualities to our
                clients."
              </p>
              <p className="mt-4 text-sm text-muted-foreground">
                Full tax tip documents will be republished here from the firm's existing library.
              </p>
            </article>
          </Reveal>

          <Reveal delay={80}>
            <article id="treasury-links" className="card-surface h-full p-7 lg:p-8">
              <Landmark aria-hidden="true" className="h-6 w-6 text-gold" />
              <h2 className="mt-4 font-serif text-2xl">Treasury Links</h2>
              <p className="mt-4 text-muted-foreground">
                Useful government websites for taxpayers and business owners.
              </p>
              <ul className="mt-6 space-y-3">
                {treasuryLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 font-medium text-navy-deep hover:text-navy-soft"
                    >
                      {link.label}
                      <ExternalLink aria-hidden="true" className="h-3.5 w-3.5 text-gold" />
                    </a>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>

          <Reveal delay={140}>
            <article id="calculators" className="card-surface h-full p-7 lg:p-8">
              <Calculator aria-hidden="true" className="h-6 w-6 text-gold" />
              <h2 className="mt-4 font-serif text-2xl">Financial Calculators</h2>
              <p className="mt-4 text-muted-foreground">
                The calculator set offered on the firm's current website:
              </p>
              <ul className="mt-6 space-y-2.5 text-muted-foreground">
                {calculatorTopics.map((topic) => (
                  <li key={topic} className="flex gap-2.5">
                    <span aria-hidden="true" className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-gold" />
                    {topic}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm text-muted-foreground">
                These would be embedded as interactive tools on the live site.
              </p>
            </article>
          </Reveal>

          <Reveal delay={200}>
            <article id="newsletters" className="card-surface h-full p-7 lg:p-8">
              <Mail aria-hidden="true" className="h-6 w-6 text-gold" />
              <h2 className="mt-4 font-serif text-2xl">Financial Newsletters</h2>
              <p className="mt-4 text-muted-foreground">
                Simon &amp; Deitz LLC publishes periodic newsletters covering tax law changes and
                planning opportunities, including past editions of "Lowest Tax is the Rule."
              </p>
              <p className="mt-4 text-sm text-muted-foreground">
                Newsletter sign-up is a data-collecting feature, so in this demonstration it routes
                to the protected contact experience rather than collecting an address.
              </p>
              <Link to="/contact" className="btn-outline mt-6">
                Ask to be added to the newsletter
              </Link>
            </article>
          </Reveal>
        </div>
      </section>

      <ConsultationCta />
    </>
  );
}
