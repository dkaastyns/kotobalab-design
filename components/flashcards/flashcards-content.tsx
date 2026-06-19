"use client"

import { useState } from "react"
import { Layers, RotateCw, Check, Undo2, Award, Sparkles, BookOpen, Volume2, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { flashcards as defaultFlashcards, reviewQueue } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import { fadeInUp, staggerContainer, staggerItem, scaleIn } from "@/lib/animations"

export function FlashcardsContent() {
  const [cards, setCards] = useState(defaultFlashcards)
  const [activeDeck, setActiveDeck] = useState<string>("All")
  
  const filteredCards = activeDeck === "All" ? cards : cards.filter(c => c.deck === activeDeck)

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [stats, setStats] = useState({ again: 0, known: 0, mastered: 0 })
  const [isAdding, setIsAdding] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)

  // New card state
  const [newFront, setNewFront] = useState("")
  const [newReading, setNewReading] = useState("")
  const [newBack, setNewBack] = useState("")
  const [newExample, setNewExample] = useState("")
  const [newDeck, setNewDeck] = useState("Vocabulary")

  const currentCard = filteredCards[currentIndex]
  const progressPercent = filteredCards.length > 0 ? (currentIndex / filteredCards.length) * 100 : 0

  const handleFlip = () => {
    if (currentCard) setIsFlipped(!isFlipped)
  }

  const handleDifficulty = (rating: "again" | "known" | "mastered") => {
    setStats((prev) => ({ ...prev, [rating]: prev[rating] + 1 }))
    setIsFlipped(false)

    setTimeout(() => {
      if (currentIndex < filteredCards.length - 1) {
        setCurrentIndex(currentIndex + 1)
      } else {
        setCompleted(true)
      }
    }, 150)
  }

  const handleReset = () => {
    setCurrentIndex(0)
    setIsFlipped(false)
    setCompleted(false)
    setStats({ again: 0, known: 0, mastered: 0 })
  }

  const handleGenerateMore = async () => {
    setIsGenerating(true)
    try {
      const res = await fetch("/api/ai/generate-flashcards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          level: "N4", 
          deck: activeDeck === "All" ? "Vocabulary" : activeDeck,
          count: 5 
        })
      })
      if (!res.ok) throw new Error("Failed")
      const data = await res.json()
      
      const newCards = data.cards.map((c: any, i: number) => ({
        id: Math.max(0, ...cards.map(card => card.id)) + i + 1,
        front: c.front,
        reading: c.reading,
        back: c.back,
        example: c.example,
        deck: activeDeck === "All" ? "Vocabulary" : activeDeck
      }))

      // Prepend the new cards so they are reviewed first
      setCards([...newCards, ...cards])
      setCurrentIndex(0)
      setIsFlipped(false)
      setCompleted(false)
      setStats({ again: 0, known: 0, mastered: 0 })
      toast.success("Generated new cards with AI! ✨")
    } catch (err) {
      toast.error("Failed to generate new cards.")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleAudio = (e: React.MouseEvent, text: string) => {
    e.stopPropagation()
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = "ja-JP"
      window.speechSynthesis.speak(utterance)
    }
  }

  const handleAddCard = () => {
    if (!newFront || !newBack) return
    const newCard = {
      id: Math.max(0, ...cards.map(c => c.id)) + 1,
      front: newFront,
      reading: newReading,
      back: newBack,
      example: newExample,
      deck: newDeck
    }
    setCards([newCard, ...cards])
    setNewFront("")
    setNewReading("")
    setNewBack("")
    setNewExample("")
    setIsAdding(false)
    toast.success("Card added successfully")
    handleReset() // Reset session to include new card
  }

  const decks = ["All", ...Array.from(new Set(cards.map(c => c.deck).filter(Boolean)))]

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="mx-auto flex w-full max-w-2xl flex-col gap-6"
    >
      {/* Controls */}
      <motion.div variants={fadeInUp} className="flex items-center justify-between">
        <Select value={activeDeck} onValueChange={(val) => {
          if (val) {
            setActiveDeck(val)
            handleReset()
          }
        }}>
          <SelectTrigger className="w-[180px] rounded-xl bg-card border-border/80">
            <Layers className="size-4 mr-2" />
            <SelectValue placeholder="Select Deck" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            {decks.map((deck) => (
              <SelectItem key={deck} value={deck}>{deck} Deck</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Button onClick={() => setIsAdding(!isAdding)} variant="outline" className="rounded-xl">
          <Plus className="size-4 mr-2" /> Add Card
        </Button>
      </motion.div>

      <AnimatePresence mode="wait">
        {isAdding && (
          <motion.div
            key="add-card-panel"
            initial={{ opacity: 0, height: 0, scale: 0.95 }}
            animate={{ opacity: 1, height: "auto", scale: 1 }}
            exit={{ opacity: 0, height: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 220, damping: 20 }}
            className="overflow-hidden"
          >
            <Card className="border-primary/20 shadow-soft rounded-2xl p-5">
              <div className="flex flex-col gap-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">New Custom Card</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Input placeholder="Front (Japanese)" value={newFront} onChange={e => setNewFront(e.target.value)} className="rounded-xl" />
                  <Input placeholder="Reading (Kana/Romaji)" value={newReading} onChange={e => setNewReading(e.target.value)} className="rounded-xl" />
                  <Input placeholder="Back (Indonesian)" value={newBack} onChange={e => setNewBack(e.target.value)} className="rounded-xl" />
                  <Input placeholder="Example sentence" value={newExample} onChange={e => setNewExample(e.target.value)} className="rounded-xl" />
                  <Select value={newDeck} onValueChange={(val) => val && setNewDeck(val)}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Deck" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      {decks.filter(d => d !== "All").map((deck) => (
                        <SelectItem key={deck} value={deck}>{deck}</SelectItem>
                      ))}
                      <SelectItem value="Custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end gap-2 mt-2">
                  <Button variant="ghost" onClick={() => setIsAdding(false)} className="rounded-xl">Cancel</Button>
                  <Button onClick={handleAddCard} disabled={!newFront || !newBack} className="rounded-xl">Save Card</Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Review progress / stats header */}
      <motion.div variants={staggerContainer} className="grid gap-4 sm:grid-cols-3">
        <motion.div variants={staggerItem}>
          <Card className="border-primary/10 shadow-soft bg-card/40">
            <CardContent className="flex items-center gap-3 p-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
                <Undo2 className="size-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase font-semibold">Again / Due</p>
                <p className="text-lg font-bold">{Math.max(0, reviewQueue.due - stats.again)} remaining</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={staggerItem}>
          <Card className="border-primary/10 shadow-soft bg-card/40">
            <CardContent className="flex items-center gap-3 p-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-warning/10 text-warning">
                <BookOpen className="size-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase font-semibold">Learning</p>
                <p className="text-lg font-bold">{filteredCards.length} cards</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={staggerItem}>
          <Card className="border-primary/10 shadow-soft bg-card/40">
            <CardContent className="flex items-center gap-3 p-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-success/10 text-success">
                <Award className="size-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase font-semibold">Mastered Today</p>
                <p className="text-lg font-bold">{stats.mastered}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {filteredCards.length === 0 ? (
        <motion.div variants={fadeInUp}>
          <Card className="border-dashed border-2 border-border/80 bg-card p-12 text-center rounded-2xl">
            <p className="text-muted-foreground">No cards found in this deck.</p>
          </Card>
        </motion.div>
      ) : !completed ? (
        <div className="flex flex-col gap-6">
          {/* Progress bar */}
          <motion.div variants={fadeInUp} className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Progress: {currentIndex} / {filteredCards.length} cards</span>
            <span>{Math.round(progressPercent)}% completed</span>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <Progress value={progressPercent} className="h-2 transition-all duration-500" />
          </motion.div>

          {/* Flashcard container */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ scale: 0.96, opacity: 0, x: 25 }}
              animate={{ scale: 1, opacity: 1, x: 0 }}
              exit={{ scale: 0.96, opacity: 0, x: -25 }}
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
              className="group relative h-96 w-full cursor-pointer [perspective:1000px]"
              onClick={handleFlip}
            >
              <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 180, damping: 18 }}
                style={{ transformStyle: "preserve-3d" }}
                className="relative h-full w-full rounded-3xl border border-primary/15 bg-card shadow-soft"
              >
                {/* Front side */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 [backface-visibility:hidden] bg-card rounded-3xl">
                  <div className="absolute left-6 top-6 flex items-center gap-2">
                    <span className="text-xs uppercase tracking-widest text-muted-foreground bg-muted px-2.5 py-1 rounded-full font-medium">
                      Front
                    </span>
                    <Badge variant="outline" className="text-[10px]">{currentCard?.deck}</Badge>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute right-6 top-6 rounded-full hover:bg-primary/10 hover:text-primary transition-colors text-muted-foreground"
                    onClick={(e) => handleAudio(e, currentCard?.front || "")}
                  >
                    <Volume2 className="size-5" />
                  </Button>

                  <div className="flex flex-col items-center gap-4">
                    <h2 className="text-5xl md:text-6xl font-bold tracking-wide text-foreground font-display text-center">
                      {currentCard?.front}
                    </h2>
                    <p className="text-lg md:text-xl text-primary/80 font-mono">
                      [{currentCard?.reading}]
                    </p>
                  </div>
                  <div className="absolute bottom-6 flex items-center gap-1.5 text-xs text-muted-foreground bg-primary/5 px-3 py-1.5 rounded-full font-medium">
                    <RotateCw className="size-3.5 animate-spin" style={{ animationDuration: '4s' }} />
                    Click to reveal meaning
                  </div>
                </div>

                {/* Back side */}
                <div className="absolute inset-0 flex flex-col items-center justify-between p-8 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-gradient-to-b from-card to-primary/5 rounded-3xl">
                  <span className="absolute left-6 top-6 text-xs uppercase tracking-widest text-primary bg-primary/10 px-2.5 py-1 rounded-full font-semibold">
                    Back
                  </span>
                  <div className="flex flex-col items-center gap-4 text-center mt-12 w-full max-w-sm">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Indonesian Meaning</p>
                    <h3 className="text-3xl font-bold text-foreground leading-tight">
                      {currentCard?.back}
                    </h3>
                    {currentCard?.example && (
                      <div className="w-full border-t border-primary/10 pt-4 mt-2">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">Example Sentence</p>
                        <p className="text-base text-foreground font-display leading-relaxed">
                          {currentCard.example}
                        </p>
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground font-medium">Click card to see spelling again</span>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Difficulty action controls */}
          <motion.div variants={staggerContainer} className="grid grid-cols-3 gap-3">
            <motion.div variants={staggerItem} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="outline"
                className="w-full rounded-2xl h-12 border-destructive/20 hover:bg-destructive/5 hover:text-destructive hover:border-destructive transition-colors text-sm"
                onClick={(e) => {
                  e.stopPropagation()
                  handleDifficulty("again")
                }}
              >
                Review Again
              </Button>
            </motion.div>
            <motion.div variants={staggerItem} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="secondary"
                className="w-full rounded-2xl h-12 bg-secondary text-secondary-foreground hover:bg-primary/20 transition-colors text-sm font-semibold"
                onClick={(e) => {
                  e.stopPropagation()
                  handleDifficulty("known")
                }}
              >
                Know It
              </Button>
            </motion.div>
            <motion.div variants={staggerItem} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                className="w-full rounded-2xl h-12 bg-primary text-primary-foreground hover:brightness-105 transition-all text-sm font-semibold"
                onClick={(e) => {
                  e.stopPropagation()
                  handleDifficulty("mastered")
                }}
              >
                <Check className="size-4 mr-1.5" />
                Mastered
              </Button>
            </motion.div>
          </motion.div>
        </div>
      ) : (
        <motion.div variants={scaleIn}>
          <Card className="border-primary/20 shadow-soft bg-gradient-to-br from-card to-primary/5 p-8 text-center flex flex-col items-center gap-6 rounded-3xl">
            <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Sparkles className="size-8" />
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-3xl font-bold text-foreground">Session Complete!</h2>
              <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                You reviewed {filteredCards.length} cards in this study block. Spaced repetition schedule updated successfully.
              </p>
            </div>
            <div className="border border-border/80 rounded-2xl p-4 w-full max-w-sm bg-card grid grid-cols-3 gap-2 text-center shadow-soft">
              <div>
                <p className="text-lg font-bold text-destructive">{stats.again}</p>
                <p className="text-[10px] text-muted-foreground uppercase font-semibold">Again</p>
              </div>
              <div>
                <p className="text-lg font-bold text-primary">{stats.known}</p>
                <p className="text-[10px] text-muted-foreground uppercase font-semibold">Known</p>
              </div>
              <div>
                <p className="text-lg font-bold text-success">{stats.mastered}</p>
                <p className="text-[10px] text-muted-foreground uppercase font-semibold">Mastered</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button onClick={handleReset} variant="outline" className="rounded-xl px-6 h-11 transition-all">
                Review Same Deck
              </Button>
              <Button 
                onClick={handleGenerateMore} 
                disabled={isGenerating}
                className="rounded-xl px-6 h-11 bg-primary text-primary-foreground hover:brightness-105 font-medium transition-all gap-2"
              >
                {isGenerating ? <RotateCw className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
                {isGenerating ? "Generating AI Cards..." : "Start Another Review"}
              </Button>
            </div>
          </Card>
        </motion.div>
      )}
    </motion.div>
  )
}
