// src/pages/Attractions.jsx
import React, { useMemo, useState } from "react";
import attractions from "../data/attractionsData";
import { categories } from "../data/categories";
import AttractionsMap from "../components/AttractionsMap";
import AttractionCard from "../components/AttractionCard";
import ReviewsPanel from "../components/ReviewsPanel";
import EventsSidebar from "../components/EventsSidebar";

export default function Attractions() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    kidFriendly: false,
    seniorFriendly: false,
    free: false,
  });
  const [sortBy, setSortBy] = useState("recommended");
  const [selectedAttraction, setSelectedAttraction] = useState(null);

  const filteredAttractions = useMemo(() => {
    let result = [...attractions];

    // Category filter
    if (selectedCategory !== "All") {
      result = result.filter((a) => a.category === selectedCategory);
    }

    // Text search
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (a) =>
          a.name.toLowerCase().includes(term) ||
          a.description.toLowerCase().includes(term)
      );
    }

    // Tag filters
    if (filters.kidFriendly) result = result.filter((a) => a.kidFriendly);
    if (filters.seniorFriendly) result = result.filter((a) => a.seniorFriendly);
    if (filters.free) result = result.filter((a) => a.free);

    // Sorting
    if (sortBy === "recommended" || sortBy === "popular") {
      result.sort((a, b) => (b.popularityScore || 0) - (a.popularityScore || 0));
    } else if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [selectedCategory, searchTerm, filters, sortBy]);

  const handleToggleFilter = (key) => {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSelectAttraction = (attraction) => {
    setSelectedAttraction(attraction);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-8">
      <header className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-vbBlue">
          Explore Virginia Beach
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Search attractions, events, and local gems — then see everything on
          the interactive map.
        </p>
      </header>

      {/* Search + Filters + Sort */}
      <div className="space-y-4">
        {/* Search bar */}
        <div className="flex flex-col md:flex-row gap-3 items-center">
          <input
            type="text"
            placeholder="Search attractions, wildlife, restaurants, neighborhoods..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:flex-1 p-3 border rounded-lg shadow-sm"
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm"
          >
            <option value="recommended">Sort: Recommended</option>
            <option value="popular">Sort: Most Popular</option>
            <option value="name">Sort: Name A–Z</option>
          </select>
        </div>

        {/* Category chips */}
        <div className="flex flex-wrap gap-2">
          <button
            className={`px-4 py-2 rounded-full text-sm ${
              selectedCategory === "All"
                ? "bg-vbBlue text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setSelectedCategory("All")}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-full text-sm ${
                selectedCategory === cat
                  ? "bg-vbBlue text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Filter toggles */}
        <div className="flex flex-wrap gap-3 text-sm">
          <button
            type="button"
            className={`px-3 py-1 rounded-full border ${
              filters.kidFriendly ? "bg-blue-100 border-blue-400" : "bg-white"
            }`}
            onClick={() => handleToggleFilter("kidFriendly")}
          >
            👨‍👩‍👧 Kid friendly
          </button>
          <button
            type="button"
            className={`px-3 py-1 rounded-full border ${
              filters.seniorFriendly
                ? "bg-purple-100 border-purple-400"
                : "bg-white"
            }`}
            onClick={() => handleToggleFilter("seniorFriendly")}
          >
            🧓 Senior friendly
          </button>
          <button
            type="button"
            className={`px-3 py-1 rounded-full border ${
              filters.free ? "bg-green-100 border-green-400" : "bg-white"
            }`}
            onClick={() => handleToggleFilter("free")}
          >
            💸 Free
          </button>
        </div>
      </div>

      {/* Map + Events + Reviews layout */}
      <div className="grid lg:grid-cols-3 gap-6 items-start">
        {/* Map (2/3 on desktop) */}
        <div className="lg:col-span-2 space-y-4">
          <AttractionsMap
            attractions={filteredAttractions}
            selectedAttraction={selectedAttraction}
            onSelect={handleSelectAttraction}
          />

          {/* Cards under map */}
          <div className="grid md:grid-cols-2 gap-4">
            {filteredAttractions.map((a) => (
              <AttractionCard
                key={a.id}
                attraction={a}
                onSelect={handleSelectAttraction}
              />
            ))}
            {filteredAttractions.length === 0 && (
              <p className="text-sm text-gray-600">
                No attractions match your filters. Try removing a filter or
                clearing the search.
              </p>
            )}
          </div>
        </div>

        {/* Right column: Events + Reviews */}
        <div className="space-y-4">
          <EventsSidebar />
          <ReviewsPanel attraction={selectedAttraction} />
        </div>
      </div>
    </div>
  );
}
