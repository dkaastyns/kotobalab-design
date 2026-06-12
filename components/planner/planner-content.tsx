"use client"

import { useState, useEffect, useRef } from "react"
import {
  Calendar, CheckCircle2, Circle, Plus, Sparkles, Trash2,
  Pencil, X, Check, ChevronUp, ChevronDown, Loader2, Wand2, GripVertical,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { planner as defaultPlanner } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

const STORAGE_KEY = "kotobalab-planner"
const ALL_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
const CATEGORIES = ["grammar", "vocabulary", "kanji", "reading", "listening", "exam", "review", "other"] as const

type TaskItem = {
  t: string
  done: boolean
  category?: string
  timeMinutes?: number
}

type DayItem = {
  id: number
  day: string
  tasks: TaskItem[]
}

function loadPlanner(): DayItem[] {
  if (typeof window === "undefined") return []
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch {}
  // Default data with all 7 days
  const fullWeek: DayItem[] = ALL_DAYS.map((day, idx) => {
    const existing = defaultPlanner.find((d) => d.day === day)
    if (existing) {
      return { ...existing, tasks: existing.tasks.map((t) => ({ ...t, category: "other", timeMinutes: 30 })) }
    }
    return { id: idx + 100, day, tasks: [] }
  })
  return fullWeek
}

function savePlanner(data: DayItem[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }
}

export function PlannerContent() {
  const [schedule, setSchedule] = useState<DayItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [newTaskDay, setNewTaskDay] = useState<number | null>(null)
  const [newTaskText, setNewTaskText] = useState("")
  const [newTaskCategory, setNewTaskCategory] = useState("other")
  const [editingTask, setEditingTask] = useState<{ dayId: number; taskIdx: number } | null>(null)
  const [editingText, setEditingText] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [addingDay, setAddingDay] = useState(false)
  const [newDayName, setNewDayName] = useState("")
  const newTaskRef = useRef<HTMLInputElement>(null)
  const editRef = useRef<HTMLInputElement>(null)

  // Load from localStorage on mount
  useEffect(() => {
    setSchedule(loadPlanner())
    setIsLoaded(true)
  }, [])

  // Save to localStorage on every change
  useEffect(() => {
    if (isLoaded && schedule.length > 0) {
      savePlanner(schedule)
    }
  }, [schedule, isLoaded])

  // Auto-focus inputs
  useEffect(() => {
    if (newTaskDay !== null) newTaskRef.current?.focus()
  }, [newTaskDay])
  useEffect(() => {
    if (editingTask) editRef.current?.focus()
  }, [editingTask])

  const toggleTask = (dayId: number, taskIndex: number) => {
    setSchedule((prev) =>
      prev.map((day) => {
        if (day.id === dayId) {
          const nextTasks = day.tasks.map((task, idx) =>
            idx === taskIndex ? { ...task, done: !task.done } : task
          )
          return { ...day, tasks: nextTasks }
        }
        return day
      })
    )
  }

  const addTask = (dayId: number) => {
    if (!newTaskText.trim()) return
    setSchedule((prev) =>
      prev.map((day) => {
        if (day.id === dayId) {
          return {
            ...day,
            tasks: [...day.tasks, { t: newTaskText.trim(), done: false, category: newTaskCategory, timeMinutes: 30 }],
          }
        }
        return day
      })
    )
    setNewTaskText("")
    setNewTaskCategory("other")
    setNewTaskDay(null)
    toast.success("Task added!")
  }

  const removeTask = (dayId: number, taskIndex: number) => {
    setSchedule((prev) =>
      prev.map((day) => {
        if (day.id === dayId) {
          return { ...day, tasks: day.tasks.filter((_, idx) => idx !== taskIndex) }
        }
        return day
      })
    )
    toast.success("Task removed")
  }

  const startEditing = (dayId: number, taskIdx: number, currentText: string) => {
    setEditingTask({ dayId, taskIdx })
    setEditingText(currentText)
  }

  const saveEdit = () => {
    if (!editingTask || !editingText.trim()) return
    setSchedule((prev) =>
      prev.map((day) => {
        if (day.id === editingTask.dayId) {
          return {
            ...day,
            tasks: day.tasks.map((task, idx) =>
              idx === editingTask.taskIdx ? { ...task, t: editingText.trim() } : task
            ),
          }
        }
        return day
      })
    )
    setEditingTask(null)
    setEditingText("")
    toast.success("Task updated")
  }

  const removeDay = (dayId: number) => {
    setSchedule((prev) => prev.filter((d) => d.id !== dayId))
    toast.success("Day removed")
  }

  const addDay = () => {
    if (!newDayName.trim()) return
    const maxId = Math.max(0, ...schedule.map((d) => d.id))
    setSchedule((prev) => [...prev, { id: maxId + 1, day: newDayName.trim(), tasks: [] }])
    setNewDayName("")
    setAddingDay(false)
    toast.success("Day added!")
  }

  const moveTask = (dayId: number, taskIdx: number, direction: "up" | "down") => {
    setSchedule((prev) =>
      prev.map((day) => {
        if (day.id === dayId) {
          const tasks = [...day.tasks]
          const targetIdx = direction === "up" ? taskIdx - 1 : taskIdx + 1
          if (targetIdx < 0 || targetIdx >= tasks.length) return day
          ;[tasks[taskIdx], tasks[targetIdx]] = [tasks[targetIdx], tasks[taskIdx]]
          return { ...day, tasks }
        }
        return day
      })
    )
  }

  const generateAIPlan = async () => {
    setIsGenerating(true)
    try {
      const res = await fetch("/api/ai/generate-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          level: "N4",
          target: "JLPT N4",
          weakAreas: ["Reading comprehension", "Transitive verbs", "Listening"],
          studyHoursPerDay: 1,
        }),
      })

      if (!res.ok) throw new Error("Failed to generate plan")

      const data = await res.json()

      if (data.days && Array.isArray(data.days)) {
        const newSchedule: DayItem[] = data.days.map((d: { day: string; tasks: { t: string; category?: string; timeMinutes?: number }[] }, idx: number) => ({
          id: idx + 200,
          day: d.day,
          tasks: d.tasks.map((t: { t: string; category?: string; timeMinutes?: number }) => ({
            t: t.t,
            done: false,
            category: t.category || "other",
            timeMinutes: t.timeMinutes || 30,
          })),
        }))
        setSchedule(newSchedule)
        toast.success("AI study plan generated! 🎉")
      }
    } catch (err) {
      console.error(err)
      toast.error("Failed to generate AI plan. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case "grammar": return "bg-blue-500/10 text-blue-600 dark:text-blue-400"
      case "vocabulary": return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
      case "kanji": return "bg-purple-500/10 text-purple-600 dark:text-purple-400"
      case "reading": return "bg-amber-500/10 text-amber-600 dark:text-amber-400"
      case "listening": return "bg-pink-500/10 text-pink-600 dark:text-pink-400"
      case "exam": return "bg-red-500/10 text-red-600 dark:text-red-400"
      case "review": return "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400"
      default: return "bg-muted text-muted-foreground"
    }
  }

  // Show loading skeleton until data loaded
  if (!isLoaded) {
    return (
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
        <div className="h-32 rounded-3xl bg-muted/30 animate-pulse" />
        <div className="h-48 rounded-2xl bg-muted/30 animate-pulse" />
        <div className="h-48 rounded-2xl bg-muted/30 animate-pulse" />
      </div>
    )
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
      {/* Top Welcome banner */}
      <Card className="border-primary/15 bg-gradient-to-br from-primary/8 to-card shadow-soft p-6 rounded-3xl">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-primary">
            <Calendar className="size-5" />
            <span className="text-xs uppercase tracking-wider font-bold">Planner</span>
          </div>
          <h2 className="text-2xl font-semibold">Weekly Study Agenda</h2>
          <p className="text-sm leading-relaxed text-muted-foreground max-w-lg">
            Stay on track with your study routine. Add, edit, or remove tasks. Use AI to auto-generate a personalized plan.
          </p>
          <div className="flex items-center gap-2 mt-3">
            <Button
              size="sm"
              className="rounded-xl text-xs font-semibold gap-1.5 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-soft"
              onClick={generateAIPlan}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="size-3.5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="size-3.5" />
                  Generate with AI
                </>
              )}
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="rounded-xl text-xs font-semibold gap-1.5"
              onClick={() => setAddingDay(true)}
            >
              <Plus className="size-3.5" />
              Add Day
            </Button>
          </div>
        </div>
      </Card>

      {/* Add Day inline form */}
      {addingDay && (
        <Card className="border-primary/20 shadow-soft rounded-2xl p-4 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2">
            <Select value={newDayName} onValueChange={setNewDayName}>
              <SelectTrigger className="flex-1 rounded-xl h-10 text-sm">
                <SelectValue placeholder="Select or type a day..." />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                {ALL_DAYS.filter((d) => !schedule.some((s) => s.day === d)).map((d) => (
                  <SelectItem key={d} value={d}>{d}</SelectItem>
                ))}
                <SelectItem value="Custom Day">Custom Day</SelectItem>
              </SelectContent>
            </Select>
            {newDayName === "Custom Day" && (
              <Input
                placeholder="Day name..."
                className="flex-1 rounded-xl h-10 text-sm"
                value=""
                onChange={(e) => setNewDayName(e.target.value)}
              />
            )}
            <Button size="sm" className="rounded-xl h-10 px-4" onClick={addDay} disabled={!newDayName.trim()}>
              <Check className="size-4" />
            </Button>
            <Button size="sm" variant="ghost" className="rounded-xl h-10 px-3" onClick={() => { setAddingDay(false); setNewDayName("") }}>
              <X className="size-4" />
            </Button>
          </div>
        </Card>
      )}

      {/* Week day list */}
      <div className="flex flex-col gap-4">
        {schedule.map((day) => {
          const completedCount = day.tasks.filter((t) => t.done).length
          const totalCount = day.tasks.length
          const allDone = completedCount === totalCount && totalCount > 0

          return (
            <Card
              key={day.id}
              className={cn(
                "border-border/80 shadow-soft transition-all rounded-2xl",
                allDone && "bg-success/5 border-success/20"
              )}
            >
              <CardHeader className="flex flex-row items-center justify-between py-4 px-6 border-b border-primary/5">
                <div className="flex flex-col">
                  <CardTitle className="text-base font-semibold">{day.day}</CardTitle>
                  <CardDescription className="text-xs">
                    {totalCount === 0 ? "No tasks yet" : `${completedCount} of ${totalCount} goals reached`}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-1.5">
                  {allDone && (
                    <span className="text-xs font-semibold text-success flex items-center gap-1.5 bg-success/10 px-3 py-1 rounded-full">
                      <CheckCircle2 className="size-3.5" />
                      All completed
                    </span>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 rounded-lg text-muted-foreground hover:text-primary"
                    onClick={() => setNewTaskDay(newTaskDay === day.id ? null : day.id)}
                  >
                    <Plus className="size-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/5"
                    onClick={() => removeDay(day.id)}
                  >
                    <Trash2 className="size-3.5" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6 flex flex-col gap-2">
                {day.tasks.map((task, idx) => (
                  <div key={idx} className="group flex items-center gap-2 w-full hover:bg-muted/50 p-2.5 rounded-xl transition-colors">
                    {/* Toggle done */}
                    <button onClick={() => toggleTask(day.id, idx)} className="shrink-0">
                      {task.done ? (
                        <CheckCircle2 className="size-5 text-primary transition-transform hover:scale-110" />
                      ) : (
                        <Circle className="size-5 text-muted-foreground/60 transition-transform hover:scale-110" />
                      )}
                    </button>

                    {/* Task text or edit input */}
                    {editingTask?.dayId === day.id && editingTask?.taskIdx === idx ? (
                      <div className="flex-1 flex items-center gap-2">
                        <Input
                          ref={editRef}
                          value={editingText}
                          onChange={(e) => setEditingText(e.target.value)}
                          onKeyDown={(e) => { if (e.key === "Enter") saveEdit(); if (e.key === "Escape") setEditingTask(null) }}
                          className="flex-1 h-8 rounded-lg text-sm"
                        />
                        <Button size="icon" variant="ghost" className="size-7 rounded-md text-primary" onClick={saveEdit}>
                          <Check className="size-3.5" />
                        </Button>
                        <Button size="icon" variant="ghost" className="size-7 rounded-md" onClick={() => setEditingTask(null)}>
                          <X className="size-3.5" />
                        </Button>
                      </div>
                    ) : (
                      <>
                        <span
                          className={cn(
                            "text-sm font-medium leading-normal flex-1",
                            task.done ? "text-muted-foreground line-through decoration-muted-foreground/60" : "text-foreground"
                          )}
                        >
                          {task.t}
                        </span>
                        {task.category && task.category !== "other" && (
                          <span className={cn("text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md", getCategoryColor(task.category))}>
                            {task.category}
                          </span>
                        )}
                      </>
                    )}

                    {/* Action buttons (visible on hover) */}
                    {!(editingTask?.dayId === day.id && editingTask?.taskIdx === idx) && (
                      <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" className="size-7 rounded-md text-muted-foreground hover:text-primary"
                          onClick={() => moveTask(day.id, idx, "up")} disabled={idx === 0}>
                          <ChevronUp className="size-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="size-7 rounded-md text-muted-foreground hover:text-primary"
                          onClick={() => moveTask(day.id, idx, "down")} disabled={idx === day.tasks.length - 1}>
                          <ChevronDown className="size-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="size-7 rounded-md text-muted-foreground hover:text-primary"
                          onClick={() => startEditing(day.id, idx, task.t)}>
                          <Pencil className="size-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="size-7 rounded-md text-muted-foreground hover:text-destructive"
                          onClick={() => removeTask(day.id, idx)}>
                          <Trash2 className="size-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                ))}

                {/* Add new task inline form */}
                {newTaskDay === day.id && (
                  <div className="flex items-center gap-2 mt-2 p-2 bg-primary/5 rounded-xl border border-primary/10 animate-in fade-in slide-in-from-top-2">
                    <Input
                      ref={newTaskRef}
                      placeholder="New task name..."
                      value={newTaskText}
                      onChange={(e) => setNewTaskText(e.target.value)}
                      onKeyDown={(e) => { if (e.key === "Enter") addTask(day.id); if (e.key === "Escape") { setNewTaskDay(null); setNewTaskText("") } }}
                      className="flex-1 h-9 rounded-lg text-sm border-border/60 bg-background/80"
                    />
                    <Select value={newTaskCategory} onValueChange={setNewTaskCategory}>
                      <SelectTrigger className="w-[120px] h-9 rounded-lg text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        {CATEGORIES.map((c) => (
                          <SelectItem key={c} value={c} className="text-xs capitalize">{c}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button size="sm" className="h-9 rounded-lg px-3" onClick={() => addTask(day.id)} disabled={!newTaskText.trim()}>
                      <Plus className="size-3.5 mr-1" /> Add
                    </Button>
                    <Button size="sm" variant="ghost" className="h-9 rounded-lg px-2" onClick={() => { setNewTaskDay(null); setNewTaskText(""); setNewTaskCategory("other") }}>
                      <X className="size-3.5" />
                    </Button>
                  </div>
                )}

                {day.tasks.length === 0 && newTaskDay !== day.id && (
                  <button
                    onClick={() => setNewTaskDay(day.id)}
                    className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors p-3 rounded-xl border border-dashed border-border/60 w-full justify-center"
                  >
                    <Plus className="size-3.5" />
                    Add your first task
                  </button>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {schedule.length === 0 && (
        <Card className="border-dashed border-2 border-border/80 bg-card p-12 text-center rounded-2xl flex flex-col items-center justify-center gap-4">
          <div className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <Calendar className="size-6" />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="font-semibold text-lg text-foreground">No study plan yet</h3>
            <p className="text-sm text-muted-foreground max-w-sm">
              Click &ldquo;Add Day&rdquo; to build your own plan, or use &ldquo;Generate with AI&rdquo; to create one automatically.
            </p>
          </div>
        </Card>
      )}
    </div>
  )
}
