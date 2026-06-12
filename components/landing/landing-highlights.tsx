import { Flame, TrendingUp, CalendarRange } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function LandingHighlights() {
  return (
    <section id="analytics" className="mx-auto max-w-6xl px-4 py-16 md:px-6 lg:py-24">
      <div className="grid gap-5 lg:grid-cols-3">
        {/* Daily challenge */}
        <Card className="shadow-soft">
          <CardHeader>
            <span className="flex size-11 items-center justify-center rounded-2xl bg-[oklch(0.84_0.12_85_/_0.18)] text-[oklch(0.6_0.12_85)]">
              <Flame className="size-5" />
            </span>
            <CardTitle className="mt-3 text-xl">Daily challenge</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <p className="text-sm leading-relaxed text-muted-foreground">
              A fresh bite-sized challenge every day keeps your streak alive and your skills sharp.
            </p>
            <div className="rounded-2xl bg-muted p-4">
              <div className="flex items-center justify-between text-sm font-medium">
                <span>Today&apos;s goal</span>
                <span className="text-muted-foreground">38 / 50 min</span>
              </div>
              <Progress value={76} className="mt-2" />
            </div>
          </CardContent>
        </Card>

        {/* Analytics */}
        <Card className="shadow-soft">
          <CardHeader>
            <span className="flex size-11 items-center justify-center rounded-2xl bg-secondary text-accent">
              <TrendingUp className="size-5" />
            </span>
            <CardTitle className="mt-3 text-xl">Progress analytics</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <p className="text-sm leading-relaxed text-muted-foreground">
              See accuracy trends, time spent, and which topics need attention — all at a glance.
            </p>
            <div className="flex items-end gap-1.5">
              {[40, 55, 48, 70, 62, 85, 78].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-lg bg-primary/70"
                  style={{ height: `${h}px` }}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Study planner */}
        <Card className="shadow-soft">
          <CardHeader>
            <span className="flex size-11 items-center justify-center rounded-2xl bg-[oklch(0.74_0.09_155_/_0.18)] text-[oklch(0.5_0.09_155)]">
              <CalendarRange className="size-5" />
            </span>
            <CardTitle className="mt-3 text-xl">Study planner</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <p className="text-sm leading-relaxed text-muted-foreground">
              A weekly plan that adapts to your goals, schedule, and exam date.
            </p>
            <div className="flex flex-col gap-2">
              {["N4 Grammar lesson", "Review 20 flashcards", "Reading practice"].map((t, i) => (
                <div key={t} className="flex items-center gap-2.5 rounded-xl bg-muted px-3 py-2 text-sm">
                  <span
                    className={
                      i < 2
                        ? "flex size-4 items-center justify-center rounded-full bg-[oklch(0.5_0.09_155)] text-[10px] text-white"
                        : "size-4 rounded-full border-2 border-border"
                    }
                  >
                    {i < 2 ? "✓" : ""}
                  </span>
                  <span className={i < 2 ? "text-muted-foreground line-through" : ""}>{t}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
