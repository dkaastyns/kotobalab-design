import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Flame, Trophy, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function LandingHero() {
  return (
    <section className="relative overflow-hidden">
      {/* soft decorative background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-32 -top-32 size-96 rounded-full bg-secondary/50 blur-3xl" />
        <div className="absolute -right-24 top-24 size-80 rounded-full bg-accent/20 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 md:px-6 lg:grid-cols-2 lg:py-24">
        <div className="flex flex-col gap-6 animate-fade-up">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-sm font-medium text-muted-foreground shadow-soft">
            <Sparkles className="size-4 text-primary" />
            AI-powered language laboratory
          </span>

          <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-balance md:text-5xl lg:text-6xl">
            Master JLPT &amp; TOEFL with AI
          </h1>

          <p className="max-w-md text-lg leading-relaxed text-muted-foreground text-pretty">
            Personalized learning paths, instant AI explanations, and smart practice sessions —
            designed for calm, focused study you&apos;ll want to return to every day.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button size="lg" className="h-12 px-6 text-base" render={
              <Link href="/register">
                Start learning
                <ArrowRight data-icon="inline-end" />
              </Link>
            } />
            <Button variant="outline" size="lg" className="h-12 px-6 text-base" render={
              <a href="#features">Explore features</a>
            } />
          </div>

          <div className="flex items-center gap-6 pt-2 text-sm text-muted-foreground">
            <div>
              <span className="text-2xl font-semibold text-foreground">50k+</span>
              <p>Active learners</p>
            </div>
            <div className="h-10 w-px bg-border" />
            <div>
              <span className="text-2xl font-semibold text-foreground">4.9</span>
              <p>Average rating</p>
            </div>
            <div className="h-10 w-px bg-border" />
            <div>
              <span className="text-2xl font-semibold text-foreground">92%</span>
              <p>Pass rate</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft-lg">
            <Image
              src="/dashboard-preview.png"
              alt="KotobaLab dashboard preview"
              width={720}
              height={540}
              className="h-auto w-full"
              priority
            />
          </div>

          {/* Floating achievement cards */}
          <div className="absolute -left-4 top-10 flex items-center gap-2.5 rounded-2xl border border-border bg-card px-4 py-3 shadow-soft-lg animate-float-slow">
            <span className="flex size-9 items-center justify-center rounded-xl bg-[oklch(0.84_0.12_85_/_0.18)] text-[oklch(0.6_0.12_85)]">
              <Flame className="size-5" />
            </span>
            <div>
              <p className="text-sm font-semibold leading-none">27-day streak</p>
              <p className="text-xs text-muted-foreground">Keep it up!</p>
            </div>
          </div>

          <div
            className="absolute -right-4 bottom-10 flex items-center gap-2.5 rounded-2xl border border-border bg-card px-4 py-3 shadow-soft-lg animate-float-slow"
            style={{ animationDelay: "1.5s" }}
          >
            <span className="flex size-9 items-center justify-center rounded-xl bg-[oklch(0.74_0.09_155_/_0.18)] text-[oklch(0.5_0.09_155)]">
              <Trophy className="size-5" />
            </span>
            <div>
              <p className="text-sm font-semibold leading-none">N4 unlocked</p>
              <p className="text-xs text-muted-foreground">Achievement earned</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
