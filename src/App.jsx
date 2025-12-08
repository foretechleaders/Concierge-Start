import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  const [bannerVisible, setBannerVisible] = useState(true)

  // Check if banner was dismissed previously
  useEffect(() => {
    const dismissed = localStorage.getItem("bannerDismissed")
    if (dismissed === "true") {
      setBannerVisible(false)
    }
  }, [])

  // Handle dismiss click
  const dismissBanner = () => {
    setBannerVisible(false)
    localStorage.setItem("bannerDismissed", "true")
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">

      {/* ----------------------------------- */}
      {/* 🚧 Under Construction Banner        */}
      {/* ----------------------------------- */}
      {bannerVisible && (
        <div
          className="
            bg-yellow-300 text-black font-bold 
            text-center py-3 px-4 border-b-2 border-gray-700 
            flex items-center justify-center gap-3 sticky top-0 z-50
            animate-slideDown
          "
        >
          <span>🚧 This site is currently under construction. More coming soon! 🚧</span>
          <button
            onClick={dismissBanner}
            className="ml-4 bg-black text-yellow-300 px-3 py-1 rounded hover:bg-gray-800 transition"
          >
            Close ✖
          </button>
        </div>
      )}

      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}
