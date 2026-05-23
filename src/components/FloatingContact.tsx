import { useEffect, useRef, useState } from "react";
import { MessageCircle, Phone, X } from "lucide-react";

const PHONE = "+918919780725";
const PHONE_DISPLAY = "8919780725";
const WHATSAPP_PHONE = "918919780725";
const WA_MSG = encodeURIComponent("Hi MSR Home Care, I'd like to book a cleaning service.");

type FloatingContactProps = {
  autoPreviewDelayMs?: number;
  autoPreviewDurationMs?: number;
};

export function FloatingContact({
  autoPreviewDelayMs = 6200,
  autoPreviewDurationMs = 2400,
}: FloatingContactProps) {
  const [open, setOpen] = useState(false);
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

  const handleToggle = () => {
    hasInteractedRef.current = true;
    setShowLauncherLabel(false);
    setOpen((current) => !current);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 sm:bottom-5 sm:right-5">
      <div
        className={`floating-contact-panel ${
          open ? "floating-contact-panel-open" : "floating-contact-panel-closed"
        }`}
      >
        <div className="w-[min(14rem,calc(100vw-5rem))] rounded-[1.6rem] border border-white/12 bg-[#06101a]/94 p-3 text-white shadow-[0_28px_60px_-28px_rgba(0,0,0,0.65)] backdrop-blur-xl">
          <div className="mb-3 flex justify-end">
            <button
              type="button"
              onClick={handleToggle}
              aria-label="Close contact options"
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/6 text-white transition-colors hover:border-gold/60 hover:text-gold"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="flex flex-col gap-3">
            <a
              href={`https://wa.me/${WHATSAPP_PHONE}?text=${WA_MSG}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`WhatsApp ${PHONE_DISPLAY}`}
              className="floating-contact-action bg-whatsapp text-white shadow-elegant"
            >
              <MessageCircle className="h-5 w-5" fill="currentColor" strokeWidth={0} />
              <span>WhatsApp</span>
            </a>
            <a
              href={`tel:${PHONE}`}
              aria-label={`Call ${PHONE_DISPLAY}`}
              className="floating-contact-action bg-gradient-gold text-navy shadow-gold"
            >
              <Phone className="h-5 w-5" fill="currentColor" strokeWidth={0} />
              <span>{PHONE_DISPLAY}</span>
            </a>
          </div>
        </div>
      </div>

      {!open ? (
        <button
          type="button"
          onClick={handleToggle}
          aria-expanded={open}
          aria-label="Open contact options"
          className={`floating-contact-trigger ${showLauncherLabel ? "floating-contact-trigger-expanded" : ""}`}
        >
          <span className="floating-contact-trigger-icon">
            <Phone className="h-5 w-5" fill="currentColor" strokeWidth={0} />
          </span>
          <span
            className={`floating-contact-trigger-text ${showLauncherLabel ? "floating-contact-trigger-text-visible" : ""}`}
          >
            Contact
          </span>
        </button>
      ) : null}
    </div>
  );
}
