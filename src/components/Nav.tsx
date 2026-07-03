import React, { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Menu, X } from "lucide-react";
import logoImage from "../../logoofmsr.png";

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

export default function Nav({ onBook }: { onBook?: () => void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  const links = [
    { label: "Home", to: "/" },
    { label: "Services", to: "/#services", anchor: true },
    { label: "About", to: "/about" },
    { label: "Reviews", to: "/#reviews", anchor: true },
    // { label: "App", to: "#", download: true },
    { label: "Contact", to: "/contact" },
  ];

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleAppClick = async (e: React.MouseEvent) => {
    e.preventDefault();

    const isStandalone = window.matchMedia('(display-mode: standalone)').matches 
      || (window.navigator as any).standalone;

    if (isStandalone) {
      alert("MSR Deep Cleaning App is already installed and running!");
      return;
    }

    if (deferredPrompt) {
      const confirmed = window.confirm("Install MSR Deep Cleaning App?");
      if (confirmed) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === "accepted") {
          setDeferredPrompt(null);
        }
      }
    } else {
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
      if (isIOS) {
        alert(
          "To install the App on iOS (iPhone/iPad):\n\n" +
          "1. Tap the Share button at the bottom of Safari (square with an up arrow).\n" +
          "2. Scroll down and tap 'Add to Home Screen'.\n" +
          "3. Tap 'Add' in the top-right corner."
        );
      } else {
        alert(
          "To install the App:\n\n" +
          "1. Tap your browser's menu button (three dots in the top-right).\n" +
          "2. Select 'Install app' or 'Add to Home Screen'."
        );
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setScrollProgress(Math.min((window.scrollY / docHeight) * 100, 100));
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBook = () => {
    if (onBook) onBook();
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 left-0 right-0 z-40 w-full max-w-full overflow-x-hidden transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-[#008A90]/15 shadow-elegant"
          : "bg-transparent"
      }`}
    >
      <div className="flex w-full max-w-full min-w-0 items-center justify-between gap-2 px-3 py-3 sm:px-6 sm:py-4 md:px-10 overflow-hidden">
        <a href="#home" className="flex min-w-0 flex-1 items-center gap-2 pr-1 group sm:gap-2.5 sm:pr-2">
          <img
            src={logoImage}
            alt="MSR Deep Cleaning Logo"
            className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105 filter drop-shadow-[0_2px_8px_rgba(0,138,144,0.15)] sm:h-12"
          />
          <div className="min-w-0 leading-tight">
            <div className="truncate font-display text-[0.92rem] font-extrabold tracking-tight text-[#0D2A3A] sm:text-[1.2rem] md:text-[1.35rem]">
              <span className="text-[#008A90]">MSR</span>{" "}
              <span className="text-[#0D2A3A]">Deep Cleaning</span>
            </div>
            <div className="truncate text-[8px] uppercase tracking-[0.2em] text-[#E8B953] font-bold sm:text-[10px] md:text-xs">
              Services
            </div>
          </div>
        </a>

        <nav className="hidden items-center gap-7 xl:gap-9 lg:flex">
          {links.map((l) =>
            l.download ? (
              <a
                key={l.label}
                href="#"
                onClick={handleAppClick}
                className="relative text-sm font-semibold tracking-wide text-[#0D2A3A] hover:text-[#008A90] transition-colors after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-[#008A90] after:transition-all after:duration-300 hover:after:w-full"
              >
                <span className="flex items-center gap-1 text-[#008A90] font-bold">
                  <AndroidIcon className="h-4 w-4 text-[#008A90]" />
                  App
                  <span className="bg-[#E8B953] text-[#0D2A3A] text-[9px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider ml-0.5">New</span>
                </span>
              </a>
            ) : l.anchor ? (
              <a
                key={l.label}
                href={l.to}
                className="relative text-sm font-semibold tracking-wide text-[#0D2A3A] hover:text-[#008A90] transition-colors after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-[#008A90] after:transition-all after:duration-300 hover:after:w-full"
              >
                {l.label}
              </a>
            ) : (
              <Link
                key={l.to}
                to={l.to}
                className="relative text-sm font-semibold tracking-wide text-[#0D2A3A] hover:text-[#008A90] transition-colors after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-[#008A90] after:transition-all after:duration-300 hover:after:w-full"
              >
                {l.label}
              </Link>
            ),
          )}
        </nav>

        {onBook ? (
          <button
            onClick={handleBook}
            className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-[#008A90] to-[#005F63] px-5 py-2.5 text-sm font-bold text-white hover:shadow-teal-glow lg:inline-flex xl:px-6 transition-all duration-300 hover:scale-105"
          >
            Book Now <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <Link
            to="/contact"
            className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-[#008A90] to-[#005F63] px-5 py-2.5 text-sm font-bold text-white hover:shadow-teal-glow lg:inline-flex xl:px-6 transition-all duration-300 hover:scale-105"
          >
            Book Now <ArrowRight className="h-4 w-4" />
          </Link>
        )}

        <button
          onClick={() => setOpen((s) => !s)}
          className="ml-1 shrink-0 rounded-lg p-2 text-[#0D2A3A] hover:text-[#008A90] hover:bg-[#EAF3F3] transition-all lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="border-t border-[#008A90]/15 bg-white/95 backdrop-blur-md lg:hidden animate-slide-up shadow-elegant">
          <div className="flex flex-col gap-1 px-4 py-4 sm:px-5">
            {links.map((l) =>
              l.download ? (
                <a
                  key={l.label}
                  href="#"
                  onClick={(e) => {
                    setOpen(false);
                    handleAppClick(e);
                  }}
                  className="rounded-lg px-3 py-2.5 text-sm font-bold text-[#0D2A3A] hover:bg-[#EAF3F3] hover:text-[#008A90] transition-all flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <AndroidIcon className="h-4 w-4 text-[#008A90]" />
                    <span>App</span>
                    <span className="bg-[#E8B953] text-[#0D2A3A] text-[9px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider ml-1">New</span>
                  </span>
                </a>
              ) : l.anchor ? (
                <a
                  key={l.label}
                  href={l.to}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-bold text-[#0D2A3A] hover:bg-[#EAF3F3] hover:text-[#008A90] transition-all"
                >
                  {l.label}
                </a>
              ) : (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-bold text-[#0D2A3A] hover:bg-[#EAF3F3] hover:text-[#008A90] transition-all"
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
                className="mt-2 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#008A90] to-[#005F63] px-5 py-3 text-sm font-bold text-white hover:shadow-teal-glow transition-all"
              >
                Book Now <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#008A90] to-[#005F63] px-5 py-3 text-sm font-bold text-white hover:shadow-teal-glow transition-all"
              >
                Book Now <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Scroll Progress Bar */}
      <div className="nav-progress-bar" style={{ width: `${scrollProgress}%` }} />
    </header>
  );
}
