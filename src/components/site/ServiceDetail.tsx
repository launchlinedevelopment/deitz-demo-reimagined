import { Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { services, type Service } from "@/lib/firm";
import { PageHero } from "./PageHero";
import { Reveal } from "./Reveal";
import { ConsultationCta } from "./ConsultationCta";

export function ServiceDetail({ service }: { service: Service }) {
  const others = services.filter((s) => s.key !== service.key);

  return (
    <>
      <PageHero eyebrow={`Services — ${service.title}`} title={service.tagline} intro={service.summary} />

      <section className="section-y">
        <div className="container-page grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <h2 className="text-2xl md:text-3xl">{service.title} at Simon &amp; Deitz LLC</h2>
            <div className="mt-6 space-y-5 text-lg text-muted-foreground">
              {service.detail.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
            <Link to="/contact" className="btn-primary mt-9">
              Schedule a Consultation
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </Reveal>

          <Reveal delay={100}>
            <div className="card-surface p-7 lg:p-8">
              <h3 className="font-serif text-xl">What's included</h3>
              <ul className="mt-6 space-y-3">
                {service.items.map((item) => (
                  <li key={item} className="flex gap-3 text-[0.98rem]">
                    <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-gold" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-surface section-y">
        <div className="container-page">
          <h2 className="text-2xl md:text-3xl">Other service areas</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {others.map((other) => (
              <Link key={other.key} to={other.path} className="card-hover p-7">
                <h3 className="font-serif text-xl">{other.title}</h3>
                <p className="mt-3 text-muted-foreground">{other.summary}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-navy-deep">
                  {other.cta}
                  <ArrowRight aria-hidden="true" className="h-4 w-4 text-gold" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ConsultationCta />
    </>
  );
}
