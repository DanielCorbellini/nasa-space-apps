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

export const SOUTH_HEMISPHERE_SEASONS = [
  { name: "Summer", months: ["DEC", "JAN", "FEB"] },
  { name: "Fall", months: ["MAR", "APR", "MAY"] },
  { name: "Winter", months: ["JUN", "JUL", "AUG"] },
  { name: "Spring", months: ["SEP", "OCT", "NOV"] },
];

export const NORTH_HEMISPHERE_SEASONS = [
  { name: "Winter", months: ["DEC", "JAN", "FEB"] },
  { name: "Spring", months: ["MAR", "APR", "MAY"] },
  { name: "Summer", months: ["JUN", "JUL", "AUG"] },
  { name: "Fall", months: ["SEP", "OCT", "NOV"] },
];

export const getSeasonByMonth = (month: string, lat: number) => {
  const seasonMonths =
    lat >= 0 ? NORTH_HEMISPHERE_SEASONS : SOUTH_HEMISPHERE_SEASONS;
  const season = seasonMonths.find((s) => s.months.includes(month));
  return season ? season.name : "";
};

export default function Topbar({
  monthData,
  currentMonth,
  loading,
  lat,
}: TopbarProps) {
  const season = getSeasonByMonth(currentMonth, lat);

  const renderContent = () => {
    if (loading || !monthData) return <div className="spinner w-0.5"></div>;

    return (
      <>
        <li>{season}</li>
        <li>{monthData.temperature}°C</li>
        <li>{monthData.precipitation} mm/day</li>
        <li>Soil {Math.round(monthData.soil * 100)} %</li>
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
