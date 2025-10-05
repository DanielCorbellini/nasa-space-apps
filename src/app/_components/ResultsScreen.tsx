interface ResultsScreenProps {
  season: string;
  success: number;
  feedback: string[];
  parameters: Record<string, number>;
  onClose?: () => void;
}

export default function ResultsScreen({
  season,
  success,
  feedback,
  parameters,
  onClose,
}: ResultsScreenProps) {
  const successColor =
    success < 35 ? "text-red-500" : success < 70 ? "text-yellow-400" : "text-green-400";

  // Helper for bar color
  const getBarColor = (val: number) => {
    if (val < 0.35) return "bg-red-500";
    if (val < 0.7) return "bg-yellow-400";
    return "bg-green-400";
  };

  // Only keep fertilizer and irrigation
  const displayParams = {
    Fertilizer: Math.max(0, Math.min(1, parameters.Fertilizer || 0)),
    Irrigation: Math.max(0, Math.min(1, parameters.Irrigation || 0)),
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white/5 backdrop-blur-md rounded-xl p-8 text-white shadow-lg flex flex-col items-center gap-6">
        {/* Header */}
        <div className="w-full flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-bold text-[#F5B465]">
              Results — {season}
            </h2>
            <p className="text-sm text-green-200 mt-1">
              Simulation outcome based on your crop choices
            </p>
          </div>
        </div>

        {/* Success Percentage */}
        <div className="flex flex-col items-center justify-center text-center py-6">
          <div
            className={`text-7xl font-extrabold drop-shadow-lg transition-colors duration-500 ${successColor}`}
          >
            {Math.round(success)}%
          </div>
          <div className="text-lg text-gray-300 mt-2 font-medium">
            Crop Success Rate
          </div>
        </div>

        {/* Feedback Messages */}
        <div className="flex flex-col gap-2 text-gray-200 text-center">
          {feedback?.map((msg, i) => (
            <div key={i} className="text-xl">
              {msg}
            </div>
          ))}
        </div>

        {/* Fertilizer & Irrigation Bars */}
        <div className="w-full mt-4 flex flex-col gap-3">
          {Object.entries(displayParams).map(([key, val]) => (
            <div key={key} className="flex flex-col gap-1">
              <div className="flex justify-between text-sm text-gray-300">
                <span>{key}</span>
                <span>{Math.round(val * 100)}%</span>
              </div>
              <div className="w-full h-4 bg-white/10 rounded-full">
                <div
                  className={`h-4 rounded-full ${getBarColor(val)}`}
                  style={{ width: `${val * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* New Simulation Button */}
        <div className="flex justify-end w-full gap-3 mt-6">
          <button
            className="px-4 py-2 rounded bg-gradient-to-r from-[#F5B465] to-[#843505] text-black font-semibold cursor-pointer"
            onClick={() => onClose?.()}
          >
            New Simulation
          </button>
        </div>
      </div>
    </div>
  );
}
