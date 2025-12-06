import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { format, parseISO } from "date-fns";
import MapEmbed from "../components/MapEmbed.jsx";

const API_URL =
  "https://script.google.com/macros/s/AKfycbzWYr_ct1ynPWi03__CAVQnFXbsaaLc7x7i3CCU1crTxOa-gA2LoWl67RrMx1CNiTcV/exec";

// ⭐ Predefined coordinates for known events (extend as you add more)
const EVENT_COORDS = {
  "neptune-festival": { lat: 36.8511, lng: -75.9770 },
  "holiday-lights-at-the-beach": { lat: 36.8495, lng: -75.9732 },
  // Add more slugs + coords here as needed
};

// Optional sponsors config (you can grow this)
const EVENT_SPONSORS = {
  "neptune-festival": [
    {
      name: "Virginia Beach Neptune Festival",
      url: "https://www.neptunefestival.com/",
    },
  ],
  "holiday-lights-at-the-beach": [
    {
      name: "Beach Events",
      url: "https://www.beachstreetusa.com/",
    },
  ],
};

// Optional schedule/timeline config
const EVENT_SCHEDULE = {
  "neptune-festival": [
    { label: "Boardwalk arts & crafts", time: "All Day" },
    { label: "Live concerts at the stage", time: "Evening" },
  ],
  "holiday-lights-at-the-beach": [
    { label: "Drive-through lights on the Boardwalk", time: "Nightly" },
  ],
};

// Simple Haversine distance (km)
function distanceKm(a, b) {
  const toRad = (deg) => (deg * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const x =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
  return R * c;
}

// Normalize events the same way as Events.jsx
function normalizeEvents(raw) {
  return raw
    .filter(
      (ev) =>
        ev &&
        ev.name &&
        String(ev.name).trim().length > 0 &&
        ev.date != null
    )
    .map((ev) => {
      return {
        ...ev,
        date: (() => {
          try {
            const d = new Date(ev.date);
            if (isNaN(d)) return null;
            return d.toISOString().substring(0, 10); // "YYYY-MM-DD"
          } catch {
            return null;
          }
        })(),
        slug:
          ev.slug && String(ev.slug).trim().length > 0
            ? String(ev.slug).trim()
            : String(ev.name)
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, ""),
        tags: Array.isArray(ev.tags)
          ? ev.tags
          : typeof ev.tags === "string"
          ? ev.tags
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean)
          : [],
      };
    });
}

