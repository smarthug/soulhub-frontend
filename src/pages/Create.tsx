import { useState } from 'react'
import { JsonEditor } from '@/components/forms/JsonEditor'
import { Button } from '@/components/common/Button'

const TEMPLATE = `{
  "name": "my-character",
  "persona": "friendly mentor",
  "goals": ["teach", "support"],
  "constraints": ["no personal data"],
  "safety": {"level": "B", "tags": ["language"]}
}`

export default function Create(){
  const [value, setValue] = useState(TEMPLATE)
  return (
    <section className="max-w-5xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Create / Fork Character</h1>
      <JsonEditor value={value} onChange={setValue} />
      <div className="flex gap-2">
        <Button>Validate</Button>
        <Button>Save & Commit</Button>
      </div>
    </section>
  )
}
