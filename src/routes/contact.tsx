import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, MessageCircle, MapPin, Clock, ArrowRight } from "lucide-react";
import BackButton from "@/components/BackButton";
import Nav from "@/components/Nav";
import { isValidName, isValidPhoneNumber, normalizeName, normalizePhoneNumber } from "@/lib/booking";

const PHONE = "+918919780725";
const PHONE_DISPLAY = "8919780725";
const WHATSAPP_PHONE = "918919780725";
const WA_LINK = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent("Hi MSR Home Cleaning, I'd like to get a quote.")}`;
const ADDRESS = "House no 3-159, Government School Kamla Nagar Colony, Jillelaguda, Hyderabad, 500097";
const MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`;

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — MSR Home Cleaning" },
      { name: "description", content: "Contact MSR Home Cleaning — call, WhatsApp, or visit our location in Hyderabad." },
      { property: "og:title", content: "Contact — MSR Home Cleaning" },
      { property: "og:description", content: "Get in touch with MSR Home Cleaning for bookings and enquiries." },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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

    const text = `Hi MSR Home Cleaning,%0AService: ${service}%0AName: ${name}%0APhone: ${phone}%0AMessage: ${message}`;
    const url = `https://wa.me/${WHATSAPP_PHONE}?text=${text}`;

    setIsSubmitting(true);
    window.open(url, "_blank", "noopener");
    setTimeout(() => setIsSubmitting(false), 800);
  };
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-background text-foreground pt-16">
        <BackButton />
      <section className="bg-secondary py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 md:px-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-[11px] font-normal uppercase tracking-[0.3em] text-gold">Get in touch</p>
            <h1 className="mt-4 font-display text-3xl text-foreground md:text-5xl">We reply within an hour</h1>
            <p className="mt-4 font-light text-muted-foreground">Share your details and our team will craft a tailored quote for your space.</p>
            <div className="mt-8 space-y-4">
              <a href={`tel:${PHONE}`} className="flex items-start gap-4 border border-border bg-card p-4 hover:border-gold">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-gold text-navy">
                  <Phone className="h-5 w-5" fill="currentColor" strokeWidth={0} />
                </div>
                <div>
                  <div className="text-[11px] font-normal uppercase tracking-wider text-muted-foreground">Call us</div>
                  <div className="mt-0.5 font-display text-lg text-foreground">{PHONE_DISPLAY}</div>
                </div>
              </a>
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 border border-border bg-card p-4 hover:border-gold">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-whatsapp text-white">
                  <MessageCircle className="h-5 w-5" fill="currentColor" strokeWidth={0} />
                </div>
                <div>
                  <div className="text-[11px] font-normal uppercase tracking-wider text-muted-foreground">WhatsApp</div>
                  <div className="mt-0.5 font-display text-lg text-foreground">Chat now</div>
                </div>
              </a>
              <a href={MAP_LINK} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 border border-border bg-card p-4 hover:border-gold">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-navy text-gold">
                  <MapPin className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-[11px] font-normal uppercase tracking-wider text-muted-foreground">Visit</div>
                  <div className="mt-0.5 text-sm font-light text-foreground">{ADDRESS}</div>
                </div>
              </a>
              <div className="flex items-start gap-4 border border-border bg-card p-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-navy text-gold">
                  <Clock className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-[11px] font-normal uppercase tracking-wider text-muted-foreground">Hours</div>
                  <div className="mt-0.5 text-sm font-light text-foreground">Mon – Sun · 7:00 AM – 9:00 PM</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-navy p-8 text-white md:p-10">
            <h3 className="font-display text-2xl text-white md:text-3xl">Book Your Cleaning</h3>
            <p className="mt-2 text-sm font-light text-white/70">Fill in your details — we will call you back shortly.</p>
            <div className="mt-6">
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  name="name"
                  placeholder="Full name"
                  className="w-full rounded-md border border-input bg-white px-4 py-3 text-sm text-foreground"
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
                  className="w-full rounded-md border border-input bg-white px-4 py-3 text-sm text-foreground"
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
                <select name="service" className="w-full rounded-md border border-input bg-white px-4 py-3 text-sm text-foreground">
                  <option>General Enquiry</option>
                  <option>Deep Home Cleaning</option>
                  <option>Kitchen Deep Cleaning</option>
                  <option>Water Tank Cleaning</option>
                </select>
                <textarea name="message" placeholder="Optional message" className="w-full rounded-md border border-input bg-white px-4 py-3 text-sm text-foreground" rows={3} />
                <button type="submit" disabled={isSubmitting} className="flex w-full items-center justify-center gap-2 rounded-full bg-gold px-7 py-4 text-sm font-normal text-navy">
                  {isSubmitting ? "Opening WhatsApp..." : "Send via WhatsApp"} <ArrowRight className="h-4 w-4" />
                </button>
              </form>
              <p className="mt-4 text-center text-xs font-light text-white/60">Or call <a href={`tel:${PHONE}`} className="text-gold">{PHONE_DISPLAY}</a></p>
            </div>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "MSR Home Cleaning",
        telephone: PHONE,
        address: {
          "@type": "PostalAddress",
          streetAddress: "House no 3-159, Government School Kamla Nagar Colony, Jillelaguda",
          addressLocality: "Hyderabad",
          postalCode: "500097",
          addressCountry: "IN",
        },
        openingHours: ["Mo-Su 07:00-21:00"],
      }) }} />
    </main>
    </>
  );
}

export default ContactPage;
