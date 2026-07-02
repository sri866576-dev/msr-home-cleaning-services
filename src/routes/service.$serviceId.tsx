import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Home,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Loader2,
} from "lucide-react";
import Nav from "@/components/Nav";
import { FloatingContact } from "@/components/FloatingContact";
import { Footer } from "./index";
import {
  isValidName,
  isValidPhoneNumber,
  normalizeName,
  normalizePhoneNumber,
  saveBookingLeadToSheet,
  submitBookingLeadToGoogleForm,
} from "@/lib/booking";

const PHONE = "+918919780725";
const PHONE_DISPLAY = "8919780725";
const WHATSAPP_PHONE = "918919780725";

function triggerLeadConversion(source: string) {
  const win = window as typeof window & {
    dataLayer?: Array<Record<string, unknown>>;
  };

  win.dataLayer = win.dataLayer || [];
  win.dataLayer.push({
    event: "lead_submitted",
    source,
  });
}

const servicePriceDetails: Record<
  string,
  {
    title: string;
    desc: string;
    options: Array<{ label: string; price: string }>;
  }
> = {
  "full-home-deep-cleaning": {
    title: "Full Home Deep Cleaning",
    desc: "Premium full home deep cleaning using trained staff, modern machinery, and safe chemicals.",
    options: [
      { label: "1 BHK", price: "₹2,999" },
      { label: "2 BHK", price: "₹5,999" },
      { label: "3 BHK", price: "₹8,999" },
      { label: "4 BHK", price: "₹11,999" },
      { label: "Villa", price: "₹14,999" },
    ],
  },
  "kitchen-deep-cleaning": {
    title: "Kitchen Deep Cleaning",
    desc: "Degreasing, disinfecting, and restoring shine for counters, cabinets, and cooking zones.",
    options: [
      { label: "1 BHK", price: "₹1,999" },
      { label: "2 BHK", price: "₹2,299" },
      { label: "3 BHK", price: "₹2,699" },
      { label: "4 BHK", price: "₹2,999" },
      { label: "Villa", price: "₹3,499" },
    ],
  },
  "sofa-steam-cleaning": {
    title: "Sofa Steam Cleaning",
    desc: "Fabric-safe sofa steam cleaning that helps lift dirt, odours, and everyday buildup.",
    options: [
      { label: "1 BHK", price: "₹999" },
      { label: "2 BHK", price: "₹1,499" },
      { label: "3 BHK", price: "₹1,999" },
      { label: "4 BHK", price: "₹2,499" },
      { label: "Villa", price: "₹2,999" },
    ],
  },
  "floor-cleaning": {
    title: "Floor Cleaning",
    desc: "Mechanical floor cleaning for fresher, brighter high-use spaces.",
    options: [
      { label: "1 BHK", price: "₹1,299" },
      { label: "2 BHK", price: "₹1,999" },
      { label: "3 BHK", price: "₹2,999" },
      { label: "4 BHK", price: "₹3,499" },
      { label: "Villa", price: "₹4,999" },
    ],
  },
  "floor-polishing": {
    title: "Floor Polishing",
    desc: "Professional polishing to restore shine and a cleaner finish.",
    options: [
      { label: "1 BHK", price: "₹1,999" },
      { label: "2 BHK", price: "₹2,999" },
      { label: "3 BHK", price: "₹3,999" },
      { label: "4 BHK", price: "₹4,999" },
      { label: "Villa", price: "₹5,999" },
    ],
  },
  "water-tank-cleaning": {
    title: "Water Tank Cleaning",
    desc: "Safe, hygienic tank cleaning and sanitisation for overhead and underground tanks.",
    options: [
      { label: "1 BHK", price: "₹999" },
      { label: "2 BHK", price: "₹1,499" },
      { label: "3 BHK", price: "₹1,999" },
      { label: "4 BHK", price: "₹2,499" },
      { label: "Villa", price: "₹3,499" },
    ],
  },
  "carpet-cleaning": {
    title: "Carpet Cleaning",
    desc: "Fabric-safe carpet cleaning for dust, stains, and daily use marks.",
    options: [
      { label: "1 BHK", price: "₹499" },
      { label: "2 BHK", price: "₹599" },
      { label: "3 BHK", price: "₹699" },
      { label: "4 BHK", price: "₹899" },
      { label: "Villa", price: "₹999" },
    ],
  },
  "refrigerator-cleaning": {
    title: "Refrigerator Cleaning",
    desc: "Detailed refrigerator cleaning for shelves, trays, seals, and inner surfaces.",
    options: [
      { label: "1 BHK", price: "₹599" },
      { label: "2 BHK", price: "₹699" },
      { label: "3 BHK", price: "₹799" },
      { label: "4 BHK", price: "₹899" },
      { label: "Villa", price: "₹999" },
    ],
  },
  "window-and-glass-cleaning": {
    title: "Window & Glass Cleaning",
    desc: "Clear glass, frames, and window surfaces for homes and villas.",
    options: [
      { label: "1 BHK", price: "₹999" },
      { label: "2 BHK", price: "₹1,499" },
      { label: "3 BHK", price: "₹1,999" },
      { label: "4 BHK", price: "₹2,499" },
      { label: "Villa", price: "₹2,999" },
    ],
  },
  "office-deep-cleaning": {
    title: "Office Deep Cleaning",
    desc: "Reliable office deep cleaning support for workstations, meeting rooms, and shared areas.",
    options: [
      { label: "Small Office", price: "₹3,499" },
      { label: "Medium Office", price: "₹4,999" },
      { label: "Large Office", price: "₹6,999" },
      { label: "Extra Large Office", price: "₹8,999" },
      { label: "Corporate", price: "₹10,999" },
    ],
  },
  "mattress-sanitization": {
    title: "Mattress Sanitization",
    desc: "Dust mite and allergen removal for healthier sleep surfaces.",
    options: [
      { label: "Single", price: "₹599" },
      { label: "Double", price: "₹999" },
      { label: "King", price: "₹1,499" },
    ],
  },
  "general-pest-control": {
    title: "General Pest Control",
    desc: "Targeted pest treatment plans for homes, apartments, offices, and regularly used spaces.",
    options: [
      { label: "1 BHK", price: "₹1,999" },
      { label: "2 BHK", price: "₹2,499" },
      { label: "3 BHK", price: "₹2,999" },
      { label: "4 BHK", price: "₹3,499" },
      { label: "Villa", price: "₹4,999" },
    ],
  },
  "villa-duplex-cleaning": {
    title: "Villa / Duplex Cleaning",
    desc: "Full-scale cleaning packages for villas, duplex homes, and larger properties.",
    options: [
      { label: "1 BHK / Small Villa", price: "₹7,999" },
      { label: "2 BHK", price: "₹9,999" },
      { label: "3 BHK", price: "₹11,999" },
      { label: "4 BHK", price: "₹14,499" },
      { label: "Luxury Villa", price: "₹15,499" },
    ],
  },
  "office-chair-cleaning-per-chair": {
    title: "Office Chair Cleaning (Per Chair)",
    desc: "Per-chair office seating cleaning for fabric and daily-use buildup.",
    options: [
      { label: "1 BHK", price: "₹249" },
      { label: "2 BHK", price: "₹299" },
      { label: "3 BHK", price: "₹349" },
      { label: "4 BHK", price: "₹449" },
      { label: "Villa / Office", price: "₹499" },
    ],
  },
  "floor-scrubbing": {
    title: "Floor Scrubbing",
    desc: "Deep floor scrubbing for tougher marks, grime, and dull surfaces.",
    options: [
      { label: "1 BHK", price: "₹2,499" },
      { label: "2 BHK", price: "₹2,999" },
      { label: "3 BHK", price: "₹3,499" },
      { label: "4 BHK", price: "₹3,999" },
      { label: "Villa", price: "₹4,999" },
    ],
  },
  "move-in-move-out-cleaning": {
    title: "Move-in / Move-out Cleaning",
    desc: "Detailed cleaning before shifting in or after moving out.",
    options: [
      { label: "1 BHK", price: "₹4,099" },
      { label: "2 BHK", price: "₹5,499" },
      { label: "3 BHK", price: "₹6,999" },
      { label: "4 BHK", price: "₹8,499" },
      { label: "Villa", price: "₹10,999" },
    ],
  },
  "painting-services-only-labour": {
    title: "Painting Services (Only Labour)",
    desc: "Professional labour support for interior and exterior painting work.",
    options: [
      { label: "1 BHK", price: "₹14,900" },
      { label: "2 BHK", price: "₹19,900" },
      { label: "3 BHK", price: "₹29,000" },
      { label: "4 BHK", price: "₹49,900" },
      { label: "Villa", price: "₹69,999" },
    ],
  },
  "solar-panel-cleaning": {
    title: "Solar Panel Cleaning",
    desc: "Specialized cleaning to maximize power output and efficiency of your solar system.",
    options: [
      { label: "1 BHK", price: "₹999" },
      { label: "2 BHK", price: "₹1,999" },
      { label: "3 BHK", price: "₹2,999" },
      { label: "4 BHK", price: "₹3,999" },
      { label: "Villa / Commercial", price: "₹5,999" },
    ],
  },
};

