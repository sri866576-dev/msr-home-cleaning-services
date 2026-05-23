import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  SunMedium,
  Home,
  PaintbrushVertical,
  Bug,
  Building2,
  Droplets,
  Bath,
  UtensilsCrossed,
  Sofa,
  Wind,
  BedDouble,
  CheckCircle2,
} from "lucide-react";
import AdSlot from "@/components/AdSlot";
import BackButton from "@/components/BackButton";
import Nav from "@/components/Nav";
import ServiceCard from "@/components/ServiceCard";

// Configure these in your Vite .env as VITE_GOOGLE_FORM_PREFILL_URL and entry keys.
const GOOGLE_FORM_PREFILL = import.meta.env.VITE_GOOGLE_FORM_PREFILL_URL ?? "";
const GOOGLE_FORM_ENTRY_NAME = import.meta.env.VITE_GOOGLE_FORM_ENTRY_NAME ?? "entry.123";
const GOOGLE_FORM_ENTRY_PHONE = import.meta.env.VITE_GOOGLE_FORM_ENTRY_PHONE ?? "entry.456";
const GOOGLE_FORM_ENTRY_SERVICE = import.meta.env.VITE_GOOGLE_FORM_ENTRY_SERVICE ?? "entry.789";

const services = [
  {
    icon: SunMedium,
    title: "Solar Panel Cleaning",
    desc: "Specialized cleaning to maximize power output and efficiency of your solar system.",
  },
  { icon: Home, title: "Deep Home Cleaning", desc: "Thorough, professional cleaning services for residential and commercial spaces." },
  { icon: PaintbrushVertical, title: "Professional Painting Services", desc: "High-quality interior and exterior painting for a fresh look." },
  { icon: Bug, title: "Pest Control Services", desc: "Effective solutions to keep your premises free from pests." },
  { icon: Building2, title: "Office Cleaning", desc: "Spotless workspaces that boost productivity." },
  { icon: Droplets, title: "Water Tank Cleaning", desc: "Safe, hygienic tank sanitisation." },
  { icon: Bath, title: "Washroom Cleaning", desc: "Deep sanitisation for sparkling bathrooms." },
  { icon: UtensilsCrossed, title: "Kitchen Deep Cleaning", desc: "Degrease, disinfect, and restore shine." },
  { icon: Sofa, title: "Sofa & Carpet Care", desc: "Stain removal and fabric care." },
  { icon: Wind, title: "Mattress Cleaning", desc: "Dust mite & allergen removal." },
  { icon: BedDouble, title: "Book by Room", desc: "Pick the rooms — we handle the rest." },
];

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — MSR Home Cleaning" },
      {
        name: "description",
        content:
          "Professional, eco-friendly cleaning services in Hyderabad: home, office, tank cleaning, sofa & carpet care and more.",
      },
      { property: "og:title", content: "Services — MSR Home Cleaning" },
      { property: "og:description", content: "Professional, eco-friendly cleaning services across Hyderabad." },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

// Use the extracted `ServiceCard` component in `/src/components/ServiceCard.tsx`.

function ServicesPage() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "MSR Home Cleaning",
    telephone: "+918919780725",
    address: {
      "@type": "PostalAddress",
      streetAddress: "House no 3-159, Government School Kamla Nagar Colony, Jillelaguda",
      addressLocality: "Hyderabad",
      postalCode: "500097",
      addressCountry: "IN",
    },
    areaServed: "Hyderabad",
  } as const;

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-background text-foreground pt-16">
        <BackButton />
        <section className="bg-secondary py-20">
          <div className="mx-auto max-w-7xl px-4 md:px-8 text-center">
            <p className="text-[11px] font-normal uppercase tracking-[0.3em] text-gold">Our Services</p>
            <h2 className="mt-4 font-display text-3xl text-navy md:text-5xl">Services</h2>
            <p className="mt-4 font-light text-muted-foreground">Select a service to book — we'll open a prefilled Google Form.</p>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((s) => (
                <ServiceCard key={s.title} s={s} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default ServicesPage;
