import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import BackButton from "@/components/BackButton";
import Nav from "@/components/Nav";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — MSR Home Cleaning" },
      {
        name: "description",
        content:
          "MSR Home Cleaning: trusted local cleaning experts in Hyderabad with 15+ years of experience. Background-checked teams, eco-friendly products.",
      },
      { property: "og:title", content: "About — MSR Home Cleaning" },
      { property: "og:description", content: "Trusted local cleaning experts in Hyderabad with 15+ years of experience." },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-background text-foreground pt-16">
        <BackButton />
      <section className="bg-background py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 md:px-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-[11px] font-normal uppercase tracking-[0.3em] text-gold">Who We Are</p>
            <h1 className="mt-4 font-display text-3xl text-foreground md:text-5xl">Honest cleaning, delivered with care</h1>
            <p className="mt-6 font-light leading-relaxed text-muted-foreground">
              <span className="font-normal text-foreground">MSR Home Cleaning</span> is one of the most reputable cleaning services in Hyderabad. From end-to-end home sweeps to specialised, area-focused jobs, our trained crew takes housekeeping to a whole new level — with hotel-grade equipment and eco-friendly products that are safe for your family.
            </p>
            <blockquote className="mt-6 border-l-2 border-gold bg-secondary p-5 text-sm font-light italic text-foreground">
              We are market leaders with more than 15 years of experience. Our team is well-trained, reliable, trustworthy and deeply skilled.
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
          <div className="order-2 relative lg:order-1">
            <img
              src="https://images.pexels.com/photos/4239091/pexels-photo-4239091.jpeg?auto=compress&cs=tinysrgb&w=1400"
              alt="MSR cleaning professionals at work"
              loading="lazy"
              className="aspect-[4/5] w-full object-cover"
            />
            <div className="absolute -bottom-6 -right-6 hidden bg-gold p-6 md:block">
              <div className="font-display text-4xl text-navy">15+</div>
              <div className="text-[11px] font-normal uppercase tracking-wider text-navy">Years of trust</div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-2xl text-foreground">Our Story & Values</h2>
            <p className="mt-3 text-sm font-light text-muted-foreground">
              We started as a small, family-run team and have grown into a trusted local service by
              focusing on training, honesty and consistent results. We prioritise safety, clear
              pricing and respectful service in every home.
            </p>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-6">
              <div className="font-display text-lg text-foreground">Trained Team</div>
              <p className="mt-3 text-sm font-light text-muted-foreground">All technicians complete a structured training program and background checks before joining the field team.</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <div className="font-display text-lg text-foreground">Eco & Safety</div>
              <p className="mt-3 text-sm font-light text-muted-foreground">We prefer plant-based cleaners and use PPE when required. Special care is taken around infants and pets.</p>
            </div>
          </div>

          <div className="mt-12">
            <h3 className="font-display text-xl text-foreground">Meet the team</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {[{"name":"Founder","role":"Operations & Quality"},{"name":"Lead Technician","role":"Training & Field Operations"},{"name":"Customer Success","role":"Bookings & Support"}].map((p) => (
                <div key={p.name} className="flex flex-col items-center gap-3 rounded-lg border border-border bg-card p-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-navy font-display text-lg text-gold">{p.name.charAt(0)}</div>
                  <div className="font-normal text-foreground">{p.name}</div>
                  <div className="text-sm font-light text-muted-foreground">{p.role}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-6">
              <div className="font-display text-lg text-foreground">Satisfaction Guarantee</div>
              <p className="mt-3 text-sm font-light text-muted-foreground">If any area is missed, we will re-clean it at no extra cost. Customer happiness is our top priority.</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <div className="font-display text-lg text-foreground">Coverage</div>
              <p className="mt-3 text-sm font-light text-muted-foreground">We operate across Hyderabad with same-day availability in many localities. Contact us to check availability for your area.</p>
            </div>
          </div>

          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "MSR Home Cleaning",
            telephone: "+918919780725",
            address: {
              "@type": "PostalAddress",
              streetAddress: "House no 3-159, Government School Kamla Nagar Colony, Jillelaguda",
              addressLocality: "Hyderabad",
              postalCode: "500097",
              addressCountry: "IN",
            },
          }) }} />
        </div>
      </section>
    </main>
    </>
  );
}

export default AboutPage;
