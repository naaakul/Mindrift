import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { joinKey, walletAddress, score } = body

    if (!joinKey || !walletAddress || score === undefined) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const room = await prisma.room.findUnique({ where: { joinKey } })
    if (!room) return NextResponse.json({ error: 'Room not found' }, { status: 404 })

    const player = await prisma.player.updateMany({
      where: {
        roomId: room.id,
        walletAddress,
      },
      data: {
        score,
        submitted: true,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to submit score' }, { status: 500 })
  }
}