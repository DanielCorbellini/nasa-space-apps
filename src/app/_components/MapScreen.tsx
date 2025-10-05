"use client";

import dynamic from "next/dynamic";

const MapScreen = dynamic(() => import("./MapScreenComponent"), {
  ssr: false,
});

export default MapScreen;
