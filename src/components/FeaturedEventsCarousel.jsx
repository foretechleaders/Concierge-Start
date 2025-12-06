import { Link } from "react-router-dom";
import { format, parseISO } from "date-fns";

export default function FeaturedEventsCarousel({ events }) {
  if (!events || events.length === 0) return null;

  const featured = events.filter((ev) => ev.featured);

  if (featured.length === 0) return null;

  return (
    <div className="mb-10">
      <h2 className="text-2xl font-semibold mb-3">Featured Events</h2>

      <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory">
        {featured.map((ev) => (
          <Link
            to={`/events/${ev.slug}`}
            key={ev.slug}
            className="snap-start flex-shrink-0 w-72 rounded-2xl border overflow-hidden shadow hover:shadow-lg transition"
          >
            <div className="h-40 overflow-hidden">
              <img
                src={`/images/events/${ev.slug}.jpg`}
                alt={ev.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-3">
              {ev.date && (
                <p className="text-xs text-gray-500 mb-1">
                  {format(parseISO(ev.date), "MMM d, yyyy")}
                </p>
              )}
              <p className="font-semibold text-gray-800 line-clamp-2">
                {ev.name}
              </p>
              {ev.location && (
                <p className="text-xs text-gray-600 mt-1">
                  {ev.location} — {ev.area}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
