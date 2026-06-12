"use client"

import Link from "next/link"
import { BookOpen, PenLine, Headphones, ScrollText, ArrowRight, Lock, CheckCircle2, Trophy } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { CircularProgress } from "@/components/circular-progress"
import { jlptLevels } from "@/lib/mock-data"

const sectionIcons = [
  { key: "vocabulary", name: "Vocabulary", icon: BookOpen },
  { key: "grammar", name: "Grammar", icon: PenLine },
  { key: "reading", name: "Reading", icon: ScrollText },
  { key: "kanji", name: "Kanji", icon: Headphones },
] as const

export function JlptContent() {
  const current = jlptLevels.find((l) => l.level === "N4")!

  return (
    <div className="flex flex-col gap-8">
      <Card className="overflow-hidden border-primary/15 bg-gradient-to-br from-primary/8 to-card">
        <CardContent className="flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2">
            <Badge variant="secondary" className="w-fit">
              Japanese Language Proficiency Test
            </Badge>
            <h2 className="text-pretty text-2xl font-semibold">Your road to N1</h2>
            <p className="max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
              Track readiness across all JLPT levels. Each level unlocks as you build mastery on the previous one.
            </p>
          </div>
          <CircularProgress value={current.progress} size={96} label="N4 ready" />
        </CardContent>
      </Card>

      <div>
        <h3 className="mb-4 text-sm font-medium uppercase tracking-wide text-muted-foreground">Choose a level</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {jlptLevels.map((lvl) => (
            <Card key={lvl.level} className={lvl.unlocked ? "transition-colors hover:border-primary/40" : "opacity-60"}>
              <CardHeader className="flex flex-row items-start justify-between gap-2">
                <div className="flex flex-col gap-1">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    {lvl.level}
                    {lvl.progress === 100 && <CheckCircle2 className="size-4 text-primary" />}
                  </CardTitle>
                  <CardDescription>{lvl.label}</CardDescription>
                </div>
                {lvl.unlocked ? <Badge variant="outline">{lvl.progress}%</Badge> : <Lock className="size-4 text-muted-foreground" />}
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <Progress value={lvl.progress} />
                <Button
                  asChild={lvl.unlocked}
                  disabled={!lvl.unlocked}
                  variant={lvl.unlocked ? "default" : "secondary"}
                  className="w-full"
                >
                  {lvl.unlocked ? (
                    <Link href="/practice">
                      Study {lvl.level}
                      <ArrowRight data-icon="inline-end" />
                    </Link>
                  ) : (
                    <span>Locked</span>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">N4 sections</h3>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/exam">
              <Trophy data-icon="inline-start" />
              Take mock exam
            </Link>
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {sectionIcons.map((s) => {
            const Icon = s.icon
            const mastery = current[s.key as "vocabulary" | "grammar" | "reading" | "kanji"]
            return (
              <Card key={s.name} className="transition-colors hover:border-primary/40">
                <CardContent className="flex items-center gap-4 p-5">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>
                  <div className="flex flex-1 flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{s.name}</p>
                      <span className="text-sm text-muted-foreground">{mastery}%</span>
                    </div>
                    <Progress value={mastery} />
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
