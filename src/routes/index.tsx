import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import heroVideoFile from "../../6195521-uhd_2160_3840_25fps.mp4";
import logoImage from "../../logoofmsr.png";
import {
  Star,
  Phone,
  MessageCircle,
  MapPin,
  Mail,
  Clock,
  CheckCircle2,
  Home,
  Building2,
  UtensilsCrossed,
  Sofa,
  Droplets,
  Wind,
  BedDouble,
  SunMedium,
  PaintbrushVertical,
  Bug,
  ArrowRight,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import Nav from "@/components/Nav";
import { Marquee } from "@/components/Marquee";
import { FloatingContact } from "@/components/FloatingContact";
import { HelpBot } from "@/components/HelpBot";
import {
  isValidName,
  isValidPhoneNumber,
  normalizeName,
  normalizePhoneNumber,
  saveBookingLeadToSheet,
  submitBookingLeadToGoogleForm,
} from "@/lib/booking";
// Splash loader removed — keep import commented out to avoid unused import errors
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/")({
  component: Index,
});

const PHONE = "+918919780725";
const PHONE_DISPLAY = "8919780725";
const WHATSAPP_PHONE = "918919780725";
const EMAIL = "msrdeepcleaningservices@gmail.com";
const ADDRESS =
  "House no 3-159, Government School Kamla Nagar Colony, Jillelaguda, Hyderabad, 500097";
const FOOTER_ADDRESS = "House no 3-159, Kamla Nagar, Jillelaguda, Hyderabad 500097";
const MAP_QUERY = encodeURIComponent(ADDRESS);
const MAP_EMBED_URL = `https://www.google.com/maps?q=${MAP_QUERY}&z=17&output=embed`;
const MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`;
const GOOGLE_REVIEW_LINK = "https://maps.app.goo.gl/sG2MLVT2Y9tyPUmA9";
const WA_LINK = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
  "Hi MSR Deep Cleaning, I'd like to book a service.",
)}`;

const IMG = {
  heroVideo: heroVideoFile,
  heroPoster:
    "https://images.pexels.com/photos/4239031/pexels-photo-4239031.jpeg?auto=compress&cs=tinysrgb&w=1920",
  about:
    "https://images.pexels.com/photos/4239091/pexels-photo-4239091.jpeg?auto=compress&cs=tinysrgb&w=1400",
};

const heroPromos = [
  {
    title: "Deep cleaning built for busy homes",
    detail:
      "Explore room-by-room cleaning support for kitchens, bathrooms, floors, and the spaces that need the most attention.",
    ctaLabel: "View Services",
    href: "/services",
    type: "route",
  },
  {
    title: "Honest pricing before the team arrives",
    detail:
      "Clear quotes, practical recommendations, and a simple booking flow that stays easy to use on mobile and desktop.",
    ctaLabel: "Contact Us",
    href: "/contact",
    type: "route",
  },
  {
    title: "See what customers say before you book",
    detail:
      "Read reviews from Hyderabad homes and workplaces that booked us for deep cleaning and specialist support.",
    ctaLabel: "Read Reviews",
    href: "/#reviews",
    type: "anchor",
  },
  {
    title: "Learn how MSR Deep Cleaning works and what we cover",
    detail:
      "Get a quick look at our process, coverage, and service approach behind home cleaning, pest control, painting, and more.",
    ctaLabel: "About MSR",
    href: "/about",
    type: "route",
  },
] as const;

const services = [
  {
    icon: SunMedium,
    title: "Solar Panel Cleaning",
    desc: "Specialized cleaning to maximize power output and efficiency of your solar system.",
  },
  {
    icon: Home,
    title: "Deep Home Cleaning",
    desc: "Thorough, professional cleaning services for residential and commercial spaces.",
  },
  {
    icon: PaintbrushVertical,
    title: "Professional Painting Services",
    desc: "High-quality interior and exterior painting for a fresh look.",
  },
  {
    icon: Bug,
    title: "Pest Control Services",
    desc: "Effective solutions to keep your premises free from pests.",
  },
  {
    icon: Building2,
    title: "Office Cleaning",
    desc: "Spotless workspaces that boost productivity.",
  },
  {
    icon: UtensilsCrossed,
    title: "Kitchen Deep Cleaning",
    desc: "Degrease, disinfect, and restore shine.",
  },
  { icon: Sofa, title: "Sofa & Carpet Care", desc: "Stain removal and fabric care." },
  { icon: Wind, title: "Mattress Cleaning", desc: "Dust mite & allergen removal." },
  { icon: BedDouble, title: "Book by Room", desc: "Pick the rooms — we handle the rest." },
  { icon: Droplets, title: "Water Tank Cleaning", desc: "Safe, hygienic tank sanitisation." },
  { icon: Droplets, title: "Tank Cleaning", desc: "Thorough tank cleaning for safe and hygienic water storage." },
];



const reviews = [
  {
    name: "Ramavath Shanker",
    text: "Excellent service. Team was punctual, polite and left my home spotless.",
    rating: 5,
  },
  {
    name: "Priya Reddy",
    text: "The best deep cleaning in Hyderabad. Booked them again for my office.",
    rating: 5,
  },
  {
    name: "Arjun Kumar",
    text: "Professional staff and great pricing. My kitchen looks brand new.",
    rating: 4,
  },
  {
    name: "Sneha Nair",
    text: "Loved the eco-friendly products. Safe for my kids and pets.",
    rating: 5,
  },
  { name: "Vikram Rao", text: "On-time, thorough and friendly. Highly recommend MSR.", rating: 4 },
  { name: "Anjali Sharma", text: "Bathroom looks like new. Worth every rupee.", rating: 5 },
  {
    name: "Suresh Goud",
    text: "Reliable team, transparent pricing, no hidden charges.",
    rating: 5,
  },
];

const OVERALL_RATING = 4.9;

