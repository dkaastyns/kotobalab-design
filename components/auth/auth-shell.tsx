import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { Sparkles, Flame, Trophy, CheckCircle2 } from "lucide-react"

export function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle: string
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-svh bg-background">
      {/* Left brand panel */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-secondary/40 p-12 lg:flex">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -right-20 -top-20 size-80 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute bottom-0 left-0 size-72 rounded-full bg-accent/15 blur-3xl" />
        </div>

        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Sparkles className="size-5" />
          </span>
          <span className="text-lg font-semibold tracking-tight">KotobaLab</span>
        </Link>

        <div className="flex flex-col gap-6">
          <Image
            src="/sakura-hero.png"
            alt=""
            width={420}
            height={300}
            className="mx-auto h-auto w-full max-w-sm rounded-3xl"
          />
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-balance">
              Calm, focused learning powered by AI
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {["Personalized study paths", "Instant AI explanations", "Smart spaced repetition"].map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm font-medium text-foreground/80">
                  <CheckCircle2 className="size-4 text-[oklch(0.5_0.09_155)]" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="flex items-center gap-2 rounded-2xl border border-border bg-card px-3 py-2 text-sm shadow-soft">
            <Flame className="size-4 text-[oklch(0.6_0.12_85)]" />
            <span className="font-medium">27-day streak</span>
          </div>
          <div className="flex items-center gap-2 rounded-2xl border border-border bg-card px-3 py-2 text-sm shadow-soft">
            <Trophy className="size-4 text-[oklch(0.5_0.09_155)]" />
            <span className="font-medium">92% pass rate</span>
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex flex-1 items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm animate-fade-up">
          <Link href="/" className="mb-8 flex items-center gap-2.5 lg:hidden">
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Sparkles className="size-5" />
            </span>
            <span className="text-lg font-semibold tracking-tight">KotobaLab</span>
          </Link>

          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          <p className="mt-2 leading-relaxed text-muted-foreground">{subtitle}</p>

          <div className="mt-8">{children}</div>
        </div>
      </div>
    </div>
  )
}
