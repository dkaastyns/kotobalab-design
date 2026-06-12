"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
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
  LogOut,
  ChevronLeft,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useCurrentUser } from "@/hooks/use-user"
import { Button } from "@/components/ui/button"

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
  collapsed,
}: {
  title: string
  items: { label: string; href: string; icon: React.ComponentType<{ className?: string }> }[]
  pathname: string
  collapsed: boolean
}) {
  return (
    <div className="flex flex-col gap-1 relative">
      <div className="h-6 flex items-center px-3">
        {!collapsed ? (
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground/70 whitespace-nowrap animate-in fade-in">{title}</p>
        ) : (
          <div className="h-px w-full bg-border/50 mx-1" />
        )}
      </div>
      {items.map((item) => {
        const active = pathname === item.href || pathname.startsWith(item.href + "/")
        const Icon = item.icon
        return (
          <Link
            key={item.href}
            href={item.href}
            title={collapsed ? item.label : undefined}
            className={cn(
              "group flex items-center gap-3 rounded-xl py-2.5 text-sm font-medium transition-colors relative overflow-hidden",
              collapsed ? "justify-center px-0" : "px-3",
              active
                ? "text-secondary-foreground shadow-soft"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            {active && (
              <motion.div
                layoutId={`activeNavIndicator-${title}`}
                className="absolute inset-0 bg-secondary -z-10 rounded-xl"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <Icon className="size-[18px] shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" />
            {!collapsed && <span className="whitespace-nowrap">{item.label}</span>}
          </Link>
        )
      })}
    </div>
  )
}

export function AppSidebar() {
  const pathname = usePathname()
  const { user } = useCurrentUser()
  const [collapsed, setCollapsed] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true)
      const stored = localStorage.getItem("sidebar-collapsed")
      if (stored) setCollapsed(stored === "true")
    }, 0)
    return () => clearTimeout(timer)
  }, [])

  const toggleCollapse = () => {
    const nextState = !collapsed
    setCollapsed(nextState)
    localStorage.setItem("sidebar-collapsed", String(nextState))
  }

  // Prevent hydration mismatch on initial render for the width
  if (!isMounted) return <aside className="hidden w-72 shrink-0 border-r border-border bg-sidebar lg:block" />

  return (
    <aside className={cn(
      "hidden shrink-0 flex-col border-r border-border bg-sidebar transition-[width] duration-300 ease-in-out lg:flex relative group/sidebar",
      collapsed ? "w-[80px]" : "w-72"
    )}>
      {/* Subtle toggle button that appears slightly on hover of the sidebar */}
      <button
        onClick={toggleCollapse}
        className="absolute -right-3 top-7 z-20 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-background shadow-sm text-muted-foreground hover:text-foreground hover:scale-110 transition-all opacity-0 group-hover/sidebar:opacity-100"
        aria-label="Toggle sidebar"
      >
        {collapsed ? <ChevronRight className="size-3.5" /> : <ChevronLeft className="size-3.5" />}
      </button>

      <div className={cn("flex h-16 items-center gap-2.5 transition-all duration-300", collapsed ? "justify-center px-0" : "px-6")}>
        <Link href="/dashboard" className="flex items-center gap-2.5 overflow-hidden">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Sparkles className="size-5" />
          </span>
          {!collapsed && <span className="text-lg font-semibold tracking-tight whitespace-nowrap animate-in fade-in">KotobaLab</span>}
        </Link>
      </div>

      <nav className="flex flex-1 flex-col gap-6 overflow-y-auto overflow-x-hidden py-4 px-3 custom-scrollbar">
        <NavSection title="Learn" items={mainNav} pathname={pathname} collapsed={collapsed} />
        <NavSection title="Study Tools" items={studyNav} pathname={pathname} collapsed={collapsed} />
        <NavSection title="Progress" items={insightsNav} pathname={pathname} collapsed={collapsed} />
      </nav>

      <div className={cn("border-t border-border flex items-center justify-between gap-2 p-3 transition-all duration-300 overflow-hidden", collapsed && "flex-col")}>
        <Link
          href="/profile"
          className={cn(
            "flex items-center gap-3 rounded-xl transition-colors hover:bg-muted min-w-0 flex-1",
            collapsed ? "justify-center p-2 w-full" : "p-2"
          )}
          title={collapsed ? user.name : undefined}
        >
          <Avatar className="size-9 shrink-0">
            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
            <AvatarFallback>{user.initials}</AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="min-w-0 flex-1 animate-in fade-in">
              <p className="truncate text-sm font-medium">{user.name}</p>
              <p className="truncate text-xs text-muted-foreground">{user.plan} · {user.level}</p>
            </div>
          )}
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/5 shrink-0",
            collapsed ? "size-9 w-full" : "size-9"
          )}
          onClick={() => {
            window.location.href = "/login";
          }}
          aria-label="Log out"
          title={collapsed ? "Log out" : undefined}
        >
          <LogOut className="size-4.5" />
        </Button>
      </div>
    </aside>
  )
}
