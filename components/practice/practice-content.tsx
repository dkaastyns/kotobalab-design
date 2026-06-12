"use client"

import { useState } from "react"
import Link from "next/link"
import { Check, X, Sparkles, ArrowRight, Bookmark, Lightbulb, RotateCcw, BookOpen, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { practiceQuestion as q } from "@/lib/mock-data"

export function PracticeContent() {
  const [selected, setSelected] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const isCorrect = selected === q.correct

  function reset() {
    setSelected(null)
    setSubmitted(false)
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
      {/* Progress header */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{q.level}</Badge>
            <Badge variant="outline">{q.difficulty}</Badge>
          </div>
          <span className="text-sm text-muted-foreground">
            Question {q.number} of {q.total}
          </span>
        </div>
        <Progress value={(q.number / q.total) * 100} />
      </div>

      {/* Question card */}
      <Card className="shadow-soft">
        <CardHeader className="flex flex-row items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <CardTitle className="text-pretty text-2xl leading-snug">{q.prompt}</CardTitle>
            <p className="text-sm text-muted-foreground">{q.instruction}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Bookmark question"
            onClick={() => setBookmarked((b) => !b)}
          >
            <Bookmark className={cn(bookmarked && "fill-primary text-primary")} />
          </Button>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {q.choices.map((c) => {
            const chosen = selected === c.id
            const correct = c.id === q.correct
            const showState = submitted && (correct || chosen)
            return (
              <button
                key={c.id}
                type="button"
                disabled={submitted}
                onClick={() => setSelected(c.id)}
                className={cn(
                  "flex items-center gap-4 rounded-xl border bg-card p-4 text-left transition-colors",
                  !submitted && "hover:border-primary/50 hover:bg-primary/5",
                  chosen && !submitted && "border-primary bg-primary/5",
                  showState && correct && "border-[oklch(0.6_0.13_155)] bg-[oklch(0.95_0.04_155)]",
                  showState && chosen && !correct && "border-destructive bg-destructive/5",
                )}
              >
                <span
                  className={cn(
                    "flex size-9 shrink-0 items-center justify-center rounded-lg border font-semibold uppercase",
                    chosen && !submitted && "border-primary text-primary",
                    showState && correct && "border-[oklch(0.6_0.13_155)] text-[oklch(0.45_0.12_155)]",
                    showState && chosen && !correct && "border-destructive text-destructive",
                  )}
                >
                  {showState && correct ? (
                    <Check className="size-4" />
                  ) : showState && chosen && !correct ? (
                    <X className="size-4" />
                  ) : (
                    c.id
                  )}
                </span>
                <span className="flex flex-col">
                  <span className="text-lg font-medium">{c.label}</span>
                  <span className="text-sm text-muted-foreground">{c.text}</span>
                </span>
              </button>
            )
          })}
        </CardContent>
      </Card>

      {/* Action bar */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={reset} disabled={!submitted}>
          <RotateCcw data-icon="inline-start" />
          Reset
        </Button>
        {!submitted ? (
          <Button disabled={!selected} onClick={() => setSubmitted(true)}>
            Check answer
            <ArrowRight data-icon="inline-end" />
          </Button>
        ) : (
          <Button asChild>
            <Link href="/practice">
              Next question
              <ArrowRight data-icon="inline-end" />
            </Link>
          </Button>
        )}
      </div>

      {/* Feedback + explanation */}
      {submitted && (
        <div className="flex flex-col gap-4">
          <Card
            className={cn(
              "shadow-soft",
              isCorrect
                ? "border-[oklch(0.6_0.13_155)]/40 bg-[oklch(0.97_0.02_155)]"
                : "border-destructive/40 bg-destructive/5",
            )}
          >
            <CardContent className="flex items-start gap-3 p-5">
              <div
                className={cn(
                  "flex size-9 shrink-0 items-center justify-center rounded-full",
                  isCorrect ? "bg-[oklch(0.6_0.13_155)] text-white" : "bg-destructive text-white",
                )}
              >
                {isCorrect ? <Check className="size-5" /> : <X className="size-5" />}
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-semibold">{isCorrect ? "Correct!" : "Not quite"}</p>
                <p className="text-sm leading-relaxed text-muted-foreground">{q.explanation}</p>
              </div>
            </CardContent>
          </Card>

          {/* AI explanation */}
          <Card className="border-primary/20 bg-primary/5 shadow-soft">
            <CardHeader className="flex-row items-center gap-2 pb-2">
              <div className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Sparkles className="size-4" />
              </div>
              <CardTitle className="text-base">AI explanation</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <p className="text-sm leading-relaxed text-muted-foreground">{q.aiExplanation}</p>
              <Separator />
              <div className="grid gap-4 sm:grid-cols-3">
                <RelatedList icon={Lightbulb} title="Grammar" items={q.relatedGrammar} />
                <RelatedList icon={BookOpen} title="Vocabulary" items={q.relatedVocabulary} />
                <RelatedList icon={Zap} title="Practice next" items={q.suggestedPractice} />
              </div>
              <Button variant="outline" size="sm" className="w-fit" asChild>
                <Link href="/tutor">
                  <Sparkles data-icon="inline-start" />
                  Ask the tutor a follow-up
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

function RelatedList({
  icon: Icon,
  title,
  items,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  items: string[]
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        <Icon className="size-3.5" />
        {title}
      </div>
      <ul className="flex flex-col gap-1.5">
        {items.map((it) => (
          <li key={it} className="text-sm leading-snug">
            {it}
          </li>
        ))}
      </ul>
    </div>
  )
}
