import { useParams } from 'react-router-dom'
import { SafetySeal } from '@/components/ai/SafetySeal'
import { IngredientTable } from '@/components/ai/IngredientTable'
import { CommitTimeline } from '@/components/ai/CommitTimeline'
import { Button } from '@/components/common/Button'

export default function Character(){
  const { id } = useParams()
  return (
    <section className="max-w-5xl mx-auto space-y-6">
      <header className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold">{id}</h1>
          <p className="text-slate-600 mt-1">설명 텍스트 — 캐릭터의 목적/성격/가이드</p>
          <div className="mt-3"><SafetySeal level="B" tags={['language','violence']} /></div>
        </div>
        <div className="flex gap-2">
          <Button>Fork</Button>
          <Button variant="ghost">Run API Demo</Button>
        </div>
      </header>

      <section>
        <h2 className="font-semibold mb-2">Ingredients</h2>
        <IngredientTable rows={[
          {type:'dataset', source:'OpenDialog v1', license:'CC-BY-4.0'},
          {type:'model', source:'LLM-X 8B', license:'Apache-2.0'},
          {type:'prompt', source:'system: role-playing guide'}
        ]} />
      </section>

      <section>
        <h2 className="font-semibold mb-2">Commit History</h2>
        <CommitTimeline items={[
          {id:'a1b2c3d', message:'initial character json', when:'2025-08-14', safety:'B'},
          {id:'e4f5g6h', message:'add safety tags', when:'2025-08-15', safety:'A'},
        ]} />
      </section>
    </section>
  )
}
