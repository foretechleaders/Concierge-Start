
export default function MapEmbed({ query = 'Virginia Beach' }) {
  const key = import.meta.env.VITE_GOOGLE_MAPS_KEY
  const src = `https://www.google.com/maps/embed/v1/place?key=${key}&q=${encodeURIComponent(query)}`
  return (
    <div className="rounded-2xl border bg-white">
      <iframe
        title="Google Map"
        src={src}
        className="w-full h-[420px] rounded-2xl"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
      />
      <noscript><div className="p-4 text-slate-700">Enable JavaScript to view the map.</div></noscript>
    </div>
  )
}
