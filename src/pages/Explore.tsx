import CharacterCard from './partials/CharacterCard'
import Ein from '@/mock/einstein_28years.json'
import Mozz from '@/mock/mozart_28years.json'


const characters = [Ein, Mozz];

export default function Explore(){
  return (
    <section className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Explore</h1>
        <input placeholder="Search characters..." className="border rounded-2xl px-4 py-2" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {characters.map((c, i) => (
          <CharacterCard
            key={i}
            id={c.name}
            imageSrc={`/images/characters/char-${i+1}.jpg`}
          />
        ))}
      </div>
    </section>
  )
}
