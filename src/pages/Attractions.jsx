import React, { useState } from "react";
import AttractionsMap from "../components/AttractionsMap";
import attractions from "../data/attractionsData";
import { categories } from "../data/categories";

export default function Attractions() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAttractions = attractions.filter(item => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;

    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-6 text-vbBlue">
        Explore Virginia Beach
      </h1>

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search attractions, restaurants, events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-2/3 p-3 border rounded-lg shadow-sm"
        />
      </div>

      {/* Category Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        <button
          className={`px-4 py-2 rounded-full ${
            selectedCategory === "All" ? "bg-vbBlue text-white" : "bg-gray-200"
          }`}
          onClick={() => setSelectedCategory("All")}
        >
          All
        </button>

        {categories.map((cat) => (
          <button
            key={cat}
            className={`px-4 py-2 rounded-full ${
              selectedCategory === cat ? "bg-vbBlue text-white" : "bg-gray-200"
            }`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Interactive Map */}
      <AttractionsMap attractions={filteredAttractions} />

      {/* List View Under Map */}
      <div className="mt-10 grid md:grid-cols-2 gap-6">
        {filteredAttractions.map((item) => (
          <div key={item.id} className="p-4 rounded-xl border shadow-md">
            <h3 className="text-xl font-bold mb-1">{item.name}</h3>
            <p className="text-gray-600 text-sm">{item.category}</p>
            <p className="mt-2">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
