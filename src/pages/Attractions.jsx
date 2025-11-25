import React from "react";
import AttractionsMap from "../components/AttractionsMap";

export default function Attractions() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-4 text-center text-vbBlue">
        Virginia Beach Attractions
      </h1>

      <p className="text-center text-gray-700 mb-8 max-w-2xl mx-auto">
        Explore the top attractions, beaches, parks, and iconic locations across Virginia Beach.
        Use the interactive map below to find places to visit.
      </p>

      <AttractionsMap />
    </div>
  );
}
