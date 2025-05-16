import { NextResponse } from 'next/server'
import { Keypair, Connection, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction, sendAndConfirmTransaction } from '@solana/web3.js'
import prisma from '@/lib/db'


const DUMMY_PRIVATE_KEY = process.env.DUMMY_PRIVATE_KEY || ''
const payer = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(DUMMY_PRIVATE_KEY)))
const connection = new Connection('https://api.devnet.solana.com', 'confirmed')

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { joinKey } = body

    if (!joinKey) return NextResponse.json({ error: 'Missing joinKey' }, { status: 400 })

    const room = await prisma.room.findUnique({
      where: { joinKey },
      include: { players: true },
    })

    if (!room || room.players.length === 0) return NextResponse.json({ error: 'Invalid room' }, { status: 404 })

    const totalStake = room.players.length
    const sortedPlayers = room.players
      .filter(p => p.submitted)
      .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))

    const rewardMap = [0.5, 0.3, 0.2] 

    for (let i = 0; i < Math.min(3, sortedPlayers.length); i++) {
      const player = sortedPlayers[i]
      const reward = totalStake * rewardMap[i]

      const recipient = new PublicKey(player.walletAddress)
      const lamports = reward * LAMPORTS_PER_SOL 

      const tx = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: payer.publicKey,
          toPubkey: recipient,
          lamports,
        })
      )

      await sendAndConfirmTransaction(connection, tx, [payer])
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to distribute rewards' }, { status: 500 })
  }
}
