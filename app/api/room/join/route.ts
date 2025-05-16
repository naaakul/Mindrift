import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { joinKey, playerName, walletAddress } = body

    if (!joinKey || !playerName || !walletAddress) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const room = await prisma.room.findUnique({
      where: { joinKey },
      include: { players: true },
    })

    if (!room) {
      return NextResponse.json({ error: 'Room not found' }, { status: 404 })
    }

    if (room.status !== 'waiting') {
      return NextResponse.json({ error: 'Quiz already started' }, { status: 403 })
    }

    const alreadyJoined = room.players.some(p => p.walletAddress === walletAddress)

    if (alreadyJoined) {
      return NextResponse.json({ error: 'Player already joined' }, { status: 409 })
    }

    const player = await prisma.player.create({
      data: {
        name: playerName,
        walletAddress,
        roomId: room.id,
      },
    })

    return NextResponse.json({ player })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to join room' }, { status: 500 })
  }
}
