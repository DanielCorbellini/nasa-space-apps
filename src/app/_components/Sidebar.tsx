"use client";

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
import { useData } from "../context/DataContext";

export default function Sidebar() {
  const { chartData, loading } = useData();

  return (
    <aside className="h-[90vh] w-120 bg-[#F5B465] border-4 border-[#843505] text-[#843505] flex flex-col items-center p-4 rounded-2xl shadow-lg m-6 overflow-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Dados da Região</h2>
      <div
        style={{ width: "90%", height: 200, marginBottom: 40, marginRight: 30 }}
      >
        {loading ? (
          <div className="spinner"></div>
        ) : (
          <>
            <div
              style={{
                width: "90%",
                height: 200,
                marginBottom: 40,
                marginRight: 30,
              }}
            >
              <h3 className="text-center mb-2">Temperatura (°C)</h3>
              <ResponsiveContainer>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="mes" stroke="#843505" />
                  <YAxis stroke="#843505" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#843505",
                      borderColor: "#843505",
                      color: "#fff",
                    }}
                    labelStyle={{ color: "#F5B465" }}
                    itemStyle={{ color: "#F5B465" }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="temperatura"
                    stroke="#f87171"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div
              style={{
                width: "90%",
                height: 200,
                marginBottom: 40,
                marginRight: 30,
              }}
            >
              <h3 className="text-center mb-2">Precipitação (mm)</h3>
              <ResponsiveContainer>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="mes" stroke="#843505" />
                  <YAxis stroke="#843505" />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="precipitacao"
                    stroke="#3b82f6"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div style={{ width: "90%", height: 200, marginRight: 30 }}>
              <h3 className="text-center mb-2">Umidade do solo</h3>
              <ResponsiveContainer>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="mes" stroke="#843505" />
                  <YAxis stroke="#843505" />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="solo" stroke="#34d399" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}
