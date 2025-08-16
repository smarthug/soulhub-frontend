import type { Character } from '@/types'

export async function listCharacters(): Promise<Character[]> {
  // TODO: 실제 API 연동
  return [
    { id:'char-1', name:'mentor', safety:{ level:'B', tags:['language'] } },
    { id:'char-2', name:'trader', safety:{ level:'C', tags:['gambling'] } },
  ]
}
