import Link from "next/link"
import { Sparkles } from "lucide-react"

const groups = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/features" },
      { label: "AI Tutor", href: "/ai-tutor" },
      { label: "Analytics", href: "/analytics-info" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Learn",
    links: [
      { label: "JLPT N5–N2", href: "/jlpt-info" },
      { label: "TOEFL", href: "/toefl-info" },
      { label: "Vocabulary", href: "/vocabulary-info" },
      { label: "Kanji", href: "/kanji-info" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
]

export function LandingFooter() {
  return (
    <footer className="border-t border-border bg-card/60">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Sparkles className="size-5" />
              </span>
              <span className="text-lg font-semibold tracking-tight">KotobaLab</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              A modern AI-powered language learning laboratory for JLPT and TOEFL preparation.
            </p>
          </div>

          {groups.map((g) => (
            <div key={g.title}>
              <p className="text-sm font-semibold">{g.title}</p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {g.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-sm text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} KotobaLab. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="transition-colors hover:text-foreground">Privacy</Link>
            <Link href="/terms" className="transition-colors hover:text-foreground">Terms</Link>
            <Link href="/cookies" className="transition-colors hover:text-foreground">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

