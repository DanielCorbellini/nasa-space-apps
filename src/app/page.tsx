'use client'

import Sidebar from "./_components/Sidebar";
import { useState } from "react";
import Rightbar from "@/app/_components/Rightbar";
import Topbar from "./_components/Topbar";

export default function Home() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="relative h-auto min-h-screen">
      <img
        src="/bg.gif"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-[-10]"
      />

      <button
        type="button"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 select-none focus:outline-none"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => console.log("Trigo button clicked")}
      >
        <img
          src={hovered ? "/trigo-hover.png" : "/trigo.png"}
          alt="Trigo"
          width={414}
          height={330}
          className="transition-all duration-300 ease-in-out cursor-pointer"
          draggable="false"
        />
      </button>

      <h1 className="text-center text-6xl text-[#F5B465] font-bold pt-4">
        Vale do Taquari
      </h1>

      <Topbar />

      {/* Sidebar movida para cima com margem negativa */}
      <div className="-mt-32">
        <Sidebar />
      </div>

      <Rightbar />
    </div>
  );
}
