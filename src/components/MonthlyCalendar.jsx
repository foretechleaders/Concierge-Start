import { useState } from "react";
import { Link } from "react-router-dom";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  format,
  isSameDay,
  isSameMonth,
  parseISO,
} from "date-fns";

export default function MonthlyCalendar({ events }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDayEvents, setSelectedDayEvents] = useState(null); // modal
  const [tooltipEvent, setTooltipEvent] = useState(null); // tooltip

  if (!events) return null;

  // Group events by date for calendar placement
  const eventsByDate = {};
  events.forEach((ev) => {
    if (!ev.date) return;
    const d = ev.date; // already normalized YYYY-MM-DD
    if (!eventsByDate[d]) eventsByDate[d] = [];
    eventsByDate[d].push(ev);
  });

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const weekStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  const weekEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const today = new Date();
  const calendarRows = [];
  let day = weekStart;

  while (day <= weekEnd) {
    const week = [];
    for (let i = 0; i < 7; i++) {
      const dayStr = format(day, "yyyy-MM-dd");
      week.push({
        date: new Date(day),
        dayStr,
        events: eventsByDate[dayStr] || [],
        isToday: isSameDay(day, today),
        isCurrentMonth: isSameMonth(day, currentMonth),
      });
      day = addDays(day, 1);
    }
    calendarRows.push(week);
  }

  const openDayModal = (eventsForDay, date) => {
    setSelectedDayEvents({
      date,
      events: eventsForDay,
    });
  };

  const closeModal = () => setSelectedDayEvents(null);

  return (
    <div className="mt-10 border rounded-2xl p-5 bg-white shadow-sm relative">

      {/* Month Header */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          className="px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200"
        >
          ← Prev
        </button>

        <h2 className="text-xl font-semibold">
          {format(currentMonth, "MMMM yyyy")}
        </h2>

        <button
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className="px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200"
        >
          Next →
        </button>
      </div>

      {/* Weekday labels */}
      <div className="grid grid-cols-7 text-center font-semibold text-gray-600 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((w) => (
          <div key={w}>{w}</div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 relative">
        {calendarRows.map((week, wi) =>
          week.map((d, di) => (
            <div
              key={`${wi}-${di}`}
              onClick={() =>
                d.events.length > 0
                  ? openDayModal(d.events, d.date)
                  : null
              }
              className={`
                border rounded-xl p-1 h-28 text-xs cursor-pointer relative
                ${
                  d.isCurrentMonth
                    ? "bg-white"
                    : "bg-gray-50 text-gray-400"
                }
                ${d.isToday ? "border-blue-500" : ""}
              `}
            >
              {/* Day number */}
              <div className="text-right pr-1 font-semibold text-gray-700">
                {format(d.date, "d")}
              </div>

              {/* Event links with tooltip triggers */}
              <div className="space-y-1 mt-1">
                {d.events.map((ev) => (
                  <span
                    key={ev.slug}
                    className="block bg-blue-100 text-blue-800 px-1 py-0.5 rounded-md truncate hover:bg-blue-200"
                    onMouseEnter={(e) =>
                      setTooltipEvent({
                        event: ev,
                        x: e.clientX,
                        y: e.clientY,
                      })
                    }
                    onMouseLeave={() => setTooltipEvent(null)}
                  >
                    {ev.name}
                  </span>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Tooltip Preview */}
      {tooltipEvent && (
        <div
          className="absolute z-50 p-3 bg-white border rounded-lg shadow-xl w-60"
          style={{
            top: tooltipEvent.y - 80,
            left: tooltipEvent.x + 10,
          }}
        >
          <img
            src={`/images/events/${tooltipEvent.event.slug}.jpg`}
            alt={tooltipEvent.event.name}
            className="w-full h-24 object-cover rounded-md mb-2"
          />
          <p className="font-semibold">{tooltipEvent.event.name}</p>
          {tooltipEvent.event.date && (
            <p className="text-sm text-gray-600">
              {format(parseISO(tooltipEvent.event.date), "MMM d, yyyy")}
            </p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            {tooltipEvent.event.location} — {tooltipEvent.event.area}
          </p>
        </div>
      )}

      {/* Modal: Events for Day */}
      {selectedDayEvents && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-5 max-w-lg w-full shadow-xl relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>

            <h3 className="text-xl font-semibold mb-3">
              Events on {format(selectedDayEvents.date, "MMMM d, yyyy")}
            </h3>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {selectedDayEvents.events.map((ev) => (
                <Link
                  key={ev.slug}
                  to={`/events/${ev.slug}`}
                  onClick={() => closeModal()}
                  className="flex gap-3 border rounded-xl p-3 hover:bg-gray-50"
                >
                  <img
                    src={`/images/events/${ev.slug}.jpg`}
                    alt={ev.name}
                    className="w-20 h-20 rounded-md object-cover"
                  />

                  <div>
                    <p className="font-semibold">{ev.name}</p>
                    {ev.date && (
                      <p className="text-sm text-gray-600">
                        {format(parseISO(ev.date), "MMM d, yyyy")}
                      </p>
                    )}
                    <p className="text-xs text-gray-500">
                      {ev.location} — {ev.area}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