export default function EventDetails() {
  const { slug } = useParams();
  const [event, setEvent] = useState(null);
  const [allEvents, setAllEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadEvent() {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Failed to fetch events");

        const raw = await res.json();
        const normalized = normalizeEvents(raw);

        setAllEvents(normalized);

        const match = normalized.find((ev) => ev.slug === slug);
        if (!match) {
          setError("Event not found.");
        } else {
          setEvent(match);
        }
      } catch (err) {
        console.error(err);
        setError("Unable to load event details at this time.");
      } finally {
        setLoading(false);
      }
    }

    loadEvent();
  }, [slug]);

  const heroImage = `/images/events/${slug}.jpg`;
  const galleryImages = [
    heroImage,
    `/images/events/${slug}-1.jpg`,
    `/images/events/${slug}-2.jpg`,
  ];

  const coords = EVENT_COORDS[slug];

  const relatedByTags = useMemo(() => {
    if (!event) return [];
    if (!event.tags || event.tags.length === 0) return [];

    return allEvents
      .filter((ev) => ev.slug !== event.slug)
      .filter((ev) => ev.tags?.some((t) => event.tags.includes(t)))
      .slice(0, 3);
  }, [event, allEvents]);

  const nearbyEvents = useMemo(() => {
    if (!event || !coords) return [];

    const here = coords;

    const list = allEvents
      .filter((ev) => ev.slug !== event.slug)
      .map((ev) => {
        const c = EVENT_COORDS[ev.slug];
        if (!c) return null;
        return { ...ev, _distanceKm: distanceKm(here, c) };
      })
      .filter(Boolean)
      .filter((ev) => ev._distanceKm <= 50) // within 50km
      .sort((a, b) => a._distanceKm - b._distanceKm)
      .slice(0, 3);

    return list;
  }, [event, allEvents, coords]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8 text-gray-700">
        Loading event...
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <p className="text-red-600 mb-4">{error || "Event not found."}</p>
        <Link
          to="/events"
          className="inline-block px-4 py-2 rounded-full bg-blue-600 text-white text-sm hover:bg-blue-700"
        >
          Back to Events
        </Link>
      </div>
    );
  }

  const start = event.date ? parseISO(event.date) : null;
  const end = event.endDate ? parseISO(event.endDate) : null;
  const sponsors = EVENT_SPONSORS[event.slug] || [];
  const schedule = EVENT_SCHEDULE[event.slug] || [];

  return (
    <div className="max-w-5xl mx-auto px-4 pb-10">
      {/* Hero Section */}
      <div className="rounded-2xl overflow-hidden shadow-md mb-6">
        <div className="relative h-64 md:h-80">
          <img
            src={heroImage}
            alt={event.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 md:left-6 md:right-6 text-white">
            <p className="text-sm uppercase tracking-wide text-gray-200">
              {event.area || "Virginia Beach"}
            </p>
            <h1 className="text-2xl md:text-3xl font-bold mb-1">
              {event.name}
            </h1>
            {start && (
              <p className="text-sm md:text-base">
                {format(start, "MMMM do, yyyy")}
                {end ? ` — ${format(end, "MMMM do, yyyy")}` : ""}
                {event.location ? ` · ${event.location}` : ""}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Top Actions & Meta */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
        <div className="flex flex-wrap gap-2 items-center">
          {event.tags?.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          <AddToCalendarButton event={event} />
          {event.url && (
            <a
              href={event.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full border border-blue-600 text-blue-600 text-sm hover:bg-blue-50"
            >
              Official Website
            </a>
          )}
          <ShareButtons event={event} />
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* Left: Description + Schedule + Sponsors */}
        <div className="md:col-span-2 space-y-6">
          {/* Description */}
          <section>
            <h2 className="text-xl font-semibold mb-2">About this event</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {event.description ||
                "Details coming soon. Check back for more information about this event."}
            </p>
          </section>

          {/* Schedule */}
          {schedule.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold mb-2">Event Schedule</h2>
              <ul className="space-y-2">
                {schedule.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex gap-3 items-start text-sm text-gray-700"
                  >
                    <span className="mt-1 h-2 w-2 rounded-full bg-blue-500 flex-shrink-0" />
                    <div>
                      <p className="font-medium">{item.label}</p>
                      {item.time && (
                        <p className="text-gray-500 text-xs">{item.time}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Sponsors */}
          {sponsors.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold mb-2">Event Partners</h2>
              <div className="flex flex-wrap gap-3">
                {sponsors.map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 rounded-xl border text-sm hover:bg-gray-50"
                  >
                    {s.name}
                  </a>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right: Map + Quick Info + Gallery */}
        <aside className="space-y-6">
          {/* Map */}
          {coords && (
            <section>
              <h2 className="text-lg font-semibold mb-2">Location</h2>
              <div className="rounded-xl overflow-hidden border">
                <MapEmbed lat={coords.lat} lng={coords.lng} />
              </div>
              {event.location && (
                <p className="mt-2 text-sm text-gray-700">
                  {event.location}, {event.area || "Virginia Beach"}
                </p>
              )}
            </section>
          )}

          {/* Quick Info */}
          <section className="rounded-xl border p-4 bg-gray-50 space-y-2 text-sm text-gray-700">
            {start && (
              <p>
                <span className="font-semibold">Date: </span>
                {format(start, "EEEE, MMMM do, yyyy")}
              </p>
            )}
            {event.area && (
              <p>
                <span className="font-semibold">Area: </span>
                {event.area}
              </p>
            )}
            {event.location && (
              <p>
                <span className="font-semibold">Where: </span>
                {event.location}
              </p>
            )}
          </section>

          {/* Gallery */}
          <section>
            <h2 className="text-lg font-semibold mb-2">Photos</h2>
            <div className="grid grid-cols-3 gap-2">
              {galleryImages.map((src, idx) => (
                <div
                  key={src}
                  className={`overflow-hidden rounded-lg border ${
                    idx === 0 ? "col-span-3 h-32" : "h-20"
                  }`}
                >
                  <img
                    src={src}
                    alt={`${event.name} photo ${idx + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Hide broken gallery images
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>

      {/* Related Sections */}
      {(relatedByTags.length > 0 || nearbyEvents.length > 0) && (
        <div className="mt-10 border-t pt-6 space-y-8">
          {relatedByTags.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold mb-3">More like this</h2>
              <div className="grid gap-4 md:grid-cols-3">
                {relatedByTags.map((ev) => (
                  <RelatedEventCard key={ev.slug} ev={ev} />
                ))}
              </div>
            </section>
          )}

          {nearbyEvents.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold mb-3">Nearby events</h2>
              <div className="grid gap-4 md:grid-cols-3">
                {nearbyEvents.map((ev) => (
                  <RelatedEventCard
                    key={ev.slug}
                    ev={ev}
                    showDistance={true}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      )}

      {/* Back link */}
      <div className="mt-8">
        <Link
          to="/events"
          className="inline-block px-4 py-2 rounded-full bg-gray-100 text-gray-800 text-sm hover:bg-gray-200"
        >
          ← Back to Events
        </Link>
      </div>
    </div>
  );
}

// Small card used for related / nearby events
function RelatedEventCard({ ev, showDistance }) {
  const start = ev.date ? parseISO(ev.date) : null;
  return (
    <Link
      to={`/events/${ev.slug}`}
      className="block border rounded-xl overflow-hidden hover:shadow-md transition bg-white"
    >
      <div className="h-28 overflow-hidden">
        <img
          src={`/images/events/${ev.slug}.jpg`}
          alt={ev.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      </div>
      <div className="p-3 text-sm">
        {start && (
          <p className="text-gray-500 text-xs mb-1">
            {format(start, "MMM d, yyyy")}
          </p>
        )}
        <p className="font-semibold line-clamp-2">{ev.name}</p>
        {ev.location && (
          <p className="text-gray-600 text-xs mt-1">
            {ev.location} — {ev.area}
          </p>
        )}
        {showDistance && typeof ev._distanceKm === "number" && (
          <p className="text-blue-600 text-xs mt-1">
            {ev._distanceKm.toFixed(1)} km away
          </p>
        )}
      </div>
    </Link>
  );
}

// Add to Google Calendar button
function AddToCalendarButton({ event }) {
  if (!event?.date) return null;

  const start = event.date.replace(/-/g, "");
  const end = event.endDate
    ? event.endDate.replace(/-/g, "")
    : start; // same day if no end

  const url = new URL("https://calendar.google.com/calendar/render");
  url.searchParams.set("action", "TEMPLATE");
  url.searchParams.set("text", event.name);
  url.searchParams.set("dates", `${start}/${end}`);
  if (event.description) url.searchParams.set("details", event.description);
  if (event.location) url.searchParams.set("location", event.location);

  return (
    <a
      href={url.toString()}
      target="_blank"
      rel="noopener noreferrer"
      className="px-4 py-2 rounded-full bg-blue-600 text-white text-sm hover:bg-blue-700"
    >
      Add to Google Calendar
    </a>
  );
}

// Simple social share bar
function ShareButtons({ event }) {
  const url = `${window.location.origin}/events/${event.slug}`;
  const text = `Check out this event in Virginia Beach: ${event.name}`;

  const twitter = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    text
  )}&url=${encodeURIComponent(url)}`;
  const facebook = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    url
  )}`;
  const mailto = `mailto:?subject=${encodeURIComponent(
    event.name
  )}&body=${encodeURIComponent(text + "\n\n" + url)}`;

  return (
    <div className="flex gap-2">
      <a
        href={twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="px-3 py-2 rounded-full border text-xs hover:bg-gray-50"
      >
        Share on X
      </a>
      <a
        href={facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="px-3 py-2 rounded-full border text-xs hover:bg-gray-50"
      >
        Share on Facebook
      </a>
      <a href={mailto} className="px-3 py-2 rounded-full border text-xs hover:bg-gray-50">
        Email
      </a>
    </div>
  );
}
