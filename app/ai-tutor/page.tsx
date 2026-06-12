"use client"

import { useState } from "react"
import { Sparkles, Bot, User, Send, ArrowRight } from "lucide-react"
import Link from "next/link"
import { LandingNav } from "@/components/landing/landing-nav"
import { LandingFooter } from "@/components/landing/landing-footer"
import { Button } from "@/components/ui/button"

const initialMessages = [
  {
    role: "assistant",
    content: "こんにちは！ I'm your AI Tutor. I can help explain JLPT N5-N2 grammar, Kanji, vocabulary, or review your wrong answers. What are you studying today?",
  },
  {
    role: "user",
    content: "Can you explain the difference between 〜ばかり (bakari) and 〜ところ (tokoro) for completed actions?",
  },
  {
    role: "assistant",
    content: "Excellent question! Both indicate that an action was just completed, but there is a nuance difference:\n\n1. **〜たばかり (ta-bakari)**: Indicates that *in the speaker's mind*, not much time has passed since the action. It could actually be days or weeks.\n   * *Example*: 日本に来たばかりです (I've just arrived in Japan - even if it was 2 weeks ago).\n\n2. **〜たところ (ta-tokoro)**: Indicates that the action *literally* just finished seconds or minutes ago.\n   * *Example*: 今、ご飯を食べたところです (I literally just finished eating this second).",
  },
]

export default function AiTutorPage() {
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState("")

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const newMessages = [
      ...messages,
      { role: "user", content: input },
    ]
    setMessages(newMessages)
    setInput("")

    // Simulated reply
    setTimeout(() => {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: "That's a great follow-up! In the full KotobaLab platform, I can analyze your study statistics, suggest targeted practice, and explain any vocabulary question you get wrong. Sign in or register to experience the full AI tutor!",
        },
      ])
    }, 1000)
  }

  return (
    <div className="min-h-svh bg-background flex flex-col justify-between">
      <div>
        <LandingNav />
        <main className="mx-auto max-w-6xl px-4 py-16 md:px-6 lg:py-24">
          <div className="mx-auto max-w-2xl text-center flex flex-col gap-4 animate-fade-up">
            <span className="inline-flex w-fit mx-auto items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-muted-foreground shadow-soft">
              <Sparkles className="size-3.5 text-primary" />
              AI Tutor Showcase
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-balance md:text-5xl">
              An intelligent language mentor
            </h1>
            <p className="text-lg leading-relaxed text-muted-foreground text-pretty">
              Get instant, precise explanations and cognitive guidance for any Japanese or English grammar, vocabulary, or Kanji problem.
            </p>
          </div>

          {/* Interactive Chat Box Preview */}
          <div className="mt-16 max-w-2xl mx-auto border border-border bg-card rounded-3xl overflow-hidden shadow-soft-lg flex flex-col h-[480px]">
            {/* Header */}
            <div className="bg-secondary/30 px-6 py-4 border-b border-border flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Bot className="size-5" />
              </span>
              <div>
                <h3 className="font-bold text-sm text-foreground">KotobaLab AI Tutor</h3>
                <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Interactive Preview</p>
              </div>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 scrollbar-thin">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-3 max-w-[85%] ${
                    msg.role === "user" ? "self-end flex-row-reverse" : "self-start"
                  }`}
                >
                  <span
                    className={`flex size-8 shrink-0 items-center justify-center rounded-lg text-xs ${
                      msg.role === "user"
                        ? "bg-secondary text-accent"
                        : "bg-primary/10 text-primary"
                    }`}
                  >
                    {msg.role === "user" ? <User className="size-4" /> : <Bot className="size-4" />}
                  </span>
                  <div
                    className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-tr-none"
                        : "bg-muted text-foreground rounded-tl-none"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} className="p-4 border-t border-border bg-card flex gap-2">
              <input
                type="text"
                placeholder="Ask the AI tutor a question..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 rounded-xl border border-border bg-background/50 px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              />
              <Button type="submit" size="icon" className="size-10 rounded-xl shrink-0">
                <Send className="size-4" />
              </Button>
            </form>
          </div>

          <div className="mt-12 text-center">
            <Button
              size="lg"
              className="h-12 px-6 text-base font-semibold"
              nativeButton={false}
              render={
                <Link href="/register">
                  Unlock full AI Tutor tutor experience
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
