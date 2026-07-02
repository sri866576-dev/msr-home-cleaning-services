import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
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
  ArrowUp,
  ChevronDown,
  Menu,
  X,
  Shield,
  Sparkles,
  Zap,
  Loader2,
  Smartphone,
  Download,
  Info,
} from "lucide-react";

const AndroidIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 3a8 8 0 0 1 8 8h-16a8 8 0 0 1 8-8Z" />
    <path d="M5 11h-2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h2" />
    <path d="M17 11h2a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-2" />
    <path d="M8 19v3" />
    <path d="M16 19v3" />
    <path d="M15 3 17 1" />
    <path d="M9 3 7 1" />
    <path d="M16 8v0" />
    <path d="M8 8v0" />
    <path d="M6 11v6c0 1.7 1.3 3 3 3h6c1.7 0 3-1.3 3-3v-6" />
  </svg>
);
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

// Feature Toggle: Change this to true to enable APK download features
const ENABLE_APK_DOWNLOAD = false;

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

const IMG = {
  heroVideo: heroVideoFile,
  heroPoster:
    "https://images.pexels.com/photos/4239031/pexels-photo-4239031.jpeg?auto=compress&cs=tinysrgb&w=1920",
  about:
    "https://images.pexels.com/photos/4239091/pexels-photo-4239091.jpeg?auto=compress&cs=tinysrgb&w=1400",
};

