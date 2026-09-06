import { Link } from "@tanstack/react-router";
import { ArrowRight, Phone } from "lucide-react";
import { firm } from "@/lib/firm";
import { Reveal } from "./Reveal";

export function ConsultationCta() {
  return (
    <section className="bg-navy-deep text-white">
      <div className="container-page section-y">
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="rule-gold mx-auto" />
          <h2 className="mt-6 text-3xl text-white md:text-[2.6rem]">
            Let's Talk About Your Financial Goals
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/75">
            Whether you need help with taxes, accounting, business planning, or long-term financial
            strategy, Simon &amp; Deitz LLC is here to help.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/contact" className="btn-gold w-full sm:w-auto">
              Schedule a Consultation
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
            <a href={firm.phoneHref} className="btn-onnavy w-full sm:w-auto">
              <Phone aria-hidden="true" className="h-4 w-4" />
              {firm.phone}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
