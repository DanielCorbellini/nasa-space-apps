"use client";

import React from "react";

interface MonthData {
  temperature: number | string;
  precipitation: number | string;
  soil: number;
}

interface TopbarProps {
  currentMonth: string;
  monthData: MonthData;
  loading: boolean;
}

export const SOUTH_BRAZIL_SEASONS = [
  { name: "Summer", months: ["DEC", "JAN", "FEB"] },
  { name: "Autumn", months: ["MAR", "APR", "MAY"] },
  { name: "Winter", months: ["JUN", "JUL", "AUG"] },
  { name: "Spring", months: ["SEP", "OCT", "NOV"] },
];

export const getSeasonByMonth = (month: string) => {
  const season = SOUTH_BRAZIL_SEASONS.find((s) => s.months.includes(month));
  return season ? season.name : "";
};

export default function Topbar({
  monthData,
  currentMonth,
  loading,
}: TopbarProps) {
  const season = getSeasonByMonth(currentMonth);

  const renderContent = () => {
    if (loading || !monthData) return <div className="spinner w-0.5"></div>;

    return (
      <>
        <li>{season}</li>
        <li>{monthData.temperature}°C</li>
        <li>{monthData.precipitation} mm/day</li>
        <li>Soil {monthData.soil * 100} %</li>
      </>
    );
  };

  return (
    <div className="w-[25%] mx-auto py-4 backdrop-blur-sm bg-[#111827]/80 border-4 rounded-xl border-[#F5B465] text-[#F5B465] justify-center items-center shadow-md mt-4">
      <ul className="flex w-full justify-center items-center gap-8">
        {renderContent()}
      </ul>
    </div>
  );
}
