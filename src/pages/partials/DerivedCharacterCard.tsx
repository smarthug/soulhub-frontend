import React from 'react'

type Props = {
  id: string
  name: string
  summary?: string
  author?: string
  forkedFrom?: string
  tags?: string[]
  image?: string
}

export default function DerivedCharacterCard({
  id,
  name,
  summary,
  author,
  forkedFrom,
  tags = [],
  image,
}: Props) {
  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm flex flex-col">
      <div className="flex items-start gap-3">
        <div className="w-16 h-16 bg-slate-100 rounded-md overflow-hidden flex-shrink-0">
          {image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={image} alt={name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm">IMG</div>
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">{name}</h3>
            <div className="text-sm text-slate-500">#{id.slice(0, 6)}</div>
          </div>
          {summary && <p className="text-sm text-slate-600 mt-2">{summary}</p>}
          <div className="mt-3 flex items-center gap-2 flex-wrap">
            {tags.map((t) => (
              <span key={t} className="text-xs px-2 py-1 bg-slate-100 rounded">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="text-xs text-slate-500">
          {author && <div>By {author}</div>}
          {forkedFrom && <div className="mt-1">Forked from {forkedFrom}</div>}
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 rounded bg-slate-100 text-sm">View</button>
          <button className="px-3 py-1 rounded bg-brand-600 text-white text-sm">Fork</button>
        </div>
      </div>
    </div>
  )
}
