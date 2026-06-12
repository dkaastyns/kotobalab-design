import { Sparkles, GraduationCap, CheckCircle2, ArrowRight } from "lucide-react"
import Link from "next/link"
import { LandingNav } from "@/components/landing/landing-nav"
import { LandingFooter } from "@/components/landing/landing-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const levels = [
  {
    level: "N5",
    title: "Basic / Beginner",
    desc: "Understand basic Japanese. Master Hiragana, Katakana, ~100 Kanji, and ~800 vocabulary words.",
  },
  {
    level: "N4",
    title: "Elementary",
    desc: "Listen and read everyday conversations. Master ~300 Kanji, and ~1,500 vocabulary words.",
  },
  {
    level: "N3",
    title: "Intermediate",
    desc: "Bridge to natural speech. Understand news summaries, master ~650 Kanji, and ~3,700 vocabulary words.",
  },
  {
    level: "N2",
    title: "Upper-Intermediate",
    desc: "Fluent everyday reading/writing. Understand editorials, master ~1,000 Kanji, and ~6,000 vocabulary words.",
  },
]

export default function JlptInfoPage() {
  return (
    <div className="min-h-svh bg-background flex flex-col justify-between">
      <div>
        <LandingNav />
        <main className="mx-auto max-w-6xl px-4 py-16 md:px-6 lg:py-24">
          <div className="mx-auto max-w-2xl text-center flex flex-col gap-4 animate-fade-up">
            <span className="inline-flex w-fit mx-auto items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-muted-foreground shadow-soft">
              <GraduationCap className="size-3.5 text-primary" />
              JLPT N5–N2 Course
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-balance md:text-5xl">
              Master the Japanese Language
            </h1>
            <p className="text-lg leading-relaxed text-muted-foreground text-pretty">
              A structured, scientific track designed to take you from absolute beginner (N5) to upper-intermediate fluency (N2).
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 max-w-4xl mx-auto">
            {levels.map((lvl) => (
              <Card
                key={lvl.level}
                className="border border-border/80 bg-card p-6 shadow-soft hover:shadow-soft-lg hover:border-primary/25 transition-all duration-300 rounded-2xl flex flex-col justify-between"
              >
                <CardContent className="p-0 flex items-start gap-4">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary font-bold font-display text-lg shrink-0">
                    {lvl.level}
                  </span>
                  <div className="flex flex-col gap-1">
                    <h3 className="font-bold text-foreground text-base leading-snug">{lvl.title}</h3>
                    <p className="text-sm text-muted-foreground/80 leading-relaxed mt-1">{lvl.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 border-t border-primary/5 pt-12 max-w-3xl mx-auto flex flex-col gap-6">
            <h2 className="text-xl font-bold text-foreground text-center">What you will practice</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                "Active Grammar Conjugation",
                "Spaced Vocabulary Quizzes",
                "Kanji Stroke Animations",
                "Listening Audio Exercises",
                "Full-length timed mock tests",
                "Instant AI tutor breakdowns",
              ].map((f) => (
                <div key={f} className="flex items-center gap-2.5 text-sm font-medium text-foreground/80">
                  <CheckCircle2 className="size-4.5 text-[oklch(0.5_0.09_155)] shrink-0" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center animate-fade-up">
            <Button
              size="lg"
              className="h-12 px-6 text-base font-semibold"
              nativeButton={false}
              render={
                <Link href="/register">
                  Start JLPT Prep
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
