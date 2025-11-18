
export default function Events() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-vbBlue">Events Calendar</h1>
      <p className="text-slate-700 mt-2">Upcoming concerts, shows, and local happenings. (API placeholder)</p>

      <div className="mt-6 grid gap-4">
        <div className="border rounded-xl p-4 bg-white">
          <h3 className="font-semibold">Neptune Festival (Sample)</h3>
          <p className="text-sm text-slate-600">Boardwalk — September</p>
        </div>
        <div className="border rounded-xl p-4 bg-white">
          <h3 className="font-semibold">Holiday Lights at the Beach (Sample)</h3>
          <p className="text-sm text-slate-600">Oceanfront — Winter</p>
        </div>
      </div>
    </div>
  )
}
