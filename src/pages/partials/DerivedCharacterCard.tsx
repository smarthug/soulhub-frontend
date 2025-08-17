import { Link } from 'react-router-dom'

type Props = {
  id: string
  name?: string
  image?: string
}

export default function DerivedCharacterCard({ id, name, image }: Props) {
  const src = image ?? '/favicon.svg'

  return (
    <Link to={`/character/${id}`} className="group block border rounded-2xl overflow-hidden hover:shadow-soft transition">
      <div className="aspect-video bg-slate-100">
        <img
          src={src}
          alt={name ?? id}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          onError={(e) => {
            ;(e.currentTarget as HTMLImageElement).src = '/favicon.svg'
          }}
        />
      </div>
      <div className="px-3 py-2">
        <h3 className="font-semibold text-sm truncate">{name ?? id}</h3>
      </div>
    </Link>
  )
}
