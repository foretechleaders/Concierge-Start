import React from "react";
import Map from "../components/Map";

export default function Attractions() {
  return (
    <div className="min-h-screen bg-vbSand p-6 pt-32">
      <div className="max-w-6xl mx-auto">

        {/* Page Heading */}
        <h1 className="text-4xl font-bold text-vbNavy mb-6">
          Local Attractions
        </h1>

        <p className="text-lg text-vbNavy/80 mb-8">
          Explore the top destinations, landmarks, and experiences Virginia Beach has to offer.
        </p>

        {/* Google Map */}
        <div className="mb-12">
          <Map />
        </div>

        {/* Example Attraction List (optional placeholder — can customize later) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white shadow rounded-xl p-5 border">
            <h2 className="text-xl font-semibold">Neptune Statue</h2>
            <p className="text-sm mt-2 text-gray-600">
              A must-see landmark at the Virginia Beach Oceanfront.
            </p>
          </div>

          <div className="bg-white shadow rounded-xl p-5 border">
            <h2 className="text-xl font-semibold">Virginia Aquarium</h2>
            <p className="text-sm mt-2 text-gray-600">
              Explore marine life exhibits, nature trails, and adventure park.
            </p>
          </div>

          <div className="bg-white shadow rounded-xl p-5 border">
            <h2 className="text-xl font-semibold">First Landing State Park</h2>
            <p className="text-sm mt-2 text-gray-600">
              Beaches, trails, and stunning nature-preserve scenery.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
