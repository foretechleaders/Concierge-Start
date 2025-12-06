
export default function ReviewForm() {
  return (
    <form name="review" method="POST" data-netlify="true" className="grid gap-3 border rounded-xl p-4 bg-white">
      <input type="hidden" name="form-name" value="review" />
      <label className="grid gap-1">
        <span className="text-sm">Username</span>
        <input name="username" required className="border rounded px-3 py-2" />
      </label>
      <label className="grid gap-1">
        <span className="text-sm">Rating (1-5)</span>
        <input name="rating" type="number" min="1" max="5" required className="border rounded px-3 py-2" />
      </label>
      <label className="grid gap-1">
        <span className="text-sm">Comments</span>
        <textarea name="comment" rows="4" required className="border rounded px-3 py-2"></textarea>
      </label>
      <button className="bg-vbBlue text-white rounded px-4 py-2 w-fit">Submit Review</button>
    </form>
  )
}