const whyPoints = [
  { title: "Experience", text: "A dependable, knowledgeable cleaning crew assigned just for you." },
  {
    title: "Trained Team",
    text: "Hand-picked staff with background checks and extensive training.",
  },
  {
    title: "Quality Equipment",
    text: "Industrial-grade machines and microfiber tools that deliver hotel-grade results.",
  },
  {
    title: "Eco Conscious",
    text: "Non-toxic, biodegradable products safe for kids, pets and the planet.",
  },
  { title: "Transparent Pricing", text: "Flat, upfront quotes — no surprises, no hidden charges." },
  {
    title: "Always On Time",
    text: "Punctual scheduling with real-time updates from booking to completion.",
  },
];

const serviceAreas = [
  "Banjara Hills",
  "Jubilee Hills",
  "Gachibowli",
  "Hitech City",
  "Manikonda",
  "Miyapur",
  "Kondapur",
  "Uppal",
  "Kompally",
  "Himayat Nagar",
  "Bachupally",
  "Bibi Nagar",
  "Kukatpally",
  "Madhapur",
  "Dilsukh Nagar",
  "Ameerpet",
  "Chanda Nagar",
  "Kachiguda",
  "Srinivasa Nagar",
  "Hyderguda",
  "Tilak Nagar",
  "Gandhi Nagar",
  "Amberpet",
  "Barkatpura",
  "Nagole X Road",
  "Badangpet",
  "Boduppal",
  "Hayathnagar",
  "LB Nagar",
  "Narsingi",
];

const heroStatements = [
  "Same-day slots available across Hyderabad",
  "Eco-safe products for kids, pets, and families",
  "Hotel-grade shine for homes and offices",
  "Deep cleaning experts for every room",
  "Trusted local team with 15+ years of care",
  "Transparent pricing with no hidden charges",
  "Fast booking and punctual arrival every time",
  "Fresh, hygienic spaces that feel brand new",
];

const HERO_TAGLINE = "MSR DEEP CLEANING";
const HERO_STATEMENT_STEP_SECONDS = 2.2;

// Nav component moved to src/components/Nav.tsx

const galleryItems = [
  {
    title: "Deep Home Cleaning",
    desc: "Spotless bedroom and living spaces",
    img: "https://images.pexels.com/photos/4239031/pexels-photo-4239031.jpeg?auto=compress&cs=tinysrgb&w=900"
  },
  {
    title: "Kitchen Deep Cleaning",
    desc: "Degreased and sanitized countertops",
    img: "https://images.pexels.com/photos/9462314/pexels-photo-9462314.jpeg?auto=compress&cs=tinysrgb&w=900"
  },
  {
    title: "Sofa & Upholstery Care",
    desc: "Dust mite and stain-free cleaning",
    img: "https://images.pexels.com/photos/4401535/pexels-photo-4401535.jpeg?auto=compress&cs=tinysrgb&w=900"
  },
  {
    title: "Solar Panel Cleaning",
    desc: "Efficiency-boosting panel wash",
    img: "https://images.pexels.com/photos/9875441/pexels-photo-9875441.jpeg?auto=compress&cs=tinysrgb&w=900"
  },
  {
    title: "Bathroom Deep Cleaning",
    desc: "Descaling and disinfecting tiles",
    img: "https://images.pexels.com/photos/4239131/pexels-photo-4239131.jpeg?auto=compress&cs=tinysrgb&w=900"
  },
  {
    title: "Water Tank Cleaning",
    desc: "Sanitized overhead water storage",
    img: "https://images.pexels.com/photos/32749028/pexels-photo-32749028.jpeg?auto=compress&cs=tinysrgb&w=900",
    imgClass: "object-bottom"
  }
];

const pricingData = [
  { size: "1 BHK", empty: "₹2,900", occupied: "₹5,000" },
  { size: "2 BHK", empty: "₹5,900", occupied: "₹7,000" },
  { size: "3 BHK", empty: "₹7,999", occupied: "₹9,000" },
  { size: "4 BHK", empty: "₹9,999", occupied: "₹12,000" },
  { size: "Sofa Cleaning", price: "₹999", isSingle: true },
  { size: "Tank Cleaning", price: "₹999", isSingle: true }
];

const beforeAfterPairs = [
  {
    title: "Kitchen Transformation",
    desc: "Intensive grease removal and disinfection of countertops, tiles, and exhaust areas.",
    before: "https://images.pexels.com/photos/3787027/pexels-photo-3787027.jpeg?auto=compress&cs=tinysrgb&w=900",
    after: "https://images.pexels.com/photos/19836790/pexels-photo-19836790.jpeg?auto=compress&cs=tinysrgb&w=900"
  },
  {
    title: "Sofa Restoration",
    desc: "Fabric extraction cleaning to remove deep dust mites, stains, and odors.",
    before: "https://images.pexels.com/photos/20291564/pexels-photo-20291564.jpeg?auto=compress&cs=tinysrgb&w=900",
    after: "https://images.pexels.com/photos/12277215/pexels-photo-12277215.jpeg?auto=compress&cs=tinysrgb&w=900"
  },
  {
    title: "Water Tank Sanitation",
    desc: "Removal of sludge, algae, and complete sanitization of internal walls.",
    before: "https://images.pexels.com/photos/5777344/pexels-photo-5777344.jpeg?auto=compress&cs=tinysrgb&w=900",
    after: "https://images.pexels.com/photos/32749028/pexels-photo-32749028.jpeg?auto=compress&cs=tinysrgb&w=900",
    afterPosition: "object-bottom"
  }
];

