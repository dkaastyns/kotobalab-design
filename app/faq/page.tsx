import { Sparkles } from "lucide-react"
import { LandingNav } from "@/components/landing/landing-nav"
import { LandingFooter } from "@/components/landing/landing-footer"
import { LandingFaq } from "@/components/landing/landing-faq"

export default function FaqPage() {
  return (
    <div className="min-h-svh bg-background flex flex-col justify-between">
      <div>
        <LandingNav />
        <main className="py-8">
          <div className="mx-auto max-w-2xl text-center flex flex-col gap-3 px-4 pt-12 animate-fade-up">
            <span className="inline-flex w-fit mx-auto items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-muted-foreground shadow-soft">
              <Sparkles className="size-3.5 text-primary" />
              Frequently Asked Questions
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-balance md:text-5xl">
              Got questions? We have answers.
            </h1>
            <p className="text-lg leading-relaxed text-muted-foreground text-pretty">
              Find quick answers to billing queries, AI tutor limits, and mobile compatibility.
            </p>
          </div>
          <LandingFaq />
        </main>
      </div>
      <LandingFooter />
    </div>
  )
}
