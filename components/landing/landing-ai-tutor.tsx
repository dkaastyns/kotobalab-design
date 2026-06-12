import { Bot, Sparkles, CheckCircle2 } from "lucide-react"

const chat = [
  { role: "user", text: "Why is it 食べながら and not 食べるながら?" },
  {
    role: "assistant",
    text: "Great catch! ながら attaches to the verb stem (the ます-form without ます). For 食べる → 食べます → stem 食べ → 食べながら. It means 'while eating'.",
  },
]

const highlights = [
  "Grammar & particle analysis",
  "Kanji stroke-by-stroke breakdown",
  "Vocabulary in context",
  "Reading comprehension help",
]

export function LandingAiTutor() {
  return (
    <section id="ai-tutor" className="bg-card/60 py-16 lg:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 md:px-6 lg:grid-cols-2">
        <div className="flex flex-col gap-5">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-sm font-medium text-muted-foreground">
            <Bot className="size-4 text-primary" />
            AI Tutor
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-balance md:text-4xl">
            A patient tutor, available any hour
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground text-pretty">
            Ask anything in plain language. KotobaLab explains the why behind every answer with
            clear examples — never just the correct letter.
          </p>
          <ul className="flex flex-col gap-3">
            {highlights.map((h) => (
              <li key={h} className="flex items-center gap-3 text-sm font-medium">
                <CheckCircle2 className="size-5 text-[oklch(0.5_0.09_155)]" />
                {h}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-border bg-card p-5 shadow-soft-lg">
          <div className="mb-4 flex items-center gap-2.5 border-b border-border pb-4">
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Sparkles className="size-5" />
            </span>
            <div>
              <p className="text-sm font-semibold leading-none">KotobaLab Tutor</p>
              <p className="text-xs text-muted-foreground">Always online</p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {chat.map((m, i) => (
              <div
                key={i}
                className={m.role === "user" ? "flex justify-end" : "flex justify-start"}
              >
                <p
                  className={
                    m.role === "user"
                      ? "max-w-[80%] rounded-2xl rounded-br-md bg-primary px-4 py-2.5 text-sm leading-relaxed text-primary-foreground"
                      : "max-w-[85%] rounded-2xl rounded-bl-md bg-muted px-4 py-2.5 text-sm leading-relaxed text-foreground"
                  }
                >
                  {m.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
