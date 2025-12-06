import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { parseISO, format } from "date-fns";

import FeaturedEventsCarousel from "../components/FeaturedEventsCarousel.jsx";
import MonthlyCalendar from "../components/MonthlyCalendar.jsx";

const API_URL =
  "https://script.google.com/macros/s/AKfycbzWYr_ct1ynPWi03__CAVQnFXbsaaLc7x7i3CCU1crTxOa-gA2LoWl67RrMx1CNiTcV/exec";

// Normalize event data
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

        // normalize date
        date: (() => {
          try {
            const d = new Date(ev.date);
            if (isNaN(d)) return null;
            return d.toISOString().substring(0, 10);
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

        // NEW: featured support
        featured: String(ev.featured || "")
          .toLowerCase()
          .trim() === "yes",

        tags: Array.isArray(ev.tags)
          ? ev.tags
          : typeof ev.tags === "string"
          ? ev.tags.split(",").map((t) => t.trim()).filter(Boolean)
          : [],
      };
    });
}

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [area, setArea] = useState("all");

  useEffect(() => {
    async function loadEvents() {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Failed to fetch events");

        const raw = await res.json();
        const normalized = normalizeEvents(raw);

        setEvents(normalized);
      } catch (err) {
        console.error(err);
        setError("Unable to load events at this time.");
      } finally {
        setLoading(false);
      }
    }

    loadEvents();
  }, []);

  // Filter Logic
  const filteredEvents = useMemo(() => {
    let list = events;

    if (search.trim().length > 0) {
      const s = search.trim().toLowerCase();
      list = list.filter(
        (ev) =>
          ev.name.toLowerCase().includes(s) ||
          ev.location?.toLowerCase().includes(s) ||
          ev.area?.toLowerCase().includes(s)
      );
    }

    if (area !== "all") {
      list = list.filter((ev) => ev.area?.toLowerCase() === area);
    }

    return list;
  }, [events, search, area]);

  if (loading) {
    return <div className="p-6 text-gray-700">Loading events...</div>;
  }

  if (error) {
    return (
      <div className="p-6 text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">

      {/* 🌟 Featured Events Carousel */}
      <FeaturedEventsCarousel events={events} />

      {/* 🗓 Monthly Calendar View */}
      <MonthlyCalendar events={events} />

      {/* Filters */}
      <div className="mt-10 mb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <input
          type="text"
          placeholder="Search events..."
          className="px-4 py-2 border rounded-lg w-full md:w-1/2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="px-4 py-2 border rounded-lg"
          value={area}
          onChange={(e) => setArea(e.target.value)}
        >
          <option value="all">All Areas</option>
          <option value="oceanfront">Oceanfront</option>
          <option value="town center">Town Center</option>
          <option value="chic's beach">Chic's Beach</option>
          <option value="sandbridge">Sandbridge</option>
        </select>
      </div>

      {/* Event List */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredEvents.length === 0 ? (
          <p className="text-gray-600">No upcoming events match your filters.</p>
        ) : (
          filteredEvents.map((ev) => (
            <Link
              to={`/events/${ev.slug}`}
              key={ev.slug}
              className="border rounded-xl overflow-hidden shadow hover:shadow-lg transition bg-white"
            >
              <div className="h-40 overflow-hidden">
                <img
                  src={`/images/events/${ev.slug}.jpg`}
                  alt={ev.name}
                  className="w-full h-full object-cover"
                  onError={(e) =>
                    (e.currentTarget.src = "/images/events/default.jpg")
                  }
                />
              </div>

              <div className="p-4">
                {ev.date && (
                  <p className="text-gray-500 text-sm mb-1">
                    {format(parseISO(ev.date), "MMMM dd, yyyy")}
                  </p>
                )}
                <h3 className="font-semibold text-lg">{ev.name}</h3>
                <p className="text-gray-600 text-sm mt-1">
                  {ev.location} — {ev.area}
                </p>
              </div>
            </Link>
          ))
        )}
      </div>

    </div>
  );
}
