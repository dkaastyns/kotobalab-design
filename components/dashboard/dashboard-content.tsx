"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import {
  Flame, Target, Sparkles, ArrowRight, GraduationCap, Globe,
  BookOpen, Layers, Bot, FileText, Clock, Zap, Brain, PenTool, BookMarked,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  ChartContainer, ChartTooltip, ChartTooltipContent,
} from "@/components/ui/chart"
import { Bar, BarChart, XAxis, CartesianGrid } from "recharts"
import { CircularProgress } from "@/components/circular-progress"
import {
  dailyGoal, todaysChallenge, weeklyProgress,
  jlptReadiness, toeflReadiness, recentActivities, continueLearning,
} from "@/lib/mock-data"
import { useCurrentUser } from "@/hooks/use-user"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations"
import { gsap } from "gsap"

// Animated counter hook using GSAP
function useCountUp(target: number, durationSec = 1.2) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    const obj = { value: 0 }
    const tween = gsap.to(obj, {
      value: target,
      duration: durationSec,
      ease: "power2.out",
      onUpdate: () => {
        setCount(Math.round(obj.value))
      }
    })
    return () => {
      tween.kill()
    }
  }, [target, durationSec])
  return count
}

const activityIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  practice: FileText,
  flashcard: Layers,
  exam: GraduationCap,
  tutor: Bot,
}

const quickActions = [
  { href: "/practice", icon: Brain, label: "Latihan Soal", desc: "AI-generated", color: "text-primary bg-primary/10" },
  { href: "/flashcards", icon: Layers, label: "Flashcard", desc: "Ulangi kosakata", color: "text-amber-500 bg-amber-500/10" },
  { href: "/kanji", icon: PenTool, label: "Kanji", desc: "Pelajari karakter", color: "text-emerald-500 bg-emerald-500/10" },
  { href: "/tutor", icon: Bot, label: "Tanya AI", desc: "Tutor bahasa Jepang", color: "text-violet-500 bg-violet-500/10" },
]

const MOTIVATIONS = [
  "Konsistensi adalah kunci! Kamu sudah semakin dekat dengan tujuanmu. 🎯",
  "Setiap kanji yang kamu pelajari hari ini adalah investasi untuk masa depan. ✨",
  "Pertahankan semangatmu! Belajar sedikit setiap hari lebih baik dari banyak sekali. 🔥",
  "Kamu luar biasa! Terus jaga streak harianmu. 🌟",
]

function getRelativeTime(time: string): string {
  const map: Record<string, string> = {
    "2 min ago": "2 menit lalu",
    "15 min ago": "15 menit lalu",
    "1h ago": "1 jam lalu",
    "3h ago": "3 jam lalu",
    "Yesterday": "Kemarin",
  }
  return map[time] || time
}

