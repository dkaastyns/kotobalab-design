"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  GraduationCap,
  Globe,
  Bot,
  Layers,
  BarChart3,
  Trophy,
  Settings,
  BookOpen,
  Languages,
  Bookmark,
  CalendarDays,
  Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { user } from "@/lib/mock-data"

const mainNav = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "JLPT", href: "/jlpt", icon: GraduationCap },
  { label: "TOEFL", href: "/toefl", icon: Globe },
  { label: "AI Tutor", href: "/tutor", icon: Bot },
  { label: "Flashcards", href: "/flashcards", icon: Layers },
]

const studyNav = [
  { label: "Vocabulary", href: "/vocabulary", icon: BookOpen },
  { label: "Kanji", href: "/kanji", icon: Languages },
  { label: "Bookmarks", href: "/bookmarks", icon: Bookmark },
  { label: "Study Planner", href: "/planner", icon: CalendarDays },
]

const insightsNav = [
  { label: "Analytics", href: "/analytics", icon: BarChart3 },
  { label: "Achievements", href: "/achievements", icon: Trophy },
  { label: "Settings", href: "/settings", icon: Settings },
]

function NavSection({
  title,
  items,
  pathname,
}: {
  title: string
  items: { label: string; href: string; icon: React.ComponentType<{ className?: string }> }[]
  pathname: string
}) {
  return (
    <div className="flex flex-col gap-1">
      <p className="px-3 pb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground/70">{title}</p>
      {items.map((item) => {
        const active = pathname === item.href || pathname.startsWith(item.href + "/")
        const Icon = item.icon
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
              active
                ? "bg-secondary text-secondary-foreground shadow-soft"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            <Icon className="size-[18px] shrink-0" />
            <span>{item.label}</span>
          </Link>
        )
      })}
    </div>
  )
}

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden w-72 shrink-0 flex-col border-r border-border bg-sidebar lg:flex">
      <div className="flex h-16 items-center gap-2.5 px-6">
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Sparkles className="size-5" />
          </span>
          <span className="text-lg font-semibold tracking-tight">KotobaLab</span>
        </Link>
      </div>

      <nav className="flex flex-1 flex-col gap-6 overflow-y-auto px-4 py-4">
        <NavSection title="Learn" items={mainNav} pathname={pathname} />
        <NavSection title="Study Tools" items={studyNav} pathname={pathname} />
        <NavSection title="Progress" items={insightsNav} pathname={pathname} />
      </nav>

      <div className="border-t border-border p-4">
        <Link
          href="/profile"
          className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-muted"
        >
          <Avatar className="size-10">
            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
            <AvatarFallback>{user.initials}</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{user.name}</p>
            <p className="truncate text-xs text-muted-foreground">{user.plan} · {user.level}</p>
          </div>
        </Link>
      </div>
    </aside>
  )
}
