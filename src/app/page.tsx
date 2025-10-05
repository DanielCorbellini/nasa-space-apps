"use client";

import Sidebar from "./_components/Sidebar";
import { useState } from "react";
import Rightbar from "@/app/_components/Rightbar";
import Topbar from "./_components/Topbar";
import StationToggle from "./_components/StationToogle";
import LoadingScreen from "./_components/LoadingScreen";
import ResultsScreen from "./_components/ResultsScreen";

export default function Home() {
  const [season, setSeason] = useState("Primavera");
  const [resultsData, setResultsData] = useState<any[]>([]);
  const [hovered, setHovered] = useState(false);
  const [gameMode, setGameMode] = useState<"main" | "loading" | "results">(
    "main"
  );

  function handleSeasonChange(newSeason: string) {
    setSeason(newSeason);
    setGameMode("loading");

    // simula processamento e popula dados de resultado
    setTimeout(() => {
      const sample = [
        { mes: "Jan", temperatura: 22, precipitacao: 30, solo: 60 },
        { mes: "Fev", temperatura: 24, precipitacao: 25, solo: 62 },
        { mes: "Mar", temperatura: 20, precipitacao: 40, solo: 58 },
        { mes: "Abr", temperatura: 16, precipitacao: 55, solo: 55 },
        { mes: "Mai", temperatura: 14, precipitacao: 70, solo: 52 },
      ];
      setResultsData(sample);
      setGameMode("results");
    }, 1400);
  }

  return (
    <div className="relative h-auto min-h-screen">
      {/* main UI sempre visível */}
      <>
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

        <div className="-mt-32">
          <Sidebar />
        </div>

        <Rightbar />
        <StationToggle onChange={handleSeasonChange} />
      </>

      {gameMode === "loading" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <LoadingScreen />
        </div>
      )}

      {gameMode === "results" && (
        <ResultsScreen
          season={season}
          data={resultsData}
          onClose={() => setGameMode("main")}
        />
      )}
    </div>
  );
}
