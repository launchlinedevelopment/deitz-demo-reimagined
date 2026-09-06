import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { firm, navLinks } from "@/lib/firm";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-background/95 backdrop-blur transition-shadow duration-300",
        scrolled ? "border-border shadow-[0_8px_24px_-20px_oklch(0.24_0.05_258/0.6)]" : "border-transparent",
      )}
    >
      <div className="container-page flex h-[4.5rem] items-center justify-between gap-4 lg:h-20">
        <Link to="/" className="group flex flex-col leading-tight" aria-label="Simon & Deitz LLC — home">
          <span className="font-serif text-lg font-semibold text-navy-deep sm:text-xl">
            {firm.name}
          </span>
          <span className="text-[0.68rem] font-medium tracking-[0.14em] text-muted-foreground uppercase sm:text-[0.72rem]">
            {firm.principal}
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeOptions={{ exact: link.to === "/" }}
              className="rounded-md px-3 py-2 text-[0.9rem] font-medium text-muted-foreground transition-colors hover:bg-surface hover:text-navy-deep data-[status=active]:text-navy-deep data-[status=active]:underline data-[status=active]:decoration-gold data-[status=active]:decoration-2 data-[status=active]:underline-offset-8"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={firm.phoneHref}
            className="inline-flex items-center gap-2 text-sm font-semibold text-navy-deep transition-colors hover:text-navy-soft"
          >
            <Phone aria-hidden="true" className="h-4 w-4 text-gold" />
            {firm.phone}
          </a>
          <Link to="/contact" className="btn-primary">
            Schedule a Consultation
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={firm.phoneHref}
            aria-label={`Call ${firm.phone}`}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border text-navy-deep"
          >
            <Phone aria-hidden="true" className="h-4 w-4" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border text-navy-deep"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-nav" className="border-t border-border bg-background lg:hidden">
          <nav aria-label="Mobile" className="container-page flex flex-col py-3">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                activeOptions={{ exact: link.to === "/" }}
                className="border-b border-border/70 py-3 text-base font-medium text-navy-deep last:border-0"
              >
                {link.label}
              </Link>
            ))}
            <Link to="/contact" className="btn-primary mt-4 mb-2 w-full">
              Schedule a Consultation
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
