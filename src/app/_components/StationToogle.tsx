"use client";
import { useState } from "react";

const SEASONS = ["Summer", "Outono", "Inverno", "Spring"];

export default function StationToggle({
  onChange,
}: {
  onChange?: (s: string) => void;
}) {
  const [idx, setIdx] = useState(0);

  function next() {
    const ni = (idx + 1) % SEASONS.length;
    setIdx(ni);
    onChange?.(SEASONS[ni]);
  }

  return (
    <div className="fixed right-4 bottom-4 z-50">
      <button
        onClick={next}
        aria-label="Mudar a estação"
        className="flex cursor-pointer items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-[#F5B465] to-[#843505] text-black font-semibold shadow-lg hover:scale-105 active:scale-95 transition-transform focus:outline-none focus:ring-4 focus:ring-[#F5B465]/30"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8" />
        </svg>
        <span className="select-none">{SEASONS[idx]}</span>
      </button>
    </div>
  );
}
