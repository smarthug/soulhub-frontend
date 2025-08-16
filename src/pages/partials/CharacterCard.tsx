import { Link } from 'react-router-dom'
import { SafetySeal } from '@/components/ai/SafetySeal'

export default function CharacterCard({id}:{id:string}){
  return (
    <Link to={`/character/${id}`} className="group block border rounded-2xl p-4 hover:shadow-soft transition">
      <div className="aspect-video rounded-xl bg-slate-100 mb-3 group-hover:scale-[1.01] transition" />
      <div className="flex items-center justify_between">
        <div>
          <h3 className="font-semibold">{id}</h3>
          <p className="text-xs text-slate-500">short description...</p>
        </div>
        <SafetySeal level="B" />
      </div>
    </Link>
  )
}
