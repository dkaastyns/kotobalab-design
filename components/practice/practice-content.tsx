"use client"

import { useState, useEffect, useCallback } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Check, X, Sparkles, ArrowRight, Bookmark, Lightbulb, RotateCcw, BookOpen, Zap, Loader2, Timer, Trophy, Flame, Star, Brain } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button, buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { useCurrentUser } from "@/hooks/use-user"
import { motion, AnimatePresence } from "framer-motion"
import { fadeInUp, staggerContainer, staggerItem, scaleIn } from "@/lib/animations"

type PracticeQuestion = {
  level: string
  difficulty: string
  prompt: string
  instruction: string
  choices: { id: string; label: string; text: string }[]
  correct: string
  explanation: string
  aiExplanation: string
  relatedGrammar: string[]
  relatedVocabulary: string[]
  suggestedPractice: string[]
}

export function PracticeContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const topic = searchParams.get("topic") || "N4"
  const totalCount = parseInt(searchParams.get("count") || "5", 10)
  const useTimer = searchParams.get("timer") === "true"

  const { incrementStreak, addNotification } = useCurrentUser()
  const [q, setQ] = useState<PracticeQuestion | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const [selected, setSelected] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const [number, setNumber] = useState(1)
  const [timeLeft, setTimeLeft] = useState(totalCount * 60)
  const [combo, setCombo] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [sessionDone, setSessionDone] = useState(false)

  const isCorrect = q && selected === q.correct

  const reset = () => {
    setSelected(null)
    setSubmitted(false)
  }

  const handleCheck = useCallback(() => {
    setSubmitted(true)
    if (q && selected === q.correct) {
      setCombo(c => c + 1)
      setCorrectCount(c => c + 1)
      incrementStreak()
      addNotification("Streak Tersimpan! 🔥", "Kamu menjawab benar dan menjaga streak harianmu.")
    } else {
      setCombo(0)
    }
  }, [q, selected, incrementStreak, addNotification])

  useEffect(() => {
    if (!useTimer || isLoading || submitted) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleCheck(); // Auto-submit when time is up
          return 0;
        }
        return prev - 1;
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [useTimer, isLoading, submitted, handleCheck])

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  const fetchQuestion = async () => {
    setIsLoading(true)
    setError(null)
    setSubmitted(false)
    setSelected(null)
    setBookmarked(false)
    try {
      const res = await fetch("/api/ai/generate-practice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ level: topic })
      })
      if (!res.ok) throw new Error("Failed to generate question")
      const data = await res.json()
      setQ(data)
    } catch (err: any) {
      setError(err.message || "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchQuestion()
    }, 0)
    return () => clearTimeout(timer)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const handleNext = () => {
    if (number >= totalCount) {
      setSessionDone(true)
      addNotification("Sesi Selesai! 🎉", `Kamu menyelesaikan ${totalCount} soal. Luar biasa!`)
      return
    }
    setNumber(n => n + 1)
    fetchQuestion()
  }

  if (sessionDone) {
    const accuracy = Math.round((correctCount / totalCount) * 100)
    const xpEarned = correctCount * 15
    return (
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="mx-auto flex w-full max-w-2xl flex-col items-center gap-6 py-10"
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex size-20 items-center justify-center rounded-2xl bg-primary/10 text-primary"
        >
          <Trophy className="size-10" />
        </motion.div>
        <motion.div variants={fadeInUp} className="text-center flex flex-col gap-2">
          <h2 className="text-3xl font-bold">Sesi Selesai! 🎉</h2>
          <p className="text-muted-foreground">Kamu telah menyelesaikan {totalCount} soal latihan.</p>
        </motion.div>
        <motion.div variants={staggerContainer} className="grid grid-cols-3 gap-4 w-full">
          <motion.div variants={staggerItem}>
            <Card className="text-center p-4 shadow-soft">
              <p className="text-3xl font-bold text-primary">{correctCount}</p>
              <p className="text-xs text-muted-foreground mt-1">Benar</p>
            </Card>
          </motion.div>
          <motion.div variants={staggerItem}>
            <Card className="text-center p-4 shadow-soft">
              <p className="text-3xl font-bold">{accuracy}%</p>
              <p className="text-xs text-muted-foreground mt-1">Akurasi</p>
            </Card>
          </motion.div>
          <motion.div variants={staggerItem}>
            <Card className="text-center p-4 shadow-soft">
              <p className="text-3xl font-bold text-amber-500">+{xpEarned}</p>
              <p className="text-xs text-muted-foreground mt-1">XP</p>
            </Card>
          </motion.div>
        </motion.div>
        <motion.div variants={fadeInUp} className="flex gap-3 flex-wrap justify-center mt-2">
          <Button onClick={() => { setSessionDone(false); setNumber(1); setCorrectCount(0); setCombo(0); fetchQuestion() }} className="rounded-xl px-6">
            <Brain className="size-4 mr-2" /> Latihan Lagi
          </Button>
          <Link
            href="/dashboard"
            className={cn(buttonVariants({ variant: "outline" }), "rounded-xl px-6")}
          >
            Kembali ke Dashboard
          </Link>
        </motion.div>
      </motion.div>
    )
  }

  if (isLoading) {
    return (
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center justify-center min-h-[500px] gap-4">
        <Loader2 className="size-10 animate-spin text-primary" />
        <p className="text-muted-foreground animate-pulse">Membuat soal personalisasi untukmu…</p>
      </div>
    )
  }

  if (error || !q) {
    return (
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center justify-center min-h-[500px] gap-4">
        <p className="text-destructive font-medium">{error || "Gagal memuat soal"}</p>
        <Button onClick={fetchQuestion} variant="outline">Coba Lagi</Button>
      </div>
    )
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="mx-auto flex w-full max-w-3xl flex-col gap-6"
    >
      {/* Progress header */}
      <motion.div variants={fadeInUp} className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{q.level}</Badge>
            <Badge variant="outline">{q.difficulty}</Badge>
            {combo >= 2 && (
              <motion.div
                initial={{ scale: 0.5, rotate: -10 }}
                animate={{ scale: [1, 1.15, 1], rotate: [-10, 5, -5, 0] }}
                transition={{ repeat: Infinity, duration: 1.8, repeatDelay: 1 }}
              >
                <Badge className="bg-amber-500 text-white gap-1 select-none">
                  <Flame className="size-3 fill-white" /> {combo}x Combo!
                </Badge>
              </motion.div>
            )}
          </div>
          <span className="text-sm font-semibold text-muted-foreground flex items-center gap-4">
            {useTimer && (
              <span className={cn("flex items-center gap-1.5", timeLeft < 60 ? "text-destructive" : "text-amber-500")}>
                <Timer className="size-4" />
                {formatTime(timeLeft)}
              </span>
            )}
            Soal {number} / {totalCount}
          </span>
        </div>
        <Progress value={Math.min(100, (number / totalCount) * 100)} className="transition-all duration-500" />
      </motion.div>

      {/* Question card */}
      <motion.div variants={fadeInUp}>
        <Card className="shadow-soft">
          <CardHeader className="flex flex-row items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <CardTitle className="text-pretty text-2xl leading-snug">{q.prompt}</CardTitle>
              <p className="text-sm text-muted-foreground">{q.instruction}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Bookmark question"
              onClick={() => setBookmarked((b) => !b)}
            >
              <Bookmark className={cn(bookmarked && "fill-primary text-primary")} />
            </Button>
          </CardHeader>
          <CardContent>
            <motion.div
              key={number}
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="flex flex-col gap-3"
            >
              {q.choices.map((c) => {
                const chosen = selected === c.id
                const correct = c.id === q.correct
                const showState = submitted && (correct || chosen)
                return (
                  <motion.button
                    key={c.id}
                    variants={staggerItem}
                    whileHover={!submitted ? { scale: 1.01, x: 2 } : undefined}
                    whileTap={!submitted ? { scale: 0.99 } : undefined}
                    type="button"
                    disabled={submitted}
                    onClick={() => setSelected(c.id)}
                    className={cn(
                      "flex items-center gap-4 rounded-xl border bg-card p-4 text-left transition-colors w-full",
                      !submitted && "hover:border-primary/50 hover:bg-primary/5",
                      chosen && !submitted && "border-primary bg-primary/5",
                      showState && correct && "border-[oklch(0.6_0.13_155)] bg-[oklch(0.95_0.04_155)]",
                      showState && chosen && !correct && "border-destructive bg-destructive/5",
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-9 shrink-0 items-center justify-center rounded-lg border font-semibold uppercase",
                        chosen && !submitted && "border-primary text-primary",
                        showState && correct && "border-[oklch(0.6_0.13_155)] text-[oklch(0.45_0.12_155)]",
                        showState && chosen && !correct && "border-destructive text-destructive",
                      )}
                    >
                      {showState && correct ? (
                        <Check className="size-4" />
                      ) : showState && chosen && !correct ? (
                        <X className="size-4" />
                      ) : (
                        c.id
                      )}
                    </span>
                    <span className="flex flex-col">
                      <span className="text-lg font-medium">{c.label}</span>
                      <span className="text-sm text-muted-foreground">{c.text}</span>
                    </span>
                  </motion.button>
                )
              })}
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Action bar */}
      <motion.div variants={fadeInUp} className="flex items-center justify-between">
        <Button variant="ghost" onClick={reset} disabled={!submitted}>
          <RotateCcw data-icon="inline-start" />
          Ulangi
        </Button>
        {!submitted ? (
          <Button disabled={!selected} onClick={handleCheck}>
            Cek Jawaban
            <ArrowRight data-icon="inline-end" />
          </Button>
        ) : (
          <Button onClick={handleNext}>
            {number >= totalCount ? "Lihat Hasil" : "Soal Berikutnya"}
            <ArrowRight data-icon="inline-end" />
          </Button>
        )}
      </motion.div>

      {/* Feedback + explanation */}
      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: "spring", stiffness: 180, damping: 20 }}
            className="flex flex-col gap-4 overflow-hidden"
          >
            <Card
              className={cn(
                "shadow-soft",
                isCorrect
                  ? "border-[oklch(0.6_0.13_155)]/40 bg-[oklch(0.97_0.02_155)]"
                  : "border-destructive/40 bg-destructive/5",
              )}
            >
              <CardContent className="flex items-start gap-3 p-5">
                <div
                  className={cn(
                    "flex size-9 shrink-0 items-center justify-center rounded-full",
                    isCorrect ? "bg-[oklch(0.6_0.13_155)] text-white" : "bg-destructive text-white",
                  )}
                >
                  {isCorrect ? <Check className="size-5" /> : <X className="size-5" />}
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-semibold">{isCorrect ? "Betul! 🎉" : "Hampir benar..."}</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">{q.explanation}</p>
                </div>
              </CardContent>
            </Card>

            {/* AI explanation */}
            <Card className="border-primary/20 bg-primary/5 shadow-soft">
              <CardHeader className="flex-row items-center gap-2 pb-2">
                <div className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Sparkles className="size-4" />
                </div>
                <CardTitle className="text-base">Penjelasan AI</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <p className="text-sm leading-relaxed text-muted-foreground">{q.aiExplanation}</p>
                <Separator />
                <div className="grid gap-4 sm:grid-cols-3">
                  <RelatedList icon={Lightbulb} title="Tata Bahasa" items={q.relatedGrammar} />
                  <RelatedList icon={BookOpen} title="Kosakata" items={q.relatedVocabulary} />
                  <RelatedList icon={Zap} title="Latihan Selanjutnya" items={q.suggestedPractice} />
                </div>
                <Link
                  href="/tutor"
                  className={cn(buttonVariants({ variant: "outline", size: "sm" }), "w-fit flex items-center gap-1.5")}
                >
                  <Sparkles className="size-4" />
                  Tanya tutor lebih lanjut
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function RelatedList({
  icon: Icon,
  title,
  items,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  items: string[]
}) {
  if (!items || items.length === 0) return null;
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        <Icon className="size-3.5" />
        {title}
      </div>
      <ul className="flex flex-col gap-1.5">
        {items.map((it, idx) => (
          <li key={idx} className="text-sm leading-snug">
            {it}
          </li>
        ))}
      </ul>
    </div>
  )
}
