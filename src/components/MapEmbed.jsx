export default function MapEmbed({ lat, lng }) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

// ⭐ ADD THIS LINE HERE
  console.log("API KEY:", apiKey);

  if (!apiKey) {
    console.error("Google Maps API Key missing. Ensure it is set in .env");
    return (
      <div className="text-red-600 mt-4">
        Google Maps API key is missing.
      </div>
    );
  }

  if (!lat || !lng) return null;

  const url = `https://www.google.com/maps/embed/v1/view?key=${apiKey}&center=${lat},${lng}&zoom=15`;

  return (
    <div className="mt-6 w-full h-64 rounded-xl overflow-hidden shadow-lg">
      <iframe
        title="Google Map"
        width="100%"
        height="100%"
        loading="lazy"
        allowFullScreen
        style={{ border: 0 }}
        src={url}
      ></iframe>
    </div>
  );
}
