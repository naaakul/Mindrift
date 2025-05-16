import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users } from "lucide-react"

interface Player {
  id: number
  name: string
  stake: number
}

interface PlayerListProps {
  players: Player[]
}

export function PlayerList({ players }: PlayerListProps) {
  return (
    <Card className="border-zinc-800 bg-black backdrop-blur-lg">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-lg font-bold text-zinc-200">
          <Users className="mr-2 h-5 w-5 text-zinc-200" />
          Players
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-zinc-800">
          <div className="grid grid-cols-3 gap-4 border-b border-zinc-800 bg-zinc-800/50 p-3 text-sm font-medium text-zinc-400">
            <div className="col-span-2">Player</div>
            <div className="text-right">Stake</div>
          </div>

          {players.map((player) => (
            <div key={player.id} className="grid grid-cols-3 gap-4 border-b border-zinc-800 p-3 last:border-0">
              <div className="col-span-2 font-medium text-zinc-400">
                {player.name}
                {player.name.includes("You") && (
                  <span className="ml-2 rounded-full bg-purple-500/20 px-2 py-0.5 text-xs text-purple-400">You</span>
                )}
              </div>
              <div className="text-right font-medium text-purple-400">{player.stake} USDC</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
