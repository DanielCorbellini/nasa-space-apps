"use client";

import { useState } from "react";

export default function Rightbar() {
  const [irrigation, setIrrigation] = useState(22);
  const [fertilizer, setFertilizer] = useState(40);

  return (
    <aside className="fixed right-4 m-6 top-1/4 w-72 bg-[#111827]/80 backdrop-blur-sm text-white p-4 rounded-lg border border-[#F5B465] shadow-lg z-50">
      <h2 className="text-lg font-semibold text-[#F5B465] mb-3">Controles</h2>

      <div className="mb-4">
        <label className="flex justify-between text-sm mb-1">
          <span>Irrigação</span>
          <span className="font-mono">{irrigation}°C</span>
        </label>
        <input
          type="range"
          min={-10}
          max={50}
          value={irrigation}
          onChange={(e) => setIrrigation(Number(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="mb-4">
        <label className="flex justify-between text-sm mb-1">
          <span>Fertilizante</span>
          <span className="font-mono">{fertilizer}%</span>
        </label>
        <input
          type="range"
          min={0}
          max={100}
          value={fertilizer}
          onChange={(e) => setFertilizer(Number(e.target.value))}
          className="w-full"
        />
      </div>
    </aside>
  );
}
