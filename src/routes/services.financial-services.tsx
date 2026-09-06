import { createFileRoute } from "@tanstack/react-router";
import { services } from "@/lib/firm";
import { ServiceDetail } from "@/components/site/ServiceDetail";

const service = services.find((s) => s.key === "financial-services")!;

export const Route = createFileRoute("/services/financial-services")({
  head: () => ({
    meta: [
      { title: "Financial Services | Retirement, Succession & Estate Planning — Simon & Deitz LLC" },
      {
        name: "description",
        content:
          "Tax and retirement planning, business entity selection, succession planning, estate and trust preparation and IRS representation in Freehold, New Jersey.",
      },
      { property: "og:title", content: "Financial Services — Simon & Deitz LLC" },
      {
        property: "og:description",
        content: "Retirement planning, entity selection, succession planning and IRS representation.",
      },
      { property: "og:url", content: "/services/financial-services" },
    ],
    links: [{ rel: "canonical", href: "/services/financial-services" }],
  }),
  component: () => <ServiceDetail service={service} />,
});
