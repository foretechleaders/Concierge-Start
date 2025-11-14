
import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="relative">
      <div className="absolute inset-0 bg-[url('/home-bg.jpg')] bg-cover bg-center" aria-hidden="true"></div>
      <div className="relative bg-black/40">
        <div className="max-w-6xl mx-auto px-4 py-24 text-white">
          <h1 className="text-3xl md:text-5xl font-extrabold">
            Connecting Locals, Vacationers, and World Travelers to Virginia Beach
          </h1>
          <p className="mt-4 text-lg max-w-2xl">
            Coastal Virginia Beach is teeming with attractions and activities for everyone! Start your adventure here.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/attractions" className="bg-vbOrange text-slate-900 rounded-full px-5 py-3 font-semibold">Explore Attractions</Link>
            <Link to="/events" className="bg-white text-slate-900 rounded-full px-5 py-3 font-semibold">See What's Happening</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
