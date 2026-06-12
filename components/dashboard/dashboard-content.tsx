"use client"

import Link from "next/link"
import {
  Flame,
  Target,
  Sparkles,
  ArrowRight,
  GraduationCap,
  Globe,
  BookOpen,
  Layers,
  Bot,
  FileText,
  Clock,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Bar, BarChart, XAxis, CartesianGrid } from "recharts"
import { CircularProgress } from "@/components/circular-progress"
import {
  user,
  dailyGoal,
  streak,
  todaysChallenge,
  weeklyProgress,
  jlptReadiness,
  toeflReadiness,
  recentActivities,
  continueLearning,
} from "@/lib/mock-data"

const activityIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  practice: FileText,
  flashcard: Layers,
  exam: GraduationCap,
  tutor: Bot,
}

export function DashboardContent() {
  const goalPercent = Math.round((dailyGoal.current / dailyGoal.target) * 100)

  return (
    <div className="flex flex-col gap-6">
      {/* Welcome */}
      <Card className="overflow-hidden border-none bg-secondary/50 shadow-soft">
        <CardContent className="flex flex-col items-start justify-between gap-4 p-6 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-medium text-accent">Welcome back</p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-balance">
              Ready to study, {user.name.split(" ")[0]}?
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              You&apos;re {dailyGoal.target - dailyGoal.current} minutes from today&apos;s goal. Keep the momentum going.
            </p>
          </div>
          <Button size="lg" className="h-11 px-5" render={
            <Link href="/practice">
              Continue learning
              <ArrowRight data-icon="inline-end" />
            </Link>
          } />
        </CardContent>
      </Card>

      {/* Top stat row */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-soft">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <Target className="size-4 text-accent" /> Daily goal
            </CardDescription>
            <CardTitle className="text-2xl">
              {dailyGoal.current}
              <span className="text-base font-normal text-muted-foreground">/{dailyGoal.target} min</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={goalPercent} />
            <p className="mt-2 text-xs text-muted-foreground">{goalPercent}% complete</p>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <Flame className="size-4 text-[oklch(0.6_0.12_85)]" /> Study streak
            </CardDescription>
            <CardTitle className="text-2xl">
              {streak.days} <span className="text-base font-normal text-muted-foreground">days</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Personal best: {streak.best} days</p>
            <div className="mt-2 flex gap-1">
              {Array.from({ length: 7 }).map((_, i) => (
                <span
                  key={i}
                  className={i < 5 ? "h-1.5 flex-1 rounded-full bg-primary" : "h-1.5 flex-1 rounded-full bg-muted"}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <GraduationCap className="size-4 text-accent" /> JLPT {jlptReadiness.level}
            </CardDescription>
            <CardTitle className="text-2xl">{jlptReadiness.percent}%</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={jlptReadiness.percent} />
            <p className="mt-2 text-xs text-muted-foreground">Exam readiness</p>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <Globe className="size-4 text-accent" /> TOEFL
            </CardDescription>
            <CardTitle className="text-2xl">
              {toeflReadiness.score}
              <span className="text-base font-normal text-muted-foreground">/{toeflReadiness.target}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={toeflReadiness.score} />
            <p className="mt-2 text-xs text-muted-foreground">Projected score</p>
          </CardContent>
        </Card>
      </div>

      {/* Challenge + weekly chart */}
      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="shadow-soft lg:col-span-1">
          <CardHeader>
            <Badge variant="secondary" className="w-fit gap-1.5">
              <Sparkles className="size-3.5" /> Today&apos;s challenge
            </Badge>
            <CardTitle className="mt-2 text-lg">{todaysChallenge.title}</CardTitle>
            <CardDescription>{todaysChallenge.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <FileText className="size-4" /> {todaysChallenge.questions} questions
              </span>
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <Sparkles className="size-4" /> +{todaysChallenge.xp} XP
              </span>
            </div>
            <Button className="w-full" render={<Link href="/practice">Start challenge</Link>} />
          </CardContent>
        </Card>

        <Card className="shadow-soft lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Weekly progress</CardTitle>
            <CardDescription>Minutes studied per day this week</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{ minutes: { label: "Minutes", color: "var(--chart-1)" } }}
              className="h-[200px] w-full"
            >
              <BarChart data={weeklyProgress} margin={{ left: 0, right: 0, top: 8 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="minutes" fill="var(--color-minutes)" radius={8} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Readiness rings + continue learning */}
      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg">JLPT readiness</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center py-4">
            <CircularProgress value={jlptReadiness.percent} label={`${jlptReadiness.percent}%`} sublabel={jlptReadiness.level} />
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg">TOEFL readiness</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center py-4">
            <CircularProgress
              value={toeflReadiness.score}
              label={`${toeflReadiness.score}`}
              sublabel="projected"
              barClassName="stroke-[oklch(0.5_0.09_155)]"
            />
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="text-lg">Continue learning</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {continueLearning.map((c) => (
              <div key={c.id} className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{c.title}</span>
                  <span className="text-xs text-muted-foreground">{c.lessons}</span>
                </div>
                <Progress value={c.progress} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent activity */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="text-lg">Recent activity</CardTitle>
          <CardDescription>Your latest study sessions</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          {recentActivities.map((a) => {
            const Icon = activityIcons[a.type] ?? BookOpen
            return (
              <div key={a.id} className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-muted">
                <span className="flex size-10 items-center justify-center rounded-xl bg-secondary text-accent">
                  <Icon className="size-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{a.title}</p>
                  <p className="truncate text-xs text-muted-foreground">{a.detail}</p>
                </div>
                <span className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="size-3" /> {a.time}
                </span>
              </div>
            )
          })}
        </CardContent>
      </Card>
    </div>
  )
}
