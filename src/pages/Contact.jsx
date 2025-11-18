
export default function Contact() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-vbBlue">Contact Us</h1>
      <p className="mt-2 text-slate-700">Have a question or need concierge help? Send us a message.</p>

      <form name="contact" method="POST" data-netlify="true" className="grid gap-3 mt-6 border rounded-xl p-6 bg-white">
        <input type="hidden" name="form-name" value="contact" />
        <label className="grid gap-1">
          <span className="text-sm">Name</span>
          <input className="border rounded px-3 py-2" name="name" required />
        </label>
        <label className="grid gap-1">
          <span className="text-sm">Email</span>
          <input className="border rounded px-3 py-2" type="email" name="email" required />
        </label>
        <label className="grid gap-1">
          <span className="text-sm">Message</span>
          <textarea className="border rounded px-3 py-2" rows="5" name="message" required></textarea>
        </label>
        <button className="bg-vbBlue text-white rounded px-4 py-2 w-fit">Send</button>
      </form>
    </div>
  )
}
