
import useEventbrite from '../hooks/useEventbrite.js'
function EventCard({ e }){
  const start = e.start?.local ? new Date(e.start.local) : null
  const when = start ? start.toLocaleString() : 'TBA'
  return (
    <div className="border rounded-xl p-4 bg-white hover:shadow-sm transition">
      <h3 className="font-semibold">{e.name?.text || 'Untitled Event'}</h3>
      <p className="text-sm text-slate-600 mt-1">{when}</p>
      <a className="text-vbTeal underline mt-2 inline-block" href={e.url} target="_blank" rel="noreferrer">View Event</a>
    </div>
  )
}
export default function Events(){
  const { events, loading, error } = useEventbrite('Virginia Beach')
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-vbTeal">Events Calendar</h1>
      <p className="text-slate-700 mt-2">Upcoming concerts, shows, and local happenings.</p>
      {loading && <div className="mt-6 text-slate-600">Loading events...</div>}
      {error && <div className="mt-6 text-red-600">Could not load events.</div>}
      {!loading && !error && events.length === 0 && <div className="mt-6 text-slate-600">No upcoming events found right now.</div>}
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {events.map(e => <EventCard key={e.id} e={e} />)}
      </div>
    </div>
  )
}
