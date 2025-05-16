import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
// import prisma from '@/lib/db'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { topic = 'web3', hostWallet } = body

    if (!hostWallet) {
      return NextResponse.json({ error: 'Missing host wallet address' }, { status: 400 })
    }

    const joinKey = uuidv4().slice(0, 8).toUpperCase()

    const room = await prisma.room.create({
      data: {
        joinKey,
        topic,
        hostWallet,
        status: 'waiting',
      },
    })

    return NextResponse.json({ room })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create room' }, { status: 500 })
  }
}
