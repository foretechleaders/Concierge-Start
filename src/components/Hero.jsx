
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="relative">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526481280698-8fcc13fd87de?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center" aria-hidden="true"></div>
      <div className="relative bg-black/40">
        <div className="max-w-6xl mx-auto px-4 py-24 text-white">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-extrabold"
          >
            Connecting Locals, Vacationers, and World Travelers to Virginia Beach
          </motion.h1>
          <p className="mt-4 text-lg max-w-2xl">
            Coastal Virginia Beach is teeming with attractions and activities for everyone! Start your adventure here.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/attractions" className="bg-vbSky text-slate-900 rounded-full px-5 py-3 font-semibold">Explore Attractions</Link>
            <Link to="/events" className="bg-white text-slate-900 rounded-full px-5 py-3 font-semibold">See What's Happening</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
