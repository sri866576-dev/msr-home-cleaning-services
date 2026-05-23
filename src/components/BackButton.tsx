import React from "react";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  const handleBack = () => {
    if (typeof window === "undefined") return;
    try {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        window.location.href = "/";
      }
    } catch (e) {
      window.location.href = "/";
    }
  };

  return (
    <div className="px-4 py-4 sm:px-6">
      <button
        type="button"
        onClick={handleBack}
        aria-label="Go back"
        className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm bg-white/6 text-black hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="hidden sm:inline">Back</span>
      </button>
    </div>
  );
}
