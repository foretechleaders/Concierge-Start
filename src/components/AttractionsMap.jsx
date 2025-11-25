import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet icons (required for Vite + Netlify)
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl: "/marker-icon.png",
  iconRetinaUrl: "/marker-icon-2x.png",
  shadowUrl: "/marker-shadow.png",
});

export default function AttractionsMap() {
  const vbCenter = [36.8529, -75.9780]; // VA Beach center

  // Example attraction markers (customize later)
  const attractions = [
    {
      name: "Virginia Beach Boardwalk",
      position: [36.8427, -75.9754],
    },
    {
      name: "Virginia Aquarium & Marine Science Center",
      position: [36.8222, -75.9860],
    },
    {
      name: "First Landing State Park",
      position: [36.9180, -76.0510],
    },
  ];

  return (
    <div className="rounded-2xl overflow-hidden border-2" style={{ height: "500px" }}>
      <MapContainer
        center={vbCenter}
        zoom={12}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />

        {attractions.map((a, index) => (
          <Marker key={index} position={a.position}>
            <Popup>{a.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
