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
    <aside className="h-[90vh] w-120 bg-[#111827]/80 border-4 backdrop-blur-sm border-[#F5B465] text-[#F5B465] flex flex-col items-center p-4 rounded-2xl shadow-lg m-6 overflow-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Local Data</h2>
      <div
        style={{ width: "90%", height: 200, marginBottom: 40, marginRight: 5 }}
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
                marginRight: 5,
              }}
            >
              <h3 className="text-center mb-2">Temperature (°C)</h3>
              <ResponsiveContainer>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="mes" stroke="#F5B465" />
                  <YAxis stroke="#F5B465" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#F5B465",
                      borderColor: "#F5B465",
                      color: "#fff",
                    }}
                    labelStyle={{ color: "#111827" }}
                    itemStyle={{ color: "#111827" }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="temperature"
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
                marginRight: 5,
              }}
            >
              <h3 className="text-center mb-2">Precipitation (mm)</h3>
              <ResponsiveContainer>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="mes" stroke="#F5B465" />
                  <YAxis stroke="#F5B465" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#F5B465",
                      borderColor: "#F5B465",
                      color: "#fff",
                    }}
                    labelStyle={{ color: "#111827" }}
                    itemStyle={{ color: "#111827" }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="precipitation"
                    stroke="#3b82f6"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div style={{ width: "90%", height: 200, marginRight: 5 }}>
              <h3 className="text-center mb-2">Soil Moisture</h3>
              <ResponsiveContainer>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="mes" stroke="#F5B465" />
                  <YAxis stroke="#F5B465" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#F5B465",
                      borderColor: "#F5B465",
                      color: "#fff",
                    }}
                    labelStyle={{ color: "#111827" }}
                    itemStyle={{ color: "#111827" }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="soil" stroke="#34d399" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}
