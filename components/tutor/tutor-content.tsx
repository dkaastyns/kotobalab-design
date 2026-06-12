"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Sparkles, Bot, User, Trash2, Cpu, AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { chatSuggestions } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

interface Message {
  role: "assistant" | "user"
  content: string
}

const WELCOME_MESSAGE: Message = {
  role: "assistant",
  content:
    "こんにちは! Saya KotobaLab AI Tutor — didukung oleh model bahasa canggih untuk memberikan penjelasan mendalam dan komprehensif dalam Bahasa Indonesia.\n\nTanya saya tentang:\n- Pola tata bahasa (mis. 'Jelaskan ながら')\n- Kosakata (mis. 'Uraikan kata 影響')\n- Kanji (mis. 'Analisis kanji 験')\n- Partikel (mis. 'Perbedaan は vs が')\n- Tips persiapan JLPT\n\nSaya akan memberikan contoh kalimat, konteks budaya, dan trik mengingat untuk membantumu!",
}

export function TutorContent() {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [currentModel, setCurrentModel] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [lastFailedMessage, setLastFailedMessage] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = async (text: string) => {
    if (!text.trim() || isTyping) return

    const userMessage: Message = { role: "user", content: text }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInputValue("")
    setIsTyping(true)
    setError(null)
    setLastFailedMessage(null)

    try {
      // Send conversation history (exclude the welcome message for API, but keep user/assistant pairs)
      const conversationHistory = updatedMessages
        .filter((_, idx) => idx > 0) // skip welcome message
        .map((m) => ({ role: m.role, content: m.content }))

      const res = await fetch("/api/ai/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: conversationHistory }),
      })

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}))
        throw new Error(errData.error || `Server error (${res.status})`)
      }

      const data = await res.json()

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.response },
      ])

      if (data.model) {
        // Extract a readable model name
        const modelName = data.model.split("/").pop()?.split(":")[0] || data.model
        setCurrentModel(modelName)
      }
    } catch (err: unknown) {
      console.error("[Tutor Error]", err)
      const errorMessage = err instanceof Error ? err.message : "Failed to get response"
      setError(errorMessage)
      setLastFailedMessage(text)
      // Remove the user message that failed so they can retry
      setMessages((prev) => prev.slice(0, -1))
    } finally {
      setIsTyping(false)
    }
  }

  const handleRetry = () => {
    if (lastFailedMessage) {
      handleSend(lastFailedMessage)
    }
  }

  const clearChat = () => {
    setMessages([
      {
        role: "assistant",
        content: "こんにちは! Riwayat chat sudah dihapus. Topik bahasa Jepang apa yang ingin kita pelajari selanjutnya? Saya siap memberikan penjelasan mendalam!",
      },
    ])
    setError(null)
    setLastFailedMessage(null)
    setCurrentModel(null)
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[260px_1fr] flex-1 min-h-[calc(100vh-10rem)]">
      {/* Suggestions panel */}
      <div className="flex flex-col gap-4">
        <Card className="h-full border-primary/15 shadow-soft flex flex-col justify-between p-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-primary">
              <Sparkles className="size-5 shrink-0" />
              <h3 className="font-semibold text-sm uppercase tracking-wider">Prompt Cepat</h3>
            </div>
            <p className="text-xs text-muted-foreground">
              Klik topik yang disarankan di bawah ini untuk memulai percakapan dengan KotobaLab AI.
            </p>
            <Separator className="bg-primary/10" />
            <div className="flex flex-col gap-2">
              {chatSuggestions.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(s)}
                  disabled={isTyping}
                  className="w-full text-left text-xs bg-muted/50 hover:bg-primary/10 hover:text-primary transition-colors p-3 rounded-xl border border-border/60 leading-normal disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="pt-4 mt-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={clearChat}
              className="w-full text-muted-foreground hover:text-destructive hover:bg-destructive/5"
            >
              <Trash2 className="size-4 mr-2" />
              Clear History
            </Button>
          </div>
        </Card>
      </div>

      {/* Chat Area */}
      <Card className="flex flex-col h-full border-primary/15 shadow-soft overflow-hidden min-h-[500px]">
        <CardHeader className="border-b bg-card/65 flex flex-row items-center justify-between py-4 px-6 shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Bot className="size-5" />
            </div>
            <div>
              <CardTitle className="text-base font-semibold">KotobaLab AI Tutor</CardTitle>
              <CardDescription className="text-xs">Friendly learning buddy &amp; grammar expert</CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono bg-muted/60 px-3 py-1.5 rounded-full">
            <Cpu className="size-3.5 text-primary" />
            {currentModel || "Gemini-2.5-Flash"}
          </div>
        </CardHeader>

        {/* Message stream */}
        <CardContent className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 max-h-[calc(100vh-22rem)] min-h-[300px]">
          {messages.map((msg, idx) => {
            const isAsst = msg.role === "assistant"
            return (
              <div
                key={idx}
                className={cn("flex w-full gap-3", isAsst ? "justify-start" : "justify-end")}
              >
                {isAsst && (
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary mt-1">
                    <Bot className="size-4.5" />
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed whitespace-pre-wrap shadow-soft",
                    isAsst
                      ? "bg-card border border-primary/10 text-foreground"
                      : "bg-primary text-primary-foreground font-medium"
                  )}
                >
                  {msg.content}
                </div>
                {!isAsst && (
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-secondary text-secondary-foreground mt-1">
                    <User className="size-4.5" />
                  </div>
                )}
              </div>
            )
          })}

          {isTyping && (
            <div className="flex w-full gap-3 justify-start">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary mt-1">
                <Bot className="size-4.5" />
              </div>
              <div className="bg-card border border-primary/10 rounded-2xl p-4 text-sm shadow-soft flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="size-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="size-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}

          {/* Error state */}
          {error && (
            <div className="flex w-full gap-3 justify-start">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-destructive/10 text-destructive mt-1">
                <AlertCircle className="size-4.5" />
              </div>
              <div className="max-w-[85%] rounded-2xl p-4 text-sm shadow-soft bg-destructive/5 border border-destructive/20 text-foreground flex flex-col gap-3">
                <p className="text-destructive font-medium">Failed to get response: {error}</p>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-fit text-xs border-destructive/30 text-destructive hover:bg-destructive/10"
                  onClick={handleRetry}
                >
                  <RefreshCw className="size-3.5 mr-1.5" />
                  Retry
                </Button>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </CardContent>

        {/* Input area */}
        <div className="p-4 border-t bg-card/65 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSend(inputValue)
            }}
            className="flex gap-2"
          >
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask me a question (e.g. 'Explainながら')"
              className="flex-1 rounded-xl h-11 border-border/80 focus-visible:ring-primary focus-visible:border-primary bg-background/50"
              disabled={isTyping}
            />
            <Button type="submit" size="icon" className="h-11 w-11 rounded-xl" disabled={!inputValue.trim() || isTyping}>
              <Send className="size-4.5" />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  )
}
