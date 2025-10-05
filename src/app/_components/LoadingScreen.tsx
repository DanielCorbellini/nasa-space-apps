import React from "react";

export default function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-900 to-green-700 p-8 flex items-center justify-center w-full">
      <div className="text-center">
        <div className="text-8xl mb-8 animate-bounce">🌾</div>
        <h2 className="text-4xl font-bold text-white mb-4">
          Simulating growth...
        </h2>
        <p className="text-green-200 text-xl">
          Processing data and your decisions...
        </p>
        <div className="mt-8 flex justify-center space-x-2">
          <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
          <div className="w-4 h-4 bg-white rounded-full animate-pulse delay-100"></div>
          <div className="w-4 h-4 bg-white rounded-full animate-pulse delay-200"></div>
        </div>
      </div>
    </div>
  );
}
