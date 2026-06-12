import { Sparkles, AlertTriangle, Flag, Lightbulb, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { aiRecommendations, weakAreas, upcomingGoals, studyTips } from "@/lib/mock-data"

export function InsightsPanel() {
  return (
    <aside className="hidden w-80 shrink-0 flex-col gap-5 border-l border-border bg-card/40 p-5 xl:flex">
      <Card className="border-none bg-secondary/40 shadow-soft">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Sparkles className="size-4 text-primary" /> AI recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {aiRecommendations.map((r) => (
            <div key={r.id} className="rounded-xl bg-card p-3 shadow-soft">
              <p className="text-sm font-medium">{r.title}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{r.reason}</p>
            </div>
          ))}
          <Button variant="ghost" size="sm" className="w-full justify-between" nativeButton={false} render={
            <Link href="/tutor">
              Ask the AI tutor <ArrowRight data-icon="inline-end" />
            </Link>
          } />
        </CardContent>
      </Card>

      <Card className="shadow-soft">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <AlertTriangle className="size-4 text-[oklch(0.6_0.12_85)]" /> Weak areas
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {weakAreas.map((w) => (
            <div key={w.area} className="flex flex-col gap-1">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{w.area}</span>
                <span className="text-xs text-muted-foreground">{w.accuracy}%</span>
              </div>
              <Progress value={w.accuracy} className="[&_[data-slot=progress-indicator]]:bg-[oklch(0.68_0.15_22)]" />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="shadow-soft">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Flag className="size-4 text-accent" /> Upcoming goals
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {upcomingGoals.map((g) => (
            <div key={g.id} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{g.title}</span>
                <span className="text-xs text-muted-foreground">{g.due}</span>
              </div>
              <Progress value={g.progress} />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-none bg-muted shadow-none">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Lightbulb className="size-4 text-[oklch(0.6_0.12_85)]" /> Study tip
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed text-muted-foreground">{studyTips[0]}</p>
        </CardContent>
      </Card>
    </aside>
  )
}
