import React, { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Menu, X } from "lucide-react";
import logoImage from "../../logoofmsr.png";

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
    <header className="fixed top-0 z-40 w-full border-b border-white/10 bg-gold/95 backdrop-blur-md shadow-elegant">
      <div className="flex w-full items-center justify-between gap-3 px-4 py-3.5 sm:px-6 sm:py-4 md:px-10">
        <a href="#home" className="flex min-w-0 flex-1 items-center gap-2.5 pr-2">
          <img
            src={logoImage}
            alt="MSR Deep Cleaning Logo"
            className="h-11 w-auto object-contain"
          />
          <div className="min-w-0 leading-tight">
            <div className="truncate font-sans text-[0.72rem] font-light uppercase tracking-[0.14em] text-white sm:text-[0.95rem] sm:tracking-[0.2em] md:text-[1.08rem] md:tracking-[0.24em]">
              <span className="text-white">MSR Deep Cleaning</span>
            </div>
            <div className="truncate text-[8px] uppercase tracking-[0.16em] text-white/70 sm:text-[10px] sm:tracking-[0.22em] md:text-xs">
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
                className="text-sm font-light tracking-wide text-white/85 hover:text-white transition-colors"
              >
                {l.label}
              </a>
            ) : (
              <Link
                key={l.to}
                to={l.to}
                className="text-sm font-light tracking-wide text-white/85 hover:text-white transition-colors"
              >
                {l.label}
              </Link>
            ),
          )}
        </nav>

        {onBook ? (
          <button
            onClick={handleBook}
            className="hidden items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-gold hover:bg-navy hover:text-white lg:inline-flex xl:px-6 shadow-soft"
          >
            Book Now <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <Link
            to="/contact"
            className="hidden items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-gold hover:bg-navy hover:text-white lg:inline-flex xl:px-6 shadow-soft"
          >
            Book Now <ArrowRight className="h-4 w-4" />
          </Link>
        )}

        <button
          onClick={() => setOpen((s) => !s)}
          className="shrink-0 rounded-md p-2 text-white lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-gold lg:hidden">
          <div className="flex flex-col gap-1 px-4 py-4 sm:px-5">
            {links.map((l) =>
              l.anchor ? (
                <a
                  key={l.label}
                  href={l.to}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2.5 text-sm font-light text-white/85 hover:bg-white/15 hover:text-white transition-colors"
                >
                  {l.label}
                </a>
              ) : (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2.5 text-sm font-light text-white/85 hover:bg-white/15 hover:text-white transition-colors"
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
                className="mt-2 flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-gold hover:bg-navy hover:text-white"
              >
                Book Now <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-gold hover:bg-navy hover:text-white"
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
