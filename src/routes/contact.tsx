import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Phone, MessageCircle, MapPin, Clock, ArrowRight, CheckCircle, AlertCircle, Loader2, Mail } from "lucide-react";
import BackButton from "@/components/BackButton";
import Nav from "@/components/Nav";
import { Footer } from "./index";
import { isValidName, isValidPhoneNumber, normalizeName, normalizePhoneNumber } from "@/lib/booking";

const PHONE = "+918919780725";
const PHONE_DISPLAY = "8919780725";
const WHATSAPP_PHONE = "918919780725";
const WA_LINK = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent("Hi MSR Deep Cleaning, I'd like to get a quote.")}`;
const ADDRESS = "House no 3-159, Government School Kamla Nagar Colony, Jillelaguda, Hyderabad, 500097";
const MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`;
const SHEETS_WEBHOOK_URL = import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK_URL || "";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — MSR Deep Cleaning" },
      { name: "description", content: "Contact MSR Deep Cleaning — call, WhatsApp, or visit our location in Hyderabad." },
      { property: "og:title", content: "Contact — MSR Deep Cleaning" },
      { property: "og:description", content: "Get in touch with MSR Deep Cleaning for bookings and enquiries." },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    const revealElements = document.querySelectorAll(".reveal-on-scroll, .reveal-left, .reveal-right");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.15 },
    );

    revealElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    const form = e.currentTarget as HTMLFormElement;
    const nameInput = form.elements.namedItem("name") as HTMLInputElement;
    const phoneInput = form.elements.namedItem("phone") as HTMLInputElement;
    const name = normalizeName(nameInput?.value ?? "").trim();
    const phone = normalizePhoneNumber(phoneInput?.value ?? "");
    const service = (form.elements.namedItem("service") as HTMLSelectElement)?.value ?? "General Enquiry";
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement)?.value?.trim() ?? "";

    nameInput.value = name;
    phoneInput.value = phone;
    nameInput.setCustomValidity("");
    phoneInput.setCustomValidity("");

    if (!isValidName(name)) {
      nameInput.setCustomValidity("Name must contain only letters and spaces.");
      nameInput.reportValidity();
      return;
    }

    if (!isValidPhoneNumber(phone)) {
      phoneInput.setCustomValidity("Mobile number must contain exactly 10 digits.");
      phoneInput.reportValidity();
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      if (SHEETS_WEBHOOK_URL) {
        const submissionData = {
          submittedAt: new Date().toISOString(),
          service,
          name,
          phone,
          address: "",
          message,
          source: "contact-form",
        };

        await fetch(SHEETS_WEBHOOK_URL, {
          method: "POST",
          mode: "no-cors",
          body: JSON.stringify(submissionData),
        });
      }

      setSubmitStatus("success");
      setStatusMessage("Details saved! Opening WhatsApp...");

      const text = `Hi MSR Deep Cleaning,%0AService: ${service}%0AName: ${name}%0APhone: ${phone}%0AMessage: ${message}`;
      const url = `https://wa.me/${WHATSAPP_PHONE}?text=${text}`;

      setTimeout(() => {
        window.open(url, "_blank", "noopener");
        form.reset();
        setSubmitStatus("idle");
        setIsSubmitting(false);
      }, 500);
    } catch (error) {
      setSubmitStatus("error");
      setStatusMessage("Could not save details, but opening WhatsApp...");

      const text = `Hi MSR Deep Cleaning,%0AService: ${service}%0AName: ${name}%0APhone: ${phone}%0AMessage: ${message}`;
      const url = `https://wa.me/${WHATSAPP_PHONE}?text=${text}`;

      setTimeout(() => {
        window.open(url, "_blank", "noopener");
        setIsSubmitting(false);
      }, 500);
    }
  };
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-[#F4F7F6] text-[#0D2A3A] pt-24 pb-16">
        <BackButton />

        <section className="py-12 relative">
          <div className="absolute inset-0 bg-gradient-mesh opacity-30 pointer-events-none" />
          <div className="mx-auto grid max-w-7xl gap-12 px-4 md:px-8 lg:grid-cols-2 lg:items-center relative">
            <div className="reveal-left">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#008A90]">Contact Us</p>
              <h1 className="mt-4 font-display text-4xl text-[#0D2A3A] md:text-6xl font-black">We reply within an hour</h1>
              <p className="mt-4 font-semibold text-[#5A707A] text-sm">Share your details and our team will craft a tailored quote for your space.</p>

              <div className="mt-8 space-y-4">
                <a href={`tel:${PHONE}`} className="flex items-center gap-4 bg-white border border-[#008A90]/25 rounded-3xl p-4 hover:border-[#008A90] transition-all group shadow-soft">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#EAF3F3] text-[#008A90]">
                    <Phone className="h-5 w-5" fill="currentColor" strokeWidth={0} />
                  </div>
                  <div>
                    <div className="text-[9px] font-bold uppercase tracking-wider text-[#5A707A]">Call us</div>
                    <div className="mt-0.5 font-display text-lg text-[#0D2A3A] font-extrabold">{PHONE_DISPLAY}</div>
                  </div>
                </a>

                <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 bg-white border border-[#008A90]/25 rounded-3xl p-4 hover:border-[#008A90] transition-all group shadow-soft">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#25D366]/10 text-[#25D366]">
                    <MessageCircle className="h-5 w-5" fill="currentColor" strokeWidth={0} />
                  </div>
                  <div>
                    <div className="text-[9px] font-bold uppercase tracking-wider text-[#5A707A]">WhatsApp</div>
                    <div className="mt-0.5 font-display text-lg text-[#0D2A3A] font-extrabold">Chat now</div>
                  </div>
                </a>

                <a href={`mailto:msrdeepcleaningservices@gmail.com`} className="flex items-center gap-4 bg-white border border-[#008A90]/25 rounded-3xl p-4 hover:border-[#008A90] transition-all group shadow-soft">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#EAF3F3] text-[#008A90]">
                    <Mail className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-[9px] font-bold uppercase tracking-wider text-[#5A707A]">Email us</div>
                    <div className="mt-0.5 font-display text-sm sm:text-base text-[#0D2A3A] font-extrabold break-all">msrdeepcleaningservices@gmail.com</div>
                  </div>
                </a>

                <a href={MAP_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 bg-white border border-[#008A90]/25 rounded-3xl p-4 hover:border-[#008A90] transition-all group shadow-soft">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#EAF3F3] text-[#008A90]">
                    <MapPin className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-[9px] font-bold uppercase tracking-wider text-[#5A707A]">Visit</div>
                    <div className="mt-0.5 text-xs text-[#0D2A3A] font-extrabold">{ADDRESS}</div>
                  </div>
                </a>
              </div>
            </div>

            <div className="bg-white border border-[#008A90]/25 p-6 sm:p-10 rounded-3xl shadow-elegant reveal-right">
              <h3 className="font-display text-2xl sm:text-3xl font-black text-[#0D2A3A]">Book Your Cleaning</h3>
              <p className="mt-2 text-xs text-[#5A707A] font-semibold">Fill in your details — we will call you back shortly.</p>

              {submitStatus === "success" && (
                <div className="mt-4 flex items-center gap-2 rounded-xl bg-[#EAF3F3] border border-[#008A90]/35 px-4 py-3 text-sm text-[#008A90] animate-scale-pop">
                  <CheckCircle className="h-4 w-4 shrink-0" />
                  <span>{statusMessage}</span>
                </div>
              )}
              {submitStatus === "error" && (
                <div className="mt-4 flex items-center gap-2 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600 animate-scale-pop">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{statusMessage}</span>
                </div>
              )}

              <div className="mt-6">
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input
                    name="name"
                    placeholder="Full name"
                    className="w-full rounded-xl border border-[#008A90]/30 bg-white px-4 py-3.5 text-sm text-[#0D2A3A] placeholder:text-[#5A707A]/50 focus:border-[#008A90] focus:outline-none transition-all"
                    required
                    maxLength={100}
                    pattern="[A-Za-z ]+"
                    title="Name must contain only letters and spaces."
                    onInput={(e) => {
                      const input = e.currentTarget;
                      input.value = normalizeName(input.value);
                      input.setCustomValidity("");
                    }}
                  />
                  <input
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    placeholder="Phone number"
                    className="w-full rounded-xl border border-[#008A90]/30 bg-white px-4 py-3.5 text-sm text-[#0D2A3A] placeholder:text-[#5A707A]/50 focus:border-[#008A90] focus:outline-none transition-all"
                    required
                    maxLength={10}
                    pattern="[0-9]{10}"
                    title="Mobile number must contain exactly 10 digits."
                    onInput={(e) => {
                      const input = e.currentTarget;
                      input.value = normalizePhoneNumber(input.value);
                      input.setCustomValidity("");
                    }}
                  />
                  <select name="service" className="w-full rounded-xl border border-[#008A90]/30 bg-white px-4 py-3.5 text-sm text-[#0D2A3A] focus:border-[#008A90] focus:outline-none transition-all cursor-pointer">
                    <option>General Enquiry</option>
                    <option>Deep Home Cleaning</option>
                    <option>Kitchen Deep Cleaning</option>
                    <option>Water Tank Cleaning</option>
                  </select>
                  <textarea name="message" placeholder="Optional message" className="w-full rounded-xl border border-[#008A90]/30 bg-white px-4 py-3.5 text-sm text-[#0D2A3A] placeholder:text-[#5A707A]/50 focus:border-[#008A90] focus:outline-none transition-all" rows={3} />
                  <button type="submit" disabled={isSubmitting} className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#008A90] to-[#005F63] px-7 py-4 text-sm font-bold text-white disabled:opacity-50 hover:shadow-teal-glow transition-all">
                    {isSubmitting ? (
                      <>
                        Processing...
                        <Loader2 className="h-4 w-4 animate-spin" />
                      </>
                    ) : (
                      <>
                        Send request via WhatsApp <ArrowRight className="h-4 w-4 animate-luxury-float" />
                      </>
                    )}
                  </button>
                </form>
                <p className="mt-4 text-center text-xs font-semibold text-[#5A707A]">Or call <a href={`tel:${PHONE}`} className="text-[#008A90] font-bold">{PHONE_DISPLAY}</a></p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default ContactPage;
