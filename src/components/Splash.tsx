import { useEffect, useState } from "react";

export function Splash() {
  const [gone, setGone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setGone(true), 2400);
    return () => clearTimeout(t);
  }, []);

  if (gone) return null;

  const letters = "MSR HOME CLEANING".split("");

  return (
    <div className="animate-splash-out fixed inset-0 z-[100] flex flex-col items-center justify-center bg-navy text-white">
      <div className="flex flex-wrap justify-center px-4 font-display text-2xl tracking-[0.25em] sm:text-4xl md:text-5xl">
        {letters.map((ch, i) => (
          <span
            key={i}
            className="splash-letter"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            {ch === " " ? "\u00A0" : ch}
          </span>
        ))}
      </div>
      <div className="mt-8 h-px w-56 bg-white/15 sm:w-72">
        <div
          className="splash-bar h-full bg-gold"
          style={{ animationDelay: "200ms" }}
        />
      </div>
      <p
        className="splash-letter mt-5 text-[11px] uppercase tracking-[0.45em] text-white/60"
        style={{ animationDelay: "1100ms" }}
      >
        Hyderabad · Since 2009
      </p>
    </div>
  );
}
