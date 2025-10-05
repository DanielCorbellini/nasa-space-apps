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
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [nasaData, setNasaData] = useState<NasaData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchNASAPowerData(lat: number, lon: number) {
    const baseUrl =
      "https://power.larc.nasa.gov/api/temporal/climatology/point";
    const params = ["T2M", "PRECTOTCORR", "GWETROOT"];
    const url = `${baseUrl}?parameters=${params.join(
      ","
    )}&community=AG&longitude=${lon}&latitude=${lat}&format=JSON`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      if (!data.properties?.parameter) {
        throw new Error("Dados inválidos da NASA POWER");
      }

      return data.properties.parameter;
    } catch (err: any) {
      setError(err.message);
      return null;
    }
  }

  useEffect(() => {
    (async () => {
      const data = await fetchNASAPowerData(-29.7, -53.8);
      if (data) setNasaData(data);
      setLoading(false);
    })();
  }, []);

  // Transforma os dados em formato de gráfico
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
        temperatura: nasaData.T2M[mes],
        precipitacao: nasaData.PRECTOTCORR[mes],
        solo: nasaData.GWETROOT[mes],
      }))
    : [];

  return (
    <DataContext.Provider value={{ nasaData, chartData, loading, error }}>
      {children}
    </DataContext.Provider>
  );
}

// Hook de acesso
export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData deve ser usado dentro de um DataProvider");
  }
  return context;
}
