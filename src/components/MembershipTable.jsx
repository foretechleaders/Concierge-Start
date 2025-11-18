
export default function MembershipTable() {
  const rows = [
    { plan: 'Basic', desc: 'Updates & newsletter', price: 'Free', perks: '—' },
    { plan: 'Premium', desc: 'Discounts & concierge', price: '$9.99/mo', perks: 'Save 10% on partners' },
    { plan: 'Platinum', desc: 'Priority concierge support', price: '$24.99/mo', perks: 'VIP response' },
  ]
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border rounded-xl overflow-hidden">
        <thead className="bg-vbBlue text-white">
          <tr>
            <th className="text-left p-3">Plan</th>
            <th className="text-left p-3">Description</th>
            <th className="text-left p-3">Price</th>
            <th className="text-left p-3">Perks</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.plan} className="odd:bg-white even:bg-slate-50">
              <td className="p-3 font-semibold">{r.plan}</td>
              <td className="p-3">{r.desc}</td>
              <td className="p-3">{r.price}</td>
              <td className="p-3">{r.perks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
