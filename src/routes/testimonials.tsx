import { createFileRoute } from "@tanstack/react-router";
import { Quote } from "lucide-react";
import { testimonials } from "@/lib/firm";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { ConsultationCta } from "@/components/site/ConsultationCta";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Client Testimonials | Simon & Deitz LLC, Freehold NJ" },
      {
        name: "description",
        content:
          "Comments from long-standing clients of Kenneth R. Deitz, CPA on tax preparation, business accounting and estate planning.",
      },
      { property: "og:title", content: "Testimonials — Simon & Deitz LLC" },
      {
        property: "og:description",
        content: "Relationships built on trust: comments from long-standing clients.",
      },
      { property: "og:url", content: "/testimonials" },
    ],
    links: [{ rel: "canonical", href: "/testimonials" }],
  }),
  component: TestimonialsPage,
});

function TestimonialsPage() {
  return (
    <>
      <PageHero
        eyebrow="Testimonials"
        title="Relationships Built on Trust"
        intro="These comments are published on the firm's existing website. Additional verified testimonials can be added to this layout at any time."
      />

      <section className="section-y">
        <div className="container-page grid gap-6 md:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.initials} delay={index * 80}>
              <figure className="card-hover flex h-full flex-col p-7 lg:p-8">
                <Quote aria-hidden="true" className="h-6 w-6 text-gold" />
                <blockquote className="mt-5 flex-1 text-[1.02rem] text-muted-foreground">
                  {testimonial.quote}
                </blockquote>
                <figcaption className="mt-6 border-t border-border pt-5 text-sm">
                  <span className="font-serif text-lg text-navy-deep">{testimonial.initials}</span>
                  <span className="text-muted-foreground"> — {testimonial.location}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <div className="container-page mt-10">
          <p className="rounded-md border border-dashed border-border-strong bg-surface p-5 text-sm text-muted-foreground">
            Placeholder note for the firm: additional client testimonials supplied by Simon &amp;
            Deitz LLC can be dropped straight into this grid.
          </p>
        </div>
      </section>

      <ConsultationCta />
    </>
  );
}
