
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <div className="min-h-screen bg-[url('/sand-dune.jpg')] bg-cover bg-center bg-fixed text-slate-900 flex flex-col">
      <div className="bg-white/80 backdrop-blur-sm flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  )
}
