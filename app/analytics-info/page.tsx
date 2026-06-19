"use client"

import { Sparkles, BarChart3, Target, GraduationCap, ArrowRight } from "lucide-react"
import Link from "next/link"
import { LandingNav } from "@/components/landing/landing-nav"
import { LandingFooter } from "@/components/landing/landing-footer"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { CircularProgress } from "@/components/circular-progress"
import { AnimatedCounter } from "@/components/shared/animated-counter"
import { MagneticButton } from "@/components/shared/magnetic-button"

const mockWeakAreas = [
  { area: "Kanji Readings (N3)", accuracy: 52 },
  { area: "Conditionals (~tara, ~ba)", accuracy: 58 },
  { area: "Listening (Fast speech)", accuracy: 64 },
]

export default function AnalyticsInfoPage() {
  return (
    <div className="min-h-svh bg-background flex flex-col justify-between">
      <div>
        <LandingNav />
        <main className="mx-auto max-w-6xl px-4 py-16 md:px-6 lg:py-24">
          <div className="mx-auto max-w-2xl text-center flex flex-col gap-4 animate-fade-up">
            <span className="inline-flex w-fit mx-auto items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-muted-foreground shadow-soft">
              <Sparkles className="size-3.5 text-primary" />
              Advanced Analytics
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-balance md:text-5xl">
              Turn study hours into clear progress
            </h1>
            <p className="text-lg leading-relaxed text-muted-foreground text-pretty">
              Our backend monitors every question you attempt to calculate exam readiness and detect weak sub-topics.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
            {/* Exam Readiness Rings */}
            <Card className="shadow-soft border-border/80 rounded-2xl flex flex-col justify-between">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <GraduationCap className="size-4 text-primary" /> JLPT Readiness
                </CardTitle>
                <CardDescription className="text-xs">Projected exam score readiness</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center py-6 gap-4">
                <CircularProgress value={74} label="N3" />
                <p className="text-xs text-muted-foreground text-center">
                  Recommended target: 80% readiness to pass safely.
                </p>
              </CardContent>
            </Card>

            {/* Weak Areas Detection */}
            <Card className="shadow-soft border-border/80 rounded-2xl">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Target className="size-4 text-accent" /> Weak Areas
                </CardTitle>
                <CardDescription className="text-xs">Dynamic target priority list</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4 pt-4">
                {mockWeakAreas.map((w) => (
                  <div key={w.area} className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-semibold text-foreground">{w.area}</span>
                      <span className="text-xs text-muted-foreground font-mono">
                        <AnimatedCounter value={w.accuracy} />% accuracy
                      </span>
                    </div>
                    <Progress
                      value={w.accuracy}
                      className="[&_[data-slot=progress-indicator]]:bg-[oklch(0.68_0.15_22)] h-1.5"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Heatmap Info Card */}
            <Card className="shadow-soft border-border/80 rounded-2xl bg-gradient-to-b from-card to-primary/5 flex flex-col justify-between">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <BarChart3 className="size-4 text-primary" /> Cognitive Dashboard
                </CardTitle>
                <CardDescription className="text-xs">How we analyze study logs</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <p className="text-sm text-muted-foreground/90 leading-relaxed">
                  Every minute you spend studying, answering questions, or reviewing flashcards feeds into a daily study log.
                </p>
                <p className="text-sm text-muted-foreground/90 leading-relaxed">
                  We render this as a visual contribution heatmap and streak counter on your dashboard to help keep you motivated.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-16 text-center">
            <MagneticButton>
              <Button
                size="lg"
                className="h-12 px-6 text-base font-semibold transition-transform hover:scale-[1.02]"
                nativeButton={false}
                render={
                  <Link href="/register">
                    Start tracking your progress
                    <ArrowRight data-icon="inline-end" />
                  </Link>
                }
              />
            </MagneticButton>
          </div>
        </main>
      </div>
      <LandingFooter />
    </div>
  )
}
