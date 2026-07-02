import { useState, type ComponentType, type FormEvent } from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import {
  buildGoogleFormPrefillUrl,
  saveBookingLeadToSheet,
  submitBookingLeadToGoogleForm,
} from "@/lib/booking";

type Service = {
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  desc: string;
  startingPrice?: string;
};

export default function ServiceCard({ s }: { s: Service }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [savedToSheet, setSavedToSheet] = useState(false);
  const [savedToGoogleForm, setSavedToGoogleForm] = useState(false);
  const [lastWhatsappUrl, setLastWhatsappUrl] = useState<string | null>(null);
  const [lastFormUrl, setLastFormUrl] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    const lead = {
      submittedAt: new Date().toISOString(),
      service: s.title,
      name: name.trim(),
      phone: phone.trim(),
      address: "",
      source: "services-booking",
    };

    let sheetSaved = false;
    let googleFormSaved = false;

    try {
      sheetSaved = await saveBookingLeadToSheet(lead);
    } catch (err) {
      console.error("Failed to save booking lead to Sheets:", err);
    }

    try {
      googleFormSaved = await submitBookingLeadToGoogleForm(lead);
    } catch (err) {
      console.error("Failed to submit booking lead to Google Form:", err);
    }

    const formUrl = buildGoogleFormPrefillUrl(lead);

    const WHATSAPP_PHONE = "918919780725";
    const message = `Hi MSR Deep Cleaning,\nService: ${s.title}\nName: ${lead.name}\nPhone: ${lead.phone}`;
    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;

    setSavedToSheet(sheetSaved);
    setSavedToGoogleForm(googleFormSaved);
    setLastFormUrl(formUrl);
    setLastWhatsappUrl(whatsappUrl);
    setSubmitted(true);

    setName("");
    setPhone("");
    setOpen(false);
    setIsSubmitting(false);
  };

  // Extract dummy starting prices corresponding to visual spec screenshots
  const getStartingPrice = (title: string) => {
    if (title.includes("Kitchen")) return "₹1299";
    if (title.includes("Floor")) return "₹1499";
    if (title.includes("Sofa")) return "₹999";
    if (title.includes("Home")) return "₹2900";
    if (title.includes("Water Tank")) return "₹999";
    return "₹799";
  };

  const startingPrice = s.startingPrice || getStartingPrice(s.title);

  return (
    <article className="group bg-white border border-[#008A90]/15 rounded-3xl p-6 flex flex-col justify-between items-start shadow-elegant hover:scale-[1.03] transition-all duration-300 reveal-on-scroll">
      <div className="w-full">
        {/* Header containing icon and a visual curve decoration resembling spec */}
        <div className="flex justify-between items-center w-full mb-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EAF3F3] text-[#008A90] transition-transform group-hover:scale-105">
            <s.icon className="h-6 w-6" strokeWidth={1.5} />
          </div>
          <div className="h-8 w-8 rounded-full bg-[#EAF3F3]/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <ArrowRight className="h-4 w-4 text-[#008A90]" />
          </div>
        </div>

        <h3 className="font-display text-2xl font-extrabold text-[#0D2A3A] mb-3 group-hover:text-[#008A90] transition-colors">
          {s.title}
        </h3>
        <p className="text-xs text-[#5A707A] leading-relaxed mb-6 font-medium">
          {s.desc}
        </p>
      </div>

      <div className="w-full border-t border-[#008A90]/10 pt-4 flex flex-col gap-3">
        <div className="flex justify-between items-center w-full">
          <span className="text-[10px] font-bold text-[#5A707A] uppercase tracking-wider">
            Packages From
          </span>
          <span className="text-lg font-extrabold text-[#008A90]">
            {startingPrice}
          </span>
        </div>

        {!open && !submitted ? (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="w-full rounded-full bg-[#008A90] py-2.5 text-xs font-bold text-white shadow-soft transition-all hover:bg-[#005F63] hover:shadow-teal-glow flex items-center justify-center gap-1.5"
          >
            Instant Booking <ArrowRight className="h-3.5 w-3.5" />
          </button>
        ) : null}

        {open && !submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full animate-fade-up">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Your Name"
              className="rounded-lg border border-[#008A90]/30 bg-white px-3 py-2 text-xs text-[#0D2A3A] outline-none"
            />
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              placeholder="10-Digit Mobile"
              className="rounded-lg border border-[#008A90]/30 bg-white px-3 py-2 text-xs text-[#0D2A3A] outline-none"
            />
            <div className="flex gap-2">
              <button
                disabled={isSubmitting}
                type="submit"
                className="flex-1 rounded-full bg-[#008A90] py-1.5 text-[10px] font-bold text-white hover:bg-[#005F63]"
              >
                Book
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex-1 rounded-full border border-[#008A90]/30 bg-white py-1.5 text-[10px] text-[#5A707A]"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : null}

        {submitted ? (
          <div className="w-full rounded-xl bg-[#EAF3F3] border border-[#008A90]/35 p-3 animate-scale-pop">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="h-4 w-4 text-[#008A90] shrink-0" />
              <span className="text-[10px] font-bold text-[#0D2A3A]">Request Confirmed</span>
            </div>
            <div className="flex gap-2">
              {lastFormUrl && (
                <a
                  href={lastFormUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center rounded bg-[#008A90] py-1.5 text-[9px] font-bold text-white"
                >
                  Form
                </a>
              )}
              {lastWhatsappUrl && (
                <a
                  href={lastWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center rounded bg-[#25D366] py-1.5 text-[9px] font-bold text-white"
                >
                  WhatsApp
                </a>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </article>
  );
}
