import { useState, type ComponentType, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import {
  buildGoogleFormPrefillUrl,
  saveBookingLeadToSheet,
  submitBookingLeadToGoogleForm,
} from "@/lib/booking";

type Service = {
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  desc: string;
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

  return (
    <article className="group border border-border bg-card p-4 sm:p-7">
      <div className="mb-5 flex h-10 w-10 sm:h-14 sm:w-14 items-center justify-center rounded-md bg-navy text-gold">
        <s.icon className="h-5 w-5 sm:h-7 sm:w-7" strokeWidth={1.4} />
      </div>
      <h3 className="font-display text-base text-foreground">{s.title}</h3>
      <p className="mt-2 text-xs font-light leading-relaxed text-muted-foreground">{s.desc}</p>
      <div className="mt-4">
        {!open && !submitted ? (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 mt-2 rounded-full bg-gold px-4 py-2 text-sm font-normal text-navy"
          >
            Book {s.title}
          </button>
        ) : null}

        {open && !submitted ? (
          <form onSubmit={handleSubmit} className="mt-3 flex flex-col gap-2">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Name"
              className="rounded-md border px-3 py-2 text-sm"
            />
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              placeholder="Phone"
              className="rounded-md border px-3 py-2 text-sm"
            />
            <div className="flex gap-2">
              <button
                disabled={isSubmitting}
                type="submit"
                className="rounded-full bg-gold px-4 py-2 text-sm text-navy"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full border px-4 py-2 text-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : null}

        {submitted ? (
          <div className="mt-3 rounded-md border border-green-200 bg-green-50 p-3 text-sm text-foreground">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold">
                <CheckCircle2 className="h-5 w-5 text-navy" />
              </div>
              <div>
                <div className="font-medium">Submitted successfully</div>
                <div className="text-xs text-muted-foreground">
                  {savedToGoogleForm
                    ? "Your request was sent to Google Forms."
                    : savedToSheet
                      ? "Your request was saved successfully."
                      : "We have received your request."}
                </div>
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              {lastFormUrl ? (
                <a
                  href={lastFormUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-gold px-4 py-2 text-sm text-navy"
                >
                  Open Form
                </a>
              ) : null}
              {lastWhatsappUrl ? (
                <a
                  href={lastWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border px-4 py-2 text-sm"
                >
                  Open WhatsApp
                </a>
              ) : null}
              <button
                onClick={() => setSubmitted(false)}
                className="rounded-full border px-4 py-2 text-sm"
              >
                Close
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </article>
  );
}
