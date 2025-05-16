import { Player } from '@/types'

export function calculateRank(players: Player[]): Player[] {
  const sorted = [...players].sort((a, b) => b.score - a.score)
  return sorted.map((player, index) => ({
    ...player,
    rank: index + 1,
  }))
}
