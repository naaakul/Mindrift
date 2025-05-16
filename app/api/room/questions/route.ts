import { NextResponse } from 'next/server'
import { fetchGeminiQuestions } from '@/lib/gemini'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { topic = 'web3' } = body

    const questions = await fetchGeminiQuestions(topic)

    return NextResponse.json({ questions })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch questions' }, { status: 500 })
  }
}
