"use client"

import { useState } from "react"
import { Search, Info, X, Sparkles, Bookmark, BookmarkCheck, Volume2, Loader2, ArrowRight, Layers } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { kanji } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { fadeInUp, staggerContainer, staggerItem, slideInFromRight } from "@/lib/animations"

type KanjiItem = (typeof kanji)[number]

type AIKanjiDetail = {
  meaning: string
  onyomi: string
  kunyomi: string
  strokes: number
  jlpt: string
  radicals: { char: string; meaning: string; position: string }[]
  compounds: { word: string; reading: string; meaning: string }[]
  examples: { japanese: string; romaji: string; indonesian: string }[]
  mnemonic: string
  lookalike: string
}

const LEVELS = ["Semua", "N5", "N4", "N3", "N2", "N1"] as const

export function KanjiContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeLevel, setActiveLevel] = useState<string>("Semua")
  const [selectedKanji, setSelectedKanji] = useState<KanjiItem | null>(null)
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<number>>(new Set())
  const [aiDetails, setAiDetails] = useState<Record<number, AIKanjiDetail | "loading" | "error">>({})

  const filteredKanji = kanji.filter((item) => {
    const query = searchQuery.toLowerCase()
    const matchesSearch =
      item.char.includes(searchQuery) ||
      item.meaning.toLowerCase().includes(query) ||
      item.on.includes(searchQuery) ||
      item.kun.includes(searchQuery) ||
      item.level.toLowerCase().includes(query)
    const matchesLevel = activeLevel === "Semua" || item.level === activeLevel
    return matchesSearch && matchesLevel
  })

  const handleSelect = (item: KanjiItem) => {
    setSelectedKanji(item)
    // Auto-trigger AI if not loaded yet
    if (!aiDetails[item.id]) {
      fetchAIDetail(item)
    }
  }

  const fetchAIDetail = async (item: KanjiItem) => {
    setAiDetails((prev) => ({ ...prev, [item.id]: "loading" }))
    try {
      const res = await fetch("/api/ai/explain-kanji", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          char: item.char,
          meaning: item.meaning,
          on: item.on,
          kun: item.kun,
          level: item.level,
        }),
      })
      if (!res.ok) throw new Error("Gagal memuat detail AI")
      const data = await res.json()
      setAiDetails((prev) => ({ ...prev, [item.id]: data }))
    } catch {
      setAiDetails((prev) => ({ ...prev, [item.id]: "error" }))
      toast.error("Gagal memuat penjelasan AI")
    }
  }

  const toggleBookmark = (item: KanjiItem) => {
    setBookmarkedIds((prev) => {
      const next = new Set(prev)
      if (next.has(item.id)) {
        next.delete(item.id)
        toast.success(`${item.char} dihapus dari bookmark`)
      } else {
        next.add(item.id)
        toast.success(`${item.char} disimpan ke bookmark`)
      }
      return next
    })
  }

  const handleAudio = (text: string) => {
    if ("speechSynthesis" in window) {
      const u = new SpeechSynthesisUtterance(text)
      u.lang = "ja-JP"
      window.speechSynthesis.speak(u)
    }
  }

  const aiData =
    selectedKanji && aiDetails[selectedKanji.id] !== "loading" && aiDetails[selectedKanji.id] !== "error"
      ? (aiDetails[selectedKanji.id] as AIKanjiDetail)
      : null

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="flex flex-col gap-6"
    >
      {/* Search + Level filters */}
      <motion.div variants={fadeInUp} className="flex flex-col gap-3">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Cari karakter kanji, Onyomi, Kunyomi, atau arti…"
            className="pl-10 rounded-xl h-11 border-border bg-card/60"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {LEVELS.map((level) => (
            <button
              key={level}
              onClick={() => setActiveLevel(level)}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-semibold border transition-all relative overflow-hidden",
                activeLevel === level
                  ? "text-primary-foreground border-primary shadow-sm"
                  : "bg-card text-muted-foreground border-border/80 hover:border-primary/40 hover:text-foreground"
              )}
            >
              {activeLevel === level && (
                <motion.span
                  layoutId="activeKanjiTab"
                  className="absolute inset-0 bg-primary rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              {level}
            </button>
          ))}
          <span className="text-xs text-muted-foreground self-center ml-1">
            {filteredKanji.length} kanji ditemukan
          </span>
        </div>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        {/* Kanji Grid */}
        <motion.div
          key={activeLevel}
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="flex flex-col gap-4"
        >
          {filteredKanji.length > 0 ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {filteredKanji.map((item) => {
                const active = selectedKanji?.id === item.id
                const isBookmarked = bookmarkedIds.has(item.id)
                return (
                  <motion.button
                    key={item.id}
                    variants={staggerItem}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSelect(item)}
                    className={cn(
                      "aspect-square flex flex-col items-center justify-center rounded-2xl border transition-all relative overflow-hidden bg-card group",
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
                    {isBookmarked && (
                      <div className="absolute bottom-1.5 right-1.5 size-2 rounded-full bg-primary" />
                    )}
                  </motion.button>
                )
              })}
            </div>
          ) : (
            <motion.div variants={fadeInUp}>
              <Card className="border-dashed border-2 border-border/80 bg-card p-12 text-center rounded-2xl flex flex-col items-center justify-center gap-4">
                <div className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
                  <Search className="size-6" />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="font-semibold text-lg text-foreground">Tidak ada kanji yang cocok</h3>
                  <p className="text-sm text-muted-foreground max-w-sm">
                    Coba gunakan kata kunci lain atau pilih level berbeda.
                  </p>
                </div>
              </Card>
            </motion.div>
          )}
        </motion.div>

        {/* Detail Panel */}
        <div className="flex flex-col gap-4">
          <AnimatePresence mode="wait">
            {selectedKanji ? (
              <motion.div
                key={`detail-${selectedKanji.id}`}
                variants={slideInFromRight}
                initial="initial"
                animate="animate"
                exit="exit"
                className="sticky top-20"
              >
                <Card className="border-primary/20 shadow-soft bg-card rounded-3xl overflow-hidden">
                  {/* Panel header */}
                  <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-5 flex flex-col items-center gap-3 relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-3 top-3 size-7 rounded-lg text-muted-foreground"
                      onClick={() => setSelectedKanji(null)}
                    >
                      <X className="size-4" />
                    </Button>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleAudio(selectedKanji.char)}
                        className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                        title="Dengarkan pengucapan"
                      >
                        <Volume2 className="size-4" />
                      </button>
                      <h2 className="text-7xl font-bold font-display text-foreground leading-none">{selectedKanji.char}</h2>
                      <button
                        onClick={() => toggleBookmark(selectedKanji)}
                        className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                        title="Bookmark kanji ini"
                      >
                        {bookmarkedIds.has(selectedKanji.id) ? (
                          <BookmarkCheck className="size-4 fill-primary" />
                        ) : (
                          <Bookmark className="size-4" />
                        )}
                      </button>
                    </div>
                    <p className="text-base font-semibold text-muted-foreground capitalize">{selectedKanji.meaning}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs font-bold">Level {selectedKanji.level}</Badge>
                      <Badge variant="outline" className="text-xs font-mono">{selectedKanji.strokes} Coretan</Badge>
                    </div>
                  </div>

                  <CardContent className="flex flex-col gap-4 p-5 max-h-[65vh] overflow-y-auto">
                    {/* Readings */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-xl bg-muted/50 p-3">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">On'yomi</p>
                        <p className="text-sm font-bold font-display">{selectedKanji.on}</p>
                      </div>
                      <div className="rounded-xl bg-muted/50 p-3">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Kun'yomi</p>
                        <p className="text-sm font-bold font-display">{selectedKanji.kun}</p>
                      </div>
                    </div>

                    {/* Mastery */}
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-muted-foreground uppercase tracking-wide">Penguasaan</span>
                        <span className="font-bold text-primary">{selectedKanji.mastery}%</span>
                      </div>
                      <Progress value={selectedKanji.mastery} className="h-2" />
                    </div>

                    <Separator />

                    {/* AI Section */}
                    {aiDetails[selectedKanji.id] === "loading" ? (
                      <div className="flex flex-col items-center gap-2 py-6">
                        <Loader2 className="size-6 animate-spin text-primary" />
                        <p className="text-xs text-muted-foreground animate-pulse">Memuat penjelasan AI…</p>
                      </div>
                    ) : aiDetails[selectedKanji.id] === "error" ? (
                      <div className="flex flex-col items-center gap-2 py-4">
                        <p className="text-xs text-destructive">Gagal memuat AI.</p>
                        <Button size="sm" variant="outline" onClick={() => fetchAIDetail(selectedKanji)}>
                          Coba lagi
                        </Button>
                      </div>
                    ) : aiData ? (
                      <motion.div
                        variants={staggerContainer}
                        initial="initial"
                        animate="animate"
                        className="flex flex-col gap-4"
                      >
                        {/* Radicals */}
                        {aiData.radicals && aiData.radicals.length > 0 && (
                          <motion.div variants={fadeInUp} className="flex flex-col gap-2">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Bedah Radikal</p>
                            <div className="flex flex-col gap-1.5">
                              {aiData.radicals.map((r, i) => (
                                <div key={i} className="flex items-center gap-2 text-sm">
                                  <span className="text-lg font-bold font-display text-primary w-7 shrink-0">{r.char}</span>
                                  <span className="text-muted-foreground">{r.meaning}</span>
                                  <Badge variant="outline" className="text-[9px] ml-auto">{r.position}</Badge>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}

                        {/* Compounds */}
                        {aiData.compounds && aiData.compounds.length > 0 && (
                          <motion.div variants={fadeInUp} className="flex flex-col gap-2">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Kata Gabungan Umum</p>
                            <div className="flex flex-col gap-1.5">
                              {aiData.compounds.map((c, i) => (
                                <div key={i} className="flex items-center gap-2">
                                  <button
                                    onClick={() => handleAudio(c.word)}
                                    className="flex items-center gap-1 text-primary font-bold font-display text-sm hover:underline"
                                  >
                                    {c.word}
                                    <Volume2 className="size-3 opacity-60" />
                                  </button>
                                  <span className="text-xs text-muted-foreground">({c.reading})</span>
                                  <span className="text-xs text-muted-foreground ml-auto text-right">{c.meaning}</span>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}

                        {/* Examples */}
                        {aiData.examples && aiData.examples.length > 0 && (
                          <motion.div variants={fadeInUp} className="flex flex-col gap-2">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Contoh Kalimat</p>
                            <div className="flex flex-col gap-2.5">
                              {aiData.examples.map((ex, i) => (
                                <div key={i} className="rounded-xl bg-muted/50 p-3 text-sm flex flex-col gap-0.5">
                                  <button
                                    onClick={() => handleAudio(ex.japanese)}
                                    className="font-bold font-display text-left hover:text-primary transition-colors flex items-center gap-1"
                                  >
                                    {ex.japanese}
                                    <Volume2 className="size-3 opacity-50" />
                                  </button>
                                  <p className="text-xs text-muted-foreground italic">{ex.romaji}</p>
                                  <p className="text-xs text-foreground/80">{ex.indonesian}</p>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}

                        {/* Mnemonic */}
                        {aiData.mnemonic && (
                          <motion.div variants={fadeInUp} className="rounded-xl bg-primary/5 border border-primary/15 p-3 flex flex-col gap-1">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-primary">Trik Mengingat</p>
                            <p className="text-sm text-foreground/80 leading-relaxed">{aiData.mnemonic}</p>
                          </motion.div>
                        )}

                        {/* Lookalike */}
                        {aiData.lookalike && aiData.lookalike !== "Tidak ada" && (
                          <motion.div variants={fadeInUp} className="rounded-xl bg-muted/50 p-3 flex flex-col gap-1">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Kanji Mirip</p>
                            <p className="text-sm text-foreground/80 leading-relaxed">{aiData.lookalike}</p>
                          </motion.div>
                        )}
                      </motion.div>
                    ) : (
                      <div className="flex flex-col items-center gap-2 py-4">
                        <Sparkles className="size-5 text-primary animate-pulse" />
                        <p className="text-xs text-muted-foreground">Memuat penjelasan AI...</p>
                      </div>
                    )}

                    <Separator />

                    {/* Action buttons */}
                    <div className="flex flex-col gap-2 pb-1">
                      <Button
                        asChild
                        className="w-full rounded-xl h-10 bg-primary text-primary-foreground font-medium"
                      >
                        <Link href={`/practice?topic=${selectedKanji.level}&context=${encodeURIComponent(selectedKanji.char)}`}>
                          <Sparkles className="size-4 mr-2" />
                          Latihan soal tentang {selectedKanji.char}
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full rounded-xl h-10"
                        asChild
                      >
                        <Link href={`/flashcards`}>
                          <Layers className="size-4 mr-2" />
                          Buka Flashcard
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="sticky top-20"
              >
                <Card className="border-dashed border border-border/80 bg-card/60 p-8 text-center rounded-3xl flex flex-col items-center gap-3">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Info className="size-6" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-semibold text-foreground">Pilih kanji untuk detail</h3>
                    <p className="text-xs text-muted-foreground leading-normal max-w-[200px]">
                      Klik kanji mana saja di grid untuk melihat detail, contoh kalimat, dan penjelasan AI dalam Bahasa Indonesia.
                    </p>
                  </div>
                  <ArrowRight className="size-4 text-muted-foreground/50 mt-2" />
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}
