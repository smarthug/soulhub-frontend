type Props = { level: 'A'|'B'|'C'|'D'; tags?: string[] }
export function SafetySeal({ level, tags=[] }: Props){
  const color = {
    A: 'bg-emerald-500',
    B: 'bg-yellow-500',
    C: 'bg-orange-500',
    D: 'bg-red-600',
  }[level]
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-white text-xs">
      <span className={`w-2 h-2 rounded-full ${color}`} />
      <span>Safety {level}</span>
      {tags.length>0 && <span className="text-[10px] opacity-80">({tags.join(', ')})</span>}
    </div>
  )
}
