// src/data/attractionsData.js

const attractions = [
  // OCEANFRONT
  {
    id: 1,
    name: "Virginia Beach Boardwalk",
    category: "Oceanfront",
    position: [36.8427, -75.9754],
    description:
      "A 3-mile oceanfront boardwalk with restaurants, shops, live music, and endless ocean views.",
    imageUrl:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80",
    kidFriendly: true,
    seniorFriendly: true,
    free: true,
    tags: ["Coastal Vibes", "Free", "Walking", "Oceanfront"],
    popularityScore: 98,
    googleMapsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=36.8427,-75.9754",
  },
  {
    id: 2,
    name: "King Neptune Statue",
    category: "Oceanfront",
    position: [36.8490, -75.9770],
    description:
      "An iconic 34-foot bronze statue guarding the boardwalk at Neptune Park.",
    imageUrl:
      "https://images.unsplash.com/photo-1521292270410-a8c53642e9d0?auto=format&fit=crop&w=1200&q=80",
    kidFriendly: true,
    seniorFriendly: true,
    free: true,
    tags: ["Photo Spot", "Landmark", "Free"],
    popularityScore: 90,
    googleMapsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=36.8490,-75.9770",
  },
  {
    id: 3,
    name: "Virginia Beach Fishing Pier",
    category: "Oceanfront",
    position: [36.8375, -75.9759],
    description:
      "Historic pier with ocean views, fishing access, and classic boardwalk vibes.",
    imageUrl:
      "https://images.unsplash.com/photo-1459981051602-04f3e130b29c?auto=format&fit=crop&w=1200&q=80",
    kidFriendly: true,
    seniorFriendly: true,
    free: false,
    tags: ["Fishing", "Oceanfront"],
    popularityScore: 85,
    googleMapsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=36.8375,-75.9759",
  },

  // CHESAPEAKE BAY
  {
    id: 10,
    name: "Chick's Beach",
    category: "Chesapeake Bay",
    position: [36.9164, -76.0827],
    description:
      "Local-favorite bayfront beach with calm waters and laid-back neighborhood feel.",
    imageUrl:
      "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1200&q=80",
    kidFriendly: true,
    seniorFriendly: true,
    free: true,
    tags: ["Chesapeake Bay", "Local Favorite", "Free"],
    popularityScore: 88,
    googleMapsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=36.9164,-76.0827",
  },
  {
    id: 11,
    name: "Lesner Bridge",
    category: "Chesapeake Bay",
    position: [36.912, -76.0767],
    description:
      "Scenic bridge overlooking the Lynnhaven Inlet — perfect for sunsets and photos.",
    imageUrl:
      "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1200&q=80",
    kidFriendly: true,
    seniorFriendly: true,
    free: true,
    tags: ["Scenic View", "Sunsets", "Free"],
    popularityScore: 80,
    googleMapsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=36.912,-76.0767",
  },

  // WILDLIFE VIEWING
  {
    id: 20,
    name: "Little Island Park",
    category: "Wildlife Viewing",
    position: [36.7231, -75.9177],
    description:
      "Oceanfront park with pier, playground, and access to Back Bay and False Cape.",
    imageUrl:
      "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1200&q=80",
    kidFriendly: true,
    seniorFriendly: true,
    free: false,
    tags: ["Fishing", "Parks", "Wildlife"],
    popularityScore: 82,
    googleMapsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=36.7231,-75.9177",
  },
  {
    id: 21,
    name: "False Cape State Park",
    category: "Wildlife Viewing",
    position: [36.6, -75.9],
    description:
      "Remote barrier spit offering hiking, biking, and pristine undeveloped beaches.",
    imageUrl:
      "https://images.unsplash.com/photo-1455212001375-501b7a23c3c1?auto=format&fit=crop&w=1200&q=80",
    kidFriendly: false,
    seniorFriendly: false,
    free: false,
    tags: ["Hiking", "Remote", "Adventure"],
    popularityScore: 78,
    googleMapsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=36.6,-75.9",
  },
  {
    id: 22,
    name: "Back Bay National Wildlife Refuge",
    category: "Wildlife Viewing",
    position: [36.6, -75.918],
    description:
      "Protected coastal habitat with dunes, marshes, and rich bird-watching.",
    imageUrl:
      "https://images.unsplash.com/photo-1457264635001-828d0cbd483e?auto=format&fit=crop&w=1200&q=80",
    kidFriendly: true,
    seniorFriendly: false,
    free: false,
    tags: ["Wildlife", "Birding", "Nature"],
    popularityScore: 84,
    googleMapsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=36.6,-75.918",
  },
  {
    id: 23,
    name: "Sandbridge Beach",
    category: "Wildlife Viewing",
    position: [36.7334, -75.888],
    description:
      "Quieter, more residential stretch of beach south of the resort area.",
    imageUrl:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80",
    kidFriendly: true,
    seniorFriendly: true,
    free: true,
    tags: ["Beach", "Relaxed", "Coastal Vibes", "Free"],
    popularityScore: 87,
    googleMapsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=36.7334,-75.888",
  },

  // AQUARIUM (example)
  {
    id: 30,
    name: "Virginia Aquarium & Marine Science Center",
    category: "Aquarium",
    position: [36.8222, -75.986],
    description:
      "Interactive exhibits, marsh trails, and marine life experiences for all ages.",
    imageUrl:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80",
    kidFriendly: true,
    seniorFriendly: true,
    free: false,
    tags: ["Aquarium", "Indoor", "Family"],
    popularityScore: 95,
    googleMapsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=36.8222,-75.986",
  },
];

export default attractions;
