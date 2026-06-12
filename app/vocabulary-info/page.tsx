import { Sparkles, BookOpen, Volume2, Layers, Repeat, ArrowRight } from "lucide-react"
import Link from "next/link"
import { LandingNav } from "@/components/landing/landing-nav"
import { LandingFooter } from "@/components/landing/landing-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const srsBenefits = [
  {
    icon: Repeat,
    title: "Optimized Review Intervals",
    desc: "The SM-2 algorithm schedules flashcard reviews precisely when you're about to forget them, maximizing long-term memory consolidation.",
  },
  {
    icon: Volume2,
    title: "Native Pronunciation Audio",
    desc: "Listen to native audio for vocabulary items during study to master pronunciation and listening comprehension simultaneously.",
  },
  {
    icon: Layers,
    title: "Interactive Decks",
    desc: "Organize words into custom study decks, track cards mastered, and filter by tags like nouns, verbs, or exam-level categories.",
  },
]

export default function VocabularyInfoPage() {
  return (
    <div className="min-h-svh bg-background flex flex-col justify-between">
      <div>
        <LandingNav />
        <main className="mx-auto max-w-6xl px-4 py-16 md:px-6 lg:py-24">
          <div className="mx-auto max-w-2xl text-center flex flex-col gap-4 animate-fade-up">
            <span className="inline-flex w-fit mx-auto items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-muted-foreground shadow-soft">
              <BookOpen className="size-3.5 text-primary" />
              Spaced Repetition (SRS)
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-balance md:text-5xl">
              Learn vocabulary that sticks
            </h1>
            <p className="text-lg leading-relaxed text-muted-foreground text-pretty">
              Retain thousands of core exam words without endless repeating. Our spaced repetition flashcards handle scheduling automatically.
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {srsBenefits.map((b) => {
              const Icon = b.icon
              return (
                <div
                  key={b.title}
                  className="flex flex-col gap-4 rounded-3xl border border-border bg-card p-6 shadow-soft hover:shadow-soft-lg hover:border-primary/25 transition-all duration-300"
                >
                  <span className="flex size-11 items-center justify-center rounded-2xl bg-secondary text-accent">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="text-lg font-bold text-foreground">{b.title}</h3>
                  <p className="text-sm text-muted-foreground/80 leading-relaxed">{b.desc}</p>
                </div>
              )
            })}
          </div>

          <div className="mt-16 text-center animate-fade-up">
            <Button
              size="lg"
              className="h-12 px-6 text-base font-semibold"
              nativeButton={false}
              render={
                <Link href="/register">
                  Start studying vocabulary
                  <ArrowRight data-icon="inline-end" />
                </Link>
              }
            />
          </div>
        </main>
      </div>
      <LandingFooter />
    </div>
  )
}
