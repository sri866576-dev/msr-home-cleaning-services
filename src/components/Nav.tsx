import React, { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Menu, X } from "lucide-react";
import logoImage from "../../Blue Cleaning Services Logo_dark-blue.png";

export default function Nav({ onBook }: { onBook?: () => void }) {
  const [open, setOpen] = useState(false);
  const links = [
    { label: "Home", to: "/" },
    { label: "Services", to: "/services" },
    { label: "About", to: "/about" },
    // anchor to the reviews section on the home page
    { label: "Reviews", to: "/#reviews", anchor: true },
    { label: "Contact", to: "/contact" },
  ];

  const handleBook = () => {
    if (onBook) onBook();
  };

  return (
    <header className="fixed top-0 z-40 w-full border-b border-sky-200/70 bg-[#dff4ff]/95 backdrop-blur-md">
      <div className="flex w-full items-center justify-between px-4 py-3 sm:px-5 md:px-8">
        <a href="#home" className="flex items-center gap-3">
          <img
            src={logoImage}
            alt="MSR Home Cleaning logo"
            className="brand-logo-dark-blue h-11 w-11 object-contain sm:h-12 sm:w-12"
          />
          <div className="leading-tight">
            <div className="font-sans text-[0.84rem] font-light uppercase tracking-[0.22em] text-navy sm:text-[0.9rem] md:text-[1.05rem] md:tracking-[0.3em]">
              <span className="text-[#1f4f8f]">MSR</span>
            </div>
            <div className="text-[9px] uppercase tracking-[0.22em] text-navy/65 sm:text-[10px] md:text-xs">
              Hyderabad
            </div>
          </div>
        </a>

        <nav className="hidden items-center gap-7 xl:gap-9 lg:flex">
          {links.map((l) =>
            l.anchor ? (
              <a
                key={l.label}
                href={l.to}
                className="text-sm font-light tracking-wide text-navy/80 hover:text-gold"
              >
                {l.label}
              </a>
            ) : (
              <Link
                key={l.to}
                to={l.to}
                className="text-sm font-light tracking-wide text-navy/80 hover:text-gold"
              >
                {l.label}
              </Link>
            ),
          )}
        </nav>

        {onBook ? (
          <button
            onClick={handleBook}
            className="hidden items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-normal text-navy hover:bg-white lg:inline-flex xl:px-6"
          >
            Book Now <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <Link
            to="/contact"
            className="hidden items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-normal text-navy hover:bg-white lg:inline-flex xl:px-6"
          >
            Book Now <ArrowRight className="h-4 w-4" />
          </Link>
        )}

        <button
          onClick={() => setOpen((s) => !s)}
          className="rounded-md p-2 text-navy lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-sky-200/70 bg-[#dff4ff] lg:hidden">
          <div className="flex flex-col gap-1 px-4 py-4 sm:px-5">
            {links.map((l) =>
              l.anchor ? (
                <a
                  key={l.label}
                  href={l.to}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2.5 text-sm font-light text-navy/80 hover:bg-white/60 hover:text-gold"
                >
                  {l.label}
                </a>
              ) : (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2.5 text-sm font-light text-navy/80 hover:bg-white/60 hover:text-gold"
                >
                  {l.label}
                </Link>
              ),
            )}
            {onBook ? (
              <button
                onClick={() => {
                  setOpen(false);
                  handleBook();
                }}
                className="mt-2 flex items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-normal text-navy"
              >
                Book Now <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-normal text-navy"
              >
                Book Now <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
