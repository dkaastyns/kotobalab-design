import {
  Bot,
  Target,
  CalendarCheck,
  BarChart3,
  BookOpenCheck,
  Layers,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const features = [
  {
    icon: BookOpenCheck,
    title: "Smart practice",
    desc: "Adaptive question sets that focus on your weak spots across vocabulary, grammar, reading, and kanji.",
  },
  {
    icon: Bot,
    title: "AI explanations",
    desc: "Instant, friendly breakdowns of any question, grammar point, or kanji — like a tutor on demand.",
  },
  {
    icon: Layers,
    title: "Spaced repetition",
    desc: "Flashcards scheduled by a proven SRS algorithm so you review exactly when you're about to forget.",
  },
  {
    icon: BarChart3,
    title: "Deep analytics",
    desc: "Heatmaps, accuracy trends, and weakness detection turn your study time into clear progress.",
  },
  {
    icon: Target,
    title: "Exam readiness",
    desc: "Full mock exams for JLPT N5–N2 and TOEFL with realistic timing and detailed scoring.",
  },
  {
    icon: CalendarCheck,
    title: "Study planner",
    desc: "A weekly plan that adapts to your goals and keeps your streak alive without burnout.",
  },
]

export function LandingFeatures() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-4 py-16 md:px-6 lg:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-balance md:text-4xl">
          Everything you need to learn faster
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty">
          A complete toolkit built around focus, retention, and steady progress.
        </p>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => {
          const Icon = f.icon
          return (
            <Card key={f.title} className="border-border/70 shadow-soft transition-all hover:-translate-y-1 hover:shadow-soft-lg">
              <CardHeader>
                <span className="flex size-11 items-center justify-center rounded-2xl bg-secondary text-accent">
                  <Icon className="size-5" />
                </span>
                <CardTitle className="mt-3 text-xl">{f.title}</CardTitle>
                <CardDescription className="leading-relaxed">{f.desc}</CardDescription>
              </CardHeader>
            </Card>
          )
        })}
      </div>

      <div className="mt-10 flex justify-center">
        <Button variant="outline" size="lg" className="h-11 px-5" render={
          <Link href="/register">
            Try it free
            <ArrowRight data-icon="inline-end" />
          </Link>
        } />
      </div>
    </section>
  )
}
