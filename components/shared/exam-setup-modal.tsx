"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Settings, Timer, BookOpen, Target, Play, Zap } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface ExamSetupModalProps {
  children: React.ReactElement
  defaultTopic?: string
  defaultMode?: "practice" | "exam"
}

export function ExamSetupModal({ children, defaultTopic = "N5", defaultMode = "practice" }: ExamSetupModalProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  
  const [topic, setTopic] = useState(defaultTopic)
  const [mode, setMode] = useState<"practice" | "exam">(defaultMode)
  const [questionCount, setQuestionCount] = useState<number>(5)
  const [useTimer, setUseTimer] = useState<boolean>(defaultMode === "exam")

  const counts = [3, 5, 10, 20]
  const topics = [
    { id: "N5", label: "N5 Beginner" },
    { id: "N4", label: "N4 Elementary" },
    { id: "N3", label: "N3 Intermediate" },
    { id: "Grammar", label: "Grammar Focus" },
    { id: "Vocabulary", label: "Vocabulary Focus" },
    { id: "Kanji", label: "Kanji Focus" },
  ]

  const handleStart = () => {
    setOpen(false)
    const params = new URLSearchParams({
      topic,
      count: questionCount.toString(),
      timer: useTimer.toString(),
      mode,
    })
    
    router.push(`/${mode === "exam" ? "exam" : "practice"}?${params.toString()}`)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={children} />
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="size-5 text-primary" />
            Session Setup
          </DialogTitle>
          <DialogDescription>
            Customize your learning session before you begin.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* Mode Selection */}
          <div className="flex flex-col gap-3">
            <Label className="text-xs uppercase tracking-wider text-muted-foreground font-bold">Mode</Label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => { setMode("practice"); setUseTimer(false) }}
                className={cn(
                  "flex flex-col items-center gap-2 rounded-xl border p-3 transition-all",
                  mode === "practice" 
                    ? "border-primary bg-primary/10 text-primary ring-1 ring-primary/20" 
                    : "border-border/60 hover:bg-muted"
                )}
              >
                <BookOpen className="size-5" />
                <span className="text-sm font-semibold">Practice</span>
              </button>
              <button
                type="button"
                onClick={() => { setMode("exam"); setUseTimer(true) }}
                className={cn(
                  "flex flex-col items-center gap-2 rounded-xl border p-3 transition-all",
                  mode === "exam" 
                    ? "border-destructive bg-destructive/10 text-destructive ring-1 ring-destructive/20" 
                    : "border-border/60 hover:bg-muted"
                )}
              >
                <Target className="size-5" />
                <span className="text-sm font-semibold">Mock Exam</span>
              </button>
            </div>
          </div>

          {/* Topic Selection */}
          <div className="flex flex-col gap-3">
            <Label className="text-xs uppercase tracking-wider text-muted-foreground font-bold">Focus Material</Label>
            <div className="flex flex-wrap gap-2">
              {topics.map(t => (
                <Badge
                  key={t.id}
                  variant={topic === t.id ? "default" : "secondary"}
                  className={cn("cursor-pointer py-1.5 px-3 transition-colors", topic !== t.id && "hover:bg-primary/20")}
                  onClick={() => setTopic(t.id)}
                >
                  {t.label}
                </Badge>
              ))}
            </div>
          </div>

          {/* Question Count */}
          <div className="flex flex-col gap-3">
            <Label className="text-xs uppercase tracking-wider text-muted-foreground font-bold">Number of Questions</Label>
            <div className="flex gap-2">
              {counts.map(c => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setQuestionCount(c)}
                  className={cn(
                    "flex-1 rounded-lg border py-2 text-sm font-bold transition-all",
                    questionCount === c
                      ? "border-primary bg-primary text-primary-foreground shadow-soft"
                      : "border-border/60 bg-card hover:bg-muted text-muted-foreground"
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Timer Toggle */}
          <div className="flex items-center justify-between rounded-xl border border-border/60 p-4 bg-muted/20">
            <div className="flex items-center gap-3">
              <div className={cn("rounded-lg p-2 transition-colors", useTimer ? "bg-amber-500/20 text-amber-500" : "bg-muted text-muted-foreground")}>
                <Timer className="size-4" />
              </div>
              <div className="flex flex-col gap-0.5">
                <Label className="font-semibold cursor-pointer" onClick={() => setUseTimer(!useTimer)}>Time Limit</Label>
                <span className="text-xs text-muted-foreground">
                  {mode === "exam" ? "Recommended for exams" : "Challenge yourself against the clock"}
                </span>
              </div>
            </div>
            <Switch checked={useTimer} onCheckedChange={setUseTimer} />
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleStart} className="w-full gap-2 font-bold h-11 text-base">
            <Zap className="size-4" /> Start Session
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
