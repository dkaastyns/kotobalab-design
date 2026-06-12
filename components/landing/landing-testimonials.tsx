import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const testimonials = [
  {
    name: "Mei L.",
    role: "Passed JLPT N3",
    initials: "ML",
    quote:
      "The AI explanations finally made particles click for me. I went from guessing to actually understanding why.",
  },
  {
    name: "David O.",
    role: "TOEFL 104",
    initials: "DO",
    quote:
      "The analytics showed me exactly where I was losing points. Two weeks of focused practice and my reading score jumped.",
  },
  {
    name: "Sara K.",
    role: "Studying N4",
    initials: "SK",
    quote:
      "It's the first app that doesn't feel exhausting. Calm, beautiful, and I genuinely look forward to my daily session.",
  },
]

export function LandingTestimonials() {
  return (
    <section className="bg-card/60 py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-balance md:text-4xl">
            Loved by learners worldwide
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Thousands study with KotobaLab every day.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.map((t) => (
            <Card key={t.name} className="border-border/70 shadow-soft">
              <CardContent className="flex flex-col gap-4 pt-6">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-4 fill-[oklch(0.84_0.12_85)] text-[oklch(0.84_0.12_85)]" />
                  ))}
                </div>
                <p className="leading-relaxed text-foreground text-pretty">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-auto flex items-center gap-3">
                  <Avatar className="size-10">
                    <AvatarFallback>{t.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
