import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default Leaflet marker paths (required for Vite & Netlify)
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl: "/marker-icon.png",
  iconRetinaUrl: "/marker-icon-2x.png",
  shadowUrl: "/marker-shadow.png",
});

export default function HomeMap() {
  const vbCenter = [36.8529, -75.9780]; // Virginia Beach

  return (
    <div className="rounded-2xl overflow-hidden border-2" style={{ height: "400px" }}>
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

        <Marker position={vbCenter}>
          <Popup>Virginia Beach</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
