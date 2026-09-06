import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-deep text-white">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 20%, oklch(0.7 0.09 78) 0, transparent 45%)",
        }}
      />
      <div className="container-page relative py-16 md:py-24">
        <p className="eyebrow text-gold-soft">{eyebrow}</p>
        <h1 className="mt-5 max-w-3xl text-4xl text-white md:text-5xl lg:text-[3.4rem]">{title}</h1>
        {intro && <p className="mt-6 max-w-2xl text-lg text-white/75">{intro}</p>}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
