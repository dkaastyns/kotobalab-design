import { Sparkles, Globe, CheckCircle2, ArrowRight } from "lucide-react"
import Link from "next/link"
import { LandingNav } from "@/components/landing/landing-nav"
import { LandingFooter } from "@/components/landing/landing-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const sections = [
  {
    name: "Reading",
    desc: "Simulate academic reading tests. Practice skimming, vocabulary-in-context, and inference questions under real timing constraints.",
  },
  {
    name: "Listening",
    desc: "Listen to lecture and conversation recordings. Practice identifying tone, purpose, and detailed lecture structures.",
  },
  {
    name: "Speaking",
    desc: "Practice responding to integrated prompts. Use the AI Tutor to outline speaking structures and improve flow.",
  },
  {
    name: "Writing",
    desc: "Write integrated and academic discussion essays. Receive instant feedback and syntax improvements directly from the AI tutor.",
  },
]

export default function ToeflInfoPage() {
  return (
    <div className="min-h-svh bg-background flex flex-col justify-between">
      <div>
        <LandingNav />
        <main className="mx-auto max-w-6xl px-4 py-16 md:px-6 lg:py-24">
          <div className="mx-auto max-w-2xl text-center flex flex-col gap-4 animate-fade-up">
            <span className="inline-flex w-fit mx-auto items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-muted-foreground shadow-soft">
              <Globe className="size-3.5 text-primary" />
              TOEFL Preparation
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-balance md:text-5xl">
              Target a high TOEFL iBT score
            </h1>
            <p className="text-lg leading-relaxed text-muted-foreground text-pretty">
              Academic simulator tests and AI-evaluated speaking/writing models tailored to your target institution scores.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 max-w-4xl mx-auto">
            {sections.map((sec) => (
              <Card
                key={sec.name}
                className="border border-border/80 bg-card p-6 shadow-soft hover:shadow-soft-lg hover:border-primary/25 transition-all duration-300 rounded-2xl flex flex-col justify-between"
              >
                <CardContent className="p-0 flex items-start gap-4">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-accent/10 text-accent font-bold font-display text-sm shrink-0">
                    {sec.name[0]}
                  </span>
                  <div className="flex flex-col gap-1">
                    <h3 className="font-bold text-foreground text-base leading-snug">{sec.name} Section</h3>
                    <p className="text-sm text-muted-foreground/80 leading-relaxed mt-1">{sec.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 border-t border-primary/5 pt-12 max-w-3xl mx-auto flex flex-col gap-6">
            <h2 className="text-xl font-bold text-foreground text-center">Simulated test environment</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                "Official timed interfaces",
                "Mock speaking score analysis",
                "Grammar & vocab diagnostics",
                "Institutional target scoring",
                "Advanced response logs",
                "AI writing suggestions",
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
                  Start TOEFL Prep
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
