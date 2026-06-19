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
import { motion } from "framer-motion"
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations"

const sectionIcons = {
  Reading: ScrollText,
  Listening: Headphones,
  Speaking: Mic,
  Writing: PenLine,
} as const

export function ToeflContent() {
  const total = toeflSections.reduce((sum, s) => sum + s.score, 0)

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="flex flex-col gap-8"
    >
      <motion.div variants={fadeInUp}>
        <Card className="overflow-hidden border-primary/15 bg-gradient-to-br from-primary/8 to-card shadow-soft rounded-3xl">
          <CardContent className="flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-2">
              <Badge variant="secondary" className="w-fit">
                Test of English as a Foreign Language
              </Badge>
              <h2 className="text-pretty text-2xl font-semibold font-display">Projected score {total}/120</h2>
              <p className="max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
                Your projected TOEFL iBT score based on practice performance. Target a balanced profile across all four
                sections.
              </p>
              <Link href="/exam" className={cn(buttonVariants({ variant: "default", size: "default" }), "mt-2 w-fit rounded-xl shadow-soft")}>
                <Trophy data-icon="inline-start" />
                Start full mock test
              </Link>
            </div>
            <CircularProgress value={toeflReadiness.score} max={120} size={96} label="readiness" />
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={fadeInUp}>
        <motion.div variants={staggerContainer} className="grid gap-4 sm:grid-cols-2">
          {toeflSections.map((s) => {
            const Icon = sectionIcons[s.name as keyof typeof sectionIcons]
            return (
              <motion.div
                variants={staggerItem}
                key={s.name}
                whileHover={{ y: -4, scale: 1.015 }}
                whileTap={{ scale: 0.985 }}
              >
                <Card className="transition-colors hover:border-primary/40 h-full shadow-soft rounded-2xl">
                  <CardHeader className="flex flex-row items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Icon className="size-5" />
                      </div>
                      <div>
                        <CardTitle className="text-base font-semibold">{s.name}</CardTitle>
                        <CardDescription>
                          {s.score} / {s.max}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge variant="outline">{s.progress}%</Badge>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4">
                    <Progress value={s.progress} />
                    <Link href="/practice" className={cn(buttonVariants({ variant: "secondary", size: "default" }), "w-full rounded-xl")}>
                      Practice {s.name}
                      <ArrowRight data-icon="inline-end" />
                    </Link>
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
