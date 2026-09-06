import { createFileRoute } from "@tanstack/react-router";
import { Award, BookOpen, GraduationCap, ShieldCheck, Users } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { ConsultationCta } from "@/components/site/ConsultationCta";
import { firm } from "@/lib/firm";

export const Route = createFileRoute("/qualifications")({
  head: () => ({
    meta: [
      { title: "Qualifications | CPA, RIA & QuickBooks Advisor — Simon & Deitz LLC" },
      {
        name: "description",
        content:
          "Kenneth R. Deitz is a Certified Public Accountant, Registered Investment Advisor and Certified QuickBooks Advisor with an M.S. in Taxation from Pace University.",
      },
      { property: "og:title", content: "Qualifications — Simon & Deitz LLC" },
      {
        property: "og:description",
        content: "Certifications, education and professional memberships of Kenneth R. Deitz, CPA.",
      },
      { property: "og:url", content: "/qualifications" },
    ],
    links: [{ rel: "canonical", href: "/qualifications" }],
  }),
  component: QualificationsPage,
});

const certifications = [
  {
    icon: ShieldCheck,
    title: "Certified Public Accountant",
    copy: "Licensed CPA practising in public accounting.",
  },
  {
    icon: Award,
    title: "Registered Investment Advisor",
    copy: "Registered to advise on investment and financial planning matters.",
  },
  {
    icon: BookOpen,
    title: "Certified QuickBooks Advisor",
    copy: "Certified to set up, correct and support QuickBooks for client bookkeeping.",
  },
  {
    icon: Users,
    title: "New Jersey Society of CPAs",
    copy: "Member of the New Jersey Society of Certified Public Accountants.",
  },
];

const education = [
  {
    credential: "M.S. in Taxation",
    school: "Pace University, New York",
    note: "Master of Science focused on taxation.",
  },
  {
    credential: "B.A. in Accounting",
    school: "Baruch College, New York",
    note: "Degree in Accounting, having won various educational awards.",
  },
];

function QualificationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Qualifications"
        title="Credentials Behind the Advice"
        intro="Kenneth R. Deitz, CPA lets you tap from 25 years in public accounting, all exclusively devoted to individual and small business accounting and tax issues."
      />

      <section className="section-y">
        <div className="container-page">
          <Reveal>
            <h2 className="text-2xl md:text-3xl">Certifications &amp; memberships</h2>
          </Reveal>
          <div className="mt-9 grid gap-6 sm:grid-cols-2">
            {certifications.map((item, index) => (
              <Reveal key={item.title} delay={index * 80}>
                <article className="card-hover flex h-full gap-5 p-7">
                  <item.icon aria-hidden="true" className="h-6 w-6 shrink-0 text-gold" />
                  <div>
                    <h3 className="font-serif text-xl">{item.title}</h3>
                    <p className="mt-2 text-muted-foreground">{item.copy}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface section-y">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <Reveal>
            <h2 className="text-2xl md:text-3xl">Education</h2>
            <ol className="mt-8 space-y-8 border-l border-border-strong pl-7">
              {education.map((item) => (
                <li key={item.credential} className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute top-2 -left-[2.05rem] h-2.5 w-2.5 rounded-full bg-gold ring-4 ring-surface"
                  />
                  <div className="flex items-center gap-2">
                    <GraduationCap aria-hidden="true" className="h-4 w-4 text-navy-soft" />
                    <h3 className="font-serif text-xl">{item.credential}</h3>
                  </div>
                  <p className="mt-1 text-sm font-semibold tracking-wide text-navy-soft uppercase">
                    {item.school}
                  </p>
                  <p className="mt-2 text-muted-foreground">{item.note}</p>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="text-2xl md:text-3xl">Experience &amp; standards</h2>
            <div className="card-surface mt-8 p-7 lg:p-8">
              <p className="font-serif text-[2.4rem] leading-none font-semibold text-navy-deep">25</p>
              <p className="mt-2 text-sm tracking-[0.14em] text-muted-foreground uppercase">
                Years in public accounting
              </p>
              <div className="rule-gold my-6" />
              <p className="text-muted-foreground">
                All of it devoted exclusively to individual and small business accounting and tax
                issues — the same work the firm does today.
              </p>
              <p className="mt-5 border-t border-border pt-5 text-muted-foreground">
                {firm.peerReview}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <ConsultationCta />
    </>
  );
}