function BeforeAfterSlider({
  beforeUrl,
  afterUrl,
  title,
  desc,
  afterPosition
}: {
  beforeUrl: string;
  afterUrl: string;
  title: string;
  desc: string;
  afterPosition?: string;
}) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (clientX: number, rect: DOMRect) => {
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      const rect = e.currentTarget.getBoundingClientRect();
      handleMove(e.touches[0].clientX, rect);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging || e.buttons === 1) {
      const rect = e.currentTarget.getBoundingClientRect();
      handleMove(e.clientX, rect);
    }
  };

  return (
    <div className="flex flex-col gap-4 border border-border bg-card p-4 rounded-2xl shadow-soft">
      <div
        className="relative w-full aspect-[4/3] overflow-hidden rounded-xl slider-container select-none cursor-ew-resize border border-border"
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
      >
        <img src={afterUrl} alt="After cleaning" className={`absolute inset-0 w-full h-full object-cover pointer-events-none ${afterPosition || "object-center"}`} />
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
        >
          <img src={beforeUrl} alt="Before cleaning" className="absolute inset-0 w-full h-full object-cover max-w-none pointer-events-none object-center" />
        </div>

        {/* Handle */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-gold z-10 pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-navy border border-gold text-gold shadow-elegant pointer-events-auto">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
            </svg>
          </div>
        </div>

        {/* Labels */}
        <span className="absolute bottom-3 left-3 z-10 rounded bg-navy/80 px-2 py-0.5 text-[10px] font-medium text-white uppercase tracking-wider">
          Before
        </span>
        <span className="absolute bottom-3 right-3 z-10 rounded bg-gold/90 px-2 py-0.5 text-[10px] font-semibold text-navy uppercase tracking-wider">
          After
        </span>
      </div>
      <div>
        <h4 className="font-display text-base text-foreground font-semibold">{title}</h4>
        <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed font-light">{desc}</p>
      </div>
    </div>
  );
}