export function DashboardContent() {
  const { user } = useCurrentUser()
  const goalPercent = Math.round((dailyGoal.current / dailyGoal.target) * 100)
  const animatedGoal = useCountUp(dailyGoal.current)
  const animatedStreak = useCountUp(user.streakDays || 0, 0.8)
  const animatedJlpt = useCountUp(jlptReadiness.percent, 1.4)
  const animatedToefl = useCountUp(toeflReadiness.score, 1.2)

  const dayOfWeek = new Date().getDay()
  const motivation = MOTIVATIONS[dayOfWeek % MOTIVATIONS.length]

  const flameRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (flameRef.current) {
      gsap.to(flameRef.current, {
        scale: 1.18,
        repeat: -1,
        yoyo: true,
        duration: 0.85,
        ease: "power1.inOut"
      })
    }
  }, [])

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="flex flex-col gap-6"
    >
      {/* Welcome banner */}
      <motion.div variants={fadeInUp}>
        <Card className="overflow-hidden border-none bg-gradient-to-r from-primary/15 via-primary/8 to-transparent shadow-soft">
          <CardContent className="flex flex-col items-start justify-between gap-4 p-6 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm font-medium text-primary">Selamat datang kembali</p>
              <h2 className="mt-1 text-2xl font-bold tracking-tight text-balance">
                Siap belajar, {user.name.split(" ")[0]}? 👋
              </h2>
              <p className="mt-1 text-sm text-muted-foreground max-w-sm">{motivation}</p>
            </div>
            <Button size="lg" className="h-11 px-5 shrink-0" asChild>
              <Link href="/practice">
                Lanjutkan belajar
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Action Grid */}
      <motion.div variants={staggerContainer} className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {quickActions.map((action) => (
          <motion.div
            key={action.href}
            variants={staggerItem}
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="h-full"
          >
            <Link href={action.href}>
              <Card className="hover:shadow-md hover:border-primary/30 transition-all duration-200 cursor-pointer h-full">
                <CardContent className="flex flex-col gap-2.5 p-4">
                  <div className={cn("flex size-10 items-center justify-center rounded-xl", action.color)}>
                    <action.icon className="size-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{action.label}</p>
                    <p className="text-xs text-muted-foreground">{action.desc}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Top stat row */}
      <motion.div variants={staggerContainer} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <motion.div variants={staggerItem} whileHover={{ y: -2 }}>
          <Card className="shadow-soft h-full">
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <Target className="size-4 text-primary animate-pulse" /> Target Harian
              </CardDescription>
              <CardTitle className="text-2xl">
                {animatedGoal}
                <span className="text-base font-normal text-muted-foreground">/{dailyGoal.target} mnt</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={goalPercent} className="transition-all duration-1000" />
              <p className="mt-2 text-xs text-muted-foreground">{goalPercent}% selesai</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={staggerItem} whileHover={{ y: -2 }}>
          <Card className="shadow-soft h-full">
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <div ref={flameRef} className="inline-block">
                  <Flame className="size-4 text-amber-500 fill-amber-500" />
                </div>{" "}
                Streak Belajar
              </CardDescription>
              <CardTitle className="text-2xl font-mono">
                {animatedStreak} <span className="text-base font-normal text-muted-foreground font-sans">hari</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Terbaik: {user.bestStreak || 0} hari</p>
              <div className="mt-2 flex gap-1">
                {Array.from({ length: 7 }).map((_, i) => (
                  <span
                    key={i}
                    className={cn(
                      "h-1.5 flex-1 rounded-full transition-all duration-500",
                      i < (user.streakDays || 0) % 7 ? "bg-primary" : "bg-muted"
                    )}
                    style={{ transitionDelay: `${i * 80}ms` }}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={staggerItem} whileHover={{ y: -2 }}>
          <Card className="shadow-soft h-full">
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <GraduationCap className="size-4 text-primary" /> JLPT {jlptReadiness.level}
              </CardDescription>
              <CardTitle className="text-2xl">{animatedJlpt}%</CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={animatedJlpt} className="transition-all duration-1000" />
              <p className="mt-2 text-xs text-muted-foreground">Kesiapan ujian</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={staggerItem} whileHover={{ y: -2 }}>
          <Card className="shadow-soft h-full">
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <Globe className="size-4 text-primary" /> TOEFL
              </CardDescription>
              <CardTitle className="text-2xl">
                {animatedToefl}
                <span className="text-base font-normal text-muted-foreground">/{toeflReadiness.target}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={(animatedToefl / toeflReadiness.target) * 100} className="transition-all duration-1000" />
              <p className="mt-2 text-xs text-muted-foreground">Skor proyeksi</p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Challenge + weekly chart */}
      <motion.div variants={staggerContainer} className="grid gap-5 lg:grid-cols-3">
        <motion.div variants={staggerItem} className="lg:col-span-1">
          <Card className="shadow-soft h-full border-primary/10">
            <CardHeader>
              <Badge variant="secondary" className="w-fit gap-1.5">
                <Sparkles className="size-3.5" /> Tantangan Hari Ini
              </Badge>
              <CardTitle className="mt-2 text-lg">{todaysChallenge.title}</CardTitle>
              <CardDescription>{todaysChallenge.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <FileText className="size-4" /> {todaysChallenge.questions} soal
                </span>
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <Zap className="size-4 text-amber-500" /> +{todaysChallenge.xp} XP
                </span>
              </div>
              <Button className="w-full mt-auto" asChild>
                <Link href="/practice">Mulai tantangan</Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={staggerItem} className="lg:col-span-2">
          <Card className="shadow-soft h-full">
            <CardHeader>
              <CardTitle className="text-lg">Progres Mingguan</CardTitle>
              <CardDescription>Menit belajar per hari minggu ini</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{ minutes: { label: "Menit", color: "var(--chart-1)" } }}
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
        </motion.div>
      </motion.div>

      {/* Readiness rings + continue learning */}
      <motion.div variants={staggerContainer} className="grid gap-5 lg:grid-cols-3">
        <motion.div variants={staggerItem}>
          <Card className="shadow-soft h-full">
            <CardHeader>
              <CardTitle className="text-lg">Kesiapan JLPT</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center py-4">
              <CircularProgress value={jlptReadiness.percent} label={jlptReadiness.level} />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={staggerItem}>
          <Card className="shadow-soft h-full">
            <CardHeader>
              <CardTitle className="text-lg">Kesiapan TOEFL</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center py-4">
              <CircularProgress
                value={toeflReadiness.score}
                max={120}
                display={`${toeflReadiness.score}`}
                label="proyeksi"
                barClassName="stroke-[oklch(0.5_0.09_155)]"
              />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={staggerItem}>
          <Card className="shadow-soft h-full">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="text-lg">Lanjutkan Belajar</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/jlpt" className="text-xs text-muted-foreground">Lihat semua <ArrowRight className="size-3 ml-1" /></Link>
              </Button>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {continueLearning.map((c) => (
                <div key={c.id} className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{c.title}</span>
                    <span className="text-xs text-muted-foreground">{c.lessons}</span>
                  </div>
                  <Progress value={c.progress} className="transition-all duration-1000" />
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Recent activity */}
      <motion.div variants={fadeInUp}>
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg">Aktivitas Terakhir</CardTitle>
            <CardDescription>Sesi belajar kamu terbaru</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-1">
            {recentActivities.map((a, idx) => {
              const Icon = activityIcons[a.type] ?? BookOpen
              return (
                <motion.div
                  key={a.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.04, duration: 0.3 }}
                  className="flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-muted group cursor-default"
                >
                  <span className="flex size-10 items-center justify-center rounded-xl bg-secondary text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Icon className="size-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{a.title}</p>
                    <p className="truncate text-xs text-muted-foreground">{a.detail}</p>
                  </div>
                  <span className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="size-3" /> {getRelativeTime(a.time)}
                  </span>
                </motion.div>
              )
            })}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
