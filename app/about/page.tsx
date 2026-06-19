import { Sparkles, Brain, Eye, Compass } from "lucide-react"
import { LandingNav } from "@/components/landing/landing-nav"
import { LandingFooter } from "@/components/landing/landing-footer"
import { ScrollFadeUp } from "@/components/shared/scroll-fade-up"

const values = [
  {
    icon: Brain,
    title: "Scientific Discipline",
    desc: "We utilize spaced repetition (SRS) algorithms and cognitive science to optimize memory retention, helping you study smarter, not longer.",
  },
  {
    icon: Compass,
    title: "AI as a Mentor",
    desc: "AI shouldn't just give answers. Our tutor guides your thinking, explains underlying grammar principles, and helps you learn from mistakes.",
  },
  {
    icon: Eye,
    title: "Visual Calmness",
    desc: "No flashy badges, no loud timers, no cartoon mascots. We design for deep, silent focus and long, fatigue-free study sessions.",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-svh bg-background flex flex-col justify-between">
      <div>
        <LandingNav />
        <main className="mx-auto max-w-6xl px-4 py-16 md:px-6 lg:py-24">
          <div className="mx-auto max-w-2xl text-center flex flex-col gap-4 animate-fade-up">
            <span className="inline-flex w-fit mx-auto items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-muted-foreground shadow-soft">
              <Sparkles className="size-3.5 text-primary" />
              Our Mission
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-balance md:text-5xl">
              A space for deep, focused language study
            </h1>
            <p className="text-lg leading-relaxed text-muted-foreground text-pretty">
              KotobaLab is built for students, professionals, and language enthusiasts who want a premium, scientific environment to prepare for JLPT and TOEFL.
            </p>
          </div>

          <ScrollFadeUp>
            <div className="mt-16 border-b border-primary/5 pb-12">
              <div className="grid gap-12 lg:grid-cols-2 items-center">
                <div className="flex flex-col gap-5">
                  <h2 className="text-2xl font-bold text-foreground">Why we built KotobaLab</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Traditional language apps often focus on gamification — badges, streaks, and cartoon characters designed to keep you clicking. While engaging, they rarely lead to deep comprehension or retention.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    We built KotobaLab as a laboratory: a quiet, calm, and premium space that marries cognitive science with state-of-the-art AI. We want to empower you with tools that respect your time and intellect.
                  </p>
                </div>
                <div className="bg-secondary/40 border border-border/70 rounded-3xl p-8 shadow-soft">
                  <h3 className="text-lg font-bold text-foreground mb-4">Our Learning Philosophy</h3>
                  <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground leading-relaxed">
                    &ldquo;Language is not a game to be beat. It is a world to be understood. The tools we use to study should reflect the beauty and depth of the languages we learn.&rdquo;
                  </blockquote>
                </div>
              </div>
            </div>
          </ScrollFadeUp>

          <ScrollFadeUp>
            <div className="mt-16">
              <h2 className="text-center text-2xl font-bold text-foreground mb-10">Our Core Principles</h2>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {values.map((v) => {
                  const Icon = v.icon
                  return (
                    <div key={v.title} className="flex flex-col gap-4 rounded-3xl border border-border bg-card p-6 shadow-soft hover:shadow-soft-lg transition-all duration-300">
                      <span className="flex size-11 items-center justify-center rounded-2xl bg-secondary text-accent">
                        <Icon className="size-5" />
                      </span>
                      <h3 className="text-lg font-bold text-foreground">{v.title}</h3>
                      <p className="text-sm text-muted-foreground/80 leading-relaxed">{v.desc}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </ScrollFadeUp>
        </main>
      </div>
      <LandingFooter />
    </div>
  )
}
