import { Link } from 'react-router-dom'
import { Button } from '@/components/common/Button'
import CharacterCard from './partials/CharacterCard'

export default function Home(){
  return (
    <section className="max-w-7xl mx-auto">
      <div className="rounded-2xl p-10 bg-gradient-to-br from-brand-600 to-brand-800 text-white shadow-soft">
        <h1 className="text-4xl font-extrabold">SoulHub</h1>
        <p className="mt-2 text-white/90">The GitHub for AI Characters — 버전 관리 / 검증 / 배포</p>
        <div className="mt-6 flex gap-3">
          <Link to="/explore"><Button>Explore</Button></Link>
          <Link to="/create"><Button variant="ghost" className="bg-white text-brand-700">Create</Button></Link>
        </div>
      </div>

      <h2 className="mt-10 mb-4 text-xl font-semibold">최근 캐릭터</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({length:6}).map((_,i)=> <CharacterCard key={i} id={`char-${i+1}`} />)}
      </div>
    </section>
  )
}
