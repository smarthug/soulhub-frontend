export type SafetyLevel = 'A'|'B'|'C'|'D'

export interface Safety {
  level: SafetyLevel
  tags?: string[]
}

export interface Character {
  id: string
  name: string
  description?: string
  safety: Safety
}
