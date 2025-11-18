
import { Link, NavLink } from 'react-router-dom'
import { Search } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <header className="bg-white/80 backdrop-blur sticky top-0 z-50 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src="/vbcon-logo.svg" alt="Virginia Beach Concierge logo" className="w-10 h-10" />
          <span className="font-bold text-lg text-vbBlue">Virginia Beach Concierge</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <NavLink to="/" className="hover:text-vbBlue" end>Home</NavLink>
          <NavLink to="/services" className="hover:text-vbBlue">Services</NavLink>
          <NavLink to="/attractions" className="hover:text-vbBlue">Attractions</NavLink>
          <NavLink to="/events" className="hover:text-vbBlue">Events</NavLink>
          <NavLink to="/reviews" className="hover:text-vbBlue">Reviews</NavLink>
          <NavLink to="/about" className="hover:text-vbBlue">About</NavLink>
          <NavLink to="/contact" className="hover:text-vbBlue">Contact</NavLink>
        </nav>
        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              aria-label="Search"
              placeholder="Search attractions, events..."
              className="focus-ring rounded-full border px-4 py-2 w-52 hidden md:block"
            />
            <Search className="absolute right-3 top-2.5 w-4 h-4 text-slate-500 hidden md:block" />
          </div>
          <button
            className="md:hidden px-3 py-2 border rounded-lg"
            onClick={() => setOpen(o=>!o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            Menu
          </button>
        </div>
      </div>
      {open && (
        <div id="mobile-menu" className="md:hidden px-4 pb-3 flex flex-col gap-2 border-t">
          <NavLink to="/" className="py-2" onClick={()=>setOpen(false)} end>Home</NavLink>
          <NavLink to="/services" className="py-2" onClick={()=>setOpen(false)}>Services</NavLink>
          <NavLink to="/attractions" className="py-2" onClick={()=>setOpen(false)}>Attractions</NavLink>
          <NavLink to="/events" className="py-2" onClick={()=>setOpen(false)}>Events</NavLink>
          <NavLink to="/reviews" className="py-2" onClick={()=>setOpen(false)}>Reviews</NavLink>
          <NavLink to="/about" className="py-2" onClick={()=>setOpen(false)}>About</NavLink>
          <NavLink to="/contact" className="py-2" onClick={()=>setOpen(false)}>Contact</NavLink>
        </div>
      )}
    </header>
  )
}
