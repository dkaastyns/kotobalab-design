"use client"

import Link from "next/link"
import { ScrollText, Headphones, Mic, PenLine, ArrowRight, Trophy } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button, buttonVariants } from "@/components/ui/button"
import { CircularProgress } from "@/components/circular-progress"
import { toeflSections, toeflReadiness } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const sectionIcons = {
  Reading: ScrollText,
  Listening: Headphones,
  Speaking: Mic,
  Writing: PenLine,
} as const

export function ToeflContent() {
  const total = toeflSections.reduce((sum, s) => sum + s.score, 0)

  return (
    <div className="flex flex-col gap-8">
      <Card className="overflow-hidden border-primary/15 bg-gradient-to-br from-primary/8 to-card">
        <CardContent className="flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2">
            <Badge variant="secondary" className="w-fit">
              Test of English as a Foreign Language
            </Badge>
            <h2 className="text-pretty text-2xl font-semibold">Projected score {total}/120</h2>
            <p className="max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
              Your projected TOEFL iBT score based on practice performance. Target a balanced profile across all four
              sections.
            </p>
            <Link href="/exam" className={cn(buttonVariants({ variant: "default", size: "default" }), "mt-2 w-fit")}>
              <Trophy data-icon="inline-start" />
              Start full mock test
            </Link>
          </div>
          <CircularProgress value={toeflReadiness.score} max={120} size={96} label="readiness" />
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        {toeflSections.map((s) => {
          const Icon = sectionIcons[s.name as keyof typeof sectionIcons]
          return (
            <Card key={s.name} className="transition-colors hover:border-primary/40">
              <CardHeader className="flex flex-row items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{s.name}</CardTitle>
                    <CardDescription>
                      {s.score} / {s.max}
                    </CardDescription>
                  </div>
                </div>
                <Badge variant="outline">{s.progress}%</Badge>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <Progress value={s.progress} />
                <Link href="/practice" className={cn(buttonVariants({ variant: "secondary", size: "default" }), "w-full")}>
                  Practice {s.name}
                  <ArrowRight data-icon="inline-end" />
                </Link>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
