/** Launchline Development demo banner + persistent watermark. */

export function DemoBanner() {
  return (
    <div className="w-full bg-navy-deep text-primary-foreground">
      <div className="container-page flex items-center justify-center gap-2 py-2 text-center">
        <span
          aria-hidden="true"
          className="hidden h-1.5 w-1.5 shrink-0 rounded-full bg-gold sm:block"
        />
        <p className="text-[0.7rem] leading-snug font-medium tracking-[0.12em] uppercase sm:text-xs">
          Website Redesign Concept — Created by Launchline Development
        </p>
      </div>
    </div>
  );
}

export function DemoWatermark() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed right-3 bottom-3 z-40 select-none sm:right-5 sm:bottom-5"
    >
      <span className="block rounded-md border border-white/15 bg-navy-deep/70 px-2.5 py-1.5 text-[0.55rem] font-semibold tracking-[0.18em] text-white/90 uppercase opacity-70 backdrop-blur-[2px] sm:text-[0.6rem]">
        Launchline Development
      </span>
    </div>
  );
}

export function DemoEnvironmentLabel() {
  return (
    <p className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-1.5 text-[0.68rem] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold" />
      Launchline Development — Demo Environment
    </p>
  );
}
