import { Sparkles, Calendar, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"
import { LandingNav } from "@/components/landing/landing-nav"
import { LandingFooter } from "@/components/landing/landing-footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const posts = [
  {
    title: "How to Master Japanese Kanji using Spaced Repetition (SRS)",
    excerpt: "Spaced repetition is the single most effective way to retain thousands of kanji. Here is a breakdown of how the SM-2 algorithm works and how to schedule your reviews.",
    date: "June 10, 2026",
    readTime: "5 min read",
    category: "Japanese",
    color: "bg-primary/10 text-primary",
  },
  {
    title: "Cracking the TOEFL Speaking Section: A Guide to Fluency",
    excerpt: "The speaking section requires structure and confidence. Learn how to outline your responses, manage your time, and simulate the test environment effectively.",
    date: "June 3, 2026",
    readTime: "6 min read",
    category: "TOEFL",
    color: "bg-accent/10 text-accent",
  },
  {
    title: "Designing a Calm Study Space: How Environment Impacts Focus",
    excerpt: "Childish gamification and flashy interfaces often lead to cognitive overload. We explore why visual silence and harmonized workspaces lead to longer, happier study sessions.",
    date: "May 28, 2026",
    readTime: "4 min read",
    category: "Productivity",
    color: "bg-[oklch(0.6_0.12_85_/_0.1)] text-[oklch(0.6_0.12_85)]",
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-svh bg-background flex flex-col justify-between">
      <div>
        <LandingNav />
        <main className="mx-auto max-w-6xl px-4 py-16 md:px-6 lg:py-24">
          <div className="mx-auto max-w-2xl text-center flex flex-col gap-4 animate-fade-up">
            <span className="inline-flex w-fit mx-auto items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-muted-foreground shadow-soft">
              <Sparkles className="size-3.5 text-primary" />
              KotobaLab Journal
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-balance md:text-5xl">
              Insights, tips, and language studies
            </h1>
            <p className="text-lg leading-relaxed text-muted-foreground text-pretty">
              Read about the science of language learning, exam strategies, and building healthy study habits.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Card
                key={post.title}
                className="group border border-border/80 bg-card overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-soft-lg rounded-2xl flex flex-col justify-between"
              >
                <CardContent className="p-6 flex flex-col gap-4">
                  <div className="flex items-center justify-between gap-4">
                    <Badge variant="secondary" className={`${post.color} rounded-md border-none`}>
                      {post.category}
                    </Badge>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Calendar className="size-3" /> {post.date}</span>
                      <span className="flex items-center gap-1"><Clock className="size-3" /> {post.readTime}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground/80 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </CardContent>
                <div className="border-t border-primary/5 p-6 bg-card flex justify-end">
                  <span className="flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all">
                    Read article <ArrowRight className="size-4" />
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </main>
      </div>
      <LandingFooter />
    </div>
  )
}
