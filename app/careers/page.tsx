"use client"

import { Sparkles, MapPin, Briefcase } from "lucide-react"
import { LandingNav } from "@/components/landing/landing-nav"
import { LandingFooter } from "@/components/landing/landing-footer"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

const jobs = [
  {
    title: "Senior AI Research Scientist",
    department: "Engineering",
    location: "Remote (Asia/US)",
    type: "Full-time",
  },
  {
    title: "UX/UI Product Designer",
    department: "Design",
    location: "Remote (Global)",
    type: "Full-time",
  },
  {
    title: "Fullstack Software Engineer (Next.js & PostgreSQL)",
    department: "Engineering",
    location: "Hybrid (Tokyo / Remote)",
    type: "Full-time",
  },
]

export default function CareersPage() {
  const handleApply = (title: string) => {
    toast.success(`Application form for "${title}" opened!`);
  }

  return (
    <div className="min-h-svh bg-background flex flex-col justify-between">
      <div>
        <LandingNav />
        <main className="mx-auto max-w-6xl px-4 py-16 md:px-6 lg:py-24">
          <div className="mx-auto max-w-2xl text-center flex flex-col gap-4 animate-fade-up">
            <span className="inline-flex w-fit mx-auto items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-muted-foreground shadow-soft">
              <Sparkles className="size-3.5 text-primary" />
              Careers
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-balance md:text-5xl">
              Build the future of learning
            </h1>
            <p className="text-lg leading-relaxed text-muted-foreground text-pretty">
              Join a team dedicated to designing calm, scientifically proven study products that respect the user.
            </p>
          </div>

          <div className="mt-16 max-w-4xl mx-auto flex flex-col gap-6">
            <h2 className="text-xl font-bold text-foreground mb-2">Open Positions</h2>
            {jobs.map((job) => (
              <div
                key={job.title}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-3xl border border-border bg-card p-6 shadow-soft hover:shadow-soft-lg hover:border-primary/25 transition-all duration-300 animate-fade-up"
              >
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-lg font-bold text-foreground">{job.title}</h3>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Briefcase className="size-3.5" /> {job.department}</span>
                    <span className="flex items-center gap-1"><MapPin className="size-3.5" /> {job.location}</span>
                    <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[10px] font-bold text-accent uppercase tracking-wider">{job.type}</span>
                  </div>
                </div>
                <Button
                  onClick={() => handleApply(job.title)}
                  className="rounded-xl px-5 py-2 font-semibold self-start sm:self-center shrink-0"
                >
                  Apply Now
                </Button>
              </div>
            ))}
          </div>
        </main>
      </div>
      <LandingFooter />
    </div>
  )
}
