import React, { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import BackButton from "@/components/BackButton";
import Nav from "@/components/Nav";
import { Footer } from "./index";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — MSR Deep Cleaning" },
      {
        name: "description",
        content:
          "MSR Deep Cleaning: trusted local cleaning experts in Hyderabad with 15+ years of experience. Background-checked teams, eco-friendly products.",
      },
      { property: "og:title", content: "Our Story — MSR Deep Cleaning" },
      { property: "og:description", content: "Trusted local cleaning experts in Hyderabad with 15+ years of experience." },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
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

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-[#F4F7F6] text-[#0D2A3A] pt-24 pb-16">
        <BackButton />
        
        <section className="py-12 relative">
          <div className="absolute inset-0 bg-gradient-mesh opacity-30 pointer-events-none" />
          <div className="mx-auto grid max-w-7xl gap-12 px-4 md:px-8 lg:grid-cols-12 lg:items-center relative">
            <div className="lg:col-span-7 reveal-left">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#008A90]">Our Heritage</p>
              <h1 className="mt-4 font-display text-4xl text-[#0D2A3A] md:text-6xl font-black">Honest cleaning, delivered with care</h1>
              <p className="mt-6 font-medium leading-relaxed text-[#5A707A] text-sm md:text-base">
                <span className="font-extrabold text-[#0D2A3A]">MSR Deep Cleaning</span> is one of the most reputable cleaning services in Hyderabad. From end-to-end home sweeps to specialised, area-focused jobs, our trained crew takes housekeeping to a whole new level — with hotel-grade equipment and eco-friendly products that are safe for your family.
              </p>
              <blockquote className="mt-6 border-l-2 border-[#008A90] bg-[#EAF3F3]/50 rounded-r-xl p-5 text-sm font-semibold italic text-[#0D2A3A]/80">
                We are market leaders with more than 15 years of experience. Our team is well-trained, reliable, trustworthy and deeply skilled.
              </blockquote>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  "Background-checked staff",
                  "Eco-friendly products",
                  "Insured & bonded",
                  "Same-day availability",
                ].map((p) => (
                  <div key={p} className="flex items-center gap-2 text-sm font-bold text-[#0D2A3A]">
                    <CheckCircle2 className="h-5 w-5 text-[#008A90]" strokeWidth={1.5} />
                    {p}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:col-span-5 relative reveal-right">
              <div className="arch-frame max-w-[340px] mx-auto overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/4239091/pexels-photo-4239091.jpeg?auto=compress&cs=tinysrgb&w=1400"
                  alt="MSR Deep Cleaning professionals at work"
                  loading="lazy"
                  className="w-full object-cover aspect-[3/4] rounded-t-full"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 hidden bg-white border border-[#008A90]/25 rounded-xl p-6 md:block shadow-elegant">
                <div className="font-sans text-4xl text-[#008A90] font-black">15+</div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#5A707A]">Years of trust</div>
              </div>
            </div>
          </div>
        </section>

        <div className="section-divider" />

        <section className="py-16 relative">
          <div className="absolute inset-0 bg-gradient-mesh opacity-20 pointer-events-none" />
          <div className="mx-auto max-w-7xl px-4 md:px-8 relative">
            <div className="mx-auto max-w-3xl text-center mb-12 reveal-on-scroll">
              <h2 className="font-display text-3xl text-[#0D2A3A] font-black">Our Story & Core Values</h2>
              <p className="mt-4 font-semibold text-sm text-[#5A707A] leading-relaxed">
                We started as a small, family-run team and have grown into a trusted local service by focusing on training, honesty and consistent results. We prioritise safety, clear pricing and respectful service in every home.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="bg-white border border-[#008A90]/15 rounded-3xl p-8 shadow-soft hover:border-[#008A90] transition-all reveal-on-scroll">
                <div className="font-display text-xl font-extrabold text-[#0D2A3A] mb-2">Trained Team</div>
                <p className="text-xs font-semibold text-[#5A707A] leading-relaxed">All technicians complete a structured training program and background checks before joining the field team.</p>
              </div>
              <div className="bg-white border border-[#008A90]/15 rounded-3xl p-8 shadow-soft hover:border-[#008A90] transition-all reveal-on-scroll">
                <div className="font-display text-xl font-extrabold text-[#0D2A3A] mb-2">Eco & Safety</div>
                <p className="text-xs font-semibold text-[#5A707A] leading-relaxed">We prefer plant-based cleaners and use PPE when required. Special care is taken around infants and pets.</p>
              </div>
            </div>

            <div className="mt-16">
              <h3 className="font-display text-2xl text-[#0D2A3A] font-black text-center mb-8 reveal-on-scroll">Meet the team</h3>
              <div className="grid gap-6 sm:grid-cols-3">
                {[
                  { name: "Founder", role: "Operations & Quality" },
                  { name: "Lead Technician", role: "Training & Field Operations" },
                  { name: "Customer Success", role: "Bookings & Support" },
                ].map((p) => (
                  <div key={p.name} className="flex flex-col items-center gap-3 bg-white border border-[#008A90]/15 rounded-3xl p-6 shadow-soft reveal-on-scroll">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#EAF3F3] font-display text-lg text-[#008A90] border border-[#008A90]/25 font-black">
                      {p.name.charAt(0)}
                    </div>
                    <div className="font-extrabold text-sm text-[#0D2A3A]">{p.name}</div>
                    <div className="text-xs text-[#5A707A] font-semibold">{p.role}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default AboutPage;
