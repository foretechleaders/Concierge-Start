
export default function ReviewCard({ username, rating, comment }) {
  const stars = '★★★★★☆☆☆☆☆'.slice(5 - Math.min(5, Number(rating)), 10)
  return (
    <div className="border rounded-xl p-4 bg-white shadow-sm">
      <div className="flex items-center justify-between">
        <strong>{username}</strong>
        <span aria-label={`rating ${rating} of 5`} className="text-yellow-500">{'★'.repeat(rating)}{'☆'.repeat(5-rating)}</span>
      </div>
      <p className="text-slate-700 mt-2">{comment}</p>
    </div>
  )
}
