import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Home} from "lucide-react"
import Bg from "@/components/ui/background"

// export default function ResultsPage({ params }: { params: { roomId: string } }) {
export default function ResultsPage() {
  const players = [
    { id: 1, name: "You (Host)", rank: 1, score: 8, prize: 1.2 },
    { id: 2, name: "CryptoWhale", rank: 2, score: 7, prize: 0.8 },
  ]

  const userRank = 1
  const totalPlayers = players.length

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 realtive">
        <Bg/>
      <div className="container mx-auto max-w-3xl px-4 py-8 z-20">
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-purple-500/20 p-4">
              <Trophy className="h-10 w-10 text-purple-400" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white md:text-4xl">Quiz Results</h1>
          <p className="mt-2 text-xl text-purple-300">
            You ranked #{userRank} out of {totalPlayers}
          </p>
        </div>

        <Card className="mb-8 border-zinc-900 bg-black backdrop-blur-lg">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-white">Leaderboard</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-zinc-900">
              <div className="grid grid-cols-4 gap-4 border-b border-zinc-900 bg-zinc-800/50 p-4 text-sm font-medium text-zinc-400">
                <div>Rank</div>
                <div className="col-span-2">Player</div>
                <div className="text-right">Prize</div>
              </div>

              {players.map((player) => (
                <div
                  key={player.id}
                  className={`grid grid-cols-4 gap-4 border-b border-zinc-900 p-4 last:border-0 ${
                    player.rank === 1 ? "bg-yellow-500/5" : ""
                  }`}
                >
                  <div className="flex items-center">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full ${
                        player.rank === 1
                          ? "bg-yellow-500/20 text-yellow-400"
                          : player.rank === 2
                            ? "bg-zinc-400/20 text-zinc-400"
                            : player.rank === 3
                              ? "bg-amber-700/20 text-amber-700"
                              : "bg-zinc-700/20 text-zinc-500"
                      }`}
                    >
                      {player.rank}
                    </div>
                  </div>
                  <div className="col-span-2 flex items-center font-medium text-white">
                    {player.name}
                    {player.name.includes("You") && (
                      <span className="ml-2 rounded-full bg-purple-500/20 px-2 py-0.5 text-xs text-purple-400">
                        You
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-end font-medium">{player.prize} USDC</div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 sm:flex-row">
            <Button
              asChild
              variant="outline"
              className="flex-1 border-zinc-950 bg-zinc-800 text-white hover:bg-zinc-700"
            >
              <Link href="/lobby">
                <Home className="mr-2 h-4 w-4" />
                Back to Lobby
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(120,119,198,0.15),transparent_65%)]"></div>
    </div>
  )
}
