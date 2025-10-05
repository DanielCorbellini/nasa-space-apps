"use client";

interface RightBarProps {
  rain: number;
  hum: number;
  setHum: (num: number) => void;
  setRain: (num: number) => void;
}

export default function Rightbar({
  rain,
  hum,
  setHum,
  setRain,
}: RightBarProps) {
  return (
    <aside className="fixed right-4 m-6 top-1/4 w-72 bg-[#111827]/80 backdrop-blur-sm text-white p-4 rounded-xl border-4 border-[#F5B465] shadow-lg z-50">
      <h2 className="text-lg font-semibold text-[#F5B465] mb-3">Controls</h2>

      <div>
        <label className="flex justify-between text-sm mb-1">
          <span>Irrigation</span>
          <span className="font-mono">{hum}%</span>
        </label>
        <input
          type="range"
          min={0}
          max={100}
          value={hum}
          onChange={(e) => setHum(Number(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="mb-4">
        <label className="flex justify-between text-sm mb-1">
          <span>Fertilizer</span>
          <span className="font-mono">{rain}%</span>
        </label>
        <input
          type="range"
          min={0}
          max={100}
          value={rain}
          onChange={(e) => setRain(Number(e.target.value))}
          className="w-full"
        />
      </div>
    </aside>
  );
}
