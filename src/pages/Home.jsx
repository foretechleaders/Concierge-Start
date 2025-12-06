import Hero from '../components/Hero.jsx'
import ServiceCard from '../components/ServiceCard.jsx'
import HomeMap from '../components/HomeMap.jsx'   // ✅ REPLACED MapStub
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div>
      <Hero />
      <section className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-6">
        <ServiceCard 
          title="Concierge Services" 
          description="Trip planning, bookings, and custom itineraries." 
          cta={<Link to="/services" className="text-vbBlue underline">Learn more</Link>} 
        />
        <ServiceCard 
          title="Events Calendar" 
          description="Concerts, festivals, and family fun — all in one place." 
          cta={<Link to="/events" className="text-vbBlue underline">See events</Link>} 
        />
        <ServiceCard 
          title="Beach Rentals" 
          description="Chairs, umbrellas, coolers & more for your perfect day." 
          cta={<Link to="/services#rentals" className="text-vbBlue underline">View options</Link>} 
        />
      </section>

      {/* Interactive Map Section */}
      <section className="max-w-6xl mx-auto px-4 pb-12">
        <HomeMap />   {/* ✅ REPLACED <MapStub /> */}
      </section>
    </div>
  )
}
