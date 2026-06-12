"use client"

import { useState, useEffect } from "react"
import {
  Bookmark, Trash2, BookOpen, PenLine, Sparkles, HelpCircle,
  Plus, Search, X, Check, ChevronDown, ChevronUp, ExternalLink,
  Loader2, FileText, Edit3, Filter,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { bookmarks as defaultBookmarks } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

const STORAGE_KEY = "kotobalab-bookmarks"

const bookmarkTypes = ["All", "Grammar", "Vocabulary", "Kanji", "Question", "Reading"] as const
type BookmarkType = typeof bookmarkTypes[number]

const typeIcons = {
  Grammar: PenLine,
  Vocabulary: BookOpen,
  Kanji: Sparkles,
  Question: HelpCircle,
  Reading: FileText,
} as const

type BookmarkItem = {
  id: number
  type: string
  title: string
  level: string
  note: string
  content?: string
}

type AIDetail = {
  examples: { japanese: string; romaji: string; english: string }[]
  grammarNote: string
  mnemonic: string
}

function loadBookmarks(): BookmarkItem[] {
  if (typeof window === "undefined") return []
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored)
  } catch {}
  return defaultBookmarks.map((b) => ({ ...b, content: "" }))
}

function saveBookmarks(data: BookmarkItem[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }
}