const defaultServices: Record<string, string> = {
  "solar-panel-cleaning": "Solar Panel Cleaning",
  "professional-painting-services": "Professional Painting Services",
  "pest-control-services": "Pest Control Services",
  "office-cleaning": "Office Cleaning",
};

const processSteps = [
  "Deep vacuuming of all rooms & corners",
  "Bathroom deep scrubbing & descaling",
  "Kitchen degreasing & cabinet cleaning",
  "Window & grill cleaning",
  "Floor mechanical scrubbing",
  "Wall dusting & cobweb removal",
  "Final quality check before handover",
];

// Reusable numeric price counter component that triggers a buttery-smooth increment/decrement
function AnimatedPrice({ price }: { price: string }) {
  const numericValue = parseInt(price.replace(/[^0-9]/g, ""), 10);
  const [displayValue, setDisplayValue] = useState(numericValue);

  useEffect(() => {
    let start = displayValue;
    const end = numericValue;
    if (isNaN(start) || isNaN(end)) {
      setDisplayValue(end);
      return;
    }
    if (start === end) return;

    const duration = 400; // 400ms transition
    const startTime = performance.now();
    let animationFrameId: number;

    const updateNumber = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Quad ease-out equation
      const ease = progress * (2 - progress);
      const current = Math.round(start + (end - start) * ease);
      setDisplayValue(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateNumber);
      }
    };

    animationFrameId = requestAnimationFrame(updateNumber);
    return () => cancelAnimationFrame(animationFrameId);
  }, [numericValue]);

  if (isNaN(displayValue)) {
    return <span className="animate-price-pop text-5xl font-black text-[#303A63]">{price}</span>;
  }

  const formatted = `₹${displayValue.toLocaleString("en-IN")}`;

  return (
    <span key={price} className="animate-price-pop text-5xl font-black text-[#303A63]">
      {formatted}
    </span>
  );
}

