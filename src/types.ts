export type Grade = 'Especial' | '1' | '2' | '3' | '4'

export interface Character {
  id: number
  name: string
  alias: string
  grade: Grade
  technique: string
  affiliation: string
  emoji: string
  description: string
}

export interface CharacterCardProps {
  character: Character
}

export interface GradeBadgeProps {
  grade: Grade
}