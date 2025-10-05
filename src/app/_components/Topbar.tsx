"use client";

import React from "react";
import { useData } from "../context/DataContext";

export default function Topbar() {
  const { chartData, loading } = useData();

  return (
    <div className="w-[25%] mx-auto py-4 bg-[#843505] border-2 rounded border-[#F5B465] text-[#F5B465] justify-center items-center shadow-md mt-4 rounded">
      {/* <ul className="flex w-full justify-center items-center gap-8">
        <li>Mes</li>
        <li>Temp</li>
        <li>Chuva</li>
        <li>Umidade</li>
      </ul> */}

      <ul className="flex w-full justify-center items-center gap-8">
        <li>{chartData[0]?.mes}</li>
        <li>{chartData[0]?.temperatura}</li>
        <li>{chartData[0]?.precipitacao}</li>
        <li>{chartData[0]?.solo}</li>
      </ul>
    </div>
  );
}
