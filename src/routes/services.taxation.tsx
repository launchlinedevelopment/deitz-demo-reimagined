import { createFileRoute } from "@tanstack/react-router";
import { services } from "@/lib/firm";
import { ServiceDetail } from "@/components/site/ServiceDetail";

const service = services.find((s) => s.key === "taxation")!;

export const Route = createFileRoute("/services/taxation")({
  head: () => ({
    meta: [
      { title: "Tax Services | Individual & Corporate Tax Preparation — Simon & Deitz LLC" },
      {
        name: "description",
        content:
          "Individual and corporate tax return preparation, payroll tax records, IRS practice and procedure, year-end projections and estate planning in Freehold, NJ.",
      },
      { property: "og:title", content: "Tax Services — Simon & Deitz LLC" },
      {
        property: "og:description",
        content: "Individual and corporate tax preparation and year-round tax planning.",
      },
      { property: "og:url", content: "/services/taxation" },
    ],
    links: [{ rel: "canonical", href: "/services/taxation" }],
  }),
  component: () => <ServiceDetail service={service} />,
});
