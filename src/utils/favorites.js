
const KEY = 'vb_favorites_v1'

export function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || []
  } catch {
    return []
  }
}

export function toggleFavorite(name) {
  const favs = new Set(getFavorites())
  if (favs.has(name)) favs.delete(name)
  else favs.add(name)
  localStorage.setItem(KEY, JSON.stringify([...favs]))
  return [...favs]
}

export function isFavorite(name) {
  return new Set(getFavorites()).has(name)
}
