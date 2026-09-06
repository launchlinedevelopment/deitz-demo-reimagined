import { createFileRoute } from "@tanstack/react-router";
import { services } from "@/lib/firm";
import { ServiceDetail } from "@/components/site/ServiceDetail";

const service = services.find((s) => s.key === "accounting")!;

export const Route = createFileRoute("/services/accounting")({
  head: () => ({
    meta: [
      { title: "Accounting Services | Simon & Deitz LLC, Freehold NJ" },
      {
        name: "description",
        content:
          "Financial statements, compilations, reviews and audits, projections, bank loan support and bookkeeping from Simon & Deitz LLC in Freehold, New Jersey.",
      },
      { property: "og:title", content: "Accounting Services — Simon & Deitz LLC" },
      {
        property: "og:description",
        content: "Financial statements, compilations, reviews, projections and bookkeeping.",
      },
      { property: "og:url", content: "/services/accounting" },
    ],
    links: [{ rel: "canonical", href: "/services/accounting" }],
  }),
  component: () => <ServiceDetail service={service} />,
});
