import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: ReactNode;
  className?: string;
  speed?: "normal" | "slow";
}

export function Marquee({ children, className, speed = "normal" }: MarqueeProps) {
  return (
    <div className={cn("marquee-mask overflow-hidden", className)}>
      <div className={cn("flex w-max gap-6", speed === "slow" ? "animate-marquee-slow" : "animate-marquee")}>
        <div className="flex shrink-0 gap-6">{children}</div>
        <div className="flex shrink-0 gap-6" aria-hidden="true">{children}</div>
      </div>
    </div>
  );
}
