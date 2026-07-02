import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [{ title: "Services - MSR Deep Cleaning" }],
    links: [{ rel: "canonical", href: "/#services" }],
  }),
  component: ServicesRedirect,
});

function ServicesRedirect() {
  useEffect(() => {
    window.location.replace("/#services");
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F4F7F6] px-4 text-center text-[#0D2A3A]">
      <div>
        <h1 className="font-display text-4xl font-black">Services</h1>
        <p className="mt-3 text-sm font-semibold text-[#5A707A]">
          Taking you to our services section...
        </p>
        <a
          href="/#services"
          className="mt-6 inline-flex rounded-full bg-[#008A90] px-6 py-3 text-sm font-bold text-white"
        >
          View Services
        </a>
      </div>
    </main>
  );
}

export default ServicesRedirect;
