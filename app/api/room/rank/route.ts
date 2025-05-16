import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { joinKey } = body

    if (!joinKey) {
      return NextResponse.json({ error: 'Missing joinKey' }, { status: 400 })
    }

    const room = await prisma.room.findUnique({
      where: { joinKey },
      include: {
        players: true,
      },
    })

    if (!room) return NextResponse.json({ error: 'Room not found' }, { status: 404 })

    const ranked = room.players
      .filter(p => p.submitted)
      .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
      .map((player, index) => ({
        rank: index + 1,
        name: player.name,
        walletAddress: player.walletAddress,
        score: player.score,
      }))

    return NextResponse.json({ ranked })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate ranking' }, { status: 500 })
  }
}
