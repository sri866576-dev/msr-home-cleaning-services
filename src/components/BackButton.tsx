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
        className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm bg-white border border-[#008A90]/30 text-[#0D2A3A] hover:text-[#008A90] hover:border-[#008A90] hover:shadow-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-[#008A90] transition-all"
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="font-semibold">Back</span>
      </button>
    </div>
  );
}
