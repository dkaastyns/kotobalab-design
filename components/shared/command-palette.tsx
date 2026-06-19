"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { useRouter } from "next/navigation"
import {
  Search, LayoutDashboard, GraduationCap, Globe, Bot, Layers,
  BookOpen, Languages, Bookmark, CalendarDays, BarChart3, Trophy,
  Settings, Brain, X, ArrowRight, Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

interface CommandItem {
  id: string
  label: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  action: () => void
  category: string
  keywords?: string[]
}

interface CommandPaletteProps {
  open: boolean
  onClose: () => void
}

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const navigate = useCallback((href: string) => {
    router.push(href)
    onClose()
    setQuery("")
  }, [router, onClose])

  const allCommands: CommandItem[] = [
    { id: "dashboard", label: "Dashboard", description: "View your learning overview", icon: LayoutDashboard, action: () => navigate("/dashboard"), category: "Navigation", keywords: ["home", "beranda"] },
    { id: "jlpt", label: "JLPT", description: "JLPT N5–N2 prep & mock exams", icon: GraduationCap, action: () => navigate("/jlpt"), category: "Navigation", keywords: ["japanese", "level"] },
    { id: "toefl", label: "TOEFL", description: "TOEFL prep materials", icon: Globe, action: () => navigate("/toefl"), category: "Navigation", keywords: ["english", "english test"] },
    { id: "tutor", label: "AI Tutor", description: "Chat with your AI language tutor", icon: Bot, action: () => navigate("/tutor"), category: "Navigation", keywords: ["chat", "ask", "tanya"] },
    { id: "flashcards", label: "Flashcards", description: "Review your spaced-repetition cards", icon: Layers, action: () => navigate("/flashcards"), category: "Navigation", keywords: ["kartu", "review", "card"] },
    { id: "vocabulary", label: "Vocabulary", description: "Browse and search Japanese words", icon: BookOpen, action: () => navigate("/vocabulary"), category: "Navigation", keywords: ["kata", "kosakata", "word", "kamus", "dictionary"] },
    { id: "kanji", label: "Kanji Library", description: "Explore kanji characters", icon: Languages, action: () => navigate("/kanji"), category: "Navigation", keywords: ["character", "karakter"] },
    { id: "bookmarks", label: "Bookmarks", description: "Your saved words and grammar points", icon: Bookmark, action: () => navigate("/bookmarks"), category: "Navigation", keywords: ["simpan", "saved"] },
    { id: "planner", label: "Study Planner", description: "Plan your weekly study schedule", icon: CalendarDays, action: () => navigate("/planner"), category: "Navigation", keywords: ["jadwal", "schedule", "week"] },
    { id: "analytics", label: "Analytics", description: "Track your performance over time", icon: BarChart3, action: () => navigate("/analytics"), category: "Navigation", keywords: ["stats", "progress", "grafik"] },
    { id: "achievements", label: "Achievements", description: "View your badges and milestones", icon: Trophy, action: () => navigate("/achievements"), category: "Navigation", keywords: ["badge", "reward"] },
    { id: "settings", label: "Settings", description: "Manage your preferences", icon: Settings, action: () => navigate("/settings"), category: "Navigation", keywords: ["pengaturan", "dark mode", "theme"] },
    { id: "practice-n5", label: "Practice N5", description: "Start a quick N5 practice session", icon: Brain, action: () => navigate("/practice?topic=N5&count=5"), category: "Quick Actions", keywords: ["latihan", "n5", "beginner"] },
    { id: "practice-n4", label: "Practice N4", description: "Start a quick N4 practice session", icon: Brain, action: () => navigate("/practice?topic=N4&count=5"), category: "Quick Actions", keywords: ["latihan", "n4"] },
    { id: "practice-grammar", label: "Grammar Practice", description: "Focus on grammar points", icon: Sparkles, action: () => navigate("/practice?topic=N4&count=5&category=Grammar"), category: "Quick Actions", keywords: ["tata bahasa", "grammar"] },
    { id: "practice-kanji", label: "Kanji Practice", description: "Focus on kanji readings", icon: Languages, action: () => navigate("/practice?topic=N4&count=5&category=Kanji"), category: "Quick Actions", keywords: ["kanji quiz"] },
  ]

  const filtered = query.trim()
    ? allCommands.filter(cmd => {
      const q = query.toLowerCase()
      return (
        cmd.label.toLowerCase().includes(q) ||
        cmd.description.toLowerCase().includes(q) ||
        cmd.category.toLowerCase().includes(q) ||
        (cmd.keywords || []).some(k => k.includes(q))
      )
    })
    : allCommands

  const groupedCommands = filtered.reduce((acc, cmd) => {
    if (!acc[cmd.category]) acc[cmd.category] = []
    acc[cmd.category].push(cmd)
    return acc
  }, {} as Record<string, CommandItem[]>)

  const flatFiltered = Object.values(groupedCommands).flat()

  useEffect(() => {
    setActiveIndex(0)
  }, [query])

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50)
      setQuery("")
      setActiveIndex(0)
    }
  }, [open])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setActiveIndex(i => Math.min(i + 1, flatFiltered.length - 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setActiveIndex(i => Math.max(i - 1, 0))
    } else if (e.key === "Enter") {
      e.preventDefault()
      if (flatFiltered[activeIndex]) {
        flatFiltered[activeIndex].action()
      }
    } else if (e.key === "Escape") {
      onClose()
    }
  }

  // Scroll active item into view
  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-active="true"]`)
    el?.scrollIntoView({ block: "nearest" })
  }, [activeIndex])

  let flatIndex = 0

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -12 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="fixed left-1/2 top-[20%] z-50 w-full max-w-xl -translate-x-1/2"
          >
            <div
              className="rounded-2xl border border-border bg-card shadow-2xl overflow-hidden"
              onKeyDown={handleKeyDown}
            >
              {/* Search input */}
              <div className="flex items-center gap-3 border-b border-border px-4 py-3">
                <Search className="size-5 shrink-0 text-muted-foreground" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search pages, actions, topics…"
                  className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
                />
                {query && (
                  <button onClick={() => setQuery("")} className="text-muted-foreground hover:text-foreground transition-colors">
                    <X className="size-4" />
                  </button>
                )}
                <kbd className="hidden sm:flex items-center gap-1 text-[10px] font-mono text-muted-foreground bg-muted px-2 py-1 rounded-md border border-border">
                  ESC
                </kbd>
              </div>

              {/* Results */}
              <div ref={listRef} className="max-h-80 overflow-y-auto py-2">
                {Object.keys(groupedCommands).length === 0 ? (
                  <div className="py-8 text-center text-sm text-muted-foreground">
                    No results for &ldquo;{query}&rdquo;
                  </div>
                ) : (
                  Object.entries(groupedCommands).map(([category, items]) => (
                    <div key={category}>
                      <p className="px-4 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                        {category}
                      </p>
                      {items.map((item) => {
                        const isActive = flatIndex === activeIndex
                        const currentIndex = flatIndex
                        flatIndex++
                        const Icon = item.icon
                        return (
                          <button
                            key={item.id}
                            data-active={isActive}
                            onClick={() => item.action()}
                            onMouseEnter={() => setActiveIndex(currentIndex)}
                            className={cn(
                              "flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors",
                              isActive ? "bg-primary/10 text-foreground" : "text-muted-foreground hover:bg-muted"
                            )}
                          >
                            <div className={cn(
                              "flex size-8 shrink-0 items-center justify-center rounded-lg transition-colors",
                              isActive ? "bg-primary text-primary-foreground" : "bg-muted/60 text-muted-foreground"
                            )}>
                              <Icon className="size-4" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className={cn("font-medium truncate", isActive && "text-foreground")}>{item.label}</p>
                              <p className="text-xs text-muted-foreground truncate">{item.description}</p>
                            </div>
                            {isActive && <ArrowRight className="size-4 shrink-0 text-primary" />}
                          </button>
                        )
                      })}
                    </div>
                  ))
                )}
              </div>

              {/* Footer hint */}
              <div className="flex items-center justify-between gap-2 border-t border-border px-4 py-2 text-[10px] text-muted-foreground">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1"><kbd className="font-mono bg-muted px-1.5 py-0.5 rounded border border-border text-[9px]">↑↓</kbd> Navigate</span>
                  <span className="flex items-center gap-1"><kbd className="font-mono bg-muted px-1.5 py-0.5 rounded border border-border text-[9px]">↵</kbd> Open</span>
                </div>
                <span className="flex items-center gap-1"><kbd className="font-mono bg-muted px-1.5 py-0.5 rounded border border-border text-[9px]">Ctrl K</kbd> Toggle</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
