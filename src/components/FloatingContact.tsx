import { MessageCircle, Phone } from "lucide-react";

const PHONE = "+918919780725";
const PHONE_DISPLAY = "8919780725";
const WHATSAPP_PHONE = "918919780725";
const WA_MSG = encodeURIComponent("Hi MSR Home Care, I'd like to book a cleaning service.");

export function FloatingContact() {
  const waLink = `https://wa.me/${WHATSAPP_PHONE}?text=${WA_MSG}`;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 sm:bottom-5 sm:right-5">
      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`WhatsApp ${PHONE_DISPLAY}`}
        className="floating-contact-btn floating-contact-whatsapp"
      >
        <MessageCircle className="h-6 w-6" />
      </a>

      <a
        href={`tel:${PHONE}`}
        aria-label={`Call ${PHONE_DISPLAY}`}
        className="floating-contact-btn floating-contact-phone"
      >
        <Phone className="h-6 w-6" />
      </a>
    </div>
  );
}

export default FloatingContact;
