"use client"

import { useState, useEffect } from "react"
import { Award, Flame, Calendar, Trophy, Star, Sparkles, Moon, BookOpen, Languages, Mountain } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { achievements } from "@/lib/mock-data"
import { useCurrentUser } from "@/hooks/use-user"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations"
import { gsap } from "gsap"

const iconMap = {
  Sparkles: Sparkles,
  Flame: Flame,
  BookOpen: BookOpen,
  Mountain: Mountain,
  Trophy: Trophy,
  Calendar: Calendar,
  Moon: Moon,
  Languages: Languages,
} as const

export function AchievementsContent() {
  const { user } = useCurrentUser()
  const [activeFilter, setActiveFilter] = useState<"all" | "unlocked" | "locked">("all")
  const [xpPercent, setXpPercent] = useState(0)

  // Compute real achievement progress from user data
  const computeAchievements = () => {
    return achievements.map(a => {
      let progress = a.progress
      let unlocked = a.unlocked

      switch (a.title) {
        case "Week Warrior":
          progress = Math.min(100, Math.round(((user.streakDays || 0) / 7) * 100))
          unlocked = (user.streakDays || 0) >= 7
          break
        case "Marathon":
          progress = Math.min(100, Math.round(((user.streakDays || 0) / 30) * 100))
          unlocked = (user.streakDays || 0) >= 30
          break
        case "First Steps":
          unlocked = (user.sessionsCompleted || 0) >= 1
          progress = unlocked ? 100 : 0
          break
        case "Perfect Score":
          // Unlocked if user has had a 100% session — approximate via totalCorrect
          progress = a.progress
          break
        case "Night Owl":
          progress = a.progress
          break
      }

      return { ...a, progress, unlocked }
    })
  }

  const computedAchievements = computeAchievements()

  const filteredAchievements = computedAchievements.filter((a) => {
    if (activeFilter === "unlocked") return a.unlocked
    if (activeFilter === "locked") return !a.unlocked
    return true
  })

  const xp = user.xp || 1240
  const xpLevel = Math.floor(xp / 1000) + 1
  const xpInLevel = xp % 1000
  const xpToNext = 1000

  useEffect(() => {
    const obj = { val: 0 }
    const tween = gsap.to(obj, {
      val: (xpInLevel / xpToNext) * 100,
      duration: 1.6,
      ease: "power2.out",
      onUpdate: () => setXpPercent(obj.val)
    })
    return () => { tween.kill() }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [xp])

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="flex flex-col gap-6"
    >
      {/* Level and Streaks Summary Card */}
      <motion.div variants={staggerContainer} className="grid gap-6 md:grid-cols-[1fr_360px]">
        {/* Scholar Rank / XP progression */}
        <motion.div variants={staggerItem}>
          <Card className="border-primary/15 bg-gradient-to-br from-primary/8 to-card shadow-soft p-6 rounded-3xl flex flex-col justify-between h-full">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-primary">
                <Trophy className="size-5 animate-pulse" />
                <span className="text-xs uppercase tracking-wider font-bold">Scholar Rank</span>
              </div>
              <h2 className="text-3xl font-bold">Scholar Level {xpLevel}</h2>
              <p className="text-sm leading-relaxed text-muted-foreground max-w-md">
                Maintain your daily streak to earn bonus multipliers on questions. Master levels to unlock premium titles.
              </p>
            </div>

            <div className="flex flex-col gap-2 mt-6">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-muted-foreground uppercase">Progres ke Level {xpLevel + 1}</span>
                <span className="text-primary font-bold">{xpInLevel.toLocaleString()} / {xpToNext.toLocaleString()} XP</span>
              </div>
              <Progress value={xpPercent} className="h-3" />
            </div>
          </Card>
        </motion.div>

        {/* Study Streak detailed widget */}
        <motion.div variants={staggerItem}>
          <Card className="border-border bg-card shadow-soft p-6 rounded-3xl flex flex-col justify-between h-full">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  className="flex size-11 items-center justify-center rounded-2xl bg-[oklch(0.84_0.12_85)]/10 text-[oklch(0.84_0.12_85)]"
                >
                  <Flame className="size-6 fill-[oklch(0.84_0.12_85)]" />
                </motion.div>
                <div className="flex flex-col">
                  <span className="text-xs uppercase font-bold text-muted-foreground tracking-wider">Streak Belajar</span>
                  <span className="text-2xl font-black text-foreground">{user?.streakDays || 0} Hari</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 pt-4 border-t border-primary/5 mt-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground font-medium">Streak Terbaik</span>
                <span className="font-bold text-foreground">{user?.bestStreak || 0} Hari</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground font-medium">Multiplier Streak</span>
                <span className="font-bold text-primary">1.5x XP</span>
              </div>
            </div>
          </Card>
        </motion.div>
      </motion.div>

      {/* Filter tab buttons */}
      <motion.div variants={fadeInUp} className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground/80">Lencana &amp; Penghargaan</h3>
          <div className="flex items-center gap-1.5">
            {(["all", "unlocked", "locked"] as const).map((filter) => {
              const labels = { all: "Semua", unlocked: "Terbuka", locked: "Terkunci" }
              return (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={cn(
                    "px-4 py-1.5 rounded-xl text-xs font-semibold capitalize tracking-wide transition-colors border relative overflow-hidden isolate",
                    activeFilter === filter
                      ? "text-primary-foreground border-primary shadow-soft"
                      : "bg-card border-border/80 text-muted-foreground hover:bg-muted"
                  )}
                >
                  {activeFilter === filter && (
                    <motion.span
                      layoutId="activeAchievementsFilter"
                      className="absolute inset-0 bg-primary rounded-xl -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {labels[filter]}
                </button>
              )
            })}
          </div>
        </div>

        {/* Badges Grid */}
        <motion.div
          key={activeFilter}
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {filteredAchievements.map((item, idx) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap] || Award
            return (
              <motion.div
                key={item.id}
                variants={staggerItem}
                whileHover={{ y: -6, scale: 1.02, rotate: 0.5 }}
                whileTap={{ scale: 0.98 }}
                className="h-full"
              >
                <Card
                  className={cn(
                    "border-border/80 shadow-soft transition-all duration-300 rounded-2xl flex flex-col justify-between overflow-hidden h-full",
                    item.unlocked ? "bg-card" : "opacity-60 bg-muted/20"
                  )}
                >
                  <CardContent className="flex flex-col items-center text-center p-5 gap-4 flex-1">
                    <div
                      className={cn(
                        "flex size-14 items-center justify-center rounded-2xl transition-all duration-300",
                        item.unlocked
                          ? "bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground hover:scale-110"
                          : "bg-muted text-muted-foreground/60"
                      )}
                    >
                      <Icon className="size-7" />
                    </div>

                    <div className="flex flex-col gap-1.5 flex-1">
                      <h4 className="font-bold text-base text-foreground leading-snug">{item.title}</h4>
                      <p className="text-xs text-muted-foreground/90 max-w-[160px] leading-normal mx-auto">
                        {item.description}
                      </p>
                    </div>

                    <div className="w-full flex flex-col gap-2 pt-3 border-t border-primary/5 mt-auto">
                      <div className="flex items-center justify-between text-[10px] font-semibold text-muted-foreground/80">
                        <span>HADIAH XP</span>
                        <span className="text-primary font-bold">+{item.xpReward} XP</span>
                      </div>
                      {item.progress < 100 && (
                        <Progress value={item.progress} className="h-1.5" />
                      )}
                      <div className="flex items-center justify-between text-[10px] font-bold">
                        <span className="text-muted-foreground uppercase">Progres</span>
                        <span className="text-foreground">{item.progress}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
