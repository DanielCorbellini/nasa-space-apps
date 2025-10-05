import React from "react";

export default function CropDialog({ onClose, onSelect }) {
  const options = [
    {
      name: "Wheat",
      icon: "/trigo-icon.png",
      src: "/trigo.png",
      hoverSrc: "/trigo-hover.png",
      fertilizer: "High",
      soilMoisture: "75%",
      water: "Moderate",
    },
    {
      name: "Tomato",
      icon: "/tomato-icon.png",
      src: "/tomato.png",
      hoverSrc: "/tomato-hover.png",
      fertilizer: "Moderate",
      soilMoisture: "Medium",
      water: "High",
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#111827]/80 border-4 rounded-xl border-[#F5B465] text-[#F5B465] p-6 w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-center">Select a Crop</h2>
        <ul className="flex gap-3">
          {options.map((opt) => (
            <li key={opt.name} className="w-full text-center">
              <button
                className="flex flex-col items-center gap-2 w-full hover:bg-[#111827c2] rounded-xl text-[#F5B465]p-3 cursor-pointer"
                onClick={() => onSelect(opt)}
              >
                {opt.icon && (
                  <img
                    src={opt.icon}
                    alt={opt.name}
                    className="w-16 h-16 object-contain"
                  />
                )}
                <span className="font-medium">{opt.name}</span>
              </button>
            </li>
          ))}
        </ul>
        <button
          className="mt-4 text-sm text-gray-500 underline block mx-auto"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
