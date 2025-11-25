import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl: "/marker-icon.png",
  iconRetinaUrl: "/marker-icon-2x.png",
  shadowUrl: "/marker-shadow.png",
});

export default function AttractionsMap({ attractions }) {
  const vbCenter = [36.8529, -75.9780];

  return (
    <div className="rounded-2xl overflow-hidden border-2" style={{ height: "500px" }}>
      <MapContainer center={vbCenter} zoom={12} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />

        {attractions.map((a) => (
          <Marker key={a.id} position={a.position}>
            <Popup>
              <strong>{a.name}</strong>
              <br />
              {a.description}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
