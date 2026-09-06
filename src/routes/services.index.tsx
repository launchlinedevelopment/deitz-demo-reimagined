import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/firm";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { ConsultationCta } from "@/components/site/ConsultationCta";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Services | Accounting, Taxation & Financial Services — Simon & Deitz LLC" },
      {
        name: "description",
        content:
          "Accounting, taxation and financial services for individuals, families and businesses from Simon & Deitz LLC in Freehold, New Jersey.",
      },
      { property: "og:title", content: "Services — Simon & Deitz LLC" },
      {
        property: "og:description",
        content: "Accounting, taxation and financial services in Freehold, New Jersey.",
      },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Financial Expertise for Every Stage"
        intro="Simon & Deitz LLC provides accounting, tax, and financial services tailored to individuals and businesses — with the same principal involved from first conversation to final filing."
      />

      <section className="section-y">
        <div className="container-page grid gap-8 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.key} delay={index * 90}>
              <article className="card-hover flex h-full flex-col p-7 lg:p-8">
                <h2 className="font-serif text-2xl">{service.title}</h2>
                <div className="rule-gold mt-4" />
                <p className="mt-5 text-muted-foreground">{service.summary}</p>
                <ul className="mt-6 flex-1 space-y-2.5 text-[0.95rem] text-muted-foreground">
                  {service.items.map((item) => (
                    <li key={item} className="flex gap-2.5">
                      <span aria-hidden="true" className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-gold" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link to={service.path} className="btn-outline mt-8">
                  {service.cta}
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <ConsultationCta />
    </>
  );
}
