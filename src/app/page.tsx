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
import { calculateCropSuccess } from "./lib/cropScorer";
import MapScreen from "./_components/MapScreen";

export default function Home() {
  const { chartData, loading, fetchData } = useData();
  const [location, setLocation] = useState<[number, number] | null>(null);
  const [locationName, setLocationName] = useState("");
  const [currentMonth, setCurrentMonth] = useState("JAN");
  const monthData = chartData.find((d) => d.mes === currentMonth);
  const [season, setSeason] = useState("Summer");
  const [gameMode, setGameMode] = useState<"main" | "loading" | "results">(
    "main"
  );
  const [rain, setRain] = useState(40);
  const [hum, setHum] = useState(60);
  const [successPercentage, setSuccessPercentage] = useState(0.0);
  const [successFeedback, setSuccessFeedback] = useState<string[]>([]);
  const [successParameters, setSuccessParameters] = useState<
    Record<string, number>
  >({});
  console.log(location);
  const [crop, setCrop] = useState({
    name: "Wheat",
    src: "/trigo.png",
    hoverSrc: "/trigo-hover.png",
    fertilizer: "Medium",
    soilMoisture: "High",
    water: "Moderate",
    temp: "15-25°C",
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
    setSeason(newSeason);

    const currentIndex = months.indexOf(currentMonth);
    const newIndex = (currentIndex + 3) % 12;
    setCurrentMonth(months[newIndex]);

    setGameMode("loading");

    const player = { hum, rain };
    const result = calculateCropSuccess(monthData, player, crop);

    setSuccessPercentage(result.success);
    setSuccessFeedback(result.feedback);
    setSuccessParameters(result.parameters); // <— store parameters

    setTimeout(() => {
      setGameMode("results");
    }, 1400);
  }

  if (!location) {
    return (
      <MapScreen
        onSelectLocation={(lat, lon) => {
          setLocation([lat, lon]);
          fetchData(lat, lon); // 👈 busca os dados assim que o usuário escolhe
        }}
        setLocationName={setLocationName}
      />
    );
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
        lat={location[0]}
      />

      <div className="-mt-32">
        <Sidebar />
      </div>

      <Rightbar rain={rain} hum={hum} setHum={setHum} setRain={setRain} />
      <StationToggle onChange={handleSeasonChange} lat={location[0]} />

      {gameMode === "loading" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <LoadingScreen />
        </div>
      )}

      {gameMode === "results" && successPercentage !== null && (
        <ResultsScreen
          season={season}
          success={successPercentage}
          feedback={successFeedback}
          parameters={successParameters} // <— pass parameters
          onClose={() => setGameMode("main")}
        />
      )}
    </div>
  );
}
