"use client"

import { useState, useEffect } from "react"
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
  LogOut,
  Moon,
  Sun,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useCurrentUser } from "@/hooks/use-user"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { CommandPalette } from "@/components/shared/command-palette"

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
  const [paletteOpen, setPaletteOpen] = useState(false)
  const { user, markNotificationsAsRead, clearNotifications, toggleDarkMode } = useCurrentUser()

  // Global Ctrl+K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault()
        setPaletteOpen(prev => !prev)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <>
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
      <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-md md:px-6">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          render={
            <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
              <Menu />
            </Button>
          }
        />
        <SheetContent side="left" className="w-72 p-0 flex flex-col justify-between">
          <div>
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <div className="flex h-16 items-center gap-2.5 px-6">
              <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Sparkles className="size-5" />
              </span>
              <span className="text-lg font-semibold tracking-tight">KotobaLab</span>
            </div>
            <nav className="flex flex-col gap-1 px-4 py-2 overflow-y-auto max-h-[calc(100vh-10rem)]">
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
          </div>

          <div className="border-t border-border p-4 flex items-center justify-between gap-2 bg-sidebar">
            <Link
              href="/profile"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-muted min-w-0 flex-1"
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
            <Button
              variant="ghost"
              size="icon"
              className="size-9 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/5 shrink-0"
              onClick={() => {
                window.location.href = "/login";
              }}
              aria-label="Log out"
            >
              <LogOut className="size-4.5" />
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      <h1 className="text-lg font-semibold tracking-tight md:text-xl">{title}</h1>

      <div className="ml-auto flex items-center gap-2 md:gap-3">
        {/* Search trigger — opens Command Palette */}
        <button
          onClick={() => setPaletteOpen(true)}
          className="hidden sm:flex items-center gap-2 h-10 w-44 md:w-64 rounded-xl border border-border bg-muted/50 px-3 text-sm text-muted-foreground hover:bg-muted transition-colors"
        >
          <Search className="size-4 shrink-0" />
          <span className="flex-1 text-left">Search…</span>
          <kbd className="hidden md:flex items-center gap-1 text-[10px] font-mono bg-background px-1.5 py-0.5 rounded border border-border">
            Ctrl K
          </kbd>
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="secondary"
                className="hidden h-10 items-center gap-1.5 rounded-xl px-3 text-sm sm:flex font-mono bg-secondary hover:bg-secondary/80 text-secondary-foreground"
              >
                <Flame className="size-4 text-[oklch(0.84_0.12_85)]" />
                <span>{user.streakDays || 0}</span>
              </Button>
            }
          />
          <DropdownMenuContent align="end" className="w-48 rounded-2xl p-3 border-border bg-card shadow-soft">
            <div className="flex flex-col gap-2">
              <span className="font-semibold text-sm flex items-center gap-2">
                <Flame className="size-4 text-[oklch(0.84_0.12_85)]" />
                Streak Status
              </span>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Current Streak</span>
                <span className="font-mono font-medium">{user.streakDays || 0} days</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Best Streak</span>
                <span className="font-mono font-medium">{user.bestStreak || 0} days</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Total XP</span>
                <span className="font-mono font-medium text-primary">{(user.xp || 0).toLocaleString()}</span>
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="relative size-10 rounded-xl"
                aria-label="Notifications"
                onClick={markNotificationsAsRead}
              >
                <Bell className="size-5" />
                {user.notifications?.some((n) => n.unread) && (
                  <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground border-2 border-background">
                    {user.notifications.filter(n => n.unread).length}
                  </span>
                )}
              </Button>
            }
          />
          <DropdownMenuContent align="end" className="w-80 rounded-2xl p-2 border-border bg-card shadow-soft">
            <div className="flex items-center justify-between px-3 py-2">
              <span className="font-semibold text-sm">Notifications</span>
              {user.notifications?.length > 0 && (
                <button
                  onClick={clearNotifications}
                  className="text-xs text-muted-foreground hover:text-destructive font-medium"
                >
                  Clear all
                </button>
              )}
            </div>
            <DropdownMenuSeparator />
            <div className="flex flex-col gap-1 max-h-64 overflow-y-auto py-1">
              {!user.notifications || user.notifications.length === 0 ? (
                <div className="text-center py-6 text-xs text-muted-foreground">
                  No notifications yet.
                </div>
              ) : (
                user.notifications.map((n) => (
                  <DropdownMenuItem
                    key={n.id}
                    className={cn(
                      "flex flex-col items-start gap-1 rounded-xl p-2.5 text-xs transition-colors",
                      n.unread ? "bg-primary/5" : "hover:bg-muted"
                    )}
                  >
                    <div className="flex w-full items-center justify-between gap-2">
                      <span className="font-semibold text-foreground">{n.title}</span>
                      <span className="text-[10px] text-muted-foreground shrink-0">{n.time}</span>
                    </div>
                    <p className="text-muted-foreground leading-normal">{n.description}</p>
                  </DropdownMenuItem>
                ))
              )}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Dark mode quick toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="size-10 rounded-xl hidden sm:flex"
          onClick={toggleDarkMode}
          aria-label="Toggle dark mode"
          title={user.darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {user.darkMode ? <Sun className="size-5" /> : <Moon className="size-5" />}
        </Button>
      </div>
    </header>
    </>
  )
}
