"use client"

import { useState } from "react"
import Link from "next/link"
import { Copy, Users, DollarSign, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { toast } from "@/hooks/use-toast"
import Bg from "@/components/ui/background";
import { toast } from "sonner";
import { PlayerList } from "@/components/player-list"

export default function CreateRoomPage() {
  const [roomKey] = useState("WXYZ1234")
  const [topic, setTopic] = useState("Web3")
  const [playersJoined, setPlayersJoined] = useState(1)
  const [totalStake, setTotalStake] = useState(1)

  const copyRoomKey = () => {
    navigator.clipboard.writeText(roomKey)
    toast("Room key copied!",{
      description: "Share this with your friends to join the quiz.",
    })
  }

  const players = [
    { id: 1, name: "You (Host)", stake: 1 },
    { id: 2, name: "CryptoWhale", stake: 1 },
  ]

  return (
    <div className="flex min-h-screen bg-black relative">
      <Bg/>
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-8 lg:grid-cols-3 lg:gap-12">
        <div className="col-span-3">
          <Card className="border-zinc-900 bg-black backdrop-blur-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-zinc-200 md:text-3xl">Create Quiz Room</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400">Room Key</label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 rounded-lg bg-zinc-800 p-3 font-mono text-lg text-zinc-400">{roomKey}</div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={copyRoomKey}
                    className="border-zinc-700 bg-zinc-800 hover:bg-zinc-700 hover:text-cyan-400"
                  >
                    <Copy className="h-4 w-4" />
                    <span className="sr-only">Copy room key</span>
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400">Topic</label>
                <Select defaultValue={topic} onValueChange={setTopic}>
                  <SelectTrigger className="border-zinc-700 bg-zinc-800 text-zinc-400">
                    <SelectValue placeholder="Select a topic" />
                  </SelectTrigger>
                  <SelectContent className="text-zinc-400">
                    <SelectItem value="Web3">Web3</SelectItem>
                    <SelectItem value="Blockchain">Blockchain</SelectItem>
                    <SelectItem value="Crypto">Cryptocurrency</SelectItem>
                    <SelectItem value="NFTs">NFTs</SelectItem>
                    <SelectItem value="DeFi">DeFi</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-xl bg-zinc-800/50 p-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-purple-500/20 p-2">
                      <Users className="h-5 w-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm text-zinc-400">Total Players Joined</p>
                      <p className="text-xl font-bold text-zinc-400">{playersJoined}</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl bg-zinc-800/50 p-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-purple-500/20 p-2">
                      <DollarSign className="h-5 w-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm text-zinc-400">Total Stake</p>
                      <p className="text-xl font-bold text-zinc-400">{totalStake} USDC</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                asChild
                disabled={playersJoined < 2}
                className="w-full bg-white text-black rounded-md text-lg font-semibold hover:opacity-90 transition-opacity"
              >
                <Link href={`/room/${roomKey}`}>
                  Start Quiz
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="col-span-3">
          <PlayerList players={players} />
        </div>
      </div>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(120,119,198,0.15),transparent_65%)]"></div>
    </div>
  )
}
