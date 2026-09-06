import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { firm } from "@/lib/firm";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Simon & Deitz LLC Redesign Concept" },
      {
        name: "description",
        content:
          "How information is handled in this Launchline Development redesign concept for Simon & Deitz LLC.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Privacy Policy — Simon & Deitz LLC Concept" },
      {
        property: "og:description",
        content: "Information handling in this private redesign demonstration.",
      },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Privacy"
        title="Privacy Policy"
        intro="This page describes how information is handled within this redesign concept."
      />
      <section className="section-y">
        <div className="container-page max-w-3xl space-y-6 text-muted-foreground">
          <h2 className="text-2xl text-navy-deep">This is a demonstration website</h2>
          <p>
            This website is a private redesign concept created by Launchline Development for
            Simon &amp; Deitz LLC. It is not the firm's official website and is not operated by the
            firm.
          </p>
          <h2 className="text-2xl text-navy-deep">Information you enter</h2>
          <p>
            The contact form in this demonstration does not transmit, email, or store what you type.
            Entries stay in your browser for the length of your visit and are discarded when the
            form resets. No inquiry reaches Simon &amp; Deitz LLC through this concept site.
          </p>
          <h2 className="text-2xl text-navy-deep">Demo access</h2>
          <p>
            The demo password screen exists to keep this presentation private. It is access control
            for a sales demonstration, not production-grade security, and it stores only a simple
            "unlocked" marker in your browser session.
          </p>
          <h2 className="text-2xl text-navy-deep">The live website</h2>
          <p>
            On a live build, inquiries would be delivered securely to the firm and covered by a
            privacy policy written and approved by Simon &amp; Deitz LLC.
          </p>
          <h2 className="text-2xl text-navy-deep">Questions</h2>
          <p>
            The firm can be reached directly at{" "}
            <a href={firm.phoneHref} className="font-semibold text-navy-deep">
              {firm.phone}
            </a>{" "}
            or at {firm.address.street}, {firm.address.city}, {firm.address.state}{" "}
            {firm.address.zip}.
          </p>
        </div>
      </section>
    </>
  );
}