export const Route = createFileRoute("/service/$serviceId")({
  component: ServiceDetailPage,
});

function ServiceDetailPage() {
  const { serviceId } = Route.useParams();
  const detail = servicePriceDetails[serviceId] ?? {
    title: defaultServices[serviceId] ?? "Cleaning Service",
    desc: "Tell us your requirement and our team will confirm the best quote after a quick call.",
    options: [],
  };
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedOption = detail.options[selectedOptionIndex];
  const selectedPrice = selectedOption?.price;
  const selectedLabel = selectedOption?.label ?? "Custom Quote";

  // IntersectionObserver to orchestrate entrance animations on scroll
  useEffect(() => {
    const revealElements = document.querySelectorAll(
      ".reveal-on-scroll, .reveal-left, .reveal-right, .reveal-zoom, .reveal-card, .reveal-sweep"
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    revealElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [serviceId]);

  const whatsAppUrl = useMemo(() => {
    const message = `Hi MSR Deep Cleaning,\nService: ${detail.title}\nOption: ${selectedLabel}${
      selectedPrice ? `\nEstimate: ${selectedPrice}` : ""
    }\nName: ${name || "-"}\nPhone: ${phone || "-"}${address ? `\nAddress: ${address}` : ""}`;
    return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
  }, [address, detail.title, name, phone, selectedLabel, selectedPrice]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    const form = event.currentTarget;
    const nameInput = form.elements.namedItem("name") as HTMLInputElement;
    const phoneInput = form.elements.namedItem("phone") as HTMLInputElement;
    const cleanName = normalizeName(name).trim();
    const cleanPhone = normalizePhoneNumber(phone);
    const cleanAddress = address.trim().slice(0, 300);

    nameInput.setCustomValidity("");
    phoneInput.setCustomValidity("");
    nameInput.value = cleanName;
    phoneInput.value = cleanPhone;

    if (!isValidName(cleanName)) {
      nameInput.setCustomValidity("Name must contain only letters and spaces.");
      nameInput.reportValidity();
      return;
    }

    if (!isValidPhoneNumber(cleanPhone)) {
      phoneInput.setCustomValidity("Mobile number must contain exactly 10 digits.");
      phoneInput.reportValidity();
      return;
    }

    const finalService = `${detail.title} - ${selectedLabel}${selectedPrice ? ` - ${selectedPrice}` : ""}`;

    setIsSubmitting(true);
    try {
      const lead = {
        submittedAt: new Date().toISOString(),
        service: finalService,
        name: cleanName,
        phone: cleanPhone,
        address: cleanAddress,
        source: "service-detail-page",
      };

      await saveBookingLeadToSheet(lead);
      await submitBookingLeadToGoogleForm(lead);
    } catch (error) {
      console.error("Could not save service detail lead.", error);
    } finally {
      setIsSubmitting(false);
    }

    triggerLeadConversion("service-detail-page");
    window.open(whatsAppUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-white text-[#0D2A3A]">
      <Nav />
      <main className="pt-24">
        <section className="relative overflow-hidden bg-[#303A63] px-4 py-12 text-white sm:px-6 lg:px-8 lg:py-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_8%_15%,rgba(0,138,144,0.26),transparent_30%),radial-gradient(circle_at_95%_0%,rgba(232,185,83,0.18),transparent_28%)]" />
          <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.68fr] lg:items-center">
            <div className="reveal-left">
              <a
                href="/#services"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/15 hover:bg-white/20 hover:scale-105 active:scale-95 transition-all duration-300"
                aria-label="Back to services"
              >
                <ArrowLeft className="h-5 w-5" />
              </a>
              <div className="mt-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-[#F6BE52] ring-1 ring-white/15 animate-luxury-float">
                <Home className="h-8 w-8" />
              </div>
              <p className="mt-8 text-xs font-black uppercase tracking-[0.22em] text-[#F6BE52]">
                Services / {detail.title}
              </p>
              <h1 className="mt-4 font-display text-[clamp(3.2rem,8vw,6.5rem)] font-black italic leading-[0.9] text-white">
                {detail.title}
              </h1>
              <p className="mt-6 max-w-2xl text-base font-semibold leading-8 text-white/78 sm:text-lg">
                {detail.desc}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 text-sm font-extrabold ring-1 ring-white/12 hover:bg-white/15 transition-all">
                  <ShieldCheck className="h-5 w-5 text-[#1495A8]" /> 100% Insured
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 text-sm font-extrabold ring-1 ring-white/12 hover:bg-white/15 transition-all">
                  <Sparkles className="h-5 w-5 text-[#F6BE52]" /> Same Day Service
                </span>
              </div>
            </div>

            <div className="reveal-right">
              <QuotePanel
                options={detail.options}
                selectedOptionIndex={selectedOptionIndex}
                setSelectedOptionIndex={setSelectedOptionIndex}
                selectedPrice={selectedPrice}
                selectedLabel={selectedLabel}
                serviceTitle={detail.title}
                name={name}
                setName={setName}
                phone={phone}
                setPhone={setPhone}
                address={address}
                setAddress={setAddress}
                whatsAppUrl={whatsAppUrl}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
              />
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.46fr]">
            <div>
              <h2 className="font-display text-4xl font-black italic text-[#303A63] reveal-on-scroll">
                Our Deep Cleaning Process
              </h2>
              <p className="mt-5 max-w-4xl text-base font-semibold leading-8 text-[#5A707A] reveal-on-scroll">
                We follow a structured 7-stage process so your property is not just visibly clean,
                but hygienically sanitized with the right tools and trained staff.
              </p>
              <div className="mt-10 grid gap-4 md:grid-cols-2">
                {processSteps.map((step, index) => (
                  <div
                    key={step}
                    style={{ transitionDelay: `${index * 80}ms` }}
                    className="reveal-on-scroll flex min-h-[5rem] items-center gap-4 rounded-2xl border border-[#008A90]/10 bg-[#F7F8FA] p-5 shadow-soft hover:shadow-elegant hover:scale-[1.02] hover:border-[#008A90]/25 transition-all duration-300"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1495A8] font-black text-white hover:scale-110 transition-transform">
                      {index + 1}
                    </span>
                    <span className="text-sm font-extrabold text-[#303A63] sm:text-base">
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <aside className="reveal-right rounded-[2rem] bg-[#303A63] p-8 text-white shadow-elegant">
              <h3 className="font-display text-3xl font-black text-white">Why MSR?</h3>
              <div className="mt-5 h-px bg-white/12" />
              <div className="mt-7 space-y-5">
                {[
                  "Professionally Trained Staff",
                  "Eco-friendly Chemicals",
                  "Advanced Machinery",
                  "On-Time Completion",
                  "Transparent Pricing",
                  "100% Satisfaction Guarantee",
                ].map((item, idx) => (
                  <div
                    key={item}
                    style={{ transitionDelay: `${idx * 100}ms` }}
                    className="reveal-on-scroll flex items-center gap-3"
                  >
                    <CheckCircle2 className="h-5 w-5 text-[#1495A8]" />
                    <span className="font-extrabold">{item}</span>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section className="reveal-zoom px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-[2rem] border border-[#F4CF84] bg-[#FFF4DD] p-8 sm:flex-row sm:items-center sm:justify-between shadow-elegant">
            <div>
              <h2 className="font-display text-3xl font-black italic text-[#303A63]">
                Prefer a Phone Conversation?
              </h2>
              <p className="mt-3 max-w-2xl text-base font-semibold leading-7 text-[#4E5D72]">
                Our cleaning consultants are available 8am - 9pm daily to discuss custom
                requirements for villas, apartments, and corporate offices.
              </p>
            </div>
            <a
              href={`tel:${PHONE}`}
              className="inline-flex items-center justify-center gap-3 rounded-2xl bg-[#303A63] px-8 py-4 text-base font-extrabold text-white shadow-elegant hover:bg-[#1E2548] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
            >
              <Phone className="h-5 w-5 animate-luxury-float" /> Call {PHONE_DISPLAY}
            </a>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
}

function QuotePanel({
  options,
  selectedOptionIndex,
  setSelectedOptionIndex,
  selectedPrice,
  selectedLabel,
  serviceTitle,
  name,
  setName,
  phone,
  setPhone,
  address,
  setAddress,
  whatsAppUrl,
  onSubmit,
  isSubmitting,
}: {
  options: Array<{ label: string; price: string }>;
  selectedOptionIndex: number;
  setSelectedOptionIndex: (value: number) => void;
  selectedPrice?: string;
  selectedLabel: string;
  serviceTitle: string;
  name: string;
  setName: (value: string) => void;
  phone: string;
  setPhone: (value: string) => void;
  address: string;
  setAddress: (value: string) => void;
  whatsAppUrl: string;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  isSubmitting: boolean;
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="rounded-[2rem] bg-white p-5 text-[#303A63] shadow-[0_24px_60px_rgba(0,0,0,0.16)] sm:p-8"
    >
      <h2 className="flex items-center gap-3 text-2xl font-black text-[#303A63]">
        <Sparkles className="h-6 w-6 text-[#1495A8]" />
        Instant Quote
      </h2>

      {options.length > 0 ? (
        <>
          <p className="mt-7 text-xs font-extrabold uppercase tracking-[0.18em] text-[#A0A9B8]">
            Package / Size
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {options.map((option, index) => (
              <button
                key={option.label}
                type="button"
                onClick={() => setSelectedOptionIndex(index)}
                className={`min-h-16 rounded-xl px-4 py-3 text-left transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] ${
                  selectedOptionIndex === index
                    ? "option-card-selected border-2 border-[#1495A8] bg-white text-[#078FA7]"
                    : "border border-transparent bg-[#F7F8FA] text-[#657184] hover:bg-[#EAF3F3]/40"
                }`}
              >
                <span className="block text-sm font-extrabold">{option.label}</span>
                <span className="mt-1 block text-lg font-black">{option.price}</span>
              </button>
            ))}
          </div>
        </>
      ) : null}

      {selectedPrice ? (
        <div className="mt-7 rounded-[1.5rem] border border-[#E6ECF0] bg-[#F7F8FA] p-6">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#A0A9B8]">
            Est. Inclusive Price
          </p>
          <div className="mt-2 flex items-center justify-between">
            <AnimatedPrice price={selectedPrice} />
            <Sparkles className="h-10 w-10 text-[#F6BE52] animate-luxury-float" />
          </div>
        </div>
      ) : (
        <div className="mt-7 rounded-[1.5rem] border border-[#E6ECF0] bg-[#F7F8FA] p-6">
          <p className="text-sm font-semibold leading-7 text-[#657184]">
            Price will be confirmed after inspection. Fill the form and our team will call you with
            the right quote.
          </p>
        </div>
      )}

      <div className="mt-6 space-y-3">
        <input
          readOnly
          value={`${serviceTitle}${selectedPrice ? ` - ${selectedLabel} - ${selectedPrice}` : ""}`}
          className="w-full rounded-xl border border-[#008A90]/20 bg-[#F4F7F6] px-4 py-3 text-sm font-bold text-[#303A63] outline-none"
        />
        <input
          name="name"
          required
          value={name}
          onChange={(event) => setName(normalizeName(event.target.value))}
          placeholder="Full name"
          className="w-full rounded-xl border border-[#008A90]/20 bg-white px-4 py-3 text-sm font-semibold text-[#303A63] outline-none focus:border-[#008A90] transition-colors focus:bg-white"
        />
        <input
          name="phone"
          required
          inputMode="numeric"
          value={phone}
          onChange={(event) => setPhone(normalizePhoneNumber(event.target.value))}
          placeholder="10-digit Phone number"
          className="w-full rounded-xl border border-[#008A90]/20 bg-white px-4 py-3 text-sm font-semibold text-[#303A63] outline-none focus:border-[#008A90] transition-colors focus:bg-white"
        />
        <input
          value={address}
          onChange={(event) => setAddress(event.target.value.slice(0, 300))}
          placeholder="Locality / Address (optional)"
          className="w-full rounded-xl border border-[#008A90]/20 bg-white px-4 py-3 text-sm font-semibold text-[#303A63] outline-none focus:border-[#008A90] transition-colors focus:bg-white"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-[#168EA4] text-base font-extrabold text-white shadow-teal-glow hover:bg-[#0E7A8E] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50"
      >
        {isSubmitting ? (
          <>
            Saving...
            <Loader2 className="h-5 w-5 animate-spin" />
          </>
        ) : (
          <>
            {selectedPrice ? "Book Professional Cleaning" : "Book Service"}
            <ArrowRight className="h-5 w-5" />
          </>
        )}
      </button>
      <a
        href={whatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-[#303A63] text-base font-extrabold text-white hover:bg-[#1E2548] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
      >
        <MessageCircle className="h-5 w-5" /> Chat on WhatsApp
      </a>
      <p className="mt-5 text-center text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#A0A9B8]">
        Final price might vary based on site condition
      </p>
    </form>
  );
}

export default ServiceDetailPage;
