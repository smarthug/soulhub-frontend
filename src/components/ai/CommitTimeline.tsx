type Item = { id: string; message: string; when: string; safety?: 'A'|'B'|'C'|'D' }
export function CommitTimeline({ items }: { items: Item[] }){
  return (
    <ol className="relative border-l pl-6">
      {items.map((it)=> (
        <li key={it.id} className="mb-6">
          <span className="absolute -left-1 top-1 w-3 h-3 rounded-full bg-brand-500" />
          <div className="flex items-center gap-3">
            <code className="text-xs bg-slate-100 px-2 py-1 rounded">{it.id.slice(0,7)}</code>
            <span className="text-sm">{it.message}</span>
            {it.safety && <span className="text-xs px-2 py-0.5 rounded bg-slate-100">Safety {it.safety}</span>}
          </div>
          <div className="text-xs text-slate-500 mt-1">{it.when}</div>
        </li>
      ))}
    </ol>
  )
}
