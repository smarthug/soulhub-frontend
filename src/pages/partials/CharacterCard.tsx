import { Link } from 'react-router-dom'
import { SafetySeal } from '@/components/ai/SafetySeal'

export default function CharacterCard({id, imageSrc}:{id:string, imageSrc?: string}){
  const src = imageSrc ?? '/favicon.svg'

  // const  imageSrc=`/images/characters/char-${i+1}.jpg`
  return (
    <Link to={`/character/${id}`} className="group block border rounded-2xl p-4 hover:shadow-soft transition">
      <div className="aspect-video rounded-xl overflow-hidden mb-3 group-hover:scale-[1.01] transition-transform">
        <img src={src} alt={id} className="w-full h-full object-cover" />
      </div>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold">{id}</h3>
          <p className="text-xs text-slate-500">short description...</p>
        </div>
        <SafetySeal level="B" />
      </div>
    </Link>
  )
}
