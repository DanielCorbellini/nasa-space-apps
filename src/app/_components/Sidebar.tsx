"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Sidebar = () => {
  const [nasaData, setNasaData] = useState(null);

  async function fetchNASAPowerData(lat, lon) {
    const baseUrl =
      "https://power.larc.nasa.gov/api/temporal/climatology/point";
    const params = ["T2M", "PRECTOTCORR", "GWETROOT"];
    const url = `${baseUrl}?parameters=${params.join(
      ","
    )}&community=AG&longitude=${lon}&latitude=${lat}&format=JSON`;

    const res = await fetch(url);
    const data = await res.json();
    return data.properties?.parameter || null;
  }

  useEffect(() => {
    fetchNASAPowerData(-29.7, -53.8).then(setNasaData);
  }, []);

  if (!nasaData) return <p>Carregando dados...</p>;

  // Transformar para array de objetos
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

  const chartData = meses.map((mes) => ({
    mes,
    Temperatura: nasaData.T2M[mes],
    Precipitacao: nasaData.PRECTOTCORR[mes],
    Solo: nasaData.GWETROOT[mes],
  }));

  return (
    <aside className="h-[90vh] w-120 bg-[#F5B465] border-4 border-[#843505] text-[#843505] flex flex-col items-center p-4 rounded-2xl shadow-lg m-6 overflow-auto">

      <h2 className="text-2xl font-bold mb-6 text-center">Dados da Região</h2>

      <div style={{ width: "90%", height: 200, marginBottom: 40, marginRight: 30 }}>
        <h3 className="text-center mb-2">Temperatura (°C)</h3>
       <ResponsiveContainer>
        <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="mes" stroke="#843505" />
            <YAxis stroke="#843505" />
            <Tooltip 
            contentStyle={{ backgroundColor: '#843505', borderColor: '#843505', color: '#fff' }}
            labelStyle={{ color: '#F5B465' }}
            itemStyle={{ color: '#F5B465' }}
            />
            <Legend />
            <Line type="monotone" dataKey="Temperatura" stroke="#f87171" />
        </LineChart>
        </ResponsiveContainer>
      </div>

      <div style={{ width: "90%", height: 200, marginBottom: 40, marginRight: 30  }}>
        <h3 className="text-center mb-2">Precipitação (mm)</h3>
        <ResponsiveContainer>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="mes" stroke="#843505" />
            <YAxis stroke="#843505" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Precipitacao" stroke="#3b82f6" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div style={{ width: "90%", height: 200, marginRight: 30  }}>
        <h3 className="text-center mb-2">Umidade do solo</h3>
        <ResponsiveContainer>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="mes" stroke="#843505" />
            <YAxis stroke="#843505" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Solo" stroke="#34d399" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </aside>
  );
};

export default Sidebar;
