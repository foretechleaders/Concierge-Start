// src/components/AttractionCard.jsx
import React from "react";

export default function AttractionCard({ attraction, onSelect }) {
  const {
    name,
    description,
    imageUrl,
    category,
    kidFriendly,
    seniorFriendly,
    free,
    tags = [],
    googleMapsUrl,
  } = attraction;

  return (
    <div
      className="border rounded-xl overflow-hidden shadow hover:shadow-lg transition cursor-pointer bg-white flex flex-col"
      onClick={() => onSelect(attraction)}
    >
      {imageUrl && (
        <div className="h-40 w-full overflow-hidden">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover hover:scale-105 transition-transform"
          />
        </div>
      )}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-bold mb-1">{name}</h3>
        <p className="text-xs text-gray-500 mb-1">{category}</p>
        <p className="text-sm text-gray-700 mb-3 line-clamp-3">{description}</p>

        <div className="flex flex-wrap gap-1 mb-3">
          {free && (
            <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
              Free
            </span>
          )}
          {kidFriendly && (
            <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
              Kid Friendly
            </span>
          )}
          {seniorFriendly && (
            <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-700">
              Senior Friendly
            </span>
          )}
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto flex justify-between items-center">
          <button
            type="button"
            className="text-sm text-vbBlue underline"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(attraction);
            }}
          >
            View on map
          </button>

          {googleMapsUrl && (
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm bg-vbBlue text-white px-3 py-1 rounded-full"
              onClick={(e) => e.stopPropagation()}
            >
              Directions
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
