import React from "react";

type MonthData = {
  mes: string;
  temperatura: number;
  precipitacao: number;
  solo: number;
};

export default function ResultsScreen({
  season,
  data,
  onClose,
}: {
  season: string;
  data: MonthData[];
  onClose?: () => void;
}) {
  const avg = (arr: number[]) =>
    arr.length ? Math.round(arr.reduce((a, b) => a + b, 0) / arr.length) : 0;

  const avgTemp = avg(data.map((d) => d.temperatura));
  const avgPrec = avg(data.map((d) => d.precipitacao));
  const avgSoil = avg(data.map((d) => d.solo));

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl bg-white/5 backdrop-blur-md rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-3xl font-bold text-[#F5B465]">
              Resultados — {season}
            </h2>
            <p className="text-sm text-green-200 mt-1">
              Resumo da simulação e métricas principais
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1 rounded bg-white/10 hover:bg-white/20 text-sm cursor-pointer"
            >
              Fechar
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white/3 rounded-lg">
            <div className="text-sm text-gray-300">Temperatura média</div>
            <div className="text-2xl font-semibold text-[#F5B465]">
              {avgTemp}°C
            </div>
          </div>
          <div className="p-4 bg-white/3 rounded-lg">
            <div className="text-sm text-gray-300">Precipitação média</div>
            <div className="text-2xl font-semibold text-[#F5B465]">
              {avgPrec}%
            </div>
          </div>
          <div className="p-4 bg-white/3 rounded-lg">
            <div className="text-sm text-gray-300">Índice de solo</div>
            <div className="text-2xl font-semibold text-[#F5B465]">
              {avgSoil}
            </div>
          </div>
        </div>

        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <div className="p-4 bg-white/3 rounded-lg">
            <div className="text-sm text-gray-300 mb-3">
              Gráfico mensal — Temperatura
            </div>
            <div className="w-full h-40 flex items-end gap-2">
              {/* mini-bar chart usando SVG */}
              {data.map((d, i) => {
                const h = Math.max(4, ((d.temperatura + 10) / 60) * 100); // escala simples
                return (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <div
                      className="w-6 bg-gradient-to-t from-[#F5B465] to-[#843505] rounded"
                      style={{ height: `${h}%` }}
                      title={`${d.mes}: ${d.temperatura}°C`}
                    />
                    <div className="text-[10px] text-gray-300">
                      {d.mes.slice(0, 3)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-4 bg-white/3 rounded-lg">
            <div className="text-sm text-gray-300 mb-3">Detalhes mensais</div>
            <div className="max-h-40 overflow-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="text-gray-300">
                    <th className="pb-2 pr-4">Mês</th>
                    <th className="pb-2 pr-4">Temp (°C)</th>
                    <th className="pb-2 pr-4">Chuva (%)</th>
                    <th className="pb-2">Solo</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((d, i) => (
                    <tr key={i} className="odd:bg-white/2">
                      <td className="py-1 pr-4">{d.mes}</td>
                      <td className="py-1 pr-4">{d.temperatura}</td>
                      <td className="py-1 pr-4">{d.precipitacao}</td>
                      <td className="py-1">{d.solo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-white/10 hover:bg-white/20 cursor-pointer"
          >
            Voltar
          </button>
          <button
            className="px-4 py-2 rounded bg-gradient-to-r from-[#F5B465] to-[#843505] text-black font-semibold cursor-pointer"
            onClick={() => {
              // placeholder: iniciar nova simulação
              onClose?.();
            }}
          >
            Nova simulação
          </button>
        </div>
      </div>
    </div>
  );
}
