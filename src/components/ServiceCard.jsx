
export default function ServiceCard({ title, description, cta }) {
  return (
    <div className="rounded-2xl shadow-md p-5 bg-white border">
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-slate-600 mt-2">{description}</p>
      {cta && <div className="mt-4">{cta}</div>}
    </div>
  )
}
