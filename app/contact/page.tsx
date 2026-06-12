"use client"

import { useState } from "react"
import { Sparkles, Mail, Send } from "lucide-react"
import { LandingNav } from "@/components/landing/landing-nav"
import { LandingFooter } from "@/components/landing/landing-footer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

export default function ContactPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success("Thank you! Your message has been sent successfully.")
    setName("")
    setEmail("")
    setSubject("")
    setMessage("")
  }

  return (
    <div className="min-h-svh bg-background flex flex-col justify-between">
      <div>
        <LandingNav />
        <main className="mx-auto max-w-6xl px-4 py-16 md:px-6 lg:py-24">
          <div className="mx-auto max-w-2xl text-center flex flex-col gap-4 animate-fade-up">
            <span className="inline-flex w-fit mx-auto items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-muted-foreground shadow-soft">
              <Sparkles className="size-3.5 text-primary" />
              Contact Us
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-balance md:text-5xl">
              Get in touch with us
            </h1>
            <p className="text-lg leading-relaxed text-muted-foreground text-pretty">
              Have a question about our plans, a feature suggestion, or need technical help? Send us a message.
            </p>
          </div>

          <div className="mt-16 max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 bg-card border border-border p-8 rounded-3xl shadow-soft">
              <div className="flex flex-col gap-2">
                <Label htmlFor="contact-name">Name</Label>
                <Input
                  id="contact-name"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="rounded-xl border-border bg-background/50 h-11"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="contact-email">Email Address</Label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="contact-email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="rounded-xl border-border bg-background/50 h-11 pl-9"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="contact-subject">Topic</Label>
                <Select value={subject} onValueChange={(val) => val && setSubject(val)}>
                  <SelectTrigger id="contact-subject" className="rounded-xl border-border bg-background/50 h-11 text-sm">
                    <SelectValue placeholder="Select a topic" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-border bg-card">
                    <SelectItem value="general">General Inquiry</SelectItem>
                    <SelectItem value="support">Technical Support</SelectItem>
                    <SelectItem value="feedback">Feedback & Suggestions</SelectItem>
                    <SelectItem value="partnership">Partnerships</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="contact-message">Message</Label>
                <textarea
                  id="contact-message"
                  placeholder="Write your message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="rounded-xl border border-border bg-background/50 min-h-[120px] p-3 text-sm focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                  required
                />
              </div>

              <Button type="submit" size="lg" className="h-11 w-full text-base font-semibold mt-2">
                <Send className="size-4 mr-2" />
                Send Message
              </Button>
            </form>
          </div>
        </main>
      </div>
      <LandingFooter />
    </div>
  )
}
