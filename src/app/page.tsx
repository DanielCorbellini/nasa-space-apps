"use client";

import Sidebar from "./_components/Sidebar";
import { useState } from "react";
import Rightbar from "@/app/_components/Rightbar";
import Topbar from "./_components/Topbar";
import StationToggle from "./_components/StationToogle";
import LoadingScreen from "./_components/LoadingScreen";
import ResultsScreen from "./_components/ResultsScreen";
import CropButton from "./_components/CropButton";

export default function Home() {
  const [currentMonth, setCurrentMonth] = useState("JAN");
  const [crop, setCrop] = useState({
    name: "Wheat",
    src: "/trigo.png",
    hoverSrc: "/trigo-hover.png",
    fertilizer: "Medium",
    soilMoisture: "High",
    water: "Moderate",
  });
  const [season, setSeason] = useState("Summer");
  const [resultsData, setResultsData] = useState<any[]>([]);
  const [hovered, setHovered] = useState(false);
  const [gameMode, setGameMode] = useState<"main" | "loading" | "results">(
    "main"
  );

  const months = [
    "JAN", "FEB", "MAR", "APR",
    "MAY", "JUN", "JUL", "AUG",
    "SEP", "OCT", "NOV", "DEC"
  ];

  function handleSeasonChange(newSeason: string) {
    setSeason(newSeason);

    // Advance current month by 3
    const currentIndex = months.indexOf(currentMonth);
    const newIndex = (currentIndex + 3) % 12;
    setCurrentMonth(months[newIndex]);

    setGameMode("loading");

    setTimeout(() => {
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

        <CropButton />

        <h1 className="text-center text-6xl text-[#111827d6] font-bold pt-4">
          Vale do Taquari
        </h1>

        <Topbar currentMonth={currentMonth} />

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
