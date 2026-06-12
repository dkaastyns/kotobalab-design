"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Search,
  Bell,
  Flame,
  Menu,
  LayoutDashboard,
  GraduationCap,
  Globe,
  Bot,
  Layers,
  BookOpen,
  Languages,
  Bookmark,
  CalendarDays,
  BarChart3,
  Trophy,
  Settings,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { streak } from "@/lib/mock-data"

const allNav = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "JLPT", href: "/jlpt", icon: GraduationCap },
  { label: "TOEFL", href: "/toefl", icon: Globe },
  { label: "AI Tutor", href: "/tutor", icon: Bot },
  { label: "Flashcards", href: "/flashcards", icon: Layers },
  { label: "Vocabulary", href: "/vocabulary", icon: BookOpen },
  { label: "Kanji", href: "/kanji", icon: Languages },
  { label: "Bookmarks", href: "/bookmarks", icon: Bookmark },
  { label: "Study Planner", href: "/planner", icon: CalendarDays },
  { label: "Analytics", href: "/analytics", icon: BarChart3 },
  { label: "Achievements", href: "/achievements", icon: Trophy },
  { label: "Settings", href: "/settings", icon: Settings },
]

export function AppTopbar({ title }: { title: string }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-md md:px-6">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          render={
            <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
              <Menu />
            </Button>
          }
        />
        <SheetContent side="left" className="w-72 p-0">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <div className="flex h-16 items-center gap-2.5 px-6">
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Sparkles className="size-5" />
            </span>
            <span className="text-lg font-semibold tracking-tight">KotobaLab</span>
          </div>
          <nav className="flex flex-col gap-1 px-4 py-2">
            {allNav.map((item) => {
              const active = pathname === item.href
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                    active
                      ? "bg-secondary text-secondary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <Icon className="size-[18px]" />
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </SheetContent>
      </Sheet>

      <h1 className="text-lg font-semibold tracking-tight md:text-xl">{title}</h1>

      <div className="ml-auto flex items-center gap-2 md:gap-3">
        <div className="relative hidden sm:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search lessons, words…"
            className="h-10 w-44 rounded-xl pl-9 md:w-64"
            aria-label="Search"
          />
        </div>

        <Badge
          variant="secondary"
          className="hidden h-10 items-center gap-1.5 rounded-xl px-3 text-sm sm:flex"
        >
          <Flame className="size-4 text-[oklch(0.84_0.12_85)]" />
          {streak.days}
        </Badge>

        <Button variant="ghost" size="icon" className="relative size-10 rounded-xl" aria-label="Notifications">
          <Bell className="size-5" />
          <span className="absolute right-2.5 top-2.5 size-2 rounded-full bg-primary" />
        </Button>
      </div>
    </header>
  )
}
