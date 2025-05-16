import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { joinKey } = body

    if (!joinKey) {
      return NextResponse.json({ error: 'Missing joinKey' }, { status: 400 })
    }

    const room = await prisma.room.update({
      where: { joinKey },
      data: { status: 'started', startedAt: new Date() },
    })

    return NextResponse.json({ room })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to start quiz' }, { status: 500 })
  }
}
