export async function fetchGeminiQuestions(topic: string = 'web3') {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) throw new Error('Missing Gemini API key')

  const res = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + apiKey, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: `Generate 10 MCQs related to ${topic}. Each question must have 4 options and the correct answer indicated.`,
            },
          ],
        },
      ],
    }),
  })

  const data = await res.json()
  const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || ''
  return rawText
}