export function BookmarksContent() {
  const [activeTab, setActiveTab] = useState<string>("All")
  const [items, setItems] = useState<BookmarkItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [aiDetails, setAiDetails] = useState<Record<number, AIDetail | "loading" | "error">>({})

  // Add form state
  const [isAdding, setIsAdding] = useState(false)
  const [newType, setNewType] = useState("Grammar")
  const [newTitle, setNewTitle] = useState("")
  const [newLevel, setNewLevel] = useState("N4")
  const [newNote, setNewNote] = useState("")

  // Edit state
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editNote, setEditNote] = useState("")

  // Sort state
  const [sortBy, setSortBy] = useState<"newest" | "level" | "type">("newest")

  useEffect(() => {
    setItems(loadBookmarks())
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (isLoaded) saveBookmarks(items)
  }, [items, isLoaded])

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
    if (expandedId === id) setExpandedId(null)
    toast.success("Bookmark removed")
  }

  const addItem = () => {
    if (!newTitle.trim()) return
    const maxId = Math.max(0, ...items.map((i) => i.id))
    const newItem: BookmarkItem = {
      id: maxId + 1,
      type: newType,
      title: newTitle.trim(),
      level: newLevel,
      note: newNote.trim(),
    }
    setItems((prev) => [newItem, ...prev])
    setNewTitle("")
    setNewNote("")
    setNewType("Grammar")
    setNewLevel("N4")
    setIsAdding(false)
    toast.success("Bookmark added!")
  }

  const startEditNote = (id: number, currentNote: string) => {
    setEditingId(id)
    setEditNote(currentNote)
  }

  const saveEditNote = () => {
    if (editingId === null) return
    setItems((prev) =>
      prev.map((item) => (item.id === editingId ? { ...item, note: editNote.trim() } : item))
    )
    setEditingId(null)
    setEditNote("")
    toast.success("Note updated")
  }

  const fetchAIDetail = async (item: BookmarkItem) => {
    if (aiDetails[item.id]) {
      setExpandedId(expandedId === item.id ? null : item.id)
      return
    }

    setExpandedId(item.id)
    setAiDetails((prev) => ({ ...prev, [item.id]: "loading" }))

    try {
      const res = await fetch("/api/ai/explain-word", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          word: item.title.split(" — ")[0].split("(")[0].trim(),
          reading: "",
          meaning: item.title.split(" — ")[1] || item.title,
        }),
      })

      if (!res.ok) throw new Error("Failed to fetch")
      const data = await res.json()
      setAiDetails((prev) => ({ ...prev, [item.id]: data }))
    } catch {
      setAiDetails((prev) => ({ ...prev, [item.id]: "error" }))
    }
  }

  // Filter and sort
  let filteredItems = items.filter((item) => {
    const matchesTab = activeTab === "All" || item.type === activeTab
    const matchesSearch =
      searchQuery === "" ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.note.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.type.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesTab && matchesSearch
  })

  if (sortBy === "level") {
    filteredItems = [...filteredItems].sort((a, b) => a.level.localeCompare(b.level))
  } else if (sortBy === "type") {
    filteredItems = [...filteredItems].sort((a, b) => a.type.localeCompare(b.type))
  }

  if (!isLoaded) {
    return (
      <div className="flex flex-col gap-6">
        <div className="h-12 rounded-xl bg-muted/30 animate-pulse" />
        <div className="grid gap-4 md:grid-cols-2">
          <div className="h-32 rounded-2xl bg-muted/30 animate-pulse" />
          <div className="h-32 rounded-2xl bg-muted/30 animate-pulse" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Top bar: Search + Add + Sort */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search bookmarks..."
            className="pl-10 rounded-xl h-11 border-border bg-card/60"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Select value={sortBy} onValueChange={(v) => setSortBy(v as typeof sortBy)}>
            <SelectTrigger className="w-[130px] rounded-xl h-10 text-xs">
              <Filter className="size-3.5 mr-1.5" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="level">By Level</SelectItem>
              <SelectItem value="type">By Type</SelectItem>
            </SelectContent>
          </Select>
          <Button
            className="rounded-xl h-10 text-xs font-semibold gap-1.5"
            onClick={() => setIsAdding(!isAdding)}
          >
            <Plus className="size-3.5" />
            Add Bookmark
          </Button>
        </div>
      </div>

      {/* Add Bookmark Form */}
      {isAdding && (
        <Card className="border-primary/20 shadow-soft rounded-2xl p-5 animate-in fade-in slide-in-from-top-2">
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-primary flex items-center gap-2">
              <Bookmark className="size-4" /> New Bookmark
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase">Type</label>
                <Select value={newType} onValueChange={setNewType}>
                  <SelectTrigger className="rounded-xl h-10 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    {bookmarkTypes.filter((t) => t !== "All").map((t) => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase">JLPT Level</label>
                <Select value={newLevel} onValueChange={setNewLevel}>
                  <SelectTrigger className="rounded-xl h-10 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    {["N5", "N4", "N3", "N2", "N1"].map((l) => (
                      <SelectItem key={l} value={l}>{l}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase">Title</label>
              <Input
                placeholder="e.g. 〜ながら (simultaneous actions)"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="rounded-xl h-10 text-sm"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase">Note (optional)</label>
              <Input
                placeholder="Personal note about this item..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="rounded-xl h-10 text-sm"
              />
            </div>
            <div className="flex items-center gap-2 justify-end">
              <Button variant="ghost" size="sm" className="rounded-xl" onClick={() => setIsAdding(false)}>
                Cancel
              </Button>
              <Button size="sm" className="rounded-xl px-4" onClick={addItem} disabled={!newTitle.trim()}>
                <Check className="size-3.5 mr-1.5" /> Save Bookmark
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Category selection */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {bookmarkTypes.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors border",
              activeTab === tab
                ? "bg-primary text-primary-foreground border-primary shadow-soft"
                : "bg-card border-border/80 text-muted-foreground hover:bg-muted"
            )}
          >
            {tab}
            {tab !== "All" && (
              <span className="ml-1.5 text-[10px] opacity-70">
                ({items.filter((i) => i.type === tab).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Bookmarked lists */}
      {filteredItems.length > 0 ? (
        <div className="flex flex-col gap-4">
          {filteredItems.map((item) => {
            const Icon = typeIcons[item.type as keyof typeof typeIcons] || Bookmark
            const isExpanded = expandedId === item.id
            const aiData = aiDetails[item.id]

            return (
              <Card
                key={item.id}
                className={cn(
                  "group relative transition-all duration-300 hover:border-primary/30 hover:shadow-soft bg-card border-border/80 rounded-2xl",
                  isExpanded && "border-primary/30 shadow-soft"
                )}
              >
                <CardContent className="flex flex-col p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          {item.type}
                        </span>
                        <Badge variant="secondary" className="text-[10px] font-bold py-0 rounded">
                          {item.level}
                        </Badge>
                      </div>
                      <h3 className="font-semibold text-lg text-foreground font-display leading-snug">
                        {item.title}
                      </h3>

                      {/* Note display or edit */}
                      {editingId === item.id ? (
                        <div className="flex items-center gap-2 mt-1">
                          <Input
                            value={editNote}
                            onChange={(e) => setEditNote(e.target.value)}
                            onKeyDown={(e) => { if (e.key === "Enter") saveEditNote(); if (e.key === "Escape") setEditingId(null) }}
                            className="flex-1 h-8 rounded-lg text-sm"
                            autoFocus
                          />
                          <Button size="icon" variant="ghost" className="size-7" onClick={saveEditNote}>
                            <Check className="size-3.5 text-primary" />
                          </Button>
                          <Button size="icon" variant="ghost" className="size-7" onClick={() => setEditingId(null)}>
                            <X className="size-3.5" />
                          </Button>
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground/80 leading-normal italic mt-0.5 flex items-center gap-1.5">
                          &ldquo;{item.note || "No notes yet"}&rdquo;
                          <button
                            onClick={() => startEditNote(item.id, item.note)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-primary"
                          >
                            <Edit3 className="size-3" />
                          </button>
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-9 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors"
                        onClick={() => fetchAIDetail(item)}
                      >
                        {isExpanded ? <ChevronUp className="size-4.5" /> : <Sparkles className="size-4.5" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-9 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-colors shrink-0"
                        onClick={() => removeItem(item.id)}
                        aria-label="Delete bookmark"
                      >
                        <Trash2 className="size-4.5" />
                      </Button>
                    </div>
                  </div>

                  {/* Expanded AI Detail */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-border/50 animate-in fade-in slide-in-from-top-2">
                      {aiData === "loading" ? (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground p-4 bg-muted/30 rounded-xl">
                          <Loader2 className="size-4 animate-spin text-primary" />
                          <span>KotobaLab AI is analyzing this item...</span>
                        </div>
                      ) : aiData === "error" ? (
                        <div className="text-sm text-destructive p-4 bg-destructive/10 rounded-xl flex items-center justify-between">
                          <span>Failed to generate explanation.</span>
                          <Button size="sm" variant="outline" className="text-xs" onClick={() => { setAiDetails((prev) => { const n = {...prev}; delete n[item.id]; return n }); fetchAIDetail(item) }}>
                            Retry
                          </Button>
                        </div>
                      ) : aiData ? (
                        <div className="flex flex-col gap-4">
                          {/* Examples */}
                          {aiData.examples && aiData.examples.length > 0 && (
                            <div className="space-y-3">
                              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                <Sparkles className="size-3 text-primary" /> Example Sentences
                              </h4>
                              <div className="grid gap-3 sm:grid-cols-2">
                                {aiData.examples.map((ex, i) => (
                                  <div key={i} className="bg-muted/40 p-3 rounded-xl space-y-1.5">
                                    <p className="text-sm font-medium text-foreground">{ex.japanese}</p>
                                    <p className="text-xs text-muted-foreground font-mono">{ex.romaji}</p>
                                    <p className="text-xs text-muted-foreground/80 italic">{ex.english}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="grid gap-4 sm:grid-cols-2">
                            {/* Grammar Note */}
                            {aiData.grammarNote && (
                              <div className="space-y-2 bg-primary/5 p-4 rounded-xl border border-primary/10">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-primary">Usage & Grammar</h4>
                                <p className="text-sm text-foreground/90 leading-relaxed">{aiData.grammarNote}</p>
                              </div>
                            )}

                            {/* Mnemonic */}
                            {aiData.mnemonic && (
                              <div className="space-y-2 bg-amber-500/5 p-4 rounded-xl border border-amber-500/10 dark:bg-amber-500/10">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">Memory Trick</h4>
                                <p className="text-sm text-foreground/90 leading-relaxed">{aiData.mnemonic}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      ) : (
        <Card className="border-dashed border-2 border-border/80 bg-card p-12 text-center rounded-2xl flex flex-col items-center justify-center gap-4">
          <div className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <Bookmark className="size-6" />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="font-semibold text-lg text-foreground">
              {searchQuery ? "No matching bookmarks" : "No bookmarked items"}
            </h3>
            <p className="text-sm text-muted-foreground max-w-sm">
              {searchQuery
                ? "Try a different search term or clear the filter."
                : "Click 'Add Bookmark' to save grammar points, vocabulary, kanji, or questions for later review."
              }
            </p>
          </div>
        </Card>
      )}

      {/* Stats footer */}
      {items.length > 0 && (
        <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground py-2">
          <span>{items.length} total bookmarks</span>
          <Separator orientation="vertical" className="h-3" />
          {bookmarkTypes.filter((t) => t !== "All").map((t) => {
            const count = items.filter((i) => i.type === t).length
            return count > 0 ? (
              <span key={t}>{count} {t.toLowerCase()}</span>
            ) : null
          })}
        </div>
      )}
    </div>
  )
}
