"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Heatmap } from "@/components/heatmap"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  weeklyProgress,
  accuracyTrend,
  studyTimeTrend,
  topicPerformance,
  weakAreas,
  heatmap,
} from "@/lib/mock-data"
import { useCurrentUser } from "@/hooks/use-user"
import { TrendingUp, Award, Clock, Star, AlertCircle, Compass } from "lucide-react"

export function AnalyticsContent() {
  const { user } = useCurrentUser()
  // Configs for Recharts wrappers
  const hoursConfig = {
    hours: {
      label: "Hours Studied",
      color: "var(--color-primary)",
    },
  }

  const accuracyConfig = {
    accuracy: {
      label: "Accuracy %",
      color: "var(--color-accent)",
    },
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Overview statistics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border bg-card shadow-soft rounded-2xl">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Clock className="size-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Time Studied</p>
              <p className="text-2xl font-bold">14.8 hrs</p>
              <p className="text-[10px] text-muted-foreground">+2.1 hrs from last week</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card shadow-soft rounded-2xl">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex size-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <TrendingUp className="size-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Avg Accuracy</p>
              <p className="text-2xl font-bold">84%</p>
              <p className="text-[10px] text-muted-foreground">+3% gain since last week</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card shadow-soft rounded-2xl">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex size-10 items-center justify-center rounded-xl bg-success/10 text-success">
              <Award className="size-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">XP Accumulated</p>
              <p className="text-2xl font-bold">3,820</p>
              <p className="text-[10px] text-muted-foreground">Level 4 Scholar</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card shadow-soft rounded-2xl">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex size-10 items-center justify-center rounded-xl bg-warning/10 text-warning">
              <Star className="size-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Daily Streak</p>
              <p className="text-2xl font-bold font-mono">{user.streakDays || 0} Days</p>
              <p className="text-[10px] text-muted-foreground">Longest: {user.bestStreak || 0} days</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Heatmap Card */}
      <Card className="border-border bg-card shadow-soft rounded-3xl">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">Activity Heatmap</CardTitle>
          <CardDescription className="text-xs">Your study consistency map across the last 17 weeks.</CardDescription>
        </CardHeader>
        <CardContent className="pt-2">
          <Heatmap data={heatmap} className="w-full" />
        </CardContent>
      </Card>

      {/* Recharts Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Study Hours Trend */}
        <Card className="border-border bg-card shadow-soft rounded-3xl">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Study Time Trend</CardTitle>
            <CardDescription className="text-xs">Weekly study duration in hours across historical cycles.</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <ChartContainer config={hoursConfig} className="aspect-video w-full" id="study-hours">
              <AreaChart
                data={studyTimeTrend}
                margin={{ left: 12, right: 12 }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="week"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  unit="h"
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideIndicator />}
                />
                <Area
                  dataKey="hours"
                  type="monotone"
                  fill="var(--color-primary)"
                  fillOpacity={0.4}
                  stroke="var(--color-primary)"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Accuracy Trend */}
        <Card className="border-border bg-card shadow-soft rounded-3xl">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Accuracy Trends</CardTitle>
            <CardDescription className="text-xs">Your correct answer percentage trend across week cycles.</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <ChartContainer config={accuracyConfig} className="aspect-video w-full" id="accuracy">
              <BarChart
                data={accuracyTrend}
                margin={{ left: 12, right: 12 }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="week"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  unit="%"
                  domain={[0, 100]}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideIndicator />}
                />
                <Bar
                  dataKey="accuracy"
                  fill="var(--color-accent)"
                  radius={8}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Breakdown grids */}
      <div className="grid gap-6 md:grid-cols-[1fr_360px]">
        {/* Topic performance progress bars */}
        <Card className="border-border bg-card shadow-soft rounded-3xl">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Topic Performance Breakdown</CardTitle>
            <CardDescription className="text-xs">Strength indicators based on practice accuracy levels.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            {topicPerformance.map((topic) => (
              <div key={topic.topic} className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-muted-foreground/80">{topic.topic}</span>
                  <span className="font-bold text-primary">{topic.score}%</span>
                </div>
                <Progress value={topic.score} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Insights & weak areas panel */}
        <div className="flex flex-col gap-4">
          <Card className="border-border bg-card shadow-soft rounded-3xl">
            <CardHeader className="flex-row items-center gap-2 pb-2">
              <div className="flex size-7 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
                <AlertCircle className="size-4.5" />
              </div>
              <CardTitle className="text-base">Focus Areas</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {weakAreas.map((item, idx) => (
                <div key={idx} className="flex flex-col gap-1 border-b border-primary/5 pb-3 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{item.area}</span>
                    <span className="font-bold text-destructive">{item.accuracy}% accuracy</span>
                  </div>
                  <Progress value={item.accuracy} className="h-1.5 bg-secondary" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-primary/5 shadow-soft rounded-3xl">
            <CardHeader className="flex-row items-center gap-2 pb-2">
              <div className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Compass className="size-4.5" />
              </div>
              <CardTitle className="text-base">AI Suggestions</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2.5 text-sm leading-relaxed text-muted-foreground font-medium">
              <p>• Prioritize grammar conjugation drills on Japanese conditional verbs (たら vs ば).</p>
              <p>• Focus on vocabulary drills containing kanji radicals of shadow (影) and verify (験).</p>
              <p>• Study counter suffixes (枚, 本, 個) inside the N4 practice module to increase listening accuracy.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
