// src/components/AttractionsMap.jsx
import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl: "/marker-icon.png",
  iconRetinaUrl: "/marker-icon-2x.png",
  shadowUrl: "/marker-shadow.png",
});

function FlyToSelected({ attraction }) {
  const map = useMap();

  useEffect(() => {
    if (attraction && attraction.position) {
      map.flyTo(attraction.position, 14, { duration: 0.8 });
    }
  }, [attraction, map]);

  return null;
}

export default function AttractionsMap({ attractions, selectedAttraction, onSelect }) {
  const vbCenter = [36.8529, -75.978];

  return (
    <div className="rounded-2xl overflow-hidden border-2 bg-white" style={{ height: "500px" }}>
      <MapContainer center={vbCenter} zoom={12} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {selectedAttraction && <FlyToSelected attraction={selectedAttraction} />}

        {attractions.map((a) => (
          <Marker
            key={a.id}
            position={a.position}
            eventHandlers={{
              click: () => onSelect && onSelect(a),
            }}
          >
            <Popup>
              <div className="text-sm">
                <strong>{a.name}</strong>
                <br />
                <span className="text-xs text-gray-600">{a.category}</span>
                <br />
                {a.googleMapsUrl && (
                  <a
                    href={a.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-vbBlue underline text-xs mt-1 inline-block"
                  >
                    Directions
                  </a>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
