import { Sparkles, Languages, CheckCircle2, ArrowRight } from "lucide-react"
import Link from "next/link"
import { LandingNav } from "@/components/landing/landing-nav"
import { LandingFooter } from "@/components/landing/landing-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const kanjiFeatures = [
  {
    title: "Readings & Onyomi/Kunyomi",
    desc: "Every kanji page displays both Chinese readings (Onyomi) and Japanese readings (Kunyomi) with context examples to build real comprehension.",
  },
  {
    title: "Stroke Counts & Writing",
    desc: "Check stroke counts and writing paths for N5 to N2 kanji to build fine motor memory and write beautifully.",
  },
  {
    title: "Dynamic Mastery Progress",
    desc: "Track your review accuracy and retention over time. The platform calculates mastery percentages to prioritize daily kanji sets.",
  },
]

export default function KanjiInfoPage() {
  return (
    <div className="min-h-svh bg-background flex flex-col justify-between">
      <div>
        <LandingNav />
        <main className="mx-auto max-w-6xl px-4 py-16 md:px-6 lg:py-24">
          <div className="mx-auto max-w-2xl text-center flex flex-col gap-4 animate-fade-up">
            <span className="inline-flex w-fit mx-auto items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-muted-foreground shadow-soft">
              <Languages className="size-3.5 text-primary" />
              Kanji Laboratory
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-balance md:text-5xl">
              Master kanji characters systematically
            </h1>
            <p className="text-lg leading-relaxed text-muted-foreground text-pretty">
              A comprehensive kanji tool built to track readings, stroke paths, and vocabulary connections for JLPT levels.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {kanjiFeatures.map((feat) => (
              <Card
                key={feat.title}
                className="border border-border/80 bg-card p-6 shadow-soft hover:shadow-soft-lg hover:border-primary/25 transition-all duration-300 rounded-2xl flex flex-col justify-between"
              >
                <CardContent className="p-0 flex flex-col gap-3">
                  <span className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary font-bold font-display text-base">
                    漢
                  </span>
                  <h3 className="font-bold text-foreground text-base leading-snug">{feat.title}</h3>
                  <p className="text-sm text-muted-foreground/80 leading-relaxed">{feat.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center animate-fade-up">
            <Button
              size="lg"
              className="h-12 px-6 text-base font-semibold"
              nativeButton={false}
              render={
                <Link href="/register">
                  Start studying kanji
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
