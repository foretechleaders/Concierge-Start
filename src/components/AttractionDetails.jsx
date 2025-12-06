import { useParams, Link } from "react-router-dom";
import attractions from "../data/attractionsData";
import MapEmbed from "./MapEmbed";

function haversineKm(a, b) {
  if (!a.lat || !a.lng || !b.lat || !b.lng) return Infinity;

  const toRad = (deg) => (deg * Math.PI) / 180;
  const R = 6371; // km
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);

  const sinDLat = Math.sin(dLat / 2);
  const sinDLon = Math.sin(dLon / 2);

  const c =
    2 *
    Math.asin(
      Math.sqrt(
        sinDLat * sinDLat +
          Math.cos(lat1) * Math.cos(lat2) * sinDLon * sinDLon
      )
    );

  return R * c;
}

export default function AttractionDetails() {
  const { id } = useParams();
  const attraction = attractions.find((a) => a.id === id);

  if (!attraction) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-2">Attraction Not Found</h2>
        <p className="mb-4 text-gray-600">
          We couldn't find that attraction. It may have moved or been removed.
        </p>
        <Link to="/attractions" className="text-blue-600 underline">
          Return to Attractions
        </Link>
      </div>
    );
  }

  // Build Google "Directions" link
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${attraction.lat},${attraction.lng}`;

  // Nearby attractions within ~5km, sorted by distance
  const nearby = attractions
    .filter((a) => a.id !== attraction.id)
    .map((a) => ({
      ...a,
      distanceKm: haversineKm(
        { lat: attraction.lat, lng: attraction.lng },
        { lat: a.lat, lng: a.lng }
      ),
    }))
    .filter((a) => a.distanceKm < 5)
    .sort((a, b) => a.distanceKm - b.distanceKm)
    .slice(0, 4);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Hero image */}
      <div className="w-full h-72 md:h-80 rounded-2xl overflow-hidden shadow">
        <img
          src={attraction.image}
          alt={attraction.imageAlt}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Header */}
      <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">{attraction.name}</h1>
          <p className="text-gray-600 mt-1">
            {attraction.category} • {attraction.area}
          </p>
          {attraction.address && (
            <p className="text-gray-500 text-sm mt-1">
              {attraction.address}
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {attraction.free && (
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
              Free
            </span>
          )}
          {attraction.kidFriendly && (
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
              Kid Friendly
            </span>
          )}
          {attraction.seniorFriendly && (
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
              Senior Friendly
            </span>
          )}
        </div>
      </div>

      {/* Description & actions */}
      <div className="mt-6 grid gap-8 md:grid-cols-[2fr,minmax(0,1.1fr)]">
        <div>
          <p className="text-lg leading-relaxed text-gray-800">
            {attraction.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={attraction.googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700"
            >
              Open in Google Maps
            </a>
            <a
              href={directionsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold border border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              Get Directions
            </a>
          </div>

          {/* Tags */}
          {attraction.tags && attraction.tags.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {attraction.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Map */}
        <div>
          <MapEmbed lat={attraction.lat} lng={attraction.lng} />
        </div>
      </div>

      {/* Nearby attractions */}
      {nearby.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">
            Nearby attractions
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {nearby.map((a) => (
              <Link
                key={a.id}
                to={`/attractions/${a.id}`}
                className="flex gap-3 rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-sm p-3 transition"
              >
                <div className="w-24 h-20 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={a.image}
                    alt={a.imageAlt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    {a.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {a.category} • {a.area}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    ~{a.distanceKm.toFixed(1)} km away
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Back link */}
      <div className="mt-10">
        <Link to="/attractions" className="text-blue-600 underline">
          ← Back to all attractions
        </Link>
      </div>
    </div>
  );
}
