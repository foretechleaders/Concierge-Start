import { useEffect, useRef } from "react";

export default function Map() {
  const mapRef = useRef(null);

  useEffect(() => {
    const load = async () => {
      try {
        // Load Google Maps
        const loader = new window.google.maps.plugins.loader.Loader({
          apiKey: import.meta.env.VITE_GOOGLE_MAPS_KEY,
          version: "weekly",
        });

        const google = await loader.load();

        // Create the map
        const map = new google.maps.Map(mapRef.current, {
          center: { lat: 36.8529, lng: -75.9780 }, // Virginia Beach
          zoom: 12,
        });

        // Example marker (you can replace with real attractions)
        new google.maps.Marker({
          position: { lat: 36.845, lng: -75.981 },
          map,
          title: "Neptune Statue",
        });

      } catch (error) {
        console.error("Map error:", error);
      }
    };

    load();
  }, []);

  return (
    <div className="rounded-2xl border p-6 bg-vbSand/40 text-center">
      <p className="font-semibold mb-2">Interactive Map</p>
      <div
        ref={mapRef}
        className="w-full aspect-video rounded-xl border"
      />
    </div>
  );
}
