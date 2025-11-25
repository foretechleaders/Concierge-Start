// src/components/EventsSidebar.jsx
import React from "react";
import events from "../data/eventsData";

export default function EventsSidebar() {
  return (
    <div className="p-4 border rounded-xl bg-white">
      <h3 className="text-lg font-bold mb-3">Upcoming Events</h3>
      <ul className="space-y-3 text-sm max-h-80 overflow-y-auto">
        {events.map((evt) => (
          <li key={evt.id} className="border rounded-lg p-2">
            <p className="font-semibold">{evt.name}</p>
            <p className="text-gray-500 text-xs">
              {evt.date} · {evt.location}
            </p>
            <p className="mt-1 text-gray-700">{evt.description}</p>
            {evt.url && (
              <a
                href={evt.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-vbBlue underline text-xs mt-1 inline-block"
              >
                View details
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