const services = [
  {
    icon: SunMedium,
    title: "Solar Panel Cleaning",
    desc: "Specialized cleaning to maximize power output and efficiency of your solar system.",
  },
  {
    icon: Home,
    title: "Deep Home Cleaning",
    desc: "Thorough, professional cleaning residential and commercial spaces.",
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

const House3DIcon = () => (
  <svg width="34" height="34" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="18" width="20" height="15" rx="2" fill="#FFE082" stroke="#0D2A3A" strokeWidth="2" strokeLinejoin="round" />
    <rect x="15" y="24" width="6" height="9" fill="#FF7043" stroke="#0D2A3A" strokeWidth="2" strokeLinejoin="round" />
    <circle cx="17" cy="28" r="0.75" fill="#0D2A3A" />
    <polygon points="18,7 4,19 32,19" fill="#26A69A" stroke="#0D2A3A" strokeWidth="2" strokeLinejoin="round" />
    <path d="M26 11L28 14L31 16L28 18L26 21L24 18L21 16L24 14L26 11Z" fill="#29B6F6" stroke="#0D2A3A" strokeWidth="1.5" strokeLinejoin="round" />
    <circle cx="26" cy="16" r="1.5" fill="#FFFFFF" />
    <circle cx="12" cy="13" r="1" fill="#FFCA28" />
    <circle cx="33" cy="24" r="1.5" fill="#AB47BC" />
  </svg>
);

const Kitchen3DIcon = () => (
  <svg width="34" height="34" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="20" width="28" height="13" rx="2" fill="#78909C" stroke="#0D2A3A" strokeWidth="2" />
    <rect x="9" y="24" width="10" height="9" fill="#90A4AE" stroke="#0D2A3A" strokeWidth="1.5" />
    <rect x="21" y="24" width="10" height="9" fill="#90A4AE" stroke="#0D2A3A" strokeWidth="1.5" />
    <circle cx="16" cy="28" r="1" fill="#0D2A3A" />
    <circle cx="24" cy="28" r="1" fill="#0D2A3A" />
    <path d="M25 20V16H28" stroke="#0D2A3A" strokeWidth="2" strokeLinecap="round" />
    <rect x="9" y="15" width="10" height="5" rx="1" fill="#FF7043" stroke="#0D2A3A" strokeWidth="2" />
    <path d="M8 17H7" stroke="#0D2A3A" strokeWidth="2" />
    <path d="M20 17H19" stroke="#0D2A3A" strokeWidth="2" />
    <path d="M31 8L32.5 10L34.5 10.5L32.5 11L31 13L29.5 11L27.5 10.5L29.5 10L31 8Z" fill="#29B6F6" stroke="#0D2A3A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="23" cy="11" r="1.5" fill="#FFCA28" />
  </svg>
);

const Sofa3DIcon = () => (
  <svg width="34" height="34" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="7" y="16" width="26" height="12" rx="3" fill="#FF7043" stroke="#0D2A3A" strokeWidth="2" strokeLinejoin="round" />
    <rect x="9" y="21" width="11" height="8" rx="2" fill="#FF8A65" stroke="#0D2A3A" strokeWidth="2" strokeLinejoin="round" />
    <rect x="20" y="21" width="11" height="8" rx="2" fill="#FF8A65" stroke="#0D2A3A" strokeWidth="2" strokeLinejoin="round" />
    <rect x="5" y="19" width="5" height="10" rx="2" fill="#FF7043" stroke="#0D2A3A" strokeWidth="2" strokeLinejoin="round" />
    <rect x="30" y="19" width="5" height="10" rx="2" fill="#FF7043" stroke="#0D2A3A" strokeWidth="2" strokeLinejoin="round" />
    <rect x="8" y="29" width="4" height="3" rx="1" fill="#8D6E63" stroke="#0D2A3A" strokeWidth="1.5" />
    <rect x="28" y="29" width="4" height="3" rx="1" fill="#8D6E63" stroke="#0D2A3A" strokeWidth="1.5" />
    <path d="M12 6L13.5 8.5L16 9.5L13.5 10.5L12 13L10.5 10.5L8 9.5L10.5 8.5L12 6Z" fill="#26A69A" stroke="#0D2A3A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M26 7L27 9L29 9.5L27 10L26 12L25 10L23 9.5L25 9L26 7Z" fill="#AB47BC" stroke="#0D2A3A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="18" cy="11" r="1" fill="#FFCA28" />
  </svg>
);

const Floor3DIcon = () => (
  <svg width="34" height="34" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 30H35" stroke="#0D2A3A" strokeWidth="2" strokeLinecap="round" />
    <rect x="11" y="21" width="18" height="9" rx="2" fill="#26A69A" stroke="#0D2A3A" strokeWidth="2" />
    <rect x="15" y="16" width="10" height="5" rx="1" fill="#80CBC4" stroke="#0D2A3A" strokeWidth="2" />
    <path d="M20 16L20 7M20 7H16M20 7H24" stroke="#0D2A3A" strokeWidth="2" strokeLinecap="round" />
    <circle cx="8" cy="23" r="2.5" fill="#29B6F6" stroke="#0D2A3A" strokeWidth="1.5" />
    <circle cx="32" cy="18" r="1.5" fill="#29B6F6" stroke="#0D2A3A" strokeWidth="1" />
    <path d="M32 9L33 11L35 11.5L33 12L32 14L31 12L29 11.5L31 11L32 9Z" fill="#FFCA28" stroke="#0D2A3A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const FloorPolish3DIcon = () => (
  <svg width="34" height="34" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 31H34" stroke="#0D2A3A" strokeWidth="2" strokeLinecap="round" />
    <path d="M20 8L24 14L20 20L16 14L20 8Z" fill="#EAB308" stroke="#0D2A3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 8V20" stroke="#0D2A3A" strokeWidth="1.5" />
    <path d="M16 14H24" stroke="#0D2A3A" strokeWidth="1.5" />
    <path d="M10 16L12 18L10 20L8 18L10 16Z" fill="#29B6F6" stroke="#0D2A3A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M30 14L32 16L30 18L28 16L30 14Z" fill="#26A69A" stroke="#0D2A3A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="26" cy="24" r="1.5" fill="#AB47BC" />
  </svg>
);

const Tank3DIcon = () => (
  <svg width="34" height="34" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="12" width="20" height="19" rx="3" fill="#1E88E5" stroke="#0D2A3A" strokeWidth="2" />
    <line x1="10" y1="17" x2="30" y2="17" stroke="#0D2A3A" strokeWidth="2" />
    <line x1="10" y1="22" x2="30" y2="22" stroke="#0D2A3A" strokeWidth="2" />
    <line x1="10" y1="27" x2="30" y2="27" stroke="#0D2A3A" strokeWidth="2" />
    <rect x="15" y="8" width="10" height="4" rx="1" fill="#0D47A1" stroke="#0D2A3A" strokeWidth="2" />
    <path d="M7 21C7 21 9 24 9 25.5C9 26.6 8.1 27.5 7 27.5C5.9 27.5 5 26.6 5 25.5C5 24 7 21 7 21Z" fill="#29B6F6" stroke="#0D2A3A" strokeWidth="1.5" />
    <path d="M33 22C33 22 34.5 24 34.5 25C34.5 25.8 33.8 26.5 33 26.5C32.2 26.5 31.5 25.8 31.5 25C31.5 24 33 22 33 22Z" fill="#29B6F6" stroke="#0D2A3A" strokeWidth="1.2" />
    <circle cx="31" cy="9" r="1.5" fill="#FFCA28" />
  </svg>
);

const Carpet3DIcon = () => (
  <svg width="34" height="34" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 28H34V20H12C8.7 20 6 22.7 6 26V28Z" fill="#EC4899" stroke="#0D2A3A" strokeWidth="2" strokeLinejoin="round" />
    <ellipse cx="6" cy="24" rx="2" ry="4" fill="#C026D3" stroke="#0D2A3A" strokeWidth="2" />
    <line x1="14" y1="24" x2="30" y2="24" stroke="#FEE2E2" strokeWidth="1.5" strokeDasharray="3 3" />
    <path d="M22 17L28 11M28 11L33 16M28 11L25 8" stroke="#0D2A3A" strokeWidth="2" strokeLinecap="round" />
    <path d="M19 19L23 15" stroke="#0D2A3A" strokeWidth="2" strokeLinecap="round" />
    <rect x="17" y="16" width="5" height="5" rx="1" fill="#78909C" stroke="#0D2A3A" strokeWidth="1.5" transform="rotate(45 19.5 18.5)" />
    <path d="M14 9L15 11L17 11.5L15 12L14 14L13 12L11 11.5L13 11L14 9Z" fill="#FFCA28" stroke="#0D2A3A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Refrigerator3DIcon = () => (
  <svg width="34" height="34" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="11" y="7" width="18" height="27" rx="3" fill="#AB47BC" stroke="#0D2A3A" strokeWidth="2" />
    <line x1="11" y1="17" x2="29" y2="17" stroke="#0D2A3A" strokeWidth="2" />
    <rect x="13" y="11" width="2" height="5" rx="0.5" fill="#E0F7FA" stroke="#0D2A3A" strokeWidth="1.5" />
    <rect x="13" y="19" width="2" height="8" rx="0.5" fill="#E0F7FA" stroke="#0D2A3A" strokeWidth="1.5" />
    <path d="M33 11L34 13L36 13.5L34 14L33 16L32 14L30 13.5L32 13L33 11Z" fill="#29B6F6" stroke="#0D2A3A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="8" cy="15" r="1.5" fill="#FFCA28" />
  </svg>
);

const Window3DIcon = () => (
  <svg width="34" height="34" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="9" y="9" width="22" height="22" rx="2" fill="#E0F7FA" stroke="#0D2A3A" strokeWidth="2" />
    <line x1="20" y1="9" x2="20" y2="31" stroke="#0D2A3A" strokeWidth="2" />
    <line x1="9" y1="20" x2="31" y2="20" stroke="#0D2A3A" strokeWidth="2" />
    <path d="M12 12L17 17" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
    <path d="M23 23L28 28" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
    <path d="M26 12L21 16" stroke="#0D2A3A" strokeWidth="2" strokeLinecap="round" />
    <rect x="22" y="7" width="10" height="3" rx="1" fill="#FF7043" stroke="#0D2A3A" strokeWidth="1.5" transform="rotate(30 27 8.5)" />
    <path d="M6 14L7 16L9 16.5L7 17L6 19L5 17L3 16.5L5 16L6 14Z" fill="#FFCA28" stroke="#0D2A3A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Office3DIcon = () => (
  <svg width="34" height="34" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="22" width="28" height="3" rx="1" fill="#8D6E63" stroke="#0D2A3A" strokeWidth="2" />
    <line x1="9" y1="25" x2="9" y2="32" stroke="#0D2A3A" strokeWidth="2" strokeLinecap="round" />
    <line x1="31" y1="25" x2="31" y2="32" stroke="#0D2A3A" strokeWidth="2" strokeLinecap="round" />
    <rect x="14" y="14" width="12" height="7" rx="1" fill="#78909C" stroke="#0D2A3A" strokeWidth="2" />
    <path d="M18 21H22" stroke="#0D2A3A" strokeWidth="2" strokeLinecap="round" />
    <path d="M8 22L8 16" stroke="#0D2A3A" strokeWidth="1.5" />
    <path d="M6 16C6 14 10 14 10 16H6Z" fill="#FFCA28" stroke="#0D2A3A" strokeWidth="1.5" />
    <path d="M31 8L32.5 10L34.5 10.5L32.5 11L31 13L29.5 11L27.5 10.5L29.5 10L31 8Z" fill="#26A69A" stroke="#0D2A3A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Mattress3DIcon = () => (
  <svg width="34" height="34" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="24" width="28" height="6" rx="2" fill="#8D6E63" stroke="#0D2A3A" strokeWidth="2" />
    <rect x="7" y="17" width="26" height="7" rx="1" fill="#ECEFF1" stroke="#0D2A3A" strokeWidth="2" />
    <rect x="9" y="14" width="8" height="3" rx="1" fill="#CFD8DC" stroke="#0D2A3A" strokeWidth="1.5" />
    <path d="M26 8C26 8 26 10 24 11C24 14.5 26.5 17 29 17.5C31.5 17 34 14.5 34 11C32 10 32 8 32 8C32 8 29.5 8.5 29 8.5C28.5 8.5 26 8 26 8Z" fill="#4CAF50" stroke="#0D2A3A" strokeWidth="1.5" strokeLinejoin="round" />
    <circle cx="12" cy="10" r="1.5" fill="#FFCA28" />
  </svg>
);

const Pest3DIcon = () => (
  <svg width="34" height="34" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="22" r="6" fill="#EF5350" stroke="#0D2A3A" strokeWidth="2" />
    <circle cx="20" cy="14" r="3.5" fill="#E53935" stroke="#0D2A3A" strokeWidth="2" />
    <path d="M18 11C18 11 17 9 15 9" stroke="#0D2A3A" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M22 11C22 11 23 9 25 9" stroke="#0D2A3A" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M13 20H8" stroke="#0D2A3A" strokeWidth="2" strokeLinecap="round" />
    <path d="M27 20H32" stroke="#0D2A3A" strokeWidth="2" strokeLinecap="round" />
    <path d="M14 25L9 27" stroke="#0D2A3A" strokeWidth="2" strokeLinecap="round" />
    <path d="M26 25L31 27" stroke="#0D2A3A" strokeWidth="2" strokeLinecap="round" />
    <circle cx="20" cy="20" r="13" stroke="#DC2626" strokeWidth="3" fill="none" opacity="0.9" />
    <line x1="11" y1="11" x2="29" y2="29" stroke="#DC2626" strokeWidth="3" opacity="0.9" />
  </svg>
);

const Villa3DIcon = () => (
  <svg width="34" height="34" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="7" y="18" width="12" height="15" rx="1" fill="#FFF59D" stroke="#0D2A3A" strokeWidth="2" />
    <polygon points="13,10 6,18 20,18" fill="#D84315" stroke="#0D2A3A" strokeWidth="2" strokeLinejoin="round" />
    <rect x="19" y="13" width="14" height="20" rx="1" fill="#FFF59D" stroke="#0D2A3A" strokeWidth="2" />
    <polygon points="26,6 18,13 34,13" fill="#D84315" stroke="#0D2A3A" strokeWidth="2" strokeLinejoin="round" />
    <rect x="10" y="21" width="3" height="4" fill="#E0F7FA" stroke="#0D2A3A" strokeWidth="1.5" />
    <rect x="22" y="16" width="3" height="4" fill="#E0F7FA" stroke="#0D2A3A" strokeWidth="1.5" />
    <rect x="27" y="16" width="3" height="4" fill="#E0F7FA" stroke="#0D2A3A" strokeWidth="1.5" />
    <rect x="22" y="23" width="3" height="4" fill="#E0F7FA" stroke="#0D2A3A" strokeWidth="1.5" />
    <rect x="27" y="23" width="3" height="4" fill="#E0F7FA" stroke="#0D2A3A" strokeWidth="1.5" />
    <rect x="11" y="28" width="4" height="5" fill="#8D6E63" stroke="#0D2A3A" strokeWidth="1.5" />
    <path d="M33 7L34.5 9L36.5 9.5L34.5 10L33 12L31.5 10L29.5 9.5L31.5 9L33 7Z" fill="#29B6F6" stroke="#0D2A3A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Chair3DIcon = () => (
  <svg width="34" height="34" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="12" y="8" width="16" height="13" rx="3" fill="#78909C" stroke="#0D2A3A" strokeWidth="2" />
    <rect x="10" y="22" width="20" height="4" rx="1.5" fill="#546E7A" stroke="#0D2A3A" strokeWidth="2" />
    <path d="M20 21V23" stroke="#0D2A3A" strokeWidth="2" />
    <line x1="20" y1="26" x2="20" y2="30" stroke="#0D2A3A" strokeWidth="2" />
    <path d="M14 32L20 30L26 32" stroke="#0D2A3A" strokeWidth="2" strokeLinecap="round" />
    <circle cx="13" cy="33" r="1.5" fill="#0D2A3A" />
    <circle cx="27" cy="33" r="1.5" fill="#0D2A3A" />
    <path d="M32 14L33 16L35 16.5L33 17L32 19L31 17L29 16.5L31 16L32 14Z" fill="#FFCA28" stroke="#0D2A3A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Scrub3DIcon = () => (
  <svg width="34" height="34" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 32H35" stroke="#0D2A3A" strokeWidth="2" strokeLinecap="round" />
    <path d="M10 29C10 25 12 21 16 21H24C28 21 30 25 30 29H10Z" fill="#84CC16" stroke="#0D2A3A" strokeWidth="2" strokeLinejoin="round" />
    <circle cx="14" cy="30" r="3" fill="#475569" stroke="#0D2A3A" strokeWidth="2" />
    <circle cx="26" cy="30" r="3" fill="#475569" stroke="#0D2A3A" strokeWidth="2" />
    <rect x="14" y="15" width="12" height="6" rx="1.5" fill="#A3E635" stroke="#0D2A3A" strokeWidth="2" />
    <path d="M26 15L31 9M31 9H34" stroke="#0D2A3A" strokeWidth="2" strokeLinecap="round" />
    <circle cx="7" cy="27" r="1" fill="#29B6F6" />
    <circle cx="8" cy="22" r="1.5" fill="#29B6F6" />
    <path d="M32 13L33 15L35 15.5L33 16L32 18L31 16L29 15.5L31 15L32 13Z" fill="#FFCA28" stroke="#0D2A3A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Move3DIcon = () => (
  <svg width="34" height="34" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="7" y="16" width="18" height="15" rx="1.5" fill="#CE93D8" stroke="#0D2A3A" strokeWidth="2" />
    <polygon points="7,16 11,10 21,10 25,16" fill="#E1BEE7" stroke="#0D2A3A" strokeWidth="2" strokeLinejoin="round" />
    <circle cx="29" cy="15" r="4" fill="#FFCA28" stroke="#0D2A3A" strokeWidth="2" />
    <path d="M29 19V28H26V26H29V24H26V22H29V19" stroke="#0D2A3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M33 28L34 30L36 30.5L34 31L33 33L32 31L30 30.5L32 30L33 28Z" fill="#26A69A" stroke="#0D2A3A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Paint3DIcon = () => (
  <svg width="34" height="34" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 25C9 28 5 24 6 20C7 16 11 17 15 15C19 13 22 17 21 21C20 25 15 22 12 25Z" fill="#F8BBD0" opacity="0.6" />
    <rect x="13" y="9" width="18" height="7" rx="1.5" fill="#EC4899" stroke="#0D2A3A" strokeWidth="2" />
    <path d="M13 12.5H9V21H16V24" stroke="#0D2A3A" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="14" y="24" width="4" height="9" rx="1" fill="#8D6E63" stroke="#0D2A3A" strokeWidth="2" />
    <path d="M16 16.5V19" stroke="#EC4899" strokeWidth="2" strokeLinecap="round" />
    <path d="M25 16.5V21" stroke="#EC4899" strokeWidth="2" strokeLinecap="round" />
    <path d="M29 16.5V18" stroke="#EC4899" strokeWidth="2" strokeLinecap="round" />
    <circle cx="8" cy="8" r="1.5" fill="#FFCA28" />
  </svg>
);

const Solar3DIcon = () => (
  <svg width="34" height="34" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="9,18 31,16 28,32 6,34" fill="#0D47A1" stroke="#0D2A3A" strokeWidth="2" />
    <line x1="17" y1="17" x2="15" y2="33" stroke="#0D2A3A" strokeWidth="1.5" />
    <line x1="24" y1="17" x2="22" y2="33" stroke="#0D2A3A" strokeWidth="1.5" />
    <line x1="8" y1="25" x2="30" y2="23" stroke="#0D2A3A" strokeWidth="1.5" />
    <circle cx="30" cy="9" r="4.5" fill="#FF7043" stroke="#0D2A3A" strokeWidth="2" />
    <path d="M30 3V4" stroke="#0D2A3A" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M30 14V15" stroke="#0D2A3A" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M24 9H25" stroke="#0D2A3A" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M35 9H36" stroke="#0D2A3A" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M12 7L13 9L15 9.5L13 10L12 12L11 10L9 9.5L11 9L12 7Z" fill="#29B6F6" stroke="#0D2A3A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const servicePackages = [
  {
    icon: House3DIcon,
    title: "Full Home Deep Cleaning",
    desc: "Thorough, professional cleaning for residential and commercial spaces.",
    startingPrice: "₹2,999",
    gradient: "from-[#008A90] to-[#005F63]",
  },
  {
    icon: Kitchen3DIcon,
    title: "Kitchen Deep Cleaning",
    desc: "Degrease, disinfect, and restore shine.",
    startingPrice: "₹1,999",
    gradient: "from-[#F97316] to-[#D97706]",
  },
  {
    icon: Sofa3DIcon,
    title: "Sofa Steam Cleaning",
    desc: "Steam cleaning for sofas that helps lift dirt, odours, and everyday buildup.",
    startingPrice: "₹999",
    gradient: "from-[#6366F1] to-[#4F46E5]",
  },
  {
    icon: Floor3DIcon,
    title: "Floor Cleaning",
    desc: "Mechanical floor cleaning for fresher, brighter high-use spaces.",
    startingPrice: "₹1,299",
    gradient: "from-[#10B981] to-[#059669]",
  },
  {
    icon: FloorPolish3DIcon,
    title: "Floor Polishing",
    desc: "Professional polishing to restore shine and a cleaner finish.",
    startingPrice: "₹1,999",
    gradient: "from-[#06B6D4] to-[#0891B2]",
  },
  {
    icon: Tank3DIcon,
    title: "Water Tank Cleaning",
    desc: "Safe, hygienic tank sanitisation.",
    startingPrice: "₹999",
    gradient: "from-[#3B82F6] to-[#1D4ED8]",
  },
  {
    icon: Carpet3DIcon,
    title: "Carpet Cleaning",
    desc: "Fabric-safe carpet cleaning for dust, stains, and daily use marks.",
    startingPrice: "₹499",
    gradient: "from-[#EC4899] to-[#C026D3]",
  },
  {
    icon: Refrigerator3DIcon,
    title: "Refrigerator Cleaning",
    desc: "Detailed refrigerator cleaning for shelves, trays, seals, and inner surfaces.",
    startingPrice: "₹599",
    gradient: "from-[#8B5CF6] to-[#6D28D9]",
  },
  {
    icon: Window3DIcon,
    title: "Window & Glass Cleaning",
    desc: "Clear glass, frames, and window surfaces for homes and villas.",
    startingPrice: "₹999",
    gradient: "from-[#14B8A6] to-[#0D9488]",
  },
  {
    icon: Office3DIcon,
    title: "Office Deep Cleaning",
    desc: "Spotless workspaces that boost productivity.",
    startingPrice: "₹3,499",
    gradient: "from-[#475569] to-[#1E293B]",
  },
  {
    icon: Mattress3DIcon,
    title: "Mattress Sanitization",
    desc: "Dust mite and allergen removal for healthier sleep surfaces.",
    startingPrice: "₹599",
    gradient: "from-[#F43F5E] to-[#BE123C]",
  },
  {
    icon: Pest3DIcon,
    title: "General Pest Control",
    desc: "Effective solutions to keep your premises free from pests.",
    startingPrice: "₹1,999",
    gradient: "from-[#EF4444] to-[#B91C1C]",
  },
  {
    icon: House3DIcon,
    title: "Villa / Duplex Cleaning",
    desc: "Full-scale cleaning packages for villas, duplex homes, and larger properties.",
    startingPrice: "₹7,999",
    gradient: "from-[#EAB308] to-[#A16207]",
  },
  {
    icon: Office3DIcon,
    title: "Office Chair Cleaning (Per Chair)",
    desc: "Per-chair office seating cleaning for fabric and daily-use buildup.",
    startingPrice: "₹249",
    gradient: "from-[#6B7280] to-[#374151]",
  },
  {
    icon: Scrub3DIcon,
    title: "Floor Scrubbing",
    desc: "Deep floor scrubbing for tougher marks, grime, and dull surfaces.",
    startingPrice: "₹2,499",
    gradient: "from-[#84CC16] to-[#4D7C0F]",
  },
  {
    icon: House3DIcon,
    title: "Move-in / Move-out Cleaning",
    desc: "Detailed cleaning before shifting in or after moving out.",
    startingPrice: "₹4,099",
    gradient: "from-[#A855F7] to-[#7E22CE]",
  },
  {
    icon: Paint3DIcon,
    title: "Painting Services (Only Labour)",
    desc: "Professional labour support for interior and exterior painting work.",
    startingPrice: "₹14,900",
    gradient: "from-[#EC4899] to-[#F43F5E]",
  },
  {
    icon: Solar3DIcon,
    title: "Solar Panel Cleaning",
    desc: "Specialized cleaning to maximize power output and efficiency of your solar system.",
    startingPrice: "₹999",
    gradient: "from-[#F59E0B] to-[#EA580C]",
  },
];

function serviceSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

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
  { title: "Experience", text: "A dependable, knowledgeable cleaning crew assigned just for you.", stat: "15+", unit: "Years" },
  {
    title: "Trained Team",
    text: "Hand-picked staff with background checks and extensive training.",
    stat: "50+",
    unit: "Staff",
  },
  {
    title: "Quality Equipment",
    text: "Industrial-grade machines and microfiber tools that deliver hotel-grade results.",
    stat: "100%",
    unit: "Quality",
  },
  {
    title: "Eco Conscious",
    text: "Non-toxic, biodegradable products safe for kids, pets and the planet.",
    stat: "100%",
    unit: "Eco-safe",
  },
  { title: "Transparent Pricing", text: "Flat, upfront quotes — no surprises, no hidden charges.", stat: "0", unit: "Hidden fees" },
  {
    title: "Always On Time",
    text: "Punctual scheduling with real-time updates from booking to completion.",
    stat: "98%",
    unit: "On time",
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

function useOpenStatus() {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const check = () => {
      const now = new Date();
      const hour = now.getHours();
      setIsOpen(hour >= 7 && hour < 21);
    };
    check();
    const interval = setInterval(check, 60000);
    return () => clearInterval(interval);
  }, []);
  return isOpen;
}

function AnimatedStat({ stat, unit }: { stat: string; unit: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(stat);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          const numMatch = stat.match(/(\d+)/);
          if (numMatch) {
            const target = parseInt(numMatch[1], 10);
            const suffix = stat.replace(numMatch[1], "");
            let current = 0;
            const step = Math.max(1, Math.floor(target / 40));
            const timer = setInterval(() => {
              current = Math.min(current + step, target);
              setDisplay(`${current}${suffix}`);
              if (current >= target) clearInterval(timer);
            }, 30);
          }
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [stat]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-sans text-3xl font-extrabold text-[#008A90] tracking-tight">{display}</div>
      <div className="text-[10px] text-[#5A707A] font-bold uppercase tracking-wider mt-1">{unit}</div>
    </div>
  );
}

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
    <div className="flex flex-col gap-4 bg-white border border-[#008A90]/15 rounded-3xl p-4 shadow-elegant hover:scale-[1.02] transition-transform duration-300 reveal-on-scroll">
      <div
        className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl slider-container select-none cursor-ew-resize border border-[#008A90]/10"
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
          className="absolute top-0 bottom-0 w-0.5 bg-[#E8B953] z-10 pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full slider-handle-gold text-white">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
            </svg>
          </div>
        </div>

        {/* Labels */}
        <span className="absolute bottom-3 left-3 z-10 rounded-lg bg-black/60 backdrop-blur-sm px-2.5 py-1 text-[10px] font-medium text-white uppercase tracking-wider">
          Before
        </span>
        <span className="absolute bottom-3 right-3 z-10 rounded-lg bg-[#008A90] px-2.5 py-1 text-[10px] font-semibold text-white uppercase tracking-wider">
          After
        </span>
      </div>
      <div>
        <h4 className="font-display text-lg font-bold text-[#0D2A3A]">{title}</h4>
        <p className="mt-1.5 text-xs text-[#5A707A] leading-relaxed font-medium">{desc}</p>
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
      className="bg-white border border-[#008A90]/15 rounded-3xl p-6 flex flex-col justify-between cursor-pointer hover:border-[#008A90] hover:shadow-elegant transition-all duration-300 reveal-on-scroll"
      onClick={() => !expanded && setExpanded(true)}
    >
      <div>
        <div className="flex justify-between items-center">
          <h3 className="font-display text-xl font-extrabold text-[#0D2A3A]">{item.size}</h3>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(!expanded);
            }}
            className="text-[#008A90] p-1 hover:bg-[#EAF3F3] rounded-full transition"
            aria-label={expanded ? "Collapse details" : "Expand details"}
          >
            <ChevronDown
              className={`h-5 w-5 transition-transform duration-300 ${expanded ? "rotate-180" : ""
                }`}
            />
          </button>
        </div>

        <div
          className={`transition-all duration-300 overflow-hidden ${expanded ? "max-h-40 opacity-100 mt-4" : "max-h-0 opacity-0"
            }`}
        >
          {item.isSingle ? (
            <div className="py-4 border-b border-[#008A90]/10 flex justify-between items-center">
              <span className="text-xs text-[#5A707A] font-semibold">Flat Rate</span>
              <span className="font-sans font-extrabold text-[#008A90] text-lg">{item.price}</span>
            </div>
          ) : (
            <div className="space-y-4 py-4 border-b border-[#008A90]/10">
              <div className="flex justify-between items-center">
                <span className="text-xs text-[#5A707A] font-semibold">Empty House</span>
                <span className="font-sans font-extrabold text-[#0D2A3A] text-lg">{item.empty}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-[#5A707A] font-semibold">Occupied House</span>
                <span className="font-sans font-extrabold text-[#008A90] text-lg">{item.occupied}</span>
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
            className="w-full rounded-full border border-[#008A90]/30 bg-transparent py-2 text-xs font-bold text-[#008A90] hover:bg-[#EAF3F3] transition"
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
            className="w-full rounded-full bg-[#008A90] py-2 text-xs font-bold text-white hover:shadow-teal-glow transition"
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

    const serviceName = selectedService || "General cleaning";
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
          className="text-xs font-bold uppercase tracking-[0.15em] text-[#5A707A]"
        >
          Service Required
        </label>
        <input
          id="service"
          name="service"
          value={typeof service === "string" ? service : "General Cleaning"}
          readOnly
          className="w-full rounded-xl border border-[#008A90]/25 bg-[#F4F7F6] px-4 py-3 text-sm font-semibold text-[#0D2A3A] outline-none"
        />
      </div>
      {isBhkService && (
        <div className="space-y-1">
          <label
            htmlFor="houseType"
            className="text-xs font-bold uppercase tracking-[0.15em] text-[#5A707A]"
          >
            Occupancy Type
          </label>
          <select
            id="houseType"
            name="houseType"
            value={houseType}
            onChange={(e) => setHouseType(e.target.value as "Empty House" | "Occupied House")}
            className="w-full rounded-xl border border-[#008A90]/25 bg-white px-4 py-3 text-sm font-semibold text-[#0D2A3A] outline-none focus:border-[#008A90] cursor-pointer"
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
        className="w-full rounded-xl border border-[#008A90]/25 bg-white px-4 py-3.5 text-sm font-semibold text-[#0D2A3A] outline-none focus:border-[#008A90] placeholder:text-[#5A707A]/50 transition-all animate-shimmer"
      />
      <input
        name="phone"
        type="tel"
        required
        inputMode="numeric"
        maxLength={10}
        pattern="[0-9]{10}"
        title="Mobile number must contain exactly 10 digits."
        placeholder="10-digit Phone number"
        onInput={(e) => {
          const input = e.currentTarget;
          input.value = normalizePhoneNumber(input.value);
          input.setCustomValidity("");
        }}
        className="w-full rounded-xl border border-[#008A90]/25 bg-white px-4 py-3.5 text-sm font-semibold text-[#0D2A3A] outline-none focus:border-[#008A90] placeholder:text-[#5A707A]/50 transition-all"
      />
      <input
        name="address"
        maxLength={300}
        placeholder="Locality / Address (optional)"
        className="w-full rounded-xl border border-[#008A90]/25 bg-white px-4 py-3.5 text-sm font-semibold text-[#0D2A3A] outline-none focus:border-[#008A90] placeholder:text-[#5A707A]/50 transition-all"
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#008A90] to-[#005F63] px-6 py-3.5 text-sm font-bold text-white hover:shadow-teal-glow transition-all disabled:opacity-50"
      >
        {isSubmitting ? (
          <>
            Requesting slot...
            <Loader2 className="h-4 w-4 animate-spin" />
          </>
        ) : (
          <>
            Get Instant Quote <ArrowRight className="h-4 w-4 animate-luxury-float" />
          </>
        )}
      </button>
    </form>
  );
}

function Hero({
  onBook,
  onSuccess,
}: {
  onBook: (service?: string) => void;
  onSuccess: (saved: boolean, whatsappUrl: string) => void;
}) {
  const [selectedService, setSelectedService] = useState("");
  const [selectedLocality, setSelectedLocality] = useState("");
  const [fullName, setFullName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInstantQuote = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) return;

    const form = e.currentTarget;
    const serviceInput = form.elements.namedItem("heroService") as HTMLSelectElement;
    const nameInput = form.elements.namedItem("heroName") as HTMLInputElement;
    const phoneInput = form.elements.namedItem("heroPhone") as HTMLInputElement;
    const service = selectedService.trim();
    const locality = selectedLocality.trim();
    const name = normalizeName(nameInput.value).trim();
    const phone = normalizePhoneNumber(phoneInput.value);

    serviceInput.setCustomValidity("");
    nameInput.setCustomValidity("");
    phoneInput.setCustomValidity("");
    nameInput.value = name;
    phoneInput.value = phone;

    if (!service) {
      serviceInput.setCustomValidity("Please select a cleaning service.");
      serviceInput.reportValidity();
      return;
    }

    if (!isValidName(name)) {
      nameInput.setCustomValidity("Name must contain only alphabets and spaces.");
      nameInput.reportValidity();
      return;
    }

    if (!isValidPhoneNumber(phone)) {
      phoneInput.setCustomValidity("Mobile number must contain exactly 10 digits.");
      phoneInput.reportValidity();
      return;
    }

    const finalServiceName = `${service}${locality ? ` - ${locality}` : ""}`;
    const message = `Hi MSR Deep Cleaning,\nService: ${finalServiceName}\nName: ${name}\nPhone: ${phone}`;
    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;

    setIsSubmitting(true);
    let savedToSheet = false;

    try {
      const lead = {
        submittedAt: new Date().toISOString(),
        service: finalServiceName,
        name,
        phone,
        address: locality,
        source: "hero-instant-quote",
      };

      savedToSheet = await saveBookingLeadToSheet(lead);
      await submitBookingLeadToGoogleForm(lead);
    } catch (error) {
      console.error("Could not save hero quote lead.", error);
    } finally {
      setIsSubmitting(false);
    }

    form.reset();
    setSelectedService("");
    setSelectedLocality("");
    setFullName("");
    setMobileNumber("");
    onSuccess(savedToSheet, whatsappUrl);
  };

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-[#F4F7F6] px-0 pb-12 pt-24 sm:pt-28 lg:flex lg:items-center"
    >
      <img
        src={IMG.heroPoster}
        alt="Professional home cleaning background"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px]" />
      <div className="absolute inset-0 bg-gradient-mesh opacity-65 pointer-events-none" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-8 px-4 sm:px-6 md:px-8 lg:grid-cols-12 lg:items-center">

        {/* Left Side: Headline & Stats matching Image 1 */}
        <div className="flex flex-col justify-center text-center lg:col-span-7 lg:text-left">

          <div className="mx-auto lg:mx-0 inline-flex flex-wrap items-center gap-2 rounded-full bg-[#EAF3F3] border border-[#008A90]/35 px-4.5 py-2 shadow-soft mb-6 hero-stagger max-w-fit">
            <span className="flex flex-wrap items-center gap-1 text-[10px] sm:text-xs font-extrabold uppercase tracking-[0.12em] text-[#008A90]">
              <Sparkles className="h-4 w-4 animate-spin-slow text-[#E8B953]" />
              #1 Cleaning Service in Hyderabad
            </span>
          </div>

          <h1 className="hero-stagger mb-5 font-display text-[clamp(3.4rem,15vw,4.9rem)] font-black leading-[0.95] tracking-normal text-[#0D2A3A] sm:text-[clamp(4.2rem,10vw,5.2rem)] lg:mb-6">
            Spotless Homes, <br />
            <span className="text-[#008A90] relative inline-block">
              Healthy Living.
              <span className="absolute bottom-1.5 left-0 w-full h-[6px] bg-[#E8B953] -z-10 rounded-full" />
            </span>
          </h1>

          <p className="hero-stagger mx-auto mb-7 max-w-xl text-sm font-semibold leading-7 text-[#5A707A] sm:text-base md:text-[1.05rem] lg:mx-0 lg:mb-8">
            Professional deep cleaning services tailored for Hyderabad's elite homes and offices. Licensed, insured, and 100% satisfaction guaranteed.
          </p>

          {/* Metric Stats matching Image 1 layout */}
          <div className="hero-stagger mx-auto mb-3 grid w-full max-w-xl grid-cols-3 gap-2 border-t border-b border-[#008A90]/15 py-5 sm:gap-4 sm:py-6 lg:mx-0 lg:mb-8">
            <HeroMetric end={5000} suffix="+" label="Homes Cleaned" />
            <HeroMetric end={4.9} decimals={1} suffix="/5" label="User Rating" withStar bordered />
            <HeroMetric end={30} suffix="min" label="Response Time" />
          </div>

        </div>

        {/* Right Side: Floating Instant Quote Card matching Image 1 */}
        <div className="flex items-center justify-center lg:col-span-5">
          <div className="hero-quote-card reveal-on-scroll w-full max-w-[28rem] rounded-3xl bg-white p-5 shadow-elegant sm:p-7">
            <div className="mb-6">
              <h3 className="font-display text-2xl font-black text-[#0D2A3A] sm:text-3xl">Get Instant Quote</h3>
              <p className="text-xs font-extrabold uppercase tracking-widest text-[#008A90] mt-1">
                Packages starting from just ₹799
              </p>
            </div>

            <form onSubmit={handleInstantQuote} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#5A707A]">
                  Select Service
                </label>
                <select
                  name="heroService"
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  required
                  className="w-full rounded-xl border border-[#008A90]/25 bg-white px-4 py-3.5 text-sm font-semibold text-[#0D2A3A] outline-none cursor-pointer focus:border-[#008A90]"
                >
                  <option value="">Choose a service...</option>
                  {servicePackages.map((s) => (
                    <option key={s.title} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#5A707A]">
                  Service Area in Hyderabad
                </label>
                <select
                  name="heroLocality"
                  value={selectedLocality}
                  onChange={(e) => setSelectedLocality(e.target.value)}
                  className="w-full rounded-xl border border-[#008A90]/25 bg-white px-4 py-3.5 text-sm font-semibold text-[#0D2A3A] outline-none cursor-pointer focus:border-[#008A90]"
                >
                  <option value="">Select your locality...</option>
                  {serviceAreas.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#5A707A]">
                  Full Name
                </label>
                <input
                  name="heroName"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(normalizeName(e.target.value))}
                  placeholder="Enter your full name"
                  className="w-full rounded-xl border border-[#008A90]/25 bg-white px-4 py-3.5 text-sm font-semibold text-[#0D2A3A] outline-none focus:border-[#008A90]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#5A707A]">
                  Mobile Number
                </label>
                <input
                  name="heroPhone"
                  required
                  inputMode="numeric"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(normalizePhoneNumber(e.target.value))}
                  placeholder="+91 00000 00000"
                  className="w-full rounded-xl border border-[#008A90]/25 bg-white px-4 py-3.5 text-sm font-semibold text-[#0D2A3A] outline-none focus:border-[#008A90]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#008A90] to-[#005F63] px-6 py-4 text-xs sm:text-sm font-bold text-white shadow-teal-glow hover:scale-[1.02] transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    Processing...
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </>
                ) : (
                  <>
                    Proceed to Book <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
}

function HeroMetric({
  end,
  label,
  suffix = "",
  decimals = 0,
  withStar = false,
  bordered = false,
}: {
  end: number;
  label: string;
  suffix?: string;
  decimals?: number;
  withStar?: boolean;
  bordered?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(0);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || animated.current) return;
        animated.current = true;

        const duration = 1000;
        const start = performance.now();
        const tick = (time: number) => {
          const progress = Math.min((time - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(end * eased);

          if (progress < 1) {
            requestAnimationFrame(tick);
          } else {
            setDisplay(end);
          }
        };

        requestAnimationFrame(tick);
      },
      { threshold: 0.35 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [end]);

  return (
    <div
      ref={ref}
      className={`text-center lg:text-left ${bordered ? "border-l border-r border-[#008A90]/15 px-2" : ""}`}
    >
      <div className="flex items-center justify-center gap-1 text-2xl font-black text-[#0D2A3A] sm:text-3.5xl lg:justify-start">
        {display.toFixed(decimals)}
        {suffix}
        {withStar ? (
          <Star className="h-4 w-4 text-[#E8B953] fill-currentColor rating-star-grow" />
        ) : null}
      </div>
      <div className="mt-1 text-[9px] font-bold uppercase tracking-wider text-[#5A707A] sm:text-[10px]">
        {label}
      </div>
    </div>
  );
}

function TrustTicker() {
  const logos = [
    { label: "Urban Company", color: "text-[#2C2520] font-black" },
    { label: "Google Reviews", color: "text-[#4285F4] font-extrabold" },
    { label: "Trustpilot", color: "text-[#00B67A] font-black" },
    { label: "Justdial", color: "text-[#E86B0F] font-extrabold" },
  ];

  return (
    <section className="bg-white py-8 border-t border-b border-[#008A90]/10 reveal-on-scroll">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#5A707A] text-center mb-6">
          Trusted by Customers On
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-16">
          {logos.map((logo) => (
            <div
              key={logo.label}
              className={`font-display text-xl sm:text-2.5xl italic partner-logo cursor-pointer ${logo.color}`}
            >
              {logo.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services({ onBook }: { onBook: (service?: string) => void }) {
  return (
    <section id="services" className="bg-[#F4F7F6] py-20 md:py-28 relative">
      <div className="absolute inset-0 bg-gradient-mesh opacity-40 pointer-events-none" />
      <div className="mx-auto max-w-7xl px-4 md:px-8 relative">
        <div className="mx-auto max-w-2xl text-center mb-16 reveal-on-scroll">
          <div className="mx-auto inline-flex items-center gap-1.5 rounded-full bg-[#EAF3F3] border border-[#008A90]/35 px-4 py-1.5 mb-4 shadow-soft">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#008A90]">
              Hyderabad's Elite
            </span>
          </div>
          <h2 className="font-display text-4xl text-[#0D2A3A] md:text-5.5xl font-black leading-tight">
            Pristine Spaces. <br />
            Bespoke Care.
          </h2>
          <p className="mt-4 font-medium text-[#5A707A] text-sm md:text-base max-w-lg mx-auto leading-relaxed">
            From luxury high-rises to modern corporate hubs, we redefine cleanliness through precision techniques and an obsessive attention to detail.
          </p>
        </div>

        {/* Dynamic scroll reveal services list */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {servicePackages.map((s) => (
            <Link
              key={s.title}
              to="/service/$serviceId"
              params={{ serviceId: serviceSlug(s.title) }}
              className="group flex flex-col justify-between items-start bg-white border border-[#008A90]/15 rounded-3xl p-7 text-left transition-all duration-300 hover:scale-[1.03] hover:shadow-elegant reveal-on-scroll"
            >
              <div className="w-full">
                <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${s.gradient || "from-[#008A90] to-[#005F63]"} text-white shadow-soft transition-all duration-300 group-hover:scale-110 group-hover:shadow-elegant group-hover:rotate-3`}>
                  <s.icon className="h-6 w-6" strokeWidth={1.6} />
                </div>
                <h3 className="font-display text-xl font-extrabold text-[#0D2A3A] group-hover:text-[#008A90] transition-colors">{s.title}</h3>
                <p className="mt-2 text-xs font-semibold leading-relaxed text-[#5A707A]">
                  {s.desc}
                </p>
              </div>
              <div className="mt-6 w-full flex justify-between items-center gap-3 border-t border-[#008A90]/10 pt-4">
                <span className="text-[9px] font-bold uppercase tracking-wider text-[#5A707A]">Starting from</span>
                <span className="ml-auto text-sm font-black text-[#008A90]">{s.startingPrice}</span>
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#EAF3F3] text-[#008A90] group-hover:bg-[#008A90] group-hover:text-white transition-colors">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Custom cleaning package callout matching Image 3 visual spec */}
        <div className="mt-16 bg-[#0A2A3A] rounded-3xl p-8 sm:p-10 shadow-elegant text-white text-center sm:text-left relative overflow-hidden reveal-on-scroll">
          <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-gradient-to-l from-[#008A90]/25 to-transparent pointer-events-none" />
          <div className="max-w-3xl relative z-10">
            <h3 className="font-display text-2.5xl sm:text-3.5xl font-black text-white italic">
              Need a custom cleaning package?
            </h3>
            <p className="mt-3 text-xs sm:text-sm font-medium text-[#E2EAE9] leading-relaxed">
              We handle specialty properties, construction sites, and event venues. Contact our specialists for a tailor-made quote.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href={`tel:${PHONE}`}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#E8B953] text-[#0D2A3A] px-6 py-3.5 text-xs sm:text-sm font-bold hover:scale-105 shadow-gold-glow transition-all"
              >
                Call Now: {PHONE_DISPLAY}
              </a>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#008A90]/40 bg-white/10 text-white px-6 py-3.5 text-xs sm:text-sm font-bold hover:bg-white/20 transition-all"
              >
                Discuss Requirements
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

function CollagePhilosophy() {
  const features = [
    { title: "Verified Professionals", desc: "Background checks and drug tests are mandatory.", icon: Shield },
    { title: "Premium Chemicals", desc: "Biodegradable solutions that are pet-friendly.", icon: Sparkles },
    { title: "Timed Service", desc: "No delays. We pride ourselves on punctuality.", icon: Clock },
    { title: "Post-Service Check", desc: "Walk-through with our supervisor after every job.", icon: CheckCircle2 },
  ];

  return (
    <section className="bg-white py-20 md:py-28 relative">
      <div className="absolute inset-0 bg-gradient-mesh opacity-30 pointer-events-none" />
      <div className="mx-auto max-w-7xl px-4 md:px-8 grid gap-12 lg:grid-cols-12 lg:items-center relative">

        {/* Left: Collage Grid matching Image 4 specs */}
        <div className="lg:col-span-6 relative reveal-left">
          <div className="collage-grid max-w-[460px] mx-auto">
            <div className="collage-img collage-img-1 aspect-[4/3]">
              <img
                src="https://images.pexels.com/photos/4239091/pexels-photo-4239091.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Cleaning hands"
              />
            </div>
            <div className="collage-img collage-img-2 aspect-square">
              <img
                src="https://images.pexels.com/photos/4239131/pexels-photo-4239131.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Bathroom clean"
              />
            </div>
            <div className="collage-img collage-img-3 aspect-square">
              <img
                src="https://images.pexels.com/photos/4401535/pexels-photo-4401535.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Living room sweep"
              />
            </div>
            <div className="collage-img collage-img-4 aspect-[4/3]">
              <img
                src="https://images.pexels.com/photos/9462314/pexels-photo-9462314.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Kitchen clean"
              />
            </div>

            {/* Center golden badge from visual spec */}
            <div className="collage-center-badge">
              <div className="text-xl sm:text-2xl font-black text-white leading-none">10+</div>
              <div className="text-[7px] font-bold text-white uppercase tracking-widest mt-1">
                Years of Unmatched Trust
              </div>
            </div>
          </div>
        </div>

        {/* Right: Our Philosophy matching Image 5 specs */}
        <div className="lg:col-span-6 reveal-right">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#008A90]">Our Philosophy</p>
          <h2 className="mt-4 font-display text-3.5xl text-[#0D2A3A] md:text-5xl font-black leading-tight">
            The Science of Sanitization, <br />
            <span className="text-gradient-gold italic">The Art of Care.</span>
          </h2>
          <p className="mt-6 text-sm font-medium leading-relaxed text-[#5A707A]">
            We don't just "clean" spaces; we restore them. At MSR Deep Cleaning Services, we combine high-tech equipment with traditional hospitality values to deliver a result that you can see, touch, and smell.
          </p>

          {/* Checklist boxes from visual spec */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-[#F4F7F6] border border-[#008A90]/15 rounded-2xl p-5 hover:border-[#008A90] transition-colors"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EAF3F3] text-[#008A90] mb-3">
                  <f.icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <h4 className="font-display text-sm font-extrabold text-[#0D2A3A]">{f.title}</h4>
                <p className="mt-1.5 text-[10px] text-[#5A707A] font-semibold leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#0A2A3A] text-white px-6 py-3.5 text-xs font-bold hover:bg-[#008A90] shadow-elegant transition-colors"
            >
              Reach Our Support Manager <Clock className="ml-1 h-4 w-4 animate-luxury-float" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

function WhyChoose() {
  return (
    <section className="py-20 md:py-28 relative bg-[#F4F7F6]">
      <div className="absolute inset-0 bg-gradient-mesh opacity-50 pointer-events-none" />
      <div className="mx-auto max-w-7xl px-4 md:px-8 relative">
        <div className="mx-auto max-w-2xl text-center mb-16 reveal-on-scroll">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#008A90]">
            Gold Standards
          </p>
          <h2 className="mt-4 font-display text-4xl text-[#0D2A3A] md:text-5.5xl font-black">
            Excellence in Every Sweep
          </h2>
          <p className="mt-4 font-semibold text-[#5A707A] text-xs sm:text-sm">
            Proven processes, vetted staff, and industrial-grade sanitation equipment.
          </p>
        </div>

        {/* Counter cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {whyPoints.map((p) => (
            <article
              key={p.title}
              className="bg-white border border-[#008A90]/15 rounded-2xl p-6 shadow-soft hover:shadow-elegant transition-all duration-300 reveal-on-scroll"
            >
              <AnimatedStat stat={p.stat} unit={p.unit} />
              <h3 className="font-display text-[10px] text-[#0D2A3A] font-bold text-center mt-3 uppercase tracking-wider">{p.title}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section id="reviews" className="bg-white py-20 md:py-28 relative">
      <div className="absolute inset-0 bg-gradient-mesh opacity-30 pointer-events-none" />
      <div className="mx-auto max-w-7xl px-4 md:px-8 relative">
        <div className="mx-auto max-w-2xl text-center mb-12 reveal-on-scroll">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#008A90]">
            Google Reviews
          </p>
          <h2 className="mt-4 font-display text-4xl text-[#0D2A3A] md:text-5.5xl font-black">
            Loved Across Hyderabad
          </h2>
          <div className="mt-5 flex items-center justify-center gap-2">
            <StarRating rating={OVERALL_RATING} starClassName="h-5 w-5" />
            <span className="text-sm font-semibold text-[#0D2A3A]">{OVERALL_RATING.toFixed(1)}</span>
            <span className="text-xs text-[#5A707A] font-bold">verified client rating</span>
          </div>
          <a
            href={GOOGLE_REVIEW_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#008A90] to-[#005F63] px-6 py-3 text-sm font-bold text-white shadow-teal-glow"
          >
            Write a Google Review <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div className="mt-10">
        <Marquee className="px-0">
          {reviews.map((r, i) => (
            <article
              key={i}
              className="w-[280px] shrink-0 bg-[#F4F7F6] border border-[#008A90]/15 rounded-2xl p-6 md:w-[320px] shadow-soft"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EAF3F3] font-display text-base text-[#008A90] border border-[#008A90]/25 font-bold">
                  {r.name.charAt(0)}
                </div>
                <div>
                  <div className="font-extrabold text-xs text-[#0D2A3A]">{r.name}</div>
                  <StarRating rating={r.rating} starClassName="h-3 w-3" />
                </div>
              </div>
              <p className="mt-4 text-xs font-semibold leading-relaxed text-[#5A707A]">
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
    <section id="contact" className="bg-[#F4F7F6] py-20 md:py-28 relative">
      <div className="absolute inset-0 bg-gradient-mesh opacity-20 pointer-events-none" />
      <div className="mx-auto grid max-w-7xl gap-12 px-4 md:px-8 lg:grid-cols-2 lg:items-center relative">
        <div className="reveal-left">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#008A90]">Contact Us</p>
          <h2 className="mt-4 font-display text-4xl text-[#0D2A3A] md:text-5.5xl font-black">
            Book Priority <br />
            <span className="text-gradient-gold italic">Cleaning Slots</span>
          </h2>
          <p className="mt-4 text-xs sm:text-sm font-semibold text-[#5A707A] leading-relaxed">
            Our priority crew operates 7 days a week across all zones. Send details to lock in booking.
          </p>

          <div className="mt-8 space-y-4">
            <a
              href={`tel:${PHONE}`}
              className="flex items-center gap-4 bg-white border border-[#008A90]/20 rounded-2xl p-4 hover:border-[#008A90] transition-all group shadow-soft"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#EAF3F3] text-[#008A90]">
                <Phone className="h-5 w-5" fill="currentColor" strokeWidth={0} />
              </div>
              <div>
                <div className="text-[9px] font-bold uppercase tracking-wider text-[#5A707A]">Live Helpline</div>
                <div className="mt-0.5 font-display text-lg text-[#0D2A3A] font-extrabold">{PHONE_DISPLAY}</div>
              </div>
            </a>

            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-white border border-[#008A90]/20 rounded-2xl p-4 hover:border-[#008A90] transition-all group shadow-soft"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#25D366]/10 text-[#25D366]">
                <MessageCircle className="h-5 w-5" fill="currentColor" strokeWidth={0} />
              </div>
              <div>
                <div className="text-[9px] font-bold uppercase tracking-wider text-[#5A707A]">WhatsApp Booking</div>
                <div className="mt-0.5 font-display text-lg text-[#0D2A3A] font-extrabold">Message Concierge</div>
              </div>
            </a>
          </div>
        </div>

        <div className="bg-white border border-[#008A90]/20 p-6 sm:p-10 rounded-3xl shadow-elegant reveal-right">
          <h3 className="font-display text-2xl sm:text-3xl font-black text-[#0D2A3A] mb-1">Get Priority Quote</h3>
          <p className="text-xs text-[#5A707A] font-bold mb-6">
            Fill your parameters and lock slots:
          </p>
          <BookingForm onSuccess={onSuccess} service="General Enquiry" />
        </div>
      </div>
    </section>
  );
}

function LocationMap() {
  return (
    <section className="bg-white py-20 md:py-28 relative">
      <div className="mx-auto max-w-7xl px-4 md:px-8 relative">
        <div className="mx-auto max-w-2xl text-center mb-12 reveal-on-scroll">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#008A90]">
            Our Location
          </p>
          <h2 className="mt-4 font-display text-4xl text-[#0D2A3A] font-black">
            Hyderabad Head Office
          </h2>
        </div>
        <div className="overflow-hidden rounded-2xl border-2 border-[#008A90]/15 shadow-elegant reveal-on-scroll">
          <iframe
            title="MSR Deep Cleaning map"
            src={MAP_EMBED_URL}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[300px] w-full md:h-[400px]"
          />
        </div>
      </div>
    </section>
  );
}

function AppDownloadSection() {
  const [downloadState, setDownloadState] = useState<'idle' | 'downloading' | 'completed'>('idle');
  const [progress, setProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  const startDownload = () => {
    if (downloadState !== 'idle') return;
    setDownloadState('downloading');
    setProgress(0);
    
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setDownloadState('completed');
          // Trigger actual download
          const link = document.createElement('a');
          link.href = '/msr-home-cleaning.apk';
          link.setAttribute('download', 'msr-home-cleaning.apk');
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          // Reset button back to idle after some time
          setTimeout(() => {
            setDownloadState('idle');
          }, 3000);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  const steps = [
    {
      title: "1. Download the APK",
      desc: "Tap the download button to get the secure APK installer file on your Android device.",
      icon: Download
    },
    {
      title: "2. Allow Unknown Sources",
      desc: "If prompted by your browser, go to Settings and enable 'Allow from this source' for installation permissions.",
      icon: Shield
    },
    {
      title: "3. Install & Start",
      desc: "Open the downloaded .apk file from your notification panel or 'Downloads' folder, tap 'Install', and enjoy a spotless home!",
      icon: Sparkles
    }
  ];

  return (
    <section id="download-app" className="bg-[#EAF3F3]/50 py-20 md:py-28 relative overflow-hidden">
      <div className="absolute top-0 right-0 -mr-48 -mt-48 w-96 h-96 bg-[#008A90]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-48 -mb-48 w-96 h-96 bg-[#E8B953]/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="mx-auto max-w-7xl px-4 md:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Mockup */}
          <div className="lg:col-span-5 flex justify-center reveal-left">
            {/* Phone Mockup Frame */}
            <div className="relative w-[300px] h-[600px] bg-[#0A2A3A] rounded-[48px] p-3 shadow-2xl border-4 border-[#0D2A3A] flex flex-col">
              {/* Camera Notch */}
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-full z-20 flex items-center justify-between px-4">
                <div className="w-2.5 h-2.5 bg-gray-900 rounded-full border border-gray-800" />
                <div className="w-1.5 h-1.5 bg-blue-900 rounded-full" />
              </div>
              
              {/* Phone Content Screen */}
              <div className="w-full h-full bg-[#F4F7F6] rounded-[38px] overflow-hidden relative flex flex-col border border-black/10 select-none">
                {/* Simulated StatusBar */}
                <div className="h-10 bg-white px-6 pt-5 flex justify-between items-center text-[10px] font-bold text-[#0D2A3A]/70">
                  <span>9:41 AM</span>
                  <div className="flex items-center gap-1">
                    <span className="text-[8px]">5G</span>
                    <Smartphone className="h-3 w-3" />
                  </div>
                </div>
                
                {/* Mini Web Header */}
                <div className="bg-white border-b border-gray-200 px-4 py-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <img src={logoImage} alt="logo" className="h-6 w-auto object-contain" />
                    <span className="font-display font-black text-xs text-[#0D2A3A]">
                      <span className="text-[#008A90]">MSR</span> Cleaning
                    </span>
                  </div>
                  <div className="h-1.5 w-1.5 rounded-full bg-[#008A90] animate-pulse" />
                </div>
                
                {/* Mini App Content */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {/* Hero banner */}
                  <div className="bg-gradient-to-br from-[#008A90] to-[#005F63] rounded-2xl p-4 text-white space-y-1 shadow-md">
                    <span className="text-[7px] uppercase tracking-widest font-extrabold text-[#E8B953]">Elite Cleaning Crew</span>
                    <h3 className="font-display font-extrabold text-sm leading-tight">Spotless Home in Hyderabad</h3>
                    <div className="flex items-center gap-1">
                      <Star className="h-2.5 w-2.5 text-[#E8B953] fill-current" />
                      <span className="text-[8px] font-bold text-white/90">4.9/5 Rated Specialists</span>
                    </div>
                  </div>
                  
                  {/* Services list */}
                  <div className="space-y-1.5">
                    <h4 className="text-[9px] uppercase tracking-wider font-extrabold text-gray-500">Popular Services</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-white border border-[#008A90]/15 rounded-xl p-2 flex flex-col items-center justify-center text-center shadow-sm">
                        <Home className="h-4 w-4 text-[#008A90] mb-1" />
                        <span className="text-[8px] font-bold">Deep Cleaning</span>
                      </div>
                      <div className="bg-white border border-[#008A90]/15 rounded-xl p-2 flex flex-col items-center justify-center text-center shadow-sm">
                        <Sofa className="h-4 w-4 text-[#008A90] mb-1" />
                        <span className="text-[8px] font-bold">Sofa & Carpet</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Testimonial preview */}
                  <div className="bg-[#EAF3F3] rounded-xl p-3 border border-[#008A90]/10">
                    <div className="flex items-center gap-1 mb-1">
                      {[...Array(5)].map((_, i) => <Star key={i} className="h-2 w-2 text-[#E8B953] fill-current" />)}
                    </div>
                    <p className="text-[7px] italic text-[#0D2A3A]/80 font-medium">"Extremely thorough service! Highly recommend MSR crew."</p>
                    <span className="text-[6px] font-bold text-[#0D2A3A]/50 mt-1 block">- Satish K., Gachibowli</span>
                  </div>
                </div>
                
                {/* Mini App Bottom Bar */}
                <div className="bg-white border-t border-gray-200 px-4 py-3 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[8px] text-gray-400 font-semibold">Ready to book?</span>
                    <span className="text-[10px] font-bold text-[#0D2A3A]">Best Rates Online</span>
                  </div>
                  <div className="bg-[#008A90] text-white text-[8px] font-extrabold uppercase px-3 py-1.5 rounded-full shadow-sm hover:scale-105 transition-all">
                    Book Now
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column: Copy & Actions */}
          <div className="lg:col-span-7 space-y-8 reveal-right">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#008A90]">Mobile App</span>
              <h2 className="mt-3 font-display text-4xl text-[#0D2A3A] md:text-5.5xl font-black leading-tight">
                MSR App is Just <br className="hidden md:inline" />
                <span className="text-[#008A90]">a Tap Away</span>
              </h2>
              <p className="mt-4 text-[#5A707A] font-semibold text-sm max-w-xl leading-relaxed">
                Experience seamless home cleaning bookings, real-time tracking, and direct developer updates. Download our secure Android installer (.apk) to get started immediately.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              {/* Download Button */}
              <div className="w-full sm:w-auto">
                <button
                  onClick={startDownload}
                  disabled={downloadState === 'downloading'}
                  className={`w-full sm:w-auto min-w-[220px] flex items-center justify-center gap-3 px-8 py-4 rounded-full text-white font-bold text-sm tracking-wider shadow-lg transition-all duration-300 ${
                    downloadState === 'downloading'
                      ? "bg-teal-600 cursor-not-allowed"
                      : downloadState === 'completed'
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-gradient-to-r from-[#008A90] to-[#005F63] hover:shadow-teal-glow hover:scale-105 cursor-pointer"
                  }`}
                >
                  {downloadState === 'idle' && (
                    <>
                      <AndroidIcon className="h-5 w-5 animate-bounce" />
                      <span>DOWNLOAD APK FILE</span>
                    </>
                  )}
                  {downloadState === 'downloading' && (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>DOWNLOADING {progress}%</span>
                    </>
                  )}
                  {downloadState === 'completed' && (
                    <>
                      <CheckCircle2 className="h-5 w-5" />
                      <span>DOWNLOAD STARTED!</span>
                    </>
                  )}
                </button>
                <div className="mt-2 text-center sm:text-left text-[11px] font-bold text-[#5A707A] flex items-center justify-center sm:justify-start gap-1">
                  <Info className="h-3 w-3 text-[#008A90]" />
                  <span>File size: ~2.4 MB · Secure & Verified</span>
                </div>
              </div>

            </div>
            
            {/* Steps Accordion */}
            <div className="border border-[#008A90]/15 rounded-2xl bg-white p-5 md:p-6 shadow-elegant space-y-4">
              <h4 className="text-xs uppercase tracking-wider font-extrabold text-[#0D2A3A] flex items-center gap-2">
                <Smartphone className="h-4 w-4 text-[#008A90]" />
                Easy Installation Steps
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
                {steps.map((step, idx) => {
                  const Icon = step.icon;
                  return (
                    <div
                      key={idx}
                      onClick={() => setActiveStep(idx)}
                      className={`cursor-pointer rounded-xl p-4 transition-all duration-300 border ${
                        activeStep === idx
                          ? "bg-[#EAF3F3]/60 border-[#008A90] shadow-sm"
                          : "bg-[#F4F7F6]/50 border-transparent hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`p-1.5 rounded-lg ${activeStep === idx ? "bg-[#008A90] text-white" : "bg-gray-200 text-[#0D2A3A]"}`}>
                          <Icon className="h-3.5 w-3.5" />
                        </div>
                        <span className="font-bold text-xs text-[#0D2A3A]">{step.title}</span>
                      </div>
                      <p className="text-[11px] font-semibold text-[#5A707A] mt-2 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}

function PWAInstallSection() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    const isStandalone = window.matchMedia('(display-mode: standalone)').matches 
      || (window.navigator as any).standalone;
      
    if (isStandalone) {
      setIsInstallable(false);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      alert("To install, please use Safari's 'Add to Home Screen' (on iOS) or your browser's install menu.");
      return;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setIsInstallable(false);
    }
  };

  const steps = [
    {
      title: "1. Click Install",
      desc: "Click the Install App button above or open your browser menu.",
      icon: Download
    },
    {
      title: "2. Confirm Prompt",
      desc: "Confirm to add MSR Deep Cleaning to your device home screen.",
      icon: Shield
    },
    {
      title: "3. One-Tap Access",
      desc: "Launch directly from your home screen for quick cleaning bookings.",
      icon: Sparkles
    }
  ];

  return (
    <section id="install-app" className="bg-[#EAF3F3]/50 py-20 md:py-28 relative overflow-hidden">
      <div className="absolute top-0 right-0 -mr-48 -mt-48 w-96 h-96 bg-[#008A90]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-48 -mb-48 w-96 h-96 bg-[#E8B953]/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="mx-auto max-w-7xl px-4 md:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Mockup */}
          <div className="lg:col-span-5 flex justify-center reveal-left">
            <div className="relative w-[300px] h-[600px] bg-[#0A2A3A] rounded-[48px] p-3 shadow-2xl border-4 border-[#0D2A3A] flex flex-col">
              {/* Camera Notch */}
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-full z-20 flex items-center justify-between px-4">
                <div className="w-2.5 h-2.5 bg-gray-900 rounded-full border border-gray-800" />
                <div className="w-1.5 h-1.5 bg-blue-900 rounded-full" />
              </div>
              
              {/* Phone Content Screen */}
              <div className="w-full h-full bg-[#F4F7F6] rounded-[38px] overflow-hidden relative flex flex-col border border-black/10 select-none">
                <div className="h-10 bg-white px-6 pt-5 flex justify-between items-center text-[10px] font-bold text-[#0D2A3A]/70">
                  <span>9:41 AM</span>
                  <div className="flex items-center gap-1">
                    <span className="text-[8px]">PWA</span>
                    <Smartphone className="h-3 w-3" />
                  </div>
                </div>
                
                <div className="bg-white border-b border-gray-200 px-4 py-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <img src={logoImage} alt="logo" className="h-6 w-auto object-contain" />
                    <span className="font-display font-black text-xs text-[#0D2A3A]">
                      <span className="text-[#008A90]">MSR</span> Cleaning
                    </span>
                  </div>
                  <div className="h-1.5 w-1.5 rounded-full bg-[#008A90] animate-pulse" />
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  <div className="bg-gradient-to-br from-[#008A90] to-[#005F63] rounded-2xl p-4 text-white space-y-1 shadow-md">
                    <span className="text-[7px] uppercase tracking-widest font-extrabold text-[#E8B953]">Elite Cleaning Crew</span>
                    <h3 className="font-display font-extrabold text-sm leading-tight">Spotless Home in Hyderabad</h3>
                    <div className="flex items-center gap-1">
                      <Star className="h-2.5 w-2.5 text-[#E8B953] fill-current" />
                      <span className="text-[8px] font-bold text-white/90">4.9/5 Rated Specialists</span>
                    </div>
                  </div>
                  
                  <div className="space-y-1.5">
                    <h4 className="text-[9px] uppercase tracking-wider font-extrabold text-gray-500">Popular Services</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-white border border-[#008A90]/15 rounded-xl p-2 flex flex-col items-center justify-center text-center shadow-sm">
                        <Home className="h-4 w-4 text-[#008A90] mb-1" />
                        <span className="text-[8px] font-bold">Deep Cleaning</span>
                      </div>
                      <div className="bg-white border border-[#008A90]/15 rounded-xl p-2 flex flex-col items-center justify-center text-center shadow-sm">
                        <Sofa className="h-4 w-4 text-[#008A90] mb-1" />
                        <span className="text-[8px] font-bold">Sofa & Carpet</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-[#EAF3F3] rounded-xl p-3 border border-[#008A90]/10">
                    <div className="flex items-center gap-1 mb-1">
                      {[...Array(5)].map((_, i) => <Star key={i} className="h-2 w-2 text-[#E8B953] fill-current" />)}
                    </div>
                    <p className="text-[7px] italic text-[#0D2A3A]/80 font-medium">"Extremely thorough service! Highly recommend MSR crew."</p>
                    <span className="text-[6px] font-bold text-[#0D2A3A]/50 mt-1 block">- Satish K., Gachibowli</span>
                  </div>
                </div>
                
                <div className="bg-white border-t border-gray-200 px-4 py-3 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[8px] text-gray-400 font-semibold">Ready to book?</span>
                    <span className="text-[10px] font-bold text-[#0D2A3A]">Best Rates Online</span>
                  </div>
                  <div className="bg-[#008A90] text-white text-[8px] font-extrabold uppercase px-3 py-1.5 rounded-full shadow-sm hover:scale-105 transition-all">
                    Book Now
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column: Copy & Actions */}
          <div className="lg:col-span-7 space-y-8 reveal-right">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#008A90]">App Installation</span>
              <h2 className="mt-3 font-display text-4xl text-[#0D2A3A] md:text-5.5xl font-black leading-tight">
                MSR App is Just <br className="hidden md:inline" />
                <span className="text-[#008A90]">a Tap Away</span>
              </h2>
              <p className="mt-4 text-[#5A707A] font-semibold text-sm max-w-xl leading-relaxed">
                Add our official app directly to your home screen. Enjoy one-tap bookings, exclusive service offers, and live support updates without downloading heavy files.
              </p>
              
              <div className="mt-4 inline-flex items-center gap-2 bg-[#EAF3F3] border border-[#008A90]/25 rounded-full px-4 py-1.5 text-xs font-bold text-[#008A90] shadow-sm">
                <span className="h-2 w-2 rounded-full bg-[#008A90] animate-pulse" />
                "I don't need an APK right now. Can you enable PWA (Install App)"
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              {/* Install Button */}
              <div className="w-full sm:w-auto">
                <button
                  onClick={handleInstallClick}
                  className="w-full sm:w-auto min-w-[220px] flex items-center justify-center gap-3 px-8 py-4 rounded-full text-white font-bold text-sm tracking-wider shadow-lg bg-gradient-to-r from-[#008A90] to-[#005F63] hover:shadow-teal-glow hover:scale-105 cursor-pointer transition-all duration-300"
                >
                  <Smartphone className="h-5 w-5 animate-pulse" />
                  <span>INSTALL APP (PWA)</span>
                </button>
                <div className="mt-2 text-center sm:text-left text-[11px] font-bold text-[#5A707A] flex items-center justify-center sm:justify-start gap-1">
                  <Info className="h-3 w-3 text-[#008A90]" />
                  <span>Install via browser · Instant & Lightweight</span>
                </div>
              </div>
            </div>
            
            {/* Steps Accordion */}
            <div className="border border-[#008A90]/15 rounded-2xl bg-white p-5 md:p-6 shadow-elegant space-y-4">
              <h4 className="text-xs uppercase tracking-wider font-extrabold text-[#0D2A3A] flex items-center gap-2">
                <Smartphone className="h-4 w-4 text-[#008A90]" />
                How to Install PWA
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
                {steps.map((step, idx) => {
                  const Icon = step.icon;
                  return (
                    <div
                      key={idx}
                      onClick={() => setActiveStep(idx)}
                      className={`cursor-pointer rounded-xl p-4 transition-all duration-300 border ${
                        activeStep === idx
                          ? "bg-[#EAF3F3]/60 border-[#008A90] shadow-sm"
                          : "bg-[#F4F7F6]/50 border-transparent hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`p-1.5 rounded-lg ${activeStep === idx ? "bg-[#008A90] text-white" : "bg-gray-200 text-[#0D2A3A]"}`}>
                          <Icon className="h-3.5 w-3.5" />
                        </div>
                        <span className="font-bold text-xs text-[#0D2A3A]">{step.title}</span>
                      </div>
                      <p className="text-[11px] font-semibold text-[#5A707A] mt-2 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const isOpen = useOpenStatus();

  return (
    <footer className="bg-[#0A2A3A] text-white border-t border-[#008A90]/20">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <img
                src={logoImage}
                alt="MSR Deep Cleaning logo"
                className="h-12 w-auto object-contain filter drop-shadow-[0_2px_8px_rgba(255,255,255,0.05)]"
              />
              <div className="leading-tight">
                <div className="font-display text-xl text-white font-black">
                  <span className="text-[#E8B953]">MSR</span> Deep Cleaning
                </div>
                <div className="text-[9px] uppercase tracking-[0.25em] text-white/50 font-bold">
                  Hyderabad
                </div>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm font-medium text-[#E2EAE9]">
              Premium home sanitization and deep cleaning crews servicing Hyderabad's premier locations.
            </p>

            <div className="mt-4">
              <span className={`status-badge ${isOpen ? "status-badge-open" : "status-badge-closed"}`}>
                <span className={`status-dot ${isOpen ? "status-dot-open" : "status-dot-closed"} live-dot-pulse`} />
                {isOpen ? "Currently Open" : "Currently Closed"}
              </span>
            </div>
          </div>

          <div>
            <div className="font-display text-[#E8B953] text-lg font-black">Cleaning Services</div>
            <ul className="mt-4 space-y-2 text-xs font-semibold text-[#E2EAE9]">
              {servicePackages.slice(0, 5).map((s) => (
                <li key={s.title}>
                  <Link to="/services" className="hover:text-[#E8B953] transition-colors">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="font-display text-[#E8B953] text-lg font-black">Quick Contact</div>
            <ul className="mt-4 space-y-3 text-xs font-semibold text-[#E2EAE9]">
              <li className="flex gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-[#E8B953]" />
                <span>{FOOTER_ADDRESS}</span>
              </li>
              <li className="flex gap-2">
                <Phone className="h-4 w-4 shrink-0 text-[#E8B953]" />
                <a href={`tel:${PHONE}`} className="hover:text-[#E8B953] transition-colors">{PHONE_DISPLAY}</a>
              </li>
              <li className="flex gap-2">
                <Mail className="h-4 w-4 shrink-0 text-[#E8B953]" />
                <a href={`mailto:${EMAIL}`} className="hover:text-[#E8B953] transition-colors">{EMAIL}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-white/50">
          © {new Date().getFullYear()} MSR Deep Cleaning · All Rights Reserved
        </div>
      </div>
    </footer>
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
              className={`${starClassName} text-[#E8B953]/20`}
              fill="currentColor"
              strokeWidth={0}
            />
            <div className="absolute inset-0 overflow-hidden" style={{ width: `${fillPercent}%` }}>
              <Star className={`${starClassName} text-[#E8B953]`} fill="currentColor" strokeWidth={0} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 500);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`scroll-top-btn ${visible ? "visible" : ""}`}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
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
    triggerLeadConversion("main-website");
  };

  // Scroll reveal setup utilizing IntersectionObserver
  useEffect(() => {
    const revealElements = document.querySelectorAll(".reveal-on-scroll, .reveal-left, .reveal-right, .reveal-zoom");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" },
    );

    revealElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#F4F7F6] text-[#0D2A3A]">
      <Nav onBook={openBook} />
      <main>
        <Hero onBook={openBook} onSuccess={handleSuccess} />

        {/* Services */}
        <Services onBook={openBook} />

        <div className="section-divider" />

        <TrustTicker />

        <div className="section-divider" />

        {/* Collage & Philosophy sections matching Image 4 & 5 */}
        <CollagePhilosophy />

        <div className="section-divider" />

        {/* Why Choose Us stats */}
        <WhyChoose />

        <div className="section-divider" />

        {/* Gallery */}
        <section id="gallery" className="bg-[#F4F7F6] py-20 md:py-28 relative">
          <div className="mx-auto max-w-7xl px-4 md:px-8 relative">
            <div className="mx-auto max-w-3xl text-center mb-16 reveal-on-scroll">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#008A90]">
                Work Gallery
              </p>
              <h2 className="mt-4 font-display text-4xl text-[#0D2A3A] md:text-5.5xl font-black">
                Elite Crew Portfolio
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryItems.map((item, index) => (
                <div
                  key={index}
                  className="gallery-card group reveal-on-scroll"
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
                    <h4 className="font-display text-white text-lg font-bold">{item.title}</h4>
                    <p className="text-white/80 text-xs font-semibold mt-1">{item.desc}</p>
                    <span className="mt-3 text-[10px] text-[#E8B953] uppercase tracking-wider font-bold">Zoom image</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* Reviews */}
        <Reviews />

        <div className="section-divider" />

        {/* Before & After transformation gallery */}
        <section id="before-after" className="bg-white py-20 md:py-28 relative">
          <div className="absolute inset-0 bg-gradient-mesh opacity-30 pointer-events-none" />
          <div className="mx-auto max-w-7xl px-4 md:px-8 relative">
            <div className="mx-auto max-w-3xl text-center mb-16 reveal-on-scroll">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#008A90]">
                Work Samples
              </p>
              <h2 className="mt-4 font-display text-4xl text-[#0D2A3A] md:text-5.5xl font-black">
                Transformational Results
              </h2>
              <p className="mt-4 font-semibold text-[#5A707A] text-sm">
                Inspect real outcomes with our interactive sliders.
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

        <div className="section-divider" />

        {/* Contact Form */}
        <Contact onBook={openBook} onSuccess={handleSuccess} />

        <div className="section-divider" />

        {/* Maps */}
        <LocationMap />
      </main>
      <Footer />
      <HelpBot onBook={openBook} />
      <FloatingContact />
      <ScrollToTop />

      {/* Booking Dialog */}
      <Dialog open={bookOpen} onOpenChange={setBookOpen}>
        <DialogContent showCloseButton={false} className="border border-[#008A90]/25 bg-[#F4F7F6] p-0 sm:max-w-md rounded-3xl overflow-hidden shadow-elegant">
          <button
            type="button"
            onClick={() => setBookOpen(false)}
            aria-label="Close booking form"
            className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white border border-[#008A90]/20 text-[#0D2A3A] transition-all hover:text-[#008A90]"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="bg-[#EAF3F3] border-b border-[#008A90]/15 px-6 py-5">
            <DialogHeader>
              <DialogTitle className="font-display text-2xl font-black text-[#0D2A3A]">
                Request Cleaning Quote
              </DialogTitle>
              <DialogDescription className="font-semibold text-[#5A707A] text-xs">
                Fill in your details — we will reach out within an hour.
              </DialogDescription>
            </DialogHeader>
          </div>
          <div className="p-6">
            <BookingForm onSuccess={handleSuccess} service={selectedService} />
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={successOpen} onOpenChange={setSuccessOpen}>
        <DialogContent
          showCloseButton={false}
          className="border border-[#008A90]/25 bg-white p-8 text-center sm:max-w-md rounded-3xl shadow-elegant"
        >
          <button
            type="button"
            onClick={() => setSuccessOpen(false)}
            aria-label="Close confirmation"
            className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#F4F7F6] border border-[#008A90]/20 text-[#0D2A3A] transition"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#008A90] text-white shadow-teal-glow animate-scale-pop">
            <CheckCircle2 className="h-9 w-9" strokeWidth={1.5} />
          </div>
          <DialogHeader>
            <DialogTitle className="font-display text-2xl font-black text-[#0D2A3A] mt-4">
              Quote Request Logged
            </DialogTitle>
            <DialogDescription className="font-semibold text-[#5A707A] text-xs mt-2">
              Our support team will get in touch with you shortly.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            {pendingWhatsappUrl ? (
              <a
                href={pendingWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-gradient-to-r from-[#008A90] to-[#005F63] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-teal-glow transition-all"
              >
                Proceed via WhatsApp
              </a>
            ) : null}
            <button
              onClick={() => setSuccessOpen(false)}
              className="rounded-full border border-[#008A90]/20 bg-white px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#0D2A3A] hover:bg-[#F4F7F6]"
            >
              Close
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Lightbox */}
      <Dialog open={lightboxImg !== null} onOpenChange={(open) => !open && setLightboxImg(null)}>
        <DialogContent className="border-0 bg-transparent p-0 max-w-4xl shadow-none">
          {lightboxImg && (
            <div className="relative flex items-center justify-center p-4">
              <button
                type="button"
                onClick={() => setLightboxImg(null)}
                aria-label="Close image view"
                className="absolute -top-12 right-4 z-50 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#0D2A3A] border border-[#008A90]/20 transition-all"
              >
                <X className="h-5 w-5" />
              </button>
              <img src={lightboxImg} alt="Gallery zoom" className="max-h-[80vh] w-auto max-w-full rounded-2xl object-contain shadow-elegant border-2 border-[#008A90]" />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
