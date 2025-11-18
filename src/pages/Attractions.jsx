
import { attractions } from '../data/attractions.js'
import { useState } from 'react'
import { toggleFavorite, isFavorite } from '../utils/favorites.js'

export default function Attractions() {
  const [query, setQuery] = useState('')
  const [favFlag, setFavFlag] = useState(0)

  const filtered = attractions.map(section => ({
    ...section,
    items: section.items.filter(i =>
      [i.name, i.type, (i.tags||[]).join(','), i.desc].join(' ').toLowerCase().includes(query.toLowerCase())
    )
  }))

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-vbBlue">Attractions & Things To Do</h1>
      <input
        value={query}
        onChange={e=>setQuery(e.target.value)}
        placeholder="Search attractions, tags, descriptions..."
        className="mt-4 border rounded px-3 py-2 w-full md:w-1/2"
        aria-label="Search attractions"
      />

      <div className="mt-8 space-y-8">
        {filtered.map(section => (
          <div key={section.category}>
            <h2 className="text-xl font-semibold">{section.category}</h2>
            <div className="grid md:grid-cols-2 gap-4 mt-3">
              {section.items.length ? section.items.map(item => (
                <div key={item.name} className="border rounded-xl p-4 bg-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-slate-600">{item.type}</p>
                    </div>
                    <button
                      className={"px-3 py-1 rounded-full border " + (isFavorite(item.name) ? "bg-vbSky" : "bg-white")}
                      onClick={()=>{ toggleFavorite(item.name); setFavFlag(x=>x+1) }}
                      aria-pressed={isFavorite(item.name)}
                      aria-label="Save to favorites"
                    >
                      {isFavorite(item.name) ? "Saved" : "Save"}
                    </button>
                  </div>
                  <p className="text-slate-700 mt-2">{item.desc}</p>
                  {item.tags?.length ? <p className="text-xs text-slate-500 mt-1">Tags: {item.tags.join(', ')}</p> : null}
                </div>
              )) : <p className="text-slate-500">No results in this category.</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
