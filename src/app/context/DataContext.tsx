"use client";
import { createContext, useContext, useEffect, useState } from "react";

interface NasaData {
  T2M: Record<string, number>;
  PRECTOTCORR: Record<string, number>;
  GWETROOT: Record<string, number>;
}

interface DataContextType {
  nasaData: NasaData | null;
  chartData: any[];
  loading: boolean;
  error: string | null;
  fetchData: (lat: number, lon: number) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [nasaData, setNasaData] = useState<NasaData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchNASAPowerData(lat: number, lon: number) {
    const baseUrl =
      "https://power.larc.nasa.gov/api/temporal/climatology/point";
    const params = ["T2M", "PRECTOTCORR", "GWETROOT"];
    const url = `${baseUrl}?parameters=${params.join(
      ","
    )}&community=AG&longitude=${lon}&latitude=${lat}&format=JSON`;

    try {
      setLoading(true);
      setError(null);
      const res = await fetch(url);
      const data = await res.json();

      if (!data.properties?.parameter) {
        throw new Error("Dados inválidos da NASA POWER");
      }

      setNasaData(data.properties.parameter);
    } catch (err: any) {
      setError(err.message || "Erro ao buscar dados da NASA POWER");
      setNasaData(null);
    } finally {
      setLoading(false);
    }
  }

  const meses = [
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

  const chartData = nasaData?.T2M
    ? meses.map((mes) => ({
        mes,
        temperature: nasaData.T2M[mes],
        precipitation: nasaData.PRECTOTCORR[mes],
        soil: nasaData.GWETROOT[mes],
      }))
    : [];

  return (
    <DataContext.Provider
      value={{
        nasaData,
        chartData,
        loading,
        error,
        fetchData: fetchNASAPowerData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

// Hook personalizado
export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData deve ser usado dentro de um DataProvider");
  }
  return context;
}
