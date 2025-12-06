import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import attractions from "../data/attractionsData";
import AttractionCard from "../components/AttractionCard";

export default function Attractions() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    free: false,
    kidFriendly: false,
    seniorFriendly: false,
    category: "All",
  });

  const categories = useMemo(() => {
    const unique = Array.from(new Set(attractions.map((a) => a.category)));
    return ["All", ...unique];
  }, []);

  const matchesSearch = (a) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      a.name.toLowerCase().includes(q) ||
      a.description.toLowerCase().includes(q) ||
      a.category.toLowerCase().includes(q) ||
      a.area.toLowerCase().includes(q) ||
      (a.tags && a.tags.join(" ").toLowerCase().includes(q))
    );
  };

  const matchesFilters = (a) => {
    if (filters.free && !a.free) return false;
    if (filters.kidFriendly && !a.kidFriendly) return false;
    if (filters.seniorFriendly && !a.seniorFriendly) return false;
    if (filters.category !== "All" && a.category !== filters.category) return false;
    return true;
  };

  const filteredAttractions = attractions.filter(
    (a) => matchesSearch(a) && matchesFilters(a)
  );

  // Live suggestions under the search bar (top 5 matches)
  const suggestions =
    searchQuery.trim().length > 1
      ? attractions
          .filter((a) => matchesSearch(a))
          .slice(0, 5)
      : [];

  const toggleFilter = (key) => {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <header className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Attractions</h1>
        <p className="text-gray-600">
          Explore oceanfront favorites, hidden bay gems, family-friendly fun, and nightlife in Virginia Beach.
        </p>
      </header>

      {/* Search + suggestions */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search attractions, neighborhoods, keywords..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />

        {suggestions.length > 0 && (
          <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-64 overflow-y-auto">
            {suggestions.map((a) => (
              <Link
                key={a.id}
                to={`/attractions/${a.id}`}
                className="block px-4 py-2 hover:bg-gray-50"
              >
                <div className="font-medium text-gray-900">{a.name}</div>
                <div className="text-xs text-gray-500">
                  {a.category} • {a.area}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <button
          onClick={() => toggleFilter("free")}
          className={`px-3 py-1 rounded-full text-sm border ${
            filters.free
              ? "bg-green-600 text-white border-green-600"
              : "bg-white text-gray-700 border-gray-200"
          }`}
        >
          Free
        </button>
        <button
          onClick={() => toggleFilter("kidFriendly")}
          className={`px-3 py-1 rounded-full text-sm border ${
            filters.kidFriendly
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-gray-700 border-gray-200"
          }`}
        >
          Kid Friendly
        </button>
        <button
          onClick={() => toggleFilter("seniorFriendly")}
          className={`px-3 py-1 rounded-full text-sm border ${
            filters.seniorFriendly
              ? "bg-purple-600 text-white border-purple-600"
              : "bg-white text-gray-700 border-gray-200"
          }`}
        >
          Senior Friendly
        </button>

        <div className="ml-auto">
          <select
            value={filters.category}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, category: e.target.value }))
            }
            className="px-3 py-2 text-sm border border-gray-200 rounded-full bg-white shadow-sm"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results */}
      {filteredAttractions.length === 0 ? (
        <p className="text-gray-600">
          No attractions match your search and filters. Try clearing a filter or using different keywords.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredAttractions.map((attraction) => (
            <AttractionCard key={attraction.id} attraction={attraction} />
          ))}
        </div>
      )}
    </div>
  );
}
