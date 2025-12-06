
import { Link } from 'react-router-dom'
export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center text-center px-4">
      <div>
        <h1 className="text-3xl font-bold text-vbBlue">Page not found</h1>
        <p className="mt-2 text-slate-700">The page you’re looking for doesn’t exist.</p>
        <Link to="/" className="underline text-vbBlue mt-4 inline-block">Go Home</Link>
      </div>
    </div>
  )
}
