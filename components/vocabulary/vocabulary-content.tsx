"use client"

import { useState, useEffect } from "react"
import { Search, Bookmark, BookmarkCheck, Volume2, Sparkles, ChevronDown, ChevronUp, Loader2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

const levels = ["All", "N5", "N4", "N3", "N2"] as const

type WordData = {
  id: string
  word: string
  reading: string
  meaning: string
  tags: string[]
  jlpt: string[]
}

type AIExplanation = {
  examples: { japanese: string; romaji: string; english: string }[]
  grammarNote: string
  mnemonic: string
}

export function VocabularyContent() {
  const [activeLevel, setActiveLevel] = useState<string>("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [debouncedQuery, setDebouncedQuery] = useState("#jlpt-n5")
  const [words, setWords] = useState<WordData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set())
  
  // AI Explanations state: wordId -> AIExplanation or 'loading' or 'error'
  const [explanations, setExplanations] = useState<Record<string, AIExplanation | 'loading' | 'error'>>({})

  // Debounce search query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery || "#jlpt-n5")
    }, 500)
    return () => clearTimeout(handler)
  }, [searchQuery])

  // Fetch words from Jisho proxy
  useEffect(() => {
    async function fetchWords() {
      setIsLoading(true)
      try {
        let query = debouncedQuery
        if (activeLevel !== "All" && !query.includes("#jlpt")) {
          query = `${query} #jlpt-${activeLevel.toLowerCase()}`
        } else if (activeLevel !== "All" && query === "#jlpt-n5") {
           query = `#jlpt-${activeLevel.toLowerCase()}`
        }

        const res = await fetch(`/api/dictionary/search?keyword=${encodeURIComponent(query)}`)
        if (res.ok) {
          const data = await res.json()
          setWords(data)
        }
      } catch (err) {
        console.error("Failed to fetch words", err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchWords()
  }, [debouncedQuery, activeLevel])

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const handleAudio = (word: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(word)
      utterance.lang = "ja-JP"
      window.speechSynthesis.speak(utterance)
    }
  }

  const fetchExplanation = async (word: WordData) => {
    if (explanations[word.id]) return; // already fetched or loading
    
    setExplanations(prev => ({ ...prev, [word.id]: 'loading' }))
    try {
      const res = await fetch("/api/ai/explain-word", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ word: word.word, reading: word.reading, meaning: word.meaning })
      })
      
      if (!res.ok) throw new Error("Failed to fetch explanation")
      
      const data = await res.json()
      setExplanations(prev => ({ ...prev, [word.id]: data }))
    } catch (error) {
      console.error(error)
      setExplanations(prev => ({ ...prev, [word.id]: 'error' }))
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Search and Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search word, reading, translation…"
            className="pl-10 rounded-xl h-11 border-border bg-card/60"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {levels.map((lvl) => (
            <button
              key={lvl}
              onClick={() => setActiveLevel(lvl)}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors border",
                activeLevel === lvl
                  ? "bg-primary text-primary-foreground border-primary shadow-soft"
                  : "bg-card border-border/80 text-muted-foreground hover:bg-muted"
              )}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Vocabulary Card Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="size-8 animate-spin text-primary opacity-50" />
        </div>
      ) : words.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {words.map((item) => {
            const isBookmarked = bookmarkedIds.has(item.id)
            const aiData = explanations[item.id]
            const isExpanded = !!aiData
            const displayLevel = item.jlpt[0] ? item.jlpt[0].replace('jlpt-', '').toUpperCase() : activeLevel !== "All" ? activeLevel : "N/A"

            return (
              <Card
                key={item.id}
                className={cn(
                  "group relative transition-all duration-300 hover:border-primary/30 hover:shadow-soft bg-card border-border/80 rounded-2xl flex flex-col",
                  isExpanded ? "md:col-span-2" : ""
                )}
              >
                <CardContent className="flex flex-col gap-4 p-5 flex-1">
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-baseline gap-2">
                        <h3 className="text-3xl font-bold text-foreground font-display tracking-wide">
                          {item.word}
                        </h3>
                        {item.reading && item.reading !== item.word && (
                          <span className="text-sm text-muted-foreground font-mono">
                            [{item.reading}]
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-medium text-muted-foreground/90 mt-1 capitalize">
                        {item.meaning}
                      </p>
                      {item.tags.length > 0 && (
                        <div className="flex gap-1 flex-wrap mt-1">
                          {item.tags.slice(0, 3).map(t => (
                            <Badge key={t} variant="outline" className="text-[10px] py-0">{t}</Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-9 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors"
                        onClick={() => handleAudio(item.word)}
                        aria-label="Listen pronunciation"
                      >
                        <Volume2 className="size-4.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-9 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors"
                        onClick={() => toggleBookmark(item.id)}
                        aria-label="Toggle bookmark"
                      >
                        {isBookmarked ? (
                          <BookmarkCheck className="size-4.5 text-primary fill-primary" />
                        ) : (
                          <Bookmark className="size-4.5" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* AI Explanation Area */}
                  {isExpanded && (
                    <div className="mt-2 pt-4 border-t border-border/50 animate-in fade-in slide-in-from-top-2">
                      {aiData === 'loading' ? (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground p-4 bg-muted/30 rounded-xl">
                          <Loader2 className="size-4 animate-spin text-primary" />
                          <span>KotobaLab AI is analyzing this word...</span>
                        </div>
                      ) : aiData === 'error' ? (
                        <div className="text-sm text-destructive p-4 bg-destructive/10 rounded-xl">
                          Failed to generate explanation. Please try again.
                        </div>
                      ) : (
                        <div className="flex flex-col gap-5">
                          {/* Examples */}
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
                          
                          <div className="grid gap-4 sm:grid-cols-2">
                            {/* Grammar Note */}
                            <div className="space-y-2 bg-primary/5 p-4 rounded-xl border border-primary/10">
                              <h4 className="text-xs font-bold uppercase tracking-wider text-primary">Usage & Grammar</h4>
                              <p className="text-sm text-foreground/90 leading-relaxed">{aiData.grammarNote}</p>
                            </div>
                            
                            {/* Mnemonic */}
                            <div className="space-y-2 bg-amber-500/5 p-4 rounded-xl border border-amber-500/10 dark:bg-amber-500/10">
                              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">Memory Trick</h4>
                              <p className="text-sm text-foreground/90 leading-relaxed">{aiData.mnemonic}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="mt-auto pt-4 flex items-center justify-between">
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      onClick={() => fetchExplanation(item)}
                      disabled={aiData === 'loading'}
                      className={cn("h-8 text-xs font-medium gap-1.5", isExpanded ? "bg-primary/10 text-primary hover:bg-primary/20" : "")}
                    >
                      <Sparkles className={cn("size-3.5", !isExpanded && "text-primary")} />
                      {isExpanded ? "Refresh Explanation" : "Ask AI to Explain"}
                    </Button>
                    <Badge variant="secondary" className="text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-md uppercase">
                      {displayLevel}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      ) : (
        <Card className="border-dashed border-2 border-border/80 bg-card p-12 text-center rounded-2xl flex flex-col items-center justify-center gap-4">
          <div className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <Search className="size-6" />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="font-semibold text-lg text-foreground">No matches found</h3>
            <p className="text-sm text-muted-foreground max-w-sm">
              We couldn&apos;t find any vocabulary word matching your search query. Try broadening your keywords.
            </p>
          </div>
        </Card>
      )}
    </div>
  )
}
