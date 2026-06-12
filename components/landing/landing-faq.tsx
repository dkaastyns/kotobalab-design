import Link from "next/link"
import { Sparkles, ArrowRight } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"

const faqs = [
  {
    q: "Which exams does KotobaLab support?",
    a: "JLPT levels N5 through N2 and the TOEFL iBT. Each comes with structured lessons, practice questions, and full mock exams.",
  },
  {
    q: "How does the AI tutor work?",
    a: "Ask any question in plain language and the tutor explains grammar, vocabulary, kanji, and reading with clear examples. It also breaks down questions you get wrong during practice.",
  },
  {
    q: "Is there a free plan?",
    a: "Yes. You can start learning for free with daily challenges and core practice. Pro unlocks unlimited AI tutoring, full mock exams, and advanced analytics.",
  },
  {
    q: "Will it work on my phone?",
    a: "Absolutely. KotobaLab is fully responsive and designed mobile-first, so you can study comfortably on any device.",
  },
  {
    q: "How is my progress tracked?",
    a: "Every session feeds into your analytics — accuracy trends, study heatmap, topic performance, and automatic weakness detection.",
  },
]

export function LandingFaq() {
  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 py-16 md:px-6 lg:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-balance md:text-4xl">
          Frequently asked questions
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          Everything you need to know to get started.
        </p>
      </div>

      <Accordion className="mt-10 flex flex-col gap-3">
        {faqs.map((f, i) => (
          <AccordionItem
            key={i}
            value={`item-${i}`}
            className="rounded-2xl border border-border bg-card px-5 shadow-soft"
          >
            <AccordionTrigger className="text-left text-base font-medium hover:no-underline">
              {f.q}
            </AccordionTrigger>
            <AccordionContent className="leading-relaxed text-muted-foreground">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="mt-12 overflow-hidden rounded-3xl border border-border bg-secondary/50 p-8 text-center md:p-12">
        <span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
          <Sparkles className="size-6" />
        </span>
        <h3 className="mt-4 text-2xl font-bold tracking-tight text-balance md:text-3xl">
          Start your study journey today
        </h3>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-muted-foreground">
          Join 50,000+ learners mastering Japanese and English with AI.
        </p>
        <Button size="lg" className="mt-6 h-12 px-6 text-base" nativeButton={false} render={
          <Link href="/register">
            Get started free
            <ArrowRight data-icon="inline-end" />
          </Link>
        } />
      </div>
    </section>
  )
}
