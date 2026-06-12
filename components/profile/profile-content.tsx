"use client"

import { User, Award, Flame, Clock, BookOpen, Sparkles, GraduationCap, Globe } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { jlptReadiness, toeflReadiness } from "@/lib/mock-data"
import { useCurrentUser } from "@/hooks/use-user"

export function ProfileContent() {
  const { user } = useCurrentUser()
  return (
    <div className="flex flex-col gap-6">
      {/* Bio banner card */}
      <Card className="overflow-hidden border-primary/15 bg-gradient-to-br from-primary/8 to-card shadow-soft rounded-3xl">
        <CardContent className="p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-5">
            <Avatar className="size-24 border-2 border-primary/25 shadow-soft">
              <AvatarImage src={user.avatar || "/placeholder.jpg"} alt={user.name} />
              <AvatarFallback className="text-xl font-bold bg-primary/15 text-primary">{user.initials}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold text-foreground">{user.name}</h2>
                <Badge variant="secondary" className="text-xs py-0.5 rounded font-bold font-mono">
                  {user.plan}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <p className="text-xs text-muted-foreground/80 mt-1">Member since {user.joined}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Grid of stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border bg-card shadow-soft rounded-2xl">
          <CardContent className="flex items-center gap-3 p-5">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Sparkles className="size-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase">Scholar Rank</p>
              <p className="text-lg font-bold">Level 4</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card shadow-soft rounded-2xl">
          <CardContent className="flex items-center gap-3 p-5">
            <div className="flex size-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <Award className="size-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase">XP Rewards</p>
              <p className="text-lg font-bold">3,820 XP</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card shadow-soft rounded-2xl">
          <CardContent className="flex items-center gap-3 p-5">
            <div className="flex size-10 items-center justify-center rounded-xl bg-warning/10 text-warning">
              <Flame className="size-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase">Active Streak</p>
              <p className="text-lg font-bold font-mono">{user.streakDays || 0} Days</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card shadow-soft rounded-2xl">
          <CardContent className="flex items-center gap-3 p-5">
            <div className="flex size-10 items-center justify-center rounded-xl bg-success/10 text-success">
              <Clock className="size-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase">Study Time</p>
              <p className="text-lg font-bold">14.8 hrs</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Target goals and readiness trackers */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-border bg-card shadow-soft rounded-3xl">
          <CardHeader className="flex-row items-center gap-2.5 pb-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <GraduationCap className="size-4.5" />
            </div>
            <div>
              <CardTitle className="text-base font-semibold">JLPT Target</CardTitle>
              <CardDescription className="text-xs">JLPT {jlptReadiness.level} Exam Goal</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 pt-2">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-sm font-semibold">
                <span className="text-muted-foreground">Readiness Percentage</span>
                <span className="text-primary font-bold">{jlptReadiness.percent}%</span>
              </div>
              <Progress value={jlptReadiness.percent} className="h-2" />
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Based on your grammar, vocabulary, reading, and kanji mastery levels, you are projected to clear the N4 exam with high marks. Keep practicing weak areas.
            </p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card shadow-soft rounded-3xl">
          <CardHeader className="flex-row items-center gap-2.5 pb-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <Globe className="size-4.5" />
            </div>
            <div>
              <CardTitle className="text-base font-semibold">TOEFL Goal</CardTitle>
              <CardDescription className="text-xs">Target iBT Score: {toeflReadiness.target}</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 pt-2">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-sm font-semibold">
                <span className="text-muted-foreground">Current Projected Score</span>
                <span className="text-accent font-bold">{toeflReadiness.score} / 120</span>
              </div>
              <Progress value={(toeflReadiness.score / 120) * 100} className="h-2" />
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Your listening and writing components are strong, with speaking and reading comprehension as focus areas for further improvement.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
