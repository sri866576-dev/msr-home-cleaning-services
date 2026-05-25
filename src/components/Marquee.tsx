import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: ReactNode;
  className?: string;
  speed?: "normal" | "slow";
  manual?: boolean;
}

export function Marquee({ children, className, speed = "normal", manual = false }: MarqueeProps) {
  if (manual) {
    return (
      <div
        className={cn(
          "marquee-mask overflow-x-auto pb-3 [scrollbar-width:none] [-ms-overflow-style:none]",
          className,
        )}
      >
        <div
          className={cn(
            "flex w-max gap-6 px-4 md:px-8",
            speed === "slow" ? "animate-marquee-slow" : "animate-marquee",
          )}
        >
          <div className="flex shrink-0 gap-6">{children}</div>
          <div className="flex shrink-0 gap-6" aria-hidden="true">
            {children}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("marquee-mask overflow-hidden", className)}>
      <div className={cn("flex w-max gap-6", speed === "slow" ? "animate-marquee-slow" : "animate-marquee")}>
        <div className="flex shrink-0 gap-6">{children}</div>
        <div className="flex shrink-0 gap-6" aria-hidden="true">{children}</div>
      </div>
    </div>
  );
}
