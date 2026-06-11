import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Bot,
  ChevronLeft,
  IndianRupee,
  MapPin,
  MessageCircle,
  Sparkles,
  X,
} from "lucide-react";

const WHATSAPP_PHONE = "918919780725";

type HelpBotProps = {
  onBook: (service?: string) => void;
  autoPreviewDelayMs?: number;
  autoPreviewDurationMs?: number;
};

type HelpStep = "home" | "services" | "pricing" | "areas";

function openWhatsApp(message: string) {
  const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

function scrollToSection(id: string) {
  const element = document.getElementById(id);
  element?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function HelpBot({
  onBook,
  autoPreviewDelayMs = 2200,
  autoPreviewDurationMs = 2600,
}: HelpBotProps) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<HelpStep>("home");
  const [showLauncherLabel, setShowLauncherLabel] = useState(false);
  const hasInteractedRef = useRef(false);

  useEffect(() => {
    if (hasInteractedRef.current) {
      return;
    }

    let hideTimer: number | undefined;
    const showTimer = window.setTimeout(() => {
      if (hasInteractedRef.current) {
        return;
      }

      setShowLauncherLabel(true);
      hideTimer = window.setTimeout(() => {
        if (!hasInteractedRef.current) {
          setShowLauncherLabel(false);
        }
      }, autoPreviewDurationMs);
    }, autoPreviewDelayMs);

    return () => {
      window.clearTimeout(showTimer);
      if (hideTimer) {
        window.clearTimeout(hideTimer);
      }
    };
  }, [autoPreviewDelayMs, autoPreviewDurationMs]);

  const resetBot = () => {
    setStep("home");
    setOpen(false);
  };

  const handleToggle = () => {
    hasInteractedRef.current = true;
    setShowLauncherLabel(false);
    setOpen((current) => !current);
    if (open) {
      setStep("home");
    }
  };

  const openBooking = (service?: string) => {
    onBook(service);
    resetBot();
  };

  const homeOptions = [
    {
      label: "Book a service",
      icon: Sparkles,
      action: () => setStep("services"),
    },
    {
      label: "Pricing help",
      icon: IndianRupee,
      action: () => setStep("pricing"),
    },
    {
      label: "Service areas",
      icon: MapPin,
      action: () => setStep("areas"),
    },
    {
      label: "Emergency cleaning",
      icon: MessageCircle,
      action: () =>
        openWhatsApp("Hi MSR Deep Cleaning, I need emergency cleaning service today."),
    },
  ];

  const quickServices = [
    "Deep Home Cleaning",
    "Office Cleaning",
    "Kitchen Deep Cleaning",
    "Sofa & Carpet Care",
  ];

  const pricingServices = [
    "Solar Panel Cleaning",
    "Professional Painting Services",
    "Pest Control Services",
    "Water Tank Cleaning",
  ];

  const areaServices = [
    "Banjara Hills",
    "Jubilee Hills",
    "Gachibowli",
    "Hitech City",
  ];

  const renderContent = () => {
    if (step === "services") {
      return (
        <>
          <p className="text-sm font-light leading-relaxed text-white/70">
            Choose one service and we will open the booking form for it.
          </p>
          <div className="mt-4 grid gap-2">
            {[
              "Deep Home Cleaning",
              "Office Cleaning",
              "Kitchen Deep Cleaning",
              "Sofa & Carpet Care",
            ].map((service) => (
              <button
                key={service}
                type="button"
                onClick={() => openBooking(service)}
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-left text-sm font-light text-white transition-colors hover:border-gold/60 hover:bg-white/10"
              >
                <span>{service}</span>
                <ArrowRight className="h-4 w-4 text-gold" />
              </button>
            ))}
            <button
              type="button"
              onClick={() =>
                openWhatsApp(
                  "Hi MSR Deep Cleaning, I need a service that is not listed in the quick options.",
                )
              }
              className="flex items-center justify-between rounded-2xl border border-white/10 bg-whatsapp/85 px-4 py-3 text-left text-sm font-normal text-white transition-colors hover:bg-whatsapp"
            >
              <span>Need a different service?</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </>
      );
    }

    if (step === "pricing") {
      return (
        <>
          <p className="text-sm font-light leading-relaxed text-white/70">
            Pick what you need pricing for and we will guide you to the fastest option.
          </p>
          <div className="mt-4 grid gap-2">
            {pricingServices.map((service) => (
              <button
                key={service}
                type="button"
                onClick={() => openBooking(service)}
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-left text-sm font-light text-white transition-colors hover:border-gold/60 hover:bg-white/10"
              >
                <span>{service}</span>
                <ArrowRight className="h-4 w-4 text-gold" />
              </button>
            ))}
            <button
              type="button"
              onClick={() =>
                openWhatsApp("Hi MSR Deep Cleaning, I need a custom quote for a service.")
              }
              className="flex items-center justify-between rounded-2xl border border-white/10 bg-whatsapp/85 px-4 py-3 text-left text-sm font-normal text-white transition-colors hover:bg-whatsapp"
            >
              <span>Custom quote on WhatsApp</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </>
      );
    }

    if (step === "areas") {
      return (
        <>
          <p className="text-sm font-light leading-relaxed text-white/70">
            Want to check service coverage in your area? Choose from popular areas below.
          </p>
          <div className="mt-4 grid gap-2">
            {areaServices.map((area) => (
              <button
                key={area}
                type="button"
                onClick={() =>
                  openWhatsApp(
                    `Hi MSR Deep Cleaning, do you serve ${area}? I am interested in booking a service.`,
                  )
                }
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-left text-sm font-light text-white transition-colors hover:border-gold/60 hover:bg-white/10"
              >
                <span>{area}</span>
                <ArrowRight className="h-4 w-4 text-gold" />
              </button>
            ))}

            <button
              type="button"
              onClick={() => {
                scrollToSection("contact");
                resetBot();
              }}
              className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-left text-sm font-light text-white transition-colors hover:border-gold/60 hover:bg-white/10"
            >
              <span>Open contact section</span>
              <ArrowRight className="h-4 w-4 text-gold" />
            </button>

            <button
              type="button"
              onClick={() =>
                openWhatsApp("Hi MSR Deep Cleaning, can you confirm whether you serve my area?")
              }
              className="flex items-center justify-between rounded-2xl border border-white/10 bg-whatsapp/85 px-4 py-3 text-left text-sm font-normal text-white transition-colors hover:bg-whatsapp"
            >
              <span>Ask on WhatsApp</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </>
      );
    }

    return (
      <>
        <p className="text-sm font-light leading-relaxed text-white/70">
          Tell us what help you need. We will guide you step by step.
        </p>
        <div className="mt-4 grid gap-2">
          {homeOptions.map((option) => (
            <button
              key={option.label}
              type="button"
              onClick={option.action}
              className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-left text-sm font-light text-white transition-colors hover:border-gold/60 hover:bg-white/10"
            >
              <span className="flex items-center gap-3">
                <option.icon className="h-4 w-4 text-gold" />
                {option.label}
              </span>
              <ArrowRight className="h-4 w-4 text-gold" />
            </button>
          ))}
        </div>
      </>
    );
  };

  return (
    <div
      className="fixed bottom-4 left-4 z-60 flex items-end gap-3 sm:bottom-5 sm:left-5"
      onPointerDown={() => {
        // mark as interacted on any pointer down inside the help bot container
        hasInteractedRef.current = true;
      }}
    >
      {open ? (
        <div className="help-bot-panel w-[min(21rem,calc(100vw-5rem))] rounded-[1.6rem] border border-white/12 bg-[#06101a]/94 p-4 text-white shadow-[0_28px_60px_-28px_rgba(0,0,0,0.65)] backdrop-blur-xl sm:w-[22rem]">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-[11px] uppercase tracking-[0.24em] text-gold/80">Help Bot</div>
              <h3 className="mt-2 font-display text-xl text-white">What help do you need?</h3>
            </div>
            <button
              type="button"
              onClick={() => {
                hasInteractedRef.current = true;
                resetBot();
              }}
              aria-label="Close help bot"
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/6 text-white transition-colors hover:border-gold/60 hover:text-gold"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {renderContent()}

          {step !== "home" ? (
            <button
              type="button"
              onClick={() => {
                hasInteractedRef.current = true;
                setStep("home");
              }}
              className="mt-4 inline-flex items-center gap-2 text-xs font-normal uppercase tracking-[0.16em] text-white/60 transition-colors hover:text-gold"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              Back
            </button>
          ) : null}
        </div>
      ) : null}

      {!open ? (
        <button
          type="button"
          onClick={handleToggle}
          aria-label="Open help bot"
          className={`help-bot-trigger ${showLauncherLabel ? "help-bot-trigger-expanded" : ""}`}
        >
          <span className="help-bot-trigger-icon">
            <Bot className="h-5 w-5" strokeWidth={1.9} />
          </span>
          <span
            className={`help-bot-trigger-label ${showLauncherLabel ? "help-bot-trigger-label-visible" : ""}`}
          >
            Need help?
          </span>
        </button>
      ) : null}
    </div>
  );
}
