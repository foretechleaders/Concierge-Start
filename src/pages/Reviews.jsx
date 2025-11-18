
import ReviewCard from '../components/ReviewCard.jsx'
import ReviewForm from '../components/ReviewForm.jsx'
import { useState } from 'react'

export default function Reviews() {
  const [initial] = useState([
    { username: 'Taylor', rating: 5, comment: 'Loved the boardwalk and dolphin tour!' },
    { username: 'Jordan', rating: 4, comment: 'Sandbridge was peaceful — great for families.' },
  ])

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-8">
      <div>
        <h1 className="text-2xl font-bold text-vbBlue">User Reviews</h1>
        <div className="mt-4 space-y-3">
          {initial.map((r,i)=>(<ReviewCard key={i} {...r} />))}
        </div>
      </div>
      <div>
        <h2 className="text-xl font-semibold">Add Your Review</h2>
        <p className="text-slate-600 text-sm mt-1">Your review helps others plan their visit.</p>
        <div className="mt-3">
          <ReviewForm />
        </div>
      </div>
    </div>
  )
}
