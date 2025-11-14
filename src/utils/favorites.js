
const KEY = 'vb_favorites_v1'
export function getFavorites(){ try { return JSON.parse(localStorage.getItem(KEY)) || [] } catch { return [] } }
export function toggleFavorite(name){ const s = new Set(getFavorites()); s.has(name)?s.delete(name):s.add(name); localStorage.setItem(KEY, JSON.stringify([...s])); return [...s] }
export function isFavorite(name){ return new Set(getFavorites()).has(name) }
