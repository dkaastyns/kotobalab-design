import Link from "next/link"
import { Check, Sparkles } from "lucide-react"
import { LandingNav } from "@/components/landing/landing-nav"
import { LandingFooter } from "@/components/landing/landing-footer"
import { Button } from "@/components/ui/button"
import { ScrollFadeUp } from "@/components/shared/scroll-fade-up"

const tiers = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for casual learners building their daily streak.",
    features: [
      "Daily practice challenges",
      "Core JLPT & TOEFL question bank",
      "Standard spaced repetition (SRS) flashcards",
      "Basic study statistics and history",
      "Limited AI tutor suggestions",
    ],
    buttonText: "Start learning free",
    href: "/register",
    featured: false,
  },
  {
    name: "Pro",
    price: "$12",
    period: "/mo",
    description: "For serious students targeting high JLPT levels or TOEFL scores.",
    features: [
      "Everything in Free",
      "Unlimited AI tutor chat & conversation logs",
      "Instant AI explanations for wrong answers",
      "Realistic full-length mock exams",
      "Deep analytics (weakness breakdown, accuracy trends)",
      "Priority API response speed",
    ],
    buttonText: "Upgrade to Pro",
    href: "/register",
    featured: true,
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-svh bg-background flex flex-col justify-between">
      <div>
        <LandingNav />
        <main className="mx-auto max-w-6xl px-4 py-16 md:px-6 lg:py-24">
          <div className="mx-auto max-w-2xl text-center flex flex-col gap-4 animate-fade-up">
            <span className="inline-flex w-fit mx-auto items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-muted-foreground shadow-soft">
              <Sparkles className="size-3.5 text-primary" />
              Simple, transparent pricing
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-balance md:text-5xl">
              Choose your path to fluency
            </h1>
            <p className="text-lg leading-relaxed text-muted-foreground text-pretty">
              Start for free and upgrade when you need advanced AI analysis and unlimited practice.
            </p>
          </div>

          <ScrollFadeUp>
            <div className="mx-auto mt-16 grid max-w-sm gap-8 sm:max-w-none md:grid-cols-2 lg:max-w-4xl">
              {tiers.map((tier) => (
                <div
                  key={tier.name}
                  className={`flex flex-col justify-between rounded-3xl p-8 border transition-all duration-300 ${
                    tier.featured
                      ? "border-primary bg-gradient-to-b from-card to-primary/5 shadow-soft-lg scale-102"
                      : "border-border bg-card shadow-soft hover:border-primary/25 hover:shadow-soft-lg"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="text-xl font-bold font-display text-foreground">{tier.name}</h3>
                      {tier.featured && (
                        <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-bold tracking-wide text-primary">
                          Recommended
                        </span>
                      )}
                    </div>
                    <p className="mt-4 text-sm text-muted-foreground/80 leading-relaxed">
                      {tier.description}
                    </p>
                    <div className="mt-6 flex items-baseline gap-1">
                      <span className="text-5xl font-bold tracking-tight font-display text-foreground">
                        {tier.price}
                      </span>
                      {tier.period && (
                        <span className="text-sm font-semibold text-muted-foreground">{tier.period}</span>
                      )}
                    </div>

                    <ul className="mt-8 flex flex-col gap-4 border-t border-primary/5 pt-6">
                      {tier.features.map((f) => (
                        <li key={f} className="flex items-start gap-3 text-sm">
                          <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary mt-0.5">
                            <Check className="size-3" />
                          </span>
                          <span className="text-foreground/90">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 pt-4">
                    <Button
                      size="lg"
                      className="w-full text-base font-semibold"
                      variant={tier.featured ? "default" : "outline"}
                      nativeButton={false}
                      render={<Link href={tier.href}>{tier.buttonText}</Link>}
                    />
                  </div>
                </div>
              ))}
            </div>
          </ScrollFadeUp>
        </main>
      </div>
      <LandingFooter />
    </div>
  )
}
