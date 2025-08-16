import CharacterCard from './partials/CharacterCard'

export default function Explore(){
  return (
    <section className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Explore</h1>
        <input placeholder="Search characters..." className="border rounded-2xl px-4 py-2" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {Array.from({length:9}).map((_,i)=> <CharacterCard key={i} id={`char-${i+1}`} />)}
      </div>
    </section>
  )
}