function PricingCard({
  item,
  onBook,
}: {
  item: typeof pricingData[number];
  onBook: (size: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="pricing-card rounded-2xl bg-card border border-border p-6 flex flex-col justify-between transition-all duration-300 hover:border-gold cursor-pointer"
      onClick={() => !expanded && setExpanded(true)}
    >
      <div>
        <div className="flex justify-between items-center">
          <h3 className="font-display text-lg font-semibold text-navy">{item.size}</h3>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(!expanded);
            }}
            className="text-gold p-1 hover:bg-secondary rounded-full transition"
            aria-label={expanded ? "Collapse details" : "Expand details"}
          >
            <ChevronDown
              className={`h-5 w-5 transition-transform duration-300 ${
                expanded ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        <div
          className={`transition-all duration-300 overflow-hidden ${
            expanded ? "max-h-40 opacity-100 mt-4" : "max-h-0 opacity-0"
          }`}
        >
          {item.isSingle ? (
            <div className="py-4 border-b border-border/60 flex justify-between items-center">
              <span className="text-sm text-foreground/80 font-light font-normal">Flat Rate</span>
              <span className="font-display font-semibold text-gold text-lg">{item.price}</span>
            </div>
          ) : (
            <div className="space-y-4 py-4 border-b border-border/60">
              <div className="flex justify-between items-center">
                <span className="text-sm text-foreground/80 font-light font-normal">Empty House</span>
                <span className="font-display font-semibold text-navy text-lg">{item.empty}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-foreground/80 font-light font-normal">Occupied House</span>
                <span className="font-display font-semibold text-gold text-lg">{item.occupied}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6">
        {!expanded ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(true);
            }}
            className="w-full rounded-full border border-gold bg-transparent py-2.5 text-xs font-semibold text-gold hover:bg-gold hover:text-navy transition"
          >
            View Price Details
          </button>
        ) : (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onBook(item.size);
            }}
            className="w-full rounded-full bg-navy py-2.5 text-xs font-normal text-white hover:bg-gold hover:text-navy transition animate-fade-in"
          >
            {item.isSingle ? "Book Service" : "Book This Size"}
          </button>
        )}
      </div>
    </div>
  );
}


function BookingForm({
  onSuccess,
  service,
}: {
  onSuccess: (savedToSheet: boolean, whatsappUrl: string) => void;
  service?: string | null;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isBhkService = service ? /bhk/i.test(service) : false;
  const [houseType, setHouseType] = useState<"Empty House" | "Occupied House">("Empty House");

  useEffect(() => {
    setHouseType("Empty House");
  }, [service]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    const form = e.currentTarget;
    const nameInput = form.elements.namedItem("name") as HTMLInputElement;
    const phoneInput = form.elements.namedItem("phone") as HTMLInputElement;
    const name = normalizeName(nameInput.value).trim();
    const phone = normalizePhoneNumber(phoneInput.value);
    const address = (form.elements.namedItem("address") as HTMLInputElement).value
      .trim()
      .slice(0, 300);
    const selectedService = (form.elements.namedItem("service") as HTMLInputElement).value
      .trim()
      .slice(0, 120);
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

    const serviceName = selectedService || "General enquiry";
    const finalServiceName = isBhkService ? `${serviceName} - ${houseType}` : serviceName;
    const message = `Hi MSR Deep Cleaning,\nService: ${finalServiceName}\nName: ${name}\nPhone: ${phone}${address ? `\nAddress: ${address}` : ""}`;
    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;

    setIsSubmitting(true);

    let savedToSheet = false;
    try {
      const lead = {
        submittedAt: new Date().toISOString(),
        service: finalServiceName,
        name,
        phone,
        address,
        source: "website-booking-form",
      };

      savedToSheet = await saveBookingLeadToSheet(lead);
      await submitBookingLeadToGoogleForm(lead);
    } catch (error) {
      console.error("Could not save booking lead.", error);
    } finally {
      setIsSubmitting(false);
    }

    onSuccess(savedToSheet, whatsappUrl);
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="space-y-1">
        <label
          htmlFor="service"
          className="text-xs font-normal uppercase tracking-[0.2em] text-muted-foreground"
        >
          Service
        </label>
        <input
          id="service"
          name="service"
          value={typeof service === "string" ? service : "General Cleaning"}
          readOnly
          className="w-full rounded-md border border-gold/40 bg-secondary px-4 py-3 text-sm font-normal text-foreground outline-none"
        />
      </div>
      {isBhkService && (
        <div className="space-y-1">
          <label
            htmlFor="houseType"
            className="text-xs font-normal uppercase tracking-[0.2em] text-muted-foreground"
          >
            House Type
          </label>
          <select
            id="houseType"
            name="houseType"
            value={houseType}
            onChange={(e) => setHouseType(e.target.value as "Empty House" | "Occupied House")}
            className="w-full rounded-md border border-input bg-white px-4 py-3 text-sm font-light text-foreground outline-none focus:border-gold cursor-pointer"
          >
            <option value="Empty House">Empty House</option>
            <option value="Occupied House">Occupied House</option>
          </select>
        </div>
      )}
      <input
        name="name"
        required
        maxLength={100}
        placeholder="Full name"
        pattern="[A-Za-z ]+"
        title="Name must contain only letters and spaces."
        onInput={(e) => {
          const input = e.currentTarget;
          input.value = normalizeName(input.value);
          input.setCustomValidity("");
        }}
        className="w-full rounded-md border border-input bg-white px-4 py-3 text-sm font-light text-foreground outline-none focus:border-gold"
      />
      <input
        name="phone"
        type="tel"
        required
        inputMode="numeric"
        maxLength={10}
        pattern="[0-9]{10}"
        title="Mobile number must contain exactly 10 digits."
        placeholder="Phone number"
        onInput={(e) => {
          const input = e.currentTarget;
          input.value = normalizePhoneNumber(input.value);
          input.setCustomValidity("");
        }}
        className="w-full rounded-md border border-input bg-white px-4 py-3 text-sm font-light text-foreground outline-none focus:border-gold"
      />
      <input
        name="address"
        maxLength={300}
        placeholder="Address (optional)"
        className="w-full rounded-md border border-input bg-white px-4 py-3 text-sm font-light text-foreground outline-none focus:border-gold"
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-navy px-6 py-3.5 text-sm font-normal text-white hover:bg-gold hover:text-navy"
      >
        {isSubmitting ? "Saving Request..." : "Submit Booking"} <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  );
}

function Hero({ onBook }: { onBook: (service?: string) => void }) {
  const [activePromo, setActivePromo] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActivePromo((current) => (current + 1) % heroPromos.length);
    }, 6000);

    return () => window.clearInterval(intervalId);
  }, []);

  const promo = heroPromos[activePromo];

  return (
    <section
      id="home"
      className="relative h-[100svh] lg:h-[100vh] overflow-hidden bg-[#dff4ff] pt-[5.5rem] pb-4 sm:pt-24 sm:pb-8 lg:pt-16 text-navy"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.65),transparent_34%),linear-gradient(180deg,rgba(223,244,255,0.98)_0%,rgba(203,233,255,0.96)_55%,rgba(191,226,252,0.98)_100%)]">
        <div className="absolute left-1/2 top-[16%] h-40 w-40 -translate-x-1/2 rounded-full bg-gold/15 blur-3xl sm:h-56 sm:w-56" />
      </div>
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover z-0 lg:hidden opacity-30"
        aria-hidden="true"
      >
        <source src={IMG.heroVideo} type="video/mp4" />
      </video>
      <div className="relative z-10 mx-auto grid h-[calc(100svh-88px)] lg:h-[calc(100vh-64px)] w-full max-w-7xl lg:grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)] lg:gap-10">
        <div className="flex min-h-0 h-full w-full flex-col justify-center px-4 pb-4 pt-2 text-center sm:px-6 sm:pb-8 sm:pt-6 md:px-8 lg:pb-12 lg:pt-8 xl:px-12">
          <div className="mx-auto flex h-full w-full max-w-[38rem] flex-col items-center justify-center gap-4 lg:min-h-0">
            <div
              className="word-in inline-flex items-center rounded-full border border-sky-300 bg-white/70 px-4 py-2 text-[10px] uppercase text-navy sm:px-5 sm:text-[11px]"
              style={{ animationDelay: "0.45s" }}
            >
              <span className="flex items-center leading-none tracking-[0.2em]">
                <Star
                  className="mr-1 h-3.5 w-3.5 shrink-0 text-gold"
                  fill="currentColor"
                  strokeWidth={0}
                />
                Best Cleaning Service in Hyderabad
              </span>
            </div>
            <div className="hero-brand-copy-group w-full max-w-[34rem] mx-auto">
              <h1 className="hero-brand-heading flex justify-center mb-4" aria-label={HERO_TAGLINE}>
                <span className="sr-only">MSR Deep Cleaning Services</span>
                <img
                  src={logoImage}
                  alt="MSR Deep Cleaning Services Logo"
                  className="w-40 sm:w-50 md:w-60 h-auto"
                />
              </h1>
              <div className="hero-copy-stack">
                <div className="word-in mt-2 w-full" style={{ animationDelay: "0.9s" }}>
                  <div className="scrolling-promo-track mx-auto max-w-[34rem] text-center text-black/70 font-light lg:max-w-[31rem]">
                    <div className="scrolling-promo-inner" key={promo.title}>
                      <div className="hero-service-promo">
                        <p className="service-detail mx-auto max-w-[27rem] text-[14px] leading-7 font-light text-foreground sm:text-[14px] md:text-[14px]">
                          {promo.detail}
                        </p>
                        <div className="mt-4">
                          {promo.type === "route" ? (
                            <Link
                              to={promo.href}
                              className="inline-flex min-h-9 items-center justify-center rounded-full border border-sky-300 bg-white/80 px-3.5 py-1.5 text-[10px] font-light uppercase tracking-[0.18em] text-black transition hover:bg-white sm:min-h-10 sm:px-4 sm:text-[10px] md:min-h-10 md:px-4.5 md:text-[11px]"
                            >
                              {promo.ctaLabel}
                            </Link>
                          ) : (
                            <a
                              href={promo.href}
                              className="inline-flex min-h-9 items-center justify-center rounded-full border border-sky-300 bg-white/80 px-3.5 py-1.5 text-[10px] font-light uppercase tracking-[0.18em] text-black transition hover:bg-white sm:min-h-10 sm:px-4 sm:text-[10px] md:min-h-10 md:px-4.5 md:text-[11px]"
                            >
                              {promo.ctaLabel}
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="word-in mt-12 w-full max-w-[32rem] lg:mt-4"
                  style={{ animationDelay: "1.1s" }}
                >
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => onBook("General Cleaning")}
                      className="inline-flex min-h-9 w-full items-center justify-center gap-2 rounded-full bg-gold px-3 py-2 text-[14px] font-normal text-navy transition hover:bg-white sm:px-6 sm:py-3.5 lg:min-h-[3.2rem] lg:px-6 lg:py-3.5"
                    >
                      Book Now <ArrowRight className="h-4 w-4" />
                    </button>

                    <a
                      href={`tel:${PHONE}`}
                      className="inline-flex min-h-9 w-full items-center justify-center gap-2 rounded-full border border-sky-300 bg-white/75 px-3 py-2 text-[14px] font-normal text-navy hover:bg-navy hover:text-white sm:px-6 sm:py-3.5 lg:min-h-[3.2rem] lg:px-6 lg:py-3.5"
                    >
                      {PHONE_DISPLAY}
                      <Phone className="h-4 w-4" fill="currentColor" strokeWidth={0} />
                    </a>
                  </div>
                </div>
                <div className="relative mt-8 w-full h-[60px] flex items-center justify-center lg:hidden">
                  <div className="hero-statement-stage-mobile w-full">
                    {heroStatements.map((statement, index) => (
                      <div
                        key={`mobile-video-${statement}`}
                        className="hero-statement-card hero-statement-card-mobile rounded-2xl border border-sky-300/30 bg-white/70 text-center text-xs text-navy shadow-[0_12px_28px_rgba(10,18,28,0.08)] backdrop-blur-md"
                        style={{
                          animationDelay: `${index * HERO_STATEMENT_STEP_SECONDS}s`,
                          animationDuration: `${heroStatements.length * HERO_STATEMENT_STEP_SECONDS}s`,
                        }}
                      >
                        <span className="h-2 w-2 shrink-0 rounded-full bg-gold" />
                        <span className="font-light leading-relaxed text-navy/90 font-medium">
                          {statement}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden lg:flex lg:h-full lg:items-center lg:justify-end lg:pr-8 xl:pr-12">
          <div className="relative w-full max-w-[38rem] overflow-hidden rounded-[2rem] border border-sky-200 bg-white/55 shadow-elegant">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="hero-media-video aspect-[16/18] w-full object-cover xl:aspect-[16/15]"
              aria-hidden="true"
            >
              <source src={IMG.heroVideo} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,58,92,0.08)_0%,rgba(9,58,92,0.22)_34%,rgba(9,58,92,0.42)_100%)]" />
            <div className="absolute inset-0 flex items-center justify-center px-8">
              <div className="hero-statement-stage">
                {heroStatements.map((statement, index) => (
                  <div
                    key={`desktop-${statement}`}
                    className="hero-statement-card rounded-[1.9rem] border border-white/30 bg-white/12 text-center text-base text-white shadow-[0_24px_54px_rgba(10,18,28,0.2)] backdrop-blur-xl xl:text-lg"
                    style={{
                      animationDelay: `${index * HERO_STATEMENT_STEP_SECONDS}s`,
                      animationDuration: `${heroStatements.length * HERO_STATEMENT_STEP_SECONDS}s`,
                    }}
                  >
                    <span className="h-3.5 w-3.5 shrink-0 rounded-full bg-gold shadow-[0_0_18px_rgba(83,211,255,0.55)]" />
                    <span className="font-light leading-relaxed text-white/95">{statement}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services({ onBook }: { onBook: (service?: string) => void }) {
  return (
    <section id="services" className="bg-secondary py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-normal uppercase tracking-[0.3em] text-gold">
            Our Services
          </p>
          <h2 className="mt-4 font-display text-3xl text-foreground md:text-5xl">
            Specialised care for every space
          </h2>
          <p className="mt-4 font-light text-muted-foreground">
            From homes to offices — pick a service or let us tailor a plan for you.
          </p>
          <p className="mt-3 text-sm font-normal tracking-[0.14em] text-foreground/80">
            MSR Deep Cleaning Group
          </p>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <button
              key={s.title}
              onClick={() => onBook(s.title)}
              className="group flex flex-col items-start border border-border bg-card p-7 text-left transition-all hover:-translate-y-1 hover:border-gold"
            >
              <div className="mb-5 flex h-10 w-10 sm:h-14 sm:w-14 items-center justify-center rounded-md bg-navy text-gold transition-transform group-hover:scale-110">
                <s.icon className="h-5 w-5 sm:h-7 sm:w-7" strokeWidth={1.4} />
              </div>
              <h3 className="font-display text-base text-foreground">{s.title}</h3>
              <p className="mt-2 text-xs font-light leading-relaxed text-muted-foreground">
                {s.desc}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="bg-background py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 md:px-8 lg:grid-cols-2 lg:items-center">
        <div className="order-2 relative lg:order-1">
          <img
            src={IMG.about}
            alt="MSR cleaning professionals at work"
            loading="lazy"
            className="aspect-[4/5] w-full object-cover"
          />
          <div className="absolute -bottom-6 -right-6 hidden bg-gold p-6 md:block">
            <div className="font-display text-4xl text-navy">15+</div>
            <div className="text-[11px] font-normal uppercase tracking-wider text-navy">
              Years of trust
            </div>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <p className="text-[11px] font-normal uppercase tracking-[0.3em] text-gold">Who We Are</p>
          <h2 className="mt-4 font-display text-3xl text-foreground md:text-5xl">
            Honest cleaning, delivered with care
          </h2>
          <p className="mt-6 font-light leading-relaxed text-muted-foreground">
            <span className="font-normal text-foreground">MSR Deep Cleaning</span> is one of the
            most reputable cleaning services in Hyderabad. From end-to-end home sweeps to
            specialised, area-focused jobs, our trained crew takes housekeeping to a whole new level
            — with hotel-grade equipment and eco-friendly products that are safe for your family.
          </p>
          <blockquote className="mt-6 border-l-2 border-gold bg-secondary p-5 text-sm font-light italic text-foreground">
            We are market leaders with more than 15 years of experience. Our team is well-trained,
            reliable, trustworthy and deeply skilled.
          </blockquote>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              "Background-checked staff",
              "Eco-friendly products",
              "Insured & bonded",
              "Same-day availability",
            ].map((p) => (
              <div key={p} className="flex items-center gap-2 text-sm font-light text-foreground">
                <CheckCircle2 className="h-5 w-5 text-gold" strokeWidth={1.5} />
                {p}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyChoose() {
  return (
    <section className="bg-navy py-20 text-white md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <p className="text-[11px] font-normal uppercase tracking-[0.3em] text-gold">
            Why Choose Us
          </p>
          <h2 className="mt-4 font-display text-3xl text-white md:text-5xl">
            Excellence in every detail
          </h2>
          <p className="mt-4 font-light text-white/70">
            Our commitment to quality, trust, and premium service delivery sets us apart as Hyderabad's deep cleaning market leader.
          </p>
        </div>

        {/* Mobile View: Scroll loop like reviews */}
        <div className="block md:hidden mt-8">
          <Marquee manual speed="slow" className="px-0">
            {whyPoints.map((p, index) => (
              <article
                key={p.title}
                className="w-[280px] shrink-0 border border-white/10 bg-white/5 p-6 rounded-2xl group"
              >
                <div className="text-gold font-display text-2xl font-bold mb-3 opacity-50 group-hover:opacity-100 transition-opacity">
                  0{index + 1}
                </div>
                <h3 className="font-display text-lg text-white font-semibold">{p.title}</h3>
                <p className="mt-2 text-xs font-light leading-relaxed text-white/70">{p.text}</p>
              </article>
            ))}
          </Marquee>
        </div>

        {/* Desktop View: Grid */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyPoints.map((p, index) => (
            <article
              key={p.title}
              className="border border-white/10 bg-white/5 p-8 rounded-2xl hover:border-gold/50 transition-all duration-300 group"
            >
              <div className="text-gold font-display text-2xl font-bold mb-4 opacity-50 group-hover:opacity-100 transition-opacity">
                0{index + 1}
              </div>
              <h3 className="font-display text-xl text-white font-semibold">{p.title}</h3>
              <p className="mt-3 text-sm font-light leading-relaxed text-white/70">{p.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function StarRating({ rating, starClassName }: { rating: number; starClassName: string }) {
  return (
    <div className="flex">
      {Array.from({ length: 5 }, (_, index) => {
        const fillPercent = Math.max(0, Math.min(1, rating - index)) * 100;

        return (
          <div key={index} className="relative">
            <Star
              className={`${starClassName} text-black/12`}
              fill="currentColor"
              strokeWidth={0}
            />
            <div className="absolute inset-0 overflow-hidden" style={{ width: `${fillPercent}%` }}>
              <Star className={`${starClassName} text-gold`} fill="currentColor" strokeWidth={0} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Reviews() {
  return (
    <section id="reviews" className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-normal uppercase tracking-[0.3em] text-gold">
            Google Reviews
          </p>
          <h2 className="mt-4 font-display text-3xl text-foreground md:text-5xl">
            Loved by thousands across Hyderabad
          </h2>
          <div className="mt-5 flex items-center justify-center gap-2">
            <StarRating rating={OVERALL_RATING} starClassName="h-5 w-5" />
            <span className="text-sm font-normal text-foreground">{OVERALL_RATING.toFixed(1)}</span>
            <span className="text-sm font-light text-muted-foreground">on Google</span>
          </div>
          <div className="mt-5">
            <a
              href={GOOGLE_REVIEW_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-black/85"
            >
              Give Review
            </a>
          </div>
        </div>
      </div>
      <div className="mt-14">
        <Marquee manual className="md:px-0">
          {reviews.map((r, i) => (
            <article
              key={i}
              className="w-[320px] shrink-0 border border-border bg-card p-6 md:w-[380px]"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-navy font-display text-lg text-gold">
                  {r.name.charAt(0)}
                </div>
                <div>
                  <div className="font-normal text-foreground">{r.name}</div>
                  <StarRating rating={r.rating} starClassName="h-3.5 w-3.5" />
                </div>
                <svg viewBox="0 0 48 48" className="ml-auto h-6 w-6">
                  <path
                    fill="#EA4335"
                    d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                  />
                  <path
                    fill="#34A853"
                    d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                  />
                </svg>
              </div>
              <p className="mt-4 text-sm font-light leading-relaxed text-muted-foreground">
                "{r.text}"
              </p>
            </article>
          ))}
        </Marquee>
      </div>
    </section>
  );
}

function Contact({ onBook, onSuccess }: { onBook: (service?: string) => void; onSuccess: (saved: boolean, url: string) => void }) {
  return (
    <section id="contact" className="bg-secondary py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 md:px-8 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-[11px] font-normal uppercase tracking-[0.3em] text-gold">
            Get in touch
          </p>
          <h2 className="mt-4 font-display text-3xl text-foreground md:text-5xl">
            We reply within an hour
          </h2>
          <p className="mt-4 font-light text-muted-foreground">
            Share your details and our team will craft a tailored quote for your space.
          </p>
          <div className="mt-8 space-y-4">
            <a
              href={`tel:${PHONE}`}
              className="flex items-start gap-4 border border-border bg-card p-4 hover:border-gold rounded-xl"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-gold text-navy">
                <Phone className="h-5 w-5" fill="currentColor" strokeWidth={0} />
              </div>
              <div>
                <div className="text-[11px] font-normal uppercase tracking-wider text-muted-foreground">
                  Call us
                </div>
                <div className="mt-0.5 font-display text-lg text-foreground">{PHONE_DISPLAY}</div>
              </div>
            </a>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 border border-border bg-card p-4 hover:border-gold rounded-xl"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-whatsapp text-white">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004c-1.562 0-3.051.611-4.164 1.717-1.113 1.106-1.728 2.589-1.728 4.15 0 3.217 2.619 5.835 5.835 5.835 1.562 0 3.051-.611 4.164-1.717 1.113-1.107 1.728-2.59 1.728-4.151 0-3.217-2.619-5.835-5.835-5.835m10.033-7.48A11.953 11.953 0 0 0 12.05 0C5.495 0 .16 5.335.16 11.899c0 2.176.564 4.298 1.628 6.187L.228 23.64l6.895-1.812c1.784.953 3.771 1.459 5.927 1.459 6.554 0 11.89-5.335 11.89-11.889 0-3.176-1.237-6.164-3.49-8.413Z" />
                </svg>
              </div>
              <div>
                <div className="text-[11px] font-normal uppercase tracking-wider text-muted-foreground">
                  WhatsApp
                </div>
                <div className="mt-0.5 font-display text-lg text-foreground">Chat now</div>
              </div>
            </a>
            <div className="flex items-start gap-4 border border-border bg-card p-4 rounded-xl">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-navy text-gold">
                <MapPin className="h-5 w-5" strokeWidth={1.5} />
              </div>
              <div>
                <div className="text-[11px] font-normal uppercase tracking-wider text-muted-foreground">
                  Visit
                </div>
                <div className="mt-0.5 text-sm font-light text-foreground">{ADDRESS}</div>
              </div>
            </div>
            <div className="flex items-start gap-4 border border-border bg-card p-4 rounded-xl">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-navy text-gold">
                <Clock className="h-5 w-5" strokeWidth={1.5} />
              </div>
              <div>
                <div className="text-[11px] font-normal uppercase tracking-wider text-muted-foreground">
                  Hours
                </div>
                <div className="mt-0.5 text-sm font-light text-foreground">
                  Mon – Sun · 7:00 AM – 9:00 PM
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-navy p-8 text-white md:p-10 rounded-2xl shadow-elegant">
          <h3 className="font-display text-2xl text-white md:text-3xl mb-1">Get a Free Quote</h3>
          <p className="text-xs font-light text-white/70 mb-6">
            Fill in your details — we will reach out within an hour.
          </p>
          <BookingForm onSuccess={onSuccess} service="General Enquiry" />
          <p className="mt-4 text-center text-xs font-light text-white/60">
            Or call{" "}
            <a href={`tel:${PHONE}`} className="text-gold">
              {PHONE_DISPLAY}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

function LocationMap() {
  return (
    <section className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-normal uppercase tracking-[0.3em] text-gold">
            Google Maps
          </p>
          <h2 className="mt-4 font-display text-3xl text-foreground md:text-5xl">
            Find Our Location
          </h2>
          <p className="mt-4 font-light leading-relaxed text-muted-foreground">
            View our exact location below and open turn-by-turn directions in Google Maps.
          </p>
        </div>
        <div className="mt-12 overflow-hidden rounded-[1.5rem] border border-border bg-card shadow-soft">
          <iframe
            title="MSR Deep Cleaning map"
            src={MAP_EMBED_URL}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[320px] w-full md:h-[460px]"
          />
        </div>
        <div className="mt-6 flex flex-col gap-4 rounded-[1.25rem] border border-border bg-secondary p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <div className="text-[11px] font-normal uppercase tracking-[0.26em] text-gold">
              Address
            </div>
            <p className="mt-2 max-w-2xl text-sm font-light leading-relaxed text-foreground">
              {ADDRESS}
            </p>
          </div>
          <a
            href={MAP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-normal text-white hover:bg-gold hover:text-navy"
          >
            Open in Google Maps <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <img
                src={logoImage}
                alt="MSR Deep Cleaning logo"
                className="brand-logo-dark-blue h-12 w-12 object-contain"
              />
              <div className="leading-tight">
                <div className="font-display text-lg">
                  <span className="text-gold">MSR</span> Deep Cleaning
                </div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-white/60">
                  Hyderabad
                </div>
              </div>
            </div>
            <p className="mt-5 max-w-md text-sm font-light text-white/70">
              The best cleaning service in Hyderabad. Trained crews, honest pricing, real results.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={`tel:${PHONE}`}
                className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-normal text-navy"
              >
                <Phone className="h-4 w-4" fill="currentColor" strokeWidth={0} /> {PHONE_DISPLAY}
              </a>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-5 py-2.5 text-sm font-normal text-white"
              >
                <MessageCircle className="h-4 w-4" fill="currentColor" strokeWidth={0} /> WhatsApp
              </a>
            </div>
          </div>
          <div>
            <div className="font-display text-base text-gold">Services</div>
            <ul className="mt-4 space-y-2 text-sm font-light text-white/70">
              {services.map((s) => (
                <li key={s.title}>
                  <Link to="/services" className="hover:text-gold">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-display text-base text-gold">Contact</div>
            <ul className="mt-4 space-y-3 text-sm font-light text-white/70">
              <li className="flex gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} />
                <span>{FOOTER_ADDRESS}</span>
              </li>
              <li className="flex gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} />
                <a
                  href={MAP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold"
                >
                  Open in Google Maps
                </a>
              </li>
              <li className="flex gap-2">
                <Phone className="h-4 w-4 shrink-0 text-gold" />
                <span>{PHONE_DISPLAY}</span>
              </li>
              <li className="flex gap-2">
                <Mail className="h-4 w-4 shrink-0 text-gold" />
                <a href={`mailto:${EMAIL}`} className="hover:text-gold">{EMAIL}</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-14 border-t border-white/10 pt-10">
          <div className="max-w-3xl">
            <div className="text-[11px] font-normal uppercase tracking-[0.3em] text-gold">
              Service Areas
            </div>
            <h3 className="mt-4 font-display text-2xl text-white md:text-3xl">
              Get our top-notch house cleaning services available in following area of Hyderabad
            </h3>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-3 text-sm font-light text-white/75 sm:grid-cols-3 lg:grid-cols-5">
            {serviceAreas.map((area) => (
              <div key={area}>{area}</div>
            ))}
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs font-light text-white/50">
          © {new Date().getFullYear()} MSR Deep Cleaning · All Rights Reserved
        </div>
      </div>
    </footer>
  );
}

function Index() {
  const [bookOpen, setBookOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [savedToSheet, setSavedToSheet] = useState(false);
  const [pendingWhatsappUrl, setPendingWhatsappUrl] = useState<string | null>(null);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  const openBook = (service?: string) => {
    setSelectedService(service ?? null);
    setBookOpen(true);
  };
  const handleSuccess = (saved: boolean, whatsappUrl: string) => {
    setSavedToSheet(saved);
    setPendingWhatsappUrl(whatsappUrl);
    setBookOpen(false);
    setSuccessOpen(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav onBook={openBook} />
      {/* Splash loader removed */}
      <main>
        <Hero onBook={openBook} />

        {/* Before & After Section */}
        <section id="before-after" className="bg-secondary py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <div className="mx-auto max-w-3xl text-center mb-16">
              <p className="text-[11px] font-normal uppercase tracking-[0.3em] text-gold animate-pulse">
                Transformations
              </p>
              <h2 className="mt-4 font-display text-3xl text-foreground md:text-5xl">
                Before & After Gallery
              </h2>
              <p className="mt-4 font-light text-muted-foreground leading-relaxed">
                Drag the slider to see the results of our deep cleaning expertise in kitchens, upholstery, and water tanks.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {beforeAfterPairs.map((pair) => (
                <BeforeAfterSlider
                  key={pair.title}
                  title={pair.title}
                  desc={pair.desc}
                  beforeUrl={pair.before}
                  afterUrl={pair.after}
                  afterPosition={pair.afterPosition}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Guide Section */}
        <section id="pricing" className="bg-background py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <div className="mx-auto max-w-3xl text-center mb-16">
              <p className="text-[11px] font-normal uppercase tracking-[0.3em] text-gold">
                Pricing Guide
              </p>
              <h2 className="mt-4 font-display text-3xl text-foreground md:text-5xl">
                Deep Cleaning Starting Rates
              </h2>
              <p className="mt-4 font-light text-muted-foreground leading-relaxed">
                Upfront, transparent pricing tailored to your property size. Final pricing may vary depending on the condition and requirements.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pricingData.map((item) => (
                <PricingCard key={item.size} item={item} onBook={openBook} />
              ))}
            </div>
            <p className="mt-8 text-center text-xs font-light text-muted-foreground max-w-md mx-auto">
              Note: Final pricing may vary depending on the property condition, size, and service requirements.
            </p>
          </div>
        </section>

        {/* Why Choose Us */}
        <WhyChoose />

        {/* Gallery Section */}
        <section id="gallery" className="bg-background py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <div className="mx-auto max-w-3xl text-center mb-16">
              <p className="text-[11px] font-normal uppercase tracking-[0.3em] text-gold">
                Our Gallery
              </p>
              <h2 className="mt-4 font-display text-3xl text-foreground md:text-5xl">
                Real Service Gallery
              </h2>
              <p className="mt-4 font-light text-muted-foreground leading-relaxed">
                Snapshots of our professional teams in action delivering premium results.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryItems.map((item, index) => (
                <div
                  key={index}
                  className="gallery-card group"
                  onClick={() => setLightboxImg(item.img)}
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className={item.imgClass || ""}
                    style={item.imgClass ? { objectPosition: item.imgClass.replace("object-", "") } : undefined}
                    loading="lazy"
                  />
                  <div className="gallery-card-overlay">
                    <h4 className="font-display text-white text-base font-semibold">{item.title}</h4>
                    <p className="text-white/80 text-xs font-light mt-1">{item.desc}</p>
                    <span className="mt-3 text-[10px] text-gold uppercase tracking-wider font-medium">Click to zoom</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <Reviews />

        {/* Get Free Quote Form / Contact */}
        <Contact onBook={openBook} onSuccess={handleSuccess} />

        {/* Google Maps */}
        <LocationMap />
      </main>
      <Footer />
      <HelpBot onBook={openBook} />
      <FloatingContact />

      <Dialog open={bookOpen} onOpenChange={setBookOpen}>
        <DialogContent showCloseButton={false} className="border-0 bg-white p-0 sm:max-w-md">
          <button
            type="button"
            onClick={() => setBookOpen(false)}
            aria-label="Close booking form"
            className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white hover:text-navy"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="bg-navy px-6 py-5 text-white">
            <DialogHeader>
              <DialogTitle className="font-display text-2xl font-normal text-white">
                Book Your Cleaning
              </DialogTitle>
              <DialogDescription className="font-light text-white/70">
                Share a few details — we will reach out within an hour.
              </DialogDescription>
            </DialogHeader>
          </div>
          <div className="p-6">
            <BookingForm onSuccess={handleSuccess} service={selectedService} />
            <p className="mt-4 text-center text-xs font-light text-muted-foreground">
              Or call{" "}
              <a href={`tel:${PHONE}`} className="text-foreground hover:text-gold">
                {PHONE_DISPLAY}
              </a>
            </p>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={successOpen} onOpenChange={setSuccessOpen}>
        <DialogContent
          showCloseButton={false}
          className="border-0 bg-white p-8 text-center sm:max-w-md"
        >
          <button
            type="button"
            onClick={() => setSuccessOpen(false)}
            aria-label="Close confirmation"
            className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-secondary text-foreground transition-colors hover:border-gold hover:text-gold"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold">
            <CheckCircle2 className="h-9 w-9 text-navy" strokeWidth={1.5} />
          </div>
          <DialogHeader>
            <DialogTitle className="font-display text-2xl font-normal text-foreground">
              Booking Received
            </DialogTitle>
            <DialogDescription className="font-light text-muted-foreground">
              Thank you — our team will get in touch with you shortly.
              {savedToSheet
                ? " We have also saved your request in Google Sheets."
                : " Connect the Google Sheets webhook to save each booking automatically."}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-center">
            {pendingWhatsappUrl ? (
              <a
                href={pendingWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-gold px-6 py-3 text-sm font-normal text-navy hover:bg-navy hover:text-white"
              >
                Open WhatsApp
              </a>
            ) : null}
            <button
              onClick={() => setSuccessOpen(false)}
              className="rounded-full bg-navy px-6 py-3 text-sm font-normal text-white hover:bg-gold hover:text-navy"
            >
              Close
            </button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={lightboxImg !== null} onOpenChange={(open) => !open && setLightboxImg(null)}>
        <DialogContent className="border-0 bg-transparent p-0 max-w-4xl shadow-none">
          {lightboxImg && (
            <div className="relative flex items-center justify-center p-4">
              <button
                type="button"
                onClick={() => setLightboxImg(null)}
                aria-label="Close image view"
                className="absolute -top-12 right-4 z-50 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
              <img src={lightboxImg} alt="Gallery zoom" className="max-h-[80vh] w-auto max-w-full rounded-lg object-contain shadow-elegant" />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
