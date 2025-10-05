"use client";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";
import * as turf from "@turf/turf";

export default function MapScreen({ onSelectLocation, setLocationName }) {
  const [selected, setSelected] = useState<[number, number] | null>(null);
  const [landGeoJSON, setLandGeoJSON] = useState<any>(null);

  // 🔹 1. Buscar os dados do Natural Earth via geojson.xyz
  useEffect(() => {
    fetch("https://geojson.xyz/naturalearth-3.3.0/ne_110m_land.geojson")
      .then((res) => res.json())
      .then(setLandGeoJSON)
      .catch((err) => console.error("Unable to load GeoJSON:", err));
  }, []);

  function LocationPicker() {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;

        if (!landGeoJSON) return;

        const point = turf.point([lng, lat]);

        // 🔹 1. Procurar o polígono de terra que contém o ponto
        const landFeature = landGeoJSON.features.some((feature) =>
          turf.booleanPointInPolygon(point, feature)
        );

        if (!landFeature) {
          alert("🌊 You clicked on the ocean! Choose a land area.");
          return;
        }

        // 🔹 2. Se for terra, salva e passa ao callback
        setSelected([lat, lng]);
        setLocationName("landFeature.properties.name");
        onSelectLocation(lat, lng);
      },
    });
    return null;
  }

  return (
    <div className="relative w-full h-screen">
      <MapContainer
        center={[0, 0]}
        zoom={2}
        className="w-full h-full z-0"
        style={{ background: "#cfe0ff" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        {landGeoJSON && <LocationPicker />}
      </MapContainer>

      <div className="absolute top-6 left-15 bg-white/80 p-3 rounded shadow-lg">
        <h2 className="font-semibold text-gray-800">Choose your farm</h2>
        <p className="text-sm text-gray-600">
          Select a land area to start the game.
        </p>
        {selected && (
          <div className="mt-2 text-xs text-gray-800">
            Coordenadas: {selected[0].toFixed(2)}, {selected[1].toFixed(2)}
          </div>
        )}
      </div>
    </div>
  );
}
