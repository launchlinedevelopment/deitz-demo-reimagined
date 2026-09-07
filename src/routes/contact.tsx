import { createFileRoute } from "@tanstack/react-router";
import { ContactExperience } from "@/components/site/ContactExperience";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact | Schedule a Consultation — Simon & Deitz LLC, Freehold NJ" },
      {
        name: "description",
        content:
          "Contact Simon & Deitz LLC at 42 East Main Street, Freehold, NJ 07728 or call 732-780-3665 to schedule a consultation.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Contact — Simon & Deitz LLC" },
      {
        property: "og:description",
        content: "Schedule a consultation with Kenneth R. Deitz, CPA in Freehold, New Jersey.",
      },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's Talk About Your Financial Goals"
        intro="Whether you need help with taxes, accounting, business planning, or long-term financial strategy, Simon & Deitz LLC is here to help."
      />
      <ContactExperience />
    </>
  );
}
