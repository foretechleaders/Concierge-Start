
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Search } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  // Transparent on home, solid on others for readability
  const headerClass = isHome
    ? "absolute top-0 left-0 right-0 z-50 bg-transparent"
    : "sticky top-0 z-50 bg-white/85 backdrop-blur border-b border-slate-200"

  return (
    <header className={headerClass}>
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="Virginia Beach Concierge logo" className="w-10 h-10" />
          <span className={"font-bold text-lg " + (isHome ? "text-white drop-shadow" : "text-slate-900")}>Virginia Beach Concierge</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <NavLink to="/" className={({isActive}) => (isHome ? "text-white hover:opacity-90" : "hover:text-vbOrange") } end>Home</NavLink>
          <NavLink to="/services" className={({isActive}) => (isHome ? "text-white hover:opacity-90" : "hover:text-vbOrange") }>Services</NavLink>
          <NavLink to="/attractions" className={({isActive}) => (isHome ? "text-white hover:opacity-90" : "hover:text-vbOrange") }>Attractions</NavLink>
          <NavLink to="/events" className={({isActive}) => (isHome ? "text-white hover:opacity-90" : "hover:text-vbOrange") }>Events</NavLink>
          <NavLink to="/reviews" className={({isActive}) => (isHome ? "text-white hover:opacity-90" : "hover:text-vbOrange") }>Reviews</NavLink>
          <NavLink to="/about" className={({isActive}) => (isHome ? "text-white hover:opacity-90" : "hover:text-vbOrange") }>About</NavLink>
          <NavLink to="/contact" className={({isActive}) => (isHome ? "text-white hover:opacity-90" : "hover:text-vbOrange") }>Contact</NavLink>
        </nav>
        <div className="flex items-center gap-3">
          <div className="relative hidden md:block">
            <input
              aria-label="Search"
              placeholder="Search attractions, events..."
              className={"focus:ring rounded-full border px-4 py-2 w-52 " + (isHome ? "bg-white/90" : "")}
            />
            <Search className={"absolute right-3 top-2.5 w-4 h-4 " + (isHome ? "text-slate-700" : "text-slate-500")} />
          </div>
          <button
            className={"md:hidden px-3 py-2 border rounded-lg " + (isHome ? "text-white border-white/70" : "")}
            onClick={() => setOpen(o=>!o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            Menu
          </button>
        </div>
      </div>
      {open && (
        <div id="mobile-menu" className={"md:hidden px-4 pb-3 flex flex-col gap-2 " + (isHome ? "bg-black/40 text-white" : "border-t")}>
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
