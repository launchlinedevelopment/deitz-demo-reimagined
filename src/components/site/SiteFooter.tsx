import { Link } from "@tanstack/react-router";
import { firm, navLinks, services } from "@/lib/firm";

export function SiteFooter() {
  return (
    <footer className="bg-navy-deep text-white/75">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4 lg:py-16">
        <div className="lg:col-span-2 lg:max-w-sm">
          <p className="font-serif text-xl font-semibold text-white">{firm.name}</p>
          <p className="mt-1 text-sm tracking-[0.12em] text-white/60 uppercase">{firm.principal}</p>
          <address className="mt-5 space-y-1 text-sm not-italic">
            <p>{firm.address.street}</p>
            <p>
              {firm.address.city}, {firm.address.state} {firm.address.zip}
            </p>
            <p>
              Phone:{" "}
              <a href={firm.phoneHref} className="text-white transition-colors hover:text-gold">
                {firm.phone}
              </a>
            </p>
            <p>Fax: {firm.fax}</p>
          </address>
          <p className="mt-5 text-sm text-white/60">{firm.peerReview}</p>
        </div>

        <div>
          <h2 className="text-xs font-semibold tracking-[0.16em] text-white uppercase">Navigate</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="transition-colors hover:text-gold">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-semibold tracking-[0.16em] text-white uppercase">Services</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {services.map((service) => (
              <li key={service.key}>
                <Link to={service.path} className="transition-colors hover:text-gold">
                  {service.title}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/resources" className="transition-colors hover:text-gold">
                Resources
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="transition-colors hover:text-gold">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-white/50 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Simon &amp; Deitz LLC. All rights reserved.</p>
          <p className="md:pr-40">
            Redesign concept created by Launchline Development. Not the firm's official website.
          </p>
        </div>
      </div>
    </footer>
  );
}
