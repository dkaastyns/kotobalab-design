"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Clock, Flag, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { examQuestions } from "@/lib/mock-data"

const TOTAL_SECONDS = 60 * 45 // 45 min mock

export function ExamContent() {
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [flagged, setFlagged] = useState<Set<number>>(new Set())
  const [seconds, setSeconds] = useState(TOTAL_SECONDS)

  useEffect(() => {
    const t = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 0)), 1000)
    return () => clearInterval(t)
  }, [])

  const q = examQuestions[current]
  const answeredCount = Object.keys(answers).length
  const mins = String(Math.floor(seconds / 60)).padStart(2, "0")
  const secs = String(seconds % 60).padStart(2, "0")
  const lowTime = seconds < 300

  function toggleFlag() {
    setFlagged((prev) => {
      const next = new Set(prev)
      if (next.has(current)) next.delete(current)
      else next.add(current)
      return next
    })
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Top exam bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border bg-card p-4 shadow-soft">
        <div className="flex flex-col gap-0.5">
          <span className="text-xs uppercase tracking-wide text-muted-foreground">JLPT N4 — Mock Exam</span>
          <span className="font-semibold">
            {answeredCount} of {examQuestions.length} answered
          </span>
        </div>
        <div
          className={cn(
            "flex items-center gap-2 rounded-full px-4 py-2 font-mono text-lg font-semibold tabular-nums",
            lowTime ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary",
          )}
        >
          <Clock className="size-4" />
          {mins}:{secs}
        </div>
        <Button variant="destructive" asChild>
          <Link href="/dashboard">Submit exam</Link>
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        {/* Question */}
        <Card className="shadow-soft">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="text-lg">Question {current + 1}</CardTitle>
            <Button
              variant={flagged.has(current) ? "default" : "outline"}
              size="sm"
              onClick={toggleFlag}
            >
              <Flag data-icon="inline-start" />
              {flagged.has(current) ? "Flagged" : "Flag"}
            </Button>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <p className="text-pretty text-xl leading-relaxed">{q.prompt}</p>
            <div className="flex flex-col gap-3">
              {q.choices.map((choice, idx) => {
                const chosen = answers[current] === idx
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setAnswers((a) => ({ ...a, [current]: idx }))}
                    className={cn(
                      "flex items-center gap-3 rounded-xl border bg-card p-4 text-left transition-colors hover:border-primary/50 hover:bg-primary/5",
                      chosen && "border-primary bg-primary/5",
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-8 shrink-0 items-center justify-center rounded-lg border text-sm font-semibold",
                        chosen && "border-primary bg-primary text-primary-foreground",
                      )}
                    >
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-lg">{choice}</span>
                  </button>
                )
              })}
            </div>

            <div className="flex items-center justify-between pt-2">
              <Button variant="ghost" disabled={current === 0} onClick={() => setCurrent((c) => c - 1)}>
                <ChevronLeft data-icon="inline-start" />
                Previous
              </Button>
              <Button
                disabled={current === examQuestions.length - 1}
                onClick={() => setCurrent((c) => c + 1)}
              >
                Next
                <ChevronRight data-icon="inline-end" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Palette */}
        <Card className="h-fit shadow-soft">
          <CardHeader>
            <CardTitle className="text-base">Question palette</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Progress value={(answeredCount / examQuestions.length) * 100} />
            <div className="grid grid-cols-5 gap-2">
              {examQuestions.map((_, i) => {
                const answered = answers[i] !== undefined
                const isFlagged = flagged.has(i)
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setCurrent(i)}
                    className={cn(
                      "relative flex size-9 items-center justify-center rounded-lg border text-sm font-medium transition-colors",
                      i === current && "ring-2 ring-primary ring-offset-2 ring-offset-card",
                      answered ? "border-primary bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted",
                    )}
                  >
                    {i + 1}
                    {isFlagged && <Flag className="absolute -right-1 -top-1 size-3 fill-destructive text-destructive" />}
                  </button>
                )
              })}
            </div>
            <div className="flex flex-col gap-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-2">
                <span className="size-3 rounded border border-primary bg-primary/10" /> Answered
              </span>
              <span className="flex items-center gap-2">
                <span className="size-3 rounded border" /> Unanswered
              </span>
              <span className="flex items-center gap-2">
                <Flag className="size-3 fill-destructive text-destructive" /> Flagged for review
              </span>
            </div>
            <Button variant="secondary" className="w-full" asChild>
              <Link href="/dashboard">
                <CheckCircle2 data-icon="inline-start" />
                Review &amp; submit
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
