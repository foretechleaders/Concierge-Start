
export default function Footer() {
  return (
    <footer className="border-t border-slate-200 py-8">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-6 text-sm">
        <div>
          <h3 className="font-semibold text-vbBlue">Virginia Beach Concierge</h3>
          <p className="text-slate-600 mt-2">Connecting locals, vacationers, and world travelers to Virginia Beach.</p>
        </div>
        <div>
          <h4 className="font-semibold">Newsletter</h4>
          <form name="newsletter" method="POST" data-netlify="true" className="mt-2 flex gap-2">
            <input type="hidden" name="form-name" value="newsletter" />
            <input className="border rounded px-3 py-2 flex-1" name="email" type="email" placeholder="Email address" required />
            <button className="bg-vbBlue text-white rounded px-4 py-2">Sign Up</button>
          </form>
        </div>
        <div>
          <h4 className="font-semibold">Follow</h4>
          <ul className="mt-2 space-y-1 text-slate-600">
            <li><a className="underline" href="#">Instagram</a></li>
            <li><a className="underline" href="#">Facebook</a></li>
            <li><a className="underline" href="#">YouTube</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 mt-6 text-xs text-slate-500">&copy; {new Date().getFullYear()} Virginia Beach Concierge. All rights reserved.</div>
    </footer>
  )
}
