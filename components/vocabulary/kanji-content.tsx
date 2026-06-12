"use client"

import { useState } from "react"
import { Search, Info, X, Sparkles, Loader2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { kanji } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

type AIExplanation = {
  examples: { japanese: string; romaji: string; english: string }[]
  grammarNote: string
  mnemonic: string
}

export function KanjiContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedKanji, setSelectedKanji] = useState<(typeof kanji)[number] | null>(null)
  
  // AI Explanations state: kanjiId -> AIExplanation or 'loading' or 'error'
  const [explanations, setExplanations] = useState<Record<string, AIExplanation | 'loading' | 'error'>>({})

  const filteredKanji = kanji.filter((item) => {
    const query = searchQuery.toLowerCase()
    return (
      item.char.includes(searchQuery) ||
      item.meaning.toLowerCase().includes(query) ||
      item.on.includes(searchQuery) ||
      item.kun.includes(searchQuery) ||
      item.level.toLowerCase().includes(query)
    );
  });

  const fetchExplanation = async (kanjiItem: typeof kanji[number]) => {
    if (explanations[kanjiItem.id]) return; // already fetched or loading
    
    setExplanations(prev => ({ ...prev, [kanjiItem.id]: 'loading' }))
    try {
      const res = await fetch("/api/ai/explain-word", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          word: kanjiItem.char, 
          reading: `On: ${kanjiItem.on}, Kun: ${kanjiItem.kun}`, 
          meaning: kanjiItem.meaning 
        })
      })
      
      if (!res.ok) throw new Error("Failed to fetch explanation")
      
      const data = await res.json()
      setExplanations(prev => ({ ...prev, [kanjiItem.id]: data }))
    } catch (error) {
      console.error(error)
      setExplanations(prev => ({ ...prev, [kanjiItem.id]: 'error' }))
    }
  }

  const activeExplanation = selectedKanji ? explanations[selectedKanji.id] : null;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
      {/* Grid list column */}
      <div className="flex flex-col gap-6">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search kanji character, Onyomi, Kunyomi, or meaning…"
            className="pl-10 rounded-xl h-11 border-border bg-card/60"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {filteredKanji.length > 0 ? (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
            {filteredKanji.map((item) => {
              const active = selectedKanji?.id === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedKanji(item)}
                  className={cn(
                    "aspect-square flex flex-col items-center justify-center rounded-2xl border transition-all relative overflow-hidden bg-card",
                    active
                      ? "border-primary bg-primary/5 ring-2 ring-primary ring-offset-2 ring-offset-background"
                      : "border-border/80 hover:border-primary/40 hover:bg-primary/5"
                  )}
                >
                  <span className="text-3xl font-bold font-display text-foreground">{item.char}</span>
                  <span className="text-[10px] text-muted-foreground mt-1 truncate max-w-[90%] px-1 text-center font-medium capitalize">
                    {item.meaning.split(",")[0]}
                  </span>
                  <Badge variant="outline" className="absolute top-1.5 right-1.5 text-[8px] px-1.5 py-0 rounded font-mono">
                    {item.level}
                  </Badge>
                </button>
              )
            })}
          </div>
        ) : (
          <Card className="border-dashed border-2 border-border/80 bg-card p-12 text-center rounded-2xl flex flex-col items-center justify-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <Search className="size-6" />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="font-semibold text-lg text-foreground">No Kanji matches</h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                We couldn&apos;t find any Kanji character matching your keyword. Try checking the spelling.
              </p>
            </div>
          </Card>
        )}
      </div>

      {/* Detail panel column */}
      <div className="flex flex-col gap-4">
        {selectedKanji ? (
          <Card className="border-primary/20 shadow-soft-lg bg-gradient-to-b from-card to-primary/5 sticky top-20 rounded-3xl animate-fade-up flex flex-col max-h-[85vh]">
            <CardHeader className="relative pb-2 flex-row justify-between items-start shrink-0">
              <div>
                <CardTitle className="text-sm font-semibold uppercase tracking-wider text-primary">Kanji Details</CardTitle>
                <CardDescription className="text-xs">Stroke counts &amp; readings</CardDescription>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="size-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted"
                onClick={() => setSelectedKanji(null)}
              >
                <X className="size-4" />
              </Button>
            </CardHeader>
            <CardContent className="flex flex-col gap-5 p-5 overflow-y-auto custom-scrollbar">
              <div className="flex flex-col items-center justify-center py-6 border-b border-primary/5 shrink-0">
                <h2 className="text-7xl font-bold font-display text-foreground">{selectedKanji.char}</h2>
                <p className="text-lg font-semibold capitalize text-muted-foreground mt-2">{selectedKanji.meaning}</p>
                <div className="flex items-center gap-2 mt-3">
                  <Badge variant="secondary" className="text-xs px-2.5 py-0.5 font-bold rounded-md uppercase">
                    Level {selectedKanji.level}
                  </Badge>
                  <Badge variant="outline" className="text-xs px-2.5 py-0.5 rounded-md font-mono font-medium">
                    {selectedKanji.strokes} Strokes
                  </Badge>
                </div>
              </div>

              <div className="flex flex-col gap-3 shrink-0">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Onyomi (Chinese)</span>
                  <span className="text-base font-bold text-foreground font-display">{selectedKanji.on}</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Kunyomi (Japanese)</span>
                  <span className="text-base font-bold text-foreground font-display">{selectedKanji.kun}</span>
                </div>
              </div>

              {/* AI Explanation Area */}
              <div className="pt-2">
                {!activeExplanation ? (
                  <Button 
                    className="w-full font-semibold gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-soft"
                    onClick={() => fetchExplanation(selectedKanji)}
                  >
                    <Sparkles className="size-4" /> Ask AI for Mnemonic & Examples
                  </Button>
                ) : activeExplanation === 'loading' ? (
                  <div className="flex flex-col items-center justify-center py-6 gap-3 bg-muted/30 rounded-2xl border border-border/50">
                    <Loader2 className="size-6 animate-spin text-primary" />
                    <span className="text-sm font-medium text-muted-foreground">KotobaLab AI is analyzing...</span>
                  </div>
                ) : activeExplanation === 'error' ? (
                  <div className="text-sm text-destructive p-4 bg-destructive/10 rounded-2xl text-center">
                    Failed to generate explanation. Please try again.
                  </div>
                ) : (
                  <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4">
                    {/* Mnemonic */}
                    <div className="space-y-2 bg-amber-500/10 p-4 rounded-2xl border border-amber-500/20">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                        <Sparkles className="size-3.5" /> Memory Trick
                      </h4>
                      <p className="text-sm text-foreground/90 leading-relaxed font-medium">{activeExplanation.mnemonic}</p>
                    </div>
                    
                    {/* Examples */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-primary">Example Words/Sentences</h4>
                      <div className="flex flex-col gap-2">
                        {activeExplanation.examples.map((ex, i) => (
                          <div key={i} className="bg-card border border-border/60 p-3 rounded-xl space-y-1">
                            <p className="text-sm font-semibold text-foreground">{ex.japanese}</p>
                            <p className="text-xs text-muted-foreground font-mono">{ex.romaji}</p>
                            <p className="text-xs text-muted-foreground/90 italic">{ex.english}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

            </CardContent>
          </Card>
        ) : (
          <Card className="border-dashed border border-border/80 bg-card/60 p-8 text-center rounded-3xl sticky top-20 flex flex-col items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Info className="size-5" />
            </div>
            <p className="text-xs text-muted-foreground leading-normal max-w-[200px]">
              Select any kanji character in the grid to view details, readings, stroke counts, and mastery metrics.
            </p>
          </Card>
        )}
      </div>
    </div>
  )
}
