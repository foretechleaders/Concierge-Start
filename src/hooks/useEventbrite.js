
import { useEffect, useState } from 'react'
export default function useEventbrite(query = 'Virginia Beach'){
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  useEffect(()=>{
    const token = import.meta.env.VITE_EVENTBRITE_TOKEN
    if(!token){ setLoading(false); return }
    const url = new URL('https://www.eventbriteapi.com/v3/events/search/')
    url.searchParams.set('location.address', query)
    url.searchParams.set('sort_by', 'date')
    url.searchParams.set('include_all_series_instances', 'yes')
    fetch(url, { headers: { Authorization: `Bearer ${token}` } })
      .then(r=>{ if(!r.ok) throw new Error('Failed to fetch Eventbrite'); return r.json() })
      .then(d=>{ setEvents((d.events||[]).slice(0,12)); setLoading(false) })
      .catch(e=>{ setError(e.message||'Error'); setLoading(false) })
  },[query])
  return { events, loading, error }
}
