// src/components/ReviewsPanel.jsx
import React, { useEffect, useState } from "react";

function loadReviews(attractionId) {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(`vb_reviews_${attractionId}`);
  return raw ? JSON.parse(raw) : [];
}

function saveReviews(attractionId, reviews) {
  localStorage.setItem(`vb_reviews_${attractionId}`, JSON.stringify(reviews));
}

export default function ReviewsPanel({ attraction }) {
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);

  useEffect(() => {
    if (attraction) {
      setReviews(loadReviews(attraction.id));
    }
  }, [attraction]);

  if (!attraction) {
    return (
      <div className="mt-6 p-4 border rounded-xl bg-white">
        <p className="text-sm text-gray-600">
          Select an attraction to view and add reviews.
        </p>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;

    const newReview = {
      id: Date.now(),
      name: name.trim(),
      text: text.trim(),
      rating: Number(rating),
      createdAt: new Date().toISOString(),
    };

    const updated = [newReview, ...reviews];
    setReviews(updated);
    saveReviews(attraction.id, updated);

    setName("");
    setText("");
    setRating(5);
  };

  return (
    <div className="mt-6 p-4 border rounded-xl bg-white">
      <h3 className="text-lg font-bold mb-2">
        Reviews for {attraction.name}
      </h3>

      {/* Review form */}
      <form onSubmit={handleSubmit} className="space-y-3 mb-4">
        <div className="flex gap-2">
          <input
            className="flex-1 border rounded px-2 py-1 text-sm"
            placeholder="Your name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <select
            className="border rounded px-2 py-1 text-sm"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>
                {r} ⭐
              </option>
            ))}
          </select>
        </div>
        <textarea
          className="w-full border rounded px-2 py-1 text-sm"
          rows={3}
          placeholder="Share your experience..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          type="submit"
          className="bg-vbBlue text-white text-sm px-3 py-1 rounded-full"
        >
          Submit review
        </button>
      </form>

      {/* Reviews list */}
      {reviews.length === 0 ? (
        <p className="text-sm text-gray-600">No reviews yet. Be the first!</p>
      ) : (
        <ul className="space-y-3 max-h-64 overflow-y-auto">
          {reviews.map((r) => (
            <li key={r.id} className="border rounded-lg p-2 text-sm">
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold">
                  {r.name || "Guest"}
                </span>
                <span className="text-yellow-500 text-xs">
                  {"★".repeat(r.rating)}
                </span>
              </div>
              <p className="text-gray-700">{r.text}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
