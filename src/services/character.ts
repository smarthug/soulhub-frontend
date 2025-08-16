import type { Character } from '@/types'

export async function listCharacters(): Promise<Character[]> {
  // TODO: Actual API integration
  return [
    { id:'char-1', name:'mentor', safety:{ level:'B', tags:['language'] } },
    { id:'char-2', name:'trader', safety:{ level:'C', tags:['gambling'] } },
  ]
}
