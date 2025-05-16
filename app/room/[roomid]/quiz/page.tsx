"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { AlertTriangle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { QuizTimer } from "@/components/quiz-timer"
import Bg from "@/components/ui/background"

const questions = [
  {
    id: 1,
    question: "What is a blockchain?",
    options: [
      "A type of cryptocurrency",
      "A distributed ledger technology",
      "A centralized database",
      "A programming language",
    ],
    correctAnswer: 1,
  },
  {
    id: 2,
    question: "What does NFT stand for?",
    options: [
      "New Financial Transaction",
      "Non-Fungible Token",
      "Network File Transfer",
      "National Fintech Technology",
    ],
    correctAnswer: 1,
  },
  {
    id: 3,
    question: "Which of these is NOT a layer 1 blockchain?",
    options: ["Ethereum", "Solana", "Polygon", "Avalanche"],
    correctAnswer: 2,
  },
  {
    id: 4,
    question: "What is a smart contract?",
    options: [
      "A legal agreement between two parties",
      "Self-executing code on a blockchain",
      "A type of cryptocurrency wallet",
      "A hardware device for storing crypto",
    ],
    correctAnswer: 1,
  },
  {
    id: 5,
    question: "What is the main purpose of a DAO?",
    options: ["To mine cryptocurrency", "To create NFTs", "Decentralized governance", "To validate transactions"],
    correctAnswer: 2,
  },
  {
    id: 6,
    question: "What is DeFi?",
    options: [
      "Decentralized Finance",
      "Digital Financial Instruments",
      "Distributed File Integration",
      "Direct Fund Investment",
    ],
    correctAnswer: 0,
  },
  {
    id: 7,
    question: "What is a gas fee in Ethereum?",
    options: [
      "A fee for exchanging ETH to fiat",
      "The cost to process transactions",
      "A subscription fee for using dApps",
      "A tax on crypto profits",
    ],
    correctAnswer: 1,
  },
  {
    id: 8,
    question: "What is a private key in cryptocurrency?",
    options: [
      "A password to your exchange account",
      "A secret code that allows you to spend your crypto",
      "The blockchain's encryption algorithm",
      "Your wallet address",
    ],
    correctAnswer: 1,
  },
  {
    id: 9,
    question: "What is a 51% attack?",
    options: [
      "When a hacker steals 51% of a cryptocurrency",
      "When 51% of nodes go offline",
      "When one entity controls majority of network hash power",
      "When 51% of users lose their private keys",
    ],
    correctAnswer: 2,
  },
  {
    id: 10,
    question: "What is the purpose of a crypto wallet?",
    options: [
      "To store your cryptocurrencies",
      "To store your private keys",
      "To mine new blocks",
      "To validate transactions",
    ],
    correctAnswer: 1,
  },
]

export default function QuizPage({ params }: { params: { roomId: string } }) {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(Array(questions.length).fill(-1))
  const [showWarning, setShowWarning] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(300) // 5 minutes in seconds

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        setShowWarning(true)
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [])

  useEffect(() => {
    if (timeRemaining <= 0) {
      handleSubmit()
    }
  }, [timeRemaining])

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSelectAnswer = (value: string) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = Number.parseInt(value)
    setSelectedAnswers(newAnswers)
  }

  const handleSubmit = () => {
    router.push(`/results/${params.roomId}`)
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 realtive">
        <Bg/>
      <div className="container mx-auto max-w-3xl px-4 py-8 z-20">
        <div className="mb-6 flex items-center justify-between">
          <div className="text-sm text-zinc-400">
            Question {currentQuestion + 1} of {questions.length}
          </div>
          <QuizTimer initialTime={300} onTimeUpdate={setTimeRemaining} />
        </div>

        {showWarning && (
          <Alert className="mb-6 border-yellow-600/50 bg-yellow-900/20 text-yellow-400">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>Please stay on this tab. Switching tabs may be considered cheating.</AlertDescription>
          </Alert>
        )}

        <Card className="border-zinc-900 bg-black backdrop-blur-lg">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-zinc-200 md:text-2xl">
              {questions[currentQuestion].question}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={selectedAnswers[currentQuestion].toString()}
              onValueChange={handleSelectAnswer}
              className="space-y-3"
            >
              {questions[currentQuestion].options.map((option, index) => (
                <div
                  key={index}
                  className={`flex items-center rounded-lg text-zinc-200 border border-zinc-900 p-4 transition-colors ${
                    selectedAnswers[currentQuestion] === index
                      ? "border-purple-500 bg-purple-500/10"
                      : "hover:border-zinc-700 hover:bg-zinc-800/50"
                  }`}
                >
                  <RadioGroupItem
                    value={index.toString()}
                    id={`option-${index}`}
                    className="border-zinc-600 text-purple-500"
                  />
                  <Label htmlFor={`option-${index}`} className="ml-3 flex-1 cursor-pointer text-base font-medium">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="border-zinc-700 bg-zinc-800 cursor-pointer text-zinc-200 hover:bg-zinc-700"
            >
              Previous
            </Button>

            {currentQuestion < questions.length - 1 ? (
              <Button
                onClick={handleNext}
                disabled={selectedAnswers[currentQuestion] === -1}
                className="bg-zinc-200 cursor-pointer"
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                className="bg-zinc-200 cursor-pointer"
              >
                Submit
              </Button>
            )}
          </CardFooter>
        </Card>

        <div className="mt-6 flex justify-center">
          <div className="flex gap-2">
            {questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestion(index)}
                className={`h-3 w-3 rounded-full ${
                  currentQuestion === index
                    ? "bg-purple-500"
                    : selectedAnswers[index] !== -1
                      ? "bg-zinc-400"
                      : "bg-zinc-700"
                }`}
                aria-label={`Go to question ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(120,119,198,0.15),transparent_65%)]"></div>
    </div>
  )
}
