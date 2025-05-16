"use client"

import { useState, useEffect } from "react"
import { Timer } from "lucide-react"

interface QuizTimerProps {
  initialTime: number
  onTimeUpdate?: (timeRemaining: number) => void
}

export function QuizTimer({ initialTime, onTimeUpdate }: QuizTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState(initialTime)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        const newTime = Math.max(0, prev - 1)
        if (onTimeUpdate) {
          onTimeUpdate(newTime)
        }
        return newTime
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [onTimeUpdate])

  const minutes = Math.floor(timeRemaining / 60)
  const seconds = timeRemaining % 60

  const getTimerColor = () => {
    if (timeRemaining <= 60) return "text-red-500"
    if (timeRemaining <= 120) return "text-yellow-500"
    return "text-cyan-400"
  }

  return (
    <div className={`flex items-center gap-2 rounded-full bg-gray-800/70 px-3 py-1.5 ${getTimerColor()}`}>
      <Timer className="h-4 w-4" />
      <span className="font-mono text-sm font-medium">
        {minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}
      </span>
    </div>
  )
}
