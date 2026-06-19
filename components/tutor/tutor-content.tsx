"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Sparkles, Bot, User, Trash2, Cpu, AlertCircle, RefreshCw, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { chatSuggestions } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { useCurrentUser } from "@/hooks/use-user"
import { toast } from "sonner"
import { motion, AnimatePresence } from "framer-motion"

interface Message {
  role: "assistant" | "user"
  content: string
}

const WELCOME_MESSAGE: Message = {
  role: "assistant",
  content:
    "こんにちは! Saya KotobaLab AI Tutor — didukung oleh model bahasa canggih untuk memberikan penjelasan mendalam dan komprehensif dalam Bahasa Indonesia.\n\nTanya saya tentang:\n- Pola tata bahasa (mis. 'Jelaskan ながら')\n- Kosakata (mis. 'Uraikan kata 影響')\n- Kanji (mis. 'Analisis kanji 験')\n- Partikel (mis. 'Perbedaan は vs が')\n- Tips persiapan JLPT\n\nSaya akan memberikan contoh kalimat, konteks budaya, dan trik mengingat untuk membantumu!",
}

/** Simple markdown → JSX renderer (no extra library needed) */
function MarkdownMessage({ content }: { content: string }) {
  const lines = content.split("\n")

  return (
    <div className="flex flex-col gap-1.5 text-sm leading-relaxed">
      {lines.map((line, idx) => {
        // ## Heading
        if (line.startsWith("## ")) {
          return (
            <p key={idx} className="font-bold text-foreground text-base mt-2 first:mt-0">
              {line.slice(3)}
            </p>
          )
        }
        // # Heading
        if (line.startsWith("# ")) {
          return (
            <p key={idx} className="font-bold text-foreground text-lg mt-2 first:mt-0">
              {line.slice(2)}
            </p>
          )
        }
        // Bullet list
        if (line.startsWith("- ") || line.startsWith("• ")) {
          return (
            <div key={idx} className="flex gap-2">
              <span className="text-primary shrink-0 mt-0.5">•</span>
              <span>{line.slice(2)}</span>
            </div>
          )
        }
        // Numbered list
        const numberedMatch = line.match(/^(\d+)\.\s(.+)/)
        if (numberedMatch) {
          return (
            <div key={idx} className="flex gap-2">
              <span className="text-primary font-mono text-xs shrink-0 mt-0.5 w-5">{numberedMatch[1]}.</span>
              <span>{numberedMatch[2]}</span>
            </div>
          )
        }
        // Empty line = spacing
        if (line.trim() === "") {
          return <div key={idx} className="h-1" />
        }
        // Bold: **text** → render as strong (avoid ** showing in UI)
        const hasBold = /\*\*(.+?)\*\*/.test(line)
        if (hasBold) {
          const parts = line.split(/\*\*(.+?)\*\*/)
          return (
            <p key={idx}>
              {parts.map((part, i) =>
                i % 2 === 1 ? <strong key={i} className="font-semibold text-foreground">{part}</strong> : part
              )}
            </p>
          )
        }
        // Regular text — highlight Japanese inline (detect CJK chars)
        return <p key={idx}>{line}</p>
      })}
    </div>
  )
}

function CopyButton({ content }: { content: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content)
    setCopied(true)
    toast.success("Copied to clipboard!")
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground p-1 rounded-md hover:bg-muted/60"
      title="Copy message"
    >
      {copied ? <Check className="size-3.5 text-success" /> : <Copy className="size-3.5" />}
    </button>
  )
}

export function TutorContent() {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [currentModel, setCurrentModel] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [lastFailedMessage, setLastFailedMessage] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { recordAISession } = useCurrentUser()

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
      const conversationHistory = updatedMessages
        .filter((_, idx) => idx > 0)
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
        const modelName = data.model.split("/").pop()?.split(":")[0] || data.model
        setCurrentModel(modelName)
      }

      // Record AI session on first real exchange
      if (updatedMessages.length === 2) {
        recordAISession()
      }
    } catch (err: unknown) {
      console.error("[Tutor Error]", err)
      const errorMessage = err instanceof Error ? err.message : "Failed to get response"
      setError(errorMessage)
      setLastFailedMessage(text)
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
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 23 }}
                className={cn("flex w-full gap-3 group", isAsst ? "justify-start" : "justify-end")}
              >
                {isAsst && (
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary mt-1">
                    <Bot className="size-4.5" />
                  </div>
                )}
                <div
                  className={cn(
                    "relative max-w-[85%] rounded-2xl p-4 shadow-soft",
                    isAsst
                      ? "bg-card border border-primary/10 text-foreground"
                      : "bg-primary text-primary-foreground font-medium text-sm"
                  )}
                >
                  {isAsst ? (
                    <MarkdownMessage content={msg.content} />
                  ) : (
                    <p className="text-sm leading-relaxed">{msg.content}</p>
                  )}
                  {/* Copy button for assistant messages */}
                  {isAsst && (
                    <div className="flex justify-end mt-2">
                      <CopyButton content={msg.content} />
                    </div>
                  )}
                </div>
                {!isAsst && (
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-secondary text-secondary-foreground mt-1">
                    <User className="size-4.5" />
                  </div>
                )}
              </motion.div>
            )
          })}

          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -5, scale: 0.95, transition: { duration: 0.15 } }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="flex w-full gap-3 justify-start"
              >
                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary mt-1">
                  <Bot className="size-4.5" />
                </div>
                <div className="bg-card border border-primary/10 rounded-2xl p-4 text-sm shadow-soft flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="size-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="size-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex w-full gap-3 justify-start"
              >
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
              </motion.div>
            )}
          </AnimatePresence>

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
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Tanya sesuatu… (mis. 'Jelaskan ながら')"
              className="flex-1 rounded-xl h-11 border border-border/80 focus:ring-2 focus:ring-primary/30 focus:border-primary bg-background/50 px-4 text-sm outline-none transition-all disabled:opacity-50"
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
