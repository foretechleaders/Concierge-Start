
import MembershipTable from '../components/MembershipTable.jsx'

export default function Services() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-vbBlue">Featured Services</h1>
      <p className="mt-2 text-slate-700">Search and book popular services. Contact us for custom concierge requests.</p>

      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl border p-6">
          <h2 className="font-semibold text-lg">Concierge</h2>
          <p className="text-slate-600 mt-2">Itineraries, reservations, and local must-dos.</p>
        </div>
        <div id="rentals" className="rounded-2xl border p-6">
          <h2 className="font-semibold text-lg">Rentals</h2>
          <p className="text-slate-600 mt-2">Chairs, umbrellas, coolers, beach games.</p>
        </div>
      </div>

      <h2 className="text-xl font-bold mt-10">Membership</h2>
      <p className="text-slate-600 mt-2">Join for discounts and VIP support.</p>
      <div className="mt-4">
        <MembershipTable />
      </div>
    </div>
  )
}
