"use client";

import Rightbar from "@/app/_components/Rightbar";
import { useData } from "@/app/context/DataContext";
import { useState } from "react";
import CropButton from "./_components/CropButton";
import LoadingScreen from "./_components/LoadingScreen";
import ResultsScreen from "./_components/ResultsScreen";
import Sidebar from "./_components/Sidebar";
import StationToggle from "./_components/StationToggle";
import Topbar from "./_components/Topbar";

export default function Home() {
  const { chartData, loading } = useData();

  const [currentMonth, setCurrentMonth] = useState("JAN");
  const monthData = chartData.find((d) => d.mes === currentMonth);
  const [season, setSeason] = useState("Summer");
  const [resultsData, setResultsData] = useState<any[]>([]);
  const [gameMode, setGameMode] = useState<"main" | "loading" | "results">(
    "main"
  );
  const [rain, setRain] = useState(40);
  const [hum, setHum] = useState(60);

  const [crop, setCrop] = useState({
    name: "Wheat",
    src: "/trigo.png",
    hoverSrc: "/trigo-hover.png",
    fertilizer: "Medium",
    soilMoisture: "High",
    water: "Moderate",
  });

  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  function handleSeasonChange(newSeason: string) {
    // hum, rain, crop, mothData
    setSeason(newSeason);

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
      <img
        src="/bg.gif"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-[-10]"
      />

      <CropButton crop={crop} setCrop={setCrop} />

      <h1 className="text-center text-6xl text-[#111827d6] font-bold pt-4">
        Vale do Taquari
      </h1>

      <Topbar
        monthData={monthData}
        loading={loading}
        currentMonth={currentMonth}
      />

      <div className="-mt-32">
        <Sidebar />
      </div>

      <Rightbar rain={rain} hum={hum} setHum={setHum} setRain={setRain} />
      <StationToggle onChange={handleSeasonChange} />

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

      <div className="absolute bottom-4 left-4 text-white">
        Current crop: <strong>{crop.name}</strong>
      </div>
    </div>
  );
}
